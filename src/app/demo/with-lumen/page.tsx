'use client';

import { useState, useEffect } from 'react';
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

export default function WithLumenPage() {
  const [evaluation, setEvaluation] = useState<LumenEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        setLoading(true);
        const result = await evaluateClinicalDecision();
        setEvaluation(result);
      } catch (err) {
        setError('Failed to load LUMEN evaluation');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvaluation();
  }, []);
  
  return (
    <main className="min-h-screen bg-ehr-bg pb-12">
      {/* Patient Banner */}
      <PatientBanner patient={patient} />
      
      {/* LUMEN Active Banner */}
      <div className="bg-clinical-teal text-white px-6 py-2 flex items-center justify-center gap-2">
        <span className="font-bold">🛡️ LUMEN SDK AT API LAYER:</span>
        <span>AI output scored, validated, and documented before reaching clinician — EHR untouched</span>
        <Link href="/" className="ml-auto text-white/80 hover:text-white text-xs underline">← Back to LUMEN SDK</Link>
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
            <AIRecommendationCard recommendation={aiRecommendation} />
          </div>
          
          {/* Column 3: LUMEN Governance Layer (30%) */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-4 space-y-4">
            <LumenScoreCard evaluation={evaluation} loading={loading} />
            <RiskRadar evaluation={evaluation} />
            <PolicyPack evaluation={evaluation} />
            <ValidatedConcerns evaluation={evaluation} />
            <AuditRecord evaluation={evaluation} />
            <GovernanceBanner />
          </div>
        </div>
      </div>
    </main>
  );
}
