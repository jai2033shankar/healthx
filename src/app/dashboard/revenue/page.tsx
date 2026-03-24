"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, TrendingUp, DollarSign, BrainCircuit } from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

interface RevenueData {
    date: string;
    collected: number;
    billed: number;
    leakageDetected: number;
    type: 'historical' | 'forecast';
}

export default function RevenueCyclePage() {
    const [data, setData] = useState<RevenueData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/predict?type=revenue')
            .then(res => res.json())
            .then(json => {
                setData(json.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const totalLeakagePrevented = (data || []).filter(d => d.type === 'historical').reduce((sum, d) => sum + d.leakageDetected, 0);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Revenue Cycle Intelligence</h1>
                <p className="text-muted-foreground">Monitor AI claims scrubbing, tracked revenue, and projected leakage.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Activity className="animate-spin text-primary h-8 w-8" /></div>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="shadow-md hover:shadow-lg transition-all bg-primary/5 border-border/50 rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">AI Prevented Leakage (30d)</CardTitle>
                                <BrainCircuit className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">
                                    ${totalLeakagePrevented.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Codes corrected before submission</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">First-Pass Yield</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">94.2%</div>
                                <p className="text-xs text-muted-foreground mt-1">+3.1% since AI activation</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">A/R Days Remaining</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">38 Days</div>
                                <p className="text-xs text-muted-foreground mt-1">-12 days from industry average</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden mt-4">
                        <CardHeader>
                            <CardTitle>Cash Flow & Extrapolated Forecast</CardTitle>
                            <CardDescription>Historical collections versus AI predictive forecast model.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                                    <XAxis 
                                        dataKey="date" 
                                        stroke="hsl(var(--muted-foreground))" 
                                        fontSize={12} 
                                        tickLine={false} 
                                        axisLine={false}
                                        tickFormatter={(val) => val.slice(5)} // Show MM-DD
                                    />
                                    <YAxis 
                                        stroke="hsl(var(--muted-foreground))" 
                                        fontSize={12} 
                                        tickLine={false} 
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value/1000}k`} 
                                    />
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                                        formatter={(value: unknown) => [`$${Number(value).toLocaleString(undefined, {maximumFractionDigits:0})}`]}
                                        labelFormatter={(label) => `Date: ${label}`}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    
                                    <Bar dataKey="collected" name="Collected Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} opacity={0.8} />
                                    <Bar dataKey="billed" name="Billed Amount" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                                    <Line type="monotone" dataKey="leakageDetected" name="AI Detected Leakage" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
