"use client";

import { UserCircle, Search, Bell, Settings, LogOut, ShieldAlert, HeartPulse, FileText, Menu, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { navigation } from "@/components/layout/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    const router = useRouter();
    
    const [persona, setPersona] = useState("Hospital Administrator");

    const switchPersona = (newPersona: string) => {
        setPersona(newPersona);
        toast.success(`Switched active persona to ${newPersona}`);
    };

    return (
        <header className="flex h-14 items-center gap-4 bg-background/95 px-4 lg:h-[60px] lg:px-6 backdrop-blur-xl z-40 sticky top-0">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0 flex flex-col pt-6">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <div className="px-6 pb-6">
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <Bot className="h-6 w-6 text-primary shrink-0" />
                                <span className="text-xl font-bold tracking-tight">HelixFlow<span className="text-primary">AI</span></span>
                            </Link>
                        </div>
                        <nav className="grid items-start px-4 text-sm font-medium space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 transition-all hover:text-primary hover:bg-muted text-muted-foreground font-medium"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            
            <div className="w-full flex-1">
                <form onSubmit={(e) => { e.preventDefault(); toast.success("Search executed."); }}>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search patients, claims, or policies..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => toast.success("No new notifications")}>
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>

                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-8 w-8 rounded-full overflow-hidden">
                        <UserCircle className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">admin@helixflow.ai</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {persona}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => switchPersona("Hospital Administrator")} className="cursor-pointer">
                                <ShieldAlert className="mr-2 h-4 w-4" />
                                <span>Hospital Administrator</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => switchPersona("Chief Medical Officer")} className="cursor-pointer">
                                <HeartPulse className="mr-2 h-4 w-4" />
                                <span>Chief Medical Officer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => switchPersona("Medical Biller")} className="cursor-pointer">
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Medical Biller</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => switchPersona("Sarah (VP of Revenue Cycle)")} className="cursor-pointer bg-primary/10 text-primary focus:bg-primary/20 focus:text-primary">
                                <UserCircle className="mr-2 h-4 w-4" />
                                <span>Demo: VP of Revenue Cycle</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            toast.success("Navigating to Profile Settings");
                            router.push("/dashboard/settings");
                        }} className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                            e.preventDefault(); 
                            toast.info("Logging out...");
                            setTimeout(() => {
                                window.location.href = "/";
                            }, 150);
                        }} className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
