import { Router } from "express";
import { getProducts, getProductBySlug, seedDatabase } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/seed", seedDatabase);
router.get("/:slug", getProductBySlug);

export default router;
