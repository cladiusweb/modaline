"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ShoppingBag, User, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function MobileBottomNav() {
  const pathname = usePathname();
  const openCart = useCartStore((state) => state.openCart);
  const itemCount = useCartStore((state) => state.getItemCount());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: "Ana Sayfa", href: "/", icon: Home, isActive: pathname === "/" },
    { label: "Yeni", href: "/collections/yeni-gelenler", icon: Sparkles, isActive: pathname.includes("yeni-gelenler") },
    { label: "Keşfet", href: "/collections/tum-urunler", icon: Compass, isActive: pathname.includes("collections") && !pathname.includes("yeni-gelenler") },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 z-30 pt-2 pb-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around max-w-md mx-auto text-neutral-500">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider transition-all duration-200 active:scale-95 relative py-1 ${
                item.isActive ? "text-neutral-950 font-semibold" : "hover:text-neutral-900"
              }`}
            >
              <Icon size={18} strokeWidth={item.isActive ? 2.2 : 1.5} />
              <span>{item.label}</span>
              {item.isActive && (
                <span className="absolute bottom-0 w-1 h-1 rounded-full bg-neutral-950" />
              )}
            </Link>
          );
        })}

        {/* Sepet Butonu */}
        <button
          onClick={openCart}
          className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider relative hover:text-neutral-900 transition-all duration-200 active:scale-95 py-1 text-neutral-600"
          aria-label="Sepeti Aç"
        >
          <div className="relative">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-neutral-950 text-white text-[9px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-mono font-bold px-1 animate-fadeInScale">
                {itemCount}
              </span>
            )}
          </div>
          <span>Sepet</span>
        </button>

        {/* Profil Linki */}
        <Link
          href="/collections/tum-urunler"
          className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider hover:text-neutral-900 transition-all duration-200 active:scale-95 py-1 text-neutral-500"
        >
          <User size={18} strokeWidth={1.5} />
          <span>Profil</span>
        </Link>
      </div>
    </nav>
  );
}
