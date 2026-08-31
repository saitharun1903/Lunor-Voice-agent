import { cookies } from "next/headers";
import { getSiteData } from "./db";

const ADMIN_COOKIE_NAME = "luno_admin_session";
const SESSION_SECRET = "luno_secure_session_token_v1";

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }
    // Verify session token
    return sessionCookie.value === SESSION_SECRET;
  } catch (error) {
    return false;
  }
}

export async function validateAdminPassword(password: string): Promise<boolean> {
  const data = await getSiteData();
  const validPassword = data.settings.adminPasswordHash || "admin123";
  return password === validPassword;
}

export { ADMIN_COOKIE_NAME, SESSION_SECRET };
