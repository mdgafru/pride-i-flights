"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

const flights = [
  {
    airline: "Emirates",
    route: "Dubai → London",
    time: "08:20 - 13:45",
    duration: "7h 25m",
    price: "$420",
    type: "Non-stop",
  },
  {
    airline: "Qatar Airways",
    route: "Doha → Paris",
    time: "10:15 - 15:40",
    duration: "6h 55m",
    price: "$389",
    type: "Non-stop",
  },
  {
    airline: "Singapore Airlines",
    route: "Singapore → Tokyo",
    time: "01:10 - 09:00",
    duration: "6h 50m",
    price: "$355",
    type: "Non-stop",
  },
  {
    airline: "Air India",
    route: "Delhi → New York",
    time: "02:30 - 08:15",
    duration: "15h 45m",
    price: "$690",
    type: "1 Stop",
  },
];

export default function FlightsPage() {
  return (
    <SiteShell active="Flights">
      <PageHero
        eyebrow="Fly Anywhere, Anytime"
        title="Book Your Flights"
        description="Compare top airlines and get the best fares for domestic and international destinations."
        breadcrumb="Flights"
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80"
      >
        <div className="mx-auto mt-0 max-w-[1260px] px-4 pb-6 sm:mt-[-24px] lg:mt-[-40px]">
          <div className="soft-section premium-shadow grid grid-cols-1 gap-3 rounded-xl p-4 md:grid-cols-2 xl:grid-cols-5">
            {["From", "To", "Departure", "Return", "Travel Class"].map((item) => (
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
              Search Flights
            </button>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1260px] px-4 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#111827] sm:text-3xl">Top Flight Deals</h2>
            <p className="text-sm text-gray-500">Popular routes travelers book most.</p>
          </div>
          <p className="rounded-lg bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">Sort by: Lowest Price</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {flights.map((flight) => (
            <article key={flight.route} className="premium-shadow rounded-2xl bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#e30613]">{flight.airline}</p>
                  <h3 className="mt-1 text-xl font-bold text-[#0b2f57]">{flight.route}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {flight.time} · {flight.duration} · {flight.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-[#e30613]">{flight.price}</p>
                  <p className="text-xs text-gray-500">per adult</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  href="/contact"
                  className="min-h-[44px] rounded-lg border border-[#e30613] px-5 py-2.5 text-sm font-semibold text-[#e30613] transition hover:bg-[#e30613] hover:text-white"
                >
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
