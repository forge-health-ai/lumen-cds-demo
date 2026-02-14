'use client';

import { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';

interface TriageButtonProps {
  onGenerate: () => void;
  loading: boolean;
  generated: boolean;
}

export function TriageButton({ onGenerate, loading, generated }: TriageButtonProps) {
  if (generated) return null;
  
  return (
    <div className="ehr-card bg-white rounded-lg p-6 text-center">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-clinical-navy/5 px-4 py-2 rounded-full mb-3">
          <Zap className="w-4 h-4 text-clinical-blue" />
          <span className="text-sm font-semibold text-clinical-navy">AI Triage Companion</span>
        </div>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Analyze patient data and generate clinical decision support recommendation
        </p>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={loading}
        className={`
          inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg
          transition-all duration-200 shadow-lg
          ${loading 
            ? 'bg-clinical-blue/70 text-white cursor-wait' 
            : 'bg-clinical-blue text-white hover:bg-clinical-blue/90 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
          }
        `}
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Analyzing Patient Data...</span>
          </>
        ) : (
          <>
            <Zap className="w-6 h-6" />
            <span>Run AI Triage Companion</span>
          </>
        )}
      </button>
      
      {loading && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-clinical-blue rounded-full animate-pulse" />
            <span>ClinicalBERT-v3.2 processing vitals, labs, and history...</span>
          </div>
        </div>
      )}
    </div>
  );
}
