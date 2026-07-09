type BrandLogoProps = {
  className?: string;
  mainClassName?: string;
  taglineClassName?: string;
};

export function BrandLogo({
  className = "",
  mainClassName = "",
  taglineClassName = "",
}: BrandLogoProps) {
  return (
    <span className={`inline-flex w-[178px] flex-col items-stretch leading-none sm:w-[198px] ${className}`}>
      <span className="h-[2px] w-full shrink-0 bg-[#0b2f57]" aria-hidden />
      <span
        className={`whitespace-nowrap py-1 text-center text-[19px] font-black italic tracking-tight text-[#e30613] sm:text-[21px] ${mainClassName}`}
      >
        REDE<span className="mx-0.5 font-black not-italic text-[#0b2f57]">/</span>FLIGHTS
      </span>
      <span className="h-[2px] w-full shrink-0 bg-[#0b2f57]" aria-hidden />
      <span
        className={`mt-1 text-center text-[7px] font-black uppercase tracking-[0.2em] text-[#111827] sm:text-[8px] sm:tracking-[0.22em] ${taglineClassName}`}
      >
        YOUR JOURNEY, OUR PRIORITY
      </span>
    </span>
  );
}
