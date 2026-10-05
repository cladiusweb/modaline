import { Product } from "@/types";

/**
 * Resolves API URLs using Vercel Service Bindings.
 * In Vercel Services, the calling service (`web`) receives the target (`api`)
 * base URL through the bound environment variable `process.env.API_URL`.
 * Falls back to NEXT_PUBLIC_API_URL or local default when running outside Vercel.
 */
export function getApiEndpoint(endpoint: string, queryParams?: URLSearchParams | Record<string, string>): URL {
  const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

  let url: URL;
  if (base.includes("/api/v1")) {
    const subPath = cleanEndpoint.startsWith("api/v1/") ? cleanEndpoint.slice(7) : cleanEndpoint;
    url = new URL(subPath, normalizedBase);
  } else {
    const fullPath = cleanEndpoint.startsWith("api/v1") ? cleanEndpoint : `api/v1/${cleanEndpoint}`;
    url = new URL(fullPath, normalizedBase);
  }

  if (queryParams) {
    const params = queryParams instanceof URLSearchParams ? queryParams : new URLSearchParams(queryParams);
    params.forEach((val, key) => {
      if (val) url.searchParams.set(key, val);
    });
  }

  return url;
}


// Embedded seed products for seamless zero-dependency frontend operation
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Kruvaze Yün Karışımlı Blazer",
    subtitle: "Dökümlü Kesim & Sivri Yaka",
    slug: "kruvaze-yun-karisimli-blazer",
    referenceCode: "4391/710",
    description: "Sessiz lüks estetiğinde, geniş vatkalı omuzlar ve zarif çift sıra boynuz düğmelerle tamamlanan kruvaze kesim blazer. İtalyan dokuma yün karışımı kumaş.",
    composition: {
      material: "%75 İtalyan Yünü, %25 Poliamid. Astar: %100 Kupro Viskon.",
      careInstructions: ["Yalnızca kuru temizleme", "Düşük ısıda ütüleme", "Ağartıcı kullanılmaz"]
    },
    pricing: {
      basePrice: 3850,
      currency: "TRY"
    },
    fitType: "Oversize",
    fabricType: "Yün",
    categorySlug: "ceket-blazer",
    tags: ["new-in", "editorial", "bestseller"],
    completeTheLookSlugs: ["pile-detayli-palazzo-pantolon", "saf-ipek-saten-bustiyer"],
    variants: [
      {
        colorName: "Kemik Beji",
        colorHex: "#D7CBB5",
        slugSuffix: "kemik-beji",
        images: [
          { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400", isFeatured: true },
          { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200" },
          { url: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1200" }
        ],
        sizes: [
          { size: "XS", sku: "BLZ-KEM-XS", stock: 3 },
          { size: "S", sku: "BLZ-KEM-S", stock: 6 },
          { size: "M", sku: "BLZ-KEM-M", stock: 0 },
          { size: "L", sku: "BLZ-KEM-L", stock: 4 },
          { size: "XL", sku: "BLZ-KEM-XL", stock: 1 }
        ]
      },
      {
        colorName: "Kömür Siyahı",
        colorHex: "#1C1C1C",
        slugSuffix: "komur-siyahi",
        images: [
          { url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1200", isFeatured: true },
          { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200" }
        ],
        sizes: [
          { size: "XS", sku: "BLZ-SIY-XS", stock: 4 },
          { size: "S", sku: "BLZ-SIY-S", stock: 5 },
          { size: "M", sku: "BLZ-SIY-M", stock: 2 },
          { size: "L", sku: "BLZ-SIY-L", stock: 0 },
          { size: "XL", sku: "BLZ-SIY-XL", stock: 2 }
        ]
      }
    ]
  },
  {
    id: "prod-2",
    title: "Pile Detaylı Palazzo Pantolon",
    subtitle: "Yüksek Bel & Geniş Paça",
    slug: "pile-detayli-palazzo-pantolon",
    referenceCode: "8214/119",
    description: "Ön cephedeki derin çift pile detayı ve dökümlü paça formu ile kusursuz bacak boyu yanılsaması yaratan yüksek bel palazzo pantolon.",
    composition: {
      material: "%68 Polyester, %28 Viskon, %4 Elastan.",
      careInstructions: ["30 derecede hassas yıkama", "Asarak kurutunuz"]
    },
    pricing: {
      basePrice: 1950,
      currency: "TRY"
    },
    fitType: "Relaxed",
    fabricType: "Keten",
    categorySlug: "pantolon",
    tags: ["new-in", "staple"],
    completeTheLookSlugs: ["kruvaze-yun-karisimli-blazer"],
    variants: [
      {
        colorName: "Bej Melanj",
        colorHex: "#C9B8A3",
        slugSuffix: "bej-melanj",
        images: [
          { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200", isFeatured: true },
          { url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200" }
        ],
        sizes: [
          { size: "XS", sku: "PNT-BEJ-XS", stock: 5 },
          { size: "S", sku: "PNT-BEJ-S", stock: 7 },
          { size: "M", sku: "PNT-BEJ-M", stock: 4 },
          { size: "L", sku: "PNT-BEJ-L", stock: 3 },
          { size: "XL", sku: "PNT-BEJ-XL", stock: 0 }
        ]
      }
    ]
  },
  {
    id: "prod-3",
    title: "Drapeli İpek Saten Elbise",
    subtitle: "Midi Boy & Sırt Dekolteli",
    slug: "drapeli-ipek-saten-elbise",
    referenceCode: "1098/442",
    description: "Verev kesim doğal parlaklığa sahip ipek saten doku. Boyundan bağlamalı zarif drape yaka ve derin çapraz bantlı sırt detayı.",
    composition: {
      material: "%100 Saf Dut İpeği Saten.",
      careInstructions: ["Sadece hassas kuru temizleme", "Buhar ile tersten ütüleyiniz"]
    },
    pricing: {
      basePrice: 4600,
      discountedPrice: 3950,
      currency: "TRY"
    },
    fitType: "Slim",
    fabricType: "İpek",
    categorySlug: "elbise",
    tags: ["editorial", "luxury", "evening"],
    completeTheLookSlugs: ["kruvaze-yun-karisimli-blazer"],
    variants: [
      {
        colorName: "Zümrüt Yeşili",
        colorHex: "#174232",
        slugSuffix: "zumrut-yesili",
        images: [
          { url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200", isFeatured: true },
          { url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200" }
        ],
        sizes: [
          { size: "XS", sku: "DRS-ZUM-XS", stock: 2 },
          { size: "S", sku: "DRS-ZUM-S", stock: 4 },
          { size: "M", sku: "DRS-ZUM-M", stock: 3 },
          { size: "L", sku: "DRS-ZUM-L", stock: 0 },
          { size: "XL", sku: "DRS-ZUM-XL", stock: 1 }
        ]
      },
      {
        colorName: "Şampanya",
        colorHex: "#F2E8DC",
        slugSuffix: "sampanya",
        images: [
          { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200", isFeatured: true }
        ],
        sizes: [
          { size: "XS", sku: "DRS-SMP-XS", stock: 3 },
          { size: "S", sku: "DRS-SMP-S", stock: 5 },
          { size: "M", sku: "DRS-SMP-M", stock: 2 },
          { size: "L", sku: "DRS-SMP-L", stock: 1 },
          { size: "XL", sku: "DRS-SMP-XL", stock: 0 }
        ]
      }
    ]
  },
  {
    id: "prod-4",
    title: "Saf İpek Saten Büstiyer",
    subtitle: "Kare Yaka & İnce Askılı",
    slug: "saf-ipek-saten-bustiyer",
    referenceCode: "3312/090",
    description: "Minimalist silüet, ayarlanabilir ipek askılar ve gizli yan fermuar kapama. Kaban ve blazer içi stilize edilmiş temel lüks katman.",
    composition: {
      material: "%100 İpek.",
      careInstructions: ["Kuru temizleme önerilir"]
    },
    pricing: {
      basePrice: 1450,
      currency: "TRY"
    },
    fitType: "Slim",
    fabricType: "Saten",
    categorySlug: "bustiyer",
    tags: ["staple", "layering"],
    completeTheLookSlugs: ["kruvaze-yun-karisimli-blazer", "pile-detayli-palazzo-pantolon"],
    variants: [
      {
        colorName: "İnci Beyazı",
        colorHex: "#FDFBF7",
        slugSuffix: "inci-beyazi",
        images: [
          { url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200", isFeatured: true }
        ],
        sizes: [
          { size: "XS", sku: "TOP-INC-XS", stock: 4 },
          { size: "S", sku: "TOP-INC-S", stock: 8 },
          { size: "M", sku: "TOP-INC-M", stock: 6 },
          { size: "L", sku: "TOP-INC-L", stock: 2 },
          { size: "XL", sku: "TOP-INC-XL", stock: 0 }
        ]
      }
    ]
  },
  {
    id: "prod-5",
    title: "Çift Yüzlü Kaşmir Trençkot",
    subtitle: "El Dikişli & Geniş Kuşaklı",
    slug: "cift-yuzlu-kasmir-trenckot",
    referenceCode: "9041/220",
    description: "Usta ellerde el dikişiyle birleştirilmiş çift taraflı saf kaşmir kumaş. Astarsız hafif yapısına rağmen üstün ısı yalıtımı.",
    composition: {
      material: "%90 Kaşmir, %10 Yün.",
      careInstructions: ["Özel kaşmir bakımı, Kuru temizleme"]
    },
    pricing: {
      basePrice: 8900,
      currency: "TRY"
    },
    fitType: "Relaxed",
    fabricType: "Kaşmir",
    categorySlug: "kaban-mont",
    tags: ["new-in", "luxury", "iconic"],
    completeTheLookSlugs: ["pile-detayli-palazzo-pantolon"],
    variants: [
      {
        colorName: "Karina Taba",
        colorHex: "#995C3C",
        slugSuffix: "karina-taba",
        images: [
          { url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200", isFeatured: true },
          { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200" }
        ],
        sizes: [
          { size: "XS", sku: "CT-TAB-XS", stock: 2 },
          { size: "S", sku: "CT-TAB-S", stock: 3 },
          { size: "M", sku: "CT-TAB-M", stock: 2 },
          { size: "L", sku: "CT-TAB-L", stock: 1 },
          { size: "XL", sku: "CT-TAB-XL", stock: 0 }
        ]
      }
    ]
  },
  {
    id: "prod-6",
    title: "Doğal Keten Viskon Yelek",
    subtitle: "Kruvaze Yaka & Vurgulu Bel",
    slug: "dogal-keten-viskon-yelek",
    referenceCode: "2819/040",
    description: "Yaz ve geçiş mevsimleri için özel keten-viskon harmanı. Tek başına ya da blazer içerisine giyilebilecek modern maskülen terzilik.",
    composition: {
      material: "%55 Keten, %45 Viskon.",
      careInstructions: ["30 derecede yıkayınız", "Nemliyken ütüleyiniz"]
    },
    pricing: {
      basePrice: 1750,
      currency: "TRY"
    },
    fitType: "Regular",
    fabricType: "Keten",
    categorySlug: "yelek",
    tags: ["new-in", "staple"],
    completeTheLookSlugs: ["pile-detayli-palazzo-pantolon"],
    variants: [
      {
        colorName: "Ham Keten",
        colorHex: "#E2D8C9",
        slugSuffix: "ham-keten",
        images: [
          { url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200", isFeatured: true }
        ],
        sizes: [
          { size: "XS", sku: "VST-HAM-XS", stock: 4 },
          { size: "S", sku: "VST-HAM-S", stock: 5 },
          { size: "M", sku: "VST-HAM-M", stock: 5 },
          { size: "L", sku: "VST-HAM-L", stock: 2 },
          { size: "XL", sku: "VST-HAM-XL", stock: 1 }
        ]
      }
    ]
  }
];

export async function fetchProducts(filters?: Record<string, string>): Promise<Product[]> {
  try {
    const targetUrl = getApiEndpoint("products", filters);
    const res = await fetch(targetUrl, {
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    if (json.data && json.data.length > 0) return json.data;
  } catch (_e) {
    // API not running, use fallback
  }

  // Fallback client filtering
  let results = [...FALLBACK_PRODUCTS];
  if (filters?.category && filters.category !== "tum-urunler") {
    results = results.filter((p) => p.categorySlug === filters.category);
  }
  if (filters?.fabric) {
    results = results.filter((p) => p.fabricType === filters.fabric);
  }
  if (filters?.size) {
    results = results.filter((p) =>
      p.variants.some((v) => v.sizes.some((s) => s.size === filters.size && s.stock > 0))
    );
  }
  if (filters?.sort === "price-asc") {
    results.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
  } else if (filters?.sort === "price-desc") {
    results.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
  }
  return results;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const targetUrl = getApiEndpoint(`products/${slug}`);
    const res = await fetch(targetUrl, {
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    if (json.data) return json.data;
  } catch (_e) {
    // Fallback
  }

  const p = FALLBACK_PRODUCTS.find((item) => item.slug === slug);
  if (!p) return null;

  const completeTheLook = FALLBACK_PRODUCTS.filter((item) =>
    p.completeTheLookSlugs?.includes(item.slug)
  );

  return {
    ...p,
    completeTheLook
  };
}
