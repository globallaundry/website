import { cookies } from "next/headers";

export const COOKIE_NAME = "gl_sess";

export type GLSess = {
  email: string;
  phone: string;
  address: string;
  customerID: number;
  storeID: number;
  storeLabel?: string;
  name?: string;
};

export function setSession(data: GLSess) {
  const cookieStore = cookies(); // ✅ synchronous
  cookieStore.set(COOKIE_NAME, JSON.stringify(data), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function getSession(): GLSess | null {
  const cookieStore = cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GLSess;
  } catch {
    return null;
  }
}

export function clearSession() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });
}
