import Link from 'next/link';
import { Shield, AlertTriangle, Scale, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-clinical-navy to-clinical-navy-light">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-clinical-teal" />
          <span className="text-white font-bold text-xl">LUMEN CDS Demo</span>
        </div>
        <div className="bg-clinical-teal/20 text-clinical-teal px-3 py-1 rounded-full text-sm">
          @forgehealth/lumen-sdk
        </div>
      </header>
      
      {/* Hero */}
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full mb-6">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Emergency Department Sepsis Triage Scenario</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Clinical Decision Support
            <span className="block text-clinical-teal">With Runtime Governance</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-2">
            A 72-year-old patient presents with septic shock. The AI recommends aggressive treatment.
            <br />See what happens at the API layer — with and without LUMEN.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-10">
            EHR-agnostic · No Epic/Cerner integration required · Evaluates in &lt;50ms · Audit-ready
          </p>
        </div>
        
        {/* Architecture Flow — single horizontal line */}
        <div className="flex items-center justify-center gap-2 mb-10 text-sm flex-wrap">
          <span className="bg-gray-700/50 border border-gray-600 text-gray-300 px-3 py-1.5 rounded-lg">🏥 Your EHR</span>
          <span className="text-gray-500">→</span>
          <span className="bg-clinical-blue/20 border border-clinical-blue/50 text-gray-300 px-3 py-1.5 rounded-lg">🤖 AI Model</span>
          <span className="text-gray-500">→</span>
          <span className="bg-clinical-teal/20 border-2 border-clinical-teal text-clinical-teal font-bold px-3 py-1.5 rounded-lg">🛡️ LUMEN SDK <span className="text-xs font-normal text-gray-400">&lt;50ms</span></span>
          <span className="text-gray-500">→</span>
          <span className="bg-medical-green/20 border border-medical-green/50 text-gray-300 px-3 py-1.5 rounded-lg">👨‍⚕️ Clinician</span>
        </div>

        {/* Demo Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {/* Without LUMEN */}
          <Link href="/demo/without-lumen" className="group">
            <div className="bg-gradient-to-b from-medical-red/20 to-medical-red/5 border-2 border-medical-red/50 hover:border-medical-red rounded-xl p-8 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-medical-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-medical-red" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">🚫 WITHOUT</h2>
              <h3 className="text-xl font-semibold text-medical-red mb-4">Governance</h3>
              <p className="text-gray-400 text-sm">
                AI output goes straight to the clinician. No scoring, no compliance, no audit trail.
              </p>
              <div className="mt-6 text-medical-red font-semibold group-hover:underline">
                View Demo →
              </div>
            </div>
          </Link>
          
          {/* With LUMEN */}
          <Link href="/demo/with-lumen" className="group">
            <div className="bg-gradient-to-b from-medical-green/20 to-medical-green/5 border-2 border-medical-green/50 hover:border-medical-green rounded-xl p-8 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-medical-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-medical-green" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">🛡️ WITH</h2>
              <h3 className="text-xl font-semibold text-medical-green mb-4">LUMEN SDK</h3>
              <p className="text-gray-400 text-sm">
                AI output scored, validated against PHIPA, and documented in under 50ms.
              </p>
              <div className="mt-6 text-medical-green font-semibold group-hover:underline">
                View Demo →
              </div>
            </div>
          </Link>
          
          {/* Compare */}
          <Link href="/demo/compare" className="group">
            <div className="bg-gradient-to-b from-clinical-teal/20 to-clinical-teal/5 border-2 border-clinical-teal/50 hover:border-clinical-teal rounded-xl p-8 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-clinical-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-clinical-teal" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">⚖️</h2>
              <h3 className="text-xl font-semibold text-clinical-teal mb-4">Side-by-Side</h3>
              <p className="text-gray-400 text-sm">
                Same AI, same patient, different governance. Drag to compare side-by-side.
              </p>
              <div className="mt-6 text-clinical-teal font-semibold group-hover:underline">
                Compare →
              </div>
            </div>
          </Link>
        </div>

        {/* One-liner positioning */}
        <p className="text-xs text-gray-500 max-w-2xl mx-auto">
          LUMEN is not a CDS system. It&apos;s an API middleware SDK embedded by the CDS vendor — your EHR and clinician workflow stay unchanged.
        </p>
      </div>
      
      {/* Footer Info */}
      <div className="fixed bottom-8 right-8">
        <div className="bg-white/10 backdrop-blur text-white px-4 py-2 rounded-lg text-sm">
          <span className="font-semibold text-clinical-teal">LUMEN SDK</span>
          <span className="mx-2">|</span>
          <span>v1.0.4</span>
        </div>
      </div>
    </main>
  );
}
