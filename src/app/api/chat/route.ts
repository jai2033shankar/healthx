import { NextResponse } from 'next/server';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma3';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, systemPrompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const payload = {
            model: OLLAMA_MODEL,
            prompt: prompt,
            system: systemPrompt || "You are HelixFlow AI, a highly advanced healthcare administration AI assistant. You help medical coders, billers, and hospital administrators navigate complex policies, deny appeals, and optimize operations. Keep answers concise, professional, and healthcare-focused.",
            stream: false,
            options: {
                temperature: 0.2
            }
        };

        const response = await fetch(`${OLLAMA_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('Ollama Error:', errText);
            return NextResponse.json({ error: `Ollama API error: ${response.statusText}` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ 
            response: data.response,
            model: data.model,
            duration: data.total_duration
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Failed to communicate with LLM provider' }, { status: 500 });
    }
}
