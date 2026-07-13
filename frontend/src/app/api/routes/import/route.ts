import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth-session";
import { getSiteOrigin } from "@/lib/banner-meta";
import { extractFlightDataFromRows, parseExcelBuffer } from "@/lib/excel-import";
import {
  formatImportMessage,
  upsertImportedAirlines,
  upsertImportedAirports,
  upsertImportedRoutes,
} from "@/lib/import-upsert";
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

    const [routeStats, airlineStats, airportStats] = await Promise.all([
      upsertImportedRoutes(supabase, extracted.routes, siteOrigin),
      upsertImportedAirlines(supabase, extracted.airlines, siteOrigin),
      upsertImportedAirports(supabase, extracted.airports, siteOrigin),
    ]);

    const message = [
      formatImportMessage("Routes", routeStats),
      formatImportMessage("Airlines", airlineStats),
      formatImportMessage("Airports", airportStats),
    ].join(". ");

    return NextResponse.json({
      success: true,
      message: `${message}.`,
      insertedRoutes: routeStats.inserted,
      updatedRoutes: routeStats.updated,
      insertedAirlines: airlineStats.inserted,
      updatedAirlines: airlineStats.updated,
      insertedAirports: airportStats.inserted,
      updatedAirports: airportStats.updated,
      errors:
        routeStats.errors + airlineStats.errors + airportStats.errors,
      totalRows: rows.length,
    });
  } catch (error) {
    console.error("routes import error:", error);
    return NextResponse.json({ error: "Unable to import routes from Excel." }, { status: 500 });
  }
}
