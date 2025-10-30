// app/contact/page.tsx
export const metadata = {
  title: "Contact Us | Global Laundry™",
  description:
    "Contact Global Laundry SAL — pickup & delivery laundry and dry-cleaning service across Beirut & Metn.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Contact Global Laundry™
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Reach us anytime via WhatsApp, phone, or email.  
            Our team is here to help — from order tracking to business inquiries.
          </p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-2">
        {/* Contact details */}
        <div>
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <p className="mt-2 text-gray-600">
            We’re open Monday to Saturday and available on WhatsApp for fast responses.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>
              📍 <strong>Address:</strong> FortyFour Tower, Dekwaneh, Metn
            </li>
            <li>
              📞 <strong>Hotline:</strong>{" "}
              <a href="tel:+9614392927" className="text-blue-700 hover:underline">
                03 39 29 27
              </a>
            </li>
            <li>
              ✉️ <strong>Email:</strong>{" "}
              <a
                href="mailto:admin@globallaundry.co"
                className="text-blue-700 hover:underline"
              >
                admin@globallaundry.co
              </a>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/9613392927"
              target="_blank"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+96181392927"
              className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-50"
            >
              Call Us
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Operating Hours: Monday–Friday 9:00 AM – 6:00 PM, Saturday until 3:00 PM, closed Sundays.
          </p>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <iframe
            title="Global Laundry on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.7042432379815!2d35.567!3d33.888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1742b4b3dc79%3A0x6d87ea6a5c85a37f!2sFortyFour%20Tower%2C%20Dekwaneh!5e0!3m2!1sen!2slb!4v1699999999999"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Optional Contact Form */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-2xl font-bold text-center">Send a Message</h2>
          <p className="mt-2 text-center text-gray-600">
            Prefer email? Send us a quick note below and our team will reply soon.
          </p>

          <form
            action="#"
            method="post"
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 sm:col-span-1"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 sm:col-span-1"
              required
            />
            <textarea
              placeholder="Message..."
              rows={5}
              className="sm:col-span-2 rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="sm:col-span-2 mt-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold">
            Visit Global Laundry in Dekwaneh
          </h3>
          <p className="mt-2 text-gray-600">
            Drop off, meet our team, or schedule pickup directly from your phone.
          </p>
          <a
            href="https://wa.me/9613392927"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Message Us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
