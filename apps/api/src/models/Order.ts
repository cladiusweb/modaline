import { Schema, model, Document } from "mongoose";

export interface IOrderItem {
  productId: string;
  sku: string;
  title: string;
  colorName: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    addressLine: string;
    city: string;
    district: string;
    postalCode: string;
  };
  shippingMethod: {
    provider: string; // "Yurtiçi Kargo" | "Kolay Gelsin" | "ModaLine VIP Kurye"
    cost: number;
  };
  paymentMethod: {
    type: "credit_card" | "wire_transfer";
    last4Digits?: string;
  };
  items: IOrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    shippingAddress: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    shippingMethod: {
      provider: { type: String, required: true },
      cost: { type: Number, required: true }
    },
    paymentMethod: {
      type: { type: String, enum: ["credit_card", "wire_transfer"], default: "credit_card" },
      last4Digits: { type: String }
    },
    items: [
      {
        productId: { type: String, required: true },
        sku: { type: String, required: true },
        title: { type: String, required: true },
        colorName: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true }
      }
    ],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", OrderSchema);
