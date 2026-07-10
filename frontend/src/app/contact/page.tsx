"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContentPageHero } from "@/components/ContentPageHero";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT_EMAIL, CONTACT_PHONE, MAILTO_URL, TEL_URL, WHATSAPP_URL } from "@/lib/contact";

const CONTACT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85";

const eyebrowClass = "text-sm font-semibold uppercase tracking-[0.14em] text-[#e30613]";
const sectionTitleClass = "text-2xl font-extrabold leading-tight text-[#e30613] sm:text-3xl md:text-4xl";
const blockTitleClass = "text-2xl font-bold leading-snug text-[#e30613]";
const bodyClass = "text-base leading-relaxed text-gray-600";
const fieldLabelClass = "text-sm font-semibold text-slate-600";
const fieldClass =
  "mt-2 w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3.5 text-base text-[#0b2f57] outline-none transition placeholder:text-slate-400 focus:border-[#e30613]";

const contactItems = [
  {
    title: "Phone",
    value: CONTACT_PHONE,
    href: TEL_URL,
    note: "Speak with our travel advisors",
  },
  {
    title: "Email",
    value: CONTACT_EMAIL,
    href: MAILTO_URL,
    note: "Send your travel enquiry anytime",
  },
  {
    title: "Office Hours",
    value: "Mon - Sun: 9:00 AM - 9:00 PM",
    note: "We respond as quickly as possible",
  },
];

const trustItems = [
  { title: "24/7 Support", sub: "Always here when you need us" },
  { title: "Expert Guidance", sub: "Flights, hotels, visa and more" },
  { title: "Fast Response", sub: "Quick answers to your queries" },
];

const services = ["Flights", "Hotels", "Visa", "Travel Insurance", "Tour Packages"];

const quickActions = [
  { title: "Call Us", sub: CONTACT_PHONE, href: TEL_URL },
  { title: "Email Us", sub: CONTACT_EMAIL, href: MAILTO_URL },
  { title: "WhatsApp", sub: "Chat instantly", href: WHATSAPP_URL, external: true },
];

export default function ContactPage() {
  return (
    <SiteShell active="Contact Us">
      <ContentPageHero
        image={CONTACT_HERO_IMAGE}
        imagePosition="center 70%"
        eyebrow="UAE Travel Experts · REDE I FLIGHTS"
        title="Contact Our Travel Experts"
        description="Your trusted partner for flights, hotels, visa and travel insurance. Reach out today and let our team plan your next journey from Dubai to destinations worldwide."
        breadcrumb="Contact Us"
        highlights={quickActions}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1260px] grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trustItems.map((item) => (
            <div key={item.title} className="px-6 py-6 text-center sm:py-8">
              <p className="text-lg font-bold text-[#e30613]">{item.title}</p>
              <p className="mt-2 text-base text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-10 md:py-20">
        <div className="mb-12 text-center">
          <p className={eyebrowClass}>Get in Touch</p>
          <h2 className={`mt-3 ${sectionTitleClass}`}>Start Planning Your Trip Today</h2>
          <p className={`mx-auto mt-4 max-w-2xl ${bodyClass}`}>
            Tell us where you want to go and we will help with the best travel options, transparent
            pricing and dedicated support from our expert team.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <h3 className={blockTitleClass}>Send an Enquiry</h3>
            <p className={`mt-3 ${bodyClass}`}>
              Complete the form below and our travel team will contact you shortly.
            </p>

            <form
              className="mt-10 space-y-8 border-t border-slate-200 pt-10"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className={fieldLabelClass}>Your Name</span>
                  <input type="text" placeholder="Full name" className={fieldClass} />
                </label>
                <label className="block">
                  <span className={fieldLabelClass}>Phone Number</span>
                  <input type="tel" placeholder="+971..." className={fieldClass} />
                </label>
              </div>

              <label className="block">
                <span className={fieldLabelClass}>Email Address</span>
                <input type="email" placeholder="you@email.com" className={fieldClass} />
              </label>

              <label className="block">
                <span className={fieldLabelClass}>I am interested in</span>
                <select className={`${fieldClass} cursor-pointer`}>
                  {services.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={fieldLabelClass}>Message</span>
                <textarea
                  className={`${fieldClass} min-h-[140px] resize-y`}
                  placeholder="Destination, travel dates, passengers, budget or any special request..."
                />
              </label>

              <button
                type="submit"
                className="btn-premium w-full min-h-[44px] bg-[#e30613] px-10 py-4 text-base font-semibold text-white hover:bg-[#c40010] sm:w-auto"
              >
                Submit Enquiry
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="border-t border-slate-200 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14"
          >
            <h3 className={blockTitleClass}>Direct Contact</h3>
            <p className={`mt-3 ${bodyClass}`}>
              Reach us directly for immediate travel assistance. Our advisors are ready to help with
              bookings, visa queries and custom itineraries.
            </p>

            <div className="mt-10 space-y-7">
              {contactItems.map((item) => (
                <div
                  key={item.title}
                  className="home-feature border-l-[3px] border-[#e30613]/30 pl-5 transition hover:border-[#e30613]"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    {item.title}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-2 block text-lg font-bold text-[#0b2f57] transition hover:text-[#e30613]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-lg font-bold text-[#0b2f57]">{item.value}</p>
                  )}
                  <p className="mt-1.5 text-base text-gray-500">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-slate-200 pt-10">
              <h4 className="text-xl font-bold text-[#e30613]">Instant WhatsApp Support</h4>
              <p className={`mt-3 ${bodyClass}`}>
                Message us on WhatsApp for fast quotes on flights, hotels and tour packages.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-premium mt-5 inline-flex w-full min-h-[44px] items-center justify-center gap-2.5 bg-[#e30613] px-7 py-4 text-base font-semibold text-white hover:bg-[#c40010] sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>

            <p className={`mt-10 ${bodyClass}`}>
              Looking for holiday packages?{" "}
              <Link href="/packages" className="font-bold text-[#e30613] hover:underline">
                View tour packages
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1260px] px-4 py-14">
          <div className="text-center">
            <p className={eyebrowClass}>Our Services</p>
            <h2 className={`mt-3 ${sectionTitleClass}`}>How We Help You Travel</h2>
            <p className={`mx-auto mt-4 max-w-2xl ${bodyClass}`}>
              From flight bookings to visa assistance, we cover every step of your journey.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {services.map((service) => (
              <div
                key={service}
                className="home-feature border-l-[3px] border-[#e30613]/30 py-1 pl-5 transition hover:border-[#e30613]"
              >
                <p className="text-lg font-bold text-[#e30613]">{service}</p>
                <p className="mt-2 text-base text-gray-500">Expert booking support</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
