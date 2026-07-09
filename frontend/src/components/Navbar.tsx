"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";

const navLinks = [
  { label: "Home", href: "/", enabled: true },
  // Keep these visible in navbar, but disabled for now.
  { label: "Flights", href: "/flights", enabled: false },
  { label: "Hotels", href: "/hotels", enabled: false },
  { label: "Tour Packages", href: "/packages", enabled: false },
  { label: "Visa", href: "/visa", enabled: false },
  { label: "Travel Insurance", href: "/travel-insurance", enabled: false },
  { label: "Destinations", href: "/destinations", enabled: false },
  { label: "About Us", href: "/about", enabled: false },
  { label: "Contact Us", href: "/contact", enabled: false },
];

export function Navbar({
  active = "Home",
  overlay = false,
}: {
  active?: string;
  overlay?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`${
        overlay ? "absolute inset-x-0 top-0 z-50" : "fixed inset-x-0 top-0 z-50 shadow-sm"
      }`}
    >
      {!overlay && (
        <div className="bg-[#042448] text-white">
          <div className="mx-auto flex max-w-[1260px] flex-col gap-1 px-4 py-1.5 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:text-xs">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 sm:gap-6">
              <span>+1 234 567 8900</span>
              <span>info@redeiflights.com</span>
            </div>
            <span className="text-blue-100">Mon - Sun: 9:00 AM - 9:00 PM</span>
          </div>
        </div>
      )}

      <div
        className={
          overlay
            ? "border-b border-white/20 bg-white/90 backdrop-blur-md"
            : "border-b border-slate-200 bg-white"
        }
      >
        <div className="mx-auto flex max-w-[1260px] items-center justify-between gap-2 px-4 py-2.5 lg:gap-3">
          <Link href="/" className="inline-flex shrink-0 items-center gap-2 bg-transparent leading-none">
            <Image
              src="/icon.svg"
              alt="REDE icon"
              width={34}
              height={34}
              className="h-7 w-7 rounded-md bg-transparent sm:h-8 sm:w-8"
            />
            <Image
              src="/rede-flights-logo-clean.png"
              alt="REDE I FLIGHTS"
              width={320}
              height={110}
              priority
              unoptimized
              className="block h-auto w-[170px] bg-transparent sm:w-[190px] lg:w-[190px] xl:w-[210px]"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.01em] text-[#1f2937] sm:gap-x-3.5 sm:text-xs lg:flex lg:gap-x-4 lg:text-[13px] xl:text-[14px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 whitespace-nowrap ${
                  link.label === active
                    ? "border-b-2 border-[#e30613] pb-1 text-[#e30613]"
                    : link.enabled
                      ? "premium-link transition hover:text-[#e30613]"
                      : "cursor-not-allowed text-slate-500"
                }`}
                onClick={(e) => {
                  if (!link.enabled) e.preventDefault();
                }}
                aria-disabled={!link.enabled}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="https://wa.me/12345678900"
              target="_blank"
              rel="noreferrer"
              className="btn-premium premium-shadow hidden items-center gap-2 bg-[#e30613] px-3 py-2 text-xs font-semibold text-white sm:flex lg:px-4 lg:text-sm"
            >
              <WhatsAppIcon />
              <span className="hidden sm:inline">Enquire Now</span>
            </a>
            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="group relative grid h-12 w-12 place-items-center rounded-xl border border-slate-300/90 bg-gradient-to-b from-white to-slate-50 text-[#0b2f57] shadow-[0_6px_14px_rgba(15,23,42,0.1)] transition hover:border-[#e30613]/45 hover:text-[#e30613] lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 pb-4 lg:hidden">
            <div className="flex flex-col gap-2 pt-3 text-[15px] font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.enabled
                      ? "rounded-lg px-3 py-2 hover:bg-gray-100"
                      : "cursor-not-allowed rounded-lg px-3 py-2 text-slate-500"
                  }
                  onClick={(e) => {
                    if (!link.enabled) {
                      e.preventDefault();
                      return;
                    }
                    setIsMenuOpen(false);
                  }}
                  aria-disabled={!link.enabled}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
