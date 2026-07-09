import { WhatsAppIcon } from "@/components/icons";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/12345678900"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-glow fixed bottom-7 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#e30613] text-white"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
