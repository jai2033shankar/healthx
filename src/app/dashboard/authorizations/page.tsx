import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data (would come from DB/API)
const mockAuthorizations = [
    { id: "PA-1029", patient: "Emma Thompson", procedure: "MRI Brain (70450)", diagnosis: "J01.90", status: "pending", aiProbability: 92, recommendation: "High probability of approval. Documentation complete." },
    { id: "PA-1030", patient: "Michael Chen", procedure: "Knee Replacement (27447)", diagnosis: "M17.11", status: "pending", aiProbability: 45, recommendation: "Missing conservative therapy documentation." },
    { id: "PA-1031", patient: "Sarah Miller", procedure: "CT Abdomen (74150)", diagnosis: "R10.9", status: "approved", aiProbability: 98, recommendation: "Criteria met automatically via FastTrack." },
    { id: "PA-1032", patient: "David Johnson", procedure: "Spinal Fusion (22612)", diagnosis: "M54.5", status: "pending", aiProbability: 76, recommendation: "Requires peer-to-peer review." },
];

export default function AuthorizationsPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Authorization Command Center</h1>
                    <p className="text-muted-foreground">Manage prior authorizations with AI-powered predictive insights.</p>
                </div>
                <Button>New Request</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                    <CardDescription>Review and action pending prior authorization requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Req ID</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Procedure</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>AI Probability</TableHead>
                                <TableHead>Recommendation</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockAuthorizations.map((auth) => (
                                <TableRow key={auth.id}>
                                    <TableCell className="font-medium">{auth.id}</TableCell>
                                    <TableCell>{auth.patient}</TableCell>
                                    <TableCell>{auth.procedure}</TableCell>
                                    <TableCell>
                                        <Badge variant={auth.status === "approved" ? "default" : "secondary"}>
                                            {auth.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-secondary rounded-full h-2 max-w-[80px]">
                                                <div
                                                    className={`h-2 rounded-full ${auth.aiProbability >= 80 ? 'bg-green-500' : auth.aiProbability >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${auth.aiProbability}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium">{auth.aiProbability}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[250px] truncate text-muted-foreground">
                                        {auth.recommendation}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Review</Button>
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
