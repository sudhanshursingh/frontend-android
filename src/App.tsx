import { useState } from 'react';
import { ScreenName } from './types/index.ts';
import { ThemeProvider } from './theme/ThemeContext.tsx';
import { ThemeModal } from './components/ThemeModal.tsx';
import { NavigationHeader } from './components/NavigationHeader.tsx';
import { BottomNavBar } from './components/BottomNavBar.tsx';

import { ExploreScreen } from './screens/ExploreScreen.tsx';
import { ProductDetailScreen } from './screens/ProductDetailScreen.tsx';
import { RfqBuilderScreen } from './screens/RfqBuilderScreen.tsx';
import { QuotesScreen } from './screens/QuotesScreen.tsx';
import { InboxNegotiationScreen } from './screens/InboxNegotiationScreen.tsx';
import { CheckoutScreen } from './screens/CheckoutScreen.tsx';
import { OrdersScreen } from './screens/OrdersScreen.tsx';
import { OrderDetailScreen } from './screens/OrderDetailScreen.tsx';
import { LoginScreen } from './screens/LoginScreen.tsx';
import { BuyerProfileScreen } from './screens/BuyerProfileScreen.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('explore');
  const [navigationHistory, setNavigationHistory] = useState<ScreenName[]>(['explore']);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [viewportMode, setViewportMode] = useState<'mobile' | 'responsive'>('responsive');

  const navigateTo = (screen: ScreenName) => {
    setNavigationHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const nextHistory = [...navigationHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setNavigationHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      navigateTo('explore');
    }
  };

  const isMainTabScreen = ['explore', 'inbox', 'quotes', 'orders', 'buyer-profile'].includes(
    currentScreen
  );

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'explore':
        return <ExploreScreen onNavigate={navigateTo} />;
      case 'product-detail':
        return <ProductDetailScreen onNavigate={navigateTo} />;
      case 'rfq-builder':
        return <RfqBuilderScreen onNavigate={navigateTo} />;
      case 'quotes':
        return <QuotesScreen onNavigate={navigateTo} />;
      case 'inbox':
        return <InboxNegotiationScreen onNavigate={navigateTo} />;
      case 'checkout':
        return <CheckoutScreen onNavigate={navigateTo} />;
      case 'orders':
        return <OrdersScreen onNavigate={navigateTo} />;
      case 'order-detail':
        return <OrderDetailScreen onNavigate={navigateTo} />;
      case 'login':
        return <LoginScreen onNavigate={navigateTo} />;
      case 'buyer-profile':
        return <BuyerProfileScreen onNavigate={navigateTo} />;
      default:
        return <ExploreScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased selection:bg-[#63fcc0] selection:text-[#002114]">
        {/* Responsive Frame Control Floating Strip */}
        <div
          className={`fixed right-4 z-50 flex items-center gap-1.5 bg-[#131b2e]/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-xl border border-slate-700 text-xs transition-all ${
            isMainTabScreen ? 'bottom-20' : 'bottom-24 md:bottom-20'
          }`}
        >
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#006c4b] hover:bg-[#00c48c] hover:text-[#002114] font-bold text-[11px] transition-all cursor-pointer"
            title="Design System Themes"
          >
            <span className="material-symbols-outlined text-[15px]">palette</span>
            <span>Theme</span>
          </button>

          <span className="text-slate-500">|</span>

          <button
            onClick={() => setViewportMode(viewportMode === 'mobile' ? 'responsive' : 'mobile')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-all cursor-pointer"
            title="Toggle responsive view container"
          >
            <span className="material-symbols-outlined text-[15px]">
              {viewportMode === 'mobile' ? 'smartphone' : 'devices'}
            </span>
            <span className="capitalize">{viewportMode}</span>
          </button>
        </div>

        {/* Global Navigation Header */}
        <NavigationHeader
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          onGoBack={handleGoBack}
        />

        {/* Main Content Area: Adapts smoothly between responsive fluid grid and simulated mobile device */}
        <main
          className={`flex-1 w-full transition-all duration-300 ${
            viewportMode === 'mobile'
              ? 'max-w-[430px] mx-auto min-h-screen bg-[#faf8ff] shadow-2xl border-x border-slate-200 relative'
              : 'w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          }`}
        >
          {renderActiveScreen()}
        </main>

        {/* Global Bottom Tab Navigation (Only shown on primary tab surfaces) */}
        {isMainTabScreen && <BottomNavBar currentScreen={currentScreen} onNavigate={navigateTo} />}

        {/* Dynamic Design System Theme Switcher Modal */}
        <ThemeModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
      </div>
    </ThemeProvider>
  );
}
