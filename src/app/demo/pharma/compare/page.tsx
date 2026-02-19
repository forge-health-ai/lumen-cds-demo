'use client';

import Link from 'next/link';
import { ArrowLeft, XCircle, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ClaimData } from '@/components/ClaimData';
import { aiFraudOutput, lumenPharmaEvaluation } from '@/data/claim';
import { useState } from 'react';

export default function PharmaComparePage() {
  const [showResults, setShowResults] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-clinical-navy to-clinical-navy-light">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-clinical-teal/20">
        <div className="flex items-center gap-4">
          <Link href="/demo/pharma" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">⚖️ Side-by-Side Comparison</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        {/* Shared Claim Data */}
        <ClaimData />

        {/* Run Button */}
        <div className="my-6 text-center">
          <button
            onClick={() => setShowResults(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-purple-600/30"
          >
            🤖 Run AI Fraud Detection on Both
          </button>
        </div>

        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* LEFT — Without */}
            <div className="border-2 border-red-500/30 rounded-xl overflow-hidden">
              <div className="bg-red-500/10 px-4 py-3 flex items-center gap-2 border-b border-red-500/20">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold">WITHOUT Governance</span>
              </div>
              <div className="p-4 space-y-4">
                {/* AI Verdict */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                  <div className="text-sm text-red-400 font-semibold mb-1">AI Fraud Score</div>
                  <div className="text-4xl font-bold text-red-400">{aiFraudOutput.fraudProbability}%</div>
                  <div className="mt-2">
                    <span className="bg-red-500 text-white font-bold px-4 py-1.5 rounded text-sm">
                      AUTO-DENY
                    </span>
                  </div>
                </div>

                {/* What happens */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">What Happens</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-slate-400">Claim auto-routed to denial queue</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-slate-400">No human reviews the decision</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-slate-400">No bias check on oncology flag rate</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-slate-400">No audit trail for regulators</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-slate-400">No appeal pathway for patient</span>
                    </div>
                  </div>
                </div>

                {/* Outcome */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 font-bold text-sm">Outcome:</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Maria&apos;s immunotherapy is denied. Her cancer treatment is interrupted. She has no explanation and no recourse.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — With LUMEN */}
            <div className="border-2 border-amber-500/30 rounded-xl overflow-hidden">
              <div className="bg-amber-500/10 px-4 py-3 flex items-center gap-2 border-b border-amber-500/20">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-bold">WITH LUMEN SDK</span>
              </div>
              <div className="p-4 space-y-4">
                {/* LUMEN Score */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
                  <div className="text-sm text-slate-400 font-semibold mb-1">
                    AI Score: {aiFraudOutput.fraudProbability}% → <span className="text-amber-400">LUMEN Score</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-amber-400">{lumenPharmaEvaluation.lumenScore}</span>
                    <span className="text-lg text-slate-500">/100</span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded text-sm">
                      ⚠️ REVIEW REQUIRED
                    </span>
                  </div>
                </div>

                {/* What happens */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">What Happens</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Auto-denial <strong className="text-amber-400">blocked</strong> — non-negotiable rule triggered</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Routed to <strong className="text-amber-400">senior claims reviewer</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Bias flag: oncology patients flagged <strong className="text-amber-400">3.2x</strong> more than cardiology</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Full audit trail created for FTC/CMS compliance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Appeal pathway documented and accessible</span>
                    </div>
                  </div>
                </div>

                {/* Outcome */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-400 font-bold text-sm">Outcome:</p>
                  <p className="text-slate-300 text-sm mt-1">
                    Maria keeps her cancer treatment. A human reviews the flag. The fraud model gets audited for bias. The decision is defensible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {showResults && (
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm mb-4">Same AI. Same claim. Different governance. Different outcome.</p>
            <a
              href="https://forgelumen.ca"
              target="_blank"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              Get LUMEN SDK — Free Tier Available →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
