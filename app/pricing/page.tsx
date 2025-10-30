// app/pricing/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Pricing | Global Laundry™",
  description:
    "Transparent prices for laundry, dry cleaning, and Airbnb HostReady™ services. Beirut & Metn pickup & delivery.",
};

const dryCleaning = [
  { item: "Shirt / Blouse", price: "$3.50" },
  { item: "Trousers / Pants", price: "$4.50" },
  { item: "Dress (standard)", price: "$10.00" },
  { item: "Suit (2-piece)", price: "$13.00" },
  { item: "Jacket / Coat", price: "$12.00" },
  { item: "Abaya / Kaftan", price: "$9.00" },
];

const hostReadyBundles = [
  {
    name: "Basic Comfort",
    lines: ["Single Room → Linen + Towel", "Double/King → Linen + Towel"],
    prices: ["$9.99 / stay", "$14.99 / stay"],
    note: "Fresh bed & towels per stay.",
  },
  {
    name: "Premium Comfort",
    lines: ["Single → Basic + Bathrobe", "Double/King → Basic + Bathrobe"],
    prices: ["$14.99 / stay", "$19.99 / stay"],
    note: "Hotel-like touch with bathrobes.",
  },
  {
    name: "Pool & Relax",
    lines: ["Add Pool Towel per guest"],
    prices: ["+$2.99 / stay"],
    note: "Great for listings with pools.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-extrabold md:text-5xl">Pricing</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Simple, transparent prices. Pickup & delivery across Beirut and Metn.
            Typical turnaround <strong>48–72h</strong>. Express available.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/9613392927"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Book on WhatsApp
            </a>
            <Link
              href="/"
              className="rounded-xl border border-gray-300 px-5 py-3 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Wash & Fold */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Wash & Fold (by kg)</h2>
            <p className="mt-2 text-gray-600">
              Everyday laundry washed, dried, and folded. Perfect for weekly
              loads.{" "}
              <span className="font-medium text-gray-800">
                Minimum order applies.
              </span>
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-6">
                <div className="text-sm font-semibold text-blue-700">Standard</div>
                <div className="mt-1 text-3xl font-extrabold">$2.50</div>
                <div className="text-sm text-gray-500">per kg</div>
                <ul className="mt-4 list-disc pl-5 text-sm text-gray-600">
                  <li>Mixed colors sorted</li>
                  <li>Detergent & softener included</li>
                  <li>Neatly folded & bagged</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6">
                <div className="text-sm font-semibold text-blue-700">Express</div>
                <div className="mt-1 text-3xl font-extrabold">$3.50</div>
                <div className="text-sm text-gray-500">per kg</div>
                <ul className="mt-4 list-disc pl-5 text-sm text-gray-600">
                  <li>Priority processing</li>
                  <li>Same-day / Next-day</li>
                  <li>Limited slots daily</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              * Large items (duvets, blankets) priced separately. Listed prices are
              examples—update to your final rates anytime.
            </p>
          </div>

          {/* Dry Cleaning table */}
          <div>
            <h2 className="text-2xl font-bold">Dry Cleaning (per item)</h2>
            <p className="mt-2 text-gray-600">
              Expert care for delicates, silks, suits, and occasion wear.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {dryCleaning.map((row) => (
                    <tr key={row.item} className="border-t">
                      <td className="px-4 py-3">{row.item}</td>
                      <td className="px-4 py-3 font-medium">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-3 list-disc pl-5 text-sm text-gray-500">
              <li>Stain treatment included where possible.</li>
              <li>Beads/embellishments may incur a delicate-care surcharge.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VIP subscription */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">VIP Monthly Plan</h2>
              <p className="mt-1 text-gray-600">
                We take care of all your weekly laundry (2–3 people per home) with
                dedicated pickup every Monday and delivery on Thursday.
              </p>
              <p className="mt-2 text-xl font-extrabold">$299 / month</p>
              <p className="text-sm text-gray-500">
                Includes priority support & WhatsApp concierge.
              </p>
            </div>
            <a
              href="https://wa.me/9613392927?text=I'm%20interested%20in%20the%20VIP%20Monthly%20Plan"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 md:mt-0"
            >
              Ask about VIP
            </a>
          </div>
        </div>
      </section>

      {/* HostReady bundles */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-bold">HostReady™ — Airbnb Linen & Towel</h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Ready-to-use sets, delivered fresh and sealed. Perfect for fast
          turnovers—because your next guest is always just around the corner.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {hostReadyBundles.map((b) => (
            <div
              key={b.name}
              className="rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-blue-700">{b.name}</div>
              <ul className="mt-3 space-y-1 text-sm text-gray-700">
                {b.lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
              <div className="mt-3 font-semibold">{b.prices.join(" • ")}</div>
              <div className="mt-2 text-xs text-gray-500">{b.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="https://wa.me/9613392927?text=HostReady%20pricing%20inquiry"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Get a Host quote
          </a>
        </div>
      </section>

      {/* Notes & CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-gray-200 bg-white p-8">
          <h3 className="text-xl font-bold">Good to know</h3>
          <ul className="mt-3 grid gap-2 text-sm text-gray-600 md:grid-cols-2">
            <li>Service area: Beirut & Metn.</li>
            <li>Open Monday–Saturday. Closed Sundays.</li>
            <li>Express surcharge applies for same-day/next-day.</li>
            <li>Large items (duvets/blankets) priced separately.</li>
          </ul>

          <div className="mt-6 text-center">
            <a
              href="https://wa.me/9613392927"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
