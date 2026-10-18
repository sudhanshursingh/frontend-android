import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';
import { VERIFIED_MILLS } from '../data/mockData.ts';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);

  const categories = [
    {
      id: 'raw-materials',
      name: 'Raw Materials',
      desc: 'Yarn, fabrics, polymers',
      icon: 'texture',
      accentColor: 'text-amber-500 bg-amber-50 group-hover:bg-amber-500',
      dotColor: 'bg-amber-500',
      borderColor: 'hover:border-amber-200',
      targetScreen: 'product-detail' as ScreenName,
    },
    {
      id: 'wholesale',
      name: 'Wholesale',
      desc: 'Apparel, FMCG, lifestyle',
      icon: 'inventory_2',
      accentColor: 'text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600',
      dotColor: 'bg-indigo-600',
      borderColor: 'hover:border-indigo-200',
      targetScreen: 'product-detail' as ScreenName,
    },
    {
      id: 'packaging',
      name: 'Packaging',
      desc: 'Custom mailers, pouches',
      icon: 'deployed_code',
      accentColor: 'text-cyan-600 bg-cyan-50 group-hover:bg-cyan-600',
      dotColor: 'bg-[#00c48c]',
      borderColor: 'hover:border-cyan-200',
      targetScreen: 'rfq-builder' as ScreenName,
    },
    {
      id: 'custom-mfg',
      name: 'Custom Mfg',
      desc: 'OEM/ODM fabrication',
      icon: 'precision_manufacturing',
      accentColor: 'text-orange-500 bg-orange-50 group-hover:bg-orange-500',
      dotColor: 'bg-orange-500',
      borderColor: 'hover:border-orange-200',
      targetScreen: 'rfq-builder' as ScreenName,
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 pb-24 pt-20 max-w-5xl mx-auto">
      {/* Warm Confident Greeting */}
      <section className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 mb-2 self-start px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00c48c] animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-wider text-[#006c4b] font-bold">
              B2B Verified Hub
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            What are you sourcing today?
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Verified Indian manufacturers at direct factory rates.
          </p>
        </div>

        {/* Tactile Search Bar with Filter Trigger */}
        <div className="w-full md:w-96">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-1.5 flex items-center gap-2 pl-3 transition-all duration-200 focus-within:border-[#00c48c] focus-within:ring-2 focus-within:ring-[#00c48c]/15">
            <span className="material-symbols-outlined text-slate-400 text-[22px] select-none">
              search
            </span>
            <input
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none py-1.5"
              placeholder="Search products, raw materials, or mills..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              aria-label="Filter catalogue"
              onClick={() => onNavigate('quotes')}
              className="flex items-center justify-center h-9 w-9 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#00c48c] hover:text-white transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[19px]">tune</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid container for Active Banner & Featured Lot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {/* Compact Active Requirement Pill / Banner */}
        <button
          onClick={() => onNavigate('quotes')}
          className="block text-left group w-full cursor-pointer h-full"
          aria-label="Go to Active RFQ 5,000 Mailer Boxes"
        >
          <div className="bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/70 border border-emerald-100 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3 h-full transition-all duration-200 hover:shadow-md active:scale-[0.99]">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c48c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00c48c]"></span>
              </span>
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs font-bold text-slate-900 truncate">
                  Active RFQ: 5,000 Mailer Boxes
                </span>
                <span className="text-slate-300 shrink-0">•</span>
                <span className="text-[11px] text-[#006c4b] font-bold shrink-0 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  3 Quotes Ready
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-emerald-100 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:bg-[#00c48c] group-hover:text-white transition-all text-slate-600">
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        </button>

        {/* Featured Sourcing Spec Spotlight (French Terry Hoodie) */}
        <div
          onClick={() => onNavigate('product-detail')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00c48c]"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006c4b]">
                Ready Greige Lot #TIR-902B
              </span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-[#006c4b] font-bold px-2 py-0.5 rounded-full">
              Lab Grade A
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgY_zxwDwQu9FncGsyMtLq1QuSVaw-nFqe0N_fQ5ljy2jia1me3zsEN-52iPgg1Tt0-3i8XXJqJQxQ8tPNkiDVhDfLjJF8rdlUpBLKuc4XKaA9JyaPn4-TtJ_h0E24brvsMZIRvDuGkHr4KKsMRpbHlsrKmLUU87fPZuKm7JHIhtVok43El9p3BjZEaL8hlBGQiixE4IJWi_RC9VzbLK0kG9CJ16PS6LFWkOyPhCjZM-uZfM8bL98"
              alt="French Terry Loopback Hoodie"
              className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006c4b] transition-colors truncate">
                280 GSM French Terry Loopback
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                Kavitha Bio-Knitwear • Ready 4.2 MT
              </p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-extrabold text-[#006c4b]">₹295/pc</span>
                <span className="text-[10px] text-slate-400 line-through">₹380/pc</span>
                <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">
                  Tiered Wholesale
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-[#006c4b] group-hover:translate-x-1 transition-all">
              chevron_right
            </span>
          </div>
        </div>
      </div>

      {/* 4 Canonical Sourcing Verticals (2x2 on Mobile, 4 Cols on Tablet/Desktop) */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
            Categories
          </span>
          <span className="text-[11px] text-slate-400 font-semibold">4 Core Verticals</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedVertical(cat.id);
                onNavigate(cat.targetScreen);
              }}
              className={`bg-white rounded-2xl p-4 text-left shadow-xs border border-slate-100 flex flex-col justify-between h-34 transition-all duration-200 hover:shadow-md ${cat.borderColor} active:scale-[0.98] group cursor-pointer`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-2xs ${cat.accentColor}`}
              >
                <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${cat.dotColor}`}></span>
                  <span className="text-sm text-slate-900 leading-snug font-bold">
                    {cat.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-medium">
                  {cat.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Verified Mills Section */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Verified Direct Mills</h2>
            <p className="text-xs text-slate-500 font-medium">Audited production capacities</p>
          </div>
          <button
            onClick={() => onNavigate('product-detail')}
            className="text-xs text-[#006c4b] font-bold hover:text-[#00c48c] flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            See all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VERIFIED_MILLS.slice(0, 2).map((mill) => (
            <div
              key={mill.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 items-center">
                  <img
                    className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-slate-100"
                    alt={mill.name}
                    src={mill.image}
                  />
                  <div className="flex flex-col">
                    <div className="inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-full bg-emerald-50 text-[#006c4b] border border-emerald-100 mb-0.5">
                      <span className="material-symbols-outlined text-[13px] text-[#00c48c]">
                        verified
                      </span>
                      <span className="text-[10px] font-bold">Verified Mill</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{mill.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px] text-slate-400">
                        location_on
                      </span>{' '}
                      {mill.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-xl border border-slate-100/80">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Core Capability
                  </span>
                  <span className="text-xs font-semibold text-slate-900">{mill.coreCapability}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Factory MOQ
                  </span>
                  <span className="text-xs font-bold text-[#006c4b] bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {mill.moq}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => onNavigate('product-detail')}
                  className="flex-1 h-10 rounded-xl bg-slate-100 text-slate-700 text-xs hover:bg-slate-200 transition-colors font-bold cursor-pointer"
                >
                  View Mill Profile
                </button>
                <button
                  onClick={() => onNavigate('rfq-builder')}
                  className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#00c48c] to-[#006c4b] text-white text-xs font-bold shadow-md shadow-[#00c48c]/25 hover:opacity-95 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">edit_note</span>
                  RFQ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Turnkey Bespoke Requirement Card */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#006C4B] rounded-2xl p-5 md:p-8 text-white shadow-xl shadow-slate-900/10 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#63FCC0] border border-white/10 text-[11px] font-bold mb-3">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>Turnkey Sourcing</span>
          </div>
          <h3 className="text-xl md:text-2xl text-white mb-2 font-bold">
            Can't find your exact spec?
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4 font-medium">
            Post drawings, target cost, or physical samples. Receive vetted factory quotes in under 4
            hours.
          </p>
          <button
            onClick={() => onNavigate('rfq-builder')}
            className="w-full sm:w-auto px-6 h-11 rounded-xl bg-[#00C48C] text-[#002114] text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#00C48C]/30 hover:bg-[#63FCC0] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Post Sourcing RFQ</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#00C48C]/20 blur-2xl pointer-events-none"></div>
      </section>
    </div>
  );
};
