import { NextResponse } from "next/server";
import { setSession } from "@/lib/session";
import { getStoreById } from "@/lib/stores";

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const email = String(raw.email || "").trim().toLowerCase();
    const password = String(raw.password || "").trim();
    const storeID = String(raw.storeID || "").trim();

    if (!email || !password || !storeID) {
      return NextResponse.json({ ok: false, error: "Missing email, password, or store" }, { status: 400 });
    }

    const API_TOKEN = process.env.CLEANCLOUD_API_TOKEN;
    if (!API_TOKEN) {
      return NextResponse.json({ ok: false, error: "Missing CLEANCLOUD_API_TOKEN" }, { status: 500 });
    }

    const resp = await fetch("https://cleancloudapp.com/api/loginCustomer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_token: API_TOKEN,
        customerEmail: email,
        customerPassword: password,
        storeID, // ✅ include store ID
      }),
    });

    const text = await resp.text();
    let data: any; try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!resp.ok || data?.Success === "False" || !data?.CustomerID) {
      return NextResponse.json(
        { ok: false, error: data?.Message || "Invalid credentials", upstream: data },
        { status: 401 }
      );
    }

    const store = getStoreById(storeID);
    setSession({
      name: data?.CustomerName || "",
      email,
      phone: data?.CustomerTel || "",
      address: data?.CustomerAddress || "",
      customerID: String(data.CustomerID),
      storeID,
      storeLabel: store?.label,
    });

    return NextResponse.json({ ok: true, customerID: String(data.CustomerID) });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 400 });
  }
}
