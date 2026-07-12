"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContactSelect } from "@/components/ContactSelect";
import { ContentPageHero } from "@/components/ContentPageHero";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";
import { fetchDestinationOptionsFromApi } from "@/lib/destinations";
import { WHATSAPP_URL } from "@/lib/contact";

const packages = [
  {
    id: "europe",
    tag: "Best Seller",
    title: "Romantic Europe Getaway",
    route: "Paris · Switzerland · Italy",
    duration: "7 Days / 6 Nights",
    region: "Europe",
    theme: "Honeymoon",
    includes: ["Flight", "Hotel", "Meals", "Sightseeing"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    id: "bali",
    tag: "Popular",
    title: "Bali Island Escape",
    route: "Ubud · Kuta · Nusa Dua",
    duration: "5 Days / 4 Nights",
    region: "Asia",
    theme: "Beach",
    includes: ["Flight", "Hotel", "Breakfast", "Transfers"],
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    id: "switzerland",
    tag: "Trending",
    title: "Switzerland Explorer",
    route: "Zurich · Interlaken · Lucerne",
    duration: "6 Days / 5 Nights",
    region: "Europe",
    theme: "Adventure",
    includes: ["Flight", "Hotel", "Meals", "Train Pass"],
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    id: "dubai",
    tag: "Hot Deal",
    title: "Dubai City Experience",
    route: "Dubai · Abu Dhabi",
    duration: "4 Days / 3 Nights",
    region: "Middle East",
    theme: "Family",
    includes: ["Flight", "Hotel", "Desert Safari", "Transfers"],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    id: "maldives",
    tag: "Luxury",
    title: "Maldives Honeymoon",
    route: "Male · Overwater Villa",
    duration: "5 Days / 4 Nights",
    region: "Asia",
    theme: "Luxury",
    includes: ["Flight", "Villa", "All Meals", "Spa"],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    id: "singapore",
    tag: "Family",
    title: "Singapore Fun Trip",
    route: "Marina Bay · Sentosa",
    duration: "4 Days / 3 Nights",
    region: "Asia",
    theme: "Family",
    includes: ["Flight", "Hotel", "Park Tickets", "Transfers"],
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&h=420&q=85",
  },
];

const trustItems = [
  { title: "Curated Packages", sub: "Handpicked holidays worldwide" },
  { title: "Expert Planning", sub: "Flights, hotels and sightseeing included" },
  { title: "Direct Enquiry", sub: "Get quotes instantly on WhatsApp" },
];

const regionOptions = ["Europe", "Asia", "Middle East", "Africa", "Americas"];
const themeOptions = ["Family", "Honeymoon", "Adventure", "Beach", "Luxury"];

type FilterChipProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

function FilterChip({ active, children, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[40px] w-full rounded-lg px-3 text-left text-sm font-medium transition ${
        active
          ? "border border-[#e30613]/30 bg-[#fff5f6] text-[#0b2f57] shadow-[inset_3px_0_0_#e30613]"
          : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-[#f8fafc]"
      }`}
    >
      {children}
    </button>
  );
}

type FilterPanelProps = {
  selectedRegions: string[];
  selectedThemes: string[];
  onRegionChange: (region: string) => void;
  onThemeChange: (theme: string) => void;
  onClear: () => void;
  showHeader?: boolean;
};

function FilterPanel({
  selectedRegions,
  selectedThemes,
  onRegionChange,
  onThemeChange,
  onClear,
  showHeader = true,
}: FilterPanelProps) {
  const activeCount = selectedRegions.length + selectedThemes.length;
  const hasFilters = activeCount > 0;

  return (
    <div className="space-y-5">
      {showHeader ? (
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e30613]">
                Filters
              </p>
              <h3 className="mt-1 text-base font-bold text-[#0b2f57]">Refine Packages</h3>
            </div>
            {hasFilters ? (
              <span className="rounded-full bg-[#fff5f6] px-2.5 py-1 text-xs font-bold text-[#e30613]">
                {activeCount}
              </span>
            ) : null}
          </div>
          {hasFilters ? (
            <button
              type="button"
              onClick={onClear}
              className="mt-3 text-sm font-semibold text-[#e30613] transition hover:text-[#c40010]"
            >
              Clear all filters
            </button>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Select destination or theme to find the right package.
            </p>
          )}
        </div>
      ) : null}

      <div>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Destination
        </p>
        <div className="space-y-2">
          {regionOptions.map((region) => (
            <FilterChip
              key={region}
              active={selectedRegions.includes(region)}
              onClick={() => onRegionChange(region)}
            >
              {region}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Theme
        </p>
        <div className="space-y-2">
          {themeOptions.map((theme) => (
            <FilterChip
              key={theme}
              active={selectedThemes.includes(theme)}
              onClick={() => onThemeChange(theme)}
            >
              {theme}
            </FilterChip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [travelers, setTravelers] = useState("2 Travelers");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [destinationOptions, setDestinationOptions] = useState([
    { label: "All Destinations", value: "" },
  ]);

  useEffect(() => {
    async function loadDestinationOptions() {
      const options = await fetchDestinationOptionsFromApi();
      setDestinationOptions(options);
    }

    loadDestinationOptions();
  }, []);

  const visiblePackages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return packages.filter((pkg) => {
      const matchesQuery =
        !query ||
        pkg.title.toLowerCase().includes(query) ||
        pkg.route.toLowerCase().includes(query) ||
        pkg.region.toLowerCase().includes(query);
      const matchesRegion =
        selectedRegions.length === 0 || selectedRegions.includes(pkg.region);
      const matchesTheme =
        selectedThemes.length === 0 || selectedThemes.includes(pkg.theme);

      return matchesQuery && matchesRegion && matchesTheme;
    });
  }, [searchQuery, selectedRegions, selectedThemes]);

  const toggleRegion = (region: string) => {
    setSelectedRegions((current) =>
      current.includes(region)
        ? current.filter((item) => item !== region)
        : [...current, region],
    );
  };

  const toggleTheme = (theme: string) => {
    setSelectedThemes((current) =>
      current.includes(theme)
        ? current.filter((item) => item !== theme)
        : [...current, theme],
    );
  };

  const clearFilters = () => {
    setSelectedRegions([]);
    setSelectedThemes([]);
  };

  return (
    <SiteShell active="Tour Packages">
      <ContentPageHero
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=85"
        imagePosition="center 45%"
        description="Handpicked holiday packages with flights, hotels and sightseeing. Search your trip and enquire directly with our travel experts."
        centered
        showBreadcrumb={false}
        useLogo
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1260px] grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trustItems.map((item) => (
            <div key={item.title} className="px-4 py-5 text-center sm:px-6 sm:py-6">
              <p className="text-base font-bold text-[#e30613] sm:text-lg">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-6 md:py-8">
          <div className="mb-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
              Plan Your Holiday
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-[#0b2f57] sm:text-3xl">
              Search Tour Packages
            </h1>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSearchQuery(destination);
            }}
            className="relative z-20 mx-auto max-w-6xl overflow-x-hidden rounded-xl border border-slate-200 bg-white shadow-[0_14px_36px_rgba(11,47,87,0.12)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
              <div className="border-b border-slate-200 px-4 py-3 sm:border-r lg:border-b-0">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Destination
                </span>
                <ContactSelect
                  value={destination}
                  onChange={(value) => {
                    setDestination(value);
                    setSearchQuery(value);
                  }}
                  options={destinationOptions}
                  ariaLabel="Select package destination"
                  selectedLabel={
                    destination
                      ? destinationOptions.find((option) => option.value === destination)?.label
                      : "All Destinations"
                  }
                  className="mt-1"
                  listClassName="z-50 max-h-72"
                />
              </div>

              <label className="border-b border-slate-200 px-4 py-3 sm:border-b-0 sm:border-r">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Travel Month
                </span>
                <input
                  type="month"
                  value={travelMonth}
                  onChange={(event) => setTravelMonth(event.target.value)}
                  className="mt-1.5 w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#0b2f57] outline-none"
                />
              </label>

              <label className="border-b border-slate-200 px-4 py-3 sm:border-b-0 sm:border-r">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Travelers
                </span>
                <select
                  value={travelers}
                  onChange={(event) => setTravelers(event.target.value)}
                  className="mt-1.5 w-full cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-[#0b2f57] outline-none"
                >
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3 Travelers</option>
                  <option>4 Travelers</option>
                  <option>Family Group</option>
                </select>
              </label>

              <div className="flex items-stretch p-3 sm:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="btn-premium min-h-[48px] w-full bg-[#e30613] px-6 text-sm font-semibold text-white hover:bg-[#c40010]"
                >
                  Search Packages
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-8 md:py-12">
        <details className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafc] shadow-sm lg:hidden">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between bg-white px-4 py-3 font-bold text-[#0b2f57] [&::-webkit-details-marker]:hidden">
            <span className="text-base">Refine Packages</span>
            <span className="text-sm font-semibold text-[#e30613]" aria-hidden>
              Show
            </span>
          </summary>
          <div className="border-t border-slate-200 bg-white p-4">
            <FilterPanel
              selectedRegions={selectedRegions}
              selectedThemes={selectedThemes}
              onRegionChange={toggleRegion}
              onThemeChange={toggleTheme}
              onClear={clearFilters}
            />
          </div>
        </details>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="hidden w-full shrink-0 lg:block lg:w-[248px]">
            <div className="sticky top-28 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(11,47,87,0.06)]">
              <div className="border-b border-slate-100 bg-[#f8fafc] px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
                      Filters
                    </p>
                    <h3 className="mt-1 text-base font-bold text-[#0b2f57]">Refine Packages</h3>
                  </div>
                  {selectedRegions.length + selectedThemes.length > 0 ? (
                    <span className="rounded-full bg-[#fff5f6] px-2.5 py-1 text-xs font-bold text-[#e30613]">
                      {selectedRegions.length + selectedThemes.length}
                    </span>
                  ) : null}
                </div>
                {selectedRegions.length + selectedThemes.length > 0 ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-3 text-sm font-semibold text-[#e30613] transition hover:text-[#c40010]"
                  >
                    Clear all filters
                  </button>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    Narrow your search by destination or theme.
                  </p>
                )}
              </div>

              <div className="px-4 py-4">
                <FilterPanel
                  selectedRegions={selectedRegions}
                  selectedThemes={selectedThemes}
                  onRegionChange={toggleRegion}
                  onThemeChange={toggleTheme}
                  onClear={clearFilters}
                  showHeader={false}
                />
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
                  Search Results
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#0b2f57] sm:text-3xl">
                  Top Tour Packages
                </h2>
              </div>
              <p className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-500">
                <span className="text-[#e30613]">{visiblePackages.length}</span> packages found
              </p>
            </div>

            {visiblePackages.length > 0 ? (
              <div className="space-y-4">
                {visiblePackages.map((pkg, index) => {
                  const message = [
                    `Hello REDE I FLIGHTS, I would like to enquire about the ${pkg.title} tour package.`,
                    `Route: ${pkg.route}.`,
                    `Duration: ${pkg.duration}.`,
                    travelMonth ? `Travel month: ${travelMonth}.` : "",
                    `Travelers: ${travelers}.`,
                  ]
                    .filter(Boolean)
                    .join(" ");
                  const enquiryUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

                  return (
                    <motion.article
                      key={pkg.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-[#e30613]/25 hover:shadow-[0_10px_28px_rgba(11,47,87,0.08)]"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-52 sm:self-stretch md:w-56">
                          <Image
                            src={pkg.image}
                            alt={pkg.title}
                            width={700}
                            height={420}
                            className="h-full min-h-40 w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:min-h-[168px]"
                          />
                          <span className="absolute left-3 top-3 rounded-md bg-[#e30613] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            {pkg.tag}
                          </span>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-4 sm:p-5 md:flex-row md:items-center">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#e30613]">
                              {pkg.region} · {pkg.theme}
                            </p>
                            <h3 className="mt-1 text-lg font-bold leading-snug text-[#0b2f57] md:text-xl">
                              {pkg.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">{pkg.route}</p>
                            <p className="mt-2 text-sm font-semibold text-[#0b2f57]">
                              {pkg.duration}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {pkg.includes.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="shrink-0 md:w-[210px]">
                            <a
                              href={enquiryUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-premium inline-flex min-h-[46px] w-full items-center justify-center gap-2 bg-[#e30613] px-4 text-sm font-semibold text-white hover:bg-[#c40010]"
                            >
                              <WhatsAppIcon className="h-5 w-5" />
                              Enquire Now
                            </a>
                            <p className="mt-2 text-center text-[11px] leading-relaxed text-slate-400">
                              Get package details on WhatsApp
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-[#f8fafc] px-6 py-14 text-center">
                <h3 className="text-lg font-bold text-[#0b2f57]">No matching packages found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                  Try another destination or clear the filters. Our experts can also create a custom
                  package for you.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDestination("");
                    setSearchQuery("");
                    clearFilters();
                  }}
                  className="btn-premium mt-5 min-h-[44px] bg-[#e30613] px-6 text-sm font-semibold text-white"
                >
                  Reset Search
                </button>
              </div>
            )}

            <div className="mt-8 overflow-hidden rounded-xl border border-[#e30613]/20 bg-[#fff5f6]">
              <div className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
                <div>
                  <p className="text-lg font-bold text-[#0b2f57]">
                    Can&apos;t find the perfect package?
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Let our travel experts customize a holiday plan for you.
                  </p>
                </div>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    "Hello REDE I FLIGHTS, I would like a custom tour package plan.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-premium inline-flex min-h-[46px] items-center gap-2 bg-[#e30613] px-6 text-sm font-semibold text-white hover:bg-[#c40010]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Custom Package Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
