"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroRouteSwap } from "@/components/HeroRouteSwap";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_URL } from "@/lib/contact";

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

const heroSearchLabelClass = "text-xs font-bold uppercase tracking-wide text-slate-600";
const heroSearchInputClass =
  "mt-1.5 w-full min-w-0 border-0 bg-transparent p-0 text-[15px] font-semibold leading-snug text-[#0b2f57] outline-none placeholder:font-medium placeholder:text-slate-500";
const heroSearchCellClass =
  "flex min-h-[82px] min-w-0 flex-col justify-center overflow-hidden border-b border-slate-200 px-4 py-4 sm:border-r sm:border-b-0 sm:px-4 lg:px-4 lg:last:border-r-0";
const heroSearchDateCellClass =
  "flex min-h-[82px] min-w-0 flex-col justify-center border-b border-slate-200 px-4 py-4 sm:border-r sm:border-b-0 sm:px-3.5 sm:pr-4 lg:px-3.5 lg:pr-4";
const heroSearchTravellerCellClass = heroSearchCellClass;
const heroSearchSelectClass =
  "hero-search-select w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 pr-6 text-sm font-semibold text-[#0b2f57] outline-none sm:text-[15px]";
const heroSearchBarClass =
  "hero-search-bar grid w-full min-w-0 flex-1 grid-cols-1 rounded-xl border border-slate-200/90 bg-white shadow-[0_14px_36px_rgba(11,47,87,0.16)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.95fr)_minmax(118px,1.05fr)_minmax(118px,1.05fr)_minmax(0,1fr)]";
const heroTripSelectClass =
  "mb-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0b2f57] shadow-sm outline-none";

const heroBanners = [
  { src: "/promo-banner.png", alt: "REDE Flights - Dubai to Kochi" },
  { src: "/image2.png", alt: "REDE Flights - Travel Promotion" },
  { src: "/image3.png", alt: "REDE Flights - Special Offer" },
];

const BANNER_VISIBLE_MS = 5000;
const BANNER_TRANSITION_S = 1.25;

const imageBadgeClass =
  "absolute left-3 top-3 rounded-md bg-[#e30613] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm";

const catalogImageClass =
  "h-44 w-full object-cover transition duration-500 group-hover:scale-[1.02]";

const catalogLinkClass =
  "mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#e30613] transition hover:gap-2";

