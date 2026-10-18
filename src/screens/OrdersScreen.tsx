import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';

interface OrdersScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'production' | 'samples' | 'completed'>('production');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-24 pt-20 px-4 max-w-lg mx-auto">
      {/* Interactive Segment Tabs */}
      <div className="pt-1 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('production')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-transform active:scale-95 ${
            activeTab === 'production'
              ? 'bg-[#131b2e] text-white shadow-xs'
              : 'bg-[#f2f3ff] text-[#3c4a42] hover:bg-slate-200'
          }`}
        >
          <span>In Production</span>
          <span className="w-5 h-5 rounded-full bg-[#00c48c] text-[#002114] text-[10px] flex items-center justify-center font-extrabold">
            2
          </span>
        </button>

        <button
          onClick={() => setActiveTab('samples')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
            activeTab === 'samples'
              ? 'bg-[#131b2e] text-white shadow-xs'
              : 'bg-[#f2f3ff] text-[#3c4a42] hover:bg-slate-200'
          }`}
        >
          <span>Samples &amp; Swatches</span>
          <span className="w-5 h-5 rounded-full bg-[#fea619] text-[#2a1700] text-[10px] flex items-center justify-center font-extrabold">
            1
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
            activeTab === 'completed'
              ? 'bg-[#131b2e] text-white shadow-xs'
              : 'bg-[#f2f3ff] text-[#3c4a42] hover:bg-slate-200'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Primary Active Order Hero Card (PO-9402) */}
      <div className="mt-2">
        <div
          onClick={() => onNavigate('order-detail')}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        >
          {/* Glow backdrop accent */}
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#63fcc0]/20 blur-3xl pointer-events-none"></div>

          {/* Top Row: Meta Tags & Value */}
          <div className="flex items-center justify-between gap-2 relative z-10 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#3c4a42] font-bold tracking-tight">PO-9402</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00c48c]/20 text-[#006c4b] text-[10px] font-bold animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c48c]"></span>
                Live QC
              </span>
            </div>
            <div className="text-base text-slate-900 font-extrabold tracking-tight">
              ₹14,750,000
            </div>
          </div>

          {/* Product Headline */}
          <div className="relative z-10 mb-1">
            <h2 className="text-base text-slate-900 font-bold leading-tight">
              5,000 Organic Cotton Hoodies
            </h2>
            <p className="text-xs text-[#3c4a42] mt-0.5">
              280 GSM French Terry • Bio-Washed Natural Ecru
            </p>
          </div>

          {/* Supplier Info & Hub Badge */}
          <div className="flex items-center gap-2 mt-2 mb-3 relative z-10">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#006c4b] font-bold">
              <span className="material-symbols-outlined text-[15px]">factory</span>
            </div>
            <span className="text-xs text-slate-900 font-semibold">Kavitha Bio-Knitwear</span>
            <span className="text-slate-300">•</span>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#e2dfff] text-[#3323cc] text-[10px] font-semibold">
              <span className="material-symbols-outlined text-[12px] text-[#4d44e3] fill-1">verified</span>
              Tirupur Hub
            </div>
          </div>

          {/* Escrow Status Ribbon */}
          <div className="w-full bg-gradient-to-r from-[#006c4b]/10 via-[#00c48c]/20 to-[#006c4b]/10 rounded-xl p-2.5 flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#006c4b] flex items-center justify-center shadow-xs shrink-0 text-white">
                <span className="material-symbols-outlined text-[16px]">lock</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#006c4b] font-bold uppercase tracking-wider">
                  Milestone 2 of 3 Secured
                </span>
                <span className="text-xs text-slate-900 font-medium leading-none mt-0.5">
                  TheLokals Smart Escrow Reserve
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006c4b] text-[19px]">verified</span>
          </div>

          {/* Manufacturing Pipeline Stepper */}
          <div className="w-full bg-[#f2f3ff] rounded-xl p-3 relative z-10 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006c4b] animate-ping"></span>
                <span className="text-xs text-slate-900 font-bold">
                  Stage 3 of 4: Quality &amp; Flute Test
                </span>
              </div>
              <span className="text-xs text-[#006c4b] font-extrabold">85% Complete</span>
            </div>

            {/* Progress Bar with Glowing Head */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative mb-2.5">
              <div
                className="h-full bg-gradient-to-r from-[#006c4b] to-[#00c48c] rounded-full relative"
                style={{ width: '85%' }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/80 rounded-full blur-[1px]"></div>
              </div>
            </div>

            {/* Milestones Compact Checklist */}
            <div className="space-y-1.5 mt-1">
              <div className="flex items-center justify-between text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006c4b] text-[17px] fill-1">
                    check_circle
                  </span>
                  <span className="text-xs text-[#3c4a42] font-medium">Yarn &amp; Lab Dip Approval</span>
                </div>
                <span className="text-[11px] text-slate-400">Oct 12</span>
              </div>

              <div className="flex items-center justify-between text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006c4b] text-[17px] fill-1">
                    check_circle
                  </span>
                  <span className="text-xs text-[#3c4a42] font-medium">Circular Knitting &amp; Dyeing</span>
                </div>
                <span className="text-[11px] text-slate-400">Oct 18</span>
              </div>

              <div className="flex items-center justify-between text-slate-900">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-[#006c4b] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#006c4b] animate-pulse"></div>
                  </div>
                  <span className="text-xs text-slate-900 font-bold">Quality &amp; Tensile Flute Test</span>
                </div>
                <span className="text-xs text-[#006c4b] font-bold">In Progress</span>
              </div>

              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-[17px]">
                    radio_button_unchecked
                  </span>
                  <span className="text-xs text-[#3c4a42] font-medium">
                    Final Dispatch &amp; Escrow Release
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Oct 28</span>
              </div>
            </div>
          </div>

          {/* Factory Live QC Dossier */}
          <div className="relative z-10 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-900 font-bold">Factory QC Dossier</span>
              <span className="text-[10px] text-[#006c4b] font-bold flex items-center gap-0.5">
                Updated 2h ago <span className="material-symbols-outlined text-[13px]">bolt</span>
              </span>
            </div>

            {/* 3 Visual Inspection Image Cards */}
            <div className="grid grid-cols-3 gap-2">
              {/* QC Card 1 */}
              <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-square shadow-2xs group">
                <img
                  className="w-full h-full object-cover"
                  alt="Greige Roll inspection"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCwfRFzjpq3Oe4QmyYJqhk9YT4g2bDbarviSAOa_jGKGFVLvu6ag0kQOd8Om-qhv6JqPhMnDLLvkMVx366Ptz6-zlpS_LniZ7ecajkbdSYvTpmtOJ-RuVEg2O3hdLVSdFNz4Fs2varTN_kkPLCEIf5lYBdEpJyl4oLwHO_f9VlZ2UvCtZam-HFW2L0Tk6ldQ0dTG8oliCEXUQwESN-hXKs59Mc5dQdxQwBJaXOlvlFALZqzgz_mRI"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-transparent to-transparent flex flex-col justify-between p-1.5">
                  <span className="self-start inline-flex items-center px-1.5 py-0.2 rounded bg-[#00c48c] text-[#002114] text-[9px] font-bold shadow-xs">
                    ✓ Pass
                  </span>
                  <span className="text-[10px] text-white font-medium truncate">Greige Roll</span>
                </div>
              </div>

              {/* QC Card 2 */}
              <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-square shadow-2xs group">
                <img
                  className="w-full h-full object-cover"
                  alt="Scale 282g balance test"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjBecvsIylmak54obUXPQ774Y9GGUbYIeMo3PhTJUyymG_muHN4IA4s0H_efkOHP31hzstCOpWtdgOw178feTw29u1XSnlKvdJFoTNNxvOMATW_g1id2YJoJ006XKsyDNO3spaWYiYa-jUF1_AEz5cz3Lx3-CjTfqezm15lj5CTWxLZEvtFPPfz58iIAky72dIlWpJNR7SUohg3o1T5AFY9ZeZdsYbc2FCYch5lCVyNi8Uon-kcmo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-transparent to-transparent flex flex-col justify-between p-1.5">
                  <span className="self-start inline-flex items-center px-1.5 py-0.2 rounded bg-[#00c48c] text-[#002114] text-[9px] font-bold shadow-xs">
                    ✓ Pass
                  </span>
                  <span className="text-[10px] text-white font-medium truncate">Scale: 282g</span>
                </div>
              </div>

              {/* QC Card 3 */}
              <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-square shadow-2xs group">
                <img
                  className="w-full h-full object-cover"
                  alt="Stitch tension gauge inspection"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoWw_vAJv7x0nWYBjecjViYfWsjjVgNqu2MOAm_iVREylQi_a0F6hADuqIbtu_LMZ7C3Nh8wAqx_UaEEnzfSW7iSlcwDPiF1F24AWyQK8nLA4dKHWfwnabbe_kRUvBRUfMQd4C890yfke2Fo16ZBTJgtv6LmHsTlyWVF9mCJ-V-MaX4EdYsyXfLU6SjMP9IVP-ehfj6uBCTYyW3AzoAtDsjqoXeXxjnnBXztiW3kBZT1R-YzvLtvw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-transparent to-transparent flex flex-col justify-between p-1.5">
                  <span className="self-start inline-flex items-center px-1.5 py-0.2 rounded bg-[#00c48c] text-[#002114] text-[9px] font-bold shadow-xs">
                    ✓ Pass
                  </span>
                  <span className="text-[10px] text-white font-medium truncate">Stitch Tension</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3 relative z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showToast('Downloading SGS Inspection Audit Report (SGS_9402.pdf)...');
              }}
              className="h-10 px-3 rounded-full bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd] transition-colors text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-[#006c4b] text-[18px]">verified</span>
              SGS Lab Report
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('inbox');
              }}
              className="h-10 px-3 rounded-full bg-[#006c4b] text-white hover:bg-[#004a33] transition-all shadow-[0_4px_16px_rgba(0,196,140,0.3)] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Message Plant
            </button>
          </div>
        </div>
      </div>

      {/* Secondary In-Transit Order Card (PO-9114) */}
      <div className="mt-4">
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#3c4a42] font-bold">PO-9114</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-[10px] font-bold">
                <span className="material-symbols-outlined text-[13px] text-[#4d44e3]">local_shipping</span>
                In Transit
              </span>
            </div>
            <div className="text-base text-slate-900 font-extrabold tracking-tight">
              ₹2,40,000
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-[#855300]">
              <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs text-slate-900 font-bold truncate">
                10,000 3-Ply Kraft Shipping Boxes
              </h3>
              <p className="text-xs text-[#3c4a42] flex items-center gap-1 mt-0.5">
                <span className="text-[#4d44e3] font-bold">BlueDart Express Air</span>
                <span>•</span>
                <span>ETA Tomorrow 4:00 PM</span>
              </p>
            </div>
          </div>

          {/* Quick AWB Tracker Banner */}
          <div className="mt-3 flex items-center justify-between bg-[#f2f3ff] rounded-xl p-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4b] text-[18px]">flight_takeoff</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#3c4a42]">AWB #772910488</span>
                <span className="text-xs text-slate-900 font-semibold">Departed BLR Hub</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Tracking AWB #772910488: Flight landed, out for hub dispatch')}
              className="px-3 py-1.5 rounded-full bg-white text-[#006c4b] text-xs font-bold shadow-xs hover:shadow active:scale-95 transition-all"
            >
              Track AWB
            </button>
          </div>
        </div>
      </div>

      {/* TheLokals Escrow Shield 100% Protected Trust Banner */}
      <div className="mt-4 mb-2">
        <div className="w-full bg-gradient-to-r from-[#e2e7ff] via-[#eaedff] to-[#e2e7ff] rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00c48c] text-[#002114] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[22px]">gavel</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-900 font-extrabold tracking-tight">
                TheLokals Escrow Shield
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#006c4b] text-white text-[9px] font-bold">
                100% Protected
              </span>
            </div>
            <p className="text-[11px] text-[#3c4a42] leading-tight mt-0.5">
              Funds are only disbursed after digital SGS sign-off &amp; factory weigh-in confirmation.
            </p>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#3fdfa5]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
