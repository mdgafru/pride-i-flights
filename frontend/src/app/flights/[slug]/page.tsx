import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";
import { buildFlightDeal, buildFlightEnquiryUrl } from "@/lib/flight-deal-display";
import { getRouteBySlug } from "@/lib/route-store";

type FlightRoutePageProps = {
  params: Promise<{ slug: string }>;
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80";

async function loadActiveRoute(slug: string) {
  const route = await getRouteBySlug(slug);
  if (!route || route.status !== "active") return null;
  return route;
}

export async function generateMetadata({ params }: FlightRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = await loadActiveRoute(slug);

  if (!route) {
    return { title: "Flight Not Found | REDE FLIGHTS" };
  }

  return {
    title: route.seo_title,
    description: route.meta_description,
    keywords: route.seo_keywords,
    openGraph: {
      title: route.og_title,
      description: route.og_description,
      url: route.page_url,
      type: "website",
    },
  };
}

export default async function FlightRoutePage({ params }: FlightRoutePageProps) {
  const { slug } = await params;
  const route = await loadActiveRoute(slug);

  if (!route) notFound();

  const deal = buildFlightDeal(route);
  const enquiryUrl = buildFlightEnquiryUrl(route.from_city, route.to_city, deal.airline);
  const heroTitle = route.h1_heading || `${route.from_city} to ${route.to_city} Flights`;

  return (
    <SiteShell>
      <section
        className="hero-depth relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(4, 36, 72, 0.88) 0%, rgba(11, 47, 87, 0.72) 45%, rgba(4, 36, 72, 0.55) 100%), url('${HERO_IMAGE}')`,
        }}
      >
        <div className="mx-auto max-w-[1260px] px-4 py-8 text-white sm:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
              Flights
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">{heroTitle}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              {route.meta_description}
            </p>
            <p className="mt-3 text-[11px] font-medium text-white/70">
              Home / Flights / {route.from_city} to {route.to_city}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <article className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_8px_24px_rgba(11,47,87,0.06)] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#0b2f57] text-xs font-bold text-white">
                  {deal.airlineCode}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0b2f57]">{deal.airline}</p>
                  <h2 className="text-lg font-bold text-[#0b2f57]">
                    {deal.fromCity}
                    <span className="mx-2 font-normal text-slate-300">→</span>
                    {deal.toCity}
                  </h2>
                </div>
              </div>
              <span
                className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                  deal.stopType === "Non-stop"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {deal.stopType}
              </span>
            </div>

            <div className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Departure</p>
                <p className="mt-1 text-lg font-bold text-[#0b2f57]">{deal.departure}</p>
                <p className="text-xs font-semibold text-slate-500">{deal.fromCode}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Duration</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{deal.duration}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Arrival</p>
                <p className="mt-1 text-lg font-bold text-[#0b2f57]">{deal.arrival}</p>
                <p className="text-xs font-semibold text-slate-500">{deal.toCode}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              Book your flight from {route.from_city} to {route.to_city} with REDE FLIGHTS. Compare fares,
              get expert assistance, and enquire instantly on WhatsApp for the best available options.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Enquire on WhatsApp
              </a>
              <Link
                href="/flights"
                className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#0b2f57] transition hover:border-[#0b2f57]/30"
              >
                Browse all flights
              </Link>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
