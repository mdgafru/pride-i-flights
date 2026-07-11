import * as XLSX from "xlsx";
import { buildRouteSlug } from "@/lib/route-meta";

export type ParsedAirlineRow = {
  name: string;
  iata_code: string;
  icao_code?: string;
  country?: string;
};

export type ParsedAirportRow = {
  name: string;
  iata_code: string;
  city: string;
  country?: string;
};

export type ParsedRouteRow = {
  from_city: string;
  to_city: string;
  from_airport_code?: string;
  to_airport_code?: string;
  airline_name?: string;
  slug: string;
};

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function pickValue(row: Record<string, unknown>, aliases: string[]) {
  const entries = Object.entries(row);
  for (const alias of aliases) {
    const normalizedAlias = normalizeHeader(alias);
    const match = entries.find(([key]) => {
      const normalizedKey = normalizeHeader(key);
      return (
        normalizedKey === normalizedAlias ||
        normalizedKey.includes(normalizedAlias) ||
        normalizedAlias.includes(normalizedKey)
      );
    });
    if (match) {
      const value = String(match[1] ?? "").trim();
      if (value) return value;
    }
  }
  return "";
}

function sanitizeAirportIata(value: string) {
  const code = value.trim().toUpperCase();
  return isLikelyAirportCode(code) ? code : "";
}

function pickAirportIata(row: Record<string, unknown>, direction: "from" | "to") {
  const iataAliases =
    direction === "from"
      ? [
          "fromiata",
          "from airport iata",
          "fromairportiata",
          "origin iata",
          "departure iata",
          "from airport code",
          "origin airport code",
        ]
      : [
          "toiata",
          "to airport iata",
          "toairportiata",
          "destination iata",
          "arrival iata",
          "to airport code",
          "destination airport code",
        ];

  const direct = sanitizeAirportIata(pickValue(row, iataAliases));
  if (direct) return direct;

  const fallbackAliases =
    direction === "from"
      ? ["fromairportcode", "fromairport", "originairport", "departureairport"]
      : ["toairportcode", "toairport", "destinationairport", "arrivalairport"];

  return sanitizeAirportIata(pickValue(row, fallbackAliases));
}

function pickAirportName(row: Record<string, unknown>, direction: "from" | "to") {
  const nameAliases =
    direction === "from"
      ? ["fromairportname", "from airport name", "origin airport name", "departure airport name"]
      : ["toairportname", "to airport name", "destination airport name", "arrival airport name"];

  const direct = pickValue(row, nameAliases);
  if (direct) return direct;

  const fallbackAliases =
    direction === "from"
      ? ["fromairport", "originairport", "departureairport"]
      : ["toairport", "destinationairport", "arrivalairport"];

  const fallback = pickValue(row, fallbackAliases);
  if (fallback && !isLikelyAirportCode(fallback)) return fallback;
  return "";
}

function isLikelyAirlineCode(code: string) {
  return /^[A-Z0-9]{2}$/i.test(code.trim());
}

function isLikelyAirportCode(code: string) {
  return /^[A-Z]{3}$/i.test(code.trim());
}

