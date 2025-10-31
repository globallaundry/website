import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

function toUnixAtNoonUTC(dateStr: string) {
  const [y, m, d] = (dateStr || "").split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return Math.floor(Date.UTC(y, m - 1, d, 12, 0, 0) / 1000);
}

export async function POST(req: Request) {
  try {
    const sess = getSession();
    if (!sess) return NextResponse.json({ success: false, error: "Not authenticated." }, { status: 401 });

    const API_TOKEN = process.env.CLEANCLOUD_API_TOKEN;
    if (!API_TOKEN) return NextResponse.json({ success: false, error: "Missing CLEANCLOUD_API_TOKEN." }, { status: 500 });

    const { pickup, pickupStart, pickupEnd, delivery, deliveryStart, deliveryEnd, notes } = await req.json();

    const pickupDate = toUnixAtNoonUTC(pickup);
    const deliveryDate = toUnixAtNoonUTC(delivery);
    if (!pickupDate || !deliveryDate) {
      return NextResponse.json({ success: false, error: "Invalid pickup/delivery date." }, { status: 400 });
    }

    const resp = await fetch("https://cleancloudapp.com/api/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_token: API_TOKEN,
        storeID: sess.storeID,       // ✅ route uses chosen store
        customerID: sess.customerID,
        finalTotal: 0,
        status: 3,                   // Pickup Requiring Confirmation
        pickupDate, pickupStart, pickupEnd,
        delivery: 1, deliveryDate, deliveryStart, deliveryEnd,
        orderNotes: notes,
      }),
    });

    const text = await resp.text();
    let data: any; try { data = JSON.parse(text); } catch { data = { raw: text }; }
    if (!resp.ok || data?.Success === "False") {
      return NextResponse.json({ success: false, error: data?.Message || "CleanCloud error", detail: data }, { status: 400 });
    }
    return NextResponse.json({ success: true, order: data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: "Upstream error", detail: String(e?.message || e) }, { status: 400 });
  }
}
