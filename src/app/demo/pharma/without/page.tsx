'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, AlertTriangle, XCircle } from 'lucide-react';
import { ClaimData } from '@/components/ClaimData';
import { FraudModelOutput } from '@/components/FraudModelOutput';
import { useState } from 'react';

const missingGovernance = [
  {
    icon: '⚠️',
    title: 'No Bias Check',
    detail: 'Model disproportionately flags oncology patients — 3.2x higher flag rate than cardiology. No disparate impact analysis conducted.',
  },
  {
    icon: '⚠️',
    title: 'No Explainability',
    detail: '"91% fraud probability" with no human-readable rationale. Claimant cannot understand or contest the basis for denial.',
  },
  {
    icon: '⚠️',
    title: 'No Human Review',
    detail: 'Claim auto-routed to denial queue. No reviewer assigned. Fully automated adverse coverage decision.',
  },
  {
    icon: '⚠️',
    title: 'No Regulatory Compliance',
    detail: 'FTC AI enforcement requires fair automated decisions. CMS guidance prohibits fully automated adverse determinations.',
  },
  {
    icon: '⚠️',
    title: 'No Appeal Pathway',
    detail: 'No documented process for claimant to contest AI-driven denial. Violates state insurance regulations.',
  },
];

export default function PharmaWithoutPage() {
  const [showConcerns, setShowConcerns] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-clinical-navy to-clinical-navy-light">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-red-500/20">
        <div className="flex items-center gap-4">
          <Link href="/demo/pharma" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-medical-red" />
            <span className="text-white font-bold text-lg">Without Governance</span>
          </div>
        </div>
        <Link href="/demo/pharma/with" className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold">
          See with LUMEN
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        {/* Claim Data */}
        <ClaimData />

        {/* Run AI Button */}
        <div className="my-6 text-center">
          <button
            onClick={() => setShowConcerns(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-purple-600/30"
          >
            🤖 Run AI Fraud Detection
          </button>
        </div>

        {showConcerns && (
          <>
            {/* AI Output */}
            <FraudModelOutput />

            {/* Missing Governance */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-bold text-red-400">What&apos;s Missing</h3>
              </div>
              <div className="space-y-3">
                {missingGovernance.map((item, i) => (
                  <div
                    key={i}
                    className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 animate-fadeIn"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-red-400">{item.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Warning */}
            <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
              <p className="text-red-400 font-bold text-lg mb-2">
                This claim was denied by an algorithm.
              </p>
              <p className="text-slate-400 text-sm">
                No human reviewed it. No bias was checked. No explanation was given. The patient&apos;s cancer treatment was interrupted based on a score they can&apos;t see or contest.
              </p>
              <Link
                href="/demo/pharma/with"
                className="inline-block mt-4 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
              >
                See what changes with LUMEN →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
