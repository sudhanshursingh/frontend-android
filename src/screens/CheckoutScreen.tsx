import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';

interface CheckoutScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onNavigate }) => {
  const [selectedPayment, setSelectedPayment] = useState<'bank' | 'upi' | 'credit'>('bank');
  const [breakdownOpen, setBreakdownOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAuthorize = () => {
    setIsProcessing(true);
    showToast('Authorizing RBI-compliant escrow vault deposit...');

    setTimeout(() => {
      setIsProcessing(false);
      showToast('Escrow Lock Authorized! PO-9402 generated in Live QC Stage.');
      setTimeout(() => {
        onNavigate('order-detail');
      }, 700);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-lg mx-auto">
      {/* Top Trust & Milestone Pulse Header */}
      <div className="pt-1 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#006c4b]/10 text-[#006c4b]">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
          </span>
          <span className="text-xs text-[#006c4b] font-bold tracking-wide uppercase">
            Escrow Protected Agreement
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#e2e7ff] px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#00c48c] animate-pulse"></span>
          <span className="text-[10px] text-[#3c4a42] font-bold">Step 3 of 3</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-1">
        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="w-16 h-16 rounded-xl bg-slate-100 shrink-0 overflow-hidden relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWC1mttweCE9P4Q8EWLWfHPnrr6BRjFiM6GCDEwzjQLmzVX_iNkcrp-Hbjx7cODJ-k9XcsXHeyEKFm8igbSk9wrByHn_HyIvHC0lQTZuOikZfRksMm_lqANuGRAAprN-tHxR3J_T4zevcQLCyzDaJ_XPcaT82uNxcps0wQgp4uyAygwSR5y8397LvGHpzDKTrAxb-bJA4gFWyD5NrX6dAs-OfaUsUDadyAY8fgVKT5Z5NetrOED-M"
                alt="Custom 3-Ply Mailer Boxes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="bg-[#006c4b]/10 text-[#006c4b] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  5,000 Units
                </span>
                <span className="bg-[#ffddb8] text-[#2a1700] text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  Surat Verified Hub
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 mt-1 truncate">
                Custom 3-Ply Mailer Boxes
              </h2>
              <p className="text-xs text-[#3c4a42] truncate">
                140 GSM Kraft • Single Flexo Ink Branding
              </p>
            </div>
          </div>

          {/* Supplier Mini Strip */}
          <div className="bg-[#f2f3ff] rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#a5a3ff]/40 flex items-center justify-center text-[#2c16c6] shrink-0">
                <span className="material-symbols-outlined text-[16px]">factory</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate">
                  PackCraft Solutions
                </span>
                <span className="text-[10px] text-[#3c4a42] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px] text-[#006c4b] fill-1">
                    verified
                  </span>
                  Surat Industrial Cluster • 4.9★
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 pl-2">
              <span className="text-[10px] text-slate-400 block line-through">₹24.00</span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#006c4b] font-bold">₹23.20</span>
                <span className="text-[10px] text-slate-500">/pc</span>
              </div>
            </div>
          </div>

          {/* Savings Pill Banner */}
          <div className="flex items-center justify-between bg-[#00c48c]/15 px-3 py-1.5 rounded-xl">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006c4b] text-[17px]">celebration</span>
              <span className="text-xs text-[#004a33] font-semibold">Bulk Allocation Advantage</span>
            </div>
            <span className="text-xs font-bold text-[#006c4b] bg-white px-2 py-0.5 rounded-full shadow-2xs">
              ₹4,000 Saved
            </span>
          </div>
        </div>

        {/* Escrow Shield Guarantee Banner */}
        <div className="bg-gradient-to-r from-[#e2e7ff] via-[#eaedff] to-[#f2f3ff] rounded-2xl p-3.5 flex gap-3 items-start shadow-xs relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-[#006c4b] text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xs text-slate-900 font-bold">TheLokals SafeHold Escrow</h3>
            <p className="text-[11px] text-[#3c4a42] mt-0.5 leading-relaxed">
              100% Funds Protected. Money is held securely in an RBI-compliant escrow vault and never
              disbursed directly to factory until you approve lab test reports.
            </p>
          </div>
        </div>

        {/* Smart Milestone Escrow Schedule */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-slate-900 font-bold">Escrow Milestone Plan</h3>
              <p className="text-[11px] text-[#3c4a42]">Pay in 3 stages tied to production proofs</p>
            </div>
            <span className="text-[10px] bg-[#a5a3ff]/30 text-[#4d44e3] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
              Zero Risk
            </span>
          </div>

          <div className="relative flex flex-col gap-2.5 mt-1">
            {/* Connecting Vertical Guide */}
            <div className="absolute left-4 top-5 bottom-6 w-0.5 bg-[#e2e7ff] -translate-x-1/2"></div>

            {/* Milestone 1 (Active / Pay Now) */}
            <div className="relative flex items-start gap-3 bg-[#006c4b]/5 p-3 rounded-xl border border-[#00c48c]/30">
              <div className="w-8 h-8 rounded-full bg-[#006c4b] text-white flex items-center justify-center shrink-0 font-bold text-xs z-10 shadow-xs">
                1
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#006c4b] font-bold uppercase tracking-wide">
                    Deposit Stage 1 • Pay Now
                  </span>
                  <span className="text-sm font-bold text-[#006c4b]">₹20,532</span>
                </div>
                <div className="text-xs font-semibold text-slate-900 mt-0.5">
                  15% Raw Material Lock Deposit
                </div>
                <p className="text-[11px] text-[#3c4a42] mt-0.5">
                  Locks virgin kraft paper pulp prices and initiates flexo plate laser engraving at
                  Surat unit.
                </p>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="relative flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff]/60">
              <div className="w-8 h-8 rounded-full bg-[#e2e7ff] text-[#3c4a42] flex items-center justify-center shrink-0 font-bold text-xs z-10">
                2
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#3c4a42] font-semibold">
                    Milestone 2 • Auto Hold
                  </span>
                  <span className="text-xs font-bold text-slate-900">₹68,440</span>
                </div>
                <div className="text-xs font-medium text-slate-900 mt-0.5">
                  50% Post-Production Lab QC Sign-Off
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Released ONLY after third-party edge crush test (ECT) &amp; burst strength certificate upload.
                </p>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="relative flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff]/60">
              <div className="w-8 h-8 rounded-full bg-[#e2e7ff] text-[#3c4a42] flex items-center justify-center shrink-0 font-bold text-xs z-10">
                3
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#3c4a42] font-semibold">
                    Milestone 3 • Final Release
                  </span>
                  <span className="text-xs font-bold text-slate-900">₹47,908</span>
                </div>
                <div className="text-xs font-medium text-slate-900 mt-0.5">
                  35% Doorstep Delivery &amp; Physical Weigh-in
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Disbursed 48 hours after pallet arrival and count verification at your warehouse.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Commercial Breakdown Accordion */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setBreakdownOpen(!breakdownOpen)}
          >
            <div>
              <h3 className="text-sm text-slate-900 font-bold">Commercial Breakdown</h3>
              <p className="text-[11px] text-[#3c4a42]">Tax invoices &amp; doorstep freight summary</p>
            </div>
            <button
              className="w-7 h-7 rounded-full bg-[#eaedff] flex items-center justify-center text-slate-700 transition-transform"
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] transition-transform ${breakdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
          </div>

          {breakdownOpen && (
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 mt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#3c4a42]">Base Production Cost (5,000 units)</span>
                <span className="font-semibold text-slate-900">₹1,16,000</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#3c4a42]">GST @ 18% (Eligible for ITC Input)</span>
                <span className="font-semibold text-slate-900">₹20,880</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#3c4a42]">Logistics &amp; Doorstep Transit</span>
                  <span className="bg-[#006c4b]/10 text-[#006c4b] text-[10px] px-1.5 py-0.2 rounded font-bold">
                    SUPPLIER PROMO
                  </span>
                </div>
                <span className="font-bold text-[#006c4b]">FREE</span>
              </div>
              <div className="mt-1 pt-2 bg-[#f2f3ff] rounded-xl p-2.5 flex justify-between items-center">
                <div>
                  <span className="text-[11px] text-[#3c4a42] uppercase tracking-wider block font-bold">
                    Total Contract Value
                  </span>
                  <span className="text-[10px] text-slate-400">Inclusive of all duties &amp; insurance</span>
                </div>
                <span className="text-base font-extrabold text-slate-900">₹1,36,880</span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods Selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-slate-900 font-bold">Escrow Funding Method</h3>
              <p className="text-[11px] text-[#3c4a42]">Instant receipt &amp; virtual ledger update</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">lock</span>
          </div>

          <div className="flex flex-col gap-2 mt-0.5">
            {/* Option 1: Bank Transfer (RTGS / NEFT) */}
            <div
              onClick={() => setSelectedPayment('bank')}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                selectedPayment === 'bank'
                  ? 'bg-[#006c4b]/5 border-2 border-[#00c48c]'
                  : 'bg-[#f2f3ff] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedPayment === 'bank' ? 'bg-[#006c4b] text-white' : 'bg-slate-300'
                  }`}
                >
                  {selectedPayment === 'bank' && (
                    <span className="material-symbols-outlined text-[13px]">check</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Bank Transfer (RTGS / NEFT)</span>
                    <span className="bg-[#00c48c] text-[#004a33] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      Zero Fee
                    </span>
                  </div>
                  <span className="text-[10px] text-[#3c4a42]">Instant virtual account escrow allocation</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#006c4b] text-[20px]">account_balance</span>
            </div>

            {/* Option 2: Corporate UPI */}
            <div
              onClick={() => setSelectedPayment('upi')}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                selectedPayment === 'upi'
                  ? 'bg-[#006c4b]/5 border-2 border-[#00c48c]'
                  : 'bg-[#f2f3ff] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedPayment === 'upi' ? 'bg-[#006c4b] text-white' : 'bg-slate-300'
                  }`}
                >
                  {selectedPayment === 'upi' && (
                    <span className="material-symbols-outlined text-[13px]">check</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Corporate UPI / NetBanking</span>
                  <span className="text-[10px] text-[#3c4a42]">ICICI • HDFC • SBI • Axis Business</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-600 text-[20px]">qr_code_scanner</span>
            </div>

            {/* Option 3: Pre-Approved Sourcing Credit */}
            <div
              onClick={() => setSelectedPayment('credit')}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                selectedPayment === 'credit'
                  ? 'bg-[#006c4b]/5 border-2 border-[#00c48c]'
                  : 'bg-[#f2f3ff] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedPayment === 'credit' ? 'bg-[#006c4b] text-white' : 'bg-slate-300'
                  }`}
                >
                  {selectedPayment === 'credit' && (
                    <span className="material-symbols-outlined text-[13px]">check</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Pre-Approved Sourcing Credit</span>
                    <span className="bg-[#fea619] text-[#684000] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      0% INT
                    </span>
                  </div>
                  <span className="text-[10px] text-[#3c4a42]">
                    30-Day PayLater • ₹5,00,000 line available
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#fea619] text-[20px]">credit_score</span>
            </div>
          </div>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 gap-2 mt-0.5">
          <div className="bg-[#f2f3ff] p-2.5 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c4b] text-[18px]">assignment_turned_in</span>
            <div>
              <span className="text-xs text-slate-900 font-bold block">ISO 9001 Certified</span>
              <span className="text-[10px] text-slate-400">Cluster audited batch</span>
            </div>
          </div>
          <div className="bg-[#f2f3ff] p-2.5 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c4b] text-[18px]">policy</span>
            <div>
              <span className="text-xs text-slate-900 font-bold block">Escrow Clause 8.2</span>
              <span className="text-[10px] text-slate-400">Legally binding refund</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Deposit Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] border-t border-slate-100">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#3c4a42] uppercase font-bold tracking-wider">
                Due Today (15% Deposit)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-slate-900">₹20,532</span>
                <span className="text-[11px] text-[#006c4b] font-bold">(Refundable)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400">Remaining Balance</span>
              <span className="text-xs font-bold text-slate-700 block">₹1,16,348</span>
            </div>
          </div>

          <button
            onClick={handleAuthorize}
            disabled={isProcessing}
            className="w-full bg-[#00c48c] hover:bg-[#3fdfa5] active:scale-[0.99] text-[#002114] text-xs font-extrabold py-3.5 px-6 rounded-full shadow-[0_6px_20px_rgba(0,196,140,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">lock</span>
            <span>
              {isProcessing ? 'Securing Escrow Vault...' : 'Authorize Escrow Lock: ₹20,532'}
            </span>
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#3fdfa5]">verified_user</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
