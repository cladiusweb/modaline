"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export function CartSheet() {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getCartSubtotal,
    freeShippingThreshold
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted || !isOpen) return null;

  const subtotal = getCartSubtotal();
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFree = Math.max(freeShippingThreshold - subtotal, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-900 font-editorial">
              Alışveriş Sepeti
            </span>
            <span className="text-xs font-mono text-neutral-400">
              ({items.reduce((acc, cur) => acc + cur.quantity, 0)})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1 hover:opacity-60 transition text-neutral-900"
            aria-label="Kapat"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3.5 bg-neutral-50/80 border-b border-neutral-100">
          <p className="text-[11px] uppercase tracking-wider text-neutral-700 mb-2">
            {remainingForFree === 0 ? (
              <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Siparişinizde Ücretsiz Kargo Kazandınız!
              </span>
            ) : (
              <span>
                Ücretsiz kargoya son <strong className="text-neutral-950 font-mono">{formatPrice(remainingForFree)}</strong>
              </span>
            )}
          </p>
          <div className="w-full bg-neutral-200 h-[2.5px] overflow-hidden rounded-full">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                progress === 100 ? "bg-emerald-600" : "bg-neutral-900"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Product Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
                <ShoppingBag size={24} strokeWidth={1.2} className="text-neutral-400" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-900 mb-1">
                Sepetiniz henüz boş
              </p>
              <p className="text-xs text-neutral-400 max-w-[200px] leading-relaxed mb-6">
                Yeni sezon lüks kadın giyim parçalarımızı keşfedin.
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-[0.2em] hover:bg-neutral-800 transition"
              >
                Koleksiyonu Keşfet
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group border-b border-neutral-100 pb-5 last:border-b-0">
                <div className="relative w-20 h-28 bg-neutral-100 shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs uppercase tracking-wider font-medium text-neutral-900 line-clamp-1">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-neutral-900 transition p-0.5"
                        title="Ürünü Sil"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                      Ref. {item.referenceCode}
                    </span>
                    <p className="text-[11px] text-neutral-600 mt-1">
                      {item.selectedColor.name} | Beden: <span className="font-semibold text-neutral-900">{item.selectedSize}</span>
                    </p>
                    <p className="text-xs font-semibold text-neutral-950 mt-1.5 font-mono">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center border border-neutral-200 w-fit mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-neutral-600 hover:text-black transition"
                      aria-label="Azalt"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="text-xs px-2.5 font-mono select-none">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-neutral-600 hover:text-black transition"
                      aria-label="Artır"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout Button */}
        {items.length > 0 && (
          <div className="p-6 border-t border-neutral-100 bg-white space-y-4">
            <div className="flex justify-between items-center text-xs tracking-wider uppercase font-semibold text-neutral-900">
              <span className="font-editorial">Ara Toplam</span>
              <span className="text-sm font-bold font-mono">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Vergiler dahildir. Kargo ücreti bir sonraki adımda hesaplanacaktır.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full h-12 bg-neutral-950 text-white flex items-center justify-center text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all group"
            >
              <span>Siparişi Tamamla</span>
              <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
