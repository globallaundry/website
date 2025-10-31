"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STORES = [
  { id: process.env.NEXT_PUBLIC_CLEANCLOUD_STORE_SARL || "", label: "Jdeideh — Global Laundry SARL" },
  { id: process.env.NEXT_PUBLIC_CLEANCLOUD_STORE_SAL || "", label: "Dekwaneh — Global Laundry SAL" },
];

export default function LoginPage() {
  const r = useRouter();
  const [form, setForm] = useState({ email: "", password: "", storeID: STORES[0]?.id || "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        r.push("/booking");
      } else {
        setMsg(`❌ ${data.error || "Login failed"}`);
        if (data.upstream) console.log("CleanCloud upstream:", data.upstream);
      }
    } catch {
      setMsg("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-center">Login to Customer Account</h1>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm">Store</span>
          <select
            name="storeID"
            value={form.storeID}
            onChange={onChange}
            className="w-full rounded-lg border px-4 py-2"
            required
          >
            {STORES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>

        <input
          type="email" name="email" placeholder="Email" required
          className="w-full rounded-lg border px-4 py-2"
          value={form.email} onChange={onChange}
        />
        <input
          type="password" name="password" placeholder="Password" required
          className="w-full rounded-lg border px-4 py-2"
          value={form.password} onChange={onChange}
        />

        <button disabled={loading} className="w-full rounded-lg bg-[#2cc1d5] px-6 py-3 text-white hover:bg-[#1da8bc]">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {msg && <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>}
      <p className="mt-6 text-center text-sm">
        <a href="/auth/forgot-password" className="text-blue-600 underline">Forgot your password?</a>
      </p>
    </main>
  );
}
