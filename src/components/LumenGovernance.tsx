'use client';

import { useState, useEffect } from 'react';
import type { LumenEvaluation } from '@/lib/lumen';
import { Shield, FileCheck, AlertCircle, CheckCircle, Activity, Lock } from 'lucide-react';

interface LumenScoreCardProps {
  evaluation: LumenEvaluation | null;
  loading: boolean;
}

export function LumenScoreCard({ evaluation, loading }: LumenScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    if (evaluation && !loading) {
      let start = 0;
      const end = evaluation.score;
      const duration = 1000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [evaluation, loading]);
  
  if (loading) {
    return (
      <div className="ehr-card bg-white rounded-lg p-5 border-2 border-clinical-teal">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clinical-teal"></div>
        </div>
      </div>
    );
  }
  
  if (!evaluation) return null;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-medical-green';
    if (score >= 60) return 'text-medical-amber';
    return 'text-medical-red';
  };
  
  return (
    <div className="ehr-card bg-white rounded-lg p-5 border-2 border-clinical-teal">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-clinical-teal/10 p-2 rounded-lg">
          <Shield className="w-6 h-6 text-clinical-teal" />
        </div>
        <div>
          <h2 className="font-bold text-clinical-navy">LUMEN Score</h2>
          <div className="text-xs text-gray-500">
            Runtime Governance Evaluation
          </div>
        </div>
      </div>
      
      {/* Score Display */}
      <div className="text-center mb-4">
        <div className={`text-6xl font-bold ${getScoreColor(evaluation.score)}`}>
          {displayScore}
          <span className="text-2xl text-gray-400">/100</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="bg-clinical-teal/10 text-clinical-teal px-3 py-1 rounded-full text-sm font-semibold">
            {evaluation.tier}
          </span>
          <span className="bg-medical-amber/10 text-medical-amber px-3 py-1 rounded-full text-sm font-semibold">
            {evaluation.verdict}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Evaluated in {evaluation.evaluationTime}
        </div>
      </div>
    </div>
  );
}

interface RiskRadarProps {
  evaluation: LumenEvaluation | null;
}

export function RiskRadar({ evaluation }: RiskRadarProps) {
  if (!evaluation) return null;
  
  const getScoreColor = (score: number, flagged?: boolean) => {
    if (flagged) return 'bg-medical-amber';
    if (score >= 8) return 'bg-medical-green';
    if (score >= 6) return 'bg-clinical-blue';
    return 'bg-medical-red';
  };
  
  return (
    <div className="ehr-card bg-white rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-5 h-5 text-clinical-teal" />
        <h3 className="font-semibold text-clinical-navy">Risk Radar</h3>
      </div>
      
      <div className="space-y-2">
        {evaluation.domains.map((domain) => (
          <div key={domain.name} className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-32 truncate">{domain.name}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getScoreColor(domain.score, domain.flagged)}`}
                style={{ width: `${domain.score * 10}%` }}
              />
            </div>
            <span className={`text-xs font-mono font-bold w-8 text-right ${domain.flagged ? 'text-medical-amber' : ''}`}>
              {domain.score}/10
            </span>
            {domain.flagged && <span className="text-medical-amber text-xs">⚠️</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

interface PolicyPackProps {
  evaluation: LumenEvaluation | null;
}

export function PolicyPack({ evaluation }: PolicyPackProps) {
  if (!evaluation) return null;
  
  const { policyPack } = evaluation;
  
  const statusIcons = {
    PASS: <CheckCircle className="w-4 h-4 text-medical-green" />,
    FAIL: <AlertCircle className="w-4 h-4 text-medical-red" />,
    REVIEW: <AlertCircle className="w-4 h-4 text-medical-amber" />
  };
  
  return (
    <div className="ehr-card bg-white rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-5 h-5 text-clinical-teal" />
        <h3 className="font-semibold text-clinical-navy">Policy Pack: {policyPack.name}</h3>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        {policyPack.rulesEvaluated} rules evaluated
      </div>
      
      <div className="space-y-2">
        {policyPack.rules.slice(0, 6).map((rule) => (
          <div key={rule.id} className="flex items-start gap-2 text-sm">
            {statusIcons[rule.status]}
            <div className="flex-1">
              <span className="font-medium text-gray-700">{rule.id}</span>
              <span className="text-gray-600 ml-2">{rule.description}</span>
              {rule.details && (
                <span className="text-gray-500 block text-xs">{rule.details}</span>
              )}
            </div>
            <span className={`text-xs font-bold ${
              rule.status === 'PASS' ? 'text-medical-green' : 
              rule.status === 'FAIL' ? 'text-medical-red' : 'text-medical-amber'
            }`}>
              {rule.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ValidatedConcernsProps {
  evaluation: LumenEvaluation | null;
}

export function ValidatedConcerns({ evaluation }: ValidatedConcernsProps) {
  if (!evaluation) return null;
  
  const statusIcons = {
    ADDRESSED: <CheckCircle className="w-4 h-4 text-medical-green" />,
    FLAGGED: <AlertCircle className="w-4 h-4 text-medical-amber" />,
    VALIDATED: <CheckCircle className="w-4 h-4 text-clinical-blue" />
  };
  
  return (
    <div className="ehr-card bg-medical-green-light border border-medical-green rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <FileCheck className="w-5 h-5 text-medical-green" />
        <h3 className="font-bold text-medical-green">AI Recommendation Validated</h3>
      </div>
      
      <div className="space-y-3">
        {evaluation.validatedConcerns.map((concern, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            {statusIcons[concern.status]}
            <div className="flex-1">
              <p className="text-gray-700">{concern.lumenNote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AuditRecordProps {
  evaluation: LumenEvaluation | null;
}

export function AuditRecord({ evaluation }: AuditRecordProps) {
  if (!evaluation) return null;
  
  const { auditRecord } = evaluation;
  
  return (
    <div className="ehr-card bg-white rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <FileCheck className="w-5 h-5 text-clinical-teal" />
        <h3 className="font-semibold text-clinical-navy">Audit Record</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Fingerprint</span>
          <span className="font-mono text-xs">{auditRecord.fingerprint}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Signature</span>
          <span className="font-mono text-xs truncate max-w-32">{auditRecord.signature}</span>
        </div>
        <div>
          <span className="text-gray-500 block mb-1">Frameworks Evaluated</span>
          <div className="flex gap-2">
            {auditRecord.frameworks.map((framework) => (
              <span key={framework} className="bg-clinical-navy/10 text-clinical-navy px-2 py-0.5 rounded text-xs">
                {framework}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-600">
          Decision record: <span className="font-semibold">Exportable PDF for regulatory audit</span>
        </div>
        <div className="text-medical-green font-semibold text-sm mt-1">
          ✓ This decision is defensible.
        </div>
      </div>
    </div>
  );
}

export function GovernanceBanner() {
  return (
    <div className="mt-4 p-4 bg-medical-green text-white rounded-lg text-center font-semibold">
      ✅ This AI recommendation has been scored, validated, and documented. The clinician has a DEFENSIBLE DECISION RECORD.
    </div>
  );
}
