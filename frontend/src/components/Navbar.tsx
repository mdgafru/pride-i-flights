"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT_EMAIL, CONTACT_PHONE, MAILTO_URL, TEL_URL, WHATSAPP_URL } from "@/lib/contact";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Tour Packages", href: "/packages" },
  { label: "Visa", href: "/visa" },
  { label: "Travel Insurance", href: "/travel-insurance" },
  { label: "Destinations", href: "/destinations" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
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
              <a href={TEL_URL} className="hover:text-blue-100">
                {CONTACT_PHONE}
              </a>
              <a href={MAILTO_URL} className="hover:text-blue-100">
                {CONTACT_EMAIL}
              </a>
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
          <Link href="/" className="inline-flex shrink-0 bg-transparent leading-none">
            <BrandLogo />
          </Link>

          <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.01em] text-[#1f2937] sm:gap-x-3.5 sm:text-xs lg:flex lg:gap-x-4 lg:text-[13px] xl:text-[14px]">
            {navLinks.map((link) => {
              const className = `shrink-0 whitespace-nowrap transition ${
                link.label === active
                  ? "border-b-2 border-[#e30613] pb-1 text-[#e30613]"
                  : "premium-link hover:text-[#e30613]"
              }`;

              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link key={link.label} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-premium premium-shadow hidden items-center gap-1.5 bg-[#e30613] px-3 py-2 text-xs font-semibold text-white sm:inline-flex lg:px-4 lg:text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Enquire Now
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
              {navLinks.map((link) => {
                const className = `rounded-lg px-3 py-2 hover:bg-gray-100 ${
                  link.label === active ? "text-[#e30613]" : ""
                }`;

                if (link.external) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={className}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={className}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-premium mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#e30613] px-3 py-2.5 text-sm font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Enquire Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
