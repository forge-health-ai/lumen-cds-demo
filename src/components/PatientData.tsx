'use client';

import { useState, useEffect } from 'react';
import type { Patient } from '@/data/patient';
import { Thermometer, Heart, Activity, Wind, Gauge, Brain, Stethoscope } from 'lucide-react';

interface PatientBannerProps {
  patient: Patient;
}

export function PatientBanner({ patient }: PatientBannerProps) {
  return (
    <div className="bg-clinical-navy text-white">
      {/* Hospital Header */}
      <div className="bg-clinical-navy-light px-6 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏥</span>
          <span className="font-semibold tracking-wide">Oak Valley Regional Medical Centre</span>
        </div>
        <div className="text-sm text-gray-300">
          Emergency Department — Clinical Decision Support
        </div>
        <div className="font-mono text-sm">
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {/* Patient Banner */}
      <div className="px-6 py-3 flex items-center gap-6 bg-clinical-navy">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">MRN</span>
          <span className="font-mono font-semibold">{patient.mrn}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{patient.name}</span>
          <span className="text-gray-300">({patient.age}{patient.sex.charAt(0)})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Blood Type</span>
          <span className="font-mono font-semibold text-clinical-blue-light">{patient.bloodType}</span>
        </div>
        
        <div className="flex items-center gap-2 text-medical-red">
          <span className="text-lg">⚠️</span>
          <span className="font-semibold">ALLERGIES: {patient.allergies.join('; ')}</span>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <span className="bg-medical-amber text-clinical-navy px-3 py-1 rounded font-bold text-sm">
            {patient.triageLevel}
          </span>
          <span className="text-sm text-gray-300">{patient.department}</span>
        </div>
      </div>
      
      {/* Care Team */}
      <div className="px-6 py-1 bg-clinical-navy-light/50 text-xs flex gap-6 text-gray-300 border-t border-white/10">
        <span><span className="text-gray-400">Attending:</span> {patient.attendingPhysician}</span>
        <span><span className="text-gray-400">Nurse:</span> {patient.nurse}</span>
        <span><span className="text-gray-400">Arrived:</span> {patient.arrivalTime}</span>
      </div>
    </div>
  );
}

interface VitalsCardProps {
  patient: Patient;
}

