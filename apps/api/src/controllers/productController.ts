import { Request, Response } from "express";
import { Product } from "../models/Product";
import { SEED_PRODUCTS, SeedProduct } from "../data/seedData";
import mongoose from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      size,
      color,
      fabric,
      sort,
      minPrice,
      maxPrice,
      search
    } = req.query;

    const isDbConnected = mongoose.connection.readyState === 1;

    let productsList: any[] = [];

    if (isDbConnected) {
      const query: any = { isActive: true };
      if (category) query.categorySlug = category;
      if (fabric) query.fabricType = fabric;
      if (minPrice || maxPrice) {
        query["pricing.basePrice"] = {};
        if (minPrice) query["pricing.basePrice"].$gte = Number(minPrice);
        if (maxPrice) query["pricing.basePrice"].$lte = Number(maxPrice);
      }
      if (size) {
        query["variants.sizes"] = {
          $elemMatch: { size: size, stock: { $gt: 0 } }
        };
      }
      if (color) {
        query["variants.colorName"] = { $regex: new RegExp(String(color), "i") };
      }

      let dbQuery = Product.find(query);
      if (sort === "price-asc") dbQuery = dbQuery.sort({ "pricing.basePrice": 1 });
      else if (sort === "price-desc") dbQuery = dbQuery.sort({ "pricing.basePrice": -1 });
      else dbQuery = dbQuery.sort({ createdAt: -1 });

      productsList = await dbQuery.lean();
    }

    // Fallback to SEED_PRODUCTS if DB is empty or not connected
    if (productsList.length === 0) {
      let filtered = [...SEED_PRODUCTS];

      if (category) {
        filtered = filtered.filter((p) => p.categorySlug === category);
      }
      if (fabric) {
        filtered = filtered.filter((p) => p.fabricType === fabric);
      }
      if (minPrice) {
        filtered = filtered.filter((p) => p.pricing.basePrice >= Number(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter((p) => p.pricing.basePrice <= Number(maxPrice));
      }
      if (size) {
        filtered = filtered.filter((p) =>
          p.variants.some((v) =>
            v.sizes.some((s) => s.size === size && s.stock > 0)
          )
        );
      }
      if (color) {
        filtered = filtered.filter((p) =>
          p.variants.some((v) =>
            v.colorName.toLowerCase().includes(String(color).toLowerCase())
          )
        );
      }
      if (search) {
        const q = String(search).toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.referenceCode.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }

      if (sort === "price-asc") {
        filtered.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
      } else if (sort === "price-desc") {
        filtered.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
      }

      productsList = filtered;
    }

    return res.json({
      success: true,
      count: productsList.length,
      data: productsList
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;

    let product: any = null;
    if (isDbConnected) {
      product = await Product.findOne({ slug }).lean();
    }

    if (!product) {
      product = SEED_PRODUCTS.find((p) => p.slug === slug);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: "Ürün bulunamadı" });
    }

    // Kombini tamamla ürünlerini getir (Complete the look)
    const completeTheLook = SEED_PRODUCTS.filter((p) =>
      product.completeTheLookSlugs?.includes(p.slug)
    );

    return res.json({
      success: true,
      data: {
        ...product,
        completeTheLook
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const seedDatabase = async (_req: Request, res: Response) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.json({
        success: true,
        message: "MongoDB aktif değil, in-memory veri hazır olarak sunuluyor.",
        count: SEED_PRODUCTS.length
      });
    }

    await Product.deleteMany({});
    await Product.insertMany(SEED_PRODUCTS);

    return res.json({
      success: true,
      message: "Veritabanı başarıyla tohumlandı (seeded).",
      count: SEED_PRODUCTS.length
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
