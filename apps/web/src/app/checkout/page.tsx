"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Truck, CreditCard, Lock } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

const SHIPPING_PROVIDERS = [
  { id: "yurtici", name: "Yurtiçi Kargo (Standart)", time: "1-2 İş Günü", cost: 0 },
  { id: "kolaygelsin", name: "Kolay Gelsin (Hızlı Teslimat)", time: "Yarın Kapında", cost: 45 },
  { id: "vipkurye", name: "ModaLine VIP Özel Kurye", time: "Bugün 4 Saatte", cost: 120 },
];

export default function CheckoutPage() {
  const { items, getCartSubtotal, clearCart } = useCartStore();
  const subtotal = getCartSubtotal();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Selen Yılmaz",
    email: "selen.yilmaz@example.com",
    phone: "0532 555 12 34",
    city: "İstanbul",
    district: "Beşiktaş",
    addressLine: "Nispetiye Cad. No: 42 D: 8, Levent",
    postalCode: "34340",
    shippingProvider: "yurtici",
    cardHolder: "SELEN YILMAZ",
    cardNumber: "4543 •••• •••• 9012",
    cardExpiry: "08/28",
    cardCvv: "342",
  });

  const selectedShipping = SHIPPING_PROVIDERS.find((p) => p.id === formData.shippingProvider) || SHIPPING_PROVIDERS[0];
  const finalTotal = subtotal + selectedShipping.cost;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as any);
    } else if (step === 3) {
      // Sipariş Tamamla
      setStep(4);
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 md:py-16 text-neutral-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Adım İlerleme Çubuğu */}
        <div className="flex justify-center items-center gap-6 mb-12">
          {[
            { num: 1, label: "Teslimat Adresi" },
            { num: 2, label: "Kargo Seçimi" },
            { num: 3, label: "Ödeme" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium transition ${
                  step === s.num
                    ? "bg-neutral-950 text-white"
                    : step > s.num
                    ? "bg-neutral-200 text-neutral-800"
                    : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </span>
              <span
                className={`text-xs uppercase tracking-wider hidden sm:inline ${
                  step === s.num ? "font-semibold text-neutral-950" : "text-neutral-400"
                }`}
              >
                {s.label}
              </span>
              {s.num < 3 && <div className="w-8 md:w-16 h-px bg-neutral-200 ml-2" />}
            </div>
          ))}
        </div>

        {/* Başarı Ekranı (Adım 4) */}
        {step === 4 ? (
          <div className="max-w-xl mx-auto bg-white p-8 md:p-12 shadow-xs text-center space-y-6 animate-fadeIn border border-neutral-100">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
                Siparişiniz Alındı
              </span>
              <h1 className="text-2xl md:text-3xl font-serif mt-2">
                Teşekkür Ederiz, {formData.fullName.split(" ")[0]}
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                Sipariş Takip Numaranız: <strong className="font-mono text-neutral-900">MDL-928410</strong>
              </p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-md mx-auto">
              Sipariş onayınız ve e-faturanız <span className="font-medium text-neutral-900">{formData.email}</span> adresine gönderildi. Ürününüz hazırlandığında SMS ile bilgilendirileceksiniz.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-block px-8 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* SOL: Adım Formları (7 Kolon) */}
            <div className="lg:col-span-7 bg-white p-6 md:p-10 shadow-xs border border-neutral-100">
              <form onSubmit={handleNext} className="space-y-8">
                
                {/* ADIM 1: ADRES VE İLETİŞİM */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif">Teslimat Adresi & İletişim</h2>
                      <p className="text-xs text-neutral-400 mt-0.5">Siparişinizin ulaştırılacağı adresi giriniz.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">Ad Soyad</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">E-Posta</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">Telefon Numarası</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">İl</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">İlçe</label>
                        <input
                          type="text"
                          required
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">Açık Adres (Cadde, Mahalle, Kapı No)</label>
                        <textarea
                          rows={3}
                          required
                          value={formData.addressLine}
                          onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                          className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ADIM 2: KARGO SEÇİMİ */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif">Kargo & Teslimat Tercihi</h2>
                      <p className="text-xs text-neutral-400 mt-0.5">Siparişinizin nasıl teslim edilmesini istersiniz?</p>
                    </div>

                    <div className="space-y-3">
                      {SHIPPING_PROVIDERS.map((provider) => (
                        <label
                          key={provider.id}
                          className={`flex items-center justify-between p-4 border cursor-pointer transition ${
                            formData.shippingProvider === provider.id
                              ? "border-neutral-950 bg-neutral-50/50 ring-1 ring-neutral-950"
                              : "border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingProvider"
                              value={provider.id}
                              checked={formData.shippingProvider === provider.id}
                              onChange={(e) => setFormData({ ...formData, shippingProvider: e.target.value })}
                              className="accent-black"
                            />
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider text-neutral-900">{provider.name}</p>
                              <p className="text-[11px] text-neutral-500">{provider.time}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-semibold">
                            {provider.cost === 0 ? "Ücretsiz" : formatPrice(provider.cost)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ADIM 3: ÖDEME YÖNTEMİ */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-serif">Güvenli Kart İle Ödeme</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">256-Bit SSL uçtan uca şifreleme ile korunmaktadır.</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1">
                        <Lock size={13} />
                        <span className="font-mono text-[10px]">3D SECURE</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">Kart Üzerindeki İsim</label>
                        <input
                          type="text"
                          required
                          value={formData.cardHolder}
                          onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                          className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black font-mono uppercase"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">Kart Numarası</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black font-mono pl-10"
                          />
                          <CreditCard size={18} className="absolute left-3 top-3 text-neutral-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">Son Kullanma (AA/YY)</label>
                          <input
                            type="text"
                            required
                            placeholder="AA/YY"
                            value={formData.cardExpiry}
                            onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                            className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black font-mono"
                          />
                        </div>
                        <div>
                          <label className="block uppercase tracking-wider text-[10px] text-neutral-500 mb-1">CVV / CVC</label>
                          <input
                            type="password"
                            maxLength={3}
                            required
                            value={formData.cardCvv}
                            onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                            className="w-full border border-neutral-300 p-2.5 focus:outline-hidden focus:border-black font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Butonlar */}
                <div className="flex justify-between items-center pt-6 border-t border-neutral-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((step - 1) as any)}
                      className="flex items-center gap-1 text-xs uppercase tracking-wider text-neutral-600 hover:text-black"
                    >
                      <ArrowLeft size={14} />
                      <span>Geri Dön</span>
                    </button>
                  ) : (
                    <Link href="/" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-black">
                      Alışverişe Dön
                    </Link>
                  )}

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition flex items-center gap-2"
                  >
                    <span>{step === 3 ? "Siparişi Onayla & Öde" : "Devam Et"}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </div>

            {/* SAĞ: Sipariş Özeti (5 Kolon) */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 shadow-xs border border-neutral-100 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 border-b border-neutral-100 pb-4 font-editorial">
                Sipariş Özeti ({items.reduce((acc, cur) => acc + cur.quantity, 0)} Ürün)
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <p className="text-xs text-neutral-400">Sepetinizde ürün bulunmuyor.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className="relative w-14 h-18 bg-neutral-100 shrink-0">
                        <Image
                          src={item.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900 line-clamp-1">{item.title}</h4>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          {item.selectedColor.name} | Beden: {item.selectedSize}
                        </p>
                        <p className="text-[11px] text-neutral-500 font-mono mt-1">
                          {item.quantity} adet x {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="font-mono font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-neutral-100 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Ara Toplam</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Kargo Ücreti</span>
                  <span className="font-mono">
                    {selectedShipping.cost === 0 ? "Ücretsiz" : formatPrice(selectedShipping.cost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-neutral-950 pt-2 border-t border-neutral-100">
                  <span className="font-editorial uppercase tracking-wider">Toplam Tutar</span>
                  <span className="font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-600">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                <span>30 Gün Ücretsiz İade & Güvenli Teslimat Garantisi</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
