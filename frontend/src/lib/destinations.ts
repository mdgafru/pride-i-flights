import type {
  Destination,
  DestinationSearchFilters,
  DestinationSortBy,
} from "@/types/destination";

export { DEFAULT_DESTINATION_FILTERS } from "@/types/destination";

export const DESTINATION_REGIONS = [
  "All Regions",
  "Asia",
  "Europe",
  "Middle East",
  "Americas",
] as const;

export const DESTINATION_TRAVEL_STYLES = [
  "All Styles",
  "Beach & Island",
  "City Breaks",
  "Adventure",
  "Family Holidays",
] as const;

export const DESTINATION_MONTHS = [
  { value: "", label: "Any month" },
  { value: "jan", label: "January" },
  { value: "feb", label: "February" },
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
  { value: "jun", label: "June" },
  { value: "jul", label: "July" },
  { value: "aug", label: "August" },
  { value: "sep", label: "September" },
  { value: "oct", label: "October" },
  { value: "nov", label: "November" },
  { value: "dec", label: "December" },
];

export const DESTINATION_TRAVELERS = [
  { value: "1a", label: "1 Adult" },
  { value: "2a", label: "2 Adults" },
  { value: "1a1c", label: "1 Adult, 1 Child" },
  { value: "2a1c", label: "2 Adults, 1 Child" },
  { value: "2a2c", label: "2 Adults, 2 Children" },
  { value: "3a", label: "3 Adults" },
];

export const DESTINATION_SORT_OPTIONS: { value: DestinationSortBy; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "packages", label: "Most Packages" },
  { value: "name", label: "A to Z" },
];

/** Mock data — replace with API response when backend is ready. */
export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "bali",
    title: "Bali, Indonesia",
    subtitle: "Island of Gods",
    country: "Indonesia",
    packages: 32,
    region: "Asia",
    travelStyles: ["Beach & Island", "Adventure", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    popularScore: 95,
  },
  {
    id: "dubai",
    title: "Dubai, UAE",
    subtitle: "City of Dreams",
    country: "UAE",
    packages: 28,
    region: "Middle East",
    travelStyles: ["City Breaks", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    popularScore: 98,
  },
  {
    id: "paris",
    title: "Paris, France",
    subtitle: "City of Love",
    country: "France",
    packages: 24,
    region: "Europe",
    travelStyles: ["City Breaks", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    popularScore: 92,
  },
  {
    id: "maldives",
    title: "Maldives",
    subtitle: "Tropical Paradise",
    country: "Maldives",
    packages: 18,
    region: "Asia",
    travelStyles: ["Beach & Island", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    popularScore: 90,
  },
  {
    id: "singapore",
    title: "Singapore",
    subtitle: "City of Possibilities",
    country: "Singapore",
    packages: 22,
    region: "Asia",
    travelStyles: ["City Breaks", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    popularScore: 88,
  },
  {
    id: "switzerland",
    title: "Switzerland",
    subtitle: "Alpine Beauty",
    country: "Switzerland",
    packages: 20,
    region: "Europe",
    travelStyles: ["Adventure", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
    popularScore: 86,
  },
  {
    id: "new-york",
    title: "New York, USA",
    subtitle: "The Big Apple",
    country: "USA",
    packages: 26,
    region: "Americas",
    travelStyles: ["City Breaks", "Adventure"],
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    popularScore: 91,
  },
  {
    id: "istanbul",
    title: "Istanbul, Turkey",
    subtitle: "Where East Meets West",
    country: "Turkey",
    packages: 19,
    region: "Europe",
    travelStyles: ["City Breaks", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
    popularScore: 84,
  },
  {
    id: "thailand",
    title: "Bangkok, Thailand",
    subtitle: "Land of Smiles",
    country: "Thailand",
    packages: 30,
    region: "Asia",
    travelStyles: ["City Breaks", "Beach & Island", "Family Holidays"],
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    popularScore: 87,
  },
];

function sortDestinations(items: Destination[], sortBy: DestinationSortBy): Destination[] {
  const sorted = [...items];
  if (sortBy === "popular") {
    return sorted.sort((a, b) => b.popularScore - a.popularScore);
  }
  if (sortBy === "packages") {
    return sorted.sort((a, b) => b.packages - a.packages);
  }
  return sorted.sort((a, b) => a.title.localeCompare(b.title));
}

export function filterDestinations(
  items: Destination[],
  filters: DestinationSearchFilters,
): Destination[] {
  const query = filters.query.trim().toLowerCase();

  const filtered = items.filter((place) => {
    const matchesQuery =
      !query ||
      place.title.toLowerCase().includes(query) ||
      place.subtitle.toLowerCase().includes(query) ||
      place.country.toLowerCase().includes(query) ||
      place.region.toLowerCase().includes(query);

    const matchesRegion =
      filters.region === "All Regions" || place.region === filters.region;

    const matchesStyle =
      filters.travelStyle === "All Styles" ||
      place.travelStyles.includes(filters.travelStyle);

    return matchesQuery && matchesRegion && matchesStyle;
  });

  return sortDestinations(filtered, filters.sortBy);
}

export function getDestinationSuggestions(query: string, limit = 6): Destination[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return MOCK_DESTINATIONS.filter(
    (place) =>
      place.title.toLowerCase().includes(normalized) ||
      place.country.toLowerCase().includes(normalized) ||
      place.subtitle.toLowerCase().includes(normalized),
  ).slice(0, limit);
}

/** Simulates API call — swap this function when backend is ready. */
export async function searchDestinations(
  filters: DestinationSearchFilters,
): Promise<Destination[]> {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return filterDestinations(MOCK_DESTINATIONS, filters);
}
