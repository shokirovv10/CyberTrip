'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, Shield, Zap, Crown, HelpCircle, ArrowRight, Building, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PricingPage() {
  const [tierType, setTierType] = useState<'individual' | 'business'>('individual');
  const [annualBilling, setAnnualBilling] = useState(false);

  const individualPlans = [
    {
      code: 'FREE',
      name: 'Boshlang\'ich (Free)',
      desc: 'Kiberxavfsizlik olamiga ilk qadam qo\'yuvchilar va talabalar uchun.',
      priceMonthly: 0,
      priceAnnual: 0,
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      buttonText: 'Hozir Boshlash (Bepul)',
      features: [
        { title: 'Asosiy o\'quv yo\'nalishlari (3 ta)', included: true },
        { title: 'Boshlang\'ich laboratoriyalar (10 ta)', included: true },
        { title: 'Brauzerdagi Linux terminali (oyiga 3 soat)', included: true },
        { title: 'CTF asosiy topshiriqlari', included: true },
        { title: 'Ochiq kiber-lug\'at va maqolalar', included: true },
        { title: 'Ilg\'or laboratoriyalar (IDOR, SSRF, RCE)', included: false },
        { title: 'Cheksiz terminal vaqti', included: false },
        { title: 'Pullik turnirlarda qatnashish', included: false },
        { title: 'Rasmiy professional sertifikat', included: false },
        { title: 'Jamoaviy maxfiy chat', included: false },
      ]
    },
    {
      code: 'PRO',
      name: 'Pentester (Pro)',
      desc: 'Amaliy tajriba to\'plash va bug bounty bilan shug\'ullanuvchilar uchun.',
      priceMonthly: 149000,
      priceAnnual: 119000,
      popular: true,
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      buttonText: 'Pro Tarifga O\'tish',
      features: [
        { title: 'Barcha o\'quv yo\'nalishlari (Web, Linux, SOC, Tarmoq)', included: true },
        { title: 'To\'liq laboratoriya kutubxonasi (50+ ta)', included: true },
        { title: 'Kengaytirilgan Linux terminali (oyiga 25 soat)', included: true },
        { title: 'Barcha CTF topshiriqlari va musobaqalar', included: true },
        { title: 'Haftalik kiber-turnirlarda qatnashish', included: true },
        { title: 'Kursni tamomlash sertifikatlari', included: true },
        { title: 'Ilg\'or laboratoriya simulyatorlari va maslahatlar', included: true },
        { title: 'Hamjamiyatning Pro-chat kanali', included: true },
        { title: 'Cheksiz 24/7 shaxsiy cloud VM', included: false },
        { title: '1-ga-1 shaxsiy mentorlik', included: false },
      ]
    },
    {
      code: 'PREMIUM',
      name: 'Kiber-Ekspert (Elite)',
      desc: 'Professional security muhandislari va xavfsizlik bo\'yicha mutaxassislar uchun.',
      priceMonthly: 299000,
      priceAnnual: 239000,
      icon: <Crown className="w-6 h-6 text-purple-400" />,
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      buttonText: 'Elite Imkoniyatlarni Ochish',
      features: [
        { title: 'Barcha ta\'lim, darslar va kod resurslari', included: true },
        { title: 'Cheksiz barcha laboratoriyalar va maxsus ssenariylar', included: true },
        { title: 'Cheksiz shaxsiy Kali Linux bulut terminali (24/7)', included: true },
        { title: 'Barcha xalqaro va mahalliy kiber-turnirlar', included: true },
        { title: 'Xalqaro tekshiruvli professional diplom/sertifikat', included: true },
        { title: 'Karyera va ishga joylashish bo\'yicha tavsiyalar', included: true },
        { title: 'Eksklyuziv Red Team & Blue Team laboratoriyalari', included: true },
        { title: 'Prioritetli 24/7 texnik ko\'mak', included: true },
        { title: 'Jamoaviy turnirlarda sardorlik huquqi', included: true },
        { title: 'Ustoz va murabbiylar paneli kirish huquqi', included: true },
      ]
    }
  ];

  const businessPlans = [
    {
      code: 'TEAM',
      name: 'Kichik Jamoa (Team)',
      desc: 'Startaplar, IT bo\'limlar va kichik xavfsizlik guruhlari uchun (5 o\'rin).',
      priceMonthly: 890000,
      priceAnnual: 710000,
      seats: 5,
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      buttonText: 'Jamoaviy Obuna',
      features: [
        { title: '5 tagacha xodim hisoblari (Seats)', included: true },
        { title: 'Barcha 50+ laboratoriyalar va simulyatorlar', included: true },
        { title: 'Jamoa sardori boshqaruv paneli', included: true },
        { title: 'Topshiriqlar berish va monitoring qilish', included: true },
        { title: 'Xodimlar uchun sertifikatlar verifikatsiyasi', included: true },
        { title: 'Maxsus korporativ audit hisoboti', included: false },
        { title: 'SSO (Single Sign-On) integratsiyasi', included: false },
      ]
    },
    {
      code: 'BUSINESS',
      name: 'Kompaniya (Business)',
      desc: 'Banklar, fintex tashkilotlar va o\'rta korxonalar uchun (15 o\'rin).',
      priceMonthly: 2490000,
      priceAnnual: 1990000,
      popular: true,
      seats: 15,
      icon: <Building className="w-6 h-6 text-emerald-400" />,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      buttonText: 'Business Obuna',
      features: [
        { title: '15 tagacha xodim hisoblari (Seats)', included: true },
        { title: 'Barcha laboratoriyalar va amaliy kurslar', included: true },
        { title: 'Kompaniya boshqaruv paneli (/company)', included: true },
        { title: 'Real vaqtda kiber-xavflar simulyatori', included: true },
        { title: 'Korporativ sertifikatlar va imtihonlar', included: true },
        { title: 'Prioritetli menejer va 24/7 yordam', included: true },
        { title: 'Shartnoma va hisob-faktura (Invoicing)', included: true },
      ]
    },
    {
      code: 'ENTERPRISE',
      name: 'Korxona (Enterprise)',
      desc: 'Yirik korxonalar va davlat tashkilotlari uchun moslashuvchan yechim (50+ o\'rin).',
      priceMonthly: 5990000,
      priceAnnual: 4790000,
      seats: 50,
      icon: <Crown className="w-6 h-6 text-purple-400" />,
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      buttonText: 'Enterprise Tanlash',
      features: [
        { title: '50+ xodim hisoblari va cheksiz kvota', included: true },
        { title: 'Maxsus tayyorlangan kiber-poligon (Cyber Range)', included: true },
        { title: 'Kompaniya tizimlariga mos kiber-hujum ssenariylari', included: true },
        { title: 'SAML / Azure AD / Okta SSO integratsiyasi', included: true },
        { title: 'Shaxsiy Red Team instruktori va oylik seminar', included: true },
        { title: 'To\'liq rasmiy shartnoma va to\'lov hujjatlari', included: true },
        { title: 'Dedicated texnik arxitektor ko\'magi', included: true },
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('uz-UZ');
  };

  const currentPlans = tierType === 'individual' ? individualPlans : businessPlans;

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-16 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Tariflar va Imkoniyatlar
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Kiberxavfsizlik sayohatingiz uchun <span className="text-cyan-400">to'g'ri tarifni</span> tanlang
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Haqiqiy bilim va amaliyot barcha uchun ochiq. Bepul o'rganishni boshlang yoki professional darajaga ko'tarilish uchun ilg'or laboratoriyalarni oching.
          </p>

          {/* Segment Selector: Individual vs Business */}
          <div className="pt-4 flex justify-center">
            <div className="bg-[#0B0F17] border border-gray-800 p-1 rounded-xl flex items-center space-x-1">
              <button
                onClick={() => setTierType('individual')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  tierType === 'individual'
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Jismoniy Shaxslar (Individual)
              </button>
              <button
                onClick={() => setTierType('business')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  tierType === 'business'
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Biznes va Tashkilotlar (Company)
              </button>
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="pt-2 flex items-center justify-center space-x-3">
            <span className={`text-xs font-semibold ${!annualBilling ? 'text-white' : 'text-gray-500'}`}>Oylik to'lov</span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${annualBilling ? 'bg-cyan-500 justify-end' : 'bg-gray-800 justify-start'}`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
            </button>
            <span className={`text-xs font-semibold flex items-center ${annualBilling ? 'text-white' : 'text-gray-500'}`}>
              Yillik to'lov
              <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                -20% chegirma
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {currentPlans.map((p) => {
            const price = annualBilling ? p.priceAnnual : p.priceMonthly;
            const checkoutUrl = p.priceMonthly === 0 
              ? '/auth/register' 
              : `/checkout?plan=${p.code}&billing=${annualBilling ? 'yearly' : 'monthly'}`;

            return (
              <div
                key={p.code}
                className={`relative rounded-2xl bg-[#0B0F17] border flex flex-col p-8 transition-all ${
                  p.popular
                    ? 'border-cyan-500 shadow-2xl shadow-cyan-500/10 lg:-translate-y-2'
                    : 'border-gray-800/80 hover:border-gray-700'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-emerald-400 text-black text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-lg">
                    Eng Ommabop Tanlov
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl">
                    {p.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                    {p.code}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed min-h-[36px]">{p.desc}</p>

                <div className="mb-6 border-b border-gray-800/80 pb-6">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl md:text-4xl font-black text-white">{price === 0 ? '0' : formatPrice(price)}</span>
                    <span className="text-xs text-gray-400 font-semibold">so'm / oyiga</span>
                  </div>
                  {annualBilling && price > 0 && (
                    <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
                      Yiliga {formatPrice(price * 12)} so'm to'lanadi
                    </span>
                  )}
                </div>

                <div className="space-y-3 flex-1 mb-8">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Kiritilgan imkoniyatlar:
                  </span>
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs">
                      {f.included ? (
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={f.included ? 'text-gray-300' : 'text-gray-500'}>
                        {f.title}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href={checkoutUrl} className="w-full">
                  <button
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                      p.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black shadow-lg shadow-cyan-500/20'
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    <span>{p.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bank Card Payment Trust Bar */}
        <div className="bg-[#0B0F17] border border-gray-800/80 rounded-2xl p-6 text-center max-w-4xl mx-auto mb-20 space-y-3 shadow-xl">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 font-medium">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span>Bank Kartalari orqali xavfsiz va tezkor to'lov:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs font-bold text-gray-300">
            <span className="px-3.5 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-blue-400 font-mono">Uzcard</span>
            <span className="px-3.5 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-amber-400 font-mono">Humo</span>
            <span className="px-3.5 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-blue-300 font-mono">Visa</span>
            <span className="px-3.5 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-red-400 font-mono">Mastercard</span>
          </div>
          <p className="text-[11px] text-gray-500 pt-1">
            To'lov ma'lumotlari SSL shifrlangan va tokenlashtirilgan xavfsiz shlyuz orqali amalga oshiriladi.
          </p>
        </div>

        {/* Pricing FAQ */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Tez-tez so'raladigan savollar</h2>
          <div className="space-y-4">
            {[
              { q: 'Bepul tarifda qanday imkoniyatlar mavjud?', a: 'Bepul tarifda siz asosiy yo\'nalishlar, 10 ta amaliy laboratoriya va CTF boshlang\'ich topshiriqlaridan to\'liq bepul foydalanishingiz mumkin.' },
              { q: 'Kompaniya tarifida xodimlarni qanday biriktiramiz?', a: 'Kompaniya yoki Jamoa obunasini xarid qilganingizdan so\'ng, maxsus /company kabineti ochiladi. U yerda xodimlarni email orqali taklif qilib, o\'rinlarni taqsimlashingiz mumkin.' },
              { q: 'Obunani istalgan vaqtda bekor qilsa bo\'ladimi?', a: 'Ha, profilingizdagi obuna sozlamalaridan istalgan vaqtda keyingi oylik to\'lovni to\'xtatib qo\'yishingiz mumkin.' },
              { q: 'Olingan sertifikatlar qanday tekshiriladi?', a: 'Har bir berilgan rasmiy sertifikat unikal ID-ga ega bo\'lib, kompaniyalar va ish beruvchilar /verify/:id manzili orqali uning haqiqiyligini tekshirishlari mumkin.' },
            ].map((faq, i) => (
              <div key={i} className="bg-[#0B0F17] border border-gray-800/80 p-5 rounded-xl space-y-2">
                <h4 className="text-sm font-semibold text-white flex items-center">
                  <HelpCircle className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
