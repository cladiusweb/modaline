import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts } from "@/lib/api";
import { HeroSection } from "@/components/home/HeroSection";

const CATEGORIES = [
  {
    name: "Kaban & Dış Giyim",
    subtitle: "Saf Kaşmir & Yün Karışımları",
    slug: "kaban-mont",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1400",
    itemCount: "18 Silüet"
  },
  {
    name: "Elbise & Akşam Takımları",
    subtitle: "Dökümlü İpek & Verev Kesim",
    slug: "elbise",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400",
    itemCount: "24 Silüet"
  },
  {
    name: "Terzilik & Blazerlar",
    subtitle: "Heykelsi Form & Düşük Omuz",
    slug: "ceket-blazer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400",
    itemCount: "14 Silüet"
  }
];

const LOOKBOOK_GALLERY = [
  {
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000",
    tag: "@modalinestudio #SessizLuks",
    caption: "Saf Dokular & Monokrom Akış"
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    tag: "@modalinestudio #Editorial",
    caption: "Mevsim Ötesi Terzilik"
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
    tag: "@modalinestudio #Atelier",
    caption: "Geniş Paça & Dökümlü Form"
  },
  {
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
    tag: "@modalinestudio #GeceIhtisami",
    caption: "Saten Dokular & Akışkanlık"
  }
];

export default async function HomePage() {
  const products = await fetchProducts();
  const newArrivals = products.slice(0, 4);

  return (
    <div className="space-y-20 md:space-y-28">
      {/* 1. DİNAMİK ANİMASYONLU HERO BÖLÜMÜ */}
      <HeroSection />

      {/* 2. EDİTORYAL MARQUEE / TICKER ŞERİDİ (Zara/Gucci Tarzı) */}
      <div className="border-y border-neutral-200 bg-neutral-50 py-3 overflow-hidden select-none">
        <div className="flex whitespace-nowrap gap-10 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-editorial text-neutral-600 animate-marquee">
          <span>• MODALINE ATELIER 2026</span>
          <span>• SESSİZ LÜKSÜN SİLÜETİ</span>
          <span>• SAF İPEK & KAŞMİR</span>
          <span>• SEZON ÖTESİ ZAMANSIZ FORM</span>
          <span>• İTALYAN TERZİLİĞİ</span>
          <span>• 1.500 TL ÜZERİ AYNI GÜN ÜCRETSİZ TESLİMAT</span>
          <span>• MODALINE ATELIER 2026</span>
          <span>• SESSİZ LÜKSÜN SİLÜETİ</span>
          <span>• SAF İPEK & KAŞMİR</span>
          <span>• SEZON ÖTESİ ZAMANSIZ FORM</span>
        </div>
      </div>

      {/* 3. KATEGORİLERE GÖRE KEŞFET (Curated Cards - CLS Önleyici Sabit Aspect Ratio) */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-neutral-200 pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
              Kürasyon / 2026 Koleksiyonu
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-normal">
              Kategorilere Göre Keşfet
            </h2>
          </div>
          <Link
            href="/collections/tum-urunler"
            className="text-xs uppercase tracking-widest text-neutral-600 hover:text-black flex items-center gap-1 group nav-link-hover w-fit"
          >
            <span>Tüm Koleksiyonu Gör</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Lüks degrade katman */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent group-hover:from-black/85 transition-all duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-mono block">
                    {cat.itemCount}
                  </span>
                  <h3 className="text-2xl font-serif">{cat.name}</h3>
                  <p className="text-[11px] text-neutral-300 font-light">{cat.subtitle}</p>
                </div>
                <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. YENİ GELENLER (New In Grid) */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono block mb-2">
            İmza Tasarımlar
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-normal">
            Yeni Gelenler & Editoryal Seçki
          </h2>
          <div className="w-8 h-[1px] bg-neutral-900 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections/yeni-gelenler"
            className="btn-editorial-dark inline-block px-10 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all"
          >
            Tüm Yeni Koleksiyonu Keşfet
          </Link>
        </div>
      </section>

      {/* 5. EDITORIAL MANIFESTO SPLIT BANNER */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-neutral-100 overflow-hidden">
          <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] bg-neutral-200">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600"
              alt="ModaLine Editorial"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="lg:col-span-5 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-stone-50 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
              Atölye Manifestosu No. 04
            </span>
            <h2 className="text-3xl md:text-4xl font-serif leading-snug">
              Zamanın Ötesinde Bir Zarafet Arayışı.
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-light">
              Hızlı tüketim kalıplarına karşı duran ModaLine; bedeni kısıtlamayan akışkan heykelsi kalıpları, saf doğal lifleri ve incelikli el dikişlerini sessiz bir lüks vizyonunda buluşturur.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/tum-urunler"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 underline underline-offset-8 hover:text-neutral-600 transition"
              >
                <span>Atölye Seçkisini İncele</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM & LOOKBOOK GRID */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 pb-12">
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono block mb-1">
            @modalinestudio
          </span>
          <h2 className="text-xl md:text-2xl font-serif font-normal">Lookbook & Görsel İlham</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {LOOKBOOK_GALLERY.map((item, idx) => (
            <div key={idx} className="group relative aspect-square bg-neutral-100 overflow-hidden">
              <Image
                src={item.image}
                alt="Lookbook İlham"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white space-y-1">
                <span className="text-xs font-serif italic">{item.caption}</span>
                <span className="text-[10px] font-mono tracking-wider opacity-80">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
