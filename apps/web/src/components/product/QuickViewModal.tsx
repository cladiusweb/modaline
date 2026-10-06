"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addItem } = useCartStore();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"XS" | "S" | "M" | "L" | "XL" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!quickViewProduct) return null;

  const product: Product = quickViewProduct;
  const activeColor = product.variants[selectedColorIdx] || product.variants[0];
  const activeSizeObj = activeColor.sizes.find((s) => s.size === selectedSize);

  const handleAdd = () => {
    if (!selectedSize || !activeSizeObj) {
      setErrorMsg("Lütfen bir beden seçin.");
      return;
    }
    setErrorMsg("");

    addItem({
      productId: product.id || (product as any)._id,
      title: product.title,
      referenceCode: product.referenceCode,
      price: product.pricing.basePrice,
      selectedColor: {
        name: activeColor.colorName,
        hex: activeColor.colorHex
      },
      selectedSize: selectedSize,
      sku: activeSizeObj.sku,
      image: activeColor.images[0].url,
      quantity: 1,
      maxStock: activeSizeObj.stock
    });

    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />
      <div className="relative bg-white w-full max-w-3xl shadow-2xl z-10 overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-xs text-neutral-800 hover:text-black rounded-full"
        >
          <X size={18} />
        </button>

        {/* Görsel */}
        <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-neutral-100 min-h-[350px]">
          <Image
            src={activeColor?.images?.[0]?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"}
            alt={product.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Detay & Hızlı Satın Alma */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 block uppercase">
              Ref. {product.referenceCode}
            </span>
            <h3 className="text-lg font-serif mt-1 font-normal text-neutral-900">
              {product.title}
            </h3>
            <p className="text-sm font-semibold font-mono text-neutral-950 mt-2">
              {formatPrice(product.pricing.basePrice)}
            </p>

            <p className="text-xs text-neutral-500 mt-4 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Renk */}
            <div className="mt-6">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block mb-2">
                Renk: <strong className="text-neutral-900">{activeColor.colorName}</strong>
              </span>
              <div className="flex gap-2.5">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.colorName}
                    onClick={() => {
                      setSelectedColorIdx(idx);
                      setSelectedSize(null);
                    }}
                    className={`w-6 h-6 rounded-full border p-0.5 ${
                      selectedColorIdx === idx ? "border-black scale-110" : "border-transparent"
                    }`}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-neutral-300"
                      style={{ backgroundColor: v.colorHex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Beden */}
            <div className="mt-6">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block mb-2">
                Beden
              </span>
              <div className="grid grid-cols-5 gap-2">
                {activeColor.sizes.map((s) => {
                  const isOutOfStock = s.stock === 0;
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      disabled={isOutOfStock}
                      onClick={() => {
                        setSelectedSize(s.size);
                        setErrorMsg("");
                      }}
                      className={`h-9 border text-xs font-mono transition ${
                        isOutOfStock
                          ? "border-neutral-200 text-neutral-300 bg-neutral-50 line-through cursor-not-allowed"
                          : isSelected
                          ? "border-black bg-black text-white font-semibold"
                          : "border-neutral-200 hover:border-black text-neutral-800"
                      }`}
                    >
                      {s.size}
                    </button>
                  );
                })}
              </div>
              {errorMsg && (
                <p className="text-[11px] text-red-600 mt-2 font-medium flex items-center gap-1 animate-fadeIn">
                  <span>* {errorMsg}</span>
                </p>
              )}
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={handleAdd}
              className="w-full h-13 bg-neutral-950 text-white text-xs uppercase tracking-[0.22em] font-semibold hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
            >
              <span>Sepete Ekle & Tamamla</span>
            </button>
            <Link
              href={`/products/${product.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-500 hover:text-black py-1 nav-link-hover"
            >
              <span>Tüm Detayları & Beden Tablosunu Gör</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
