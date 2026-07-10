"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

const hotels = [
  {
    name: "Grand Hyatt Bali",
    location: "Bali, Indonesia",
    rating: "4.8",
    reviews: "2.1k reviews",
    price: "$245",
    amenities: "Wi-Fi · Pool · Breakfast · Spa",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Conrad Maldives",
    location: "Maldives",
    rating: "4.9",
    reviews: "1.8k reviews",
    price: "$610",
    amenities: "Wi-Fi · Pool · Breakfast · Overwater",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Marina Bay Sands",
    location: "Singapore",
    rating: "4.7",
    reviews: "4.2k reviews",
    price: "$390",
    amenities: "Wi-Fi · Pool · City View · Spa",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HotelsPage() {
  return (
    <SiteShell active="Hotels">
      <PageHero
        eyebrow="Comfortable Stays for Every Journey"
        title="Find The Perfect Hotel"
        description="Browse premium hotels and resorts with verified reviews, flexible booking and best-rate options."
        breadcrumb="Hotels"
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80"
      >
        <div className="mx-auto mt-0 max-w-[1260px] px-4 pb-6 sm:mt-[-24px] lg:mt-[-40px]">
          <div className="soft-section premium-shadow grid grid-cols-1 gap-3 rounded-xl p-4 md:grid-cols-2 xl:grid-cols-4">
            {["Enter Destination", "Check-in", "Check-out", "Guests"].map((item) => (
              <button
                key={item}
                className="min-h-[44px] rounded-lg border border-gray-200 px-4 py-3 text-left text-sm text-gray-600"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button className="btn-premium min-h-[44px] w-full rounded-lg bg-[#e30613] px-6 py-3 text-sm font-semibold text-white sm:w-auto">
              Search Hotels
            </button>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-[1260px] gap-6 px-4 py-8 sm:py-12 lg:grid-cols-[260px_1fr]">
        <details className="rounded-2xl bg-white p-5 shadow-sm lg:hidden">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center text-lg font-bold text-[#111827] [&::-webkit-details-marker]:hidden">
            Filter Hotels
          </summary>
          <div className="mt-5 space-y-5 text-sm text-gray-600">
            <div>
              <p className="mb-2 font-semibold text-gray-700">Star Rating</p>
              {["5 Star", "4 Star", "3 Star", "2 Star"].map((item) => (
                <label key={item} className="mb-2 flex min-h-[44px] items-center gap-3">
                  <input type="checkbox" className="accent-[#e30613]" />
                  {item}
                </label>
              ))}
            </div>
            <div>
              <p className="mb-2 font-semibold text-gray-700">Amenities</p>
              {["Free Wi-Fi", "Swimming Pool", "Breakfast Included", "Airport Shuttle", "Spa"].map(
                (item) => (
                  <label key={item} className="mb-2 flex min-h-[44px] items-center gap-3">
                    <input type="checkbox" className="accent-[#e30613]" />
                    {item}
                  </label>
                ),
              )}
            </div>
          </div>
        </details>

        <aside className="hidden h-fit rounded-2xl bg-white p-5 shadow-sm lg:block">
          <h3 className="text-lg font-bold text-[#111827]">Filter Hotels</h3>
          <div className="mt-5 space-y-5 text-sm text-gray-600">
            <div>
              <p className="mb-2 font-semibold text-gray-700">Star Rating</p>
              {["5 Star", "4 Star", "3 Star", "2 Star"].map((item) => (
                <label key={item} className="mb-2 flex min-h-[44px] items-center gap-3">
                  <input type="checkbox" className="accent-[#e30613]" />
                  {item}
                </label>
              ))}
            </div>
            <div>
              <p className="mb-2 font-semibold text-gray-700">Amenities</p>
              {["Free Wi-Fi", "Swimming Pool", "Breakfast Included", "Airport Shuttle", "Spa"].map(
                (item) => (
                  <label key={item} className="mb-2 flex min-h-[44px] items-center gap-3">
                    <input type="checkbox" className="accent-[#e30613]" />
                    {item}
                  </label>
                ),
              )}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-[#111827] sm:text-3xl">Top Hotels</h2>
              <p className="text-sm text-gray-500">Handpicked stays for every budget.</p>
            </div>
            <p className="rounded-lg bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
              Sort By: Most Popular
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {hotels.map((hotel) => (
              <article key={hotel.name} className="premium-shadow overflow-hidden rounded-2xl bg-white">
                <div className="relative">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    width={700}
                    height={420}
                    className="h-48 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded bg-[#16a34a] px-2 py-1 text-xs font-semibold text-white">
                    {hotel.rating} · {hotel.reviews}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#0b2f57]">{hotel.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{hotel.location}</p>
                  <p className="mt-2 text-xs text-gray-500">{hotel.amenities}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-extrabold text-[#e30613]">
                      {hotel.price}
                      <span className="text-sm font-medium text-gray-500"> / night</span>
                    </p>
                    <Link
                      href="/contact"
                      className="min-h-[44px] rounded-lg border border-[#e30613] px-5 py-2.5 text-sm font-semibold text-[#e30613] transition hover:bg-[#e30613] hover:text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
