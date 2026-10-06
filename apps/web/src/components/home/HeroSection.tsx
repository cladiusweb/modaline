"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    tagline: "EDİTORYAL SEÇKİ / SONBAHAR - KIŞ 2026",
    title: "Sessiz Lüksün Mimari Silüetleri.",
    description: "Usta terzilik, heykelsi omuz vatkaları ve İtalyan dokuma yünlerle tasarlanan zamansız formlar.",
    primaryBtn: { text: "Yeni Koleksiyon", href: "/collections/yeni-gelenler" },
    secondaryBtn: { text: "Lookbook İncele", href: "/collections/tum-urunler" },
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000",
    label: "01",
    objectPosition: "object-[center_25%]"
  },
  {
    id: 2,
    tagline: "SEZON ÖTESİ ZARAFET / KAPSÜL DIŞ GİYİM",
    title: "Dökümlü Formlar & Saf Kaşmir.",
    description: "Mevsim ötesi zarafet ve gündüzden geceye zahmetsiz akış sağlayan heykelsi kabanlar ve trençkotlar.",
    primaryBtn: { text: "Kaban & Dış Giyim", href: "/collections/kaban-mont" },
    secondaryBtn: { text: "Kapsül Gardırop", href: "/collections/tum-urunler" },
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000",
    label: "02",
    objectPosition: "object-[center_15%]"
  },
  {
    id: 3,
    tagline: "GECE İHTİŞAMI / AKIŞKAN İPEK",
    title: "Zarafetin En Yalın ve Duru Hali.",
    description: "Doğal ışıltılı saf dut ipeği saten elbiseler. Monokrom asalet, derin sırt dekolteleri ve kusursuz drapeler.",
    primaryBtn: { text: "Elbise & Takım", href: "/collections/elbise" },
    secondaryBtn: { text: "Özel Davetler", href: "/collections/tum-urunler" },
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=2000",
    label: "03",
    objectPosition: "object-[center_20%]"
  }
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] max-h-[920px] overflow-hidden bg-neutral-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slayt Arka Plan Görselleri */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Position relative container for Next.js Image fill */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              unoptimized
              className={`object-cover ${slide.objectPosition} filter brightness-[0.95] contrast-[1.02] ${
                idx === current ? "animate-kenburns" : ""
              }`}
              sizes="100vw"
            />
            {/* Editoryal Gradyan: Mobilde alttan yukarı dengeli geçiş, PC'de soldan sağa editoryal derinlik */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/40 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>
      ))}

      {/* Hero İçerik Alanı (Sol Altta Lüks Editoryal Tipografi) */}
      <div className="relative z-20 h-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-end pb-16 md:pb-20 text-white">
        <div className="max-w-2xl space-y-4">
          {/* Tagline */}
          <div className="overflow-hidden">
            <span
              key={`tag-${current}`}
              className="inline-block text-[10px] md:text-xs uppercase tracking-[0.3em] font-light text-neutral-300 animate-text-reveal font-mono drop-shadow-xs"
            >
              {HERO_SLIDES[current].tagline}
            </span>
          </div>

          {/* Başlık (Playfair Display) */}
          <div className="overflow-hidden">
            <h1
              key={`title-${current}`}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-[1.08] animate-text-reveal drop-shadow-md"
            >
              {HERO_SLIDES[current].title}
            </h1>
          </div>

          {/* Açıklama Metni */}
          <div className="overflow-hidden">
            <p
              key={`desc-${current}`}
              className="text-xs sm:text-sm md:text-base text-neutral-200 font-light max-w-lg leading-relaxed pt-1 animate-text-reveal drop-shadow-xs"
            >
              {HERO_SLIDES[current].description}
            </p>
          </div>

          {/* CTA Butonları */}
          <div
            key={`btn-${current}`}
            className="pt-6 flex flex-wrap items-center gap-4 animate-text-reveal"
          >
            <Link
              href={HERO_SLIDES[current].primaryBtn.href}
              className="btn-editorial-light px-8 py-3.5 text-[11px] md:text-xs uppercase tracking-[0.22em] font-semibold flex items-center gap-2 group border border-white shadow-lg"
            >
              <span>{HERO_SLIDES[current].primaryBtn.text}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={HERO_SLIDES[current].secondaryBtn.href}
              className="btn-editorial-dark px-8 py-3.5 bg-black/50 backdrop-blur-md border border-white/50 text-white text-[11px] md:text-xs uppercase tracking-[0.22em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg"
            >
              <span>{HERO_SLIDES[current].secondaryBtn.text}</span>
            </Link>
          </div>
        </div>

        {/* Alt Kontroller: 01/02/03 Sayaçları & Manuel Oklar */}
        <div className="mt-10 pt-6 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrent(idx)}
                className="group flex items-center gap-2.5 py-2 text-left transition"
                aria-label={`Slayt ${idx + 1}`}
              >
                <span
                  className={`text-xs font-mono transition-colors ${
                    idx === current ? "text-white font-bold" : "text-white/40 group-hover:text-white/80"
                  }`}
                >
                  {slide.label}
                </span>
                <div
                  className={`h-[2px] transition-all duration-500 rounded-full ${
                    idx === current ? "w-12 bg-white" : "w-4 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Manuel Slayt Geçiş Butonları */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Önceki Slayt"
              className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Sonraki Slayt"
              className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
