import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';
import { QUOTES_LIST } from '../data/mockData.ts';

interface QuotesScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const QuotesScreen: React.FC<QuotesScreenProps> = ({ onNavigate }) => {
  const [filterType, setFilterType] = useState<'all' | 'fastest' | 'lowest'>('all');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('packcraft');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectedQuote = QUOTES_LIST.find((q) => q.id === selectedQuoteId) || QUOTES_LIST[0];

  const filteredQuotes = QUOTES_LIST.filter((q) => {
    if (filterType === 'fastest') return q.dispatchDays <= 5;
    if (filterType === 'lowest') return q.unitPrice <= 23.0;
    return true;
  });

  const handleAcceptQuote = (quoteName: string) => {
    showToast(`Locked preliminary term sheet with ${quoteName}. Transferring to Escrow Checkout...`);
    setTimeout(() => {
      onNavigate('checkout');
    }, 700);
  };

  const handleCounter = (quoteName: string) => {
    showToast(`Opening Direct Mill Negotiation Channel for ${quoteName}...`);
    setTimeout(() => {
      onNavigate('inbox');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-5xl mx-auto">
      {/* RFQ Quick Header Banner */}
      <section className="pt-1 pb-2 flex flex-col gap-1.5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#006c4b] text-[11px] font-bold uppercase tracking-wide">
              <span className="material-symbols-outlined text-[13px] fill-1">verified</span>
              RFQ #TL-9482
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fea619]/20 text-[#684000] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[12px]">timer</span>
              Closes in 14h
            </span>
          </div>
          <button
            onClick={() => showToast('RFQ link copied for procurement team review')}
            className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center text-[#3c4a42] hover:text-[#006c4b] transition-colors cursor-pointer"
            aria-label="Share RFQ"
          >
            <span className="material-symbols-outlined text-[17px]">share</span>
          </button>
        </div>

        <div>
          <h1 className="text-xl md:text-2xl text-slate-900 font-extrabold leading-tight tracking-tight">
            5,000 Custom Mailer Boxes
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#63fcc0] text-[#002114] text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c4b] animate-pulse"></span>
              3 Verified Factory Quotes Received
            </span>
            <span className="text-xs text-[#3c4a42]">E-Flute Corrugated</span>
          </div>
        </div>
      </section>

      {/* Lokals AI Top Recommendation Card */}
      <section className="py-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00c48c]/25 via-[#f2f3ff] to-white p-4 shadow-xs border border-[#00c48c]/20">
          <div className="absolute -right-4 -bottom-6 w-24 h-24 rounded-full bg-[#00c48c]/20 blur-xl pointer-events-none"></div>
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#006c4b] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,196,140,0.35)] shrink-0">
              <span className="material-symbols-outlined text-[20px] fill-1">auto_awesome</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#006c4b] font-bold">
                  Lokals Match Engine
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#63fcc0] text-[#002114] text-[10px] font-bold">
                  99.2% Spec Match
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-900 font-semibold leading-snug">
                PackCraft Solutions delivers fastest turnaround{' '}
                <span className="text-[#006c4b] font-bold">(5 days)</span> with optimal unit
                economics.
              </p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-[#3c4a42]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#006c4b] text-[14px]">electric_bolt</span>
                  Free 3D Die-line
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#006c4b] text-[14px]">check_circle</span>
                  Zero Mold Fee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="pb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#131b2e] text-white'
                : 'bg-[#eaedff] text-[#3c4a42] hover:bg-slate-200'
            }`}
          >
            <span>All Quotes</span>
            <span className="w-4 h-4 rounded-full bg-white text-slate-900 text-[10px] flex items-center justify-center font-bold">
              3
            </span>
          </button>
          <button
            onClick={() => setFilterType('fastest')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              filterType === 'fastest'
                ? 'bg-[#131b2e] text-white'
                : 'bg-[#eaedff] text-[#3c4a42] hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#006c4b]">speed</span>
            <span>Fastest Dispatch</span>
          </button>
          <button
            onClick={() => setFilterType('lowest')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              filterType === 'lowest'
                ? 'bg-[#131b2e] text-white'
                : 'bg-[#eaedff] text-[#3c4a42] hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#855300]">trending_down</span>
            <span>Lowest Price</span>
          </button>
        </div>
      </section>

      {/* Responsive 2-Column Split on Tablet/Desktop, Stack on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-1">
        {/* Left Column: Factory Bid Cards */}
        <div className="md:col-span-7 flex flex-col gap-3.5">
          {filteredQuotes.map((quote) => {
            const isSelected = selectedQuoteId === quote.id;
            return (
              <article
                key={quote.id}
                onClick={() => setSelectedQuoteId(quote.id)}
                className={`rounded-2xl bg-white p-4 shadow-xs border transition-all cursor-pointer flex flex-col gap-3 ${
                  isSelected
                    ? 'border-[#00c48c] ring-2 ring-[#00c48c]/30 shadow-md'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  {quote.isTopPick ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#006c4b] text-white text-[10px] font-bold shadow-[0_2px_8px_rgba(0,196,140,0.3)]">
                      <span className="material-symbols-outlined text-[12px] fill-1">star</span>
                      TOP PICK • BEST VALUE
                    </span>
                  ) : quote.isLowestPrice ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fea619]/20 text-[#684000] text-[10px] font-bold">
                      <span className="material-symbols-outlined text-[12px]">savings</span>
                      LOWEST UNIT PRICE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#3c4a42] text-[10px] font-bold">
                      STANDARD OFFER
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3c4a42] text-[10px] font-bold">
                    {quote.grade}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base text-slate-900 font-bold">{quote.supplierName}</h3>
                      <span className="material-symbols-outlined text-[#006c4b] text-[17px] fill-1">
                        check_circle
                      </span>
                    </div>
                    <span className="text-xs text-[#3c4a42] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px] text-slate-400">
                        location_on
                      </span>
                      {quote.location} • {quote.rating}★ ({quote.ordersCount}+ orders)
                    </span>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xl text-[#006c4b] font-extrabold leading-none">
                      ₹{quote.unitPrice.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">per unit</span>
                  </div>
                </div>

                {/* Factory spec highlights */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#f2f3ff] text-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#3c4a42]">Total Value</span>
                    <span className="text-xs text-slate-900 font-bold">
                      ₹{quote.totalValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#3c4a42]">Dispatch</span>
                    <span className="text-xs text-[#006c4b] font-bold flex items-center justify-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">bolt</span>{' '}
                      {quote.dispatchLabel}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#3c4a42]">Sampling</span>
                    <span className="text-xs text-[#855300] font-bold">{quote.sampling}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcceptQuote(quote.supplierName);
                    }}
                    className="flex-1 h-11 rounded-full bg-[#006c4b] hover:bg-[#004a33] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,196,140,0.3)] transition-transform active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px]">done_all</span>
                    Accept &amp; Book Sample
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCounter(quote.supplierName);
                    }}
                    aria-label={`Chat with ${quote.supplierName}`}
                    className="w-11 h-11 rounded-full bg-[#eaedff] hover:bg-[#dae2fd] flex items-center justify-center text-[#131b2e] transition-colors shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[19px]">chat</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right Column: Comparative Bid Matrix Audit */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006c4b] text-[20px]">analytics</span>
              <h2 className="text-base text-slate-900 font-bold">Bid Matrix Audit</h2>
            </div>
            <span className="text-[11px] text-[#3c4a42] font-semibold">Live benchmark</span>
          </div>

          {/* Landed Cost Benchmark Bar */}
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-900 font-bold">Landed Cost / Piece</span>
              <span className="text-[11px] text-[#006c4b] font-bold">Save ₹12,000 max vs market</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Apex */}
              <div className="flex items-center gap-2">
                <span className="w-20 text-xs text-[#3c4a42] truncate font-medium">Apex</span>
                <div className="flex-1 h-3 rounded-full bg-[#eaedff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#fea619]" style={{ width: '78%' }}></div>
                </div>
                <span className="w-14 text-right text-xs font-bold text-slate-900">₹22.80</span>
              </div>

              {/* PackCraft */}
              <div className="flex items-center gap-2">
                <span className="w-20 text-xs text-[#006c4b] font-bold truncate">PackCraft ★</span>
                <div className="flex-1 h-3 rounded-full bg-[#eaedff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#00c48c]" style={{ width: '86%' }}></div>
                </div>
                <span className="w-14 text-right text-xs font-bold text-[#006c4b]">₹24.00</span>
              </div>

              {/* Shree K */}
              <div className="flex items-center gap-2">
                <span className="w-20 text-xs text-[#3c4a42] truncate font-medium">Shree K.</span>
                <div className="flex-1 h-3 rounded-full bg-[#eaedff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#bbcac0]" style={{ width: '95%' }}></div>
                </div>
                <span className="w-14 text-right text-xs font-bold text-slate-900">₹25.20</span>
              </div>
            </div>
          </div>

          {/* Factory Lead Time Blocks */}
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-900 font-bold">Factory Lead Time</span>
              <span className="text-[11px] text-[#3c4a42]">Dispatch SLA</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col items-center justify-center text-center">
                <span className="text-[11px] text-[#3c4a42]">Apex</span>
                <span className="text-sm text-slate-900 font-bold mt-0.5">8 Days</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Standard</span>
              </div>
              <div className="p-3 rounded-xl bg-[#63fcc0]/35 border border-[#00c48c]/30 flex flex-col items-center justify-center text-center shadow-xs">
                <span className="text-[11px] text-[#006c4b] font-bold">PackCraft</span>
                <span className="text-sm text-[#006c4b] font-extrabold mt-0.5">5 Days</span>
                <span className="inline-flex items-center gap-0.5 text-[10px] text-[#002114] font-bold mt-0.5">
                  <span className="material-symbols-outlined text-[12px]">bolt</span> Express
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col items-center justify-center text-center">
                <span className="text-[11px] text-[#3c4a42]">Shree K</span>
                <span className="text-sm text-slate-900 font-bold mt-0.5">7 Days</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Regional</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Commercial Summary Bar */}
      <aside className="fixed bottom-16 left-0 right-0 z-40 px-4 py-2 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-slate-100">
        <div className="flex items-center justify-between gap-3 max-w-5xl mx-auto">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-xs text-slate-900 font-bold truncate">
                {selectedQuote.supplierName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c48c] shrink-0"></span>
              <span className="text-xs text-[#3c4a42] shrink-0">5,000 pcs</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base text-[#006c4b] font-extrabold">
                ₹{selectedQuote.totalValue.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                (₹{selectedQuote.unitPrice.toFixed(2)}/pc)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCounter(selectedQuote.supplierName)}
              className="h-10 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">tune</span>
              Counter
            </button>
            <button
              onClick={() => handleAcceptQuote(selectedQuote.supplierName)}
              className="h-10 px-4 rounded-full bg-[#006c4b] hover:bg-[#004a33] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,196,140,0.35)] transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] fill-1">check</span>
              Accept &amp; Book
            </button>
          </div>
        </div>
      </aside>

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#3fdfa5]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
