export interface VariantSize {
  size: "XS" | "S" | "M" | "L" | "XL";
  sku: string;
  stock: number;
}

export interface ColorVariant {
  colorName: string;
  colorHex: string;
  slugSuffix: string;
  images: Array<{
    url: string;
    altText?: string;
    isFeatured?: boolean;
  }>;
  sizes: VariantSize[];
}

export interface Product {
  id: string;
  _id?: string;
  title: string;
  subtitle?: string;
  slug: string;
  referenceCode: string;
  description: string;
  composition: {
    material: string;
    careInstructions: string[];
  };
  pricing: {
    basePrice: number;
    discountedPrice?: number;
    currency: string;
  };
  fitType: "Slim" | "Regular" | "Relaxed" | "Oversize";
  fabricType: "İpek" | "Keten" | "Yün" | "Pamuk" | "Kaşmir" | "Saten";
  categorySlug: string;
  variants: ColorVariant[];
  tags: string[];
  completeTheLookSlugs?: string[];
  completeTheLook?: Product[];
}

export interface CartItem {
  id: string; // `${productId}-${sku}`
  productId: string;
  title: string;
  referenceCode: string;
  price: number;
  selectedColor: {
    name: string;
    hex: string;
  };
  selectedSize: "XS" | "S" | "M" | "L" | "XL";
  sku: string;
  image: string;
  quantity: number;
  maxStock: number;
}
