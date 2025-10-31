"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setMsg("✅ If that email exists, a reset link has been sent.");
      } else {
        setMsg(`❌ ${data.error || "Could not send reset email"}`);
      }
    } catch {
      setMsg("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-center">Forgot your password?</h1>
      <p className="mt-2 text-center text-gray-600">
        Enter your account email and we’ll send a reset link.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-lg border px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#2cc1d5] px-6 py-3 font-medium text-white hover:bg-[#1da8bc]"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      {msg && <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>}

      <p className="mt-6 text-center text-sm text-gray-500">
        Remembered it?{" "}
        <a href="/auth/login" className="text-blue-600 underline">Back to login</a>
      </p>
    </main>
  );
}
