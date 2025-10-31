// lib/session.ts
import { cookies } from "next/headers";

const COOKIE_NAME = "gl_session"; // httpOnly cookie

export type GLSess = {
  name: string;
  email: string;
  phone: string;
  address: string;
  customerID: string; // CleanCloud customerID
};

export function setSession(data: GLSess) {
  cookies().set({
    name: COOKIE_NAME,
    value: JSON.stringify(data),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function getSession(): GLSess | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GLSess;
  } catch {
    return null;
  }
}

export function clearSession() {
  cookies().delete(COOKIE_NAME);
}