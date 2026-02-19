'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { ClaimData } from '@/components/ClaimData';
import { FraudModelOutput } from '@/components/FraudModelOutput';
import { LumenPharmaGovernance } from '@/components/LumenPharmaGovernance';
import { useState } from 'react';

export default function PharmaWithPage() {
  const [showResults, setShowResults] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-clinical-navy to-clinical-navy-light">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-amber-500/20">
        <div className="flex items-center gap-4">
          <Link href="/demo/pharma" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-400" />
            <span className="text-white font-bold text-lg">With LUMEN SDK</span>
          </div>
        </div>
        <Link href="/demo/pharma/compare" className="flex items-center gap-1 text-clinical-teal hover:text-clinical-teal/80 transition-colors text-sm font-semibold">
          Compare side-by-side
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        {/* Claim Data */}
        <ClaimData />

        {/* Run AI Button */}
        <div className="my-6 text-center">
          <button
            onClick={() => setShowResults(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-purple-600/30"
          >
            🤖 Run AI Fraud Detection
          </button>
        </div>

        {showResults && (
          <>
            {/* AI Output */}
            <FraudModelOutput />

            {/* LUMEN Governance — Collapsible */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <img src="/lumen-aperture.png" alt="LUMEN" className="w-5 h-5" />
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">LUMEN Runtime Governance</h3>
                <span className="text-xs text-slate-500 ml-auto">Evaluated in 38ms</span>
              </div>
              <LumenPharmaGovernance />
            </div>

            {/* What Changed */}
            <div className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <h4 className="text-amber-400 font-bold text-lg mb-3">What LUMEN Changed</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✅</span>
                  <div>
                    <span className="text-white font-medium">Bias detected</span>
                    <p className="text-slate-400">Oncology claims flagged 3.2x more — model needs retraining</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✅</span>
                  <div>
                    <span className="text-white font-medium">Auto-denial blocked</span>
                    <p className="text-slate-400">Non-negotiable rule: no automated adverse decisions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✅</span>
                  <div>
                    <span className="text-white font-medium">Human review enforced</span>
                    <p className="text-slate-400">Routed to senior reviewer before any action</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✅</span>
                  <div>
                    <span className="text-white font-medium">Audit trail created</span>
                    <p className="text-slate-400">Complete defensible record for regulators and appeals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm mb-4">
                Maria Santos keeps her cancer treatment. The fraud model gets audited. The decision is defensible.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/demo/pharma/compare"
                  className="bg-clinical-teal hover:bg-clinical-teal/80 text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
                >
                  Compare Side-by-Side →
                </Link>
                <a
                  href="https://forgelumen.ca"
                  target="_blank"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg transition-all"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
