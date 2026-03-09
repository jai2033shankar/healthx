"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search, Link as LinkIcon, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const integrationsList = [
    { id: "epic", name: "Epic EHR", category: "EHR", status: "connected", type: "FHIR R4", img: "Epic" },
    { id: "cerner", name: "Oracle Cerner", category: "EHR", status: "disconnected", type: "FHIR R4", img: "Cerner" },
    { id: "athena", name: "Athenahealth", category: "EHR", status: "disconnected", type: "API", img: "Athena" },
    { id: "bcbs", name: "BlueCross BlueShield", category: "Payer", status: "connected", type: "EDI/X12 278", img: "BCBS" },
    { id: "uhc", name: "UnitedHealthcare", category: "Payer", status: "connected", type: "EDI/X12 278", img: "UHC" },
    { id: "availity", name: "Availity Clearinghouse", category: "Clearinghouse", status: "connected", type: "API", img: "Availity" },
    { id: "stripe", name: "Stripe", category: "Billing", status: "disconnected", type: "API", img: "Stripe" }
];

export default function IntegrationsPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Integrations Hub</h1>
                    <p className="text-muted-foreground">Manage connections to EHRs, Payers, and 3rd-party services.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search integrations..." className="pl-8" />
                    </div>
                    <Button onClick={() => toast.success("Action processed via HelixFlow AI.")}>Add Custom API</Button>
                </div>
            </div>

            <div className="flex gap-2 pb-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-muted">All (7)</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">EHRs (3)</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">Payers (2)</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">Clearinghouse (1)</Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {integrationsList.map((integration) => (
                    <Card key={integration.id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base">{integration.name}</CardTitle>
                                <CardDescription className="text-xs">{integration.category} • {integration.type}</CardDescription>
                            </div>
                            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted font-bold text-xs text-muted-foreground">
                                {integration.img.substring(0, 2).toUpperCase()}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pt-4 pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Switch id={`sync-${integration.id}`} checked={integration.status === "connected"} />
                                    <label htmlFor={`sync-${integration.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {integration.status === "connected" ? "Sync Active" : "Disabled"}
                                    </label>
                                </div>
                            </div>

                            {integration.status === "connected" && (
                                <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div> Last synced: 2m ago
                                </div>
                            )}
                            {integration.status === "disconnected" && (
                                <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3 text-yellow-500" /> Connect via OAuth / API Key
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pt-2 border-t bg-muted/20">
                            <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="ghost" size="sm" className="w-full justify-between">
                                Settings <LinkIcon className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
