type BrandLogoProps = {
  variant?: "navbar" | "hero";
  className?: string;
  mainClassName?: string;
  taglineClassName?: string;
};

export function BrandLogo({
  variant = "navbar",
  className = "",
  mainClassName = "",
  taglineClassName = "",
}: BrandLogoProps) {
  const mainTextClass =
    variant === "hero"
      ? "text-[22px] sm:text-[26px] md:text-[28px]"
      : "text-[19px] sm:text-[21px]";
  const taglineTextClass =
    variant === "hero"
      ? "text-[6px] sm:text-[7px] sm:tracking-[0.16em]"
      : "text-[5px] sm:text-[6px] sm:tracking-[0.14em]";
  const taglineColorClass = variant === "hero" ? "text-white/90" : "text-[#111827]";

  return (
    <span className={`inline-flex flex-col items-center gap-2 leading-none ${className}`}>
      <span className="inline-flex w-fit flex-col items-stretch leading-none">
        <span className="h-[2px] shrink-0 bg-[#0b2f57]" aria-hidden />
        <span
          className={`whitespace-nowrap px-1 py-1 text-center font-black italic tracking-tight text-[#e30613] sm:px-1.5 ${mainTextClass} ${mainClassName}`}
        >
          REDE<span className="mx-0.5 font-black not-italic text-[#0b2f57]">/</span>FLIGHTS
        </span>
        <span className="h-[2px] shrink-0 bg-[#0b2f57]" aria-hidden />
      </span>
      <span
        className={`block w-full text-center font-black uppercase tracking-[0.12em] ${taglineColorClass} ${taglineTextClass} ${taglineClassName}`}
      >
        YOUR JOURNEY, OUR PRIORITY
      </span>
    </span>
  );
}
