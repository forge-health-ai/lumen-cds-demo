'use client';

import { useState, useEffect } from 'react';

type Stage = 0 | 1 | 2 | 3 | 4; // 0=idle, 1=EHR, 2=AI, 3=LUMEN, 4=Clinician

export function ArchitectureFlow() {
  const [stage, setStage] = useState<Stage>(0);
  const [showEhrLabel, setShowEhrLabel] = useState(false);
  const [showAiLabel, setShowAiLabel] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showDefensible, setShowDefensible] = useState(false);
  const [particleSet, setParticleSet] = useState(0);

  useEffect(() => {
    const runCycle = () => {
      setStage(1);
      setShowEhrLabel(false);
      setShowAiLabel(false);
      setShowScore(false);
      setShowDefensible(false);

      // EHR lights up, label pops
      setTimeout(() => setShowEhrLabel(true), 400);
      // AI Model lights up, label pops
      setTimeout(() => setStage(2), 1000);
      setTimeout(() => setShowAiLabel(true), 1400);
      // LUMEN lights up, score pops
      setTimeout(() => setStage(3), 2000);
      setTimeout(() => setShowScore(true), 2400);
      // Clinician lights up, defensible pops
      setTimeout(() => setStage(4), 3200);
      setTimeout(() => setShowDefensible(true), 3600);
      // Reset
      setTimeout(() => {
        setStage(0);
        setShowEhrLabel(false);
        setShowAiLabel(false);
        setShowScore(false);
        setShowDefensible(false);
        setParticleSet(p => p + 1);
      }, 5000);
    };

    const initialDelay = setTimeout(runCycle, 800);
    const interval = setInterval(runCycle, 5800);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const boxBase = "relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-500 flex items-center gap-2";
  
  const getBoxStyle = (boxStage: number) => {
    const isActive = stage >= boxStage && stage > 0;
    return isActive
      ? "ring-2 ring-white/30 shadow-lg shadow-white/10 scale-105"
      : "scale-100";
  };

  const popupBase = "absolute -top-10 left-1/2 animate-scorePopup";

  return (
    <div className="relative py-8">
      {/* Main flow */}
      <div className="flex items-center justify-center gap-0 text-sm flex-wrap">
        {/* EHR */}
        <div className={`${boxBase} bg-gray-700/50 border border-gray-600 text-gray-300 ${getBoxStyle(1)}`}>
          <span>🏥</span>
          <span>Your EHR</span>
          {/* Label popup */}
          {showEhrLabel && (
            <div className={popupBase}>
              <div className="bg-white text-clinical-navy px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap">
                Triage Data
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-white" />
            </div>
          )}
        </div>

        {/* Connector 1 */}
        <div className="relative w-16 h-[2px] mx-1">
          <div className="absolute inset-0 bg-gray-600" />
          {stage >= 1 && stage > 0 && (
            <div 
              key={`p1-${particleSet}`}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-clinical-blue rounded-full shadow-md shadow-clinical-blue/50"
              style={{ animation: 'flowRight 0.8s ease-in-out forwards' }}
            />
          )}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xs">→</span>
        </div>

        {/* AI Model */}
        <div className={`${boxBase} bg-clinical-blue/20 border border-clinical-blue/50 text-gray-300 ${getBoxStyle(2)}`}>
          <span>🤖</span>
          <span>AI Model</span>
          {/* Label popup */}
          {showAiLabel && (
            <div className={popupBase}>
              <div className="bg-white text-clinical-navy px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap">
                Clinical Recommendation
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-white" />
            </div>
          )}
        </div>

        {/* Connector 2 */}
        <div className="relative w-16 h-[2px] mx-1">
          <div className="absolute inset-0 bg-gray-600" />
          {stage >= 2 && (
            <div 
              key={`p2-${particleSet}`}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-clinical-teal rounded-full shadow-md shadow-clinical-teal/50"
              style={{ animation: 'flowRight 0.8s ease-in-out forwards' }}
            />
          )}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xs">→</span>
        </div>

        {/* LUMEN SDK */}
        <div className={`${boxBase} bg-clinical-teal/20 border-2 border-clinical-teal text-clinical-teal font-bold ${getBoxStyle(3)}`}>
          <span>🛡️</span>
          <span>LUMEN SDK</span>
          <span className="text-xs font-normal text-gray-400">&lt;50ms</span>
          
          {/* Score popup */}
          {showScore && (
            <div className={popupBase}>
              <div className="bg-white text-clinical-navy px-3 py-1.5 rounded-lg shadow-xl text-sm font-bold whitespace-nowrap flex items-center gap-1.5">
                <span className="text-clinical-teal">72</span>
                <span className="text-gray-400 text-xs">/100</span>
                <span className="text-medical-amber text-xs">REVIEW</span>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" />
            </div>
          )}
          
          {stage === 3 && (
            <div className="absolute inset-0 rounded-lg border-2 border-clinical-teal animate-ping opacity-30 pointer-events-none" />
          )}
        </div>

        {/* Connector 3 */}
        <div className="relative w-16 h-[2px] mx-1">
          <div className="absolute inset-0 bg-gray-600" />
          {stage >= 3 && (
            <div 
              key={`p3-${particleSet}`}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-medical-green rounded-full shadow-md shadow-medical-green/50"
              style={{ animation: 'flowRight 0.8s ease-in-out forwards' }}
            />
          )}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xs">→</span>
        </div>

        {/* Clinician */}
        <div className={`${boxBase} bg-medical-green/20 border border-medical-green/50 text-gray-300 ${getBoxStyle(4)}`}>
          <span>👨‍⚕️</span>
          <span>Clinician</span>
          
          {/* Defensible popup */}
          {showDefensible && (
            <div className={popupBase}>
              <div className="bg-medical-green text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                DEFENSIBLE
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent" style={{ borderTopColor: '#059669' }} />
            </div>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          EHR-agnostic · No Epic/Cerner integration required · Evaluates in &lt;50ms · Audit-ready
        </p>
      </div>
    </div>
  );
}
