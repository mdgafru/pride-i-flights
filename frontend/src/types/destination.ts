export type DestinationRegion =
  | "All Regions"
  | "Asia"
  | "Europe"
  | "Middle East"
  | "Americas";

export type DestinationTravelStyle =
  | "All Styles"
  | "Beach & Island"
  | "City Breaks"
  | "Adventure"
  | "Family Holidays";

export type DestinationSortBy = "popular" | "packages" | "name";

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  packages: number;
  region: Exclude<DestinationRegion, "All Regions">;
  travelStyles: Exclude<DestinationTravelStyle, "All Styles">[];
  image: string;
  popularScore: number;
}

export interface DestinationSearchFilters {
  query: string;
  region: DestinationRegion;
  travelStyle: DestinationTravelStyle;
  travelMonth: string;
  travelers: string;
  sortBy: DestinationSortBy;
}

export const DEFAULT_DESTINATION_FILTERS: DestinationSearchFilters = {
  query: "",
  region: "All Regions",
  travelStyle: "All Styles",
  travelMonth: "",
  travelers: "2a",
  sortBy: "popular",
};
