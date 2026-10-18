import React, { useState } from 'react';
import { ScreenName } from '../types/index.ts';
import { USER_PROFILE } from '../data/mockData.ts';

interface BuyerProfileScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const BuyerProfileScreen: React.FC<BuyerProfileScreenProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState(USER_PROFILE);
  const [bufferAmount, setBufferAmount] = useState(profile.escrowBuffer);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lanes, setLanes] = useState([
    { name: 'Knitted Fabrics', spec: '240 GSM', active: true },
    { name: 'Corrugated Packaging', active: false },
    { name: 'Custom Flexo', active: false },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddFunds = () => {
    const addVal = prompt('Enter Escrow Buffer amount to add in ₹:', '50000');
    if (addVal && !isNaN(Number(addVal))) {
      const added = Number(addVal);
      setBufferAmount((prev) => prev + added);
      showToast(`Added ₹${added.toLocaleString()} to Escrow Buffer Vault!`);
    }
  };

  const copyGstin = () => {
    navigator.clipboard?.writeText(profile.gstin);
    showToast(`GSTIN ${profile.gstin} copied to clipboard!`);
  };

  const handleAddLane = () => {
    const newLane = prompt('Enter new sourcing category or spec (e.g., Organic Pique 220 GSM):');
    if (newLane && newLane.trim()) {
      setLanes([...lanes, { name: newLane.trim(), active: true }]);
      showToast(`Added "${newLane.trim()}" to active sourcing lanes`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-lg md:max-w-4xl mx-auto">
      {/* Top Profile Hero Card with Ambient Glow */}
      <div className="pt-1 pb-3">
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#006c4b]/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute right-10 bottom-0 w-24 h-24 bg-[#fea619]/15 rounded-full blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-sm bg-slate-100 ring-2 ring-[#00c48c]/30"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00c48c] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[13px] text-[#002114] fill-1">
                    verified
                  </span>
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-lg md:text-xl font-bold text-slate-900 truncate">
                    {profile.name}
                  </h1>
                  <span className="material-symbols-outlined text-[#006c4b] text-[18px]">
                    verified_user
                  </span>
                </div>
                <p className="text-xs text-[#3c4a42] font-medium">{profile.role}</p>
                <p className="text-xs text-slate-900 font-semibold truncate mt-0.5">
                  {profile.company}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[#3c4a42] text-xs">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">
                    location_on
                  </span>
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#006c4b]/10">
                <span className="w-2 h-2 rounded-full bg-[#006c4b] animate-pulse"></span>
                <span className="text-[10px] text-[#006c4b] font-bold tracking-wide uppercase">
                  GSTIN Verified • Tier 1 Buyer
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newRole = prompt('Update Title/Role:', profile.role);
                  if (newRole) setProfile({ ...profile, role: newRole });
                }}
                className="flex items-center gap-0.5 text-xs text-[#006c4b] font-bold hover:underline"
              >
                <span>Edit Profile</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sourcing Metrics Cards */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex flex-col items-center text-center">
            <span className="text-[10px] text-[#3c4a42] uppercase tracking-wider mb-1 font-bold">
              Total Sourced
            </span>
            <span className="text-base md:text-xl text-slate-900 font-extrabold tracking-tight">
              {profile.totalSourced}
            </span>
            <div className="flex items-center gap-0.5 text-[#006c4b] mt-0.5 text-[10px] font-bold">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>
              <span>{profile.momGrowth} MoM</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex flex-col items-center text-center">
            <span className="text-[10px] text-[#3c4a42] uppercase tracking-wider mb-1 font-bold">
              Active Orders
            </span>
            <span className="text-base md:text-xl text-[#4d44e3] font-extrabold tracking-tight">
              {profile.activeOrdersCount} Live
            </span>
            <div className="flex items-center gap-0.5 text-[#4d44e3] mt-0.5 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d44e3]"></span>
              <span>Dispatch stage</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex flex-col items-center text-center">
            <span className="text-[10px] text-[#3c4a42] uppercase tracking-wider mb-1 font-bold">
              Escrow Secured
            </span>
            <span className="text-base md:text-xl text-[#006c4b] font-extrabold tracking-tight">
              {profile.escrowSecuredPercent}%
            </span>
            <div className="flex items-center gap-0.5 text-[#006c4b] mt-0.5 text-[10px] font-bold">
              <span className="material-symbols-outlined text-[13px]">shield</span>
              <span>Zero risk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Escrow Buffer Wallet Spotlight Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#131b2e] to-[#283044] rounded-2xl p-4 text-white shadow-md">
          <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#00c48c]/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#63fcc0] text-[18px]">
                  account_balance_wallet
                </span>
              </div>
              <span className="text-xs text-white/80 font-semibold">Lokals Escrow Buffer</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#006c4b]/40 text-[#63fcc0] text-[10px] font-semibold border border-[#63fcc0]/30">
              Active Vault
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                ₹{bufferAmount.toLocaleString()}
              </div>
              <p className="text-[11px] text-white/70 mt-0.5">
                Instant factory pre-clearance buffer
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFunds}
              className="bg-[#00c48c] hover:bg-[#3fdfa5] text-[#002114] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>Add Funds</span>
            </button>
          </div>
        </div>

        {/* Business & KYC Verification Module */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900">Business &amp; KYC Status</h2>
            <span className="text-xs text-[#006c4b] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[15px]">lock_open</span>
              Tier 1 Complete
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#006c4b]/10 flex items-center justify-center text-[#006c4b] shrink-0">
                  <span className="material-symbols-outlined text-[19px]">domain_verification</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#3c4a42] font-medium">GSTIN</span>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-100 text-[#006c4b] text-[9px] font-bold">
                      <span className="material-symbols-outlined text-[11px]">check</span> Verified
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 font-mono tracking-wider truncate">
                    {profile.gstin}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={copyGstin}
                aria-label="Copy GSTIN"
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[17px]">content_copy</span>
              </button>
            </div>

            <div className="flex items-start justify-between bg-[#f2f3ff]/60 p-2.5 rounded-xl">
              <div className="flex items-start gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#fea619]/20 flex items-center justify-center text-[#855300] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">factory</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#3c4a42] font-bold uppercase tracking-wider">
                    Primary Factory Dock
                  </span>
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {profile.primaryDock}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newDock = prompt('Update Dock Address:', profile.primaryDock);
                  if (newDock) setProfile({ ...profile, primaryDock: newDock });
                }}
                className="px-2 py-0.5 bg-white text-[#006c4b] rounded-md text-[10px] font-bold shadow-xs shrink-0"
              >
                Edit
              </button>
            </div>

            <div className="flex items-center justify-between text-[#3c4a42] text-xs pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1 text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-[#006c4b]">gpp_good</span>
                PAN &amp; Udhyam MSME linked
              </span>
              <span className="text-[10px] font-semibold text-slate-900">{profile.validity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sourcing Preferences & Categories */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-slate-900">Active Sourcing Lanes</h2>
          <button
            type="button"
            onClick={handleAddLane}
            className="text-xs text-[#006c4b] font-bold hover:underline"
          >
            + Add Lane
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {lanes.map((lane, i) => (
            <div
              key={i}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs ${
                lane.active
                  ? 'bg-[#131b2e] text-white'
                  : 'bg-white text-slate-900 border border-slate-100'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[15px] ${
                  lane.active ? 'text-[#63fcc0]' : 'text-[#006c4b]'
                }`}
              >
                check_circle
              </span>
              <span>{lane.name}</span>
              {lane.spec && (
                <span className="text-white/60 ml-0.5 text-[10px] font-normal">{lane.spec}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visual Sourcing Showcase / Recent Lab Assay */}
      <div className="mb-4">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c4b] text-[19px]">science</span>
              <span className="text-sm font-bold text-slate-900">Recent Lab Assay</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#006c4b] font-bold">
              Passed 99.4%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC34RMwPJZzwudWmZlyeqH1EurIMIk1yhrZyoA1l4ta61lF97SjHf5WbqL3pK27NuCYOb9uVl2mJMXMwdLVqxeDXpZpfWXJvcYrfZR--e5UHe--SYtAgScZ35_yq3exxG8UBfTtd15l2kyUK09h6tXJjg78nreqQqC91TAUL0FRdF85ZkMJSRPbDwkNACnLnhKs8IGm_aazQYJRqHc9r0WiHRcgWJOoQ0g7NV4CzkFmD25tG__A68A"
                alt="Cotton combed textile macro"
                className="w-full h-24 object-cover rounded-xl bg-slate-100"
              />
              <span className="text-xs font-semibold text-slate-900 truncate">
                Cotton Combed Tensile
              </span>
              <span className="text-[10px] text-[#3c4a42]">SGS Certified</span>
            </div>

            <div className="flex flex-col gap-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQIOe_LGJxKdNJJV2mjcLorVJDJdDvbE31OD7GVFmoBR-ev6jrB2kXdQqeKSJpIuEkx5F8SV2AcNOeQKex-0QmnFIUiJJoa-UvdomFEipkVo3TI1ScVXr5JciO1gClTAWke6UvgWn7Ht2o-hqXrdTwvVK-7ncB2PxiuHGFAHM7-LO-MrW02M6aPkJWSojQ4pdkSvG4dFm9OgUQJQTlvPEjA0Zb268I-NTITcZJJkfyetkN9M2oTps"
                alt="Testing laboratory instrumentation"
                className="w-full h-24 object-cover rounded-xl bg-slate-100"
              />
              <span className="text-xs font-semibold text-slate-900 truncate">
                Burst Strength Test
              </span>
              <span className="text-[10px] text-[#3c4a42]">Peenya Lab #2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Procurement Operations Navigation */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Procurement Operations</h2>
        <div className="bg-white rounded-2xl shadow-xs border border-slate-100 overflow-hidden flex flex-col divide-y divide-slate-100">
          <button
            type="button"
            onClick={() => showToast('Opening Q3 FY25 Invoices and E-Way reconciliation dashboard')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  Commercial Invoices &amp; E-Way Bills
                </span>
                <span className="text-[10px] text-[#3c4a42] block">Auto-reconciliation for Q3 FY25</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('12 batch clearance reports verified by NABL labs')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  Quality Inspection Lab Certificates
                </span>
                <span className="text-[10px] text-[#3c4a42] block">12 batch clearance reports</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Factory gate-pass authorization registry')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  Authorized Factory Representatives
                </span>
                <span className="text-[10px] text-[#3c4a42] block">4 gate-pass verified officers</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Opening TheLokals 24/7 Escrow Dispute Desk (Priority SLA < 30m)')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    Escrow Dispute &amp; Support Helpdesk
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#00c48c] text-[#002114] rounded-full font-bold">
                    24/7
                  </span>
                </div>
                <span className="text-[10px] text-[#3c4a42] block">Priority resolution SLA &lt; 30 mins</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Logout Action Button */}
      <div className="flex flex-col gap-2 items-center">
        <button
          type="button"
          onClick={() => {
            if (confirm('Log out of UrbanAttire Brands account?')) {
              onNavigate('login');
            }
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Log Out of UrbanAttire Account</span>
        </button>
        <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
          TheLokals B2B Engine • Build v4.8.2 (Secure)
        </p>
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
