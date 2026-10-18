import React from 'react';
import { useTheme } from '../theme/ThemeContext.tsx';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-100 flex flex-col gap-4 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-modal-title"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c4b] text-[22px]">palette</span>
            <div>
              <h2 id="theme-modal-title" className="text-base font-bold text-slate-900 leading-tight">
                Design System Theming
              </h2>
              <p className="text-[11px] text-[#3c4a42]">Dynamic B2B Theme Module</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close theming modal"
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Available Themes
          </span>

          {availableThemes.map((theme) => {
            const isSelected = currentTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-[#00c48c] ring-2 ring-[#00c48c]/30 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{theme.name}</span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00c48c] text-[#002114] text-[10px] font-bold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#3c4a42] leading-snug">{theme.description}</p>

                {/* Color swatches preview */}
                <div className="flex items-center gap-1.5 pt-1">
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: theme.colors.primary }}
                    title="Primary"
                  ></div>
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                    title="Primary Container"
                  ></div>
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: theme.colors.secondaryContainer }}
                    title="Secondary"
                  ></div>
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: theme.colors.tertiary }}
                    title="Tertiary"
                  ></div>
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: theme.colors.surfaceContainer }}
                    title="Surface Container"
                  ></div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-900 uppercase block mb-1">
            Usage in Antigravity Agent:
          </span>
          <pre className="text-[10px] text-slate-700 font-mono bg-white p-2 rounded-lg border border-slate-200 overflow-x-auto">
{`import { ThemeProvider, useTheme } from './theme/ThemeContext';
// In your component:
const { currentTheme, setTheme } = useTheme();
setTheme('industrial'); // Switches tokens`}
          </pre>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#006c4b] text-white text-xs font-bold hover:bg-[#004a33] transition-colors"
        >
          Apply &amp; Done
        </button>
      </div>
    </div>
  );
};
