// app/layout.tsx
import { Providers } from "./provide";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invite You - Digital Event Invitation ",
  description: "Create your own digital invitaion for your event. For Marriage, Birthday, etc.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='h-full w-full'>
      <body className="h-full w-full">
        
        <Providers>
          {children}
        </Providers>
{/* 
        <script src="http://js.nicedit.com/nicEdit-latest.js" type="text/javascript"></script>
<script type="text/javascript">bkLib.onDomLoaded(nicEditors.allTextAreas);</script> */}
      </body>
    </html>
  );
}