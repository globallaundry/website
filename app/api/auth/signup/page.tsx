"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const r = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const payload = {
      ...form,
      phone: form.phone.startsWith("+") ? form.phone : `+961${form.phone.replace(/\D/g, "")}`,
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.ok) {
      r.push("/booking");
    } else {
      setMsg(`❌ ${data.error || "Signup failed"}`);
    }
    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-center">Create your account</h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input name="name" placeholder="Full name" required className="w-full rounded-lg border px-4 py-2" value={form.name} onChange={onChange} />
        <input name="email" type="email" placeholder="Email" required className="w-full rounded-lg border px-4 py-2" value={form.email} onChange={onChange} />
        <input name="phone" placeholder="Phone (+961… or 81…)" required className="w-full rounded-lg border px-4 py-2" value={form.phone} onChange={onChange} />
        <input name="address" placeholder="Address" required className="w-full rounded-lg border px-4 py-2" value={form.address} onChange={onChange} />
        <button disabled={loading} className="w-full rounded-lg bg-[#2cc1d5] px-6 py-3 text-white hover:bg-[#1da8bc]">
          {loading ? "Creating..." : "Sign up"}
        </button>
        {msg && <p className="text-center text-sm text-red-600">{msg}</p>}
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account? <a href="/auth/login" className="text-blue-600 underline">Log in</a>
      </p>
    </main>
  );
}
