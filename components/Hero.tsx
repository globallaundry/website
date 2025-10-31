// components/Hero.tsx
import QuickBooking from "../components/QuickBooking";

export default function Hero() {
  return (
    <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
      {/* Background video (optional). Put /public/hero.mp4 or fallback to /public/hero.jpg */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero.jpg"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl text-left text-white">
          {/* Headline (2 lines, second in brand color) */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="block">WE’LL TAKE THE LAUNDRY.</span>
            <span className="block text-[#2cc1d5]">YOU TAKE THE TIME.</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/90 md:text-xl">
            Global Laundry picks up, cleans, and delivers your laundry and dry cleaning.
          </p>

          {/* Quick booking panel */}
          <div className="mt-6 max-w-lg">
            <QuickBooking />
          </div>
        </div>
      </div>
    </section>
  );
}
