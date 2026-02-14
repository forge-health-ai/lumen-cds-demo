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
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full mb-6">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Emergency Department Sepsis Triage Scenario</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            Clinical Decision Support
            <span className="block text-clinical-teal">With Runtime Governance</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Experience AI-Assisted Clinical Decision Support — With and Without Runtime Governance
          </p>
        </div>
        
        {/* Demo Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Without LUMEN */}
          <Link href="/demo/without-lumen" className="group">
            <div className="bg-gradient-to-b from-medical-red/20 to-medical-red/5 border-2 border-medical-red/50 hover:border-medical-red rounded-xl p-8 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-medical-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-medical-red" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">🚫 WITHOUT</h2>
              <h3 className="text-xl font-semibold text-medical-red mb-4">Governance</h3>
              <p className="text-gray-400 text-sm">
                See the risks of using AI recommendations without runtime governance, audit trails, or regulatory compliance.
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
                See how LUMEN provides scoring, validation, audit trails, and regulatory compliance in real-time.
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
                Compare both scenarios simultaneously. Same AI, same patient, different governance.
              </p>
              <div className="mt-6 text-clinical-teal font-semibold group-hover:underline">
                Compare →
              </div>
            </div>
          </Link>
        </div>
        
        {/* Scenario Info */}
        <div className="mt-16 bg-white/5 rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4">Demo Scenario</h3>
          <p className="text-gray-300">
            <strong className="text-clinical-teal">Emergency Department Sepsis Triage</strong> — 
            A 72-year-old patient presents with altered mental status, fever, and hypotension. 
            The AI recommends aggressive treatment. Should the clinician trust it?
          </p>
        </div>
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
