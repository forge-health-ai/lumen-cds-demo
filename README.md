# LUMEN CDS Demo

**Clinical Decision Support with Runtime Governance**

A fully functional demo application showcasing the LUMEN SDK in a realistic emergency department sepsis triage workflow. Built for demonstrations to CMOs, CMIOs, and clinical leadership.

![LUMEN CDS Demo](https://img.shields.io/badge/LUMEN-SDK-teal)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Quick Start

```bash
git clone https://github.com/forge-health-ai/lumen-cds-demo.git
cd lumen-cds-demo
npm install
npx @forgehealth/lumen-sdk init  # Select Ontario PHIPA pack
npm run dev
```

Open http://localhost:3000

## The Demo Scenario

**Patient:** Margaret Chen, 72F, presenting to ED with altered mental status, fever, and hypotension. Labs suggest septic shock with multi-organ dysfunction.

**The AI recommends:** Initiate sepsis bundle with broad-spectrum antibiotics and ICU admission.

**The question:** Should the clinician trust this recommendation?

### Without LUMEN
- No regulatory compliance check
- No audit trail
- No validation of AI reasoning
- Clinician must trust blindly or reject entirely

### With LUMEN
- LUMEN Score: 72/100 (Tier 2 — Operational)
- 18 PHIPA rules evaluated
- 5 clinical concerns flagged for human review
- Defensible decision record generated
- 47ms evaluation time — doesn't slow the workflow

## Application Structure

```
lumen-cds-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── demo/
│   │   │   ├── without-lumen/  # Demo without governance
│   │   │   ├── with-lumen/     # Demo with LUMEN SDK
│   │   │   └── compare/        # Side-by-side comparison
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── PatientData.tsx     # Patient vitals, labs, history
│   │   ├── AIRecommendation.tsx # AI recommendation display
│   │   └── LumenGovernance.tsx # LUMEN governance layer
│   ├── data/
│   │   ├── patient.ts          # Synthetic patient data
│   │   └── ai-recommendation.ts # AI recommendation data
│   └── lib/
│       └── lumen.ts            # LUMEN SDK integration
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Features

### Clinical Data Display
- Realistic EHR-style patient banner
- Vital signs with critical value highlighting
- Laboratory results with HIGH/LOW flags
- SOFA score visualization
- Medical history (collapsible)

### AI Recommendation
- ClinicalBERT-v3.2 model attribution
- Confidence score visualization
- Reasoning breakdown
- Priority-coded action items (STAT/URGENT/ROUTINE)
- Clinical citations with DOI references

### LUMEN Governance Layer
- **LUMEN Score**: 0-100 scoring with animated counter
- **Risk Radar**: 10-domain evaluation visualization
- **Policy Pack**: Regulatory rule evaluation (PHIPA)
- **Validated Concerns**: Clinical concerns addressed
- **Audit Record**: Cryptographic fingerprint and signatures

### Demo Modes
1. **Without LUMEN**: Shows risks of ungoverned AI
2. **With LUMEN**: Shows governance in action
3. **Side-by-Side**: Interactive comparison with draggable divider

## Synthetic Data

All patient data is synthetic. No real PHI. This application is for demonstration purposes only.

**Patient:** Margaret Chen (fictional)
- MRN: MRN-2026-0847291
- Age: 72, Female
- Scenario: Emergency department sepsis triage

## Design Philosophy

This application is designed to look like a **real clinical application**, not a startup demo:

- Color scheme matches Epic/Cerner EHR conventions
- Monospace fonts for lab values and vitals
- Professional medical typography
- No marketing copy, CTAs, or pricing
- Could be a module inside major EHR systems

## Technology Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + custom healthcare color palette
- **@forgehealth/lumen-sdk** (real npm package)
- **Lucide React** (icons)

## LUMEN SDK Integration

The demo integrates with the LUMEN SDK for runtime AI governance:

```typescript
import { evaluateClinicalDecision } from '@/lib/lumen';

const evaluation = await evaluateClinicalDecision();
// Returns: LumenScore, RiskRadar, PolicyPack, AuditRecord
```

## Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License — Forge Partners Inc.

## Support

For questions about the LUMEN SDK:
- Website: [forgelumen.ca](https://forgelumen.ca)
- Email: sean@forgehealth.ai
- Documentation: [docs.forgelumen.ca](https://docs.forgelumen.ca)

---

© 2026 Forge Partners Inc. | [forgehealth.ai](https://forgehealth.ai) | [forgelumen.ca](https://forgelumen.ca)
