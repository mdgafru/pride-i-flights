import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Tour Packages", href: "/packages" },
  { label: "Destinations", href: "/destinations" },
];

const serviceLinks = [
  { label: "Visa Services", href: "/visa" },
  { label: "Travel Insurance", href: "/travel-insurance" },
  { label: "Honeymoon Packages" },
  { label: "Group Tours" },
  { label: "Corporate Travel" },
];

const socialLinks = [
  { name: "Facebook", icon: FacebookIcon, href: "#" },
  { name: "Instagram", icon: InstagramIcon, href: "#" },
  { name: "X", icon: XIcon, href: "#" },
  { name: "YouTube", icon: YouTubeIcon, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#dbe4f0] bg-gradient-to-b from-[#0b2f57] to-[#072040] text-white">
      <video
        className="footer-video-animate absolute inset-0 h-full w-full object-cover opacity-35"
        src="https://www.pexels.com/download/video/36255229/"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="footer-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_85%_0%,rgba(227,6,19,0.16),transparent_36%)]" />
      <div className="relative mx-auto max-w-[1260px] px-4 py-16 md:py-20">
        <div className="grid gap-8 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src="/icon.svg"
                alt="REDE icon"
                width={34}
                height={34}
                className="h-8 w-8 rounded-md"
              />
              <p className="text-2xl font-extrabold text-[#ff4d5a]">REDE I FLIGHTS</p>
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-blue-50/95">
              We are passionate about travel and committed to providing exceptional service and
              unforgettable experiences.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ff4d5a]/65 bg-white/10 text-[#ffd2d6] transition hover:border-[#ff4d5a] hover:bg-[#e30613] hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-lg font-semibold text-[#ff4d5a]">Quick Links</p>
            <ul className="space-y-2 text-sm text-blue-50/90">
              {quickLinks.map((item) => (
                <li key={item.href} className="footer-link">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-lg font-semibold text-[#ff4d5a]">Our Services</p>
            <ul className="space-y-2 text-sm text-blue-50/90">
              {serviceLinks.map((item) => (
                <li key={item.label} className="footer-link">
                  {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-lg font-semibold text-[#ff4d5a]">Contact Us</p>
            <ul className="space-y-2 text-sm text-blue-50/90">
              <li className="footer-link">+1 234 567 8900</li>
              <li className="footer-link">info@redeiflights.com</li>
              <li className="footer-link">123 Travel Street, City</li>
              <li className="footer-link">Country - 00000</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-blue-100/90 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 REDE I FLIGHTS. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="footer-link">
              Terms & Conditions
            </Link>
            <Link href="#" className="footer-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
