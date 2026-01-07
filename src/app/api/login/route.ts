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
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("LOGIN PROXY ERROR:", error);
    if (error.response) {
        console.error("Laravel response status:", error.response.status);
        console.error("Laravel response data:", await error.response.text());
    }
    return NextResponse.json({ message: "Proxy login error", details: error.message }, { status: 500 });
}

}
