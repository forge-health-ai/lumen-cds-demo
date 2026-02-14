export interface AIRecommendation {
  timestamp: string;
  model: string;
  primaryRecommendation: string;
  confidenceScore: number;
  reasoning: string[];
  recommendedActions: {
    priority: 'STAT' | 'URGENT' | 'ROUTINE';
    action: string;
    rationale: string;
  }[];
  citations: {
    id: number;
    text: string;
    doi: string;
  }[];
  concerns: string[];
}

export const aiRecommendation: AIRecommendation = {
  timestamp: "14:52",
  model: "ClinicalBERT-v3.2 (fine-tuned on sepsis cohort)",
  
  primaryRecommendation: "INITIATE SEPSIS BUNDLE - Probable Septic Shock",
  confidenceScore: 0.87,
  
  reasoning: [
    "qSOFA score: 3/3 (altered mentation, SBP ≤100, RR ≥22) - meets sepsis screening criteria",
    "SOFA score: 10 - indicates significant multi-organ dysfunction",
    "Lactate 4.1 mmol/L (>4.0 threshold for septic shock per Sepsis-3 definition)",
    "Procalcitonin 2.4 ng/mL - strongly suggests bacterial infection",
    "Likely source: Urinary tract (positive UA) with possible secondary pneumonia (RLL infiltrate)",
    "Previous cipro-resistant E. coli - empiric coverage must account for resistance pattern"
  ],
  
  recommendedActions: [
    {
      priority: "STAT",
      action: "30 mL/kg IV crystalloid bolus (1,740 mL over 30 min)",
      rationale: "Surviving Sepsis Campaign: initial fluid resuscitation for hypotension"
    },
    {
      priority: "STAT",
      action: "Meropenem 1g IV + Vancomycin 1.5g IV",
      rationale: "Broad-spectrum empiric coverage accounting for cipro-resistant E. coli and possible MRSA; AVOID penicillins (allergy) and sulfonamides"
    },
    {
      priority: "STAT",
      action: "Norepinephrine infusion if MAP remains <65 after fluid bolus",
      rationale: "First-line vasopressor per SSC guidelines for septic shock"
    },
    {
      priority: "URGENT",
      action: "ICU admission - continuous hemodynamic monitoring",
      rationale: "SOFA ≥10 with vasopressor requirement meets ICU admission criteria"
    },
    {
      priority: "URGENT",
      action: "Repeat lactate in 2-4 hours",
      rationale: "Target lactate clearance >10% per SSC 1-hour bundle"
    },
    {
      priority: "ROUTINE",
      action: "Hold Apixaban — assess bleeding risk before procedures",
      rationale: "INR already 1.4; thrombocytopenia increases bleeding risk"
    }
  ],
  
  citations: [
    { id: 1, text: "Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.", doi: "10.1001/jama.2016.0287" },
    { id: 2, text: "Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.", doi: "10.1097/CCM.0000000000005337" },
    { id: 3, text: "Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016. Intensive Care Med. 2017;43(3):304-377.", doi: "10.1007/s00134-017-4683-6" },
    { id: 4, text: "Seymour CW, et al. Assessment of Clinical Criteria for Sepsis. JAMA. 2016;315(8):762-774.", doi: "10.1001/jama.2016.0288" }
  ],

  concerns: [
    "CKD Stage 3a: Meropenem dosing may need renal adjustment - AI recommended standard dose",
    "Lactate 4.1 is borderline for septic shock classification (threshold is 4.0) - is this truly shock or severe sepsis?",
    "The AI weighted the UTI heavily but the CXR infiltrate could be the primary source - different antibiotic coverage may be needed",
    "No mention of the Apixaban-Meropenem interaction (Meropenem can increase INR further)",
    "Patient is 72 with CKD - aggressive fluid resuscitation could cause volume overload"
  ]
};
