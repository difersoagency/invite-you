import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://invitation.inviteyouinvitation.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const text = await response.text(); // parse dulu text
    try {
      const data = JSON.parse(text); // baru parse JSON
      return NextResponse.json(data, { status: response.status });
    } catch {
      console.error("Laravel returned invalid JSON:", text);
      return NextResponse.json(
        { message: "Laravel API did not return JSON", details: text },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("LOGIN PROXY ERROR:", error);
    return NextResponse.json(
      { message: "Proxy login error", details: error.message },
      { status: 500 }
    );
  }
}
