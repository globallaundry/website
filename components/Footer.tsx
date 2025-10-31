// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-blue-700">Global Laundry™</h3>
            <p className="mt-2 text-sm text-gray-600">
              Your e-Laundry, Delivered.  
              We pick up, clean, and deliver across Beirut & Metn.
            </p>
            <a
              href="https://wa.me/9613392927"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>📞 <a href="tel:+96133392927">03 39 29 27</a></li>
              <li>✉️ support@globallaundry.co</li>
              <li>📍 FortyFour Tower, Dekwaneh, Lebanon</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Opening Hours</h4>
            <ul className="mt-3 text-sm text-gray-600">
              <li>Mon - Fri: 9:00 AM – 6:00 PM</li>
              <li>Saturday's until 3:00 PM</li>
              <li>Sunday's Holiday</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Made with ❤ Global Laundry. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
