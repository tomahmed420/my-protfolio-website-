import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const store = await cookies();
  store.set("portfolio_admin", "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
