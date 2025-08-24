import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col text-neutral-100 antiliased bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.2),transparent_70%)]" />

        <header className="border-b border-neutral-800 relative z-10">
          <nav className="mx-auto max-w-5xl p-4 flex items-center gap-6">
            <Link href="/" className="font-semibold">
              VibeHub
            </Link>
            <Link href="/feed" className="hover:underline">
              Feed
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl p-4 flex-1 flex items-center justify-center relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
