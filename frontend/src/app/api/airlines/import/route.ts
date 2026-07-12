import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth-session";
import { buildAirlineSeo } from "@/lib/airline-meta";
import { findLocalAirlineByIata, insertLocalAirline } from "@/lib/airline-local";
import { getSiteOrigin } from "@/lib/banner-meta";
import { mapAirlineRows, parseExcelBuffer } from "@/lib/excel-import";
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
    const rows = mapAirlineRows(parseExcelBuffer(buffer));

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No valid airline rows found. Use columns: Name, IATA, Country." },
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
      const seo = buildAirlineSeo(row.name, iataCode, row.country, siteOrigin);
      const payload = {
        name: row.name.trim(),
        iata_code: iataCode,
        icao_code: row.icao_code?.trim().toUpperCase() || null,
        country: row.country?.trim() || null,
        slug: seo.slug,
        seo_title: seo.seo_title,
        meta_description: seo.meta_description,
        h1_heading: seo.h1_heading,
        page_url: seo.page_url,
        status: "active" as const,
      };

      const { error } = await supabase.from("airlines").insert(payload);
      if (!error) {
        imported.push(iataCode);
        continue;
      }

      if (useLocalStorage()) {
        const existing = await findLocalAirlineByIata(iataCode);
        if (existing) {
          skipped.push(iataCode);
          continue;
        }

        try {
          await insertLocalAirline(payload);
          imported.push(iataCode);
        } catch {
          errors.push(iataCode);
        }
        continue;
      }

      errors.push(iataCode);
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${imported.length} airline(s). Skipped ${skipped.length}.`,
      imported,
      skipped,
      errors,
      total: rows.length,
    });
  } catch (error) {
    console.error("airlines import error:", error);
    return NextResponse.json({ error: "Unable to import airlines from Excel." }, { status: 500 });
  }
}
