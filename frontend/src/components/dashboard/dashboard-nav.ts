export type DashboardIconKey =
  | "layout"
  | "chart"
  | "map-pinned"
  | "plane"
  | "hotel"
  | "visa"
  | "insurance"
  | "route"
  | "file-up"
  | "image"
  | "search"
  | "file-text"
  | "settings";

export type DashboardNavItem = {
  key: string;
  label: string;
  href: string;
  icon: DashboardIconKey;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: "layout" },
  { key: "enquiries", label: "Enquiries", href: "/dashboard/enquiries", icon: "file-text" },
  { key: "banner-images", label: "Banner Images", href: "/dashboard/banner-images", icon: "image" },
  { key: "routes", label: "Routes", href: "/dashboard/routes", icon: "route" },
  { key: "airlines", label: "Airlines", href: "/dashboard/airlines", icon: "plane" },
  { key: "airports", label: "Airports", href: "/dashboard/airports", icon: "map-pinned" },
  { key: "hotels", label: "Hotels", href: "/dashboard/hotels", icon: "hotel" },
  { key: "visa", label: "Visa", href: "/dashboard/visa", icon: "visa" },
  { key: "settings", label: "Settings", href: "/dashboard/settings", icon: "settings" },
];
