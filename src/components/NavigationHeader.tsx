import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';

interface NavigationHeaderProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  onGoBack?: () => void;
  onOpenNotifications?: () => void;
}

const SCREENS_LIST: { id: ScreenName; label: string; badge?: string }[] = [
  { id: 'explore', label: '1. Explore' },
  { id: 'product-detail', label: '2. Product Detail (#TEX-8821)' },
  { id: 'rfq-builder', label: '3. RFQ Builder (Step 2)' },
  { id: 'quotes', label: '4. Quotes & Bids Matrix' },
  { id: 'inbox', label: '5. Direct Mill Negotiation' },
  { id: 'checkout', label: '6. Escrow Checkout' },
  { id: 'orders', label: '7. Orders Dashboard' },
  { id: 'order-detail', label: '8. Order Detail (PO-9402)' },
  { id: 'login', label: '9. Mobile OTP Login' },
  { id: 'buyer-profile', label: '10. Buyer Profile' },
];

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  onNavigate,
  onGoBack,
}) => {
  const [showScreenSwitcher, setShowScreenSwitcher] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const triggerNotification = () => {
    setNotificationToast('Active alerts: 3 Factory Quotes ready & PO-9402 QC passed!');
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const isSubScreen = [
    'product-detail',
    'rfq-builder',
    'checkout',
    'order-detail',
    'login',
  ].includes(currentScreen);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'product-detail':
        return 'Product Detail';
      case 'rfq-builder':
        return 'Request For Quote';
      case 'checkout':
        return 'Checkout';
      case 'order-detail':
        return 'Order Detail';
      case 'login':
        return 'Login';
      default:
        return 'TheLokals';
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Top quick switcher toggle bar */}
        <div className="bg-[#004a33] text-white px-3 py-1 flex items-center justify-between text-[11px] font-semibold">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fdfa5] animate-pulse"></span>
            <span className="uppercase tracking-wider text-[#63fcc0] font-bold">TheLokals B2B</span>
            <span className="text-white/60">•</span>
            <span className="truncate text-white/90 font-medium">Verified Direct Mills &amp; Escrow</span>
          </div>
          <button
            onClick={() => setShowScreenSwitcher(!showScreenSwitcher)}
            className="shrink-0 ml-2 px-2 py-0.5 rounded bg-[#006c4b] hover:bg-[#00c48c] hover:text-[#002114] text-white text-[10px] font-bold tracking-wide uppercase transition-all flex items-center gap-1"
            aria-label="Toggle screen navigation switcher"
          >
            <span>Screens (10)</span>
            <span className="material-symbols-outlined text-[13px]">
              {showScreenSwitcher ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {/* Expandable Screen Switcher Drawer */}
        {showScreenSwitcher && (
          <div className="bg-[#131b2e] text-white p-3 border-b border-slate-800 shadow-xl max-h-72 overflow-y-auto animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-[#63fcc0] tracking-wider">
                Audited Screen Showcase
              </span>
              <span className="text-[10px] text-slate-400">10 Complete Functional Surfaces</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
              {SCREENS_LIST.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => {
                    onNavigate(screen.id);
                    setShowScreenSwitcher(false);
                  }}
                  className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                    currentScreen === screen.id
                      ? 'bg-[#00c48c] text-[#002114] font-bold shadow-sm'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span className="truncate">{screen.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Navbar Row */}
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {isSubScreen ? (
              <>
                <button
                  aria-label="Go back"
                  onClick={onGoBack || (() => onNavigate('explore'))}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#eaedff] transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h1 className="font-bold text-lg text-[#131b2e] tracking-tight truncate max-w-[210px]">
                  {getScreenTitle()}
                </h1>
              </>
            ) : currentScreen === 'explore' ? (
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => onNavigate('explore')}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00c48c] to-[#006c4b] flex items-center justify-center shadow-md shadow-[#00c48c]/25">
                  <span className="font-extrabold text-white text-lg tracking-tight">L</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#006c4b] font-bold leading-none">
                    TheLokals
                  </span>
                  <span className="text-base text-[#131b2e] font-bold leading-tight mt-0.5">
                    Explore
                  </span>
                </div>
              </div>
            ) : currentScreen === 'inbox' ? (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00c48c] flex items-center justify-center text-[#004a33] shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">storefront</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-[#006c4b] font-bold leading-none">
                    TheLokals Market
                  </span>
                  <span className="text-sm text-[#131b2e] font-bold tracking-tight truncate max-w-[190px] leading-tight mt-0.5">
                    Direct Mill Negotiation
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => onNavigate('explore')}
              >
                <div className="w-9 h-9 rounded-xl bg-[#00c48c] flex items-center justify-center shadow-[0_2px_8px_rgba(0,196,140,0.35)] text-white">
                  <span className="material-symbols-outlined text-[22px]">storefront</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base text-[#131b2e] font-bold tracking-tight leading-none">
                    TheLokals
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#006c4b] font-bold leading-none mt-1">
                    B2B Wholesale
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isSubScreen && (
              <button
                aria-label="More options"
                onClick={() => alert('Options: Export Spec TDS • Share Spec • Flag Cluster Batch')}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#3c4a42] hover:text-[#131b2e] transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">more_vert</span>
              </button>
            )}

            {!isSubScreen && (
              <button
                aria-label="Notifications"
                onClick={triggerNotification}
                className="w-10 h-10 relative flex items-center justify-center rounded-full text-[#3c4a42] hover:text-[#131b2e] hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#fea619] ring-2 ring-white"></span>
              </button>
            )}

            <button
              aria-label="Buyer Profile"
              onClick={() => onNavigate('buyer-profile')}
              className="w-9 h-9 rounded-full bg-[#006c4b] p-0.5 flex items-center justify-center shadow-[0_2px_6px_rgba(0,108,75,0.25)] hover:scale-105 transition-transform"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRFqVBQ7WPCv2owB7G6CtlGYqeZ_pf0vzgvm0gJ6SBKxgvMBaws__jXNe3QPSg-rg2Vl1SMlC5ACc_s9DM0V7gDQACtjJEmjmvae8zJnT7LFv9Cmy3_-Qp9NTEjDrFgxanZeLwsac9G3qlgeruD0iBni-z12CHm91ruiht5y-_m1OtFKtkr9ELNvdECvTjIbAtvPUI4uttOZfsBoZ7PmhImFDZUZQMwCijncPig93jQke3s06o3DY"
                alt="Rahul Mehta"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>

        {notificationToast && (
          <div className="bg-[#00c48c] text-[#002114] px-4 py-2 text-xs font-bold text-center shadow-md animate-in fade-in duration-150">
            {notificationToast}
          </div>
        )}
      </header>
    </>
  );
};
