import { cookies } from "next/headers";

const COOKIE_NAME = "gl_session";

export type GLSess = {
  name: string;
  email: string;
  phone: string;
  address: string;
  customerID: string;
  storeID: string;      // ✅ which store to use for API calls
  storeLabel?: string;  // nice label to show in UI
};

export function setSession(data: GLSess) {
  cookies().set({
    name: COOKIE_NAME,
    value: JSON.stringify(data),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function getSession(): GLSess | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try { return JSON.parse(raw) as GLSess; } catch { return null; }
}

export function clearSession() {
  cookies().delete(COOKIE_NAME);
}
