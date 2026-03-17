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
    Code2
} from "lucide-react";

const navigation = [
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

    return (
        <div className="flex h-full w-64 flex-col border-r bg-muted/40 backdrop-blur-xl">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Bot className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">HelixFlow<span className="text-primary">AI</span></span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = item.href === '/dashboard' 
                            ? pathname === '/dashboard' 
                            : pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    isActive ? "bg-muted text-primary shadow-sm" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
