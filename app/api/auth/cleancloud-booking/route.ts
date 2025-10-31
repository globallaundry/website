import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

/** Convert "YYYY-MM-DD" -> Unix timestamp at 12:00 UTC */
function toUnixAtNoonUTC(dateStr: string) {
  if (!dateStr) return undefined;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return Math.floor(Date.UTC(y, m - 1, d, 12, 0, 0) / 1000);
}

async function addOrder(apiToken: string, payload: Record<string, any>) {
  const resp = await fetch("https://cleancloudapp.com/api/addOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await resp.text();
  let data: any; try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!resp.ok || data?.Success === "False" || data?.success === false) {
    throw new Error(typeof data === "object" ? JSON.stringify(data) : String(text));
  }
  return data;
}

export async function POST(req: Request) {
  try {
    const sess = getSession();
    if (!sess) return NextResponse.json({ success: false, error: "Not authenticated." }, { status: 401 });

    const API_TOKEN = process.env.CLEANCLOUD_API_TOKEN;
    if (!API_TOKEN) return NextResponse.json({ success: false, error: "Missing CLEANCLOUD_API_TOKEN." }, { status: 500 });

    const { pickup = "", pickupStart = "", pickupEnd = "", delivery = "", deliveryStart = "", deliveryEnd = "", notes = "" } = await req.json();

    const pickupDate = toUnixAtNoonUTC(pickup);
    const deliveryDate = toUnixAtNoonUTC(delivery);
    if (!pickupDate || !deliveryDate) {
      return NextResponse.json({ success: false, error: "Invalid pickup/delivery date." }, { status: 400 });
    }

    const orderPayload = {
      api_token: API_TOKEN,
      customerID: sess.customerID,
      finalTotal: 0,
      status: 3,
      pickupDate,
      pickupStart,
      pickupEnd,
      delivery: 1,
      deliveryDate,
      deliveryStart,
      deliveryEnd,
      orderNotes: notes,
    };

    const order = await addOrder(API_TOKEN, orderPayload);
    return NextResponse.json({ success: true, order });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: "Upstream error", detail: String(e?.message || e) }, { status: 400 });
  }
}