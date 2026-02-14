'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { patient } from '@/data/patient';
import { aiRecommendation } from '@/data/ai-recommendation';
import { evaluateClinicalDecision, type LumenEvaluation } from '@/lib/lumen';
import { 
  PatientBanner, 
  VitalsCard, 
  LabsCard, 
  HistoryCard, 
  SofaScoreCard 
} from '@/components/PatientData';
import { AIRecommendationCard } from '@/components/AIRecommendation';
import { 
  LumenScoreCard, 
  RiskRadar, 
  PolicyPack, 
  ValidatedConcerns, 
  AuditRecord,
  GovernanceBanner
} from '@/components/LumenGovernance';
import { TriageButton } from '@/components/TriageButton';

export default function WithLumenPage() {
  const [evaluation, setEvaluation] = useState<LumenEvaluation | null>(null);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showLumen, setShowLumen] = useState(false);
  const [lumenLoading, setLumenLoading] = useState(false);
  const [showGovernance, setShowGovernance] = useState(false);
  
  const handleGenerate = useCallback(async () => {
    setLoading(true);
    
    // Simulate AI inference
    setTimeout(async () => {
      setLoading(false);
      setGenerated(true);
      setShowRecommendation(true);
      
      // After AI recommendation appears, trigger LUMEN evaluation
      setTimeout(async () => {
        setShowLumen(true);
        setLumenLoading(true);
        
        // LUMEN evaluates the AI output
        const result = await evaluateClinicalDecision();
        setEvaluation(result);
        setLumenLoading(false);
        
        // Stagger governance panels
        setTimeout(() => setShowGovernance(true), 800);
      }, 800);
    }, 2200);
  }, []);
  
  return (
    <main className="min-h-screen bg-ehr-bg pb-12">
      {/* Patient Banner */}
      <PatientBanner patient={patient} />
      
      {/* LUMEN Active Banner */}
      <div className="bg-clinical-teal text-white px-6 py-2 flex items-center justify-between">
        <Link href="/demo/without-lumen" className="text-white/70 hover:text-white text-xs underline">← View Without LUMEN</Link>
        <div className="flex items-center gap-2">
          <span className="font-bold">🛡️ LUMEN SDK AT API LAYER:</span>
          <span>AI output scored, validated, and documented before reaching clinician — EHR untouched</span>
        </div>
        <Link href="/demo/compare" className="text-white/70 hover:text-white text-xs underline">Side-by-Side →</Link>
      </div>
      
      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Column 1: Patient Data (30%) */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-4">
            <VitalsCard patient={patient} />
            <LabsCard patient={patient} />
            <SofaScoreCard patient={patient} />
            <HistoryCard patient={patient} />
          </div>
          
          {/* Column 2: AI Recommendation (40%) */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5">
            {!generated && (
              <TriageButton onGenerate={handleGenerate} loading={loading} generated={false} />
            )}
            {showRecommendation && (
              <div className="animate-fadeIn">
                <AIRecommendationCard recommendation={aiRecommendation} />
              </div>
            )}
          </div>
          
          {/* Column 3: LUMEN Governance Layer (30%) */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-4 space-y-4">
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
                <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
                  <PolicyPack evaluation={evaluation} />
                </div>
                <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
                  <ValidatedConcerns evaluation={evaluation} />
                </div>
                <div className="animate-fadeIn" style={{ animationDelay: '600ms' }}>
                  <AuditRecord evaluation={evaluation} />
                </div>
                <div className="animate-fadeIn" style={{ animationDelay: '800ms' }}>
                  <GovernanceBanner />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
