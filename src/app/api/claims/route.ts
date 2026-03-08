import { NextResponse } from "next/server";

export async function GET() {
    const claims = [
        { id: "CLM-001", patient: "Jane Smith", amount: 1500, status: "pending", aiPrediction: 0.8 },
        { id: "CLM-002", patient: "John Doe", amount: 250, status: "denied", aiPrediction: 0.1 },
    ];
    return NextResponse.json({ success: true, data: claims });
}

export async function POST(request: Request) {
    const body = await request.json();
    const mockAIAnalysis = {
        claimId: "CLM-NEW",
        originalData: body,
        denialRisk: 0.45,
        recommendation: "Ensure modifier 25 is applied to E/M code."
    };
    return NextResponse.json({ success: true, analysis: mockAIAnalysis });
}
