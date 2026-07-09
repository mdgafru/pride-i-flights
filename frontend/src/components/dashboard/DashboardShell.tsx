"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { dashboardNavItems } from "@/components/dashboard/dashboard-nav";
import {
  BadgeCheck,
  BarChart3,
  ChevronLeft,
  Hotel,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  Plane,
  Route,
  Search,
  Settings,
  FileText,
  FileUp,
  Image,
  LoaderCircle,
} from "lucide-react";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

function isValidSupabaseConfig(url?: string, key?: string) {
  if (!url || !key) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function DashboardShell({
  title,
  breadcrumb,
  children,
}: {
  title: string;
  breadcrumb?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const iconByKey = {
    layout: LayoutDashboard,
    chart: BarChart3,
    "map-pinned": MapPinned,
    plane: Plane,
    hotel: Hotel,
    visa: BadgeCheck,
    insurance: ShieldCheck,
    route: Route,
    "file-up": FileUp,
    image: Image,
    search: Search,
    "file-text": FileText,
    settings: Settings,
  };

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
      try {
        const client = createBrowserClient(supabaseUrl!, supabaseAnonKey!);
        await client.auth.signOut();
      } catch (error) {
        console.warn("Supabase sign out skipped:", error);
      }
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="dash-shell min-h-screen text-slate-800">
      <div
        className={`grid min-h-screen grid-cols-1 ${
          sidebarCollapsed ? "lg:grid-cols-[84px_1fr]" : "lg:grid-cols-[220px_1fr]"
        }`}
      >
        {menuOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-slate-900/45 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <aside
          id="dashboard-sidebar"
          className={`dash-sidebar fixed inset-y-0 left-0 z-40 flex flex-col overflow-hidden transform transition-all duration-200 lg:static lg:translate-x-0 ${
            sidebarCollapsed ? "w-[84px] lg:w-[84px]" : "w-[220px] lg:w-[220px]"
          } ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className={`dash-sidebar-brand shrink-0 border-b border-white/10 ${
              sidebarCollapsed ? "px-2 py-2.5 text-center lg:px-2" : "px-3 py-2.5"
            }`}
          >
            {sidebarCollapsed ? (
              <p className="hidden text-sm font-extrabold text-white lg:block">
                <span className="text-[#ff6b76]">FC</span>
              </p>
            ) : (
              <>
                <p className="truncate text-sm font-extrabold tracking-wide text-white">
                  FLIGHT<span className="text-[#ff6b76]">CENTRE</span>
                </p>
                <p className="truncate text-[10px] uppercase tracking-[0.14em] text-blue-100/70">
                  Admin Panel
                </p>
              </>
            )}
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
            {dashboardNavItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    if (item.href === pathname || pendingHref) return;
                    event.preventDefault();
                    setMenuOpen(false);
                    setPendingHref(item.href);
                    router.push(item.href);
                  }}
                  className={`dash-nav-link ${active ? "dash-nav-link-active" : ""} ${
                    sidebarCollapsed ? "lg:justify-center" : ""
                  }`}
                >
                  {(() => {
                    const Icon = iconByKey[item.icon];
                    return <Icon size={14} className="shrink-0" />;
                  })()}
                  <span
                    className={`truncate ${sidebarCollapsed ? "lg:hidden" : ""}`}
                  >
                    {item.label}
                  </span>
                  {pendingHref === item.href && (
                    <LoaderCircle size={13} className="dash-inline-spinner ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-2">
            <button
              type="button"
              className="dash-signout-btn w-full"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              <LogOut size={14} />
              <span className={sidebarCollapsed ? "lg:hidden" : ""}>
                {signingOut ? "Signing out..." : "Sign Out"}
              </span>
            </button>
          </div>
        </aside>

        <section className="flex min-h-screen min-w-0 flex-col">
          <header className="dash-topbar sticky top-0 z-20">
            {pendingHref && <div className="dash-top-loader" />}
            <div className="flex items-center justify-between gap-2 px-2.5 py-2 sm:px-3">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  className="dash-menu-btn"
                  onClick={() => {
                    if (!isDesktop) {
                      setMenuOpen((prev) => !prev);
                      return;
                    }
                    setSidebarCollapsed((prev) => !prev);
                  }}
                  aria-expanded={isDesktop ? !sidebarCollapsed : menuOpen}
                  aria-controls="dashboard-sidebar"
                >
                  {!isDesktop ? (
                    menuOpen ? <ChevronLeft size={14} /> : <Menu size={14} />
                  ) : sidebarCollapsed ? (
                    <Menu size={14} />
                  ) : (
                    <ChevronLeft size={14} />
                  )}
                  <span>
                    {!isDesktop
                      ? menuOpen
                        ? "Close"
                        : "Menu"
                      : sidebarCollapsed
                        ? "Expand"
                        : "Collapse"}
                  </span>
                </button>
                <div className="min-w-0">
                  <p className="truncate text-[11px] text-slate-500">
                    {breadcrumb ?? "Home / Dashboard"}
                  </p>
                  <h1 className="truncate text-sm font-bold text-[#0b2f57]">{title}</h1>
                </div>
              </div>

              <div className="dash-header-chip">Admin</div>
            </div>
          </header>

          <div className="dash-content flex-1">{children}</div>
        </section>
      </div>
    </main>
  );
}
