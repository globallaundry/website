// app/about/page.tsx
import Image from "next/image";

export const metadata = {
  title: "About Us | Global Laundry™",
  description:
    "Learn about Global Laundry SAL — Lebanon’s leading digital laundry service, proudly serving Beirut & Metn with 100% in-house operations.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-extrabold md:text-5xl">About Global Laundry™</h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            We’re Lebanon’s leading technology-driven laundry service — offering pickup and
            delivery across Beirut & Metn with complete in-house operations, from cleaning to logistics.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Founded in 2018, Global Laundry began as a single-store operation in Jdeideh and has since
            expanded into a modern service powered by technology and automation.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We believe laundry should be simple — so we built a system that lets you schedule, track,
            and receive your orders effortlessly. From our in-house plant in Dekwaneh to our own fleet
            of delivery vans and drivers, every step is handled by our team.
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200">
          <Image
            src="/about-plant.jpg"
            alt="Global Laundry plant and operations"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              To redefine laundry service through reliability, transparency, and care —
              combining smart technology with human precision.
            </p>
            <ul className="mt-5 list-disc pl-5 text-gray-700">
              <li>100% in-house cleaning — no outsourcing</li>
              <li>Eco-friendly detergents & water-efficient machines</li>
              <li>Seamless digital experience for customers</li>
              <li>Fast, on-time pickup and delivery</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              To become the region’s most trusted textile-care brand — setting new standards
              for convenience, consistency, and sustainability in laundry.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-bold text-center">Meet the Team</h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Behind every clean item is a dedicated team — from operators and dry cleaners to logistics and customer support.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3 text-center">
          {[
            { name: "Peter", role: "Founder & Managing Director" },
            { name: "Elie", role: "CFO & Partner" },
            { name: "Pierre", role: "Legal & Compliance Partner" },
          ].map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100"></div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold">Join the Global Laundry Experience</h3>
          <p className="mt-2 text-gray-600">
            Try Lebanon’s most convenient laundry service — pickup and delivery just a message away.
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
