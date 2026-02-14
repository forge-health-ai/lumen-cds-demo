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
        <footer className="sticky bottom-0 left-0 right-0 bg-clinical-navy text-white text-xs py-2 px-3 sm:px-4 z-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
            <a href="/" className="text-white/60 hover:text-white underline text-center sm:text-left">← Back to LUMEN SDK</a>
            <div className="text-center">
              <span className="font-bold text-medical-amber">⚠️ SYNTHETIC DATA</span>
              <span className="mx-1 sm:mx-2">-</span>
              <span className="hidden sm:inline">No real patient information. Demo by FORGE Health</span>
              <span className="sm:hidden">Demo by FORGE Health</span>
              <span className="mx-1 sm:mx-2">|</span>
              <span>© 2026 Forge Partners Inc.</span>
            </div>
            <div className="hidden sm:block w-24"></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
