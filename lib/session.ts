import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET env variable is not set");
}
const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);
const COOKIE = "admin_session";
const EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function createSession() {
  const expiresAt = new Date(Date.now() + EXPIRES_IN);
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await verifySession();
  if (!session) redirect("/admin/login");
  return session;
}
