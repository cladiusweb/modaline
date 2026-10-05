import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartSheet } from "@/components/cart/CartSheet";
import { QuickViewModal } from "@/components/product/QuickViewModal";

export const metadata: Metadata = {
  title: "MODALINE | Kadın Modasında Sessiz Lüks & Zamansız Tasarımlar",
  description: "Modern, minimalist ve yüksek kaliteli kadın giyim koleksiyonları. Yeni sezon elbiseler, ipek gömlekler, yün kabanlar ve blazer ceketler.",
  keywords: ["kadın giyim", "lüks giyim", "elbise", "blazer", "sessiz lüks", "moda", "modaline"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <CartSheet />
        <QuickViewModal />
        <MobileBottomNav />
      </body>
    </html>
  );
}
