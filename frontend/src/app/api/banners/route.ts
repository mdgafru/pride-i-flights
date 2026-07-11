import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth-session";
import {
  BANNER_ALLOWED_TYPES,
  BANNER_BUCKET,
  BANNER_MAX_BYTES,
  buildBannerMetaFromFileName,
  buildBannerStoragePath,
  ensureDirectImageUrl,
  getSiteOrigin,
} from "@/lib/banner";
import {
  insertLocalBanner,
  readLocalBanners,
  saveBannerLocally,
  updateLocalBannerStatus,
} from "@/lib/banner-local";
import { createAdminClient } from "@/lib/supabase-admin";
import { withQueryTimeout } from "@/lib/supabase-query";
import type { Banner, BannerStatus } from "@/types/banner";

async function loadBanners(activeOnly: boolean, siteOrigin = getSiteOrigin()) {
  let banners: Banner[] = [];

  try {
    const supabase = createAdminClient();
    let query = supabase.from("banners").select("*").order("created_at", { ascending: false });

    if (activeOnly) {
      query = query.eq("status", "active");
    }

    const { data, error } = await withQueryTimeout(query, 5000, "banners fetch");
    banners = data ?? [];

    if (error) {
      console.error("banners fetch error:", error);
      banners = [];
    }
  } catch (error) {
    console.error("banners fetch error:", error);
    banners = [];
  }

  const localBanners = await readLocalBanners();
  const filteredLocal = activeOnly
    ? localBanners.filter((item) => item.status === "active")
    : localBanners;

  const seen = new Set(banners.map((item) => item.id));
  for (const item of filteredLocal) {
    if (!seen.has(item.id)) banners.push(item);
  }

  banners.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return banners.map((banner) => ({
    ...banner,
    image_url: ensureDirectImageUrl(banner.image_url, { siteOrigin }),
  }));
}

function buildStats(banners: Banner[]) {
  return {
    total: banners.length,
    pending: banners.filter((item) => item.status === "pending").length,
    active: banners.filter((item) => item.status === "active").length,
  };
}

export async function GET(request: Request) {
  try {
    let session = null;
    try {
      session = getAdminSessionFromRequest(request);
    } catch (error) {
      console.error("banners session parse error:", error);
    }

    const siteOrigin = getSiteOrigin(new URL(request.url).origin);
    const banners = await loadBanners(!session, siteOrigin);

    if (session) {
      return NextResponse.json({ banners, stats: buildStats(banners) });
    }

    return NextResponse.json({ banners });
  } catch (error) {
    console.error("banners GET error:", error);
    return NextResponse.json({ error: "Unable to load banners." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const alt = String(formData.get("alt") || "").trim();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Banner image file is required." }, { status: 400 });
    }

    if (!BANNER_ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PNG, JPG, or WEBP images are allowed." },
        { status: 400 },
      );
    }

    if (file.size > BANNER_MAX_BYTES) {
      return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 400 });
    }

    const siteOrigin = getSiteOrigin(new URL(request.url).origin);
    const existingBanners = await loadBanners(false, siteOrigin);
    const existingNames = existingBanners.map((item) => item.storage_path);
    const storagePath = buildBannerStoragePath(file.name, existingNames);
    const meta = buildBannerMetaFromFileName(storagePath, { siteOrigin });
    const rawBuffer = Buffer.from(await file.arrayBuffer());
    const fileBuffer = rawBuffer;
    const supabase = createAdminClient();

    const imageUrl = await saveBannerLocally(fileBuffer, storagePath, siteOrigin);

    const { error: uploadError } = await supabase.storage
      .from(BANNER_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    const storedLocally = true;
    if (uploadError) {
      console.error("banner supabase backup upload error:", uploadError);
    }

    const payload = {
      alt: alt || meta.alt,
      slug: meta.slug,
      seo_title: meta.seoTitle,
      meta_description: meta.metaDescription,
      h1_heading: meta.h1Heading,
      image_url: imageUrl,
      storage_path: storagePath,
      status: "pending" as const,
    };

    const { data, error } = await supabase
      .from("banners")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error("banner insert error:", error);
      if (!storedLocally) {
        await supabase.storage.from(BANNER_BUCKET).remove([storagePath]);
      }

      const localBanner = await insertLocalBanner(payload);
      return NextResponse.json({
        success: true,
        message: storedLocally
          ? "Banner uploaded. Image URL is ready on your site domain."
          : "Banner uploaded successfully. Status is pending.",
        banner: localBanner,
      });
    }

    return NextResponse.json({
      success: true,
      message: storedLocally
        ? "Banner uploaded successfully. Status is pending."
        : "Banner uploaded successfully. Status is pending.",
      banner: data,
    });
  } catch (error) {
    console.error("banners POST error:", error);
    return NextResponse.json({ error: "Unable to upload banner." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string; status?: BannerStatus };
    if (!body.id || !body.status) {
      return NextResponse.json({ error: "Banner id and status are required." }, { status: 400 });
    }

    if (body.status !== "pending" && body.status !== "active") {
      return NextResponse.json({ error: "Invalid banner status." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("banners")
      .update({ status: body.status })
      .eq("id", body.id)
      .select("*")
      .single();

    if (!error && data) {
      return NextResponse.json({ banner: data });
    }

    const localBanner = await updateLocalBannerStatus(body.id, body.status);
    if (!localBanner) {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }

    return NextResponse.json({ banner: localBanner });
  } catch (error) {
    console.error("banners PATCH error:", error);
    return NextResponse.json({ error: "Unable to update banner." }, { status: 500 });
  }
}
