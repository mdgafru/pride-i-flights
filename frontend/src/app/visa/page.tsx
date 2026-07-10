"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { WHATSAPP_URL } from "@/lib/contact";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=90";
const CTA_IMAGE =
  "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1800&q=85";

const eyebrowClass = "text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]";
const sectionTitleClass = "text-3xl font-extrabold leading-tight text-[#e30613] md:text-4xl";
const bodyClass = "text-base leading-relaxed text-gray-600";
const imageBadgeClass =
  "absolute left-3 top-3 rounded-md bg-[#e30613] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm";

const highlights = [
  { title: "Expert Guidance", sub: "Document checklist and profile review" },
  { title: "High Success Rate", sub: "Trusted visa processing support" },
  { title: "Fast Processing", sub: "Priority handling for urgent travel" },
];

const trustItems = [
  { title: "Tourist Visas", sub: "Holiday and leisure travel worldwide" },
  { title: "Business Visas", sub: "Meetings, conferences and work trips" },
  { title: "Student Visas", sub: "Study abroad application support" },
];

const visaTypes = ["All Visas", "Tourist", "Business", "Student", "Family"];

const visaCards = [
  {
    id: "usa",
    country: "USA Visa",
    region: "Americas",
    types: ["Tourist", "Business", "Student"],
    typesLabel: "Tourist · Business · Student",
    price: "$160",
    processing: "10-15 days",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "schengen",
    country: "Schengen Visa",
    region: "Europe",
    types: ["Tourist", "Business", "Family"],
    typesLabel: "Tourist · Business · Family",
    price: "$110",
    processing: "7-12 days",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "uk",
    country: "UK Visa",
    region: "Europe",
    types: ["Tourist", "Student", "Business"],
    typesLabel: "Tourist · Student · Work",
    price: "$140",
    processing: "10-14 days",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "uae",
    country: "UAE Visa",
    region: "Middle East",
    types: ["Tourist", "Business", "Family"],
    typesLabel: "Tourist · Transit · Long Stay",
    price: "$95",
    processing: "3-5 days",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "australia",
    country: "Australia Visa",
    region: "Oceania",
    types: ["Tourist", "Student", "Business"],
    typesLabel: "Tourist · Student · Visit",
    price: "$135",
    processing: "8-12 days",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "canada",
    country: "Canada Visa",
    region: "Americas",
    types: ["Tourist", "Student", "Business"],
    typesLabel: "Tourist · Student · Business",
    price: "$150",
    processing: "12-18 days",
    image:
      "https://images.unsplash.com/photo-1519832979-6fa011b87667?auto=format&fit=crop&w=900&q=80",
  },
];

const strengths = [
  { title: "Profile Assessment", text: "We review your travel history and documents before submission." },
  { title: "Document Checklist", text: "Clear list of required papers for each visa type." },
  { title: "Application Review", text: "Forms checked by experienced visa advisors." },
  { title: "Status Updates", text: "Guidance from application to embassy decision." },
];

const documents = [
  "Valid passport (6+ months validity)",
  "Recent passport-size photographs",
  "Confirmed flight itinerary",
  "Hotel booking or invitation letter",
  "Bank statements and financial proof",
  "Travel insurance (where required)",
];

const steps = [
  { n: "01", title: "Share Your Plan", text: "Tell us destination, visa type and travel dates." },
  { n: "02", title: "Document Preparation", text: "We provide checklist and review your documents." },
  { n: "03", title: "Submit & Track", text: "Application support until visa decision." },
];

