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
  return (
    <main className="relative bg-[#f6f6f8] text-[#1d2433]">
      <WhatsAppFloat />
      <Navbar active={active} overlay={overlayNav} />
      {children}
      <Footer />
    </main>
  );
}
