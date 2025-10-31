// app/booking/BookingClient.tsx
"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TimeWindow = { label: string; start: string; end: string };

const TIME_WINDOWS: TimeWindow[] = [
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

// format Date -> "YYYY-MM-DD"
const toLocalYMD = (d: Date | null) => {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export default function BookingClient() {
  const today = new Date();

  // If you are using the login/signup flow with session, the API can ignore these contact fields.
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const [pickupDate, setPickupDate] = useState<Date | null>(today);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [pickupSlot, setPickupSlot] = useState<TimeWindow>(TIME_WINDOWS[1]);   // 10–11am
  const [deliverySlot, setDeliverySlot] = useState<TimeWindow>(TIME_WINDOWS[4]); // 1–2pm

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (pickupDate && deliveryDate && deliveryDate < pickupDate) {
      setMessage("❌ Delivery date cannot be before pickup date.");
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.startsWith("+")
        ? form.phone.trim()
        : `+961${form.phone.replace(/\D/g, "")}`,
      email: form.email.trim(),
      address: form.address.trim(),
      pickup: toLocalYMD(pickupDate),
      pickupStart: pickupSlot.start,
      pickupEnd: pickupSlot.end,
      delivery: toLocalYMD(deliveryDate),
      deliveryStart: deliverySlot.start,
      deliveryEnd: deliverySlot.end,
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
              data.detail
                ? ` — ${
                    typeof data.detail === "string"
                      ? data.detail
                      : JSON.stringify(data.detail)
                  }`
                : ""
            }`
      );
      if (data.success) {
        setForm({ name: "", phone: "", email: "", address: "", notes: "" });
        setPickupDate(today);
        setDeliveryDate(null);
        setPickupSlot(TIME_WINDOWS[1]);
        setDeliverySlot(TIME_WINDOWS[4]);
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
        Pick your dates and a time window — we’ll handle the rest.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Full Name"
          required
          className="w-full rounded-lg border px-4 py-2"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Phone (e.g. +96181392927 or 81392927)"
          required
          className="w-full rounded-lg border px-4 py-2"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email (required)"
          required
          className="w-full rounded-lg border px-4 py-2"
        />
        <input
          name="address"
          value={form.address}
          onChange={onChange}
          placeholder="Pickup Address"
          required
          className="w-full rounded-lg border px-4 py-2"
        />

        {/* Pickup date & window */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Pickup Date
            </label>
            <DatePicker
              selected={pickupDate}
              onChange={(d) => {
                setPickupDate(d);
                if (d && deliveryDate && deliveryDate < d) setDeliveryDate(d);
              }}
              minDate={today}
              dateFormat="yyyy-MM-dd"
              className="w-full rounded-lg border px-4 py-2"
              placeholderText="Select pickup date"
            />
          </div>
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Pickup Window
            </label>
            <select
              value={pickupSlot.label}
              onChange={(e) =>
                setPickupSlot(
                  TIME_WINDOWS.find((tw) => tw.label === e.target.value) ||
                    TIME_WINDOWS[1]
                )
              }
              className="w-full rounded-lg border px-4 py-2"
            >
              {TIME_WINDOWS.map((tw) => (
                <option key={tw.label} value={tw.label}>
                  {tw.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delivery date & window */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Delivery Date
            </label>
            <DatePicker
              selected={deliveryDate}
              onChange={setDeliveryDate}
              minDate={pickupDate || today}
              dateFormat="yyyy-MM-dd"
              className="w-full rounded-lg border px-4 py-2"
              placeholderText="Select delivery date"
            />
          </div>
          <div className="w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Delivery Window
            </label>
            <select
              value={deliverySlot.label}
              onChange={(e) =>
                setDeliverySlot(
                  TIME_WINDOWS.find((tw) => tw.label === e.target.value) ||
                    TIME_WINDOWS[4]
                )
              }
              className="w-full rounded-lg border px-4 py-2"
            >
              {TIME_WINDOWS.map((tw) => (
                <option key={tw.label} value={tw.label}>
                  {tw.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          placeholder="Special instructions (optional)"
          className="w-full rounded-lg border px-4 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#2cc1d5] px-6 py-3 font-medium text-white hover:bg-[#1da8bc] disabled:opacity-60"
        >
          {loading ? "Booking..." : "Book Pickup"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </main>
  );
}
