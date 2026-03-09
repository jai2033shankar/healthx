import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, ShieldCheck, FileText, Activity, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">

      {/* Header */}
      <header className="px-6 h-16 flex items-center justify-between border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Bot className="h-6 w-6 text-primary" />
          <span>HelixFlow<span className="text-primary">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden md:block">Login</Link>
          <Link href="/login">
            <Button className="rounded-full shadow-lg hover:shadow-primary/25 transition-all">Book Demo</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative pt-24 pb-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 backdrop-blur-sm text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            HelixFlow AI Platform 2.0 is Live
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            The Operating System for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Healthcare Administration
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Eliminate administrative waste, predict claim denials before they happen, and auto-navigate payer policies using advanced multi-agent AI and knowledge graphs.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Access Platform Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-semibold bg-background/50 backdrop-blur-md hover:bg-muted">
                Explore Documentation
              </Button>
            </Link>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-24 px-6 border-t bg-muted/10 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">A unified intelligence layer.</h2>
              <p className="text-muted-foreground">Purpose-built autonomous agents to solve the $400B administrative crisis.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-start p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Prior Auths</h3>
                <p className="text-muted-foreground">NLP engines scan clinical notes against payer rules to predict approval probability and assemble submission packages instantly.</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Claim Validation AI</h3>
                <p className="text-muted-foreground">Pre-submission gradient-boosted trees detect coding errors and modifier mismatches to prevent denials proactively.</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6">
                  <Activity className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Operations Twin</h3>
                <p className="text-muted-foreground">Simulate hospital capacity precisely. Predict ICU bottlenecks and ED surges to optimize staff allocation natively.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to see it in action?</h2>
            <p className="text-lg text-muted-foreground mb-8">Access the fully-featured interactive demo environment populated with synthetic clinical and financial data.</p>
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-2xl hover:scale-105 transition-all">
                Login to Interactive Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 HelixFlow AI Corporation. All rights reserved.
      </footer>
    </div>
  );
}
