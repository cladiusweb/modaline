"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const setQuickViewProduct = useCartStore((state) => state.setQuickViewProduct);

  const activeVariant = product?.variants?.[activeVariantIdx] || product?.variants?.[0] || { images: [] };
  const primaryImage = activeVariant?.images?.[0]?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200";
  const secondaryImage = activeVariant?.images?.[1]?.url || primaryImage;

  return (
    <div className="group flex flex-col relative">
      {/* Görsel Alanı */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          {/* Birincil Görsel */}
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            unoptimized
            className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* İkincil Hover Görseli */}
          <Image
            src={secondaryImage}
            alt={`${product.title} alternatif`}
            fill
            unoptimized
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Etiketler */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
          {product.tags.includes("new-in") && (
            <span className="bg-white/95 backdrop-blur-[2px] text-neutral-900 text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">
              Yeni
            </span>
          )}
          {product.tags.includes("bestseller") && (
            <span className="bg-neutral-950 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">
              İkonik
            </span>
          )}
        </div>

        {/* Hızlı Bakış & Sepete Ekle Butonu (Mobilde Daima Görünür, Masaüstünde Hover'da Çıkar) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs text-neutral-950 text-[10px] uppercase tracking-[0.2em] font-semibold py-2.5 sm:py-3 text-center opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-neutral-950 hover:text-white border-t border-neutral-100 shadow-xs"
          aria-label={`${product.title} için Hızlı Seçim ve Sepete Ekle`}
        >
          <Eye size={13} />
          <span>Hızlı Seçim</span>
        </button>
      </div>

      {/* Renk Çemberleri */}
      {product.variants.length > 1 && (
        <div className="flex items-center gap-1.5 mb-2">
          {product.variants.map((variant, idx) => (
            <button
              key={variant.colorName}
              onClick={() => setActiveVariantIdx(idx)}
              className={`w-3.5 h-3.5 rounded-full border p-px transition-all ${
                activeVariantIdx === idx ? "border-black scale-110" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              title={variant.colorName}
            >
              <span
                className="block w-full h-full rounded-full border border-neutral-300"
                style={{ backgroundColor: variant.colorHex }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Bilgiler */}
      <div className="flex justify-between items-start text-xs">
        <div className="flex-1 pr-2">
          <Link
            href={`/products/${product.slug}`}
            className="uppercase tracking-wider font-medium text-neutral-900 line-clamp-1 group-hover:underline underline-offset-4"
          >
            {product.title}
          </Link>
          <p className="text-[11px] text-neutral-400 mt-0.5">{activeVariant.colorName}</p>
        </div>
        <span className="font-semibold text-neutral-950 font-mono shrink-0">
          {formatPrice(product.pricing.basePrice)}
        </span>
      </div>
    </div>
  );
}
