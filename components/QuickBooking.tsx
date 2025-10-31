// components/QuickBooking.tsx
"use client";

import { useState } from "react";
import { Calendar, MapPin, ArrowRight, Star, Apple } from "lucide-react";

export default function QuickBooking() {
  const [pickupWhen, setPickupWhen] = useState("Tonight");
  const [address, setAddress] = useState("");

  function submit() {
    // TODO: replace with your WhatsApp deep link or internal booking flow
    console.log({ pickupWhen, address });
    window.location.href =
      "https://wa.me/9613392927?text=" +
      encodeURIComponent(
        `Pickup: ${pickupWhen}\nAddress: ${address || "(not provided)"}`
      );
  }

  return (
    <div className="space-y-3">
      {/* Main control */}
      <div className="flex w-full flex-col gap-2 rounded-2xl border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur md:flex-row md:items-center md:gap-3">
        {/* Pickup */}
        <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 md:border-r md:border-gray-200 md:py-3">
          <div className="rounded-md bg-blue-600/10 p-2">
            <Calendar className="h-4 w-4 text-blue-700" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Pickup
            </div>
            <select
              className="w-full truncate bg-transparent text-sm font-medium text-gray-900 outline-none"
              value={pickupWhen}
              onChange={(e) => setPickupWhen(e.target.value)}
            >
              <option>Tonight</option>
              <option>Tomorrow Morning</option>
              <option>Tomorrow Evening</option>
            </select>
          </div>
        </div>

        {/* Where */}
        <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 md:py-3">
          <div className="rounded-md bg-blue-600/10 p-2">
            <MapPin className="h-4 w-4 text-blue-700" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Where
            </div>
            <input
              className="w-full truncate bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              placeholder="Add address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* CTA (round arrow) */}
          <button
            onClick={submit}
            className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2cc1d5] text-white transition hover:bg-[#1da8bc]"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* App badges (placeholders—replace links when ready) */}
        <a
          href="https://apps.apple.com/lb/app/global-laundry/id6742997458"
          className="flex items-center gap-2 rounded-xl bg-black/80 px-3 py-2 text-white"
        >
          <Apple className="h-4 w-4" />
          <span className="text-xs font-semibold">App Store</span>
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=com.cleancloudapp.globallaundrylebanon&hl=en"
          className="flex items-center gap-2 rounded-xl bg-gray-800 px-3 py-2 text-white"
        >
          <div className="grid h-4 w-4 place-items-center rounded bg-white text-gray-900 text-[10px] font-black">
            G
          </div>
          <span className="text-xs font-semibold">Google Play</span>
        </a>

        {/* Reviews badge */}
        <div className="ml-2 flex items-center gap-1 rounded-xl bg-gray-900/80 px-3 py-2 text-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
          <span className="ml-2 text-xs">100+ reviews</span>
        </div>
      </div>
    </div>
  );
}
