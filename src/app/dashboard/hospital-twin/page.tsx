"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, ThermometerSun, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface TwinData {
    hour: string;
    predictedWaitTime: number;
    predictedIcuCapacity: number;
    surgeRisk: boolean;
}

export default function HospitalTwinPage() {
    const [data, setData] = useState<TwinData[]>([]);
    const [loading, setLoading] = useState(true);
    const [recommendation, setRecommendation] = useState("");

    useEffect(() => {
        fetch('/api/predict?type=hospital-twin')
            .then(res => res.json())
            .then(json => {
                setData(json.data);
                setRecommendation(json.recommendation);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const hasSurge = data.some(d => d.surgeRisk);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hospital Operations Twin</h1>
                <p className="text-muted-foreground">Real-time digital simulation and continuous forecasting of hospital flow.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Activity className="animate-spin text-primary h-8 w-8" /></div>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                                {hasSurge ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <CheckCircle2 className="h-4 w-4 text-primary" />}
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${hasSurge ? 'text-destructive' : 'text-primary'}`}>
                                    {hasSurge ? 'Surge Risk Detected' : 'Optimal Flow'}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">AI predictive model active</p>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow md:col-span-2 bg-muted/40 backdrop-blur-sm border-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <ThermometerSun className="h-4 w-4 text-orange-500" />
                                    AI Operational Recommendation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm md:text-base font-medium">{recommendation}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle>ED Wait Time Forecast (Next 24 Hrs)</CardTitle>
                                <CardDescription>Simulated wait times using recent arrival velocity.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                                        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}m`} />
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        />
                                        <ReferenceLine y={60} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Surge Threshold (60m)', fill: 'hsl(var(--destructive))', fontSize: 12 }} />
                                        <Area type="monotone" dataKey="predictedWaitTime" name="Wait Time (mins)" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorWait)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle>ICU Capacity Forecast (%)</CardTitle>
                                <CardDescription>Predicted bed utilization based on current floor acuity.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorIcu" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--orange-500))" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="hsl(var(--orange-500))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                                        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        />
                                        <Area type="monotone" dataKey="predictedIcuCapacity" name="ICU Cap (%)" stroke="hsl(var(--orange-500))" fillOpacity={1} fill="url(#colorIcu)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
