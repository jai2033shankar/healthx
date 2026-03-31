"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, DollarSign, Wallet, CreditCard, ShieldCheck, Building, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const revenueSources = [
  { name: 'Dental Insurance', value: 450000, color: '#3B82F6' },
  { name: 'Medical Cross-Coding', value: 120000, color: '#8B5CF6' },
  { name: 'Patient Payments (CC/ACH)', value: 210000, color: '#10B981' },
  { name: 'Membership Plans', value: 85000, color: '#F59E0B' },
  { name: 'Financing Partners', value: 135000, color: '#EC4899' },
];

const moneyJourney = [
  { stage: 'Treatment Planned', amount: 1500000 },
  { stage: 'Expected Insurance', amount: 800000 },
  { stage: 'Payments Received', amount: 950000 },
  { stage: 'Patient Balance', amount: 250000 },
];

export default function UnifiedRCMPage() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Unified RCM Platform</h1>
                <p className="text-muted-foreground">Single pane of glass for the complete financial journey across all clinic operations.</p>
            </div>

            {/* Money Journey Stage Cards */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
                {[
                    { title: "Treatment Planned", amount: "$1.5M", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { title: "Expected Insurance", amount: "$800K", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
                    { title: "Payments Received", amount: "$950K", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
                    { title: "Patient Balance", amount: "$250K", icon: CreditCard, color: "text-amber-500", bg: "bg-amber-500/10" }
                ].map((item, index) => (
                    <div key={item.title} className="flex-1 flex items-center gap-2">
                        <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden flex-1 relative overflow-visible">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                                        <item.icon className={`h-5 w-5 ${item.color}`} />
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">{item.title}</p>
                                <div className="text-2xl lg:text-3xl font-bold tracking-tight">{item.amount}</div>
                            </CardContent>
                        </Card>
                        {index < 3 && <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />}
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Revenue Mix */}
                <Card className="shadow-md border-border/50 bg-card rounded-xl overflow-hidden lg:col-span-1 py-4">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold">Omni-Channel Revenue Mix</CardTitle>
                        <CardDescription>Unifying all revenue streams in one platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueSources}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={95}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {revenueSources.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-3 px-2">
                            {revenueSources.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                                        <span className="text-muted-foreground font-medium">{item.name}</span>
                                    </div>
                                    <div className="font-bold">${item.value.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Journey Conversion */}
                <Card className="shadow-md border-border/50 bg-card rounded-xl overflow-hidden lg:col-span-2 py-4">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold">End-to-End Financial Pipeline</CardTitle>
                        <CardDescription>From treatment plan to complete reconciliation.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={moneyJourney} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                                <YAxis dataKey="stage" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={120} />
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    cursor={{fill: 'hsl(var(--muted)/0.4)'}}
                                    formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, 'Volume']}
                                />
                                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={40}>
                                    {moneyJourney.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : index === 1 ? '#8B5CF6' : index === 2 ? '#10B981' : '#F59E0B'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Platform Integration Status */}
            <div className="grid md:grid-cols-2 gap-6">
                 <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold">PMS Ecosystem Sync</CardTitle>
                        <Building className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 mt-2">
                            {['Eaglesoft', 'Fuse', 'Dolphin'].map((pms) => (
                                <div key={pms} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm font-medium">{pms} Integration</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">Real-time Bi-directional</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-emerald-500/5 border-emerald-500/20 rounded-xl overflow-hidden py-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Automated Reconciliation</CardTitle>
                        <Activity className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">98.4%</div>
                        <p className="text-xs text-muted-foreground mt-1 mb-4">Transactions automatically matched across ledgers.</p>
                        <div className="w-full bg-emerald-100 dark:bg-emerald-950 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[98.4%]" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
