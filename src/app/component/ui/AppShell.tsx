import React from "react";
import HeadDashboard from "@/app/dashboard/headDashboard";

// narrow: lebar khusus halaman form supaya baris input tidak terlalu panjang
export default function AppShell({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeadDashboard />
      <main className={`mx-auto w-full flex-1 px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
        {children}
      </main>
    </div>
  );
}
