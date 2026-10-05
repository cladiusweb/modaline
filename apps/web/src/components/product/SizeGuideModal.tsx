"use client";

import React from "react";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg p-6 md:p-8 shadow-2xl z-10 space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
          <h3 className="text-sm uppercase tracking-[0.25em] font-editorial font-semibold text-neutral-900">
            Beden Tablosu & Ölçü Rehberi
          </h3>
          <button onClick={onClose} className="p-1 text-neutral-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <p className="text-neutral-500">
            Ölçüler santimetre (cm) cinsindendir. Bedenler standart Avrupa (EU) kalıplarına göre üretilmiştir.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-neutral-200">
              <thead>
                <tr className="bg-neutral-50 uppercase tracking-wider text-[10px] text-neutral-700">
                  <th className="p-2.5 border border-neutral-200">Beden</th>
                  <th className="p-2.5 border border-neutral-200">Göğüs</th>
                  <th className="p-2.5 border border-neutral-200">Bel</th>
                  <th className="p-2.5 border border-neutral-200">Basen</th>
                  <th className="p-2.5 border border-neutral-200">EU</th>
                </tr>
              </thead>
              <tbody className="font-mono text-neutral-800">
                <tr>
                  <td className="p-2.5 border border-neutral-200 font-sans font-semibold">XS</td>
                  <td className="p-2.5 border border-neutral-200">80 - 84</td>
                  <td className="p-2.5 border border-neutral-200">60 - 64</td>
                  <td className="p-2.5 border border-neutral-200">88 - 92</td>
                  <td className="p-2.5 border border-neutral-200">34</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-neutral-200 font-sans font-semibold">S</td>
                  <td className="p-2.5 border border-neutral-200">84 - 88</td>
                  <td className="p-2.5 border border-neutral-200">64 - 68</td>
                  <td className="p-2.5 border border-neutral-200">92 - 96</td>
                  <td className="p-2.5 border border-neutral-200">36</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-neutral-200 font-sans font-semibold">M</td>
                  <td className="p-2.5 border border-neutral-200">88 - 92</td>
                  <td className="p-2.5 border border-neutral-200">68 - 72</td>
                  <td className="p-2.5 border border-neutral-200">96 - 100</td>
                  <td className="p-2.5 border border-neutral-200">38</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-neutral-200 font-sans font-semibold">L</td>
                  <td className="p-2.5 border border-neutral-200">92 - 98</td>
                  <td className="p-2.5 border border-neutral-200">72 - 78</td>
                  <td className="p-2.5 border border-neutral-200">100 - 106</td>
                  <td className="p-2.5 border border-neutral-200">40</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-neutral-200 font-sans font-semibold">XL</td>
                  <td className="p-2.5 border border-neutral-200">98 - 104</td>
                  <td className="p-2.5 border border-neutral-200">78 - 84</td>
                  <td className="p-2.5 border border-neutral-200">106 - 112</td>
                  <td className="p-2.5 border border-neutral-200">42</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-[11px] text-neutral-500">
            * İki beden arasında kararsız kaldıysanız dökümlü ve rahat bir görünüm için bir üst bedeni tercih edebilirsiniz.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-neutral-800"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
