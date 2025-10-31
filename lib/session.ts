import { cookies } from "next/headers";

const COOKIE_NAME = "global_laundry_session";

// Define the session type
export type GLSess = {
  customerID: number;
  email: string;
  storeID?: number;
};

// Save session to cookie
export function setSession(data: GLSess) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(data), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Read session from cookie
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

// Remove session (logout)
export function clearSession() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    path: "/",
    expires: new Date(0),
  });
}