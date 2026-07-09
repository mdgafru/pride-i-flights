"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell active="About Us">
      <PageHero
        title="About Us"
        description="Learn who we are and why thousands of travelers trust REDE I FLIGHTS."
        breadcrumb="About Us"
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="mx-auto max-w-[1260px] px-4 py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
            alt="Our Team"
            width={900}
            height={650}
            className="h-80 w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#e30613]">Who We Are</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#111827]">Your Trusted Travel Partner</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              REDE I FLIGHTS helps travelers book flights, hotels, visas and travel insurance with
              transparent pricing and dedicated expert support.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              {[
                { title: "Our Mission", sub: "Make travel booking simple and reliable." },
                { title: "Our Vision", sub: "Become the preferred travel partner for every journey." },
                { title: "Our Values", sub: "Trust, transparency and traveler-first service." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[#edf1f8] bg-white px-4 py-3">
                  <p className="font-semibold text-[#0b2f57]">{item.title}</p>
                  <p className="text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="soft-section premium-shadow mt-10 grid grid-cols-2 gap-4 rounded-2xl px-5 py-6 md:grid-cols-5">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "25K+", label: "Happy Customers" },
            { value: "150+", label: "Destinations" },
            { value: "98%", label: "Satisfaction" },
            { value: "24/7", label: "Support" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-extrabold text-[#e30613]">{item.value}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="btn-premium rounded-lg bg-[#e30613] px-6 py-3 text-sm font-semibold text-white"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
