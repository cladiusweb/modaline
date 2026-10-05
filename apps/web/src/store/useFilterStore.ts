import { create } from "zustand";

interface FilterState {
  category: string;
  size: string;
  color: string;
  fabric: string;
  sort: "newest" | "price-asc" | "price-desc";
  gridCols: 2 | 4;

  setCategory: (cat: string) => void;
  setSize: (size: string) => void;
  setColor: (color: string) => void;
  setFabric: (fabric: string) => void;
  setSort: (sort: "newest" | "price-asc" | "price-desc") => void;
  setGridCols: (cols: 2 | 4) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: "all",
  size: "",
  color: "",
  fabric: "",
  sort: "newest",
  gridCols: 4,

  setCategory: (category) => set({ category }),
  setSize: (size) => set((state) => ({ size: state.size === size ? "" : size })),
  setColor: (color) => set((state) => ({ color: state.color === color ? "" : color })),
  setFabric: (fabric) => set((state) => ({ fabric: state.fabric === fabric ? "" : fabric })),
  setSort: (sort) => set({ sort }),
  setGridCols: (gridCols) => set({ gridCols }),
  resetFilters: () => set({ category: "all", size: "", color: "", fabric: "", sort: "newest" })
}));
