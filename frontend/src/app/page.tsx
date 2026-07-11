"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroRouteSwap } from "@/components/HeroRouteSwap";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_URL } from "@/lib/contact";
import { bannersToSlides } from "@/lib/banner";
import { SITE_BACKGROUND_VIDEO_SRC } from "@/lib/site-media";
import type { Banner, BannerSlide } from "@/types/banner";

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

const heroSearchLabelClass = "text-[11px] font-extrabold uppercase tracking-wide text-[#0b2f57]";
const heroSearchCellClass =
  "flex min-h-[56px] min-w-0 flex-col justify-center overflow-hidden border-b border-slate-200 bg-white px-3 py-2.5 sm:min-h-[82px] sm:border-r sm:border-b-0 sm:px-4 sm:py-3 lg:px-4 lg:last:border-r-0";
const heroSearchDateCellClass =
  "flex min-h-[56px] min-w-0 flex-col justify-center border-b border-slate-200 bg-white px-3 py-2.5 sm:min-h-[82px] sm:border-r sm:border-b-0 sm:px-3.5 sm:pr-4 sm:py-3 lg:px-3.5 lg:pr-4";
const heroSearchTravellerCellClass = heroSearchCellClass;
const heroSearchSelectClass =
  "hero-search-select w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 pr-6 text-sm font-semibold text-[#0b2f57] outline-none sm:text-[15px]";
const heroSearchBarClass =
  "hero-search-bar grid w-full min-w-0 flex-1 grid-cols-1 border border-slate-200 bg-white shadow-[0_8px_24px_rgba(11,47,87,0.1)] sm:grid-cols-2 lg:grid-cols-[minmax(260px,1.95fr)_minmax(118px,1.05fr)_minmax(118px,1.05fr)_minmax(0,1fr)]";
const heroTripSelectClass =
  "min-h-[40px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#0b2f57] shadow-sm outline-none sm:mb-2 sm:min-h-0 sm:w-fit sm:min-w-[9.5rem]";

const BANNER_VISIBLE_MS = 5000;
const BANNER_TRANSITION_S = 1.25;

const imageBadgeClass =
  "absolute left-3 top-3 rounded-md bg-[#e30613] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm";

const catalogImageClass =
  "h-44 w-full object-cover transition duration-500 group-hover:scale-[1.02]";

const tourPackageImageClass =
  "h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]";

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
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&h=420&q=80",
  },
  {
    tag: "Popular",
    title: "Bali Island Escape",
    duration: "5D / 4N",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&h=420&q=80",
  },
  {
    tag: "Hot Deal",
    title: "Dubai City Experience",
    duration: "4D / 3N",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&h=420&q=80",
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
  const [heroBanners, setHeroBanners] = useState<BannerSlide[]>([]);

  useEffect(() => {
    async function loadBanners() {
      try {
        const response = await fetch("/api/banners");
        const result = (await response.json()) as { banners?: Banner[] };
        const activeBanners = result.banners || [];

        if (activeBanners.length > 0) {
          setHeroBanners(bannersToSlides(activeBanners));
          setBannerIndex(0);
        } else {
          setHeroBanners([]);
          setBannerIndex(0);
        }
      } catch {
        setHeroBanners([]);
      }
    }

    loadBanners();
  }, []);

  useEffect(() => {
    heroBanners.forEach((banner) => {
      const img = new window.Image();
      img.src = banner.src;
    });
  }, [heroBanners]);

  useEffect(() => {
    if (heroBanners.length === 0) return;

    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, BANNER_VISIBLE_MS + BANNER_TRANSITION_S * 1000);

    return () => clearInterval(timer);
  }, [heroBanners.length]);

  return (
    <SiteShell active="Home">
      <section className="relative w-full overflow-visible pb-32 pt-28 sm:overflow-hidden sm:py-6">
        <video
          className="footer-video-animate absolute inset-0 z-0 h-full w-full object-cover object-[center_30%] brightness-[1.24] saturate-[1.15] contrast-[1.08]"
          src={SITE_BACKGROUND_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          poster="/background.png"
        />
        <div className="hero-overlay-premium pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-[2] mx-auto flex w-full max-w-[1420px] flex-col gap-6 px-8 sm:gap-5 sm:px-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="flex w-full min-w-0 flex-1 flex-col max-sm:mt-4 max-sm:px-1 sm:mt-0 sm:px-0 lg:max-w-none">
            <form
              action="/flights"
              className="w-full space-y-3 rounded-2xl bg-white/95 p-4 shadow-[0_12px_32px_rgba(11,47,87,0.14)] ring-1 ring-slate-200/80 backdrop-blur-md max-sm:mx-auto max-sm:max-w-full sm:space-y-0 sm:p-4"
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

              <div className="flex min-w-0 flex-col gap-3 border-t border-slate-200 pt-3 sm:mt-2 lg:flex-row lg:items-stretch">
                <div className={`${heroSearchBarClass} max-sm:mx-1 overflow-hidden rounded-xl sm:mx-0 lg:min-h-[82px]`}>
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
                    <div className="mt-1 grid min-w-0 grid-cols-2 gap-2 sm:mt-1.5 sm:grid-cols-1 sm:gap-1.5">
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
                        className={heroSearchSelectClass}
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
                  className="btn-premium w-full min-h-[44px] shrink-0 rounded-xl bg-[#e30613] px-8 py-4 text-base font-bold text-white shadow-md hover:bg-[#c40010] sm:w-auto lg:min-h-[82px] lg:min-w-[128px] lg:self-stretch"
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

          {heroBanners.length > 0 ? (
          <div className="hero-card-premium mx-auto flex w-full max-w-[320px] flex-col overflow-hidden rounded-2xl leading-none sm:mx-0 sm:w-[240px] sm:max-w-[240px] md:w-[270px] md:max-w-[270px] lg:shrink-0">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
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
                  <div
                    key={banner.src}
                    className="h-full shrink-0 overflow-hidden"
                    style={{ width: `${100 / heroBanners.length}%` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="block h-full w-full object-cover object-[center_68%]"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="flex w-full items-center justify-center border-t border-slate-200 bg-white px-2 py-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/logo/site-logo.png"
                alt="REDE FLIGHTS"
                className="h-6 w-auto max-w-[88%] object-contain sm:h-7"
              />
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
          ) : null}
        </div>
      </section>

      <section className="section-fade-top mx-auto max-w-[1260px] px-4 pb-14 pt-10">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center justify-center bg-[#e30613] px-8 py-3 shadow-sm">
            <p className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-white">
              Our Services
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="relative aspect-[5/3] overflow-hidden bg-slate-100">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  width={700}
                  height={420}
                  className={tourPackageImageClass}
                />
                <span className={imageBadgeClass}>{pkg.tag}</span>
              </div>
              <div className="p-3.5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {pkg.duration}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-snug text-[#0b2f57]">{pkg.title}</h3>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    `Hello REDE I FLIGHTS, I would like to enquire about the ${pkg.title} tour package (${pkg.duration}).`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-premium mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#e30613] px-4 text-sm font-semibold text-white hover:bg-[#c40010]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Enquire Now
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-14 px-2 py-4">
          <h3 className="text-center text-2xl font-extrabold text-[#e30613] sm:text-3xl">How It Works</h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            Simple 3-step booking process with expert support.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="px-2 py-4 text-center sm:px-5"
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
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
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5">
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
