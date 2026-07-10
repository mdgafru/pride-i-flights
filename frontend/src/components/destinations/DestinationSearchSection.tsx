"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DEFAULT_DESTINATION_FILTERS,
  DESTINATION_MONTHS,
  DESTINATION_REGIONS,
  DESTINATION_SORT_OPTIONS,
  DESTINATION_TRAVEL_STYLES,
  DESTINATION_TRAVELERS,
  filterDestinations,
  getDestinationSuggestions,
  MOCK_DESTINATIONS,
  searchDestinations,
} from "@/lib/destinations";
import type {
  Destination,
  DestinationRegion,
  DestinationSearchFilters,
  DestinationTravelStyle,
} from "@/types/destination";

const fieldLabelClass = "text-xs font-bold uppercase tracking-wide text-slate-600";
const fieldClass =
  "mt-1.5 w-full min-w-0 border-0 bg-transparent p-0 text-[15px] font-semibold leading-snug text-[#0b2f57] outline-none placeholder:font-medium placeholder:text-slate-500";
const selectClass =
  "mt-1.5 w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 pr-6 text-[15px] font-semibold text-[#0b2f57] outline-none";
const imageBadgeClass =
  "absolute left-3 top-3 rounded-md bg-[#e30613] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm";

function hasActiveFilters(filters: DestinationSearchFilters): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.region !== "All Regions" ||
    filters.travelStyle !== "All Styles" ||
    filters.travelMonth !== "" ||
    filters.travelers !== DEFAULT_DESTINATION_FILTERS.travelers ||
    filters.sortBy !== DEFAULT_DESTINATION_FILTERS.sortBy
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e30613]/25 bg-[#fff5f6] px-3 py-1.5 text-xs font-semibold text-[#0b2f57]">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-[#e30613] transition hover:text-[#c40010] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
      >
        ×
      </button>
    </span>
  );
}

