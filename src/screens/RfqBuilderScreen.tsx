import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';

interface RfqBuilderScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const RfqBuilderScreen: React.FC<RfqBuilderScreenProps> = ({ onNavigate }) => {
  const [volume, setVolume] = useState<number>(5000);
  const [landedRate, setLandedRate] = useState<number>(24.5);
  const [lengthVal, setLengthVal] = useState<number>(12);
  const [widthVal, setWidthVal] = useState<number>(10);
  const [heightVal, setHeightVal] = useState<number>(8);
  const [printOption, setPrintOption] = useState<'plain' | 'flexo' | 'litho'>('flexo');
  const [millDispatch, setMillDispatch] = useState<boolean>(true);
  const [clusters, setClusters] = useState<string[]>(['Surat Hub (GJ)', 'NCR Belt (HR/UP)']);
  const [hasDieline, setHasDieline] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const adjustVolume = (delta: number) => {
    setVolume((prev) => Math.max(500, prev + delta));
  };

  const handleBroadcast = () => {
    showToast('RFQ #TL-9482 Broadcast to 18 Verified Mills!');
    setTimeout(() => {
      onNavigate('quotes');
    }, 800);
  };

  const addCluster = () => {
    const hub = prompt('Enter cluster or industrial hub (e.g., Ahmedabad Belt, Tirupur Hub):');
    if (hub && hub.trim()) {
      setClusters([...clusters, hub.trim()]);
      showToast(`Added ${hub.trim()} to RFQ broadcast clusters`);
    }
  };

