import { Request, Response } from "express";
import { Order } from "../models/Order";
import mongoose from "mongoose";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer, shippingAddress, shippingMethod, paymentMethod, items, subtotal, shippingCost, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Sepetinizde ürün bulunmuyor." });
    }

    const orderNumber = `MDL-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const orderPayload = {
      orderNumber,
      customer,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      items,
      subtotal,
      shippingCost,
      total,
      status: "processing"
    };

    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const newOrder = await Order.create(orderPayload);
      return res.status(201).json({ success: true, data: newOrder });
    }

    return res.status(201).json({
      success: true,
      message: "Sipariş simüle edildi (In-Memory).",
      data: {
        ...orderPayload,
        _id: "sim-" + Date.now(),
        createdAt: new Date()
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
