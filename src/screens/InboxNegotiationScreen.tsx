import React, { useState } from 'react';
import { ScreenName, ChatMessage } from '../types/index.ts';
import { INITIAL_CHAT_MESSAGES, ACTIVE_OFFER_DETAILS } from '../data/mockData.ts';

interface InboxNegotiationScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const InboxNegotiationScreen: React.FC<InboxNegotiationScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isDealLocked, setIsDealLocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const offer = ACTIVE_OFFER_DETAILS;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend ?? inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      senderName: 'Rahul Mehta',
      role: 'Procurement Head',
      time: 'Just now',
      content: text,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate instant supplier reply
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'supplier',
        senderName: 'Rajesh Sharma',
        role: 'Plant Head',
        time: 'Just now',
        content: `Acknowledged: "${text}". We have updated our factory production slot and logged this into the Escrow Vault log.`,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1000);
  };

  const handleLockDeal = () => {
    setIsDealLocked(true);
    showToast('Escrow lock initialized! Transferring to Escrow Vault Deposit...');
    setTimeout(() => {
      onNavigate('checkout');
    }, 900);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-20 max-w-lg mx-auto">
      {/* Pinned Negotiation Context Bar */}
      <section className="bg-white border-b border-slate-200/70 shadow-xs">
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200/60 flex items-center justify-center text-[#006c4b] font-bold text-xs shrink-0 shadow-xs">
              PC
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00c48c] ring-2 ring-white animate-pulse"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm truncate">PackCraft Solutions</span>
                <span className="material-symbols-outlined text-[16px] text-[#006c4b] fill-1" title="Verified Tier-1 Mill">
                  verified
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate font-medium">
                <span>Surat Industrial Hub</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-[#006c4b] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c48c]"></span>Online now
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => showToast('Connecting secure line to Rajesh Sharma (Surat Plant)...')}
              aria-label="Direct Supplier Call"
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-[#006c4b] transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[17px]">call</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('quotes')}
              aria-label="RFQ Specification Details"
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-[#006c4b] transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[17px]">info</span>
            </button>
          </div>
        </div>

        {/* Active RFQ Scope Snapshot */}
        <div className="px-4 pb-2.5">
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border border-emerald-200/60 rounded-xl p-2 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-bold bg-[#00c48c] text-[#002114] px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-2xs">
                {offer.rfqNumber}
              </span>
              <span className="text-xs font-semibold text-slate-800 truncate">
                5k Custom Mailers
              </span>
              <span className="text-xs text-slate-500 shrink-0 font-medium">
                (Target: ₹22.80)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#006c4b] text-xs font-semibold shrink-0 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200/50">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              <span>Escrow Shield</span>
            </div>
          </div>
        </div>
      </section>

      {/* Negotiation Feed Area */}
      <div className="px-4 py-3 flex flex-col gap-4">
        {/* Timeline Marker */}
        <div className="flex items-center justify-center">
          <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full uppercase tracking-wider">
            Today • Commercial Offer Session
          </span>
        </div>

        {/* Dynamic Message Bubbles */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 max-w-[92%] ${
              msg.sender === 'buyer' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
              <span className="text-[10px] font-medium text-slate-400">
                {msg.role} • {msg.time}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed border ${
                msg.sender === 'buyer'
                  ? 'bg-[#006c4b] text-white border-[#006c4b] rounded-tr-xs shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 rounded-tl-xs shadow-xs'
              }`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Factory Verification Proof Cards */}
        <div className="flex flex-col gap-2 max-w-full">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#006c4b]">verified</span>
              Live Factory Pre-Production Verification
            </span>
            <span className="text-[10px] font-semibold text-[#006c4b] bg-emerald-100/70 px-2 py-0.5 rounded-full">
              Batch Geo-Tagged
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Proof Card 1 */}
            <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xs flex flex-col gap-1 hover:shadow-md transition-shadow">
              <div className="relative w-full h-26 rounded-xl overflow-hidden bg-slate-100">
                <img
                  alt="Raw Kraft Roll"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaz7vRL5wU_W8TUfaNkMi1h2umi_LY6z_wpm3tY0WSonJiE31qvS7pX6r3L9gky0FuC8y5XYqwArt_WwmaSeUvWUPz5Hd0vUHVStsnWj8F74bO78qNcbf7Jh8TaQy5qhGzSixPe_FHqfJ8Bpu6he84WNr15D7Jmekkl68iKrzAqm3jjp-KcrU4cjaAcLvmr1bhwK5Sl1EW_2Zq980Jfj0fjBKcr-0BqJ-x_vaxctkxh5-F3gWouP8"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-[#131b2e]/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-md font-semibold text-[9px] tracking-wide">
                  GSM 300 Certified
                </div>
              </div>
              <div className="px-1 py-0.5">
                <span className="text-xs font-bold text-slate-800 block truncate">
                  Allocated Kraft Roll
                </span>
                <span className="text-[10px] text-slate-500 block font-medium">Surat Bay 4</span>
              </div>
            </div>

            {/* Proof Card 2 */}
            <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xs flex flex-col gap-1 hover:shadow-md transition-shadow">
              <div className="relative w-full h-26 rounded-xl overflow-hidden bg-slate-100">
                <img
                  alt="Die Cut Sample"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyawUQJEEexuPjGfSEjRHnOie05HT90Doj1QjS--3rY-cK52vXvaPgAYuhXs7Q_0k6hkgKSBWRCgD1EA5Jjd4RpC5FeeL8Jn5YNFzLIZfmTBe0D2HpyQam47yutRI7G6aumXhEeVohIxu-rT1JnmZg-DLb1ydJXFjE7Cbv_U1uK1cXxM0M7jxspgH4zD3BW_ijZ-3cJnwJAQzgtL8DRpmqzAk0RssDdBheGc0x03-zWnXxPVH4xHc"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-[#131b2e]/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-md font-semibold text-[9px] tracking-wide">
                  E-Flute Calibrated
                </div>
              </div>
              <div className="px-1 py-0.5">
                <span className="text-xs font-bold text-slate-800 block truncate">
                  Die-Cut Sample Mockup
                </span>
                <span className="text-[10px] text-slate-500 block font-medium">
                  Crease Test Passed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CORE HERO: Structured Commercial Offer Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,196,140,0.08)] border-2 border-emerald-200 flex flex-col gap-3.5 relative overflow-hidden">
          {/* Top Ribbon */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#00c48c] to-[#006c4b] text-white px-3 py-1 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[15px]">handshake</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Formal Commercial Offer
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#855300] bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">timer</span>
              Valid: 24h Left
            </span>
          </div>

          {/* Pricing Highlight */}
          <div className="flex items-baseline justify-between pt-0.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Agreed Unit Rate
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  ₹{offer.unitRate.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-slate-500">/ box</span>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[11px] line-through text-slate-400 font-medium">
                List: ₹{offer.listRate.toFixed(2)}
              </span>
              <span className="text-[11px] font-bold text-[#006c4b] bg-emerald-100 border border-emerald-300/80 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                <span className="material-symbols-outlined text-[13px]">trending_down</span>
                Savings: ₹{offer.savings.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 3 Key Commercial Columns */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                Volume
              </span>
              <span className="text-sm font-bold text-slate-900">{offer.volume.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500">Units</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                SLA Dispatch
              </span>
              <span className="text-sm font-bold text-[#006c4b]">{offer.slaDays} Days</span>
              <span className="text-[9px] font-bold text-[#004a33] bg-emerald-100 px-1.5 py-0.2 rounded">
                Guaranteed
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                Logistics
              </span>
              <span className="text-sm font-bold text-slate-900">NCR</span>
              <span className="text-[10px] text-slate-500">Doorstep</span>
            </div>
          </div>

          {/* Financial Commitment Breakdown */}
          <div className="flex flex-col gap-2 pt-0.5">
            <div className="flex items-center justify-between text-slate-700 text-xs">
              <span className="font-medium">Gross Order Value</span>
              <span className="font-bold text-slate-900">
                ₹{offer.grossAmount.toLocaleString()}{' '}
                <span className="text-[10px] text-slate-400 font-normal">+ 18% GST</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs bg-emerald-50/80 border border-emerald-200/50 p-2.5 rounded-xl">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006c4b]">shield_lock</span>
                <span className="font-semibold text-emerald-950">Initial Escrow Milestone (15%)</span>
              </div>
              <span className="text-sm font-extrabold text-[#006c4b]">
                ₹{offer.initialDeposit.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-tight">
              Balance payable strictly upon live dispatch QR inspection scan. 100% dispute protection.
            </p>
          </div>

          {/* Deal Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={handleLockDeal}
              className={`w-full h-11 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,196,140,0.35)] transition-all cursor-pointer ${
                isDealLocked
                  ? 'bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-[#00c48c] to-[#006c4b] text-white hover:opacity-95 active:scale-[0.98]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>
                {isDealLocked ? 'Deal Locked • Transferring...' : 'Lock Deal & Deposit Escrow (₹15,000)'}
              </span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => showToast('Sample request booked! Sent to PackCraft sample bay.')}
                className="h-9 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px] text-slate-600">inventory</span>
                <span>Request Sample (₹0)</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Opening Proforma Invoice (PI #TL-PC-9482.pdf)...')}
                className="h-9 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px] text-slate-600">description</span>
                <span>View PI Draft</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security & Escrow Trust Anchor */}
        <div className="flex items-center justify-center gap-1.5 text-slate-500 py-0.5">
          <span className="material-symbols-outlined text-[15px] text-[#006c4b]">verified</span>
          <span className="text-[11px] font-semibold">
            Non-fungible Mill Contract • Governed by TheLokals Shield
          </span>
        </div>
      </div>

      {/* Bottom Interactive Composer Anchor */}
      <footer className="fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] px-4 py-2.5 flex flex-col gap-2 max-w-lg mx-auto">
        {/* Rapid Response Micro-Negotiation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => handleSendMessage('Counter: Can we do ₹23.00/box for 5,000 units?')}
            className="shrink-0 h-7 px-3 rounded-full bg-slate-100 hover:bg-[#006c4b] hover:text-white text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px]">tune</span>
            <span>Counter ₹23.00</span>
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage('Can we split this into 2 batches (2,500 + 2,500)?')}
            className="shrink-0 h-7 px-3 rounded-full bg-slate-100 hover:bg-[#006c4b] hover:text-white text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px]">call_split</span>
            <span>Split into 2 Batches</span>
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage('Please share recent ISO Burst Factor lab report for this roll.')}
            className="shrink-0 h-7 px-3 rounded-full bg-slate-100 hover:bg-[#006c4b] hover:text-white text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px]">science</span>
            <span>Request Lab Test</span>
          </button>
        </div>

        {/* Structured Input Composer */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => showToast('Attaching spec PDF or CAD dieline')}
              aria-label="Attach CAD or spec sheet"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Opening camera for fabric or box scan')}
              aria-label="Upload packaging photo"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </button>
          </div>
          <div className="flex-1 bg-slate-100 rounded-full px-3.5 py-1.5 flex items-center gap-2 border border-slate-200/80 focus-within:border-[#00c48c] focus-within:bg-white focus-within:shadow-xs transition-all">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type offer terms or message..."
              className="w-full bg-transparent border-0 outline-none text-xs text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>
          <button
            type="button"
            onClick={() => handleSendMessage()}
            aria-label="Send commercial revision"
            className="w-9 h-9 rounded-full bg-gradient-to-r from-[#00c48c] to-[#006c4b] text-white flex items-center justify-center shrink-0 shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        </div>
      </footer>

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#3fdfa5]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
