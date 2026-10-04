import React from "react";
import HeadDashboard from "@/app/dashboard/headDashboard";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeadDashboard />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-6 pb-10 sm:px-6 sm:pt-10 lg:px-8">
        {children}
      </main>
    </div>
  );
}
