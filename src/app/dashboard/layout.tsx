import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TourProvider } from "@/components/tour-provider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <div className="hidden bg-background md:block">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                    <TourProvider />
                </main>
            </div>
        </div>
    );
}
