"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Plus, Users, Search, Mail, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { name: 'Jan', value: 200 },
  { name: 'Feb', value: 1500 },
  { name: 'Mar', value: 800 },
  { name: 'Apr', value: 100 },
  { name: 'May', value: 100 },
  { name: 'Jun', value: 150 },
  { name: 'Jul', value: 120 },
  { name: 'Aug', value: 110 },
  { name: 'Sep', value: 130 },
  { name: 'Oct', value: 150 },
  { name: 'Nov', value: 120 },
];

const pipelineData = [
  { name: 'Qualified', value: 26, color: '#3B82F6' },
  { name: 'Proposal', value: 13, color: '#8B5CF6' },
  { name: 'Negotiation', value: 1, color: '#EC4899' },
  { name: 'Closed Won', value: 7, color: '#10B981' },
];

export default function DashboardOverview() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in-50 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">Overview</h1>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Welcome back, Admin</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-card hover:bg-muted text-foreground border-border/50 shadow-sm rounded-lg">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-lg font-medium border-0">
                        <Plus className="mr-2 h-4 w-4" /> New Intelligence
                    </Button>
                </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Pending Authorizations Component */}
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex h-6 items-center rounded-full bg-border/50 px-3 text-xs font-semibold text-blue-400">
                                +20%
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">Pending Auths</p>
                        <div className="text-3xl font-bold tracking-tight">142</div>
                    </CardContent>
                </Card>
                
                {/* Claims Intelligence Component */}
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Search className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex h-6 items-center rounded-full bg-border/50 px-3 text-xs font-semibold text-purple-400">
                                +12%
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">Claims Intelligence</p>
                        <div className="text-3xl font-bold tracking-tight">1,209</div>
                    </CardContent>
                </Card>

                {/* Revenue Leakage Prevented */}
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <Mail className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex h-6 items-center rounded-full bg-border/50 px-3 text-xs font-semibold text-amber-500">
                                +5%
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">Revenue Protected</p>
                        <div className="text-3xl font-bold tracking-tight">42K</div>
                    </CardContent>
                </Card>

                {/* System Health */}
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden py-2">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex h-6 items-center rounded-full bg-border/50 px-3 text-xs font-semibold text-green-400">
                                +4%
                            </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1 uppercase">System Health</p>
                        <div className="text-3xl font-bold tracking-tight">99%</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 shadow-md border-border/50 bg-card rounded-xl overflow-hidden py-4">
                    <CardHeader className="flex flex-row items-center justify-between pb-8">
                        <div>
                            <CardTitle className="text-sm font-bold mb-1">Revenue Growth</CardTitle>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Platform Performance</p>
                        </div>
                        <div className="flex h-6 items-center rounded-full bg-green-500/10 px-3 text-xs font-semibold text-green-400 border border-green-500/20">
                            +23.4%
                        </div>
                    </CardHeader>
                    <CardContent className="pl-0 pb-0">
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#8B5CF6" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorRevenue)" 
                                        dot={{ r: 6, strokeWidth: 3, fill: '#0B0E14', stroke: '#8B5CF6' }}
                                        activeDot={{ r: 8, strokeWidth: 0, fill: '#8B5CF6' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-border/50 bg-card rounded-xl overflow-hidden py-4">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold">Pipeline Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pipelineData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pipelineData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6 space-y-4 px-2">
                            {pipelineData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-muted-foreground font-medium">{item.name}</span>
                                    </div>
                                    <div className="font-bold">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="mt-2">
               <Card className="shadow-md border-border/50 bg-card rounded-xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-bold">Recent Intelligence</CardTitle>
                        <p className="text-xs text-primary font-bold cursor-pointer tracking-wider uppercase hover:text-primary/80 transition-colors">Full History</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground font-medium">End of intelligence feed.</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
