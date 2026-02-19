'use client';

import { claimData } from '@/data/claim';
import { FileText, User, Building2, DollarSign, Stethoscope, Calendar, Shield, History } from 'lucide-react';

export function ClaimData() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-amber-400" />
        <h3 className="text-lg font-bold text-white">Claim Record</h3>
        <span className="ml-auto text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded font-mono">
          {claimData.claimId}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Claimant */}
        <div className="flex items-start gap-3">
          <User className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Claimant</div>
            <div className="text-white font-medium">{claimData.claimant.name}, {claimData.claimant.age}{claimData.claimant.sex}</div>
          </div>
        </div>

        {/* Provider */}
        <div className="flex items-start gap-3">
          <Building2 className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Provider</div>
            <div className="text-white font-medium">{claimData.provider}</div>
          </div>
        </div>

        {/* Amount */}
        <div className="flex items-start gap-3">
          <DollarSign className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Claim Amount</div>
            <div className="text-white font-medium text-lg">${claimData.amount.toLocaleString()}</div>
          </div>
        </div>

        {/* Procedure */}
        <div className="flex items-start gap-3">
          <Stethoscope className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Procedure ({claimData.procedureCode})</div>
            <div className="text-white font-medium">{claimData.procedure}</div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="flex items-start gap-3">
          <FileText className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Diagnosis ({claimData.diagnosisCode})</div>
            <div className="text-white font-medium">{claimData.diagnosis}</div>
          </div>
        </div>

        {/* Submission Date */}
        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Submitted</div>
            <div className="text-white font-medium">{claimData.submissionDate}</div>
          </div>
        </div>

        {/* Prior Auth */}
        <div className="flex items-start gap-3">
          <Shield className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Prior Authorization</div>
            <div className="text-white font-medium">
              {claimData.priorAuth.id}
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                {claimData.priorAuth.status}
              </span>
            </div>
          </div>
        </div>

        {/* Claims History */}
        <div className="flex items-start gap-3">
          <History className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Claims History</div>
            <div className="text-white font-medium">
              {claimData.previousClaims.count} claims / {claimData.previousClaims.period} — ${claimData.previousClaims.totalAmount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Network Status */}
      <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">{claimData.networkStatus}</span>
      </div>
    </div>
  );
}
