"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FancySelect } from "@/components/FancySelect";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";

const heroSlides = [
  {
    label: "Treat yourself to",
    city: "New York",
    fromLabel: "New York flights from",
    price: "INR 82,200",
    meta: "Return, from Mumbai, Sep 2026",
    cta: "Search New York flights",
    href: "/flights",
  },
  {
    label: "Escape to",
    city: "Dubai",
    fromLabel: "Dubai flights from",
    price: "INR 28,499",
    meta: "Return, from Delhi, Oct 2026",
    cta: "Search Dubai flights",
    href: "/flights",
  },
  {
    label: "Discover",
    city: "London",
    fromLabel: "London flights from",
    price: "INR 54,900",
    meta: "Return, from Mumbai, Nov 2026",
    cta: "Search London flights",
    href: "/flights",
  },
];

const tripTypeOptions = [
  { value: "return", label: "Return trip" },
  { value: "oneway", label: "One way" },
];

const travelClassOptions = [
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

const passengerOptions = [
  { value: "1a", label: "1 Adult" },
  { value: "2a", label: "2 Adults" },
  { value: "1a1c", label: "1 Adult, 1 Child" },
  { value: "2a1c", label: "2 Adults, 1 Child" },
];

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/15";

const HERO_TRANSITION_SECONDS = 0.85;
const HERO_VISIBLE_MS = 5000;
const HERO_SKY =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80";

const services = [
  {
    title: "Flights",
    desc: "Best domestic & international flight deals with flexible options.",
    href: "/flights",
    badge: "Best Fares",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hotels",
    desc: "Curated stays from budget hotels to luxury resorts worldwide.",
    href: "/hotels",
    badge: "Verified Stays",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Visa",
    desc: "Expert visa guidance with high success rate and fast processing.",
    href: "/visa",
    badge: "Expert Help",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Travel Insurance",
    desc: "Protect your journey with reliable travel & medical insurance plans.",
    href: "/travel-insurance",
    badge: "Secure Cover",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
];

const destinations = [
  {
    title: "Bali, Indonesia",
    subtitle: "Island of Gods",
    packages: "32 Packages",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dubai, UAE",
    subtitle: "City of Dreams",
    packages: "28 Packages",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Paris, France",
    subtitle: "City of Love",
    packages: "24 Packages",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Maldives",
    subtitle: "Tropical Paradise",
    packages: "18 Packages",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Singapore",
    subtitle: "City of Possibilities",
    packages: "22 Packages",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
  },
];

const packages = [
  {
    tag: "Best Seller",
    title: "Romantic Europe Getaway",
    duration: "7D / 6N",
    price: "$1,299",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Popular",
    title: "Bali Island Escape",
    duration: "5D / 4N",
    price: "$699",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Hot Deal",
    title: "Dubai City Experience",
    duration: "4D / 3N",
    price: "$549",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
];

const steps = [
  { n: "01", title: "Tell us your plan", text: "Share dates, destination and budget." },
  { n: "02", title: "Get curated options", text: "Flights, hotels, visa and packages matched for you." },
  { n: "03", title: "Book with confidence", text: "Transparent pricing and expert support till travel." },
];

const reviews = [
  {
    name: "Ayesha Khan",
    place: "Dubai Trip",
    text: "Smooth booking and great hotel options. The team handled everything quickly.",
  },
  {
    name: "Rahul Mehta",
    place: "Europe Package",
    text: "Very professional service. Visa guidance and itinerary were both excellent.",
  },
  {
    name: "Sofia Ali",
    place: "Maldives Stay",
    text: "Premium feel from start to end. Transparent pricing and attentive support.",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [searchTab, setSearchTab] = useState<"flights" | "multi">("flights");
  const [tripType, setTripType] = useState("return");
  const [travelClass, setTravelClass] = useState("economy");
  const [passengers, setPassengers] = useState("1a");
  const [multiLegs, setMultiLegs] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_VISIBLE_MS + HERO_TRANSITION_SECONDS * 1000);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[slide];
  const prevSlide = () => {
    setDirection(-1);
    setSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  const nextSlide = () => {
    setDirection(1);
    setSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const addMultiLeg = () => {
    if (multiLegs.length >= 5) return;
    setMultiLegs((prev) => [...prev, { from: "", to: "", date: "" }]);
  };

  const removeMultiLeg = (index: number) => {
    if (multiLegs.length <= 2) return;
    setMultiLegs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SiteShell active="Home">
      <section className="relative min-h-[480px] overflow-hidden text-white md:min-h-[520px]">
        <Image
          src={HERO_SKY}
          alt="Clean sky city landscape"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/55" />

        <div className="relative mx-auto flex min-h-[480px] max-w-[1100px] flex-col items-center justify-end px-4 pb-8 pt-10 md:min-h-[520px] md:pb-10">
          <div className="relative w-full max-w-[760px]">
            <div
              className="invisible rounded-xl border border-transparent px-6 py-5 md:px-8 md:py-6"
              aria-hidden
            >
              <div className="pr-0 sm:pr-[150px] md:pr-[185px]">
                <p className="text-sm">Treat yourself to</p>
                <h1 className="mt-0.5 text-3xl font-extrabold tracking-tight md:text-4xl">New York</h1>
                <p className="mt-3 text-sm">New York flights from</p>
                <p className="mt-0.5 inline-block border-b-2 border-transparent pb-0.5 text-3xl font-extrabold md:text-4xl">
                  INR 82,200
                </p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="text-xs">Return, from Mumbai, Sep 2026</p>
                  <span className="rounded-md px-4 py-2 text-sm font-semibold">Search New York flights</span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={current.city}
                initial={{ opacity: 0, x: direction > 0 ? 70 : -70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -70 : 70 }}
                transition={{ duration: HERO_TRANSITION_SECONDS, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute inset-0 rounded-xl border border-white/80 bg-white/95 px-6 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-md md:px-8 md:py-6"
              >
                <Image
                  src="/rede-flights-logo-clean.png"
                  alt="REDE I FLIGHTS"
                  width={280}
                  height={80}
                  priority
                  unoptimized
                  className="pointer-events-none absolute right-5 top-4 hidden h-auto w-[140px] bg-transparent object-contain sm:block md:right-7 md:top-5 md:w-[170px]"
                />

                <div className="pr-0 sm:pr-[150px] md:pr-[185px]">
                  <p className="text-sm font-medium text-[#e30613]">{current.label}</p>
                  <h1 className="mt-0.5 text-3xl font-extrabold tracking-tight text-[#e30613] md:text-4xl">
                    {current.city}
                  </h1>
                  <p className="mt-3 text-sm font-medium text-[#e30613]">{current.fromLabel}</p>
                  <p className="mt-0.5 inline-block border-b-2 border-[#e30613] pb-0.5 text-3xl font-extrabold text-[#e30613] md:text-4xl">
                    {current.price}
                  </p>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                    <p className="text-xs text-[#c40010] md:text-sm">{current.meta}</p>
                    <Link
                      href={current.href}
                      className="btn-premium shrink-0 rounded-md bg-[#2f6fed] px-4 py-2 text-sm font-semibold text-white hover:bg-[#245cd1]"
                    >
                      {current.cta}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 mb-2 flex items-center gap-6 md:gap-8">
            <button
              aria-label="Previous slide"
              onClick={prevSlide}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0b2f57] shadow-md transition hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth="2.2" d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-3 px-1">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => {
                    setDirection(index > slide ? 1 : -1);
                    setSlide(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    slide === index ? "w-10 bg-white" : "w-8 bg-white/45 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              aria-label="Next slide"
              onClick={nextSlide}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0b2f57] shadow-md transition hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth="2.2" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-4 w-full max-w-[1260px] px-4 pb-6 md:-mt-6">
        <div className="grid items-stretch gap-4 lg:grid-cols-[0.7fr_1.7fr] lg:gap-5">
          <div className="relative order-2 min-h-[420px] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:order-1 lg:min-h-full">
            <Image
              src="/promo-banner.png"
              alt="REDE Flights — Dubai to Cochin from 900 AED"
              fill
              priority
              unoptimized
              className="object-cover object-top"
            />
          </div>

          <div className="order-1 rounded-2xl bg-white/95 p-5 text-[#0b2f57] shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6 md:p-7 lg:order-2">
            <div className="flex flex-wrap gap-6 border-b border-slate-200 pb-3">
              {(
                [
                  { id: "flights", label: "Flights" },
                  { id: "multi", label: "Multi-city" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSearchTab(tab.id)}
                  className={`inline-flex items-center gap-2 border-b-2 pb-2 text-sm font-semibold transition ${
                    searchTab === tab.id
                      ? "border-[#0b2f57] text-[#0b2f57]"
                      : "border-transparent text-slate-400 hover:text-[#0b2f57]"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M3 13l8-2 9-6-1.5 5.5L21 16l-6.5-1.5L10 18v-3.5L3 13z"
                    />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </div>

            <form
              action="/flights"
              className="mt-5 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/flights";
              }}
            >
              {searchTab === "flights" ? (
                <>
                  <FancySelect
                    label="Trip type"
                    value={tripType}
                    options={tripTypeOptions}
                    onChange={setTripType}
                    className="max-w-xs"
                  />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase">
                        From
                      </span>
                      <input
                        type="text"
                        placeholder="Departure city"
                        className={fieldClass}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase">
                        To
                      </span>
                      <input
                        type="text"
                        placeholder="Where can we take you?"
                        className={fieldClass}
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase">
                        Depart
                      </span>
                      <input type="date" className={fieldClass} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase">
                        Return
                      </span>
                      <input
                        type="date"
                        className={fieldClass}
                        disabled={tripType === "oneway"}
                      />
                    </label>
                    <FancySelect
                      label="Travel class"
                      value={travelClass}
                      options={travelClassOptions}
                      onChange={setTravelClass}
                    />
                    <FancySelect
                      label="Passengers"
                      value={passengers}
                      options={passengerOptions}
                      onChange={setPassengers}
                    />
                  </div>
                </>
              ) : (
                <>
                  {multiLegs.map((leg, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 gap-5 rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:grid-cols-2"
                    >
                      <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase sm:col-span-2">
                        Flight {index + 1}
                      </p>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase">
                          From
                        </span>
                        <input
                          type="text"
                          value={leg.from}
                          onChange={(e) =>
                            setMultiLegs((prev) =>
                              prev.map((item, i) =>
                                i === index ? { ...item, from: e.target.value } : item,
                              ),
                            )
                          }
                          placeholder="Departure city"
                          className={fieldClass}
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase">
                          To
                        </span>
                        <input
                          type="text"
                          value={leg.to}
                          onChange={(e) =>
                            setMultiLegs((prev) =>
                              prev.map((item, i) =>
                                i === index ? { ...item, to: e.target.value } : item,
                              ),
                            )
                          }
                          placeholder="Arrival city"
                          className={fieldClass}
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase">
                          Depart
                        </span>
                        <input
                          type="date"
                          value={leg.date}
                          onChange={(e) =>
                            setMultiLegs((prev) =>
                              prev.map((item, i) =>
                                i === index ? { ...item, date: e.target.value } : item,
                              ),
                            )
                          }
                          className={fieldClass}
                        />
                      </label>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeMultiLeg(index)}
                          disabled={multiLegs.length <= 2}
                          className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-white hover:text-[#e30613] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FancySelect
                      label="Travel class"
                      value={travelClass}
                      options={travelClassOptions}
                      onChange={setTravelClass}
                    />
                    <FancySelect
                      label="Passengers"
                      value={passengers}
                      options={passengerOptions}
                      onChange={setPassengers}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addMultiLeg}
                    disabled={multiLegs.length >= 5}
                    className="text-sm font-semibold text-[#2f6fed] transition hover:text-[#245cd1] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    + Add another flight
                  </button>
                </>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn-premium rounded-xl bg-[#2f6fed] px-8 py-3 text-sm font-semibold text-white hover:bg-[#245cd1]"
                >
                  Find flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[1260px] px-4 pb-5">
        <div className="soft-section premium-shadow grid grid-cols-1 gap-4 rounded-xl p-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Best Price Guarantee", sub: "We ensure the best prices" },
            { title: "Expert Travel Support", sub: "24/7 assistance" },
            { title: "Handpicked Experiences", sub: "Curated just for you" },
            { title: "Secure & Safe", sub: "Your safety is our priority" },
          ].map((item) => (
            <div
              key={item.title}
              className="home-feature border-l-2 border-[#e30613]/25 pl-4 transition hover:border-[#e30613]"
            >
              <p className="font-semibold text-[#e30613]">{item.title}</p>
              <p className="text-sm text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-fade-top mx-auto max-w-[1260px] px-4 pb-14 pt-10">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
            Our Services
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#111827] md:text-4xl">
            Flights · Hotels · Visa · Insurance
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500">
            Everything for your trip in one place — designed with a clean premium travel-agency look.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="premium-shadow group overflow-hidden rounded-2xl bg-white"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#e30613]">
                  {item.badge}
                </span>
                <p className="absolute bottom-3 left-4 text-xl font-bold text-white">{item.title}</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">{item.desc}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-lg border border-[#e30613] px-4 py-2 text-sm font-semibold text-[#e30613] transition hover:bg-[#e30613] hover:text-white"
                >
                  Explore {item.title}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Tour Packages */}
        <div className="mb-6 mt-14 text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
              Tour Packages
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-[#111827] md:text-4xl">
              Handpicked holiday packages
            </h2>
          </div>
          <Link href="/packages" className="mt-2 inline-block text-sm font-semibold text-[#e30613]">
            View All Packages →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="premium-shadow overflow-hidden rounded-2xl bg-white"
            >
              <div className="relative">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  width={700}
                  height={420}
                  className="h-48 w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded bg-[#e30613] px-2 py-1 text-xs font-semibold text-white">
                  {pkg.tag}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500">{pkg.duration}</p>
                <h3 className="mt-1 text-lg font-bold text-[#111827]">{pkg.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-extrabold text-[#0b2f57]">
                    {pkg.price}
                    <span className="text-sm font-medium text-gray-500"> / person</span>
                  </p>
                  <Link
                    href="/packages"
                    className="text-sm font-semibold text-[#e30613] hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-14 px-2 py-4">
          <h3 className="text-center text-3xl font-extrabold text-[#101828]">How It Works</h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            Simple 3-step booking process with expert support.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="px-5 py-4 text-center"
              >
                <p className="text-sm font-bold text-[#e30613]">{step.n}</p>
                <h4 className="mt-2 text-lg font-bold text-[#0b2f57]">{step.title}</h4>
                <p className="mt-2 text-sm text-gray-500">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-4 mt-14 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-extrabold text-[#111827] md:text-4xl">
              Popular Destinations
            </h2>
            <p className="mt-1 text-sm text-gray-500">Handpicked places travelers love most.</p>
          </div>
          <Link href="/destinations" className="text-sm font-semibold text-[#e30613]">
            View All Destinations →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((place, index) => (
            <motion.article
              key={place.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="tilt-shell premium-shadow group relative overflow-hidden rounded-2xl"
            >
              <Image
                className="tilt-card h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                src={place.image}
                alt={place.title}
                width={420}
                height={320}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-lg font-bold">{place.title}</h3>
                <p className="text-sm text-gray-200">{place.subtitle}</p>
                <p className="mt-1 text-xs text-[#ffb3bc]">{place.packages}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-14">
          <h3 className="text-center text-3xl font-extrabold text-[#101828]">What Travelers Say</h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            Real feedback from happy travelers who booked with us.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="premium-shadow rounded-2xl border border-[#edf1f8] bg-white p-5"
              >
                <p className="text-amber-500">★★★★★</p>
                <p className="mt-3 text-sm leading-6 text-gray-600">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="font-semibold text-[#0b2f57]">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.place}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <section className="soft-section premium-shadow mt-12 rounded-2xl px-6 py-8">
          <h3 className="text-center text-3xl font-extrabold text-[#101828]">Why Travel With Us?</h3>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Customized Trips", sub: "Tailored to your needs" },
              { title: "Wide Destinations", sub: "Across the globe" },
              { title: "No Hidden Charges", sub: "Transparent pricing" },
              { title: "Trusted by Clients", sub: "100% satisfaction" },
              { title: "Easy Inquiry", sub: "Quick & simple process" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#edf1f8] bg-white px-4 py-5 text-center transition hover:border-[#d8dfed] hover:shadow-sm"
              >
                <p className="font-semibold text-[#0f2b4d]">{item.title}</p>
                <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="premium-shadow mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-[#0d3563] p-6 text-white lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Ready for your next journey?
            </p>
            <p className="mt-2 text-sm text-blue-100/95">
              Talk to our destination specialist and get a personalized itinerary instantly.
            </p>
      </div>
          <a
            href="https://wa.me/12345678900"
            target="_blank"
            rel="noreferrer"
            className="btn-premium flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </section>
      </section>
    </SiteShell>
  );
}
