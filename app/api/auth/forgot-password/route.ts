import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email = "" } = await req.json();

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    const API_TOKEN = process.env.CLEANCLOUD_API_TOKEN;
    if (!API_TOKEN) {
      return NextResponse.json({ ok: false, error: "Missing CLEANCLOUD_API_TOKEN" }, { status: 500 });
    }

    const resp = await fetch("https://cleancloudapp.com/api/passwordCustomer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_token: API_TOKEN,
        customerEmail: email,
      }),
    });

    const text = await resp.text();
    let data: any;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    // CleanCloud returns Success True/False; treat non-200 or explicit failure as error
    if (!resp.ok || data?.Success === "False") {
      return NextResponse.json(
        { ok: false, error: data?.Message || "Unable to send reset email" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 400 });
  }
}