export function DestinationSearchSection() {
  const listId = useId();
  const destinationRef = useRef<HTMLDivElement>(null);

  const [draftFilters, setDraftFilters] = useState<DestinationSearchFilters>(
    DEFAULT_DESTINATION_FILTERS,
  );
  const [appliedFilters, setAppliedFilters] = useState<DestinationSearchFilters>(
    DEFAULT_DESTINATION_FILTERS,
  );
  const [results, setResults] = useState<Destination[]>(() =>
    filterDestinations(MOCK_DESTINATIONS, DEFAULT_DESTINATION_FILTERS),
  );
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(
    () => getDestinationSuggestions(draftFilters.query),
    [draftFilters.query],
  );

  const applyFilters = useCallback((filters: DestinationSearchFilters) => {
    setResults(filterDestinations(MOCK_DESTINATIONS, filters));
    setAppliedFilters(filters);
    setShowSuggestions(false);
  }, []);

  const runSearch = useCallback(async (filters: DestinationSearchFilters) => {
    setIsSearching(true);
    try {
      const data = await searchDestinations(filters);
      setResults(data);
      setAppliedFilters(filters);
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  }, []);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];

    if (appliedFilters.query.trim()) {
      chips.push({
        key: "query",
        label: `Destination: ${appliedFilters.query}`,
        onRemove: () => {
          const next = { ...appliedFilters, query: "" };
          setDraftFilters(next);
          applyFilters(next);
        },
      });
    }
    if (appliedFilters.region !== "All Regions") {
      chips.push({
        key: "region",
        label: appliedFilters.region,
        onRemove: () => {
          const next: DestinationSearchFilters = { ...appliedFilters, region: "All Regions" };
          setDraftFilters(next);
          applyFilters(next);
        },
      });
    }
    if (appliedFilters.travelStyle !== "All Styles") {
      chips.push({
        key: "style",
        label: appliedFilters.travelStyle,
        onRemove: () => {
          const next: DestinationSearchFilters = { ...appliedFilters, travelStyle: "All Styles" };
          setDraftFilters(next);
          applyFilters(next);
        },
      });
    }
    if (appliedFilters.travelMonth) {
      const monthLabel =
        DESTINATION_MONTHS.find((m) => m.value === appliedFilters.travelMonth)?.label ?? "";
      chips.push({
        key: "month",
        label: monthLabel,
        onRemove: () => {
          const next = { ...appliedFilters, travelMonth: "" };
          setDraftFilters(next);
          applyFilters(next);
        },
      });
    }
    if (appliedFilters.travelers !== DEFAULT_DESTINATION_FILTERS.travelers) {
      const travelerLabel =
        DESTINATION_TRAVELERS.find((t) => t.value === appliedFilters.travelers)?.label ?? "";
      chips.push({
        key: "travelers",
        label: travelerLabel,
        onRemove: () => {
          const next = { ...appliedFilters, travelers: DEFAULT_DESTINATION_FILTERS.travelers };
          setDraftFilters(next);
          applyFilters(next);
        },
      });
    }

    return chips;
  }, [appliedFilters, applyFilters]);

  useEffect(() => {
    if (!showSuggestions) return;
    const onDoc = (e: MouseEvent) => {
      if (!destinationRef.current?.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [showSuggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(draftFilters);
  };

  const handleClearAll = () => {
    setDraftFilters(DEFAULT_DESTINATION_FILTERS);
    applyFilters(DEFAULT_DESTINATION_FILTERS);
  };

  const handleSuggestionSelect = (place: Destination) => {
    const next = { ...draftFilters, query: place.title };
    setDraftFilters(next);
    runSearch(next);
  };

  return (
    <>
      <section className="border-y border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-6 md:py-8">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-extrabold text-[#e30613] md:text-3xl">Search Destinations</h2>
          </div>

          <form onSubmit={handleSearch}>
            <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_10px_28px_rgba(11,47,87,0.1)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
                <div
                  ref={destinationRef}
                  className="relative border-b border-slate-200 px-3.5 py-3 sm:border-r sm:border-b-0 lg:px-4"
                >
                  <label htmlFor="destination-query" className={fieldLabelClass}>
                    Destination
                  </label>
                  <input
                    id="destination-query"
                    type="text"
                    value={draftFilters.query}
                    onChange={(e) => {
                      setDraftFilters((prev) => ({ ...prev, query: e.target.value }));
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Where do you want to go?"
                    autoComplete="off"
                    className={fieldClass}
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <ul
                      id={listId}
                      className="absolute top-full right-0 left-0 z-30 mt-1 max-h-56 overflow-auto border border-slate-200 bg-white py-1 shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                    >
                      {suggestions.map((place) => (
                        <li key={place.id}>
                          <button
                            type="button"
                            onClick={() => handleSuggestionSelect(place)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-slate-50"
                          >
                            <span>
                              <span className="font-semibold text-[#0b2f57]">{place.title}</span>
                              <span className="mt-0.5 block text-xs text-gray-500">
                                {place.subtitle} · {place.region}
                              </span>
                            </span>
                            <span className="text-xs font-semibold text-[#e30613]">
                              {place.packages} packages
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-b border-slate-200 px-3.5 py-3 sm:border-r sm:border-b-0 lg:px-4">
                  <label htmlFor="travel-month" className={fieldLabelClass}>
                    Travel Month
                  </label>
                  <select
                    id="travel-month"
                    value={draftFilters.travelMonth}
                    onChange={(e) =>
                      setDraftFilters((prev) => ({ ...prev, travelMonth: e.target.value }))
                    }
                    className={selectClass}
                  >
                    {DESTINATION_MONTHS.map((month) => (
                      <option key={month.value || "any"} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-b border-slate-200 px-3.5 py-3 sm:border-b-0 lg:border-r lg:px-4">
                  <label htmlFor="travelers" className={fieldLabelClass}>
                    Travelers
                  </label>
                  <select
                    id="travelers"
                    value={draftFilters.travelers}
                    onChange={(e) =>
                      setDraftFilters((prev) => ({ ...prev, travelers: e.target.value }))
                    }
                    className={selectClass}
                  >
                    {DESTINATION_TRAVELERS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-full flex items-stretch px-3.5 py-3 sm:col-span-2 lg:col-span-1 lg:px-4">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="btn-premium flex w-full min-w-[100px] items-center justify-center bg-[#e30613] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c40010] disabled:cursor-wait disabled:opacity-80 lg:w-auto"
                  >
                    {isSearching ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Region
              </p>
              <div className="-mx-4 flex flex-nowrap justify-center gap-1.5 overflow-x-auto px-4 pb-1 snap-x snap-mandatory">
                {DESTINATION_REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() =>
                      setDraftFilters((prev) => ({
                        ...prev,
                        region: region as DestinationRegion,
                      }))
                    }
                    className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition min-h-[44px] ${
                      draftFilters.region === region
                        ? "bg-[#e30613] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#e30613] hover:text-[#e30613]"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Travel Style
              </p>
              <div className="-mx-4 flex flex-nowrap justify-center gap-1.5 overflow-x-auto px-4 pb-1 snap-x snap-mandatory">
                {DESTINATION_TRAVEL_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() =>
                      setDraftFilters((prev) => ({
                        ...prev,
                        travelStyle: style as DestinationTravelStyle,
                      }))
                    }
                    className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition min-h-[44px] ${
                      draftFilters.travelStyle === style
                        ? "bg-[#0b2f57] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#0b2f57] hover:text-[#0b2f57]"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-8 md:py-10">
        <div className="mb-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
            {isSearching ? "Finding destinations..." : "Search Results"}
          </p>
          <p className="mt-2 text-sm font-semibold text-[#0b2f57]">
            <span className="text-[#e30613]">{results.length}</span> destinations
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#0b2f57]">
              Sort by
              <select
                value={draftFilters.sortBy}
                onChange={(e) => {
                  const sortBy = e.target.value as DestinationSearchFilters["sortBy"];
                  const next = { ...draftFilters, sortBy };
                  setDraftFilters(next);
                  applyFilters(next);
                }}
                className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-[#0b2f57] outline-none focus:border-[#e30613] min-h-[44px]"
              >
                {DESTINATION_SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {hasActiveFilters(appliedFilters) && (
              <button
                type="button"
                onClick={handleClearAll}
                className="min-h-[44px] px-2 text-sm font-semibold text-[#e30613] transition hover:text-[#c40010]"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {activeFilterChips.length > 0 && (
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {activeFilterChips.map((chip) => (
              <FilterChip key={chip.key} label={chip.label} onRemove={chip.onRemove} />
            ))}
          </div>
        )}

        {isSearching ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-52 rounded-xl bg-slate-200 sm:h-56" />
                <div className="mt-4 h-3 w-24 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-40 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-28 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-[#f8fafc] px-6 py-14 text-center">
            <p className="text-lg font-bold text-[#0b2f57]">No destinations found</p>
            <p className="mx-auto mt-2 max-w-md text-base text-gray-500">
              Try a different search term, region or travel style. You can also contact us for a
              custom travel plan.
            </p>
            <button
              type="button"
              onClick={handleClearAll}
                className="btn-premium mt-6 min-h-[44px] w-full bg-[#e30613] px-6 py-3 text-sm font-semibold text-white hover:bg-[#c40010] sm:w-auto"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((place, index) => (
              <motion.article
                key={place.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={place.image}
                    alt={place.title}
                    width={700}
                    height={420}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-56"
                  />
                  <span className={imageBadgeClass}>{place.region}</span>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#e30613]">
                  {place.subtitle}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#0b2f57]">{place.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{place.packages} Packages</p>
                <p className="mt-1 text-xs text-gray-400">
                  {place.travelStyles.join(" · ")}
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#e30613] transition group-hover:gap-2"
                >
                  Explore Now <span aria-hidden>→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
