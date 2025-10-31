import { NextResponse } from "next/server";

/** Convert "YYYY-MM-DD" (or "MM/DD/YYYY") -> Unix timestamp at 12:00 UTC */
function toUnixAtNoonUTC(dateStr: string) {
  if (!dateStr) return undefined;
  let y: number, m: number, d: number;

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [yy, mm, dd] = dateStr.split("-").map(Number);
    y = yy; m = mm; d = dd;
  } else {
    const m1 = dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (!m1) return undefined;
    m = Number(m1[1]); d = Number(m1[2]); y = Number(m1[3]);
  }
  return Math.floor(Date.UTC(y, (m - 1), d, 12, 0, 0) / 1000);
}

async function addCustomer(
  apiToken: string,
  params: { name: string; phone: string; email: string; address: string }
) {
  const resp = await fetch("https://cleancloudapp.com/api/addCustomer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_token: apiToken,
      customerName: params.name,
      customerTel: params.phone,
      customerEmail: params.email, // REQUIRED by API
      customerAddress: params.address,
      makeLatLng: 1,
      findRoute: 1,
    }),
  });

  const text = await resp.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  if (!resp.ok || data?.Success === "False" || data?.success === false) {
    throw new Error(typeof data === "object" ? JSON.stringify(data) : String(text));
  }

  // API typically returns { Success:"True", CustomerID: 123, ... }
  const id = data?.CustomerID || data?.customerID || data?.id;
  if (!id) throw new Error("Could not read CustomerID from addCustomer response");
  return String(id);
}

async function addOrder(apiToken: string, payload: Record<string, any>) {
  const resp = await fetch("https://cleancloudapp.com/api/addOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await resp.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  if (!resp.ok || data?.Success === "False" || data?.success === false) {
    throw new Error(typeof data === "object" ? JSON.stringify(data) : String(text));
  }
  return data;
}

export async function POST(req: Request) {
  try {
    const {
      name = "",
      phone = "",
      email = "",
      address = "",
      pickup = "",
      pickupStart = "",
      pickupEnd = "",
      delivery = "",
      deliveryStart = "",
      deliveryEnd = "",
      notes = "",
    } = await req.json();

    const API_TOKEN = process.env.CLEANCLOUD_API_TOKEN;
    if (!API_TOKEN) {
      return NextResponse.json(
        { success: false, error: "Missing CLEANCLOUD_API_TOKEN in env." },
        { status: 500 }
      );
    }

    if (!name || !phone || !email || !address || !pickup || !delivery) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, phone, email, address, pickup, delivery)." },
        { status: 400 }
      );
    }

    const pickupDate = toUnixAtNoonUTC(pickup);
    const deliveryDate = toUnixAtNoonUTC(delivery);
    if (!pickupDate || !deliveryDate) {
      return NextResponse.json(
        { success: false, error: "Invalid pickup/delivery date format." },
        { status: 400 }
      );
    }

    // 1) Create customer (email is required by CleanCloud)
    const customerID = await addCustomer(API_TOKEN, { name, phone, email, address });

    // 2) Create order (status 3 = Pickup Requiring Confirmation; finalTotal is required)
    const orderPayload = {
      api_token: API_TOKEN,
      customerID,
      finalTotal: 0,
      status: 3,                 // Pickup Requiring Confirmation
      pickupDate,                // Unix timestamp @ 12pm UTC
      pickupStart,
      pickupEnd,
      delivery: 1,
      deliveryDate,              // Unix timestamp @ 12pm UTC
      deliveryStart,
      deliveryEnd,
      orderNotes: notes,
    };

    const order = await addOrder(API_TOKEN, orderPayload);
    return NextResponse.json({ success: true, customerID, order });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Upstream error", detail: String(err?.message || err) },
      { status: 400 }
    );
  }
}
