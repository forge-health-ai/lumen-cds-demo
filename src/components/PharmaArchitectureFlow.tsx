'use client';

import { useEffect, useState } from 'react';

export function PharmaArchitectureFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Claims System', icon: '📋', sublabel: 'Your Claims System' },
    { label: 'AI Model', icon: '🤖', sublabel: 'AI Fraud Model' },
    { label: 'LUMEN SDK', icon: '🛡️', sublabel: '<50ms', highlight: true },
    { label: 'Reviewer', icon: '👤', sublabel: 'Claims Reviewer' },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Steps */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-500 ${
                step.highlight
                  ? 'bg-amber-500/20 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : activeStep === i
                  ? 'bg-white/10 border-white/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <span className="text-lg sm:text-xl">{step.icon}</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-white">{step.sublabel}</div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center mx-1 sm:mx-2">
                <div className={`w-4 sm:w-8 h-0.5 transition-colors duration-500 ${
                  activeStep > i ? 'bg-amber-400' : 'bg-slate-600'
                }`} />
                <div className={`w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent transition-colors duration-500 ${
                  activeStep > i ? 'border-l-amber-400' : 'border-l-slate-600'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <div className="mt-4 flex items-center gap-2 sm:gap-4 text-xs text-slate-500 flex-wrap justify-center">
        <span>Claims-agnostic</span>
        <span>·</span>
        <span>No system integration required</span>
        <span>·</span>
        <span>Evaluates in &lt;50ms</span>
        <span>·</span>
        <span>Audit-ready</span>
      </div>

      {/* Animated Score */}
      <div className="mt-4">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-1000 ${
          activeStep >= 2 ? 'bg-amber-500/20 border-amber-500/50' : 'bg-slate-800 border-slate-700'
        }`}>
          <span className={`font-bold transition-colors duration-500 ${
            activeStep >= 2 ? 'text-amber-400' : 'text-slate-600'
          }`}>72</span>
          <span className="text-slate-500 text-sm">/100</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded transition-all duration-500 ${
            activeStep >= 2 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-500'
          }`}>REVIEW</span>
        </div>
      </div>
    </div>
  );
}
