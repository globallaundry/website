// app/booking/page.tsx
"use client";

import { useState } from "react";

const toISO = (v: string) => v; // <input type="date" /> already gives YYYY-MM-DD

const TIME_WINDOWS = [
  { label: "9–10am", start: "9am", end: "10am" },
  { label: "10–11am", start: "10am", end: "11am" },
  { label: "11–12pm", start: "11am", end: "12pm" },
  { label: "12–1pm", start: "12pm", end: "1pm" },
  { label: "1–2pm", start: "1pm", end: "2pm" },
  { label: "2–3pm", start: "2pm", end: "3pm" },
  { label: "3–4pm", start: "3pm", end: "4pm" },
  { label: "4–5pm", start: "4pm", end: "5pm" },
  { label: "5–6pm", start: "5pm", end: "6pm" },
];

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pickup: "",
    pickupSlot: TIME_WINDOWS[1],   // default 10–11am
    delivery: "",
    deliverySlot: TIME_WINDOWS[4], // default 1–2pm
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      name: form.name.trim(),
      phone: form.phone.startsWith("+") ? form.phone.trim() : `+961${form.phone.replace(/\D/g, "")}`,
      address: form.address.trim(),
      pickup: toISO(form.pickup),
      pickupStart: form.pickupSlot.start,
      pickupEnd: form.pickupSlot.end,
      delivery: toISO(form.delivery),
      deliveryStart: form.deliverySlot.start,
      deliveryEnd: form.deliverySlot.end,
      notes: form.notes.trim(),
    };

    try {
      const r = await fetch("/api/cleancloud-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      setMessage(
        data.success
          ? "✅ Order created! We’ll confirm shortly."
          : `❌ ${data.error || "Failed to create order"}${
              data.detail ? ` — ${typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail)}` : ""
            }`
      );
      if (data.success) {
        setForm({
          name: "",
          phone: "",
          address: "",
          pickup: "",
          pickupSlot: TIME_WINDOWS[1],
          delivery: "",
          deliverySlot: TIME_WINDOWS[4],
          notes: "",
        });
      }
    } catch {
      setMessage("❌ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-center">Schedule a Pickup</h1>
      <p className="mt-2 text-center text-gray-600">
        Book your laundry pickup in a few seconds.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" required className="w-full rounded-lg border px-4 py-2" />
        <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (e.g. +96181392927)" required className="w-full rounded-lg border px-4 py-2" />
        <input name="address" value={form.address} onChange={onChange} placeholder="Pickup Address" required className="w-full rounded-lg border px-4 py-2" />

        {/* Pickup date & slot */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="date" name="pickup" value={form.pickup} onChange={onChange} required className="w-full rounded-lg border px-4 py-2" />
          <select
            value={form.pickupSlot.label}
            onChange={(e) => {
              const slot = TIME_WINDOWS.find((tw) => tw.label === e.target.value)!;
              setForm((f) => ({ ...f, pickupSlot: slot }));
            }}
            className="w-full rounded-lg border px-4 py-2"
          >
            {TIME_WINDOWS.map((tw) => (
              <option key={tw.label} value={tw.label}>{tw.label}</option>
            ))}
          </select>
        </div>

        {/* Delivery date & slot */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="date" name="delivery" value={form.delivery} onChange={onChange} required className="w-full rounded-lg border px-4 py-2" />
          <select
            value={form.deliverySlot.label}
            onChange={(e) => {
              const slot = TIME_WINDOWS.find((tw) => tw.label === e.target.value)!;
              setForm((f) => ({ ...f, deliverySlot: slot }));
            }}
            className="w-full rounded-lg border px-4 py-2"
          >
            {TIME_WINDOWS.map((tw) => (
              <option key={tw.label} value={tw.label}>{tw.label}</option>
            ))}
          </select>
        </div>

        <textarea name="notes" value={form.notes} onChange={onChange} placeholder="Special instructions (optional)" className="w-full rounded-lg border px-4 py-2" />

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-[#2cc1d5] px-6 py-3 font-medium text-white hover:bg-[#1da8bc] disabled:opacity-60">
          {loading ? "Booking..." : "Book Pickup"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </main>
  );
}
