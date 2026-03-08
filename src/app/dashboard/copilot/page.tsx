"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Send } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function CopilotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I am HelixFlow AI Copilot. How can I assist you with clinical coding, payer policies, or revenue optimization today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        // Mock AI response
        setTimeout(() => {
            let aiResponse = "I've analyzed that request. Based on the current payer policies and clinical guidelines, proceeding with the standard protocol is recommended. Do you need the specific exact codes for this procedure?";

            if (input.toLowerCase().includes("mri") && input.toLowerCase().includes("bluecross")) {
                aiResponse = "For an MRI with BlueCross, you must document 6 weeks of conservative therapy (e.g., physical therapy, NSAIDs) prior to the scan, unless the patient has red flag symptoms like sudden severe headache.";
            } else if (input.toLowerCase().includes("denial") || input.toLowerCase().includes("deny")) {
                aiResponse = "I can help appeal that denial. The most common reason for PR-1 denials is missing clinical notes. Would you like me to auto-generate a templated appeal letter pulling data from the patient's EHR?";
            }

            setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-4 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Copilot</h1>
                <p className="text-muted-foreground">Natural language interface for healthcare policy and operations.</p>
            </div>

            <Card className="flex flex-col flex-1 overflow-hidden border-muted">
                <CardHeader className="border-b bg-muted/20 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        Healthcare Policy LLM
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full p-4">
                        <div className="flex flex-col gap-4 pb-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'assistant' && (
                                        <Avatar className="h-8 w-8 border bg-primary/10">
                                            <AvatarFallback className="bg-transparent text-primary"><Bot className="h-5 w-5" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-xl px-4 py-2 max-w-[80%] ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted border text-foreground'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    {msg.role === 'user' && (
                                        <Avatar className="h-8 w-8 border bg-secondary">
                                            <AvatarFallback className="bg-transparent"><User className="h-5 w-5" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t bg-muted/20">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex w-full items-center space-x-2"
                    >
                        <Input
                            type="text"
                            placeholder="Ask about payer rules, coding assistance, or claim status..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!input.trim()}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
