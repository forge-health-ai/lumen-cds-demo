import Link from 'next/link';
import { Shield, AlertTriangle, Scale, ArrowLeft } from 'lucide-react';
import { PharmaArchitectureFlow } from '@/components/PharmaArchitectureFlow';

export default function PharmaLandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-clinical-navy to-clinical-navy-light">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <img src="/lumen-aperture.png" alt="LUMEN" className="w-8 h-8" />
            <span className="text-white font-bold text-xl">LUMEN Pharma Demo</span>
          </div>
        </div>
        <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">
          @forgehealth/lumen-sdk
        </div>
      </header>

      {/* Hero */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            AI Claims Fraud Detection
            <span className="block text-amber-400">With Runtime Governance</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
            Flag the fraud. Score the decision. Know it&apos;s defensible.
          </p>

          {/* Use Case Callout */}
          <div className="inline-block bg-white/5 border border-white/10 rounded-lg px-6 py-4 mb-6 max-w-2xl">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Claims Fraud Detection Use Case</div>
            <p className="text-gray-300 text-sm">
              A $47,000 oncology treatment claim is flagged by AI as potentially fraudulent.
              The model says 91% fraud probability. Should the claim be denied?
            </p>
          </div>
        </div>

        {/* Architecture Flow */}
        <div className="mb-10">
          <PharmaArchitectureFlow />
        </div>

        {/* Demo Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8 sm:mb-10">
          {/* Without Governance */}
          <Link href="/demo/pharma/without" className="group h-full">
            <div className="bg-gradient-to-b from-medical-red/20 to-medical-red/5 border-2 border-medical-red/50 hover:border-medical-red rounded-xl p-6 sm:p-8 transition-all hover:scale-105 h-full flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-medical-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-medical-red" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">🚫 WITHOUT</h2>
              <h3 className="text-lg sm:text-xl font-semibold text-medical-red mb-4">Governance</h3>
              <p className="text-gray-400 text-sm flex-grow">
                Raw AI fraud score goes straight to the denial queue. No bias check. No human review. No appeal pathway.
              </p>
              <div className="mt-6 text-medical-red font-semibold group-hover:underline">
                View Demo →
              </div>
            </div>
          </Link>

          {/* With LUMEN */}
          <Link href="/demo/pharma/with" className="group h-full">
            <div className="bg-gradient-to-b from-amber-500/20 to-amber-500/5 border-2 border-amber-500/50 hover:border-amber-500 rounded-xl p-6 sm:p-8 transition-all hover:scale-105 h-full flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">🛡️ WITH</h2>
              <h3 className="text-lg sm:text-xl font-semibold text-amber-400 mb-4">LUMEN SDK</h3>
              <p className="text-gray-400 text-sm flex-grow">
                AI fraud score evaluated against FDA AI/ML governance. Bias detected. Human review enforced.
              </p>
              <div className="mt-6 text-amber-400 font-semibold group-hover:underline">
                View Demo →
              </div>
            </div>
          </Link>

          {/* Compare */}
          <Link href="/demo/pharma/compare" className="group h-full">
            <div className="bg-gradient-to-b from-clinical-teal/20 to-clinical-teal/5 border-2 border-clinical-teal/50 hover:border-clinical-teal rounded-xl p-6 sm:p-8 transition-all hover:scale-105 h-full flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-clinical-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-clinical-teal" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">⚖️</h2>
              <h3 className="text-lg sm:text-xl font-semibold text-clinical-teal mb-4">Side-by-Side</h3>
              <p className="text-gray-400 text-sm flex-grow">
                Same claim, same AI. One governed, one not. See the difference.
              </p>
              <div className="mt-6 text-clinical-teal font-semibold group-hover:underline">
                Compare →
              </div>
            </div>
          </Link>
        </div>

        <p className="text-xs text-gray-500 max-w-2xl mx-auto">
          LUMEN is not a claims system. It&apos;s an API middleware SDK embedded by the AI vendor. Your claims platform and reviewer workflow stay untouched.
        </p>
      </div>

      {/* Footer */}
      <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8">
        <div className="bg-white/10 backdrop-blur text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
          <span className="font-semibold text-amber-400">LUMEN SDK</span>
          <span className="mx-1 sm:mx-2">|</span>
          <span>v1.0.4</span>
        </div>
      </div>
    </main>
  );
}
