import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types/index.ts';

interface LoginScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [phoneNumber, setPhoneNumber] = useState('98765 43210');
  const [otpDigits, setOtpDigits] = useState<string[]>(['8', '4', '2', '9', '0', '1']);
  const [activeSlot, setActiveSlot] = useState(3);
  const [secondsLeft, setSecondsLeft] = useState(26);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleVerify = () => {
    setIsVerifying(true);
    showToast('Validating 6-digit OTP & Trade License...');

    setTimeout(() => {
      setIsVerifying(false);
      showToast('Welcome Rahul Mehta (UrbanAttire Brands)! Signed in.');
      setTimeout(() => {
        onNavigate('buyer-profile');
      }, 700);
    }, 900);
  };

  const handleWhatsAppAuth = () => {
    showToast('WhatsApp Business 1-Tap OTP authenticated!');
    setTimeout(() => {
      onNavigate('buyer-profile');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-24 pt-20 px-4 max-w-lg mx-auto">
      {/* Brand Atmosphere Ambient Glow */}
      <div className="relative w-full pt-1 pb-3 flex flex-col items-center text-center">
        <div className="absolute -top-4 w-56 h-36 bg-[#00c48c]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Verified B2B Brand Capsule */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e2e7ff] shadow-xs mb-2.5">
          <div className="w-5 h-5 rounded-full bg-[#006c4b] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[13px] fill-1">storefront</span>
          </div>
          <span className="text-xs font-bold text-slate-900 tracking-tight">TheLokals</span>
          <span className="w-1 h-1 rounded-full bg-slate-400"></span>
          <span className="text-[10px] text-[#006c4b] font-bold uppercase tracking-wider">
            B2B SOURCING
          </span>
        </div>

        {/* Tagline & Value Prop */}
        <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#f2f3ff] mb-2">
          <span className="material-symbols-outlined text-[13px] text-[#006c4b] fill-1">verified_user</span>
          <span className="text-[10px] text-[#3c4a42] font-semibold">
            Direct Indian Mills • Factory Escrow
          </span>
        </div>

        {/* Screen Title */}
        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">Enter mobile number</h2>
        <p className="text-xs text-[#3c4a42] mt-0.5 max-w-xs font-medium">
          We'll send an instant 6-digit verification code
        </p>
      </div>

      {/* Sourcing Buyer Benefit Highlight Card */}
      <div className="w-full bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 mb-3.5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbvMXBgulLEMrZxbfBYOtGeCKT_9hl5m3d8vZvJC5xB0loesJdTXUSBR2rNHQU_XHbFW_PJrkdLO6b2mHW2U0MIIcTxq9w25pjRT9f-QXuXMSZ0vjm2S7wYjSuCTmjVxXi2zWBPXPsIpAd2CcpP3iB8ZSwpxGdZJCPE0E8w83R0GSdIIoKqAt4D9ZqLikZrWLYIYbOjsctKMDoXqdQdnrpzpbw43ki6KgRdEIEwlRDKDnr7Gs0_AQ"
            alt="Direct Indian mills loom machinery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-900 truncate">
              Wholesale Procurement Gateway
            </span>
            <span className="material-symbols-outlined text-[15px] text-[#006c4b] fill-1">
              check_circle
            </span>
          </div>
          <p className="text-[11px] text-[#3c4a42] truncate">
            Zero-brokerage rates for verified trade buyers
          </p>
        </div>
      </div>

      {/* Input & Verification Form Card */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3.5">
        {/* Step 1: Mobile Phone Number Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900">Registered Mobile</label>
            <span className="text-[10px] text-[#006c4b] font-bold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c48c] animate-pulse"></span>
              Instant OTP
            </span>
          </div>

          <div className="relative flex items-center w-full h-12 rounded-xl bg-[#f2f3ff] px-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00c48c]">
            {/* India Country Prefix */}
            <div className="flex items-center gap-1 pr-2 mr-2 bg-[#e2e7ff]/70 py-1 px-2 rounded-lg shrink-0">
              <span className="text-sm">🇮🇳</span>
              <span className="text-xs font-bold text-slate-900">+91</span>
              <span className="material-symbols-outlined text-[15px] text-slate-500">arrow_drop_down</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-transparent text-sm tracking-wide text-slate-900 font-bold outline-none"
              placeholder="98765 43210"
            />
            {phoneNumber && (
              <button
                type="button"
                onClick={() => setPhoneNumber('')}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Step 2: 6-Digit Verification Code Entry */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900">6-Digit SMS Code</label>
            <span className="text-[10px] text-[#3c4a42]">Sent to +91 98765 43210</span>
          </div>

          {/* OTP Slots Grid */}
          <div className="grid grid-cols-6 gap-2 w-full">
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const isFilled = idx < 3;
              const isCurrent = idx === activeSlot;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveSlot(idx)}
                  className={`h-12 py-2 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-white ring-2 ring-[#00c48c] shadow-xs'
                      : isFilled
                      ? 'bg-[#f2f3ff] text-slate-900 font-bold'
                      : 'bg-[#f2f3ff] text-slate-400'
                  }`}
                >
                  {isFilled ? (
                    <span className="text-base font-extrabold text-slate-900">{otpDigits[idx]}</span>
                  ) : isCurrent ? (
                    <span className="w-0.5 h-5 bg-[#006c4b] rounded-full animate-pulse"></span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Resend Timer */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-[#3c4a42] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
              Resend code in{' '}
              <strong className="text-slate-900 font-semibold">
                {secondsLeft > 0 ? `00:${secondsLeft < 10 ? '0' : ''}${secondsLeft}s` : 'Ready'}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setSecondsLeft(30);
                showToast('OTP resend triggered via automated voice call!');
              }}
              className="text-[11px] font-bold text-[#4d44e3] hover:underline"
            >
              Resend via Call
            </button>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full h-11 rounded-full bg-[#00c48c] hover:bg-[#3fdfa5] text-[#002114] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,196,140,0.35)] active:scale-[0.98] transition-transform cursor-pointer"
        >
          <span>{isVerifying ? 'Verifying Credentials...' : 'Verify & Continue'}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* Secondary Fast B2B Sign-in Alternatives */}
      <div className="mt-4 flex flex-col gap-2.5">
        <div className="relative flex items-center justify-center my-1">
          <div className="w-full h-[1px] bg-slate-200 absolute"></div>
          <span className="relative px-3 bg-[#faf8ff] text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
            or continue with
          </span>
        </div>

        {/* WhatsApp Business Fast Auth */}
        <button
          type="button"
          onClick={handleWhatsAppAuth}
          className="w-full h-11 rounded-xl bg-white border border-slate-100 shadow-xs hover:bg-[#f2f3ff] flex items-center justify-center gap-2.5 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-[#00c48c]/20 flex items-center justify-center text-[#006c4b]">
            <span className="material-symbols-outlined text-[16px]">chat</span>
          </div>
          <span className="text-xs font-bold text-slate-900">WhatsApp Business Quick OTP</span>
          <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[9px] text-[#3c4a42] font-bold">
            1-Tap
          </span>
        </button>

        {/* GSTIN Verified Business ID */}
        <button
          type="button"
          onClick={() => {
            const gstin = prompt('Enter your 15-digit GSTIN (e.g. 29AABCU9603R1ZM):');
            if (gstin) {
              showToast(`GSTIN ${gstin} verified against MCA portal!`);
              setTimeout(() => onNavigate('buyer-profile'), 800);
            }
          }}
          className="w-full h-11 rounded-xl bg-white border border-slate-100 shadow-xs hover:bg-[#f2f3ff] flex items-center justify-center gap-2.5 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-[#a5a3ff]/30 flex items-center justify-center text-[#4d44e3]">
            <span className="material-symbols-outlined text-[16px]">badge</span>
          </div>
          <span className="text-xs font-bold text-slate-900">Enter GSTIN / Trade License</span>
        </button>
      </div>

      {/* Sourcing Metrics Delight Strip */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-slate-100">
          <div className="text-base font-extrabold text-[#006c4b]">12k+</div>
          <div className="text-[10px] text-[#3c4a42] font-medium">Verified Mills</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-slate-100">
          <div className="text-base font-extrabold text-[#4d44e3]">100%</div>
          <div className="text-[10px] text-[#3c4a42] font-medium">Escrow Protected</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-slate-100">
          <div className="text-base font-extrabold text-[#855300]">₹0</div>
          <div className="text-[10px] text-[#3c4a42] font-medium">Platform Fee</div>
        </div>
      </div>

      {/* Trust & Security Footer Badge */}
      <div className="mt-4 flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff]/80 text-center">
          <span className="material-symbols-outlined text-[15px] text-[#006c4b] fill-1">security</span>
          <span className="text-[10px] text-slate-900 font-semibold tracking-tight">
            256-Bit Bank Grade • TheLokals Escrow Shield
          </span>
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
