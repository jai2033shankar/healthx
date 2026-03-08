"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Workflow, Trash2 } from "lucide-react";

export default function RulesEnginePage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Rules Engine (Low-Code)</h1>
                    <p className="text-muted-foreground">Define business logic and AI guardrails without writing code.</p>
                </div>
                <Button className="gap-2"><Plus className="h-4 w-4" /> New Rule</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Logic Workflows</CardTitle>
                    <CardDescription>Rules currently overriding or informing AI decisions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">

                        <div className="border rounded-lg p-6 bg-card flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Workflow className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold text-lg">Auto-Approve Low Value Claims</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center bg-muted/40 p-4 rounded-md">
                                <strong className="text-sm">IF</strong>
                                <Select defaultValue="claim_amount">
                                    <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="Condition" /></SelectTrigger>
                                    <SelectContent><SelectItem value="claim_amount">Claim Amount</SelectItem></SelectContent>
                                </Select>
                                <Select defaultValue="less_than">
                                    <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Operator" /></SelectTrigger>
                                    <SelectContent><SelectItem value="less_than">Less Than</SelectItem></SelectContent>
                                </Select>
                                <div className="flex items-center border rounded-md px-3 bg-background">
                                    <span className="text-muted-foreground">$</span>
                                    <input type="number" defaultValue="250" className="bg-transparent border-0 outline-none w-20 p-2 text-sm" />
                                </div>
                                <strong className="text-sm">AND</strong>
                                <Select defaultValue="ai_conf">
                                    <SelectTrigger className="w-[200px] bg-background"><SelectValue placeholder="Condition" /></SelectTrigger>
                                    <SelectContent><SelectItem value="ai_conf">AI Confidence Score</SelectItem></SelectContent>
                                </Select>
                                <Select defaultValue="gt">
                                    <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Operator" /></SelectTrigger>
                                    <SelectContent><SelectItem value="gt">Greater Than</SelectItem></SelectContent>
                                </Select>
                                <div className="flex items-center border rounded-md px-3 bg-background">
                                    <input type="number" defaultValue="90" className="bg-transparent border-0 outline-none w-12 p-2 text-sm" />
                                    <span className="text-muted-foreground">%</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center bg-primary/5 p-4 rounded-md border border-primary/20">
                                <strong className="text-sm text-primary">THEN</strong>
                                <Select defaultValue="auto_submit">
                                    <SelectTrigger className="w-[240px] bg-background border-primary/30"><SelectValue placeholder="Action" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="auto_submit">Auto-Submit to Payer</SelectItem>
                                        <SelectItem value="flag_review">Flag for Manual Review</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm" className="ml-auto"><Plus className="h-4 w-4 mr-1" /> Action</Button>
                            </div>
                        </div>

                        <div className="border rounded-lg p-6 bg-card flex flex-col gap-4 opacity-75">
                            {/* 2nd Mock Rule */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Workflow className="h-5 w-5 text-muted-foreground" />
                                    <h3 className="font-semibold text-lg">Flag High-Probability Denials</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">Paused</Badge>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">If [Denial Risk] &gt; 80% THEN [Route to Specialist Queue]</div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
