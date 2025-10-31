import { cookies } from "next/headers";

export async function setSession(data: GLSess) {
  const cookieStore = cookies(); // No need to await this anymore in latest Next.js

  cookieStore.set({
    name: COOKIE_NAME,
    value: JSON.stringify(data),
    httpOnly: true,
    path: "/",
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
