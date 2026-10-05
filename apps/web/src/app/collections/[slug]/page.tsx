"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { SlidersHorizontal, X, Grid2X2, LayoutGrid, RotateCcw } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { FALLBACK_PRODUCTS } from "@/lib/api";
import { useFilterStore } from "@/store/useFilterStore";

const SIZES = ["XS", "S", "M", "L", "XL"];
const FABRICS = ["İpek", "Keten", "Yün", "Pamuk", "Kaşmir", "Saten"];
const COLORS = [
  { name: "Bej", hex: "#D7CBB5" },
  { name: "Siyah", hex: "#1C1C1C" },
  { name: "Yeşil", hex: "#174232" },
  { name: "Beyaz", hex: "#FDFBF7" },
  { name: "Taba", hex: "#995C3C" }
];

export default function ProductListingPage() {
  const params = useParams();
  const collectionSlug = (params?.slug as string) || "tum-urunler";

  const {
    size: selectedSize,
    color: selectedColor,
    fabric: selectedFabric,
    sort: selectedSort,
    gridCols,
    setSize,
    setColor,
    setFabric,
    setSort,
    setGridCols,
    resetFilters
  } = useFilterStore();

  const [priceMax, setPriceMax] = useState<number>(10000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Client-side dynamic filtering
  const filteredProducts = useMemo(() => {
    let list = [...FALLBACK_PRODUCTS];

    // Category filter
    if (collectionSlug !== "tum-urunler" && collectionSlug !== "yeni-gelenler") {
      list = list.filter((p) => p.categorySlug === collectionSlug);
    } else if (collectionSlug === "yeni-gelenler") {
      list = list.filter((p) => p.tags.includes("new-in"));
    }

    // Size filter
    if (selectedSize) {
      list = list.filter((p) =>
        p.variants.some((v) =>
          v.sizes.some((s) => s.size === selectedSize && s.stock > 0)
        )
      );
    }

    // Fabric filter
    if (selectedFabric) {
      list = list.filter((p) => p.fabricType === selectedFabric);
    }

    // Color filter
    if (selectedColor) {
      list = list.filter((p) =>
        p.variants.some((v) =>
          v.colorName.toLowerCase().includes(selectedColor.toLowerCase())
        )
      );
    }

    // Price filter
    list = list.filter((p) => p.pricing.basePrice <= priceMax);

    // Sorting
    if (selectedSort === "price-asc") {
      list.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
    } else if (selectedSort === "price-desc") {
      list.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
    }

    return list;
  }, [collectionSlug, selectedSize, selectedFabric, selectedColor, priceMax, selectedSort]);

  const categoryTitles: Record<string, string> = {
    "tum-urunler": "Tüm Koleksiyon",
    "yeni-gelenler": "Yeni Gelenler",
    "elbise": "Elbiseler & Takımlar",
    "ceket-blazer": "Ceketler & Blazerlar",
    "pantolon": "Pantolonlar",
    "kaban-mont": "Kaban & Mont",
  };

  const currentTitle = categoryTitles[collectionSlug] || "Kadın Koleksiyonu";

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Üst Başlık & Kontrol Çubuğu */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 block uppercase">
            Koleksiyon / {collectionSlug}
          </span>
          <h1 className="text-2xl md:text-3xl font-serif mt-1">{currentTitle}</h1>
          <p className="text-xs text-neutral-500 mt-1 font-mono">
            {filteredProducts.length} ürün listeleniyor
          </p>
        </div>

        {/* Araçlar: Mobil Filtre Butonu, Sıralama, Görünüm Değiştirici */}
        <div className="flex items-center gap-4 text-xs">
          {/* Mobil Filtre Açıcı */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 border border-neutral-300 text-neutral-800 uppercase tracking-wider text-[11px]"
          >
            <SlidersHorizontal size={14} />
            <span>Filtreler</span>
          </button>

          {/* Sıralama */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-[11px] uppercase tracking-wider hidden sm:inline">
              Sırala:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSort(e.target.value as any)}
              aria-label="Sıralama Seçenekleri"
              className="border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:outline-hidden focus:border-black uppercase tracking-wider"
            >
              <option value="newest">En Yeniler</option>
              <option value="price-asc">Fiyata Göre (Artan)</option>
              <option value="price-desc">Fiyata Göre (Azalan)</option>
            </select>
          </div>

          {/* Grid Görünüm Değiştirici (Masaüstü) */}
          <div className="hidden md:flex items-center border border-neutral-300">
            <button
              onClick={() => setGridCols(2)}
              className={`p-2 transition ${gridCols === 2 ? "bg-black text-white" : "text-neutral-500 hover:text-black"}`}
              title="2'li Izgara"
            >
              <Grid2X2 size={15} />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 transition ${gridCols === 4 ? "bg-black text-white" : "text-neutral-500 hover:text-black"}`}
              title="4'lü Izgara"
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* SOL: Sticky Filtre Paneli (Masaüstü) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 space-y-8 pr-4">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 font-editorial">
                Filtreler
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-neutral-400 hover:text-black flex items-center gap-1 uppercase tracking-wider"
              >
                <RotateCcw size={11} />
                <span>Sıfırla</span>
              </button>
            </div>

            {/* Beden Filtresi (XS - XL) */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-900 block mb-3">
                Beden
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSize(size)}
                    className={`h-9 border text-xs font-mono transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black font-semibold"
                        : "border-neutral-200 text-neutral-700 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Kumaş Türü */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-900 block mb-3">
                Kumaş / Doku
              </span>
              <div className="space-y-2 text-xs">
                {FABRICS.map((fabric) => (
                  <button
                    key={fabric}
                    onClick={() => setFabric(fabric)}
                    className={`flex items-center justify-between w-full py-1 text-left transition ${
                      selectedFabric === fabric ? "font-semibold text-black" : "text-neutral-600 hover:text-black"
                    }`}
                  >
                    <span>{fabric}</span>
                    {selectedFabric === fabric && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Renk Paleti */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-900 block mb-3">
                Renk
              </span>
              <div className="flex flex-wrap gap-2.5">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`w-6 h-6 rounded-full border p-0.5 transition ${
                      selectedColor === c.name ? "border-black scale-110" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    title={c.name}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-neutral-300"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Fiyat Aralığı Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-900">
                  Maksimum Fiyat
                </span>
                <span className="text-xs font-mono font-semibold">
                  {priceMax.toLocaleString("tr-TR")} TL
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={10000}
                step={250}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                aria-label="Maksimum Fiyat Aralığı"
                className="w-full accent-black cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* SAĞ: Ürün Izgarası (PLP Cards) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
                Seçilen kriterlere uygun ürün bulunamadı.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-neutral-800"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-x-4 md:gap-x-6 gap-y-10 ${
                gridCols === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBIL FILTRE ÇEKMECESİ */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 font-editorial">
                  Filtreler
                </span>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Beden */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-900 block mb-2">
                  Beden
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSize(size)}
                      className={`h-9 border text-xs font-mono ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-neutral-200 text-neutral-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kumaş */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-900 block mb-2">
                  Kumaş
                </span>
                <div className="space-y-1.5 text-xs">
                  {FABRICS.map((fabric) => (
                    <button
                      key={fabric}
                      onClick={() => setFabric(fabric)}
                      className={`flex justify-between w-full py-1 ${
                        selectedFabric === fabric ? "font-bold text-black" : "text-neutral-600"
                      }`}
                    >
                      <span>{fabric}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-neutral-950 text-white text-xs uppercase tracking-widest font-medium"
              >
                Sonuçları Göster ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-xs uppercase tracking-widest text-neutral-500"
              >
                Temizle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
