'use client';

import { useState } from 'react';
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
import { useEffect } from 'react';

export default function ComparePage() {
  const [splitPosition, setSplitPosition] = useState(50);
  const [evaluation, setEvaluation] = useState<LumenEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEvaluation = async () => {
      const result = await evaluateClinicalDecision();
      setEvaluation(result);
      setLoading(false);
    };
    fetchEvaluation();
  }, []);
  
  const handleDrag = (e: React.MouseEvent) => {
    const container = e.currentTarget.parentElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSplitPosition(Math.max(20, Math.min(80, percentage)));
  };
  
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-clinical-navy text-white px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xl">🏥</span>
          <span className="font-semibold">Oak Valley Regional Medical Centre</span>
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-300">Drag the handle to compare — same AI, same patient, different governance</span>
        </div>
        <div className="font-mono text-sm">
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {/* Split Container */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Side - WITHOUT LUMEN */}
        <div 
          className="h-full overflow-auto bg-ehr-bg border-r-4 border-medical-red"
          style={{ width: `${splitPosition}%` }}
        >
          {/* Warning Banner */}
          <div className="bg-medical-red text-white px-4 py-2 text-center text-sm font-semibold sticky top-0 z-10">
            🚫 WITHOUT LUMEN — No Governance
          </div>
          
          <div className="p-4">
            {/* Mini Patient Banner */}
            <div className="bg-clinical-navy text-white px-4 py-3 rounded mb-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-mono text-sm">{patient.mrn}</span>
                <span className="font-bold">{patient.name}</span>
                <span className="text-gray-300">({patient.age}{patient.sex.charAt(0)})</span>
                <span className="bg-medical-amber text-clinical-navy px-2 py-0.5 rounded text-xs font-bold">
                  {patient.triageLevel}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <VitalsCard patient={patient} />
              <LabsCard patient={patient} />
              <SofaScoreCard patient={patient} />
              <HistoryCard patient={patient} />
              <div className="col-span-2">
                <AIRecommendationCard recommendation={aiRecommendation} />
              </div>
              <div className="col-span-2">
                <ConcernsCard recommendation={aiRecommendation} />
              </div>
              <div className="col-span-2">
                <MissingGovernanceCard recommendation={aiRecommendation} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Drag Handle */}
        <div 
          className="absolute top-0 bottom-0 w-8 -ml-4 cursor-col-resize z-20 flex items-center justify-center"
          style={{ left: `${splitPosition}%` }}
          onMouseDown={(e) => {
            const handleMouseMove = (e: MouseEvent) => {
              const container = document.querySelector('.flex-1');
              if (!container) return;
              const rect = container.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = (x / rect.width) * 100;
              setSplitPosition(Math.max(20, Math.min(80, percentage)));
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          <div className="bg-clinical-teal text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            ⇄
          </div>
        </div>
        
        {/* Right Side - WITH LUMEN */}
        <div 
          className="h-full overflow-auto bg-ehr-bg border-l-4 border-medical-green"
          style={{ width: `${100 - splitPosition}%` }}
        >
          {/* LUMEN Active Banner */}
          <div className="bg-medical-green text-white px-4 py-2 text-center text-sm font-semibold sticky top-0 z-10">
            🛡️ WITH LUMEN — Runtime Governance Active
          </div>
          
          <div className="p-4">
            {/* Mini Patient Banner */}
            <div className="bg-clinical-navy text-white px-4 py-3 rounded mb-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-mono text-sm">{patient.mrn}</span>
                <span className="font-bold">{patient.name}</span>
                <span className="text-gray-300">({patient.age}{patient.sex.charAt(0)})</span>
                <span className="bg-medical-amber text-clinical-navy px-2 py-0.5 rounded text-xs font-bold">
                  {patient.triageLevel}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <VitalsCard patient={patient} />
              <LabsCard patient={patient} />
              <SofaScoreCard patient={patient} />
              <HistoryCard patient={patient} />
              <div className="col-span-2">
                <AIRecommendationCard recommendation={aiRecommendation} />
              </div>
              <div className="col-span-2">
                <LumenScoreCard evaluation={evaluation} loading={loading} />
              </div>
              <div className="col-span-2">
                <RiskRadar evaluation={evaluation} />
              </div>
              <div className="col-span-2">
                <PolicyPack evaluation={evaluation} />
              </div>
              <div className="col-span-2">
                <ValidatedConcerns evaluation={evaluation} />
              </div>
              <div className="col-span-2">
                <AuditRecord evaluation={evaluation} />
              </div>
              <div className="col-span-2">
                <GovernanceBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