function guessAirlineCode(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0] || ""}${words[1][0] || ""}`.toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
}

function addAirline(
  map: Map<string, ParsedAirlineRow>,
  name: string,
  code: string,
  country = "",
) {
  const cleanName = name.trim();
  const cleanCode = code.trim().toUpperCase();
  if (!cleanName || !isLikelyAirlineCode(cleanCode)) return;
  if (!map.has(cleanCode)) {
    map.set(cleanCode, {
      name: cleanName,
      iata_code: cleanCode,
      country: country.trim() || undefined,
    });
  }
}

function addAirport(
  map: Map<string, ParsedAirportRow>,
  name: string,
  code: string,
  city: string,
  country = "",
) {
  const cleanCode = code.trim().toUpperCase();
  const cleanCity = city.trim();
  if (!cleanCode || !isLikelyAirportCode(cleanCode)) return;
  const finalName = name.trim() || `${cleanCity || cleanCode} Airport`;
  const finalCity = cleanCity || name.trim() || cleanCode;
  if (!map.has(cleanCode)) {
    map.set(cleanCode, {
      name: finalName,
      iata_code: cleanCode,
      city: finalCity,
      country: country.trim() || undefined,
    });
  }
}

function addRoute(map: Map<string, ParsedRouteRow>, row: Omit<ParsedRouteRow, "slug">) {
  const fromCity = row.from_city.trim();
  const toCity = row.to_city.trim();
  if (!fromCity || !toCity) return;
  const slug = buildRouteSlug(fromCity, toCity);
  if (!map.has(slug)) {
    map.set(slug, {
      from_city: fromCity,
      to_city: toCity,
      from_airport_code: sanitizeAirportIata(row.from_airport_code || "") || undefined,
      to_airport_code: sanitizeAirportIata(row.to_airport_code || "") || undefined,
      airline_name: row.airline_name?.trim() || undefined,
      slug,
    });
  }
}

export function parseExcelBuffer(buffer: Buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer", cellDates: false });
  const rows: Record<string, unknown>[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const sheetRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
    rows.push(...sheetRows);
  }

  return rows;
}

export function extractFlightDataFromRows(rows: Record<string, unknown>[]) {
  const airlines = new Map<string, ParsedAirlineRow>();
  const airports = new Map<string, ParsedAirportRow>();
  const routes = new Map<string, ParsedRouteRow>();

  for (const row of rows) {
    const fromCity = pickValue(row, ["from", "fromcity", "origin", "origincity", "departurecity", "cityfrom"]);
    const toCity = pickValue(row, ["to", "tocity", "destination", "destinationcity", "arrivalcity", "cityto"]);
    const airlineName = pickValue(row, [
      "airlinename",
      "airline",
      "airline name",
      "carrier",
      "fromairline",
      "toairline",
    ]);
    const fromAirportCode = pickAirportIata(row, "from");
    const toAirportCode = pickAirportIata(row, "to");
    const fromAirportName = pickAirportName(row, "from");
    const toAirportName = pickAirportName(row, "to");
    const airlineCode = pickValue(row, [
      "airlinecode",
      "airline iata",
      "carriercode",
    ]);
    const country = pickValue(row, ["country", "nation"]);

    if (fromCity && toCity) {
      addRoute(routes, {
        from_city: fromCity,
        to_city: toCity,
        from_airport_code: fromAirportCode || undefined,
        to_airport_code: toAirportCode || undefined,
        airline_name: airlineName || undefined,
      });
    }

    if (airlineName) {
      const code = airlineCode && isLikelyAirlineCode(airlineCode) ? airlineCode : guessAirlineCode(airlineName);
      addAirline(airlines, airlineName, code, country);
    }

    if (fromAirportCode) {
      addAirport(
        airports,
        fromAirportName || `${fromCity || fromAirportCode} Airport`,
        fromAirportCode,
        fromCity || fromAirportCode,
        country,
      );
    }

    if (toAirportCode) {
      addAirport(
        airports,
        toAirportName || `${toCity || toAirportCode} Airport`,
        toAirportCode,
        toCity || toAirportCode,
        country,
      );
    }
  }

  return {
    routes: Array.from(routes.values()),
    airlines: Array.from(airlines.values()),
    airports: Array.from(airports.values()),
  };
}

export function mapAirlineRows(rows: Record<string, unknown>[]) {
  const result: ParsedAirlineRow[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    const name = pickValue(row, ["name", "airlinename", "airline", "airline name", "carrier"]);
    const iataCode = pickValue(row, [
      "iata",
      "iatacode",
      "iata code",
      "code",
      "airlinecode",
      "airline iata",
      "carriercode",
    ]);
    const icaoCode = pickValue(row, ["icao", "icaocode", "icao code"]);
    const country = pickValue(row, ["country", "nation"]);
    const code = (iataCode.trim().toUpperCase() || (name ? guessAirlineCode(name) : "")).trim();

    if (!name.trim() || !isLikelyAirlineCode(code) || seen.has(code)) continue;
    seen.add(code);

    result.push({
      name: name.trim(),
      iata_code: code,
      icao_code: icaoCode.trim().toUpperCase() || undefined,
      country: country.trim() || undefined,
    });
  }

  return result;
}

export function mapAirportRows(rows: Record<string, unknown>[]) {
  const result: ParsedAirportRow[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    const name = pickValue(row, ["name", "airportname", "airport", "airport name"]);
    const iataCode = pickValue(row, ["iata", "iatacode", "iata code", "code", "airportcode"]);
    const city = pickValue(row, ["city", "airportcity", "location", "town"]);
    const country = pickValue(row, ["country", "nation"]);
    const code = sanitizeAirportIata(iataCode) || iataCode.trim().toUpperCase();

    if (!isLikelyAirportCode(code) || seen.has(code)) continue;

    const finalCity = city.trim() || name.trim() || code;
    if (!finalCity) continue;
    seen.add(code);

    result.push({
      name: name.trim() || `${finalCity} Airport`,
      iata_code: code,
      city: finalCity,
      country: country.trim() || undefined,
    });
  }

  return result;
}
