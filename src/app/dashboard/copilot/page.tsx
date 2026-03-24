"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, User, Send, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function CopilotPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I am your HelixFlow AI Copilot. I can help you verify coding guidelines, analyze denial reasons, or predict prior authorization requirements based on medical policy. How can I assist you today?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMsg.content })
            });
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Failed to connect to LLM');
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.response || "No response generated.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            
        } catch (error: unknown) {
            console.error(error);
            const errMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `Error: Could not connect to the local inference API. Please ensure Ollama is running.\nDetails: ${error instanceof Error ? error.message : 'Unknown error'}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Copilot</h1>
                <p className="text-muted-foreground">Conversational AI powered by local LLMs for clinical reasoning and coding optimization.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-220px)] min-h-[500px]">
                {/* Chat Area */}
                <Card className="flex flex-col flex-1 shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden">
                    <CardHeader className="border-b bg-muted/40 py-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Bot className="h-5 w-5 text-primary" />
                            HelixFlow AI
                            <span className="ml-auto text-xs font-normal text-muted-foreground flex items-center gap-1">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Model: Gemma 3 (Local)
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`flex items-center justify-center h-8 w-8 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'}`}>
                                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`rounded-lg px-4 py-3 text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 border border-border'}`}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">
                                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full shrink-0 bg-muted border border-border">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <div className="bg-muted/60 border border-border rounded-lg px-4 py-3 text-sm flex items-center gap-1">
                                    <span className="animate-bounce">●</span>
                                    <span className="animate-bounce delay-100">●</span>
                                    <span className="animate-bounce delay-200">●</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>
                    <CardFooter className="border-t p-3 bg-muted/20">
                        <form 
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="flex w-full gap-2 items-center"
                        >
                            <input 
                                className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Ask about CPT codes, denial reasons, or medical policy..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                autoFocus
                            />
                            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>

                {/* Sidebar Info */}
                <div className="w-full md:w-64 flex flex-col gap-4 hidden md:flex">
                    <Card>
                        <CardHeader className="py-3 px-4">
                            <CardTitle className="text-sm font-medium">Suggested Prompts</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 flex flex-col gap-2">
                            <button onClick={() => setInput("What is the clinical criteria for an MRI of the lumbar spine (CPT 72148)?")} className="text-left text-xs text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50 border border-transparent hover:border-border">
                                &quot;What is the clinical criteria for an MRI of the lumbar spine (CPT 72148)?&quot;
                            </button>
                            <button onClick={() => setInput("Draft an appeal letter for denial reason 'CO-4' based on medical necessity.")} className="text-left text-xs text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50 border border-transparent hover:border-border">
                                &quot;Draft an appeal letter for denial reason &apos;CO-4&apos; based on medical necessity.&quot;
                            </button>
                            <button onClick={() => setInput("Are modifiers 25 and 59 compatible when billing for E&M and a minor procedure?")} className="text-left text-xs text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50 border border-transparent hover:border-border">
                                &quot;Are modifiers 25 and 59 compatible when billing for E&amp;M and a minor procedure?&quot;
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition-all bg-primary/5 border-border/50 rounded-xl overflow-hidden">
                        <CardHeader className="py-3 px-4">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-primary" />
                                Context Connected
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <p className="text-xs text-muted-foreground mb-3">
                                The AI currently has read-only context to your active tenant&apos;s Knowledge Graph, Payer Policies, and CPT/ICD-10 databases.
                            </p>
                            <a href="#" className="text-xs text-primary flex items-center gap-1 hover:underline">
                                View Connected Sources <ExternalLink className="h-3 w-3" />
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
