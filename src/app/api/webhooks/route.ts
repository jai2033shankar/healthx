import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate API key logic would go here
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer sk_")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            message: "Webhook event processed successfully.",
            event_id: "evt_123456789",
            received_payload: data
        });
    } catch (err) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
}
