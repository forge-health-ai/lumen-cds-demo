import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUMEN CDS Demo — Clinical Decision Support with Runtime Governance',
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
        <footer className="sticky bottom-0 left-0 right-0 bg-clinical-navy text-white text-xs py-2 px-4 text-center z-50">
          <span className="font-bold text-medical-amber">⚠️ SYNTHETIC DATA</span>
          <span className="mx-2">—</span>
          <span>No real patient information. Demo by Forge Partners Inc.</span>
          <span className="mx-2">|</span>
          <span>© 2026 Forge Partners Inc.</span>
        </footer>
      </body>
    </html>
  );
}