  const removeCluster = (clusterName: string) => {
    setClusters(clusters.filter((c) => c !== clusterName));
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-20 px-4 max-w-lg mx-auto">
      {/* Milestone / Progress Tracker Area */}
      <div className="pt-1 pb-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#006c4b] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00c48c] animate-pulse"></span>
            Step 2 of 3 (65%)
          </span>
          <span className="text-[11px] text-[#3c4a42] font-semibold flex items-center gap-1 bg-[#e2e7ff] px-2.5 py-0.5 rounded-full">
            Packaging &amp; Services <span className="material-symbols-outlined text-[13px]">chevron_right</span> 3-Ply
          </span>
        </div>

        {/* Micro Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#006c4b] to-[#00c48c] rounded-full transition-all duration-500"
            style={{ width: '65%' }}
          ></div>
        </div>

        {/* Stepper Navigation Capsules */}
        <div className="flex items-center gap-1.5 pt-1">
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#f2f3ff] text-[#3c4a42] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[#006c4b] text-[15px] fill-1">check_circle</span>
            <span>Scope</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#006c4b] text-white text-[11px] font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#63fcc0]"></span>
            <span>Specs &amp; Eco</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#f2f3ff] text-slate-400 text-[11px]">
            <span>Matching</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-1">
        {/* Live Supplier Match Indicator Ribbon */}
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00c48c]/20 via-[#f2f3ff] to-[#a5a3ff]/20 shadow-xs border border-[#00c48c]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#006c4b] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-900 font-bold">18 Audited Corrugators Matched</span>
              <span className="text-[11px] text-[#3c4a42]">Avg first quote turnaround ~ 4.2 hrs</span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#006c4b] animate-ping"></span>
        </div>

        {/* Card 1: Target Economics */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4b] text-[20px]">payments</span>
              <h2 className="text-base text-slate-900 font-bold">Target Economics</h2>
            </div>
            <span className="text-[10px] bg-slate-100 text-[#3c4a42] font-bold px-2 py-0.5 rounded-full">
              Spot Batch
            </span>
          </div>

          {/* Order Volume Selection */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#3c4a42] font-medium">Procurement Volume</span>
              <span className="text-base text-[#006c4b] font-extrabold">
                {volume.toLocaleString()} Units
              </span>
            </div>

            {/* Quick pill presets */}
            <div className="grid grid-cols-4 gap-1.5">
              {[1000, 5000, 10000, 25000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVolume(preset)}
                  className={`py-1.5 text-center text-xs rounded-xl font-bold transition-all ${
                    volume === preset
                      ? 'bg-[#131b2e] text-white shadow-sm'
                      : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-slate-200'
                  }`}
                >
                  {preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>

            {/* Stepper Micro Control */}
            <div className="flex items-center justify-between bg-[#f2f3ff] p-1.5 rounded-xl mt-0.5">
              <button
                type="button"
                onClick={() => adjustVolume(-500)}
                aria-label="Decrease volume by 500 units"
                className="w-9 h-9 rounded-lg bg-white text-slate-800 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="text-xs text-slate-900 font-bold tracking-tight">
                Step ± 500 units
              </span>
              <button
                type="button"
                onClick={() => adjustVolume(500)}
                aria-label="Increase volume by 500 units"
                className="w-9 h-9 rounded-lg bg-white text-slate-800 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>

          {/* Landed Rate & Market Gradient Slider */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#3c4a42] font-medium">Target Landed Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base text-slate-900 font-extrabold">
                  ₹{landedRate.toFixed(2)}
                </span>
                <span className="text-[11px] text-[#3c4a42]">/box</span>
              </div>
            </div>

            <input
              type="range"
              min={23.8}
              max={26.0}
              step={0.1}
              value={landedRate}
              onChange={(e) => setLandedRate(parseFloat(e.target.value))}
              className="w-full accent-[#006c4b] cursor-pointer"
            />

            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1 text-[#855300] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fea619]"></span>
                <span>₹23.80 Aggressive</span>
              </div>
              <span className="text-[#006c4b] font-bold">₹24.50 Benchmark</span>
              <div className="flex items-center gap-1 text-slate-400 font-semibold">
                <span>₹26.00 Standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Dimensions & Substrate */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4b] text-[20px]">straighten</span>
              <h2 className="text-base text-slate-900 font-bold">Dimensions &amp; Substrate</h2>
            </div>
            <span className="text-[10px] text-[#4d44e3] font-bold bg-[#e2e7ff] px-2 py-0.5 rounded-full">
              Inner Specs
            </span>
          </div>

          {/* 3 Dimension Inputs */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#3c4a42] font-semibold">Length (L)</label>
              <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-1.5">
                <input
                  type="number"
                  value={lengthVal}
                  onChange={(e) => setLengthVal(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-slate-900 font-bold outline-none"
                />
                <span className="text-xs text-slate-400">in</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#3c4a42] font-semibold">Width (W)</label>
              <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-1.5">
                <input
                  type="number"
                  value={widthVal}
                  onChange={(e) => setWidthVal(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-slate-900 font-bold outline-none"
                />
                <span className="text-xs text-slate-400">in</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#3c4a42] font-semibold">Height (H)</label>
              <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-1.5">
                <input
                  type="number"
                  value={heightVal}
                  onChange={(e) => setHeightVal(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-slate-900 font-bold outline-none"
                />
                <span className="text-xs text-slate-400">in</span>
              </div>
            </div>
          </div>

          {/* Substrate Detailed Capsule */}
          <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#006c4b] shadow-xs shrink-0">
                <span className="material-symbols-outlined text-[19px]">layers</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-900 font-bold truncate">
                  B-Flute (3mm) • 140 GSM Kraft
                </span>
                <span className="text-[11px] text-[#3c4a42] truncate">
                  Bursting Strength: 12.5 kg/cm² • Top Grade
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Flute calibration spec: 3-Ply 140/120/140 GSM selected')}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors shrink-0 shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
          </div>
        </div>

        {/* Card 3: Print & Artwork Selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4b] text-[20px]">palette</span>
              <h2 className="text-base text-slate-900 font-bold">Print &amp; Artwork</h2>
            </div>
            <span className="text-[10px] text-[#006c4b] font-bold">Dieline Ready</span>
          </div>

          {/* Visual Print Choice Cards */}
          <div className="grid grid-cols-3 gap-2">
            {/* Plain Kraft */}
            <button
              type="button"
              onClick={() => setPrintOption('plain')}
              className={`flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                printOption === 'plain'
                  ? 'bg-[#00c48c]/20 ring-2 ring-[#006c4b] shadow-xs'
                  : 'bg-[#f2f3ff] hover:bg-slate-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 shadow-xs ${
                  printOption === 'plain' ? 'bg-[#006c4b] text-white' : 'bg-white text-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">texture</span>
              </div>
              <span className="text-xs font-bold text-slate-900 leading-tight">Plain Kraft</span>
              <span className="text-[10px] text-slate-400 mt-0.5">No print</span>
            </button>

            {/* Single Flexo */}
            <button
              type="button"
              onClick={() => setPrintOption('flexo')}
              className={`flex flex-col items-center p-2 rounded-xl text-center relative transition-all ${
                printOption === 'flexo'
                  ? 'bg-[#00c48c]/20 ring-2 ring-[#006c4b] shadow-xs'
                  : 'bg-[#f2f3ff] hover:bg-slate-200'
              }`}
            >
              {printOption === 'flexo' && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#006c4b] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[11px] font-bold">check</span>
                </div>
              )}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 shadow-xs ${
                  printOption === 'flexo' ? 'bg-[#006c4b] text-white' : 'bg-white text-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">format_paint</span>
              </div>
              <span className="text-xs font-bold text-slate-900 leading-tight">Single Flexo</span>
              <span className="text-[10px] text-[#006c4b] font-semibold mt-0.5">1-2 Spot colors</span>
            </button>

            {/* Litho-Lam */}
            <button
              type="button"
              onClick={() => setPrintOption('litho')}
              className={`flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                printOption === 'litho'
                  ? 'bg-[#00c48c]/20 ring-2 ring-[#006c4b] shadow-xs'
                  : 'bg-[#f2f3ff] hover:bg-slate-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 shadow-xs ${
                  printOption === 'litho' ? 'bg-[#006c4b] text-white' : 'bg-white text-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">gradient</span>
              </div>
              <span className="text-xs font-bold text-slate-900 leading-tight">Litho-Lam</span>
              <span className="text-[10px] text-slate-400 mt-0.5">High-res CMYK</span>
            </button>
          </div>

          {/* Uploaded Dieline Pill */}
          {hasDieline && (
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#f2f3ff]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold text-[11px] shadow-xs">
                  PDF
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-900 font-semibold truncate">
                    box_dieline_v2.pdf
                  </span>
                  <span className="text-[10px] text-[#3c4a42]">1.4 MB • Vector outlined</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => showToast('Opening dieline CAD vector inspector')}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Preview"
                >
                  <span className="material-symbols-outlined text-[15px]">visibility</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasDieline(false);
                    showToast('Dieline removed. You can re-upload.');
                  }}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#ba1a1a] hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[15px]">delete</span>
                </button>
              </div>
            </div>
          )}
          {!hasDieline && (
            <button
              type="button"
              onClick={() => {
                setHasDieline(true);
                showToast('Dieline attached: box_dieline_v2.pdf');
              }}
              className="py-2.5 px-3 border border-dashed border-[#00c48c] rounded-xl text-center text-xs font-bold text-[#006c4b] hover:bg-emerald-50 transition-colors"
            >
              + Attach 3D CAD or Dieline PDF
            </button>
          )}
        </div>

        {/* Card 4: Audited Mill Dispatch Toggle & Regional Hubs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#fea619]/20 flex items-center justify-center text-[#855300]">
                <span className="material-symbols-outlined text-[16px] fill-1">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-slate-900 font-bold">Audited Mill Dispatch</span>
                <span className="text-[11px] text-[#3c4a42]">
                  Direct mill delivery to reduce intermediary costs
                </span>
              </div>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={millDispatch}
                onChange={(e) => setMillDispatch(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006c4b] shadow-xs"></div>
            </label>
          </div>

          {/* Target Cluster Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] text-[#3c4a42] font-bold uppercase tracking-wider">
              Target Clusters:
            </span>
            {clusters.map((hub) => (
              <div
                key={hub}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e2e7ff] text-slate-900 text-xs font-semibold"
              >
                <span>{hub}</span>
                <button
                  type="button"
                  onClick={() => removeCluster(hub)}
                  className="hover:text-[#ba1a1a] transition-colors flex items-center"
                >
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCluster}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00c48c]/20 text-[#004a33] text-xs font-bold hover:bg-[#00c48c]/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">add</span>
              <span>Add Hub</span>
            </button>
          </div>
        </div>

        {/* Bottom Floating CTA */}
        <div className="mt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleBroadcast}
            className="w-full py-3.5 px-6 rounded-full bg-[#006c4b] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <span>Review &amp; Broadcast RFQ</span>
            <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#3c4a42]">
            <span className="material-symbols-outlined text-[14px] text-[#006c4b] fill-1">shield</span>
            <span>Enterprise Escrow &amp; Quality SLA Guaranteed</span>
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
