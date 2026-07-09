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

export const dashboardNavItems: {
  key: string;
  label: string;
  href: string;
  icon: DashboardIconKey;
}[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: "layout" },
  { key: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: "chart" },
  { key: "airports", label: "Airports", href: "/dashboard/airports", icon: "map-pinned" },
  { key: "airlines", label: "Airlines", href: "/dashboard/airlines", icon: "plane" },
  { key: "hotels", label: "Hotels", href: "/dashboard/hotels", icon: "hotel" },
  { key: "visa", label: "Visa", href: "/dashboard/visa", icon: "visa" },
  { key: "insurance", label: "Insurance", href: "/dashboard/insurance", icon: "insurance" },
  { key: "routes", label: "Routes", href: "/dashboard/routes", icon: "route" },
  { key: "excel-import", label: "Excel Import", href: "/dashboard/excel-import", icon: "file-up" },
  { key: "banner-images", label: "Banner Images", href: "/dashboard/banner-images", icon: "image" },
  { key: "seo-pages", label: "SEO Pages", href: "/dashboard/seo-pages", icon: "search" },
  { key: "blog", label: "Blog", href: "/dashboard/blog", icon: "file-text" },
  { key: "settings", label: "Settings", href: "/dashboard/settings", icon: "settings" },
];
