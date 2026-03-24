"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const mockClaims = [
    { id: "CLM-9021", patient: "John Doe", amount: "$4,500.00", status: "submitted", risk: "high", prediction: 85, issue: "Missing operative report" },
    { id: "CLM-9022", patient: "Alice Smith", amount: "$1,200.00", status: "paid", risk: "low", prediction: 5, issue: "None" },
    { id: "CLM-9023", patient: "Robert Brown", amount: "$8,900.00", status: "denied", risk: "high", prediction: 98, issue: "Diagnosis does not support procedure" },
    { id: "CLM-9024", patient: "Maria Garcia", amount: "$350.00", status: "submitted", risk: "medium", prediction: 45, issue: "Potential coding modifier error" },
];

export default function ClaimsPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Claims Intelligence</h1>
                    <p className="text-muted-foreground">Proactively identify and resolve high-risk claims before denial.</p>
                </div>
                <Button onClick={() => toast.success("Action processed via HelixFlow AI.")}>Run Batch Analysis</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clear for Submission</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">842</div>
                        <p className="text-xs text-muted-foreground">Low denial risk</p>
                    </CardContent>
                </Card>
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">124</div>
                        <p className="text-xs text-muted-foreground">Medium denial risk</p>
                    </CardContent>
                </Card>
                <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Action Required</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">38</div>
                        <p className="text-xs text-muted-foreground">High denial probability</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-md hover:shadow-lg transition-all border-border/50 bg-card rounded-xl overflow-hidden">
                <CardHeader>
                    <CardTitle>Claims at Risk</CardTitle>
                    <CardDescription>AI-identified claims requiring manual intervention prior to submission.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Claim ID</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Denial Risk</TableHead>
                                <TableHead>AI Identified Issue</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockClaims.map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell className="font-medium">{claim.id}</TableCell>
                                    <TableCell>{claim.patient}</TableCell>
                                    <TableCell>{claim.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {claim.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-secondary rounded-full h-2 max-w-[80px]">
                                                <div
                                                    className={`h-2 rounded-full ${claim.prediction >= 80 ? 'bg-red-500' : claim.prediction >= 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                    style={{ width: `${claim.prediction}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium">{claim.prediction}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[250px] truncate text-muted-foreground">
                                        {claim.issue}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="secondary" size="sm">Fix Issue</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
