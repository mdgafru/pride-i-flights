import type { ReactNode } from "react";
import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  breadcrumb: string;
  image: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
  children,
}: PageHeroProps) {
  return (
    <section
      className="hero-depth relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(6, 24, 53, 0.55), rgba(6, 24, 53, 0.5)), url('${image}')`,
      }}
    >
      <div
        className={`mx-auto max-w-[1260px] px-4 py-10 text-white sm:py-14 md:py-16 ${
          children
            ? "min-h-0 pb-20 sm:min-h-[360px] sm:pb-24 md:min-h-[460px] md:pb-32"
            : "min-h-0 sm:min-h-[320px] md:min-h-[380px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {eyebrow ? (
            <p className="font-display text-base italic text-[#ffdadf] sm:text-xl">{eyebrow}</p>
          ) : null}
          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-100 sm:text-base">{description}</p>
          <p className="mt-5 text-sm text-white/90">
            Home <span className="text-[#ff4d5a]">&gt;</span> {breadcrumb}
          </p>
        </motion.div>
      </div>
      {children}
    </section>
  );
}
