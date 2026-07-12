import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth-session";
import { buildAirlineSeo } from "@/lib/airline-meta";
import { insertLocalAirlinesBatch, readLocalAirlines } from "@/lib/airline-local";
import { buildAirportSeo } from "@/lib/airport-meta";
import { insertLocalAirportsBatch, readLocalAirports } from "@/lib/airport-local";
import { getSiteOrigin } from "@/lib/banner-meta";
import { extractFlightDataFromRows, parseExcelBuffer } from "@/lib/excel-import";
import { buildRouteSeo } from "@/lib/route-meta";
import { insertLocalRoutesBatch, readLocalRoutes } from "@/lib/route-local";
import { useLocalStorage } from "@/lib/storage-mode";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Excel file is required." }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls") && !fileName.endsWith(".csv")) {
      return NextResponse.json({ error: "Only .xlsx, .xls, or .csv files are allowed." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rows = parseExcelBuffer(buffer);
    const extracted = extractFlightDataFromRows(rows);

    if (
      extracted.routes.length === 0 &&
      extracted.airlines.length === 0 &&
      extracted.airports.length === 0
    ) {
      return NextResponse.json(
        { error: "No data found. Use columns: From, To, Airline Name, From IATA, To IATA." },
        { status: 400 },
      );
    }

    const siteOrigin = getSiteOrigin(new URL(request.url).origin);
    const supabase = createAdminClient();

    const existingRouteSlugs = new Set((await readLocalRoutes()).map((item) => item.slug));
    const existingAirlineCodes = new Set((await readLocalAirlines()).map((item) => item.iata_code.toUpperCase()));
    const existingAirportCodes = new Set((await readLocalAirports()).map((item) => item.iata_code.toUpperCase()));

    const { data: dbRoutes } = await supabase.from("routes").select("slug");
    const { data: dbAirlines } = await supabase.from("airlines").select("iata_code");
    const { data: dbAirports } = await supabase.from("airports").select("iata_code");

    for (const item of dbRoutes || []) existingRouteSlugs.add(String(item.slug));
    for (const item of dbAirlines || []) existingAirlineCodes.add(String(item.iata_code).toUpperCase());
    for (const item of dbAirports || []) existingAirportCodes.add(String(item.iata_code).toUpperCase());

    const routePayloads = extracted.routes
      .filter((row) => !existingRouteSlugs.has(row.slug))
      .map((row) => {
        const seo = buildRouteSeo(row.from_city, row.to_city, siteOrigin, row.airline_name || "");
        existingRouteSlugs.add(row.slug);
        return {
          from_city: row.from_city,
          to_city: row.to_city,
          from_airport_code: row.from_airport_code || null,
          to_airport_code: row.to_airport_code || null,
          airline_name: row.airline_name || null,
          slug: seo.slug,
          og_title: seo.og_title,
          og_description: seo.og_description,
          seo_keywords: seo.seo_keywords,
          seo_title: seo.seo_title,
          meta_description: seo.meta_description,
          h1_heading: seo.h1_heading,
          page_url: seo.page_url,
          status: "active" as const,
        };
      });

    const airlinePayloads = extracted.airlines
      .filter((row) => !existingAirlineCodes.has(row.iata_code.toUpperCase()))
      .map((row) => {
        const seo = buildAirlineSeo(row.name, row.iata_code, row.country || "", siteOrigin);
        existingAirlineCodes.add(row.iata_code.toUpperCase());
        return {
          name: row.name.trim(),
          iata_code: row.iata_code.toUpperCase(),
          icao_code: row.icao_code?.trim().toUpperCase() || null,
          country: row.country?.trim() || null,
          slug: seo.slug,
          seo_title: seo.seo_title,
          meta_description: seo.meta_description,
          h1_heading: seo.h1_heading,
          page_url: seo.page_url,
          status: "active" as const,
        };
      });

    const airportPayloads = extracted.airports
      .filter((row) => !existingAirportCodes.has(row.iata_code.toUpperCase()))
      .map((row) => {
        const seo = buildAirportSeo(row.name, row.iata_code, row.city, row.country || "", siteOrigin);
        existingAirportCodes.add(row.iata_code.toUpperCase());
        return {
          name: row.name.trim(),
          iata_code: row.iata_code.toUpperCase(),
          city: row.city.trim(),
          country: row.country?.trim() || null,
          slug: seo.slug,
          seo_title: seo.seo_title,
          meta_description: seo.meta_description,
          h1_heading: seo.h1_heading,
          page_url: seo.page_url,
          status: "active" as const,
        };
      });

    let importedRoutes = 0;
    let importedAirlines = 0;
    let importedAirports = 0;

    if (routePayloads.length > 0) {
      const { data, error } = await supabase.from("routes").insert(routePayloads).select("id");
      if (!error && data) {
        importedRoutes = data.length;
      } else if (useLocalStorage()) {
        importedRoutes = (await insertLocalRoutesBatch(routePayloads)).length;
      }
    }

    if (airlinePayloads.length > 0) {
      const { data, error } = await supabase.from("airlines").insert(airlinePayloads).select("id");
      if (!error && data) {
        importedAirlines = data.length;
      } else if (useLocalStorage()) {
        importedAirlines = (await insertLocalAirlinesBatch(airlinePayloads)).length;
      }
    }

    if (airportPayloads.length > 0) {
      const { data, error } = await supabase.from("airports").insert(airportPayloads).select("id");
      if (!error && data) {
        importedAirports = data.length;
      } else if (useLocalStorage()) {
        importedAirports = (await insertLocalAirportsBatch(airportPayloads)).length;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${importedRoutes} route(s), ${importedAirlines} airline(s), ${importedAirports} airport(s).`,
      importedRoutes,
      importedAirlines,
      importedAirports,
      totalRows: rows.length,
    });
  } catch (error) {
    console.error("routes import error:", error);
    return NextResponse.json({ error: "Unable to import routes from Excel." }, { status: 500 });
  }
}
