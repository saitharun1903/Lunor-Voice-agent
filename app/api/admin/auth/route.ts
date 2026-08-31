import { NextRequest, NextResponse } from "next/server";
import { validateAdminPassword, verifyAdminAuth, ADMIN_COOKIE_NAME, SESSION_SECRET } from "@/lib/auth";

export async function GET() {
  const isAuthed = await verifyAdminAuth();
  return NextResponse.json({ authenticated: isAuthed });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const isValid = await validateAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: "Authenticated successfully" });
    response.cookies.set(ADMIN_COOKIE_NAME, SESSION_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
