"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Authenticating credentials...',
                success: 'Welcome back to HelixFlow AI.',
                error: 'Authentication failed.',
            }
        );

        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background">

            {/* Left side / Branding container */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12 border-r border-border/50 bg-muted/20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="max-w-md w-full space-y-8 relative z-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tight mb-8 hover:opacity-80 transition-opacity">
                        <Bot className="h-8 w-8 text-primary" />
                        <span>HelixFlow<span className="text-primary">AI</span></span>
                    </Link>

                    <h1 className="text-4xl font-extrabold tracking-tight">The intelligence layer for modern healthcare.</h1>
                    <p className="text-lg text-muted-foreground">Log in to explore the interactive mock environment pre-populated with synthetic claims and prior authorization data.</p>

                    <div className="pt-8 space-y-4">
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck className="h-4 w-4" /></div>
                            SOC2 & HIPAA Compliant Architecture
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side / Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                <div className="absolute top-4 right-4 md:hidden">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
                        <Bot className="h-5 w-5 text-primary" />
                        <span>HelixFlow<span className="text-primary">AI</span></span>
                    </Link>
                </div>

                <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <Card className="border-muted shadow-2xl shadow-primary/5">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                            <CardDescription>
                                Use the pre-filled demo credentials to access the platform.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleLogin}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@helixflow.ai"
                                        defaultValue="demo@helixflow.ai"
                                        required
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        defaultValue="demo123"
                                        required
                                        className="h-11"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4 pt-4">
                                <Button className="w-full h-11 text-base font-semibold shadow-md" type="submit" disabled={isLoading}>
                                    {isLoading ? "Authenticating..." : (
                                        <>Sign in to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></>
                                    )}
                                </Button>
                                <div className="text-sm text-center text-muted-foreground w-full">
                                    Don&apos;t have an enterprise account? <Link href="#" className="text-primary hover:underline font-medium">Contact Sales</Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
