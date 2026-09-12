import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({error:"Unauthorized"},{status:401});
  }
  const store = await cookies();
  store.set("portfolio_admin","authenticated",{httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:60*60*24*7});
  return NextResponse.json({ok:true});
}