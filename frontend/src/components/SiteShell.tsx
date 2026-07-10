import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export function SiteShell({
  children,
  active,
  overlayNav = false,
}: {
  children: ReactNode;
  active?: string;
  overlayNav?: boolean;
}) {
  const contentOffsetClass = overlayNav ? "" : "pt-[124px] sm:pt-[92px]";

  return (
    <main className={`relative overflow-x-clip bg-[#f6f6f8] text-[#1d2433] ${contentOffsetClass}`}>
      <WhatsAppFloat />
      <Navbar active={active} overlay={overlayNav} />
      {children}
      <Footer />
    </main>
  );
}
