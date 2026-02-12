import { ReactNode } from "react";
import { Shield } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center gap-3 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <h1 className="font-mono text-lg font-bold tracking-tight text-foreground">
              CYBERGUARD<span className="text-primary">UI</span>
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground font-mono md:block">
              THREAT MONITORING ACTIVE
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6 md:px-6 md:py-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
