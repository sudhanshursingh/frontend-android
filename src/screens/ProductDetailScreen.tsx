import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';
import { PRODUCT_FRENCH_TERRY } from '../data/mockData.ts';

interface ProductDetailScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ onNavigate }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedTierId, setSelectedTierId] = useState('t3');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const product = PRODUCT_FRENCH_TERRY;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Spec #TEX-8821 | 280 GSM French Terry Loopback',
        text: 'Direct mill verified sourcing spec from Kavitha Bio-Knitwear Export.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Spec link copied to clipboard!');
    }
  };

  const handleOrderSwatch = () => {
    showToast('Swatch kit (20x20cm cut + lab dye recipe) reserved! Courier dispatch in 24h.');
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-20 px-4 max-w-5xl mx-auto">
      {/* Top Meta / Identifier Bar */}
      <div className="pt-1 pb-3 flex items-center justify-between border-b border-slate-100">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eaedff] rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#006c4b] animate-pulse"></span>
          <span className="text-[11px] font-bold text-[#3c4a42] uppercase tracking-wider">
            {product.specNumber}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Bookmark specification"
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? 'Spec removed from saved' : 'Spec saved to bookmarks!');
            }}
            className={`w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center transition-all active:scale-95 shadow-xs cursor-pointer ${
              isBookmarked ? 'text-[#006c4b]' : 'text-[#3c4a42] hover:text-[#006c4b]'
            }`}
          >
            <span className={`material-symbols-outlined text-[19px] ${isBookmarked ? 'fill-1' : ''}`}>
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
          <button
            aria-label="Share specification"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3c4a42] hover:text-[#006c4b] transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">share</span>
          </button>
        </div>
      </div>

      {/* Responsive 2-Column Grid on Tablet/Desktop, Stack on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-3">
        {/* Left Column: Visual Showcase & Manufacturer Profile */}
        <div className="md:col-span-6 flex flex-col gap-4">
          {/* Hero Visual Showcase */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#eaedff] shadow-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={product.images[activePhotoIdx].url}
                alt={product.images[activePhotoIdx].alt}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {/* Ambient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 via-transparent to-transparent pointer-events-none"></div>

              {/* Badges Stack */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                <div className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00c48c]"></span>
                  <span className="text-xs text-[#131b2e] font-bold">{product.lotNumber}</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#006c4b] text-white shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span className="text-[10px] font-bold tracking-wide">{product.grade}</span>
                </div>
              </div>

              {/* Bottom Spec Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                <div>
                  <span className="inline-block px-2 py-0.5 mb-1 rounded bg-[#fea619] text-[#684000] text-[10px] uppercase font-bold tracking-wider">
                    {product.tag}
                  </span>
                  <h2 className="text-lg md:text-xl text-white font-bold drop-shadow-sm leading-tight">
                    {product.title}
                  </h2>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-xl text-right shrink-0">
                  <span className="text-[10px] text-white/90 block font-medium">Ready Stock</span>
                  <span className="text-xs text-white font-bold">{product.readyStock}</span>
                </div>
              </div>
            </div>

            {/* Micro Photo Thumbnail Gallery */}
            <div className="p-2.5 bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100 transition-all cursor-pointer ${
                    activePhotoIdx === idx
                      ? 'ring-2 ring-[#006c4b] scale-100 opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View ${img.label} photo`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-[#131b2e]/75 text-white text-[9px] font-bold text-center py-0.5 truncate">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Manufacturer Profile */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#2c16c6] shadow-xs shrink-0">
                  <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {product.mill.name}
                    </h3>
                    <span className="material-symbols-outlined text-[#4d44e3] text-[16px] fill-1" title="GOTS Verified Partner">
                      verified
                    </span>
                  </div>
                  <p className="text-xs text-[#3c4a42] flex items-center gap-1 mt-0.5">
                    <span>{product.mill.location}</span>
                    <span>•</span>
                    <span className="flex items-center text-[#855300] font-bold">
                      <span className="material-symbols-outlined text-[13px] fill-1">star</span>
                      {product.mill.rating}
                    </span>
                    <span className="text-[#3c4a42]">({product.mill.shipments} B2B Shipments)</span>
                  </p>
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-[#00c48c]/20 text-[#004a33] flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[12px]">policy</span>
                <span className="text-[10px] font-bold">Audited</span>
              </div>
            </div>

            {/* Quick Logistics & Sourcing Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-xs font-medium">
                <span className="material-symbols-outlined text-[#006c4b] text-[15px]">inventory_2</span>
                <span>Greige: <strong>{product.mill.greigeReady}</strong></span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-xs font-medium">
                <span className="material-symbols-outlined text-[#4d44e3] text-[15px]">anchor</span>
                <span>{product.mill.portDistance}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-xs font-medium">
                <span className="material-symbols-outlined text-[#fea619] text-[15px]">palette</span>
                <span>Custom Lab Dip Matching</span>
              </div>
            </div>
          </div>

          {/* Assurance Banner */}
          <div className="p-3.5 rounded-2xl bg-[#f2f3ff] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#63fcc0] flex items-center justify-center text-[#002114] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs text-slate-900 font-bold">100% Escrow Quality Protection</h4>
              <p className="text-[11px] text-[#3c4a42] leading-tight">
                3rd party lab inspection test report released before wire release.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Matrix & Tech Specs */}
        <div className="md:col-span-6 flex flex-col gap-5">
          {/* Wholesale Tiered Pricing Matrix */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006c4b] text-[20px]">payments</span>
                <h3 className="text-base text-slate-900 font-bold">Volume Tiered Pricing</h3>
              </div>
              <span className="text-[11px] text-[#3c4a42] font-semibold">Ex-Factory Tirupur</span>
            </div>

            <div className="flex flex-col gap-2">
              {product.priceTiers.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#006c4b] text-white shadow-[0_8px_24px_rgba(0,196,140,0.3)] ring-2 ring-[#00c48c]'
                        : 'bg-white text-slate-900 border border-slate-100 shadow-sm hover:border-[#00c48c]/40'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#63fcc0]/20 pointer-events-none blur-lg"></div>
                    )}
                    <div className="flex items-center gap-3 relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#3c4a42]'
                        }`}
                      >
                        {tier.tier}
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{tier.name}</span>
                          {tier.badge && (
                            <span
                              className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                                isSelected
                                  ? 'bg-white text-[#006c4b]'
                                  : 'bg-amber-100 text-[#684000]'
                              }`}
                            >
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-xs ${
                            isSelected ? 'text-white/80' : 'text-[#3c4a42]'
                          }`}
                        >
                          {tier.range}
                        </div>
                      </div>
                    </div>

                    <div className="text-right relative z-10">
                      <div className="text-base font-bold leading-none">
                        ₹{tier.price}
                        <span
                          className={`text-xs font-normal ${
                            isSelected ? 'text-white/80' : 'text-slate-400'
                          }`}
                        >
                          /pc
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold block mt-0.5 ${
                          isSelected ? 'text-white/90' : 'text-[#006c4b]'
                        }`}
                      >
                        {tier.marginLift || tier.dispatchNote}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scannable 2x2 Technical Spec Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base text-slate-900 font-bold">Technical Mill Specifications</h3>
              <button
                onClick={() => showToast('Downloading Technical Data Sheet (TDS_TEX-8821.pdf)...')}
                className="text-xs text-[#006c4b] font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                TDS PDF
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {product.specifications.map((spec, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center ${spec.iconColor} mb-2 shadow-2xs`}>
                      <span className="material-symbols-outlined text-[17px]">{spec.icon}</span>
                    </div>
                    <span className="text-[10px] text-[#3c4a42] uppercase tracking-wider block font-bold">
                      {spec.title}
                    </span>
                    <p className="text-xs text-slate-900 font-bold mt-0.5 leading-snug">
                      {spec.value}
                    </p>
                  </div>
                  <div className="mt-2 pt-1.5 bg-[#f2f3ff]/60 rounded-lg p-1.5">
                    <span className="text-[10px] text-[#3c4a42] font-medium block truncate">
                      {spec.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fabric Weight Spectrum Interactive Bar */}
          <div>
            <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">Fabric Weight Spectrum</span>
                <span className="text-[11px] font-bold text-[#006c4b]">Midweight All-Season</span>
              </div>
              <p className="text-xs text-[#3c4a42] mb-3 leading-relaxed">
                {product.weightSpectrum.description}
              </p>

              {/* Spectrum Graphic Track */}
              <div className="relative py-2">
                <div className="w-full h-2.5 rounded-full bg-slate-100 flex overflow-hidden">
                  <div className="w-1/3 h-full bg-[#dae2fd]"></div>
                  <div className="w-1/3 h-full bg-[#006c4b]"></div>
                  <div className="w-1/3 h-full bg-[#c3c0ff]"></div>
                </div>
                {/* Position Pin for 280 GSM */}
                <div className="absolute top-1/2 left-[48%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center ring-4 ring-[#006c4b]">
                    <div className="w-2 h-2 rounded-full bg-[#006c4b]"></div>
                  </div>
                </div>
              </div>

              {/* Spectrum Labels */}
              <div className="flex items-center justify-between mt-2 pt-1">
                <div className="text-left">
                  <span className="text-xs text-[#3c4a42] font-bold block">180 GSM</span>
                  <span className="text-[10px] text-slate-400">Summer Tees</span>
                </div>
                <div className="text-center px-2 py-0.5 bg-[#006c4b]/10 rounded-md">
                  <span className="text-xs text-[#006c4b] font-bold block">280 GSM Selected</span>
                  <span className="text-[10px] text-[#006c4b] font-medium">Standard Sweats</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#3c4a42] font-bold block">450 GSM</span>
                  <span className="text-[10px] text-slate-400">Heavy Winter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-4 py-3 border-t border-slate-100">
        <div className="flex items-center gap-2.5 max-w-lg mx-auto">
          <button
            onClick={handleOrderSwatch}
            className="flex-1 py-3 px-3 rounded-full bg-[#f2f3ff] text-slate-800 text-xs font-bold hover:bg-[#eaedff] transition-all active:scale-[0.98] flex items-center justify-center gap-1 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-[#3c4a42]">science</span>
            <span>Order Swatch (₹499)</span>
          </button>
          <button
            onClick={() => onNavigate('rfq-builder')}
            className="flex-[1.25] py-3 px-4 rounded-full bg-[#006c4b] text-white text-xs font-bold hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_6px_20px_rgba(0,196,140,0.35)] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Start Custom RFQ</span>
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Temporary Toast feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#3fdfa5]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
