import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Network, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PolicyExplorerPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Payer Policy Explorer</h1>
                    <p className="text-muted-foreground">Navigate and query the Neo4j Knowledge Graph for payer rules.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search CPT or Diagnosis..." className="pl-8" />
                    </div>
                    <Button>Query Graph</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 flex flex-col min-h-[500px]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Network className="h-5 w-5" /> Knowledge Graph Visualization
                        </CardTitle>
                        <CardDescription>Interactive view of procedure requirements and payer policies.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 bg-muted/20 relative m-4 border rounded-xl overflow-hidden flex items-center justify-center">
                        {/* Minimal SVG mock of a graph representation */}
                        <svg width="100%" height="100%" className="absolute inset-0">
                            <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
                            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
                            <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
                            <line x1="20%" y1="70%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
                        </svg>

                        <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 border-blue-500/50 border text-blue-500 px-4 py-2 rounded-lg text-sm font-medium shadow-sm backdrop-blur-md">
                            BlueCross BlueShield
                        </div>

                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary/10 border-primary/50 border text-primary px-4 py-2 rounded-lg text-sm font-medium shadow-sm backdrop-blur-md z-10">
                            MRI Brain (70450)
                        </div>

                        <div className="absolute top-[30%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-amber-500/10 border-amber-500/50 border text-amber-500 px-4 py-2 rounded-lg text-sm font-medium shadow-sm backdrop-blur-md">
                            Requires Prior Auth
                        </div>

                        <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-green-500/10 border-green-500/50 border text-green-500 px-4 py-2 rounded-lg text-sm font-medium shadow-sm backdrop-blur-md">
                            Conservative Therapy (6 wks)
                        </div>

                        <div className="absolute top-[70%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 border-purple-500/50 border text-purple-500 px-4 py-2 rounded-lg text-sm font-medium shadow-sm backdrop-blur-md">
                            Diagnosis: M54.5
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Policy Extractor</CardTitle>
                            <CardDescription>AI interpreted rules for the active node</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Selected Node:</span>
                                    <Badge>MRI Brain (70450)</Badge>
                                </div>
                                <div className="text-sm text-muted-foreground pt-2 border-t">
                                    <span className="font-semibold text-foreground">Rule 14.2A: </span>
                                    Advanced imaging of the brain requires documentation of failed conservative therapy for a minimum of 6 weeks unless presenting with red flag symptoms (e.g., sudden onset severe headache, focal neurologic deficit).
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">View Source Document</Button>
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Related Concepts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted cursor-pointer transition-colors">
                                    <span>CT Head (70450)</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted cursor-pointer transition-colors">
                                    <span>MRA Brain (70544)</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted cursor-pointer transition-colors">
                                    <span>Headache (R51.9)</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
