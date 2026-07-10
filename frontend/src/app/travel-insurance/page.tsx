"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { WHATSAPP_URL } from "@/lib/contact";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=90";
const CTA_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85";

const eyebrowClass = "text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]";
const sectionTitleClass = "text-3xl font-extrabold leading-tight text-[#e30613] md:text-4xl";
const bodyClass = "text-base leading-relaxed text-gray-600";

const highlights = [
  { title: "All Airlines Covered", sub: "Valid for international flight bookings" },
  { title: "Medical Emergency", sub: "Hospital and evacuation support abroad" },
  { title: "24/7 Claim Help", sub: "Assistance before and during travel" },
];

const trustItems = [
  { title: "Flight Delay Cover", sub: "Protection for schedule disruptions" },
  { title: "Trip Cancellation", sub: "Cover for unexpected plan changes" },
  { title: "Baggage Protection", sub: "Lost or delayed luggage support" },
];

const plans = [
  {
    name: "Essential",
    badge: "Single Trip",
    price: "From $29",
    bestFor: "Short international trips",
    features: [
      "Medical expenses up to $50,000",
      "Flight delay cover up to $200",
      "Lost baggage assistance",
      "Emergency helpline 24/7",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    badge: "Most Popular",
    price: "From $59",
    bestFor: "Family and business travel",
    features: [
      "Medical expenses up to $150,000",
      "Trip cancellation & interruption",
      "Missed connection cover",
      "Emergency evacuation support",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    badge: "Full Protection",
    price: "From $99",
    bestFor: "Long-haul and multi-city trips",
    features: [
      "Medical expenses up to $300,000",
      "Adventure sports add-on options",
      "Family coverage up to 4 members",
      "Priority claim assistance",
    ],
    highlighted: false,
  },
];

const coverageItems = [
  {
    title: "Medical Emergency Abroad",
    text: "Hospital treatment, doctor visits and emergency care while travelling on international flights.",
  },
  {
    title: "Flight Delay & Missed Connection",
    text: "Compensation support when airlines delay flights or connections are missed due to schedule changes.",
  },
  {
    title: "Trip Cancellation & Curtailment",
    text: "Cover when you must cancel or cut short a trip due to covered emergencies or airline disruptions.",
  },
  {
    title: "Baggage Loss & Delay",
    text: "Assistance when checked baggage is lost, stolen or delayed by the airline.",
  },
  {
    title: "Personal Liability",
    text: "Protection against accidental injury or property damage to others during your journey.",
  },
  {
    title: "Passport & Document Loss",
    text: "Support for emergency document replacement when travelling internationally.",
  },
];

const airlineBenefits = [
  "Works with Emirates, Qatar Airways, Etihad and major global carriers",
  "Suitable for one-way, return and multi-city itineraries",
  "Coverage starts from departure date of your flight",
  "Add insurance when booking flights with REDE I FLIGHTS",
];

const claimSteps = [
  { n: "01", title: "Contact Our Team", text: "Call or WhatsApp us with your policy and flight details." },
  { n: "02", title: "Submit Documents", text: "Share airline notice, medical reports or baggage reports." },
  { n: "03", title: "Claim Processing", text: "Our advisors guide you through insurer claim steps." },
];

function getPlanWhatsAppUrl(planName: string, price: string) {
  const message = `Hi, I am interested in the ${planName} travel insurance plan (${price}). Please share details.`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export default function TravelInsurancePage() {
  return (
    <SiteShell active="Travel Insurance">
      {/* Hero */}
      <section className="relative min-h-[520px] overflow-hidden md:min-h-[580px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_45%] brightness-[1.1] saturate-[1.14] contrast-[1.06]"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#042448]/90 via-[#0b2f57]/62 to-[#0b2f57]/25" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#042448]/40 via-transparent to-transparent" />

        <div className="relative z-[2] mx-auto max-w-[1260px] px-4 pt-14 pb-36 md:pt-20 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#e30613] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
              Fly Protected · REDE I FLIGHTS
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.15] text-[#e30613] drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)] sm:text-5xl lg:text-[3.25rem]">
              Travel Insurance
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
              Airline-ready travel insurance for international journeys. Medical cover, flight delays,
              trip cancellation and baggage protection - aligned with how you fly.
            </p>
            <p className="mt-6 text-base text-white/90">
              <Link href="/" className="font-medium transition hover:text-white">
                Home
              </Link>
              <span className="mx-2 text-[#ff6b75]">&gt;</span>
              <span className="font-semibold text-white">Travel Insurance</span>
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

      {/* Plans */}
      <section className="mx-auto max-w-[1260px] px-4 py-12 md:py-16">
        <div className="mb-10 text-center">
          <p className={eyebrowClass}>Insurance Plans</p>
          <h2 className={`mt-2 ${sectionTitleClass}`}>Choose Your Cover</h2>
          <p className={`mx-auto mt-3 max-w-2xl ${bodyClass}`}>
            Transparent plans designed for international air travel - no hidden terms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={`rounded-xl border bg-white p-6 ${
                plan.highlighted
                  ? "border-[#e30613] shadow-[0_12px_32px_rgba(227,6,19,0.12)]"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#e30613]">
                    {plan.badge}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold text-[#0b2f57]">{plan.name}</h3>
                </div>
                <p className="text-right text-xl font-extrabold text-[#e30613]">{plan.price}</p>
              </div>
              <p className="mt-3 text-sm text-gray-500">Best for: {plan.bestFor}</p>
              <ul className="mt-5 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="home-feature border-l-[3px] border-[#e30613]/30 py-0.5 pl-4 text-sm text-gray-600"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={getPlanWhatsAppUrl(plan.name, plan.price)}
                target="_blank"
                rel="noreferrer"
                className={`btn-premium mt-6 inline-block w-full px-5 py-3 text-center text-sm font-semibold ${
                  plan.highlighted
                    ? "bg-[#e30613] text-white hover:bg-[#c40010]"
                    : "border border-[#0b2f57] text-[#0b2f57] hover:bg-[#0b2f57] hover:text-white"
                }`}
              >
                Select Plan
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Coverage details */}
      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-12 md:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className={eyebrowClass}>What&apos;s Covered</p>
              <h2 className={`mt-2 ${sectionTitleClass}`}>Airline Travel Protection</h2>
              <p className={`mt-4 ${bodyClass}`}>
                Our insurance options are built around real flight travel risks - from departure
                delays to medical emergencies abroad.
              </p>
              <div className="mt-6 space-y-4">
                {coverageItems.map((item) => (
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
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80"
                alt="International flight travel"
                width={900}
                height={600}
                className="h-72 w-full object-cover sm:h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042448]/75 to-transparent" />
              <div className="absolute right-4 bottom-4 left-4">
                <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                  International Flights
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  Insurance aligned with your airline itinerary
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Airline compatibility */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1260px] px-4 py-12 md:py-14">
          <div className="mb-8 text-center">
            <p className={eyebrowClass}>For All Airlines</p>
            <h2 className={`mt-2 ${sectionTitleClass}`}>Works With Your Flight Booking</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {airlineBenefits.map((item) => (
              <div
                key={item}
                className="home-feature border-l-[3px] border-[#e30613]/30 bg-[#f8fafc] px-5 py-4"
              >
                <p className="text-sm font-semibold text-[#0b2f57] sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claims */}
      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-12 md:py-14">
          <div className="mb-10 text-center">
            <p className={eyebrowClass}>Claims Support</p>
            <h2 className={`mt-2 ${sectionTitleClass}`}>Simple Claim Process</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {claimSteps.map((step, index) => (
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
            Fly With Peace of Mind
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#e30613] md:text-4xl">
            Add Insurance To Your Next Flight
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90">
            Speak with our travel advisors for the right cover based on your airline, route and
            travel dates.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-premium bg-[#e30613] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#c40010]"
            >
              Get Insurance Quote
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
