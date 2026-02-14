import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUMEN CDS Demo - Clinical Decision Support with Runtime Governance',
  description: 'Demonstration of AI-assisted clinical decision support with and without LUMEN SDK runtime governance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ehr-bg">
        {children}
        
        {/* Synthetic Data Footer */}
        <footer className="sticky bottom-0 left-0 right-0 bg-clinical-navy text-white text-xs py-2 px-4 z-50 flex items-center justify-between">
          <a href="/" className="text-white/60 hover:text-white underline">← Back to LUMEN SDK</a>
          <div>
            <span className="font-bold text-medical-amber">⚠️ SYNTHETIC DATA</span>
            <span className="mx-2">—</span>
            <span>No real patient information. Demo by FORGE Health</span>
            <span className="mx-2">|</span>
            <span>© 2026 Forge Partners Inc.</span>
          </div>
          <div className="w-24"></div>
        </footer>
      </body>
    </html>
  );
}
