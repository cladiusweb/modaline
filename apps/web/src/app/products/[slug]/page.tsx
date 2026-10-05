"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Ruler, ShieldCheck, RefreshCw, Truck, ArrowRight, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { FALLBACK_PRODUCTS } from "@/lib/api";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "kruvaze-yun-karisimli-blazer";

  const product = FALLBACK_PRODUCTS.find((p) => p.slug === slug) || FALLBACK_PRODUCTS[0];

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"XS" | "S" | "M" | "L" | "XL" | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const activeColor = product.variants[selectedColorIdx] || product.variants[0];
  const activeSizeObj = activeColor.sizes.find((s) => s.size === selectedSize);

  // Kombini Tamamla parçaları
  const completeTheLook = FALLBACK_PRODUCTS.filter((item) =>
    product.completeTheLookSlugs?.includes(item.slug)
  );

  const handleAddToCart = () => {
    if (!selectedSize || !activeSizeObj) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    addItem({
      productId: product.id,
      title: product.title,
      referenceCode: product.referenceCode,
      price: product.pricing.basePrice,
      selectedColor: {
        name: activeColor.colorName,
        hex: activeColor.colorHex
      },
      selectedSize: selectedSize,
      sku: activeSizeObj.sku,
      image: activeColor.images[0]?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400",
      quantity: 1,
      maxStock: activeSizeObj.stock
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 lg:py-12">
        {/* Breadcrumb */}
        <nav className="text-[11px] text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-black">Ana Sayfa</Link>
          <span>/</span>
          <Link href={`/collections/${product.categorySlug}`} className="hover:text-black">
            {product.categorySlug}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* SOL: Editoryal Dikey Görsel Galerisi (8 Kolon) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeColor.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-zoom-in ${
                    idx === 0 ? "md:col-span-2 aspect-[4/5]" : ""
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${product.title} - Görsel ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {idx === 0 && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                      Look No. 01
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ: Sticky Detay Paneli (4 Kolon) */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Başlık ve Fiyat */}
              <div className="border-b border-neutral-200 pb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                  Ref. {product.referenceCode}
                </span>
                <h1 className="text-2xl md:text-3xl font-serif font-normal mt-1 leading-snug">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">
                    {product.subtitle}
                  </p>
                )}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-xl font-semibold font-mono text-neutral-950">
                    {formatPrice(product.pricing.basePrice)}
                  </span>
                  {product.pricing.discountedPrice && (
                    <span className="text-sm line-through text-neutral-400 font-mono">
                      {formatPrice(product.pricing.discountedPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Renk Seçimi */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-wider text-neutral-600">
                    Renk: <strong className="text-neutral-900">{activeColor.colorName}</strong>
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.colorName}
                      onClick={() => {
                        setSelectedColorIdx(idx);
                        setSelectedSize(null);
                      }}
                      className={`w-7 h-7 rounded-full border p-0.5 transition-all ${
                        selectedColorIdx === idx ? "border-black scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      title={v.colorName}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-neutral-300"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Beden Seçimi & Rehber */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-wider text-neutral-600">
                    Beden
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-neutral-600 hover:text-black underline underline-offset-4"
                  >
                    <Ruler size={13} />
                    <span>Beden Tablosu</span>
                  </button>
                </div>

                <div id="size-section" className="grid grid-cols-5 gap-2">
                  {activeColor.sizes.map((s) => {
                    const isOutOfStock = s.stock === 0;
                    const isSelected = selectedSize === s.size;

                    return (
                      <button
                        key={s.size}
                        disabled={isOutOfStock}
                        onClick={() => {
                          setSelectedSize(s.size);
                          setSizeError(false);
                        }}
                        className={`h-11 border text-xs font-mono transition-all relative ${
                          isOutOfStock
                            ? "border-neutral-200 text-neutral-300 cursor-not-allowed bg-neutral-50 line-through"
                            : isSelected
                            ? "border-neutral-950 bg-neutral-950 text-white font-semibold scale-105 shadow-xs"
                            : sizeError
                            ? "border-red-500 text-neutral-900 bg-red-50/40 animate-pulse"
                            : "border-neutral-300 hover:border-black text-neutral-800"
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
                {sizeError && (
                  <p className="text-[11px] text-red-600 mt-2 font-medium flex items-center gap-1 animate-fadeIn">
                    <span>* Lütfen devam etmek için yukarıdan bir beden seçiniz.</span>
                  </p>
                )}
                {activeSizeObj && activeSizeObj.stock > 0 && activeSizeObj.stock <= 3 && (
                  <p className="text-[11px] text-amber-700 font-mono mt-2 font-medium">
                    ⚡ Bu bedende son {activeSizeObj.stock} adet kaldı!
                  </p>
                )}
              </div>

              {/* Masaüstü Sepete Ekle Butonu */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-14 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md ${
                    addedNotice
                      ? "bg-emerald-800 text-white scale-[0.99]"
                      : "bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.98] hover:shadow-lg"
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check size={18} strokeWidth={2.5} />
                      <span>Sepete Eklendi</span>
                    </>
                  ) : (
                    <>
                      <Truck size={17} strokeWidth={1.6} />
                      <span>Sepete Ekle & Hızlı Sipariş</span>
                    </>
                  )}
                </button>
              </div>

              {/* Ürün Açıklaması & Kumaş Bilgisi */}
              <div className="space-y-4 pt-4 border-t border-neutral-200 text-xs leading-relaxed text-neutral-600">
                <p>{product.description}</p>
                <div className="bg-neutral-50 p-4 border border-neutral-100 space-y-2">
                  <div>
                    <span className="font-semibold block text-neutral-900 uppercase tracking-wider text-[11px]">
                      Kumaş & Doku
                    </span>
                    <p>{product.composition.material}</p>
                  </div>
                  <div>
                    <span className="font-semibold block text-neutral-900 uppercase tracking-wider text-[11px] mt-2">
                      Bakım Talimatları
                    </span>
                    <ul className="list-disc list-inside text-neutral-500">
                      {product.composition.careInstructions.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Teslimat ve Avantajlar */}
              <div className="space-y-3 pt-2 text-neutral-700 text-xs border-t border-neutral-200">
                <div className="flex items-center gap-3">
                  <Truck size={16} strokeWidth={1.4} />
                  <span>1.500 TL Üzeri Ücretsiz Standart Kargo</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw size={16} strokeWidth={1.4} />
                  <span>30 Gün İçinde Ücretsiz Kolay İade</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} strokeWidth={1.4} />
                  <span>Güvenli Alışveriş & Orijinal Tasarım Garantisi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. KOMBİNİ TAMAMLA (Complete The Look Module) */}
        {completeTheLook.length > 0 && (
          <section className="mt-24 pt-16 border-t border-neutral-200">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                  Stil Danışmanı
                </span>
                <h2 className="text-2xl font-serif">Kombini Tamamla</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {completeTheLook.map((lookItem) => (
                <div key={lookItem.id} className="group flex flex-col">
                  <Link href={`/products/${lookItem.slug}`} className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
                    <Image
                      src={lookItem.variants[0]?.images[0]?.url || ""}
                      alt={lookItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </Link>
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <Link href={`/products/${lookItem.slug}`} className="font-medium text-neutral-900 group-hover:underline uppercase tracking-wider">
                        {lookItem.title}
                      </Link>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{lookItem.variants[0]?.colorName}</p>
                    </div>
                    <span className="font-semibold font-mono">{formatPrice(lookItem.pricing.basePrice)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* MOBİL FLOATING STICKY CTA (Zara/Mango Tarzı - Ekranın Altında Sabit Sepete Ekle) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/98 backdrop-blur-md border-t border-neutral-200 p-3 z-40 shadow-[0_-6px_25px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          {/* Fiyat Bilgisi */}
          <div className="shrink-0 flex flex-col justify-center">
            <span className="text-[10px] text-neutral-400 font-mono block">Fiyat</span>
            <span className="text-sm font-bold font-mono text-neutral-950">
              {formatPrice(product.pricing.basePrice)}
            </span>
          </div>

          {/* Beden Göstergesi / Butonu */}
          <button
            onClick={() => {
              document.getElementById("size-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-3 py-2 border text-xs font-mono shrink-0 transition ${
              selectedSize
                ? "border-neutral-950 bg-neutral-100 text-neutral-950 font-bold"
                : "border-red-400 bg-red-50/50 text-red-700 animate-pulse"
            }`}
          >
            {selectedSize ? `Beden: ${selectedSize}` : "Beden Seç"}
          </button>

          {/* Büyük Sepete Ekle Butonu */}
          <button
            onClick={() => {
              if (!selectedSize) {
                setSizeError(true);
                document.getElementById("size-section")?.scrollIntoView({ behavior: "smooth" });
                return;
              }
              handleAddToCart();
            }}
            className={`flex-1 h-12 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              addedNotice
                ? "bg-emerald-800 text-white"
                : "bg-neutral-950 text-white active:scale-95 shadow-md"
            }`}
          >
            {addedNotice ? (
              <>
                <Check size={16} strokeWidth={2.5} />
                <span>Sepete Eklendi</span>
              </>
            ) : (
              <>
                <Truck size={15} />
                <span>Sepete Ekle</span>
              </>
            )}
          </button>
        </div>
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
