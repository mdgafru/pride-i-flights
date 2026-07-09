import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a1f3d] text-white">
      <video
        className="footer-video-animate absolute inset-0 h-full w-full object-cover opacity-50"
        src="https://www.pexels.com/download/video/36255229/"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="footer-overlay absolute inset-0" />
      <div className="relative mx-auto max-w-[1260px] px-4 py-24 md:py-32">
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
              {[
                { name: "Facebook", icon: FacebookIcon },
                { name: "Instagram", icon: InstagramIcon },
                { name: "X", icon: XIcon },
                { name: "YouTube", icon: YouTubeIcon },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  aria-label={item.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ff4d5a]/70 bg-[#ff4d5a]/15 text-[#ff4d5a]"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-lg font-semibold text-[#ff4d5a]">Quick Links</p>
            <ul className="space-y-2 text-sm text-blue-50/90">
              <li className="footer-link">
                <Link href="/">Home</Link>
              </li>
              <li className="footer-link">
                <Link href="/about">About Us</Link>
              </li>
              <li className="footer-link">
                <Link href="/flights">Flights</Link>
              </li>
              <li className="footer-link">
                <Link href="/hotels">Hotels</Link>
              </li>
              <li className="footer-link">
                <Link href="/packages">Tour Packages</Link>
              </li>
              <li className="footer-link">
                <Link href="/destinations">Destinations</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-lg font-semibold text-[#ff4d5a]">Our Services</p>
            <ul className="space-y-2 text-sm text-blue-50/90">
              <li className="footer-link">
                <Link href="/visa">Visa Services</Link>
              </li>
              <li className="footer-link">
                <Link href="/travel-insurance">Travel Insurance</Link>
              </li>
              <li className="footer-link">Honeymoon Packages</li>
              <li className="footer-link">Group Tours</li>
              <li className="footer-link">Corporate Travel</li>
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
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
