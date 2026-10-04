import React from "react";
import HeadDashboard from "@/app/dashboard/headDashboard";

// narrow: lebar khusus halaman form supaya baris input tidak terlalu panjang
export default function AppShell({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <div className="min-h-screen lg:pl-60">
      <HeadDashboard />
      {/* pb ekstra di HP untuk menu bawah */}
      <main className={`mx-auto w-full px-4 pt-6 pb-24 sm:px-6 sm:pt-10 lg:px-10 lg:pb-12 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
        {children}
      </main>
    </div>
  );
}
