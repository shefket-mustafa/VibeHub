import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import getUserFromCookies from "./lib/getUserFromCookieIdentifier";

export const metadata: Metadata = {
  title: "VibeHub",
  icons: { icon: "/icon.png" }, 
 
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const user = await getUserFromCookies();

  
  return (
    <html lang="en">
      
      <body className="min-h-dvh flex flex-col text-neutral-100 antiliased bg-neutral-950">
        <div className="fixed inset-0 bg-gradient-to-b from-neutral-950 to-neutral-900 -z-10" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.2),transparent_70%)] -z-10" />

        <Navbar user ={user}/>

        <main className=" p-4 flex-1 flex  relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
