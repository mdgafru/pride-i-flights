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
        className={`mx-auto max-w-[1260px] px-4 py-16 text-white ${
          children ? "min-h-[460px] pb-28 md:min-h-[500px] md:pb-32" : "min-h-[380px] md:min-h-[420px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {eyebrow ? <p className="font-display text-xl italic text-[#ffdadf]">{eyebrow}</p> : null}
          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
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
