"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ShieldCheck,
    FileText,
    DollarSign,
    Network,
    Building2,
    Bot,
    Blocks,
    Settings2,
    Code2,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Authorizations", href: "/dashboard/authorizations", icon: ShieldCheck },
    { name: "Claims Intelligence", href: "/dashboard/claims", icon: FileText },
    { name: "Revenue Cycle", href: "/dashboard/revenue", icon: DollarSign },
    { name: "Policy Explorer", href: "/dashboard/policy", icon: Network },
    { name: "Hospital Twin", href: "/dashboard/hospital-twin", icon: Building2 },
    { name: "AI Copilot", href: "/dashboard/copilot", icon: Bot },
    { name: "Rules Engine", href: "/dashboard/rules", icon: Settings2 },
    { name: "Integrations", href: "/dashboard/integrations", icon: Blocks },
    { name: "Developer Portal", href: "/dashboard/developers", icon: Code2 },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={cn("relative flex h-full flex-col bg-background transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
            <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setIsCollapsed(!isCollapsed)} 
                className="absolute -right-4 top-5 h-8 w-8 rounded-full shadow-md z-50 flex items-center justify-center bg-background hover:bg-accent text-foreground"
            >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
            
            <div className={cn("flex h-14 items-center lg:h-[60px]", isCollapsed ? "justify-center px-0" : "px-4 lg:px-6")}>
                <Link href="/" className={cn("flex items-center gap-2 font-semibold", isCollapsed && "justify-center")}>
                    <Bot className="h-6 w-6 text-primary shrink-0" />
                    {!isCollapsed && <span className="text-xl font-bold tracking-tight">HelixFlow<span className="text-primary">AI</span></span>}
                </Link>
            </div>
            
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                    <TooltipProvider delay={0}>
                        {navigation.map((item) => {
                            const isActive = item.href === '/dashboard' 
                                ? pathname === '/dashboard' 
                                : pathname === item.href || pathname.startsWith(`${item.href}/`);
                            
                            const linkContent = (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center rounded-lg px-3 py-2.5 transition-all relative group",
                                        isActive ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary rounded-l-none pl-2" : "text-muted-foreground hover:text-primary hover:bg-muted/30",
                                        isCollapsed ? "justify-center w-full" : "gap-3"
                                    )}
                                >
                                    <item.icon className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
                                    {!isCollapsed && <span>{item.name}</span>}
                                </Link>
                            );

                            if (isCollapsed) {
                                return (
                                    <Tooltip key={item.name}>
                                        <TooltipTrigger className="flex w-full">
                                            {linkContent}
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="font-medium">
                                            {item.name}
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            }

                            return linkContent;
                        })}
                    </TooltipProvider>
                </nav>
            </div>
        </div>
    );
}
