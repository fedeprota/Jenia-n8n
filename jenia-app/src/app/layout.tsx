import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/hooks/useSidebar";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Jenia — AI Patent Intelligence",
  description:
    "AI-powered patent research, competitor intelligence, and similarity analysis platform for R&D researchers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <SidebarProvider>
          <AppShell>{children}</AppShell>
        </SidebarProvider>
      </body>
    </html>
  );
}
