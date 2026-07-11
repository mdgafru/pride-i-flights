"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContentPageHero } from "@/components/ContentPageHero";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_URL } from "@/lib/contact";

const hotels = [
  {
    name: "Grand Hyatt Bali",
    location: "Bali, Indonesia",
    stars: 5,
    rating: "4.8",
    reviews: "2.1k reviews",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast", "Spa"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    name: "Conrad Maldives",
    location: "Maldives",
    stars: 5,
    rating: "4.9",
    reviews: "1.8k reviews",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast", "Airport Transfer"],
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    name: "Marina Bay Sands",
    location: "Singapore",
    stars: 5,
    rating: "4.7",
    reviews: "4.2k reviews",
    amenities: ["Free Wi-Fi", "Swimming Pool", "City View", "Spa"],
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    name: "The Ritz London",
    location: "London, United Kingdom",
    stars: 5,
    rating: "4.8",
    reviews: "3.4k reviews",
    amenities: ["Free Wi-Fi", "Breakfast", "Restaurant", "Airport Transfer"],
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    name: "Paris Marriott Opera",
    location: "Paris, France",
    stars: 4,
    rating: "4.6",
    reviews: "1.6k reviews",
    amenities: ["Free Wi-Fi", "Breakfast", "City View", "Restaurant"],
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=700&h=420&q=85",
  },
  {
    name: "Park Hotel Tokyo",
    location: "Tokyo, Japan",
    stars: 4,
    rating: "4.7",
    reviews: "2.7k reviews",
    amenities: ["Free Wi-Fi", "Breakfast", "City View", "Airport Transfer"],
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&h=420&q=85",
  },
];

const trustItems = [
  { title: "Verified Stays", sub: "Trusted hotel partners worldwide" },
  { title: "Expert Support", sub: "Personal assistance for every booking" },
  { title: "Direct Enquiry", sub: "Connect instantly on WhatsApp" },
];

const starOptions = [5, 4];
const amenityOptions = ["Free Wi-Fi", "Swimming Pool", "Breakfast", "Airport Transfer", "Spa"];

type FilterPanelProps = {
  selectedStars: number[];
  selectedAmenities: string[];
  onStarChange: (star: number) => void;
  onAmenityChange: (amenity: string) => void;
  onClear: () => void;
};

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
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