export default function VisaPage() {
  const [activeType, setActiveType] = useState("All Visas");

  const filteredVisas = useMemo(() => {
    if (activeType === "All Visas") return visaCards;
    return visaCards.filter((item) => item.types.includes(activeType));
  }, [activeType]);

  return (
    <SiteShell active="Visa">
      {/* Hero */}
      <section className="relative min-h-[520px] overflow-hidden md:min-h-[580px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_40%] brightness-[1.08] saturate-[1.12] contrast-[1.05]"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#042448]/92 via-[#0b2f57]/65 to-[#0b2f57]/30" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#042448]/45 via-transparent to-transparent" />

        <div className="relative z-[2] mx-auto max-w-[1260px] px-4 pt-14 pb-36 md:pt-20 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#e30613] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
              Hassle-Free Documentation · REDE I FLIGHTS
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.15] text-[#e30613] drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)] sm:text-5xl lg:text-[3.25rem]">
              Visa Services
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
              Expert visa guidance with high success rate and end-to-end support. Tourist, business
              and student visas handled by trusted UAE travel advisors.
            </p>
            <p className="mt-6 text-base text-white/90">
              <Link href="/" className="font-medium transition hover:text-white">
                Home
              </Link>
              <span className="mx-2 text-[#ff6b75]">&gt;</span>
              <span className="font-semibold text-white">Visa Services</span>
            </p>
          </motion.div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 z-[3] border-t border-white/20 bg-[#042448]/95 backdrop-blur-md">
          <div className="mx-auto grid max-w-[1260px] grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {highlights.map((item) => (
              <div key={item.title} className="px-6 py-5 text-center sm:px-8 sm:py-6">
                <p className="text-base font-bold text-[#e30613] sm:text-lg">{item.title}</p>
                <p className="mt-1 text-sm text-white/75">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1260px] grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trustItems.map((item) => (
            <div key={item.title} className="px-6 py-7 text-center sm:py-8">
              <p className="text-lg font-bold text-[#e30613]">{item.title}</p>
              <p className="mt-2 text-base text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visa filter */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-8 md:py-10">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-extrabold text-[#e30613] md:text-3xl">Browse Visa Types</h2>
          </div>
          <div className="flex flex-nowrap justify-center gap-1.5 overflow-x-auto px-1 pb-1">
            {visaTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeType === type
                    ? "bg-[#e30613] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#e30613] hover:text-[#e30613]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Visa cards */}
      <section className="mx-auto max-w-[1260px] px-4 py-12 md:py-16">
        <div className="mb-10 text-center">
          <p className={eyebrowClass}>Visa Destinations</p>
          <h2 className={`mt-2 ${sectionTitleClass}`}>Our Visa Services</h2>
          <p className={`mx-auto mt-3 max-w-2xl ${bodyClass}`}>
            Choose your destination and start your application with expert support.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#0b2f57]">
            Showing <span className="text-[#e30613]">{filteredVisas.length}</span> visa
            {filteredVisas.length === 1 ? "" : "s"}
          </p>
        </div>

        {filteredVisas.length === 0 ? (
          <p className="text-center text-base text-gray-500">
            No visas in this category. Contact us for a custom visa enquiry.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVisas.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.country}
                    width={700}
                    height={420}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-56"
                  />
                  <span className={imageBadgeClass}>{item.region}</span>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#e30613]">
                  {item.typesLabel}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#0b2f57]">{item.country}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Processing: <span className="font-semibold text-[#0b2f57]">{item.processing}</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  Starting from <span className="text-[#e30613]">{item.price}</span>
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#e30613] transition group-hover:gap-2"
                >
                  Apply Now <span aria-hidden>→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Why choose us */}
      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-12 md:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className={eyebrowClass}>Why Choose Us</p>
              <h2 className={`mt-2 ${sectionTitleClass}`}>Trusted Visa Support</h2>
              <p className={`mt-4 ${bodyClass}`}>
                From document preparation to embassy submission guidance - our team helps you apply
                with confidence and clarity.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

            <div>
              <p className={eyebrowClass}>Required Documents</p>
              <h2 className={`mt-2 ${sectionTitleClass}`}>What You May Need</h2>
              <ul className="mt-5 space-y-3">
                {documents.map((doc) => (
                  <li
                    key={doc}
                    className="home-feature border-l-[3px] border-[#e30613]/30 py-1 pl-4 text-sm text-gray-600 sm:text-base"
                  >
                    {doc}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                Exact requirements vary by country and visa type. We provide a tailored checklist
                for your application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1260px] px-4 py-12 md:py-14">
          <div className="mb-10 text-center">
            <p className={eyebrowClass}>How It Works</p>
            <h2 className={`mt-2 ${sectionTitleClass}`}>Simple 3-Step Process</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#e30613] bg-white text-sm font-bold text-[#e30613]">
                  {step.n}
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#e30613]">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
                  {step.text}
                </p>
              </motion.div>
            ))}
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
            Need Visa Help?
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#e30613] md:text-4xl">
            Consult Our Visa Experts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90">
            Our consultants will review your profile and guide you on the best visa path for your
            travel plans.
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
