"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, Heart, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { ModaLineLogo } from "@/components/ui/ModaLineLogo";

const LEFT_NAV_LINKS = [
  { label: "Yeni Gelenler", href: "/collections/yeni-gelenler" },
  { label: "Elbise", href: "/collections/elbise" },
  { label: "Ceket & Blazer", href: "/collections/ceket-blazer" },
];

const RIGHT_NAV_LINKS = [
  { label: "Pantolon", href: "/collections/pantolon" },
  { label: "Kaban & Mont", href: "/collections/kaban-mont" },
  { label: "Tüm Koleksiyon", href: "/collections/tum-urunler" },
];

const ALL_MOBILE_LINKS = [
  { label: "Ana Sayfa", href: "/", count: "Giriş" },
  { label: "Yeni Gelenler", href: "/collections/yeni-gelenler", count: "12 Silüet" },
  { label: "Elbise & Takım", href: "/collections/elbise", count: "24 Silüet" },
  { label: "Ceket & Blazer", href: "/collections/ceket-blazer", count: "14 Silüet" },
  { label: "Pantolon", href: "/collections/pantolon", count: "19 Silüet" },
  { label: "Kaban & Mont", href: "/collections/kaban-mont", count: "18 Silüet" },
  { label: "Tüm Koleksiyon", href: "/collections/tum-urunler", count: "80+ Parça" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openCart = useCartStore((state) => state.openCart);
  const itemCount = useCartStore((state) => state.getItemCount());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sayfa değiştiğinde menüyü otomatik kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Mobil menü açıkken sayfa kaymasını engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Üst Duyuru Çubuğu */}
      <div className="bg-neutral-950 text-white text-[10px] uppercase tracking-[0.25em] py-2.5 text-center font-medium px-4 select-none">
        1.500 TL Üzeri Ücretsiz VIP Kargo | Sonbahar / Kış Editoryal Koleksiyonu
      </div>

      {/* Ana Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-100 py-3.5"
            : "bg-white border-b border-neutral-100 py-5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          
          {/* MASAÜSTÜ: 3 Bölümlü Simetrik Lüks Flex Layout (Sol Menü - Ortalanmış Logo - Sağ Menü & İkonlar) */}
          <div className="hidden lg:flex items-center justify-between">
            
            {/* Sol Menü: Sol Kategori Linkleri */}
            <nav className="flex items-center gap-3 xl:gap-6 text-[10px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.18em] font-medium text-neutral-800 whitespace-nowrap flex-1 justify-start">
              {LEFT_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-hover hover:text-black transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Orta: Tam Ortalanmış ModaLine Logo */}
            <div className="shrink-0 px-8 text-center flex justify-center">
              <ModaLineLogo size="md" />
            </div>

            {/* Sağ Menü: Sağ Kategori Linkleri ve Aksiyon Butonları */}
            <div className="flex items-center justify-end gap-3 xl:gap-6 flex-1">
              <nav className="flex items-center gap-3 xl:gap-6 text-[10px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.18em] font-medium text-neutral-800 whitespace-nowrap">
                {RIGHT_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link-hover hover:text-black transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Aksiyon İkonları */}
              <div className="flex items-center gap-3 sm:gap-4 xl:gap-5 text-neutral-900 border-l border-neutral-200 pl-3 xl:pl-5 shrink-0">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-1 hover:opacity-60 transition"
                  title="Arama"
                  aria-label="Arama"
                >
                  <Search size={18} strokeWidth={1.4} />
                </button>

                <Link
                  href="/collections/tum-urunler"
                  className="hidden sm:block p-1 hover:opacity-60 transition"
                  title="Hesabım"
                  aria-label="Hesabım"
                >
                  <User size={18} strokeWidth={1.4} />
                </Link>

                <Link
                  href="/collections/tum-urunler"
                  className="hidden sm:block p-1 hover:opacity-60 transition"
                  title="Favoriler"
                  aria-label="Favoriler"
                >
                  <Heart size={18} strokeWidth={1.4} />
                </Link>

                {/* Sepet Butonu */}
                <button
                  onClick={openCart}
                  className="relative p-1 hover:opacity-75 transition flex items-center gap-1.5 group"
                  aria-label="Sepeti Aç"
                >
                  <ShoppingBag size={19} strokeWidth={1.4} className="group-hover:scale-105 transition-transform" />
                  {mounted && (
                    <span className="text-xs font-mono font-semibold text-neutral-950">
                      ({itemCount})
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* MOBİL: Hamburger - Logo - Sepet */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-neutral-900 hover:opacity-60 transition"
              aria-label="Menüyü Aç"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            <ModaLineLogo size="sm" />

            <div className="flex items-center gap-3 text-neutral-900">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1 hover:opacity-60 transition"
                aria-label="Arama"
              >
                <Search size={20} strokeWidth={1.4} />
              </button>
              <button
                onClick={openCart}
                className="relative p-1 hover:opacity-75 transition flex items-center gap-1"
                aria-label="Sepet"
              >
                <ShoppingBag size={20} strokeWidth={1.4} />
                {mounted && (
                  <span className="text-xs font-mono font-semibold text-neutral-950">
                    ({itemCount})
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Açılır Arama Çubuğu */}
        {isSearchOpen && (
          <div className="border-t border-neutral-100 bg-white/98 backdrop-blur-md px-4 py-4 animate-fadeIn">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search size={16} className="text-neutral-400" />
              <input
                type="text"
                placeholder="Örn: İpek Elbise, Kaşmir Kaban, Palazzo Pantolon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-xs placeholder-neutral-400 focus:outline-hidden text-neutral-900 py-1"
              />
              <Link
                href={`/collections/tum-urunler?search=${encodeURIComponent(searchQuery)}`}
                onClick={() => setIsSearchOpen(false)}
                className="text-[11px] uppercase tracking-widest font-semibold px-3.5 py-1 bg-black text-white hover:bg-neutral-800 transition"
              >
                Ara
              </Link>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-neutral-400 hover:text-black"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBIL MENÜ DRAWER (Slide-in) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-slide-left-menu overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-5 mb-6">
                <div onClick={() => setIsMobileMenuOpen(false)}>
                  <ModaLineLogo size="sm" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-black transition"
                  aria-label="Kapat"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-1">
                {ALL_MOBILE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 border-b border-neutral-100/70 text-xs uppercase tracking-[0.2em] font-medium text-neutral-900 hover:text-black group transition"
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] font-mono text-neutral-400 group-hover:text-black">
                      {link.count}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="pt-8 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-2">
                  Hizmetler
                </span>
                <div className="space-y-2 text-xs text-neutral-600">
                  <Link
                    href="/collections/tum-urunler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block hover:text-black transition"
                  >
                    Lookbook 2026
                  </Link>
                  <Link
                    href="/collections/tum-urunler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block hover:text-black transition"
                  >
                    Sipariş Takibi & Teslimat
                  </Link>
                  <Link
                    href="/collections/tum-urunler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block hover:text-black transition"
                  >
                    Müşteri Hizmetleri
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3 text-xs">
              <div className="flex justify-between items-center text-neutral-500 text-[11px]">
                <span>TÜRKİYE / TRY (₺)</span>
                <span className="text-emerald-700 font-medium">Online Mağaza Açık</span>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full h-11 bg-neutral-950 text-white text-[11px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
              >
                <ShoppingBag size={14} />
                <span>Sepetimi İncele ({itemCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
