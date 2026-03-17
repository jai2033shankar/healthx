"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Key, Globe, Plus, Store } from "lucide-react";

export default function DevelopersPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Developer Portal</h1>
                    <p className="text-muted-foreground">Manage API keys, Webhooks, and App Marketplace submissions.</p>
                </div>
                <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} className="gap-2"><Plus className="h-4 w-4" /> Create App</Button>
            </div>

            <Tabs defaultValue="api-keys" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="api-keys" className="flex items-center gap-2"><Key className="h-4 w-4" /> API Keys</TabsTrigger>
                    <TabsTrigger value="webhooks" className="flex items-center gap-2"><Globe className="h-4 w-4" /> Webhooks</TabsTrigger>
                    <TabsTrigger value="marketplace" className="flex items-center gap-2"><Store className="h-4 w-4" /> App Marketplace</TabsTrigger>
                </TabsList>

                <TabsContent value="api-keys" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Production API Keys</CardTitle>
                            <CardDescription>Use these keys to authenticate API requests to the HelixFlow AI platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border rounded-md bg-muted/20 p-4 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-semibold text-sm block">Main Production Key</span>
                                        <span className="text-xs text-muted-foreground">Created: Oct 12, 2025 • Last used: 2 minutes ago</span>
                                    </div>
                                    <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Input readOnly type="password" value="sk_live_1234567890abcdef" className="font-mono bg-background" />
                                    <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                                    <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="destructive" size="sm">Revoke</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="webhooks" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Webhook Endpoints</CardTitle>
                            <CardDescription>Receive real-time HTTPS callbacks when events happen on HelixFlow AI.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border rounded-md bg-muted/20 p-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <span className="font-semibold text-sm">Primary Claims Listener</span>
                                        <div className="text-sm font-mono text-muted-foreground break-all">https://api.hospital-system.com/webhooks/claims</div>
                                        <div className="flex gap-2 mt-2">
                                            <Badge variant="outline" className="text-xs">claim.approved</Badge>
                                            <Badge variant="outline" className="text-xs">claim.denied</Badge>
                                            <Badge variant="outline" className="text-xs">auth.pending_review</Badge>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="outline" size="sm">Test Payload</Button>
                                        <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="ghost" size="sm">Edit</Button>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="outline" className="w-full border-dashed"><Plus className="h-4 w-4 mr-2" /> Add Endpoint</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="marketplace" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>App Directory</CardTitle>
                            <CardDescription>Discover or publish domain-focused agents to the HelixFlow Market.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="border rounded-lg p-4 flex flex-col gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-md bg-blue-500/10 text-blue-500 font-bold">CD</div>
                                    <h3 className="font-semibold">Clinical Denial Recovery Agent</h3>
                                    <p className="text-xs text-muted-foreground flex-1">Auto-generates appeal letters using NLP by scanning patient discharge summaries.</p>
                                    <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="secondary" size="sm" className="mt-2 w-full">Install</Button>
                                </div>
                                <div className="border rounded-lg p-4 flex flex-col gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-md bg-purple-500/10 text-purple-500 font-bold">SM</div>
                                    <h3 className="font-semibold">Smart Coding Mapper</h3>
                                    <p className="text-xs text-muted-foreground flex-1">Maps unstructured clinical notes to exact ICD-10 and CPT-4 codes automatically.</p>
                                    <Button onClick={() => toast.success("Action processed via HelixFlow AI.")} variant="secondary" size="sm" className="mt-2 w-full">Install</Button>
                                </div>
                                <div className="border rounded-lg border-dashed bg-muted/20 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors min-h-[160px]">
                                    <Plus className="h-8 w-8 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">Publish Custom Agent</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}
