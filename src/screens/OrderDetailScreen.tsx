import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';

interface OrderDetailScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ onNavigate }) => {
  const [milestoneReleased, setMilestoneReleased] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReleaseEscrow = () => {
    setMilestoneReleased(true);
    showToast('Escrow Milestone 3 Approved! ₹4,91,667 released to Kavitha Bio-Knitwear.');
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-lg mx-auto">
      {/* Top Tracker Status Bar */}
      <div className="pt-1 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base text-slate-900 font-extrabold tracking-tight">PO-9402</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eaedff] text-[#3c4a42] uppercase tracking-wider">
            B2B Wholesale
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00c48c]/20 text-[#004a33]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c48c] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006c4b]"></span>
          </span>
          <span className="text-[10px] font-bold">Stage 3 of 4: In-Line QC Passed</span>
        </div>
      </div>

      {/* Commercial Snapshot Card */}
      <div className="mt-1">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[#4d44e3] text-xs font-semibold">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>Kavitha Bio-Knitwear Export</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5 truncate">
                5,000 Organic Cotton Hoodies
              </h2>
              <p className="text-xs text-[#3c4a42] line-clamp-1">
                280 GSM French Terry • Bio-Washed Natural Ecru • Tirupur Hub
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 ring-1 ring-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4OJjzmiqEG2IVy0cj80jOxQzklwD3fPy8FPOksWUWgb__eJKosiwhWhQAmoKoLdFDUh8DEAEmvZLCuTi2GRyH4UkkKqFYi7BVwh3Xl5PR7lmX0hRHijvblNyzFX0AisXH-KBoLHptn-Kp0ZVM_b5taI9_zRIciTFX5CVzkjtGUCprlf0mcNvw1N9tBPX7hSHQYfpV3vkOoflcCn2bkhol9lrm06Y1o3OOwZpRrjc6uF16djnGLE4"
                alt="Organic cotton french terry natural ecru"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Financial Metrics Ribbon */}
          <div className="bg-[#f2f3ff] rounded-xl p-3 grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] text-[#3c4a42] uppercase tracking-wider block font-bold">
                Total PO Value
              </span>
              <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                ₹14,75,000
              </span>
              <span className="text-[10px] text-[#3c4a42]">Incl. 18% GST</span>
            </div>
            <div className="bg-white rounded-lg p-2 flex flex-col justify-center shadow-2xs">
              <div className="flex items-center gap-1 text-[#006c4b]">
                <span className="material-symbols-outlined text-[15px] fill-1">shield</span>
                <span className="text-[10px] font-bold">Lokals Safe Escrow</span>
              </div>
              <span className="text-xs font-bold text-slate-900 mt-0.5">
                {milestoneReleased ? '₹14,75,000 Disbursed' : '₹9,83,333 Secured'}
              </span>
              <span className="text-[10px] text-[#006c4b] font-medium">
                {milestoneReleased ? 'All Milestones Settled' : 'Milestone 2 of 3 Locked'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Visual Production Pipeline */}
      <div className="mt-3.5">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Production Pipeline</h3>
              <p className="text-[11px] text-[#3c4a42]">Real-time IoT telemetry from Mill Unit 04</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#ffddb8] text-[#2a1700] text-[10px] font-bold">
              On Schedule
            </span>
          </div>

          {/* Stepper Vertical */}
          <div className="relative flex flex-col gap-3">
            {/* Connecting Line */}
            <div className="absolute left-[17px] top-4 bottom-6 w-[2px] bg-slate-200"></div>
            <div className="absolute left-[17px] top-4 h-[65%] w-[2px] bg-[#006c4b]"></div>

            {/* Stage 1 */}
            <div className="flex items-start gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-[#006c4b] flex items-center justify-center shrink-0 text-white shadow-xs z-10">
                <span className="material-symbols-outlined text-[17px]">check</span>
              </div>
              <div className="flex-1 bg-[#f2f3ff] rounded-xl p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Stage 1: Yarn &amp; Lab Dip</span>
                  <span className="text-[10px] text-[#006c4b] font-bold">Completed Oct 12</span>
                </div>
                <p className="text-[11px] text-[#3c4a42] mt-0.5">
                  Approved 100% GOTS Certified 30s Combed Cotton. Batch #YD-892.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-start gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-[#006c4b] flex items-center justify-center shrink-0 text-white shadow-xs z-10">
                <span className="material-symbols-outlined text-[17px]">check</span>
              </div>
              <div className="flex-1 bg-[#f2f3ff] rounded-xl p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Stage 2: Knitting &amp; Dyeing</span>
                  <span className="text-[10px] text-[#006c4b] font-bold">Completed Oct 18</span>
                </div>
                <p className="text-[11px] text-[#3c4a42] mt-0.5">
                  24-Gauge Mayer &amp; Cie French Terry knit. Zero-discharge effluent cycle.
                </p>
              </div>
            </div>

            {/* Stage 3 (Active) */}
            <div className="flex items-start gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-[#00c48c] flex items-center justify-center shrink-0 text-[#004a33] ring-4 ring-[#00c48c]/20 shadow-xs z-10">
                <span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>
              </div>
              <div className="flex-1 bg-white rounded-xl p-3 shadow-[0_4px_16px_rgba(0,196,140,0.12)] border border-[#00c48c]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Stage 3: In-Line QC &amp; Tensile
                  </span>
                  <span className="text-[10px] text-[#006c4b] font-bold uppercase tracking-wider">
                    Active Today
                  </span>
                </div>
                <p className="text-[11px] text-[#3c4a42] mt-0.5">
                  Random sampling across 500 bundles. Seam elasticity &amp; shrinkage tests.
                </p>

                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-[#3c4a42] mb-1">
                    <span>Inspection Progress</span>
                    <span className="font-bold text-slate-900">85% Complete</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#00c48c] h-full rounded-full transition-all duration-500"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 4 (Pending) */}
            <div className="flex items-start gap-3 relative opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center shrink-0 text-[#3c4a42] z-10">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              </div>
              <div className="flex-1 bg-[#f2f3ff] rounded-xl p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Stage 4: Weigh-in &amp; Dispatch
                  </span>
                  <span className="text-[10px] text-[#3c4a42]">Scheduled Oct 28</span>
                </div>
                <p className="text-[11px] text-[#3c4a42] mt-0.5">
                  Tamper-evident container sealing and direct freight pickup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Factory Inspection Dossier */}
      <div className="mt-3.5">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Inspection Dossier</h3>
              <p className="text-[11px] text-[#3c4a42]">
                Live audit captures signed by SGS Lead Inspector
              </p>
            </div>
            <div className="flex items-center gap-1 text-[#006c4b] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              <span>SGS Verified</span>
            </div>
          </div>

          {/* Photo Proof Cards Grid */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {/* Thumbnail 1 */}
            <div
              onClick={() => showToast('Full-resolution optical inspection photo opened')}
              className="flex flex-col text-left overflow-hidden rounded-xl bg-[#f2f3ff] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS0-l1m4V4WKbgh7G8wTMUOkfOFtVeYZc9iziPa26HYqUcZdlmkhmZ_wDSs1Xl-5V06R2ILxsbn9KGqfsQQxtpCT9o1vhKNtGy8GIx_TLk8EFQrslRIcV0WlKSNkxcBPFSnnYhzsgyLrRvlDMx6BIFS--Kjlaw4R1rX3Q-oeilXmMFvfxOlU0HG6-1lODHkqNAzEkryCDrbpMC7j1vEwoyS6KD3sxtladBgw_NIISRP-qzIJzbzB8"
                  alt="Greige Roll laser scan"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 right-1 bg-[#006c4b] text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                  PASS
                </span>
              </div>
              <div className="p-1.5">
                <span className="text-[10px] leading-tight font-bold text-slate-900 block truncate">
                  Greige Roll
                </span>
                <span className="text-[9px] text-[#3c4a42] block">Zero flaw count</span>
              </div>
            </div>

            {/* Thumbnail 2 */}
            <div
              onClick={() => showToast('Digital balance weight calibration test: 282g certified')}
              className="flex flex-col text-left overflow-hidden rounded-xl bg-[#f2f3ff] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXovGrIeClVSTANzKo7kervFpnmRnFc0lccM0UR8ac3xON90B9ZY2BZDEI7ayPBcHrQnEwUC7TyFU4qM32ryVWriMbIAXvKPoI9nQto2AHF1UZ568bpCq6Oq5Mid5qlCc9UIO2RRgQzkLmS1unNxfcmnfII6A5d-gYCjjBEKT1P0mzBzPnkSASOfIZVK1yyEszbwH02oD9Lpjn3ttihNZC8YRQXK109DG_o757pxkfH7d8w-vRBt8"
                  alt="GSM Scale balance 282g"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 right-1 bg-[#006c4b] text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                  PASS
                </span>
              </div>
              <div className="p-1.5">
                <span className="text-[10px] leading-tight font-bold text-slate-900 block truncate">
                  GSM Scale: 282g
                </span>
                <span className="text-[9px] text-[#3c4a42] block">Target: 280g ±5</span>
              </div>
            </div>

            {/* Thumbnail 3 */}
            <div
              onClick={() => showToast('Tensile test certificate: 180N seam burst passed')}
              className="flex flex-col text-left overflow-hidden rounded-xl bg-[#f2f3ff] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpRcn1l1GKrlu3qcxnaJVsfdxl-DzX52Z5MU7R8L58KONEQDf9mgOGy5N_pkv_7wAjmemod-6KUl0-OVusnwR_iRxwn1UhLxrm0NfAwsWiGUTkP4pv7JVeFYTdbGYut4yFPDnc6kUs0k8jDrfzNZx6Q5C6R8J7SeRpc1bZTAIOLY7PVBYB2WgzDj5wmEO9a9yKaYHbeSDpkOOgj5tHGyb1iSTR6WN22IQCVlE_92YsMDD11TckJLI"
                  alt="Seam tension test gauge"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 right-1 bg-[#006c4b] text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                  PASS
                </span>
              </div>
              <div className="p-1.5">
                <span className="text-[10px] leading-tight font-bold text-slate-900 block truncate">
                  Seam Tension
                </span>
                <span className="text-[9px] text-[#3c4a42] block">Flute tensile 180N</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => showToast('Downloading SGS Certificate (SGS_PO-9402.pdf)...')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-slate-900 text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[17px] text-[#006c4b]">download</span>
              <span>SGS Cert (PDF)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('inbox')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-slate-900 text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[17px] text-[#4d44e3]">chat</span>
              <span>Message Plant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delivery & Logistics Card */}
      <div className="mt-3.5">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#2a1700] shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <span className="text-[10px] text-[#3c4a42] uppercase tracking-wider block font-bold">
                Carrier Partner
              </span>
              <span className="text-xs font-bold text-slate-900">
                BlueDart Apex Dedicated Freight
              </span>
            </div>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-3 space-y-2">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#006c4b] text-[17px] mt-0.5">schedule</span>
              <div>
                <span className="text-[10px] text-[#3c4a42] block">Est. Arrival Date</span>
                <span className="text-xs font-bold text-slate-900">Oct 30, 2024 (by 18:00 IST)</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#006c4b] text-[17px] mt-0.5">location_on</span>
              <div>
                <span className="text-[10px] text-[#3c4a42] block">Destination Facility</span>
                <span className="text-xs font-semibold text-slate-900">
                  Lokals Bengaluru Central Distribution Hub, Shed 12
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] border-t border-slate-100">
        <div className="flex flex-col gap-2 max-w-lg mx-auto">
          <button
            type="button"
            onClick={handleReleaseEscrow}
            disabled={milestoneReleased}
            className={`w-full py-3.5 px-4 rounded-full text-xs font-bold shadow-[0_6px_20px_rgba(0,196,140,0.3)] transition-all flex items-center justify-center gap-2 ${
              milestoneReleased
                ? 'bg-emerald-800 text-white cursor-default'
                : 'bg-[#00c48c] hover:bg-[#3fdfa5] active:scale-[0.99] text-[#002114]'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">task_alt</span>
            <span>
              {milestoneReleased
                ? 'Milestone 3 Disbursed (₹4,91,667 Settled)'
                : 'Approve Milestone 3 & Release Escrow (₹4,91,667)'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Dispute window opened: SGS Re-test inspector dispatched')}
            className="w-full py-1 text-center text-slate-500 hover:text-[#ba1a1a] text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">report_problem</span>
            <span>Raise QC Dispute / Request Re-test</span>
          </button>
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
