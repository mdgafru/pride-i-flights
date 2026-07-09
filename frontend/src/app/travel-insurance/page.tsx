"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

const plans = [
  {
    name: "Basic Cover",
    price: "$29",
    points: ["Medical expenses up to $50k", "Trip delay protection", "Lost baggage support"],
  },
  {
    name: "Premium Cover",
    price: "$59",
    points: ["Medical expenses up to $150k", "Emergency evacuation", "Adventure sports cover"],
  },
  {
    name: "Family Cover",
    price: "$99",
    points: ["Coverage for 4 members", "Hospitalization support", "24/7 claim assistance"],
  },
];

export default function TravelInsurancePage() {
  return (
    <SiteShell active="Travel Insurance">
      <PageHero
        eyebrow="Travel Safe, Stay Protected"
        title="Travel Insurance"
        description="Choose reliable travel insurance plans for medical emergencies, trip delays, and more."
        breadcrumb="Travel Insurance"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="mx-auto max-w-[1260px] px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-[#111827]">Insurance Plans</h2>
          <p className="mt-2 text-sm text-gray-500">Simple, transparent plans with no confusing fine print.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className="premium-shadow rounded-2xl border border-[#edf1f8] bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#e30613]">{plan.name}</p>
              <p className="mt-2 text-4xl font-extrabold text-[#0b2f57]">
                {plan.price}
                <span className="text-sm font-medium text-gray-500"> / trip</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                {plan.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-lg bg-[#e30613] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Get This Plan
              </Link>
            </article>
          ))}
        </div>

        <div className="soft-section premium-shadow mt-10 rounded-2xl px-6 py-8">
          <h3 className="text-center text-2xl font-extrabold text-[#111827]">Why Buy Travel Insurance?</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Medical Support", sub: "Emergency care abroad" },
              { title: "Trip Protection", sub: "Delay & cancellation cover" },
              { title: "Baggage Cover", sub: "Lost or delayed luggage help" },
              { title: "24/7 Assistance", sub: "Claim support anytime" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white px-4 py-5 text-center shadow-sm">
                <p className="font-semibold text-[#0b2f57]">{item.title}</p>
                <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
