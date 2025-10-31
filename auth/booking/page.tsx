// app/page.tsx
import Link from "next/link";
import QuickBooking from "../components/QuickBooking";
import Hero from "../components/Hero";

export const metadata = {
  title: "Global Laundry™ | Fresh & Clean, Delivered",
  description:
    "Door-to-door laundry & dry cleaning across Beirut & Metn. Fast pickup, expert care, and on-time delivery.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Rinse-style hero */}
      <Hero />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                Beirut & Metn • Pickup & Delivery
              </span>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Your e-Laundry, Delivered.
              </h1>

              <p className="mt-4 text-lg text-gray-600 md:text-xl">
                We personally pick up, professionally clean, and hand-deliver
                your clothes — fast, fresh, and hassle-free.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Typical turnaround: <strong>48–72 hours</strong>. Express options
                available.
              </p>

              {/* Secondary CTAs (optional, keep if you want) */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/9613392927"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700"
                >
                  WhatsApp Us
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-gray-800 hover:bg-gray-50"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-gray-100">
              {/* Replace /hero.jpg with your real image in /public */}
              <img
                src="/hero.jpg"
                alt="Global Laundry delivery"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
          Book in seconds, then we handle everything from doorstep to closet.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Schedule pickup",
              desc: "Choose a time on WhatsApp or our app—no phone calls needed.",
            },
            {
              title: "We clean with care",
              desc: "Sorted, treated, and cleaned by experts. Delicates handled separately.",
            },
            {
              title: "Delivered to your door",
              desc: "Neatly folded or on hangers—on time, every time.",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="mb-3 h-10 w-10 rounded-lg bg-blue-600/10" />
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Services
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
            From daily laundry to delicate dry cleaning — and Airbnb turnovers.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Wash & Fold",
                desc: "Everyday laundry washed, dried, and folded—priced by kg.",
                href: "/services/wash-and-fold",
              },
              {
                title: "Dry Cleaning",
                desc: "Delicate care for suits, dresses, and special garments.",
                href: "/services/dry-cleaning",
              },
              {
                title: "HostReady™",
                desc: "Airbnb linen & towel rental with fast turnaround.",
                href: "/services/hostready",
              },
            ].map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="h-40 w-full overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={`/service-${i + 1}.jpg`}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-gray-600">{card.desc}</p>
                <span className="mt-3 inline-block text-blue-700">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-blue-600 px-8 py-10 text-white md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold">Simple, transparent pricing</h3>
            <p className="mt-1 text-blue-100">
              No surprises. See prices for laundry, dry cleaning, and extras.
            </p>
          </div>
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-blue-700 hover:bg-blue-50 md:mt-0"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Trusted by customers every day
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Georges O.",
                text:
                  "Always on time and super clean. Pickup & delivery made life easier.",
              },
              {
                name: "Paola B.",
                text:
                  "Delicates came back perfect. Love the folded packaging!",
              },
              {
                name: "Marwan",
                text: "Great service. WhatsApp booking is fast and simple.",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="text-gray-700">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-4 text-sm font-semibold text-gray-900">
                  {r.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold md:text-4xl">FAQ</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              q: "Where do you operate?",
              a: "Beirut & Metn. Pickup and delivery are available Monday–Saturday.",
            },
            {
              q: "How fast is delivery?",
              a: "Typical turnaround is 48–72 hours. Express options available.",
            },
            {
              q: "How do I book?",
              a: "Tap the WhatsApp button or schedule via our app/website.",
            },
            {
              q: "Are you open on Sundays?",
              a: "We’re closed on Sundays.",
            },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold">{f.q}</h3>
              <p className="mt-2 text-gray-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold">Ready to try Global Laundry™?</h3>
          <p className="mt-2 text-gray-600">
            Message us on WhatsApp and we’ll schedule your pickup.
          </p>
          <a
            href="https://wa.me/9613392927"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  );
}
