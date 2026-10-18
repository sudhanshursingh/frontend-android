import React from 'react';
import { ScreenName } from '../types/index.ts';

interface BottomNavBarProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const tabs = [
    { id: 'explore' as ScreenName, label: 'Explore', icon: 'dashboard' },
    { id: 'inbox' as ScreenName, label: 'Inbox', icon: 'chat_bubble', hasDot: true },
    { id: 'quotes' as ScreenName, label: 'Quotes', icon: 'request_quote' },
    { id: 'orders' as ScreenName, label: 'Orders', icon: 'local_shipping' },
    { id: 'buyer-profile' as ScreenName, label: 'Profile', icon: 'person' },
  ];

  const isActive = (tabId: ScreenName) => {
    if (tabId === 'explore') return currentScreen === 'explore' || currentScreen === 'product-detail';
    if (tabId === 'quotes') return currentScreen === 'quotes' || currentScreen === 'rfq-builder';
    if (tabId === 'orders') return currentScreen === 'orders' || currentScreen === 'order-detail' || currentScreen === 'checkout';
    if (tabId === 'buyer-profile') return currentScreen === 'buyer-profile' || currentScreen === 'login';
    return currentScreen === tabId;
  };

  return (
    <nav
      className="fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]"
      aria-label="Main Navigation Tabs"
    >
      <div className="h-16 flex items-center justify-around px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-all active:scale-95 ${
                active ? 'text-[#006c4b] font-bold' : 'text-[#3c4a42] hover:text-[#131b2e]'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    active ? 'fill-1' : ''
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.hasDot && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#00c48c] ring-2 ring-white"></span>
                )}
              </div>
              <span className={`text-[11px] leading-tight ${active ? 'font-bold' : 'font-semibold'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
