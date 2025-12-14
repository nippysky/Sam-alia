// app/api/commission/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: send email, store in DB, push to CRM, etc.
    // For now, just acknowledge.
    return NextResponse.json({ ok: true, received: body }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
