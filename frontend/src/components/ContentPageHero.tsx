"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

export type ContentHeroHighlight = {
  title: string;
  sub: string;
  href?: string;
  external?: boolean;
};

type ContentPageHeroProps = {
  image: string;
  imagePosition?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  breadcrumb?: string;
  highlights?: ContentHeroHighlight[];
  centered?: boolean;
  showBreadcrumb?: boolean;
  useLogo?: boolean;
};

export function ContentPageHero({
  image,
  imagePosition = "center",
  eyebrow,
  title,
  description,
  breadcrumb = "",
  highlights = [],
  centered = false,
  showBreadcrumb = true,
  useLogo = false,
}: ContentPageHeroProps) {
  return (
    <section className="content-page-hero relative flex flex-col overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 z-0 h-full min-h-full w-full object-cover brightness-[1.08] saturate-[1.1] contrast-[1.04]"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#042448]/92 via-[#0b2f57]/68 to-[#0b2f57]/35" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#042448]/50 via-transparent to-transparent" />

      <div className="relative z-[2] flex flex-col">
        <div className="mx-auto w-full max-w-[1260px] px-4 pt-8 pb-6 sm:px-4 sm:pt-12 sm:pb-8 md:pt-16 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
          >
            {useLogo ? (
              <div className={`${centered ? "flex justify-center" : ""}`}>
                <BrandLogo
                  variant="hero"
                  className="drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)]"
                />
              </div>
            ) : (
              <>
                {eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e30613] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)] sm:text-sm sm:tracking-[0.16em]">
                    {eyebrow}
                  </p>
                ) : null}
                {title ? (
                  <h1 className="mt-2 text-2xl font-extrabold leading-[1.2] text-[#e30613] drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)] sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                    {title}
                  </h1>
                ) : null}
              </>
            )}
            {description ? (
              <p
                className={`max-w-2xl text-sm leading-relaxed text-white sm:text-base md:text-lg ${
                  useLogo ? "mt-4 sm:mt-5" : "mt-3 sm:mt-4"
                } ${centered ? "mx-auto" : ""}`}
              >
                {description}
              </p>
            ) : null}
            {showBreadcrumb ? (
              <p className="mt-4 text-sm text-white/90 sm:mt-5 sm:text-base">
                <Link href="/" className="font-medium transition hover:text-white">
                  Home
                </Link>
                <span className="mx-2 text-[#ff6b75]">&gt;</span>
                <span className="font-semibold text-white">{breadcrumb}</span>
              </p>
            ) : null}
          </motion.div>
        </div>

        {highlights.length > 0 ? (
          <div className="relative z-[3] border-t border-white/20 bg-[#042448]/95 backdrop-blur-md">
            <div
              className={`mx-auto grid max-w-[1260px] grid-cols-1 divide-y divide-white/10 sm:divide-x sm:divide-y-0 ${
                highlights.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
              }`}
            >
              {highlights.map((item) => {
                const inner = (
                  <>
                    <p className="text-sm font-bold text-[#e30613] sm:text-base md:text-lg">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-white/75 sm:mt-1 sm:text-sm">{item.sub}</p>
                  </>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="group flex min-h-[56px] flex-col justify-center px-4 py-4 transition hover:bg-white/5 sm:min-h-0 sm:px-6 sm:py-5 md:px-8 md:py-6"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 sm:text-xs">
                        {item.title}
                      </span>
                      <span className="mt-1 break-all text-sm font-semibold text-white group-hover:text-[#ffb3b8] sm:mt-1.5 sm:break-normal sm:text-base md:text-lg">
                        {item.sub}
                      </span>
                    </a>
                  );
                }

                return (
                  <div
                    key={item.title}
                    className="px-4 py-4 text-center sm:px-6 sm:py-5 md:px-8 md:py-6"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
