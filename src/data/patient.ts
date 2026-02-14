export interface Patient {
  mrn: string;
  name: string;
  age: number;
  sex: string;
  weight: number;
  height: number;
  allergies: string[];
  bloodType: string;
  chiefComplaint: string;
  triageLevel: string;
  arrivalTime: string;
  attendingPhysician: string;
  nurse: string;
  department: string;
  vitals: {
    timestamp: string;
    temp: number;
    hr: number;
    bp: string;
    rr: number;
    spo2: number;
    gcs: number;
    map: number;
    painScale: string;
  };
  labs: {
    timestamp: string;
    wbc: number;
    lactate: number;
    creatinine: number;
    procalcitonin: number;
    platelets: number;
    inr: number;
    bilirubin: number;
    glucose: number;
    bloodCultures: string;
    urinalysis: string;
    cxr: string;
  };
  history: {
    conditions: string[];
    medications: string[];
    surgicalHistory: string[];
    socialHistory: string;
    recentVisits: { date: string; reason: string }[];
  };
  sofaScore: {
    respiration: number;
    coagulation: number;
    liver: number;
    cardiovascular: number;
    cns: number;
    renal: number;
    total: number;
  };
}

export const patient: Patient = {
  mrn: "MRN-2026-0847291",
  name: "Margaret Chen",
  age: 72,
  sex: "Female",
  weight: 58,
  height: 165,
  allergies: ["Penicillin (anaphylaxis)", "Sulfonamides (rash)"],
  bloodType: "A+",
  
  chiefComplaint: "Altered mental status, fever, hypotension",
  triageLevel: "CTAS 2 - Emergent",
  arrivalTime: "14:23",
  attendingPhysician: "Dr. Sarah Okafor",
  nurse: "RN James Whitfield",
  department: "Emergency Department - Bay 7",
  
  vitals: {
    timestamp: "14:31",
    temp: 38.9,
    hr: 112,
    bp: "88/52",
    rr: 24,
    spo2: 91,
    gcs: 13,
    map: 64,
    painScale: "Unable to assess - altered LOC"
  },
  
  labs: {
    timestamp: "14:45",
    wbc: 18.2,
    lactate: 4.1,
    creatinine: 1.8,
    procalcitonin: 2.4,
    platelets: 98,
    inr: 1.4,
    bilirubin: 2.1,
    glucose: 186,
    bloodCultures: "Pending (drawn at 14:35)",
    urinalysis: "Positive for leukocyte esterase, nitrites",
    cxr: "Right lower lobe infiltrate - possible aspiration vs. pneumonia"
  },
  
  history: {
    conditions: [
      "Type 2 Diabetes Mellitus (A1c 7.8%)",
      "Hypertension",
      "Chronic Kidney Disease Stage 3a",
      "Atrial Fibrillation (on Apixaban)",
      "Previous UTI (3 months ago - E. coli, ciprofloxacin-resistant)"
    ],
    medications: [
      "Metformin 1000mg BID",
      "Apixaban 5mg BID",
      "Lisinopril 20mg daily",
      "Metoprolol 50mg BID",
      "Atorvastatin 40mg daily"
    ],
    surgicalHistory: [
      "Right hip replacement (2023)",
      "Cholecystectomy (2019)"
    ],
    socialHistory: "Lives alone, independent ADLs, former smoker (quit 2015, 20 pack-years), no alcohol, retired teacher",
    recentVisits: [
      { date: "2025-11-15", reason: "UTI - E. coli resistant to ciprofloxacin, treated with nitrofurantoin" },
      { date: "2025-08-22", reason: "A1c check - stable at 7.8%" }
    ]
  },
  
  sofaScore: {
    respiration: 2,
    coagulation: 1,
    liver: 1,
    cardiovascular: 3,
    cns: 1,
    renal: 2,
    total: 10
  }
};
