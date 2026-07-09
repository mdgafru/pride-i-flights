"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FancySelect } from "@/components/FancySelect";
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

const fieldClass =
  "w-full border-0 border-b border-slate-300 bg-transparent px-0 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2f6fed]";


const heroBanners = [
  { src: "/promo-banner.png", alt: "REDE Flights — Dubai to Kochi" },
  { src: "/image2.png", alt: "REDE Flights — Travel Promotion" },
  { src: "/image3.png", alt: "REDE Flights — Special Offer" },
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
  const [searchTab, setSearchTab] = useState<"flights" | "multi">("flights");
  const [tripType, setTripType] = useState("return");
  const [travelClass, setTravelClass] = useState("economy");
  const [passengers, setPassengers] = useState("1a");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [multiLegs, setMultiLegs] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);

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
      <section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden pb-10 pt-10 text-white sm:min-h-[58vh] sm:pb-12 sm:pt-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/background.png"
          alt=""
          aria-hidden
          className="absolute inset-0 z-0 h-full w-full object-cover object-center brightness-[1.24] saturate-[1.15] contrast-[1.08]"
        />
        <div className="hero-overlay-premium pointer-events-none absolute inset-0 z-[1]" />

        <div className="hero-card-premium relative z-[2] flex w-fit flex-col overflow-hidden rounded-2xl leading-none">
          <div className="relative aspect-[2/3] w-[200px] overflow-hidden sm:w-[240px] md:w-[280px]">
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
      </section>

      <section className="relative z-10 mx-auto mt-2 w-full max-w-[1260px] px-4 pb-6 sm:mt-4">
        <div className="section-polish px-5 py-5 text-[#0b2f57] sm:px-6 sm:py-6 md:px-7 md:py-7">
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
                    className="text-sm font-semibold text-[#e30613] transition hover:text-[#c40010] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    + Add another flight
                  </button>
                </>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn-premium rounded-xl bg-[#e30613] px-8 py-3 text-sm font-semibold text-white hover:bg-[#c40010]"
                >
                  Find flights
                </button>
              </div>
            </form>
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
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]">
              Our Services
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-[#e30613] md:text-4xl">
              Flights · Hotels · Visa · Insurance
            </h2>
          </div>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500">
            Everything for your trip in one place — designed with a clean premium travel-agency look.
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

        <section className="soft-section premium-shadow mt-12 rounded-2xl px-6 py-8">
          <h3 className="text-center text-3xl font-extrabold text-[#e30613]">Why Travel With Us?</h3>
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

      </section>
    </SiteShell>
  );
}