function FilterPanel({
  selectedStars,
  selectedAmenities,
  onStarChange,
  onAmenityChange,
  onClear,
  showHeader = true,
}: FilterPanelProps & { showHeader?: boolean }) {
  const activeCount = selectedStars.length + selectedAmenities.length;
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
              <h3 className="mt-1 text-base font-bold text-[#0b2f57]">Refine Results</h3>
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
              className="mt-3 min-h-[40px] text-sm font-semibold text-[#e30613] transition hover:text-[#c40010]"
            >
              Clear all filters
            </button>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Select options to narrow your hotel search.
            </p>
          )}
        </div>
      ) : null}

      <div>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Star Rating
        </p>
        <div className="space-y-2">
          {starOptions.map((star) => (
            <FilterChip
              key={star}
              active={selectedStars.includes(star)}
              onClick={() => onStarChange(star)}
            >
              {star} Star Hotels
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Amenities
        </p>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => (
            <FilterChip
              key={amenity}
              active={selectedAmenities.includes(amenity)}
              onClick={() => onAmenityChange(amenity)}
            >
              {amenity}
            </FilterChip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  const [destination, setDestination] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const visibleHotels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return hotels.filter((hotel) => {
      const matchesQuery =
        !query ||
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query);
      const matchesStars = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => hotel.amenities.includes(amenity));

      return matchesQuery && matchesStars && matchesAmenities;
    });
  }, [searchQuery, selectedStars, selectedAmenities]);

  const toggleStar = (star: number) => {
    setSelectedStars((current) =>
      current.includes(star) ? current.filter((item) => item !== star) : [...current, star],
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const clearFilters = () => {
    setSelectedStars([]);
    setSelectedAmenities([]);
  };

  return (
    <SiteShell active="Hotels">
      <ContentPageHero
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=85"
        imagePosition="center 55%"
        description="Discover trusted hotels and resorts worldwide. Search your stay and enquire directly with our travel experts."
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
              Find Your Stay
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-[#0b2f57] sm:text-3xl">
              Search Hotels Worldwide
            </h1>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSearchQuery(destination);
            }}
            className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_14px_36px_rgba(11,47,87,0.12)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
              <label className="border-b border-slate-200 px-4 py-3 sm:border-r lg:border-b-0">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Destination
                </span>
                <input
                  type="text"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder="City, country or hotel"
                  className="mt-1.5 w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#0b2f57] outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </label>

              <label className="border-b border-slate-200 px-4 py-3 sm:border-b-0 sm:border-r">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Check-in
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="mt-1.5 w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#0b2f57] outline-none"
                />
              </label>

              <label className="border-b border-slate-200 px-4 py-3 sm:border-r lg:border-b-0">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Check-out
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="mt-1.5 w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#0b2f57] outline-none"
                />
              </label>

              <label className="border-b border-slate-200 px-4 py-3 sm:border-b-0 sm:border-r">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Guests
                </span>
                <select
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                  className="mt-1.5 w-full cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-[#0b2f57] outline-none"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>Family</option>
                </select>
              </label>

              <div className="flex items-stretch p-3 sm:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="btn-premium min-h-[48px] w-full bg-[#e30613] px-6 text-sm font-semibold text-white hover:bg-[#c40010]"
                >
                  Search Hotels
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-8 md:py-12">
        <details className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafc] shadow-sm lg:hidden">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between bg-white px-4 py-3 font-bold text-[#0b2f57] [&::-webkit-details-marker]:hidden">
            <span className="text-base">Refine Results</span>
            <span className="text-sm font-semibold text-[#e30613]" aria-hidden>
              Show
            </span>
          </summary>
          <div className="border-t border-slate-200 bg-white p-4">
            <FilterPanel
              selectedStars={selectedStars}
              selectedAmenities={selectedAmenities}
              onStarChange={toggleStar}
              onAmenityChange={toggleAmenity}
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
                    <h3 className="mt-1 text-base font-bold text-[#0b2f57]">Refine Results</h3>
                  </div>
                  {selectedStars.length + selectedAmenities.length > 0 ? (
                    <span className="rounded-full bg-[#fff5f6] px-2.5 py-1 text-xs font-bold text-[#e30613]">
                      {selectedStars.length + selectedAmenities.length}
                    </span>
                  ) : null}
                </div>
                {selectedStars.length + selectedAmenities.length > 0 ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-3 text-sm font-semibold text-[#e30613] transition hover:text-[#c40010]"
                  >
                    Clear all filters
                  </button>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    Narrow your search by rating and amenities.
                  </p>
                )}
              </div>

              <div className="px-4 py-4">
                <FilterPanel
                  selectedStars={selectedStars}
                  selectedAmenities={selectedAmenities}
                  onStarChange={toggleStar}
                  onAmenityChange={toggleAmenity}
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
                  Recommended Hotels
                </h2>
              </div>
              <p className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-500">
                <span className="text-[#e30613]">{visibleHotels.length}</span> hotels found
              </p>
            </div>

            {visibleHotels.length > 0 ? (
              <div className="space-y-4">
                {visibleHotels.map((hotel, index) => {
                  const message = [
                    `Hello REDE I FLIGHTS, I would like to enquire about ${hotel.name} in ${hotel.location}.`,
                    checkIn ? `Check-in: ${checkIn}.` : "",
                    checkOut ? `Check-out: ${checkOut}.` : "",
                    `Guests: ${guests}.`,
                  ]
                    .filter(Boolean)
                    .join(" ");
                  const enquiryUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

                  return (
                    <motion.article
                      key={hotel.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-[#e30613]/25 hover:shadow-[0_10px_28px_rgba(11,47,87,0.08)]"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-52 sm:self-stretch md:w-56">
                          <Image
                            src={hotel.image}
                            alt={hotel.name}
                            width={700}
                            height={420}
                            className="h-full min-h-40 w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:min-h-[168px]"
                          />
                          <span className="absolute left-3 top-3 rounded-md bg-[#042448]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                            {hotel.stars} Star
                          </span>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-4 sm:p-5 md:flex-row md:items-center">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#e30613]">
                              {hotel.location}
                            </p>
                            <h3 className="mt-1 text-lg font-bold leading-snug text-[#0b2f57] md:text-xl">
                              {hotel.name}
                            </h3>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                              <span className="inline-flex items-center gap-1 rounded-md bg-[#f8fafc] px-2 py-1 font-semibold text-[#0b2f57]">
                                <span className="text-amber-500">★</span> {hotel.rating}
                              </span>
                              <span className="text-slate-500">{hotel.reviews}</span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {hotel.amenities.map((amenity) => (
                                <span
                                  key={amenity}
                                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
                                >
                                  {amenity}
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
                              Get rates and availability on WhatsApp
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
                <h3 className="text-lg font-bold text-[#0b2f57]">No matching hotels found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                  Try another destination or clear the filters. You can also ask our experts for a
                  custom hotel recommendation.
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
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
