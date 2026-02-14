'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { patient } from '@/data/patient';
import { aiRecommendation } from '@/data/ai-recommendation';
import { 
  PatientBanner, 
  VitalsCard, 
  LabsCard, 
  HistoryCard, 
  SofaScoreCard 
} from '@/components/PatientData';
import { 
  AIRecommendationCard, 
  ConcernsCard, 
  MissingGovernanceCard 
} from '@/components/AIRecommendation';
import { TriageButton } from '@/components/TriageButton';

export default function WithoutLumenPage() {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showConcerns, setShowConcerns] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  
  const handleGenerate = useCallback(() => {
    setLoading(true);
    // Simulate AI inference time
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setShowRecommendation(true);
      // Stagger the concern cards
      setTimeout(() => setShowConcerns(true), 600);
      setTimeout(() => setShowMissing(true), 1200);
    }, 2200);
  }, []);
  
  return (
    <main className="min-h-screen bg-ehr-bg pb-12">
      {/* Patient Banner */}
      <PatientBanner patient={patient} />
      
      {/* Warning Banner */}
      <div className="bg-medical-red text-white px-4 sm:px-6 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
        <Link href="/demo/with-lumen" className="text-white/70 hover:text-white text-xs underline text-center sm:text-left">← View With LUMEN</Link>
        <div className="flex items-center justify-center gap-2 text-center">
          <span className="font-bold text-xs sm:text-sm">⚠️ API LAYER VIEW:</span>
          <span className="text-xs hidden md:inline">AI model output goes directly to clinician. No governance. No audit trail.</span>
          <span className="text-xs sm:hidden">No governance. No audit trail.</span>
        </div>
        <Link href="/demo/compare" className="text-white/70 hover:text-white text-xs underline text-center sm:text-right">Side-by-Side →</Link>
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
          
          {/* Column 3: The Problem — NO GOVERNANCE (30%) */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-4 space-y-4">
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
          </div>
        </div>
      </div>
    </main>
  );
}
