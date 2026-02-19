'use client';

import { useState } from 'react';
import { lumenPharmaEvaluation } from '@/data/claim';
import { Shield, ChevronDown, ChevronUp, AlertOctagon, CheckCircle2, XCircle, AlertTriangle, Zap } from 'lucide-react';

function ScoreBadge({ score, max }: { score: number; max: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 70 ? 'text-green-400' : pct >= 40 ? 'text-amber-400' : 'text-red-400';
  const bg = pct >= 70 ? 'bg-green-400' : pct >= 40 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-bold ${color}`}>{score}/{max}</span>
      <div className="w-16 bg-slate-700 rounded-full h-1.5">
        <div className={`${bg} h-1.5 rounded-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'pass') return <CheckCircle2 className="w-4 h-4 text-green-400" />;
  if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-400" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
}

export function LumenPharmaGovernance() {
  const [expanded, setExpanded] = useState(false);
  const ev = lumenPharmaEvaluation;

  const scoreColor = ev.lumenScore >= 70 ? 'amber' : ev.lumenScore >= 40 ? 'amber' : 'red';

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
      {/* Collapsed View — Always Visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-center gap-4 hover:bg-slate-800/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-amber-400" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider text-left">LUMEN Score</div>
            <div className="flex items-center gap-3 mt-1">
              <span className={`text-3xl font-bold text-${scoreColor}-400`}>{ev.lumenScore}</span>
              <span className="text-sm text-slate-500">/100</span>
              <span className={`bg-${scoreColor}-500/20 text-${scoreColor}-400 text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                ⚠️ {ev.statusLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-slate-400 hidden sm:block">{ev.summary}</span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded View */}
      {expanded && (
        <div className="border-t border-slate-700 p-6 space-y-6">
          {/* Policy Pack Info */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Policy Pack:</span>
            <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-xs font-semibold">
              {ev.packName}
            </span>
            <span className="text-slate-600">({ev.packFramework})</span>
            <span className="text-slate-600">{ev.packVersion}</span>
            <span className="ml-auto text-slate-500">Evaluated in {ev.evaluationTime}</span>
          </div>

          {/* Domain Scores */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Domain Scores</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ev.domainScores.map((d) => (
                <div key={d.domain} className="bg-slate-900/50 rounded-lg p-3 flex items-start gap-3">
                  <StatusIcon status={d.status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{d.domain}</span>
                      <ScoreBadge score={d.score} max={d.max} />
                    </div>
                    <p className="text-xs text-slate-400 truncate" title={d.detail}>{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Negotiables */}
          <div>
            <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" />
              Non-Negotiable Rules Triggered
            </h4>
            <div className="space-y-2">
              {ev.nonNegotiables.map((nn, i) => (
                <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3">
                  <span className="text-red-400 text-lg">🛑</span>
                  <span className="text-sm text-slate-300 flex-1">{nn.rule}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    nn.status === 'FAILED' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {nn.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Gates */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Governance Gates</h4>
            <div className="space-y-2">
              {ev.gates.map((gate, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {gate.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                  <span className={gate.passed ? 'text-slate-300' : 'text-red-300 font-medium'}>{gate.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Required */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-amber-400 uppercase">Action Required</h4>
            </div>
            <p className="text-sm text-slate-300">{ev.actionRequired}</p>
          </div>
        </div>
      )}
    </div>
  );
}
