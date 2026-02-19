export const claimData = {
  claimId: 'CLM-2026-0847291',
  claimant: {
    name: 'Maria Santos',
    age: 58,
    sex: 'F',
  },
  provider: 'Northeast Oncology Associates',
  amount: 47283.0,
  procedure: 'Pembrolizumab immunotherapy (4 cycles)',
  procedureCode: 'J9271',
  diagnosis: 'Non-small cell lung cancer (NSCLC), Stage IIIB',
  diagnosisCode: 'C34.90',
  submissionDate: '2026-02-14',
  priorAuth: {
    id: 'PA-2025-99281',
    approvedDate: '2025-11-03',
    status: 'approved',
  },
  networkStatus: 'In-Network',
  previousClaims: {
    count: 12,
    period: '24 months',
    totalAmount: 184000,
  },
};

export const aiFraudOutput = {
  fraudProbability: 91,
  recommendation: 'DENY',
  contributingFactors: [
    'Claim amount exceeds 95th percentile for procedure code J9271',
    'Multiple high-cost claims (12) in 24-month window — $184,000 cumulative',
    'Procedure-diagnosis code pattern flagged by anomaly detection model',
  ],
  modelId: 'fraud-detect-v3.2.1',
  modelConfidence: 0.91,
  processingTime: '12ms',
};

export const lumenPharmaEvaluation = {
  lumenScore: 72,
  status: 'review' as const,
  statusLabel: 'REVIEW REQUIRED',
  summary: '2 critical governance gates failed. Human review required before denial.',
  packId: 'pharma_aiml',
  packName: 'US Pharma & Payer AI/ML',
  packFramework: 'FDA-AIML',
  packVersion: 'v1.0.0',
  evaluationTime: '38ms',
  domainScores: [
    { domain: 'Classification', score: 9, max: 10, status: 'pass' as const, detail: 'SaMD risk level documented' },
    { domain: 'Data Integrity', score: 7, max: 10, status: 'warning' as const, detail: 'Training data demographic skew detected in oncology cohort' },
    { domain: 'Transparency', score: 5, max: 10, status: 'fail' as const, detail: 'No human-readable explanation for fraud determination' },
    { domain: 'Fairness', score: 4, max: 10, status: 'fail' as const, detail: 'Disparate impact: oncology patients flagged 3.2x more than cardiology' },
    { domain: 'Human Oversight', score: 3, max: 10, status: 'fail' as const, detail: 'No human reviewer assigned, auto-denial queue' },
    { domain: 'Monitoring', score: 8, max: 10, status: 'pass' as const, detail: 'Drift detection active, thresholds defined' },
    { domain: 'Audit Trail', score: 9, max: 10, status: 'pass' as const, detail: 'Decision ID, timestamp, model version tracked' },
    { domain: 'Equity', score: 6, max: 10, status: 'warning' as const, detail: 'Geographic allocation analysis incomplete' },
  ],
  nonNegotiables: [
    { rule: 'No fully automated adverse coverage denial', status: 'FAILED' as const },
    { rule: 'Bias audit required before deployment', status: 'INCOMPLETE' as const },
  ],
  gates: [
    { name: 'Decision recorded with audit trail', passed: true },
    { name: 'Human review confirmed', passed: false },
    { name: 'Bias assessment complete for claim category', passed: false },
  ],
  actionRequired: 'Route to senior claims reviewer. Do not auto-deny. Bias audit needed for oncology fraud model.',
};
