"use client";

import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";

export default function ContactPage() {
  return (
    <SiteShell active="Contact Us">
      <PageHero
        title="Contact Us"
        description="Get free consultation for flights, hotels, visa and travel insurance."
        breadcrumb="Contact Us"
        image="https://images.unsplash.com/photo-1423666639041-f1600ba74b0d?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="mx-auto max-w-[1260px] px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-shadow rounded-2xl bg-white p-6">
            <h2 className="text-2xl font-extrabold text-[#111827]">Send an Enquiry</h2>
            <div className="mt-5 grid gap-3">
              <input
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#e30613]"
                placeholder="Your Name"
              />
              <input
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#e30613]"
                placeholder="Phone Number"
              />
              <input
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#e30613]"
                placeholder="Email Address"
              />
              <select className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#e30613]">
                <option>I&apos;m interested in</option>
                <option>Flights</option>
                <option>Hotels</option>
                <option>Visa</option>
                <option>Travel Insurance</option>
              </select>
              <textarea
                className="min-h-[110px] rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#e30613]"
                placeholder="Message"
              />
              <button className="btn-premium rounded-lg bg-[#e30613] px-5 py-3 text-sm font-semibold text-white">
                Submit Enquiry
              </button>
            </div>
          </div>

          <div className="premium-shadow rounded-2xl bg-[#0d3563] p-6 text-white">
            <h3 className="text-2xl font-extrabold">Talk to an Expert</h3>
            <p className="mt-3 text-sm text-blue-100">
              Prefer instant help? Chat on WhatsApp and get personalized travel options fast.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-blue-50">
              <li>+1 234 567 8900</li>
              <li>info@redeiflights.com</li>
              <li>Mon - Sun: 9:00 AM - 9:00 PM</li>
            </ul>
            <a
              href="https://wa.me/12345678900"
              target="_blank"
              rel="noreferrer"
              className="btn-premium mt-8 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
