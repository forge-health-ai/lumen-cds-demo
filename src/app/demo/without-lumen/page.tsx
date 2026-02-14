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

export default function WithoutLumenPage() {
  return (
    <main className="min-h-screen bg-ehr-bg pb-12">
      {/* Patient Banner */}
      <PatientBanner patient={patient} />
      
      {/* Warning Banner */}
      <div className="bg-medical-red text-white px-6 py-2 flex items-center justify-center gap-2">
        <span className="font-bold">⚠️ API LAYER VIEW:</span>
        <span>AI model output goes directly to clinician — no governance, no audit trail</span>
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
          
          {/* Column 3: The Problem — NO GOVERNANCE (30%) */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-4 space-y-4">
            <ConcernsCard recommendation={aiRecommendation} />
            <MissingGovernanceCard recommendation={aiRecommendation} />
          </div>
        </div>
      </div>
    </main>
  );
}
