"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, CreditCard, TrendingUp, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const propensityScores = [
  { name: 'High (80-100)', value: 45, color: '#10B981' },
  { name: 'Medium (50-79)', value: 35, color: '#F59E0B' },
  { name: 'Low (<50)', value: 20, color: '#EF4444' },
];

const recommendationData = [
  { day: 'Mon', enrolled: 12 },
  { day: 'Tue', enrolled: 19 },
  { day: 'Wed', enrolled: 15 },
  { day: 'Thu', enrolled: 22 },
  { day: 'Fri', enrolled: 28 },
  { day: 'Sat', enrolled: 8 },
  { day: 'Sun', enrolled: 4 },
];

export default function PropensityToPayPage() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Propensity-to-Pay Engine</h1>
                <p className="text-muted-foreground">AI-driven patient financial scoring and next-best-action recommendations.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Target className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">Avg Propensity Score</p>
                        <div className="text-3xl font-bold tracking-tight">72.4</div>
                    </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-purple-500" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">Financing Enrolled</p>
                        <div className="text-3xl font-bold tracking-tight">184</div>
                    </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-amber-500" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">Card On File Collected</p>
                        <div className="text-3xl font-bold tracking-tight">62%</div>
                    </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">Collection Lift (30d)</p>
                        <div className="text-3xl font-bold tracking-tight">+14.2%</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="shadow-md border-border/50 bg-card rounded-xl overflow-hidden py-4">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold">Patient Score Distribution</CardTitle>
                        <CardDescription>Based on historical payment behavior and soft credit insights.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={propensityScores}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={95}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {propensityScores.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        formatter={(value: unknown) => [`${value}%`, 'Patients']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-3 px-2">
                            {propensityScores.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                                        <span className="text-muted-foreground font-medium">{item.name}</span>
                                    </div>
                                    <div className="font-bold">{item.value}%</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-border/50 bg-card rounded-xl overflow-hidden md:col-span-2 py-4">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold">Financing & Payment Plan Enrollments</CardTitle>
                        <CardDescription>Action outcomes generated by the Next-Best-Action recommendation engine.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={recommendationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                />
                                <Area type="monotone" dataKey="enrolled" name="New Enrollments" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorEnrolled)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-md border-border/50 bg-card rounded-xl overflow-hidden py-4">
                <CardHeader>
                    <CardTitle className="text-sm font-bold">Next-Best-Action Engine (Live Feed)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { patient: "John D.", score: 42, recommendation: "Offer CareCredit & 12mo Plan", status: "High Risk" },
                            { patient: "Sarah M.", score: 85, recommendation: "Request Pay-in-Full via Text", status: "Low Risk" },
                            { patient: "Michael T.", score: 61, recommendation: "Request Card-on-File", status: "Medium Risk" },
                            { patient: "Elena R.", score: 38, recommendation: "Offer In-House Membership Plan", status: "High Risk" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                        item.score >= 80 ? 'bg-green-500/10 text-green-500' :
                                        item.score >= 50 ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                        {item.score}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{item.patient}</p>
                                        <p className="text-xs text-muted-foreground">{item.status}</p>
                                    </div>
                                </div>
                                <div className="bg-background border border-border/50 px-4 py-2 rounded-lg text-xs font-semibold text-primary flex items-center gap-2">
                                    <Sparkles className="h-3 w-3" />
                                    {item.recommendation}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
