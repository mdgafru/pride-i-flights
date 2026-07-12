import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth-session";
import { getSiteOrigin } from "@/lib/banner-meta";
import {
  buildDestinationAggregate,
  buildDestinationOptions,
  buildManagedDestinationPayload,
  buildSearchDestinations,
  loadManagedDestinations,
} from "@/lib/destination-aggregate";
import { findLocalDestinationBySlug, insertLocalDestination } from "@/lib/destination-local";
import { saveDestinationById } from "@/lib/destination-store";
import { createAdminClient, hasSupabaseConfig } from "@/lib/supabase-admin";
import type { EntityStatus } from "@/types/airline";
import type { DestinationRecord } from "@/types/destination";

function buildStats(records: DestinationRecord[]) {
  return {
    total: records.length,
    pending: records.filter((item) => item.status === "pending").length,
    active: records.filter((item) => item.status === "active").length,
  };
}

function normalizeTravelStyles(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function GET(request: Request) {
  try {
    let session = null;
    try {
      session = getAdminSessionFromRequest(request);
    } catch (error) {
      console.error("destinations session parse error:", error);
    }

    const url = new URL(request.url);
    const dropdownOnly = url.searchParams.get("dropdown") === "1";
    const activeOnly = !session;

    const aggregate = await buildDestinationAggregate({
      activeOnly,
      includeAllProducts: dropdownOnly || !session,
    });
    const options = buildDestinationOptions(aggregate.entries);
    const destinations = buildSearchDestinations(aggregate.entries);

    if (dropdownOnly) {
      return NextResponse.json({ options });
    }

    if (session) {
      const records = await loadManagedDestinations(false);
      return NextResponse.json({
        destinations,
        options,
        records,
        stats: buildStats(records),
        aggregatedCount: aggregate.entries.length,
      });
    }

    return NextResponse.json({ destinations, options });
  } catch (error) {
    console.error("destinations GET error:", error);
    return NextResponse.json({ destinations: [], options: [] });
  }
}

export async function POST(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      title?: string;
      country?: string;
      subtitle?: string;
      region?: DestinationRecord["region"];
      travel_styles?: string[] | string;
      image_url?: string;
      packages_count?: number | string;
      popular_score?: number | string;
      status?: EntityStatus;
    };

    const title = String(body.title || "").trim();
    const country = String(body.country || "").trim();

    if (!title || !country) {
      return NextResponse.json({ error: "Destination title and country are required." }, { status: 400 });
    }

    const siteOrigin = getSiteOrigin(new URL(request.url).origin);
    const payload = buildManagedDestinationPayload(
      {
        title,
        country,
        subtitle: body.subtitle,
        region: body.region,
        travel_styles: normalizeTravelStyles(body.travel_styles) as DestinationRecord["travel_styles"],
        image_url: String(body.image_url || "").trim() || null,
        packages_count: Number(body.packages_count || 0),
        popular_score: Number(body.popular_score || 0),
        status: body.status === "pending" ? "pending" : "active",
      },
      siteOrigin,
    );

    if (hasSupabaseConfig()) {
      const supabase = createAdminClient();
      const { data, error } = await supabase.from("destinations").insert(payload).select("*").single();

      if (!error && data) {
        return NextResponse.json({
          success: true,
          message: "Destination added with auto SEO.",
          destination: data,
        });
      }

      console.error("destination insert error:", error);
    }

    const existing = await findLocalDestinationBySlug(payload.slug);
    if (existing) {
      return NextResponse.json({ error: "This destination already exists." }, { status: 409 });
    }

    const localDestination = await insertLocalDestination(payload);
    return NextResponse.json({
      success: true,
      message: "Destination saved with auto SEO.",
      destination: localDestination,
    });
  } catch (error) {
    console.error("destinations POST error:", error);
    return NextResponse.json({ error: "Unable to add destination." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string; status?: EntityStatus };
    if (!body.id || !body.status) {
      return NextResponse.json({ error: "Destination id and status are required." }, { status: 400 });
    }

    if (hasSupabaseConfig()) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("destinations")
        .update({ status: body.status })
        .eq("id", body.id)
        .select("*")
        .single();

      if (!error && data) {
        return NextResponse.json({ destination: data });
      }
    }

    const localDestination = await saveDestinationById(body.id, { status: body.status });
    if (!localDestination) {
      return NextResponse.json({ error: "Destination not found." }, { status: 404 });
    }

    return NextResponse.json({ destination: localDestination });
  } catch (error) {
    console.error("destinations PATCH error:", error);
    return NextResponse.json({ error: "Unable to update destination." }, { status: 500 });
  }
}
