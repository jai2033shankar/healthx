"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, DollarSign, Activity } from "lucide-react";

const revenueData = [
    { name: "Jan", recognized: 4000, leakage: 2400 },
    { name: "Feb", recognized: 3000, leakage: 1398 },
    { name: "Mar", recognized: 2000, leakage: 9800 },
    { name: "Apr", recognized: 2780, leakage: 3908 },
    { name: "May", recognized: 1890, leakage: 4800 },
    { name: "Jun", recognized: 2390, leakage: 3800 },
];

const collectionData = [
    { name: "0-30 days", value: 400 },
    { name: "31-60 days", value: 300 },
    { name: "61-90 days", value: 200 },
    { name: "90+ days", value: 100 },
];

export default function RevenueCyclePage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Revenue Cycle</h1>
                <p className="text-muted-foreground">Monitor financial performance and identify revenue leakage.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue (MTD)</CardTitle>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$4.2M</div>
                        <p className="flex items-center text-xs text-green-500">
                            <ArrowUpRight className="mr-1 h-3 w-3" /> +12.5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Leakage</CardTitle>
                        <Activity className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$124K</div>
                        <p className="flex items-center text-xs text-green-500">
                            <ArrowDownRight className="mr-1 h-3 w-3" /> -4.3% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Days in A/R</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">34 Days</div>
                        <p className="flex items-center text-xs text-muted-foreground">
                            Industry avg: 42 Days
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">First-Pass Yield</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">96.2%</div>
                        <p className="flex items-center text-xs text-green-500">
                            <ArrowUpRight className="mr-1 h-3 w-3" /> +1.2% overall improvement
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue vs Leakage Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip wrapperClassName="dark:bg-zinc-900 border-zinc-800" />
                                    <Area type="monotone" dataKey="recognized" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Recognized" />
                                    <Area type="monotone" dataKey="leakage" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} name="Leakage" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Accounts Receivable Aging</CardTitle>
                        <CardDescription>Value of outstanding claims by age.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={collectionData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip wrapperClassName="dark:bg-zinc-900 border-zinc-800" />
                                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