const services = [
  {
    title: "Flights",
    desc: "We deal with international Flights worldwide",
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
  const [tripType, setTripType] = useState("return");
  const [travelClass, setTravelClass] = useState("economy");
  const [passengers, setPassengers] = useState("1a");
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    heroBanners.forEach((banner) => {
      const img = new window.Image();
      img.src = banner.src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, BANNER_VISIBLE_MS + BANNER_TRANSITION_S * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SiteShell active="Home">
      <section className="relative w-full overflow-hidden py-5 sm:py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/background.png"
          alt=""
          aria-hidden
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_30%] brightness-[1.24] saturate-[1.15] contrast-[1.08]"
        />
        <div className="hero-overlay-premium pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-[2] mx-auto flex w-full max-w-[1420px] flex-col gap-5 px-4 lg:flex-row lg:items-start lg:justify-between lg:gap-5 xl:gap-6">
          <div className="w-full min-w-0 lg:flex-[1.4] lg:max-w-none">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Flights", href: "/", active: true },
                { label: "Hotels", href: "/hotels", active: false },
                { label: "Visa", href: "/visa", active: false },
                { label: "Insurance", href: "/travel-insurance", active: false },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm ${
                    item.active
                      ? "bg-[#e30613] text-white shadow-sm"
                      : "border border-white/40 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <h1 className="mt-3 text-xl font-extrabold leading-tight text-[#e30613] drop-shadow-[0_2px_6px_rgba(255,255,255,0.85)] sm:text-2xl">
              Best fares for your next journey.
              <span className="mt-0.5 block text-sm font-semibold text-[#e30613] sm:text-base">
                One simple search.
              </span>
            </h1>

            <form
              action="/flights"
              className="mt-4 rounded-2xl bg-white/20 p-3 ring-1 ring-white/40 backdrop-blur-sm sm:p-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/flights";
              }}
            >
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className={heroTripSelectClass}
              >
                {tripTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-stretch">
                <div className={heroSearchBarClass}>
                  <HeroRouteSwap />
                  <label className={heroSearchDateCellClass}>
                    <span className={heroSearchLabelClass}>Depart</span>
                    <div className="hero-search-date-wrap">
                      <input type="date" className="hero-search-date mt-0 w-full min-w-0 border-0 bg-transparent p-0 pr-7 text-[14px] font-semibold leading-none text-[#0b2f57] outline-none" />
                    </div>
                  </label>
                  <label className={heroSearchDateCellClass}>
                    <span className={heroSearchLabelClass}>Return</span>
                    <div className="hero-search-date-wrap">
                      <input
                        type="date"
                        className="hero-search-date mt-0 w-full min-w-0 border-0 bg-transparent p-0 pr-7 text-[14px] font-semibold leading-none text-[#0b2f57] outline-none disabled:opacity-45"
                        disabled={tripType === "oneway"}
                      />
                    </div>
                  </label>
                  <div className={heroSearchTravellerCellClass}>
                    <span className={heroSearchLabelClass}>Travellers &amp; class</span>
                    <div className="mt-1.5 grid min-w-0 grid-cols-1 gap-1.5">
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className={heroSearchSelectClass}
                      >
                        {passengerOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={travelClass}
                        onChange={(e) => setTravelClass(e.target.value)}
                        className={`${heroSearchSelectClass} text-slate-600`}
                      >
                        {travelClassOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-premium shrink-0 rounded-xl bg-[#e30613] px-8 py-4 text-base font-bold text-white shadow-md hover:bg-[#c40010] lg:min-h-[82px] lg:min-w-[128px] lg:self-stretch"
                >
                  Search
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#0b2f57] sm:text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="accent-[#e30613]" />
                  Direct flights
                </label>
              </div>
            </form>
          </div>

          <div className="hero-card-premium flex w-fit shrink-0 flex-col self-center overflow-hidden rounded-2xl leading-none lg:mt-10 xl:mt-12">
            <div className="relative aspect-[2/3] w-[170px] overflow-hidden sm:w-[200px] md:w-[220px]">
              <motion.div
                className="flex h-full will-change-transform"
                style={{ width: `${heroBanners.length * 100}%` }}
                animate={{
                  x: `-${bannerIndex * (100 / heroBanners.length)}%`,
                }}
                transition={{
                  duration: BANNER_TRANSITION_S,
                  ease: [0.45, 0, 0.25, 1],
                }}
              >
                {heroBanners.map((banner) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={banner.src}
                    src={banner.src}
                    alt={banner.alt}
                    className="h-full shrink-0 object-contain object-top"
                    style={{ width: `${100 / heroBanners.length}%` }}
                    draggable={false}
                  />
                ))}
              </motion.div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-1.5 bg-[#e30613] px-2 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#c40010] sm:text-xs"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
              Enquire Now
            </a>
          </div>
        </div>
      </section>

      <section className="section-fade-top mx-auto max-w-[1260px] px-4 pb-14 pt-10">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
            Our Services
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={640}
                  height={360}
                  className={catalogImageClass}
                />
                <span className={imageBadgeClass}>{item.badge}</span>
              </div>
              <div className="pt-3">
                <h3 className="text-lg font-bold text-[#0b2f57]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                <Link href={item.href} className={catalogLinkClass}>
                  Explore {item.title}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="soft-section premium-shadow mt-10 grid grid-cols-1 gap-4 rounded-xl p-5 md:grid-cols-2 lg:grid-cols-4">
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

        {/* Tour Packages */}
        <div className="mb-6 mt-14 text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
              Tour Packages
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-[#e30613] md:text-4xl">
              Handpicked holiday packages
            </h2>
          </div>
          <Link href="/packages" className="mt-2 inline-block text-sm font-semibold text-[#e30613]">
            View All Packages →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  width={700}
                  height={420}
                  className={catalogImageClass}
                />
                <span className={imageBadgeClass}>{pkg.tag}</span>
              </div>
              <div className="pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {pkg.duration}
                </p>
                <h3 className="mt-1 text-lg font-bold text-[#0b2f57]">{pkg.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  <span className="font-extrabold text-[#0b2f57]">{pkg.price}</span> / person
                </p>
                <Link href="/packages" className={catalogLinkClass}>
                  Details
                  <span aria-hidden>→</span>
                </Link>
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

        <div className="mb-4 mt-14 text-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#e30613] md:text-4xl">
              Popular Destinations
            </h2>
            <p className="mt-1 text-sm text-gray-500">Handpicked places travelers love most.</p>
          </div>
          <Link href="/destinations" className="mt-2 inline-block text-sm font-semibold text-[#e30613]">
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
              className="tilt-shell premium-shadow hover-lift-soft group relative overflow-hidden rounded-2xl"
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
          <h3 className="text-center text-3xl font-extrabold text-[#e30613]">What Travelers Say</h3>
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
              className="premium-shadow hover-lift-soft rounded-2xl border border-[#edf1f8] bg-white p-5"
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

        <section className="mt-12 border-t border-slate-200 pt-10">
          <h3 className="text-center text-3xl font-extrabold text-[#e30613]">Why Travel With Us?</h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-gray-500">
            Trusted travel support with transparent service at every step.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {[
              { title: "Customized Trips", sub: "Tailored to your needs" },
              { title: "Wide Destinations", sub: "Across the globe" },
              { title: "No Hidden Charges", sub: "Transparent pricing" },
              { title: "Trusted by Clients", sub: "100% satisfaction" },
              { title: "Easy Inquiry", sub: "Quick & simple process" },
            ].map((item) => (
              <div
                key={item.title}
                className="home-feature border-l-2 border-[#e30613]/25 pl-4 transition hover:border-[#e30613]"
              >
                <p className="font-semibold text-[#0b2f57]">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

      </section>
    </SiteShell>
  );
}
