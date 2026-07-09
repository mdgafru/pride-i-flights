"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

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
  {
    title: "Switzerland",
    subtitle: "Alpine Beauty",
    packages: "20 Packages",
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
  },
];

export default function DestinationsPage() {
  return (
    <SiteShell active="Destinations">
      <PageHero
        eyebrow="Explore The World"
        title="Destinations"
        description="Discover amazing places at exclusive deals and create unforgettable memories."
        breadcrumb="Destinations"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80"
      >
        <div className="mx-auto mt-[-40px] max-w-[1260px] px-4 pb-6">
          <div className="soft-section premium-shadow grid grid-cols-1 gap-3 rounded-xl p-4 md:grid-cols-3">
            {["All Destinations", "All Countries", "Any Time"].map((item) => (
              <button
                key={item}
                className="rounded-lg border border-gray-200 px-4 py-3 text-left text-sm text-gray-600"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1260px] px-4 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-extrabold text-[#111827]">Popular Destinations</h2>
            <p className="text-sm text-gray-500">Browse top places with ready packages.</p>
          </div>
          <p className="rounded-lg bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
            Sort By: Most Popular
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((place) => (
            <article
              key={place.title}
              className="premium-shadow group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={place.image}
                alt={place.title}
                width={700}
                height={460}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-xs font-semibold text-[#e30613]">
                {place.subtitle}
              </div>
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-xl font-bold">{place.title}</h3>
                <p className="mt-1 text-sm text-gray-200">{place.packages}</p>
                <Link href="/contact" className="mt-2 inline-block text-sm font-semibold text-[#ffb3bc]">
                  Explore Now →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
