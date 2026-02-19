'use client';

import { aiFraudOutput } from '@/data/claim';
import { Bot, AlertTriangle } from 'lucide-react';

export function FraudModelOutput() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-bold text-white">AI Fraud Detection Model</h3>
        <span className="ml-auto text-xs text-slate-500 font-mono">{aiFraudOutput.modelId} · {aiFraudOutput.processingTime}</span>
      </div>

      {/* Main Verdict */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-red-400 font-semibold uppercase tracking-wider">Fraud Probability</span>
          <span className="text-3xl font-bold text-red-400">{aiFraudOutput.fraudProbability}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${aiFraudOutput.fraudProbability}%` }}
            />
          </div>
        </div>
        <div className="mt-3 text-center">
          <span className="inline-block bg-red-500 text-white font-bold text-lg px-6 py-2 rounded-lg">
            RECOMMENDATION: {aiFraudOutput.recommendation}
          </span>
        </div>
      </div>

      {/* Contributing Factors */}
      <div>
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Contributing Factors</h4>
        <div className="space-y-2">
          {aiFraudOutput.contributingFactors.map((factor, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <span className="text-slate-300">{factor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
