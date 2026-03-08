import { NextResponse } from "next/server";

export async function GET() {
    const auths = [
        { id: "PA-001", patient: "Alice Cooper", status: "approved", aiConfidence: 0.95 },
    ];
    return NextResponse.json({ success: true, data: auths });
}

export async function POST(request: Request) {
    const body = await request.json();
    const mockAIAnalysis = {
        paId: "PA-NEW",
        originalData: body,
        approvalProbability: 0.82,
        missingDocumentation: ["Recent X-Ray results (within 6 months)"]
    };
    return NextResponse.json({ success: true, analysis: mockAIAnalysis });
}
