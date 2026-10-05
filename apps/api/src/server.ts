import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/modaline";

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

app.get("/api/health", (_req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "ok",
    service: "ModaLine RESTful API",
    version: "1.0.0",
    database: isDbConnected ? "connected" : "in-memory-fallback"
  });
});

// Database connection with safe fallback
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✓ MongoDB bağlantısı başarılı.");
  })
  .catch((err) => {
    console.warn("! MongoDB'ye bağlanılamadı. API in-memory koleksiyonu ile hizmet verecektir:", err.message);
  });

app.listen(PORT, () => {
  console.log(`✓ ModaLine API sunucusu http://localhost:${PORT} üzerinde çalışıyor.`);
});

export default app;
