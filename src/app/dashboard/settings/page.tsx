"use client";

import { UserCircle, Shield, Key, Bell, LogOut, ArrowRight, ShieldAlert, HeartPulse, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SettingsPage() {

    const handleLogout = () => {
        toast.info("Logging out securely...");
        setTimeout(() => {
            window.location.href = "/";
        }, 300);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Profile updated successfully.");
    };

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your profile, security preferences, and active persona.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Profile Card */}
                <Card className="col-span-2 shadow-lg shadow-primary/5 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <UserCircle className="h-5 w-5 text-primary" /> Profile Information
                        </CardTitle>
                        <CardDescription>
                            Update your personal details and contact information.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSave}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="Sarah" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Smith" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email</Label>
                                <Input id="email" type="email" defaultValue="admin@helixflow.ai" disabled />
                                <p className="text-[0.8rem] text-muted-foreground">Emails must be verified by the organizational root administrator.</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Active Persona</Label>
                                <div className="flex gap-2 mt-1 flex-wrap">
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20"><ShieldAlert className="w-3 h-3 mr-1" /> Administrator</Badge>
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20"><HeartPulse className="w-3 h-3 mr-1" /> CMO</Badge>
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20"><FileText className="w-3 h-3 mr-1" /> Biller</Badge>
                                    <Badge variant="default" className="bg-primary text-primary-foreground"><UserCircle className="w-3 h-3 mr-1" /> VP Rev Cycle (Demo)</Badge>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Save Changes</Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Security and Logout Card */}
                <div className="space-y-6">
                    <Card className="shadow-lg shadow-destructive/5 border-border/50">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2 text-destructive">
                                <Shield className="h-5 w-5" /> Account Security
                            </CardTitle>
                            <CardDescription>
                                Manage your active session constraints.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-4 rounded-lg border p-4 bg-card/60 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">MFA Authentication</Label>
                                        <p className="text-sm text-muted-foreground">Required for HIPAA compliance.</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">Enabled</Badge>
                                </div>
                                <div className="pt-2 border-t flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium">Google SSO Identity</Label>
                                        <p className="text-xs text-muted-foreground">Connected to primary device authentication.</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 text-xs font-semibold hover:bg-muted">Manage Access</Button>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t">
                                <h4 className="text-sm font-medium mb-2">Session Management</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Sign out of your active HelixFlow workspace environment. This will clear local memory states.
                                </p>
                                <Button variant="destructive" className="w-full font-bold shadow-md shadow-destructive/20" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" /> Terminate Session (Log Out)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