export function VitalsCard({ patient }: VitalsCardProps) {
  const { vitals } = patient;
  
  const VitalItem = ({ 
    icon: Icon, 
    label, 
    value, 
    unit, 
    normal, 
    critical 
  }: { 
    icon: React.ElementType;
    label: string;
    value: string | number;
    unit?: string;
    normal?: boolean;
    critical?: boolean;
  }) => (
    <div className={`flex items-center justify-between p-3 rounded ${critical ? 'bg-medical-red-light' : normal ? 'bg-gray-50' : 'bg-medical-amber-light'}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className={`font-mono font-bold ${critical ? 'text-medical-red' : normal ? 'text-gray-700' : 'text-medical-amber'}`}>
          {value}
        </span>
        {unit && <span className="text-xs text-gray-500">{unit}</span>}
        {critical && <span className="text-medical-red">🔴</span>}
        {!normal && !critical && <span className="text-medical-amber">🟡</span>}
      </div>
    </div>
  );
  
  return (
    <div className="ehr-card bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-clinical-navy flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Vitals
        </h3>
        <span className="text-xs text-gray-500 font-mono">{vitals.timestamp}</span>
      </div>
      
      <div className="space-y-2">
        <VitalItem 
          icon={Thermometer} 
          label="Temperature" 
          value={vitals.temp} 
          unit="°C" 
          critical={vitals.temp > 38.0}
        />
        <VitalItem 
          icon={Heart} 
          label="Heart Rate" 
          value={vitals.hr} 
          unit="bpm" 
          critical={vitals.hr > 100}
        />
        <VitalItem 
          icon={Gauge} 
          label="Blood Pressure" 
          value={vitals.bp} 
          unit="mmHg" 
          critical={true}
        />
        <VitalItem 
          icon={Wind} 
          label="Respiratory Rate" 
          value={vitals.rr} 
          unit="/min" 
          critical={vitals.rr > 20}
        />
        <VitalItem 
          icon={Activity} 
          label="SpO₂" 
          value={vitals.spo2} 
          unit="%" 
          critical={vitals.spo2 < 95}
        />
        <VitalItem 
          icon={Brain} 
          label="GCS" 
          value={vitals.gcs} 
          normal={vitals.gcs === 15}
        />
        <VitalItem 
          icon={Stethoscope} 
          label="MAP" 
          value={vitals.map} 
          unit="mmHg" 
          critical={vitals.map < 65}
        />
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Pain Scale:</span> {vitals.painScale}
        </div>
      </div>
    </div>
  );
}

interface LabsCardProps {
  patient: Patient;
}

export function LabsCard({ patient }: LabsCardProps) {
  const { labs } = patient;
  
  const LabValue = ({ 
    label, 
    value, 
    unit, 
    reference,
    high,
    low 
  }: { 
    label: string;
    value: string | number;
    unit: string;
    reference: string;
    high?: boolean;
    low?: boolean;
  }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="text-right">
        <span className={`font-mono font-bold ${high || low ? 'text-medical-red' : 'text-gray-700'}`}>
          {value}
        </span>
        <span className="text-xs text-gray-400 ml-1">{unit}</span>
        {(high || low) && (
          <span className="ml-2 text-xs font-bold text-medical-red">
            {high ? 'HIGH' : 'LOW'}
          </span>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="ehr-card bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-clinical-navy">Laboratory Results</h3>
        <span className="text-xs text-gray-500 font-mono">{labs.timestamp}</span>
      </div>
      
      <LabValue label="WBC" value={labs.wbc} unit="×10⁹/L" reference="4-11" high={labs.wbc > 11} />
      <LabValue label="Lactate" value={labs.lactate} unit="mmol/L" reference="<2.0" high={labs.lactate > 2.0} />
      <LabValue label="Creatinine" value={labs.creatinine} unit="mg/dL" reference="0.6-1.2" high={labs.creatinine > 1.2} />
      <LabValue label="Procalcitonin" value={labs.procalcitonin} unit="ng/mL" reference="<0.5" high={labs.procalcitonin > 0.5} />
      <LabValue label="Platelets" value={labs.platelets} unit="×10⁹/L" reference="150-400" low={labs.platelets < 150} />
      <LabValue label="INR" value={labs.inr} unit="" reference="0.9-1.1" high={labs.inr > 1.1} />
      <LabValue label="Bilirubin" value={labs.bilirubin} unit="mg/dL" reference="0.1-1.2" high={labs.bilirubin > 1.2} />
      <LabValue label="Glucose" value={labs.glucose} unit="mg/dL" reference="70-140" high={labs.glucose > 140} />
      
      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
        <div className="text-xs">
          <span className="font-medium text-gray-600">Blood Cultures:</span>
          <span className="text-gray-500 ml-2">{labs.bloodCultures}</span>
        </div>
        <div className="text-xs">
          <span className="font-medium text-gray-600">Urinalysis:</span>
          <span className="text-gray-500 ml-2">{labs.urinalysis}</span>
        </div>
        <div className="text-xs">
          <span className="font-medium text-gray-600">CXR:</span>
          <span className="text-gray-500 ml-2">{labs.cxr}</span>
        </div>
      </div>
    </div>
  );
}

interface HistoryCardProps {
  patient: Patient;
}

export function HistoryCard({ patient }: HistoryCardProps) {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="ehr-card bg-white rounded-lg p-4">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="font-semibold text-clinical-navy">Medical History</h3>
        <span className="text-gray-400">{expanded ? '▼' : '▶'}</span>
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-3 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Conditions</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {patient.history.conditions.map((condition, i) => (
                <li key={i}>{condition}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Current Medications</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {patient.history.medications.map((med, i) => (
                <li key={i}>{med}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Social History</h4>
            <p className="text-gray-600">{patient.history.socialHistory}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface SofaScoreCardProps {
  patient: Patient;
}

export function SofaScoreCard({ patient }: SofaScoreCardProps) {
  const { sofaScore } = patient;
  const percentage = (sofaScore.total / 24) * 100;
  
  return (
    <div className="ehr-card bg-white rounded-lg p-4">
      <h3 className="font-semibold text-clinical-navy mb-3">SOFA Score</h3>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#e2e8f0"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={sofaScore.total >= 10 ? '#DC2626' : sofaScore.total >= 5 ? '#F59E0B' : '#059669'}
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${(percentage / 100) * 175.9} 175.9`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-lg">{sofaScore.total}</span>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-600">Total Score</div>
          <div className={`font-bold ${sofaScore.total >= 10 ? 'text-medical-red' : 'text-medical-amber'}`}>
            {sofaScore.total >= 10 ? 'High Risk' : 'Moderate Risk'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">Respiration</span>
          <span className="font-mono font-semibold">{sofaScore.respiration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Coagulation</span>
          <span className="font-mono font-semibold">{sofaScore.coagulation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Liver</span>
          <span className="font-mono font-semibold">{sofaScore.liver}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Cardiovascular</span>
          <span className="font-mono font-semibold">{sofaScore.cardiovascular}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">CNS</span>
          <span className="font-mono font-semibold">{sofaScore.cns}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Renal</span>
          <span className="font-mono font-semibold">{sofaScore.renal}</span>
        </div>
      </div>
    </div>
  );
}
