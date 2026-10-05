import { Schema, model, Document, Types } from "mongoose";

export interface IVariantSize {
  size: "XS" | "S" | "M" | "L" | "XL";
  sku: string;
  barcode?: string;
  stock: number;
}

export interface IColorVariant {
  colorName: string;
  colorHex: string;
  slugSuffix: string;
  images: Array<{
    url: string;
    altText?: string;
    isFeatured?: boolean;
  }>;
  sizes: IVariantSize[];
}

export interface IProduct extends Document {
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
  variants: IColorVariant[];
  tags: string[];
  completeTheLookSlugs: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VariantSizeSchema = new Schema<IVariantSize>(
  {
    size: { type: String, enum: ["XS", "S", "M", "L", "XL"], required: true },
    sku: { type: String, required: true },
    barcode: { type: String },
    stock: { type: Number, required: true, default: 0, min: 0 }
  },
  { _id: false }
);

const ColorVariantSchema = new Schema<IColorVariant>(
  {
    colorName: { type: String, required: true },
    colorHex: { type: String, required: true },
    slugSuffix: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String },
        isFeatured: { type: Boolean, default: false }
      }
    ],
    sizes: [VariantSizeSchema]
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    referenceCode: { type: String, required: true, index: true },
    description: { type: String, required: true },
    composition: {
      material: { type: String, required: true },
      careInstructions: [{ type: String }]
    },
    pricing: {
      basePrice: { type: Number, required: true },
      discountedPrice: { type: Number },
      currency: { type: String, default: "TRY" }
    },
    fitType: {
      type: String,
      enum: ["Slim", "Regular", "Relaxed", "Oversize"],
      default: "Regular"
    },
    fabricType: {
      type: String,
      enum: ["İpek", "Keten", "Yün", "Pamuk", "Kaşmir", "Saten"],
      default: "Pamuk"
    },
    categorySlug: { type: String, required: true, index: true },
    variants: [ColorVariantSchema],
    tags: [{ type: String }],
    completeTheLookSlugs: [{ type: String }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);
