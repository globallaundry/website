// app/services/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Services | Global Laundry™",
  description:
    "Laundry, Dry Cleaning, and HostReady™ Airbnb services with pickup & delivery across Beirut & Metn.",
};

const services = [
  {
    slug: "wash-and-fold",
    title: "Wash & Fold",
    blurb:
      "Everyday laundry washed, dried, and folded. Sorted by color and fabric, packed neatly.",
    bullets: ["By kg pricing", "Detergent & softener included", "Neatly folded"],
    image: "/service-1.jpg", // put a real image in /public
  },
  {
    slug: "dry-cleaning",
    title: "Dry Cleaning",
    blurb:
      "Delicate care for suits, dresses, abayas, and occasion wear. Stain treatment included where possible.",
    bullets: ["Per-item pricing", "Delicates & silks", "Expert finishing"],
    image: "/service-2.jpg",
  },
  {
    slug: "hostready",
    title: "HostReady™ (Airbnb)",
    blurb:
      "Fresh linen & towel sets, sealed and delivered for fast turnovers. Bundles for single, double, and king.",
    bullets: ["Bundled sets", "Sealed & labeled", "Fast turnaround"],
    image: "/service-3.jpg",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-extrabold md:text-5xl">Our Services</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Door-to-door laundry & dry cleaning with expert care and reliable
            delivery across Beirut & Metn.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/9613392927"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Book on WhatsApp
            </a>
            <Link
              href="/pricing"
              className="rounded-xl border border-gray-300 px-5 py-3 hover:bg-gray-50"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="h-48 w-full bg-gray-100">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-gray-600">{s.blurb}</p>
                <ul className="mt-4 grid gap-1 text-sm text-gray-600">
                  {s.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <span className="mt-4 inline-block text-blue-700">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h3 className="text-2xl font-bold">Add-ons & Extras</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Stain pre-treatment",
              "Delicate/hand-wash care",
              "Hanger or folded packaging",
              "Eco detergent on request",
              "Express same-day / next-day",
              "Duvets, blankets & large items",
            ].map((x) => (
              <div
                key={x}
                className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700"
              >
                {x}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Availability and surcharges may apply for express and specialty
            items. See{" "}
            <Link href="/pricing" className="text-blue-700 underline">
              pricing
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Coverage & CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold">Beirut & Metn Coverage</h3>
          <p className="mt-2 text-gray-600">
            Pickup Monday–Saturday. Typical turnaround 48–72 hours. Closed
            Sundays.
          </p>
          <a
            href="https://wa.me/9613392927"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Schedule on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
