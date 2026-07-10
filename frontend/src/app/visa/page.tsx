"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContentPageHero } from "@/components/ContentPageHero";
import { SiteShell } from "@/components/SiteShell";
import { WHATSAPP_URL } from "@/lib/contact";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=90";
const CTA_IMAGE =
  "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1800&q=85";

const eyebrowClass = "text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]";
const sectionTitleClass = "text-2xl font-extrabold leading-tight text-[#e30613] sm:text-3xl md:text-4xl";
const bodyClass = "text-base leading-relaxed text-gray-600";

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

const visaCards = [
  {
    id: "usa",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "schengen",
    country: "Schengen",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "uk",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "uae",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "australia",
    country: "Australia",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "canada",
    country: "Canada",
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
  return (
    <SiteShell active="Visa">
      <ContentPageHero
        image={HERO_IMAGE}
        imagePosition="center 40%"
        eyebrow="Hassle-Free Documentation · REDE I FLIGHTS"
        title="Visa Services"
        description="Expert visa guidance with high success rate and end-to-end support. Tourist and business visas handled by trusted travel advisors."
        breadcrumb="Visa Services"
        highlights={highlights}
      />

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

      {/* Visa cards */}
      <section className="mx-auto max-w-[1260px] px-4 py-12 md:py-16">
        <div className="mb-10 text-center">
          <p className={eyebrowClass}>Visa Destinations</p>
          <h2 className={`mt-2 ${sectionTitleClass}`}>Our Visa Services</h2>
          <p className={`mx-auto mt-3 max-w-2xl ${bodyClass}`}>
            Choose your destination and start your application with expert support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visaCards.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href="/contact"
                className="group relative block overflow-hidden rounded-xl"
              >
                <Image
                  src={item.image}
                  alt={item.country}
                  width={700}
                  height={420}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-56"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#042448]/90 via-[#042448]/35 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-3 p-5">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{item.country}</h3>
                  <span className="btn-premium shrink-0 bg-[#e30613] px-4 py-2.5 text-sm font-semibold text-white group-hover:bg-[#c40010]">
                    Apply Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
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
