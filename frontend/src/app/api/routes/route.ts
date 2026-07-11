import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth-session";
import { getSiteOrigin } from "@/lib/banner-meta";
import { upsertLinkedEntities } from "@/lib/link-route-entities";
import { buildRouteSeo, sanitizeAirportIataCode } from "@/lib/route-meta";
import { findLocalRouteBySlug, insertLocalRoute, readLocalRoutes, updateLocalRouteStatus } from "@/lib/route-local";
import { createAdminClient } from "@/lib/supabase-admin";
import type { EntityStatus } from "@/types/airline";
import type { Route } from "@/types/route";

async function loadRoutes(activeOnly: boolean, siteOrigin = getSiteOrigin()) {
  const supabase = createAdminClient();
  let query = supabase.from("routes").select("*").order("created_at", { ascending: false });
  if (activeOnly) query = query.eq("status", "active");

  const { data, error } = await query;
  let routes = (data ?? []) as Route[];

  if (error) {
    console.error("routes fetch error:", error);
    routes = [];
  }

  const localRoutes = await readLocalRoutes();
  const filteredLocal = activeOnly
    ? localRoutes.filter((item) => item.status === "active")
    : localRoutes;

  const seen = new Set(routes.map((item) => item.id));
  for (const item of filteredLocal) {
    if (!seen.has(item.id)) routes.push(item);
  }

  routes.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return routes.map((item) => {
    const seo = buildRouteSeo(item.from_city, item.to_city, siteOrigin);
    return { ...item, page_url: item.page_url || seo.page_url };
  });
}

function buildStats(routes: Route[]) {
  return {
    total: routes.length,
    pending: routes.filter((item) => item.status === "pending").length,
    active: routes.filter((item) => item.status === "active").length,
  };
}

export async function GET(request: Request) {
  try {
    const session = getAdminSessionFromRequest(request);
    const siteOrigin = getSiteOrigin(new URL(request.url).origin);
    const routes = await loadRoutes(!session, siteOrigin);

    if (session) {
      return NextResponse.json({ routes, stats: buildStats(routes) });
    }

    return NextResponse.json({ routes });
  } catch (error) {
    console.error("routes GET error:", error);
    return NextResponse.json({ error: "Unable to load routes." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      from_city?: string;
      to_city?: string;
      airline_name?: string;
      from_airport_code?: string;
      to_airport_code?: string;
      status?: EntityStatus;
    };

    const fromCity = String(body.from_city || "").trim();
    const toCity = String(body.to_city || "").trim();

    if (!fromCity || !toCity) {
      return NextResponse.json({ error: "From and To are required." }, { status: 400 });
    }

    const siteOrigin = getSiteOrigin(new URL(request.url).origin);
    const airlineName = String(body.airline_name || "").trim();
    const seo = buildRouteSeo(fromCity, toCity, siteOrigin, airlineName);

    const payload = {
      from_city: fromCity,
      to_city: toCity,
      from_airport_code: sanitizeAirportIataCode(body.from_airport_code),
      to_airport_code: sanitizeAirportIataCode(body.to_airport_code),
      airline_name: airlineName || null,
      slug: seo.slug,
      og_title: seo.og_title,
      og_description: seo.og_description,
      seo_keywords: seo.seo_keywords,
      seo_title: seo.seo_title,
      meta_description: seo.meta_description,
      h1_heading: seo.h1_heading,
      page_url: seo.page_url,
      status: (body.status === "active" ? "active" : "pending") as EntityStatus,
    };

    const supabase = createAdminClient();
    const { data, error } = await supabase.from("routes").insert(payload).select("*").single();

    if (!error && data) {
      await upsertLinkedEntities(payload, siteOrigin);
      return NextResponse.json({
        success: true,
        message: "Route added with auto SEO. Airline & airports linked.",
        route: data,
      });
    }

    const existing = await findLocalRouteBySlug(seo.slug);
    if (existing) {
      return NextResponse.json({ error: "This route already exists." }, { status: 409 });
    }

    const localRoute = await insertLocalRoute(payload);
    await upsertLinkedEntities(payload, siteOrigin);

    return NextResponse.json({
      success: true,
      message: "Route saved with auto SEO. Airline & airports linked.",
      route: localRoute,
    });
  } catch (error) {
    console.error("routes POST error:", error);
    return NextResponse.json({ error: "Unable to add route." }, { status: 500 });
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
      return NextResponse.json({ error: "Route id and status are required." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("routes")
      .update({ status: body.status })
      .eq("id", body.id)
      .select("*")
      .single();

    if (!error && data) {
      return NextResponse.json({ route: data });
    }

    const localRoute = await updateLocalRouteStatus(body.id, body.status);
    if (!localRoute) {
      return NextResponse.json({ error: "Route not found." }, { status: 404 });
    }

    return NextResponse.json({ route: localRoute });
  } catch (error) {
    console.error("routes PATCH error:", error);
    return NextResponse.json({ error: "Unable to update route." }, { status: 500 });
  }
}
