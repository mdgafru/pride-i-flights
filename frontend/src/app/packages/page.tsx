"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

const packages = [
  {
    tag: "Best Seller",
    tagColor: "bg-[#e30613]",
    title: "Romantic Europe Getaway",
    route: "Paris · Switzerland · Italy",
    duration: "7 Days / 6 Nights",
    price: "$1,299",
    includes: ["Flight", "Hotel", "Meals", "Sightseeing"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Popular",
    tagColor: "bg-[#2563eb]",
    title: "Bali Island Escape",
    route: "Ubud · Kuta · Nusa Dua",
    duration: "5 Days / 4 Nights",
    price: "$699",
    includes: ["Flight", "Hotel", "Breakfast", "Transfers"],
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Trending",
    tagColor: "bg-[#ea580c]",
    title: "Switzerland Explorer",
    route: "Zurich · Interlaken · Lucerne",
    duration: "6 Days / 5 Nights",
    price: "$1,199",
    includes: ["Flight", "Hotel", "Meals", "Train Pass"],
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Hot Deal",
    tagColor: "bg-[#e30613]",
    title: "Dubai City Experience",
    route: "Dubai · Abu Dhabi",
    duration: "4 Days / 3 Nights",
    price: "$549",
    includes: ["Flight", "Hotel", "Desert Safari", "Transfers"],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Luxury",
    tagColor: "bg-[#7c3aed]",
    title: "Maldives Honeymoon",
    route: "Male · overwater villa",
    duration: "5 Days / 4 Nights",
    price: "$1,899",
    includes: ["Flight", "Villa", "All Meals", "Spa"],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Family",
    tagColor: "bg-[#059669]",
    title: "Singapore Fun Trip",
    route: "Marina Bay · Sentosa",
    duration: "4 Days / 3 Nights",
    price: "$799",
    includes: ["Flight", "Hotel", "Park Tickets", "Transfers"],
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
  },
];

export default function PackagesPage() {
  return (
    <SiteShell active="Tour Packages">
      <PageHero
        eyebrow="Amazing Vacations"
        title="Top Tour Packages"
        description="Handpicked travel experiences with flights, hotels, meals and sightseeing included."
        breadcrumb="Tour Packages"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80"
      >
        <div className="mx-auto mt-[-40px] max-w-[1260px] px-4 pb-6">
          <div className="soft-section premium-shadow grid grid-cols-1 gap-3 rounded-xl p-3 md:grid-cols-2 xl:grid-cols-5">
            {["All Destinations", "All Themes", "Any Duration", "Any Budget"].map((item) => (
              <button
                key={item}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600"
              >
                {item}
                <span className="text-xs">▼</span>
              </button>
            ))}
            <button className="btn-premium rounded-lg bg-[#e30613] px-4 py-3 text-sm font-semibold text-white">
              Search Packages
            </button>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-[1260px] gap-6 px-4 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-[#111827]">Filter Packages</h3>

          <div className="mt-6 space-y-7 text-sm text-gray-600">
            <div>
              <p className="mb-3 font-semibold text-gray-700">Destination</p>
              <div className="space-y-2">
                {["Europe", "Asia", "Australia", "Africa", "North America", "Middle East"].map(
                  (item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" className="accent-[#e30613]" />
                      {item}
                    </label>
                  ),
                )}
              </div>
            </div>

            <div>
              <p className="mb-3 font-semibold text-gray-700">Theme</p>
              <div className="space-y-2">
                {["Family", "Honeymoon", "Adventure", "Beach", "Luxury"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#e30613]" />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 font-semibold text-gray-700">Budget (Per Person)</p>
              <input type="range" min={200} max={5000} defaultValue={1500} className="w-full accent-[#e30613]" />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>$200</span>
                <span>$5000+</span>
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold text-[#111827]">Top Tour Packages</h2>
              <p className="text-sm text-gray-500">Explore our most popular and trending tours.</p>
            </div>
            <p className="rounded-lg bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
              Sort By: Most Popular
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.article
                key={pkg.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
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
                  <span
                    className={`absolute left-3 top-3 rounded px-2 py-1 text-xs font-semibold text-white ${pkg.tagColor}`}
                  >
                    {pkg.tag}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500">{pkg.duration}</p>
                  <h3 className="mt-1 text-lg font-bold text-[#111827]">{pkg.title}</h3>
                  <p className="text-sm text-gray-500">{pkg.route}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pkg.includes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[11px] font-medium text-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-[#111827]">
                    {pkg.price}
                    <span className="ml-1 text-sm font-medium text-gray-500">/ Person</span>
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 block w-full rounded-lg border border-[#e30613] py-2.5 text-center text-sm font-semibold text-[#e30613] transition hover:bg-[#e30613] hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="premium-shadow mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#fff5f6] px-6 py-6 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-bold text-[#111827]">Can&apos;t find the perfect package?</p>
              <p className="mt-1 text-sm text-gray-500">
                Let our travel experts customize a package just for you.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-premium rounded-lg bg-[#e30613] px-6 py-3 text-sm font-semibold text-white"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
