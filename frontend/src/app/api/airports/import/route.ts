import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth-session";
import { buildAirportSeo } from "@/lib/airport-meta";
import { findLocalAirportByIata, insertLocalAirport } from "@/lib/airport-local";
import { getSiteOrigin } from "@/lib/banner-meta";
import { mapAirportRows, parseExcelBuffer } from "@/lib/excel-import";
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
    const rows = mapAirportRows(parseExcelBuffer(buffer));

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No valid airport rows found. Use columns: Name, IATA, City, Country." },
        { status: 400 },
      );
    }

    const siteOrigin = getSiteOrigin(new URL(request.url).origin);
    const supabase = createAdminClient();
    const imported: string[] = [];
    const skipped: string[] = [];
    const errors: string[] = [];

    for (const row of rows) {
      const iataCode = row.iata_code.trim().toUpperCase();
      const seo = buildAirportSeo(row.name, iataCode, row.city, row.country, siteOrigin);
      const payload = {
        name: row.name.trim(),
        iata_code: iataCode,
        city: row.city.trim(),
        country: row.country?.trim() || null,
        slug: seo.slug,
        seo_title: seo.seo_title,
        meta_description: seo.meta_description,
        h1_heading: seo.h1_heading,
        page_url: seo.page_url,
        status: "active" as const,
      };

      const { error } = await supabase.from("airports").insert(payload);
      if (!error) {
        imported.push(iataCode);
        continue;
      }

      const existing = await findLocalAirportByIata(iataCode);
      if (existing) {
        skipped.push(iataCode);
        continue;
      }

      try {
        await insertLocalAirport(payload);
        imported.push(iataCode);
      } catch {
        errors.push(iataCode);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${imported.length} airport(s). Skipped ${skipped.length}.`,
      imported,
      skipped,
      errors,
      total: rows.length,
    });
  } catch (error) {
    console.error("airports import error:", error);
    return NextResponse.json({ error: "Unable to import airports from Excel." }, { status: 500 });
  }
}
