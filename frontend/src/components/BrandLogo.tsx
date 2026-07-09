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
    <span className={`inline-flex flex-col items-center gap-2 leading-none ${className}`}>
      <span className="inline-flex w-fit flex-col items-stretch leading-none">
        <span className="h-[2px] shrink-0 bg-[#0b2f57]" aria-hidden />
        <span
          className={`whitespace-nowrap px-1 py-1 text-center text-[19px] font-black italic tracking-tight text-[#e30613] sm:px-1.5 sm:text-[21px] ${mainClassName}`}
        >
          REDE<span className="mx-0.5 font-black not-italic text-[#0b2f57]">/</span>FLIGHTS
        </span>
        <span className="h-[2px] shrink-0 bg-[#0b2f57]" aria-hidden />
      </span>
      <span
        className={`block w-full text-center text-[5px] font-black uppercase tracking-[0.12em] text-[#111827] sm:text-[6px] sm:tracking-[0.14em] ${taglineClassName}`}
      >
        YOUR JOURNEY, OUR PRIORITY
      </span>
    </span>
  );
}
