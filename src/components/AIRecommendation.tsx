'use client';

import { useState } from 'react';
import type { AIRecommendation } from '@/data/ai-recommendation';
import { Bot, ChevronDown, ChevronUp, BookOpen, AlertTriangle } from 'lucide-react';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
}

export function AIRecommendationCard({ recommendation }: AIRecommendationCardProps) {
  const [showCitations, setShowCitations] = useState(false);
  
  const priorityColors = {
    STAT: 'bg-medical-red text-white',
    URGENT: 'bg-medical-amber text-white',
    ROUTINE: 'bg-clinical-blue text-white'
  };
  
  return (
    <div className="ehr-card bg-white rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-clinical-blue/10 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-clinical-blue" />
        </div>
        <div>
          <h2 className="font-bold text-clinical-navy">AI Triage Companion</h2>
          <div className="text-xs text-gray-500">
            {recommendation.model} • {recommendation.timestamp}
          </div>
        </div>
      </div>
      
      {/* Primary Recommendation */}
      <div className="bg-clinical-navy/5 border-l-4 border-clinical-blue p-4 mb-4 rounded-r">
        <div className="text-sm text-gray-600 mb-1">Primary Recommendation</div>
        <div className="text-xl font-bold text-clinical-navy">
          {recommendation.primaryRecommendation}
        </div>
      </div>
      
      {/* Confidence */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">Confidence Score</span>
          <span className="font-mono font-bold text-clinical-navy">
            {(recommendation.confidenceScore * 100).toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-clinical-blue h-2 rounded-full transition-all duration-1000"
            style={{ width: `${recommendation.confidenceScore * 100}%` }}
          />
        </div>
      </div>
      
      {/* Reasoning */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">AI Reasoning</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          {recommendation.reasoning.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ol>
      </div>
      
      {/* Recommended Actions */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Recommended Actions</h3>
        <div className="space-y-2">
          {recommendation.recommendedActions.map((action, i) => (
            <div key={i} className="border border-gray-200 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${priorityColors[action.priority]}`}>
                  {action.priority}
                </span>
                <span className="font-medium text-sm">{action.action}</span>
              </div>
              <p className="text-xs text-gray-500 ml-16">{action.rationale}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Citations */}
      <div>
        <button 
          onClick={() => setShowCitations(!showCitations)}
          className="flex items-center gap-2 text-sm text-clinical-blue hover:underline"
        >
          <BookOpen className="w-4 h-4" />
          <span>Clinical Citations ({recommendation.citations.length})</span>
          {showCitations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {showCitations && (
          <div className="mt-2 space-y-2 text-xs text-gray-600">
            {recommendation.citations.map((citation) => (
              <div key={citation.id} className="pl-4 border-l-2 border-gray-200">
                <p>[{citation.id}] {citation.text}</p>
                <p className="text-gray-400">DOI: {citation.doi}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ConcernsCardProps {
  recommendation: AIRecommendation;
}

export function ConcernsCard({ recommendation }: ConcernsCardProps) {
  return (
    <div className="ehr-card bg-medical-amber-light border border-medical-amber rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-medical-amber" />
        <h3 className="font-bold text-medical-amber">Clinician Concerns</h3>
      </div>
      
      <ul className="space-y-2">
        {recommendation.concerns.map((concern, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="text-medical-amber font-bold">{i + 1}.</span>
            <span className="text-gray-700">{concern}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface MissingGovernanceCardProps {
  recommendation: AIRecommendation;
}

export function MissingGovernanceCard({ recommendation }: MissingGovernanceCardProps) {
  const missingItems = [
    "No regulatory compliance check performed",
    "No audit trail generated",
    "No PHIPA/HIPAA validation on patient data handling",
    "No bias or fairness assessment",
    "No human override documentation",
    "If questioned by regulator: NO DEFENSIBLE RECORD"
  ];
  
  return (
    <div className="ehr-card bg-medical-red-light border border-medical-red rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-medical-red" />
        <h3 className="font-bold text-medical-red">Missing Governance</h3>
      </div>
      
      <ul className="space-y-2">
        {missingItems.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <span className="text-medical-red">✗</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-4 p-3 bg-medical-red text-white rounded text-center font-semibold">
        ❌ This AI recommendation has NO governance layer. The clinician must trust the AI blindly or reject it entirely.
      </div>
    </div>
  );
}
