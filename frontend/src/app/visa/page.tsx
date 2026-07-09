"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

const visaCards = [
  {
    country: "USA Visa",
    types: "Tourist · Business · Student",
    price: "$160",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=900&q=80",
  },
  {
    country: "Schengen Visa",
    types: "Tourist · Business · Family",
    price: "$110",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    country: "UK Visa",
    types: "Tourist · Student · Work",
    price: "$140",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    country: "UAE Visa",
    types: "Tourist · Transit · Long Stay",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    country: "Australia Visa",
    types: "Tourist · Student · Visit",
    price: "$135",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80",
  },
  {
    country: "Canada Visa",
    types: "Tourist · Student · Business",
    price: "$150",
    image:
      "https://images.unsplash.com/photo-1519832979-6fa011b87667?auto=format&fit=crop&w=900&q=80",
  },
];

export default function VisaPage() {
  return (
    <SiteShell active="Visa">
      <PageHero
        eyebrow="Hassle-Free Documentation"
        title="Visa Services"
        description="Expert guidance, high success rate and end-to-end support for your visa applications."
        breadcrumb="Visa Services"
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80"
      >
        <div className="mx-auto mt-[-35px] max-w-[1260px] px-4 pb-6">
          <div className="soft-section premium-shadow grid grid-cols-1 gap-4 rounded-xl p-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Expert Guidance", sub: "Document checklist support" },
              { title: "High Success Rate", sub: "Verified process experts" },
              { title: "Fast Processing", sub: "Priority case handling" },
              { title: "End to End Support", sub: "Until visa decision" },
            ].map((item) => (
              <div key={item.title} className="pl-1">
                <p className="font-semibold text-[#0b2f57]">{item.title}</p>
                <p className="text-sm text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1260px] px-4 py-12">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#111827]">Our Visa Services</h2>
          <p className="mt-2 text-sm text-gray-500">Choose your destination and start your application today.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visaCards.map((item) => (
            <article key={item.country} className="premium-shadow overflow-hidden rounded-2xl bg-white">
              <Image
                src={item.image}
                alt={item.country}
                width={700}
                height={420}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#0b2f57]">{item.country}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.types}</p>
                <p className="mt-3 text-sm font-semibold text-gray-700">
                  Starting from <span className="text-[#e30613]">{item.price}</span>
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex rounded-lg border border-[#e30613] px-4 py-2 text-sm font-semibold text-[#e30613] transition hover:bg-[#e30613] hover:text-white"
                >
                  Apply Now
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="premium-shadow mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#fff5f6] px-6 py-6 md:flex-row md:items-center">
          <div>
            <p className="text-xl font-bold text-[#111827]">Need Help With Your Visa?</p>
            <p className="mt-1 text-sm text-gray-500">
              Our consultants will review your profile and guide the best visa path.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-premium rounded-lg bg-[#e30613] px-6 py-3 text-sm font-semibold text-white"
          >
            Consult Our Experts
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
