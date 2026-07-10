"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContentPageHero } from "@/components/ContentPageHero";
import { DestinationSearchSection } from "@/components/destinations/DestinationSearchSection";
import { SiteShell } from "@/components/SiteShell";
import { WHATSAPP_URL } from "@/lib/contact";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=85";
const FEATURED_IMAGE =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85";
const CTA_IMAGE =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=85";

const eyebrowClass = "text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]";
const sectionTitleClass = "text-2xl font-extrabold leading-tight text-[#e30613] sm:text-3xl md:text-4xl";
const bodyClass = "text-base leading-relaxed text-gray-600";

const travelTypes = [
  { title: "Beach & Island", sub: "Relax by the sea" },
  { title: "City Breaks", sub: "Urban culture & shopping" },
  { title: "Adventure", sub: "Thrills & outdoor trips" },
  { title: "Family Holidays", sub: "Comfort for all ages" },
];

const highlights = [
  { title: "150+ Destinations", sub: "Worldwide travel options" },
  { title: "Curated Packages", sub: "Handpicked by our experts" },
  { title: "Best Price Options", sub: "Transparent, competitive fares" },
];

const strengths = [
  { title: "Expert Planning", text: "Routes, stays and visas handled by specialists." },
  { title: "Flexible Options", text: "Dates, budgets and travel styles tailored to you." },
  { title: "UAE-Based Team", text: "Local advisors with global destination knowledge." },
  { title: "End-to-End Support", text: "From enquiry to return - we stay with you." },
];

export default function DestinationsPage() {
  return (
    <SiteShell active="Destinations">
      <ContentPageHero
        image={HERO_IMAGE}
        eyebrow="Explore The World · REDE I FLIGHTS"
        title="Destinations"
        description="Discover handpicked destinations worldwide. From Dubai to Europe, Asia and beyond - plan your next journey with trusted UAE travel experts."
        breadcrumb="Destinations"
        highlights={highlights}
      />

      <DestinationSearchSection />

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1260px] grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { title: "Global Coverage", sub: "International flights worldwide" },
            { title: "Personalized Plans", sub: "Built around your dates and budget" },
            { title: "24/7 Assistance", sub: "Support before and after travel" },
          ].map((item) => (
            <div key={item.title} className="px-6 py-7 text-center sm:py-8">
              <p className="text-lg font-bold text-[#e30613]">{item.title}</p>
              <p className="mt-2 text-base text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured destination */}
      <section className="mx-auto max-w-[1260px] px-4 py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative order-2 overflow-hidden rounded-xl lg:order-1">
            <Image
              src={FEATURED_IMAGE}
              alt="Dubai skyline"
              width={900}
              height={600}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#042448]/75 to-transparent" />
            <div className="absolute right-4 bottom-4 left-4">
              <p className="text-xs font-bold uppercase tracking-wide text-white/80">Featured</p>
              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">Dubai, UAE</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className={eyebrowClass}>Top Pick</p>
            <h2 className={`mt-2 ${sectionTitleClass}`}>City of Dreams</h2>
            <p className={`mt-4 ${bodyClass}`}>
              Dubai remains one of our most requested destinations - luxury stays, family holidays,
              shopping breaks and seamless flight connections from the UAE.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["28 Curated Packages", "Flights & Hotels", "Visa Guidance", "Family Friendly"].map(
                (item) => (
                  <div
                    key={item}
                    className="home-feature border-l-[3px] border-[#e30613]/30 py-1 pl-4"
                  >
                    <p className="text-sm font-semibold text-[#0b2f57] sm:text-base">{item}</p>
                  </div>
                ),
              )}
            </div>
            <Link
              href="/contact"
              className="btn-premium mt-7 inline-block bg-[#e30613] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#c40010]"
            >
              Plan Dubai Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Travel types */}
      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-12 md:py-14">
          <div className="mb-8 text-center">
            <p className={eyebrowClass}>Travel Styles</p>
            <h2 className={`mt-2 ${sectionTitleClass}`}>Every Kind of Journey</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {travelTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="home-feature border-l-[3px] border-[#e30613]/30 bg-white px-5 py-5"
              >
                <p className="text-base font-bold text-[#e30613]">{type.title}</p>
                <p className="mt-2 text-sm text-gray-500">{type.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why book */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1260px] px-4 py-12 md:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className={eyebrowClass}>Why Book With Us</p>
              <h2 className={`mt-2 ${sectionTitleClass}`}>Plan With Confidence</h2>
              <p className={`mt-4 ${bodyClass}`}>
                Whether it is a family holiday, honeymoon or business trip - our team finds the
                right destination, dates and budget with honest advice and fast support.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {strengths.map((item) => (
                  <div
                    key={item.title}
                    className="home-feature border-l-[3px] border-[#e30613]/30 py-0.5 pl-4"
                  >
                    <p className="text-sm font-bold text-[#e30613] sm:text-base">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80"
                alt="Maldives tropical destination"
                width={900}
                height={600}
                className="h-64 w-full object-cover sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042448]/70 to-transparent" />
              <div className="absolute right-4 bottom-4 left-4">
                <p className="text-xs font-bold uppercase tracking-wide text-white/75">
                  Worldwide Destinations
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  From UAE to the world - every journey possible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CTA_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 z-0 h-full w-full object-cover object-center brightness-[0.55]"
        />
        <div className="absolute inset-0 z-[1] bg-[#042448]/88" />

        <div className="relative z-[2] mx-auto max-w-[1260px] px-4 py-14 text-center md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
            Ready to Travel?
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#e30613] md:text-4xl">
            Let&apos;s Plan Your Next Destination
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90">
            Share your travel plans and our experts will send curated options within hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-premium bg-[#e30613] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#c40010]"
            >
              Contact Us
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-premium inline-flex items-center gap-2 border border-white/35 bg-white/10 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/20"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
