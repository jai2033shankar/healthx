import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bed, Stethoscope, ActivitySquare } from "lucide-react";

export default function HospitalTwinPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hospital Operations Twin</h1>
                <p className="text-muted-foreground">Digital twin simulation for resource utilization and capacity planning.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ED Wait Time</CardTitle>
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42 mins</div>
                        <p className="text-xs text-muted-foreground">Predicted to rise in 2 hours</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ICU Capacity</CardTitle>
                        <Bed className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">2 beds remaining</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">OR Utilization</CardTitle>
                        <Stethoscope className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78%</div>
                        <p className="text-xs text-muted-foreground">Optimal efficiency</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Staffing Optimization</CardTitle>
                        <ActivitySquare className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.2x</div>
                        <p className="text-xs text-muted-foreground">Shift surge recommended</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Ward Capacity Prediction</CardTitle>
                        <CardDescription>Simulated capacity over the next 24 hours.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Medical/Surgical</span>
                                <span className="text-muted-foreground">85% full</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[85%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Cardiology</span>
                                <span className="text-muted-foreground">94% full</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-[94%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Neurology</span>
                                <span className="text-muted-foreground">62% full</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[62%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Pediatrics</span>
                                <span className="text-muted-foreground">45% full</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[45%]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>AI Operational Recommendations</CardTitle>
                        <CardDescription>Actionable insights from the simulation engine.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-3 rounded-lg border bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400">
                                <ActivitySquare className="h-5 w-5 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-sm">ICU Bottleneck Predicted</h4>
                                    <p className="text-sm mt-1 opacity-90">Based on current OR scheduled cases and ED admission rates, ICU capacity will be exceeded by 14:00. Recommendation: Expedite 3 pending step-down transfers.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-3 rounded-lg border bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400">
                                <Users className="h-5 w-5 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-sm">ED Nursing Surge Required</h4>
                                    <p className="text-sm mt-1 opacity-90">Inbound ambulance volume indicates a 40% surge in the next hour. Recommendation: Reallocate 2 float pool nurses to ED Triaging.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-3 rounded-lg border bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400">
                                <Bed className="h-5 w-5 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-sm">Discharge Optimization</h4>
                                    <p className="text-sm mt-1 opacity-90">12 patients are pending discharge orders. AI has pre-drafted summaries. Physician review can save 42 hours of bed availability.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
