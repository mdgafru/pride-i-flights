import { buildAirlineSeo } from "@/lib/airline-meta";
import { findLocalAirlineByIata, insertLocalAirline } from "@/lib/airline-local";
import { buildAirportSeo } from "@/lib/airport-meta";
import { findLocalAirportByIata, insertLocalAirport } from "@/lib/airport-local";
import { resolveAirlineIata } from "@/lib/route-meta";
import { readLocalRoutes } from "@/lib/route-local";
import { createAdminClient } from "@/lib/supabase-admin";

export async function syncLocalAirlinesFromRoutes(siteOrigin: string) {
  const routes = await readLocalRoutes();
  const seen = new Set<string>();

  for (const route of routes) {
    const name = route.airline_name?.trim();
    if (!name) continue;

    const code = resolveAirlineIata(name, route.airline_iata_code || undefined);
    if (!code || seen.has(code)) continue;

    const existing = await findLocalAirlineByIata(code);
    if (existing) {
      seen.add(code);
      continue;
    }

    const seo = buildAirlineSeo(name, code, "", siteOrigin);
    await insertLocalAirline({
      name,
      iata_code: code,
      icao_code: null,
      country: null,
      slug: seo.slug,
      seo_title: seo.seo_title,
      meta_description: seo.meta_description,
      h1_heading: seo.h1_heading,
      page_url: seo.page_url,
      status: "pending",
    });
    seen.add(code);
  }
}

export async function upsertLinkedEntities(
  input: {
    airline_name?: string;
    airline_iata_code?: string;
    from_airport_code?: string;
    to_airport_code?: string;
    from_city: string;
    to_city: string;
  },
  siteOrigin: string,
) {
  const supabase = createAdminClient();

  if (input.airline_name?.trim()) {
    const code = resolveAirlineIata(input.airline_name, input.airline_iata_code);
    if (code) {
      const seo = buildAirlineSeo(input.airline_name, code, "", siteOrigin);
      const payload = {
        name: input.airline_name.trim(),
        iata_code: code,
        icao_code: null,
        country: null,
        slug: seo.slug,
        seo_title: seo.seo_title,
        meta_description: seo.meta_description,
        h1_heading: seo.h1_heading,
        page_url: seo.page_url,
        status: "pending" as const,
      };
      const existing = await findLocalAirlineByIata(code);
      if (!existing) {
        await insertLocalAirline(payload);
        const { error } = await supabase.from("airlines").insert(payload);
        if (error) {
          console.error("airline link insert error:", error);
        }
      }
    }
  }

  const airportPairs = [
    { code: input.from_airport_code, city: input.from_city },
    { code: input.to_airport_code, city: input.to_city },
  ];

  for (const pair of airportPairs) {
    const code = pair.code?.trim().toUpperCase();
    if (!code || code.length !== 3) continue;
    const seo = buildAirportSeo(`${pair.city} Airport`, code, pair.city, "", siteOrigin);
    const payload = {
      name: `${pair.city} Airport`,
      iata_code: code,
      city: pair.city,
      country: null,
      slug: seo.slug,
      seo_title: seo.seo_title,
      meta_description: seo.meta_description,
      h1_heading: seo.h1_heading,
      page_url: seo.page_url,
      status: "pending" as const,
    };
    const existing = await findLocalAirportByIata(code);
    if (!existing) {
      await insertLocalAirport(payload);
      const { error } = await supabase.from("airports").insert(payload);
      if (error) {
        console.error("airport link insert error:", error);
      }
    }
  }
}
