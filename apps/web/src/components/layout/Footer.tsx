"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModaLineLogo } from "@/components/ui/ModaLineLogo";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-900 pt-16 pb-36 lg:pb-16 mt-20 lg:mt-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Marka & Bülten */}
          <div className="lg:col-span-2 space-y-4">
            <ModaLineLogo size="md" inverted={true} />
            <p className="text-neutral-400 text-xs max-w-sm leading-relaxed">
              Kadın modasında sessiz lüks, zamansız terzilik ve en kaliteli doğal elyaflarla tasarlanan editoryal koleksiyonlar.
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-300 block mb-2 font-medium">
                Editoryal Bültene Katılın (%10 İlk Sipariş İndirimi)
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex max-w-sm border-b border-neutral-700 pb-1">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="bg-transparent text-white placeholder-neutral-500 focus:outline-hidden text-xs flex-1"
                />
                <button
                  type="submit"
                  className="text-white hover:text-neutral-400 transition p-1"
                  aria-label="Gönder"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Kolon 1: Koleksiyonlar */}
          <div className="space-y-3">
            <h4 className="text-white text-[11px] uppercase tracking-[0.2em] font-semibold">
              Koleksiyonlar
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/collections/yeni-gelenler" className="hover:text-white transition">Yeni Gelenler</Link></li>
              <li><Link href="/collections/elbise" className="hover:text-white transition">Elbise & Takım</Link></li>
              <li><Link href="/collections/ceket-blazer" className="hover:text-white transition">Ceket & Blazer</Link></li>
              <li><Link href="/collections/pantolon" className="hover:text-white transition">Pantolon & Şort</Link></li>
              <li><Link href="/collections/kaban-mont" className="hover:text-white transition">Kaban & Mont</Link></li>
            </ul>
          </div>

          {/* Kolon 2: Müşteri Deneyimi */}
          <div className="space-y-3">
            <h4 className="text-white text-[11px] uppercase tracking-[0.2em] font-semibold">
              Müşteri Hizmetleri
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="hover:text-white transition">Sipariş Takibi</Link></li>
              <li><Link href="#" className="hover:text-white transition">Teslimat & Kargo</Link></li>
              <li><Link href="#" className="hover:text-white transition">İade & Değişim</Link></li>
              <li><Link href="#" className="hover:text-white transition">Beden Rehberi</Link></li>
              <li><Link href="#" className="hover:text-white transition">Bize Ulaşın</Link></li>
            </ul>
          </div>

          {/* Kolon 3: Kurumsal */}
          <div className="space-y-3">
            <h4 className="text-white text-[11px] uppercase tracking-[0.2em] font-semibold">
              Hakkımızda
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="hover:text-white transition">Manifestomuz</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sürdürülebilirlik</Link></li>
              <li><Link href="#" className="hover:text-white transition">Lookbook 2026</Link></li>
              <li><Link href="#" className="hover:text-white transition">Kariyer</Link></li>
              <li><Link href="#" className="hover:text-white transition">Basın & İletişim</Link></li>
            </ul>
          </div>
        </div>

        {/* Alt Telif & Yasal */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500 uppercase tracking-widest">
          <div>
            &copy; {new Date().getFullYear()} MODALINE CLOTHING CO. TÜM HAKLARI SAKLIDIR.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-neutral-400">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-neutral-400">Kullanım Şartları</Link>
            <Link href="#" className="hover:text-neutral-400">Çerez Tercihleri</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
