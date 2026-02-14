'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { patient } from '@/data/patient';
import { aiRecommendation } from '@/data/ai-recommendation';
import {
  AIRecommendationCard,
  ConcernsCard,
  MissingGovernanceCard
} from '@/components/AIRecommendation';
import {
  LumenScoreCard,
  RiskRadar,
  PolicyPack,
  ValidatedConcerns,
  AuditRecord,
  GovernanceBanner
} from '@/components/LumenGovernance';
import type { LumenEvaluation } from '@/lib/lumen';
import { evaluateClinicalDecision } from '@/lib/lumen';
import { Zap, Loader2 } from 'lucide-react';

export default function ComparePage() {
  const [evaluation, setEvaluation] = useState<LumenEvaluation | null>(null);
  const [activeTab, setActiveTab] = useState<'without' | 'with'>('without');

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showConcerns, setShowConcerns] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showLumen, setShowLumen] = useState(false);
  const [lumenLoading, setLumenLoading] = useState(false);
  const [showGovernance, setShowGovernance] = useState(false);
  
  const handleGenerate = useCallback(async () => {
    setLoading(true);
    
    setTimeout(async () => {
      setLoading(false);
      setGenerated(true);
      setShowRecommendation(true);
      
      setTimeout(() => setShowConcerns(true), 600);
      setTimeout(() => setShowMissing(true), 1200);
      
      setTimeout(async () => {
        setShowLumen(true);
        setLumenLoading(true);
        const result = await evaluateClinicalDecision();
        setEvaluation(result);
        setLumenLoading(false);
        setTimeout(() => setShowGovernance(true), 800);
      }, 800);
    }, 2200);
  }, []);
  
  const { vitals, labs } = patient;

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-clinical-navy text-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between shrink-0 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xl">🏥</span>
          <span className="font-semibold text-sm sm:text-base">Oak Valley Regional Medical Centre</span>
        </div>
        <div className="text-center order-3 sm:order-2">
          {!generated ? (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`
                inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-sm
                transition-all duration-200
                ${loading
                  ? 'bg-clinical-blue/70 text-white cursor-wait'
                  : 'bg-clinical-blue text-white hover:bg-clinical-blue/90 hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Analyzing Patient Data...</span>
                  <span className="sm:hidden">Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Run AI Triage Companion</span>
                  <span className="sm:hidden">Run AI</span>
                </>
              )}
            </button>
          ) : (
            <span className="text-xs sm:text-sm text-gray-300">Same AI, same patient, different governance</span>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 order-2 sm:order-3">
          <span className="font-mono text-xs sm:text-sm">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <Link href="/" className="text-white/60 hover:text-white text-xs underline">← Back</Link>
        </div>
      </div>

      {/* Compact Patient Summary Bar */}
      <div className="bg-clinical-navy-light text-white px-4 sm:px-6 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm shrink-0 border-t border-white/10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-gray-400">{patient.mrn}</span>
          <span className="font-bold">{patient.name}</span>
          <span className="text-gray-400">({patient.age}{patient.sex.charAt(0)})</span>
          <span className="bg-medical-amber text-clinical-navy px-2 py-0.5 rounded text-xs font-bold">
            {patient.triageLevel}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-300 flex-wrap">
          <span>Temp <span className="text-medical-red font-mono font-bold">{vitals.temp}°C</span></span>
          <span>HR <span className="text-medical-red font-mono font-bold">{vitals.hr}</span></span>
          <span>BP <span className="text-medical-red font-mono font-bold">{vitals.bp}</span></span>
          <span className="hidden sm:inline">SpO₂ <span className="text-medical-red font-mono font-bold">{vitals.spo2}%</span></span>
          <span className="hidden sm:inline">GCS <span className="font-mono font-bold">{vitals.gcs}</span></span>
          <span>SOFA <span className="text-medical-red font-mono font-bold">{patient.sofaScore.total}</span></span>
        </div>
        <div className="sm:ml-auto text-xs text-gray-400">
          <span className="text-medical-red font-semibold">⚠️ {patient.allergies.join('; ')}</span>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden bg-gray-100 border-b flex shrink-0">
        <button
          onClick={() => setActiveTab('without')}
          className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
            activeTab === 'without'
              ? 'bg-medical-red text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🚫 Without LUMEN
        </button>
        <button
          onClick={() => setActiveTab('with')}
          className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
            activeTab === 'with'
              ? 'bg-medical-green text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🛡️ With LUMEN
        </button>
      </div>

      {/* Split Container - Desktop: side by side, Mobile: tabbed */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - WITHOUT LUMEN */}
        <div className={`${activeTab === 'without' ? 'block' : 'hidden'} lg:block lg:w-1/2 h-full overflow-auto bg-ehr-bg border-r-0 lg:border-r-2 border-medical-red/30`}>
          {/* Warning Banner - Desktop only */}
          <div className="hidden lg:block bg-medical-red text-white px-4 py-2 text-center text-sm font-semibold sticky top-0 z-10">
            🚫 WITHOUT LUMEN - No Governance
          </div>

          <div className="p-4 space-y-4">
            {showRecommendation && (
              <div className="animate-fadeIn">
                <AIRecommendationCard recommendation={aiRecommendation} />
              </div>
            )}
            {showConcerns && (
              <div className="animate-fadeIn">
                <ConcernsCard recommendation={aiRecommendation} />
              </div>
            )}
            {showMissing && (
              <div className="animate-fadeIn">
                <MissingGovernanceCard recommendation={aiRecommendation} />
              </div>
            )}
            {!generated && !loading && (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                Click "Run AI Triage Companion" to generate
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center h-48">
                <div className="text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-medical-red mx-auto" />
                  <p className="text-sm text-gray-500">Raw AI output incoming...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - WITH LUMEN */}
        <div className={`${activeTab === 'with' ? 'block' : 'hidden'} lg:block lg:w-1/2 h-full overflow-auto bg-ehr-bg border-l-0 lg:border-l-2 border-medical-green/30`}>
          {/* LUMEN Active Banner - Desktop only */}
          <div className="hidden lg:block bg-medical-green text-white px-4 py-2 text-center text-sm font-semibold sticky top-0 z-10">
            🛡️ WITH LUMEN - Runtime Governance Active
          </div>

          <div className="p-4 space-y-4">
            {showRecommendation && (
              <div className="animate-fadeIn">
                <AIRecommendationCard recommendation={aiRecommendation} />
              </div>
            )}
            {showLumen && (
              <div className="animate-fadeIn">
                <LumenScoreCard evaluation={evaluation} loading={lumenLoading} />
              </div>
            )}
            {showGovernance && evaluation && (
              <>
                <div className="animate-fadeIn">
                  <RiskRadar evaluation={evaluation} />
                </div>
                <div className="animate-fadeIn">
                  <PolicyPack evaluation={evaluation} />
                </div>
                <div className="animate-fadeIn">
                  <ValidatedConcerns evaluation={evaluation} />
                </div>
                <div className="animate-fadeIn">
                  <AuditRecord evaluation={evaluation} />
                </div>
                <div className="animate-fadeIn">
                  <GovernanceBanner />
                </div>
              </>
            )}
            {!generated && !loading && (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                Click "Run AI Triage Companion" to generate
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center h-48">
                <div className="text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-medical-green mx-auto" />
                  <p className="text-sm text-gray-500">AI output + LUMEN evaluation...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
