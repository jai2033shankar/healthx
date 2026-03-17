"use client";

import { UserCircle, Search, Bell, Settings, LogOut, ShieldAlert, HeartPulse, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
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

export function Header() {

    const [persona, setPersona] = useState("Hospital Administrator");

    const switchPersona = (newPersona: string) => {
        setPersona(newPersona);
        toast.success(`Switched active persona to ${newPersona}`);
    };

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 backdrop-blur-xl">
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
                <ThemeToggle />
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => toast.success("No new notifications")}>
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-8 w-8 rounded-full overflow-hidden">
                        <UserCircle className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">admin@helixflow.ai</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {persona}
                                </p>
                            </div>
                        </DropdownMenuLabel>
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
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.success("Settings opened.")} className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground p-0">
                            <Link href="/login" onClick={() => toast.info("Logging out...")} className="flex w-full items-center px-2 py-1.5 focus:outline-none">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
