import React, { useState } from "react";
import {
  Layers,
  Activity,
  Award,
  Zap,
  CheckCircle2,
  Shield,
  Clock,
  Sparkles,
  GitBranch,
  Network,
  ShieldAlert
} from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";
import { ContextFact, GraphViewName, MetaEntity } from "../types/dmwe";

interface GraphInspectorProps {
  core: MeshOSCore;
}

export const GraphInspector: React.FC<GraphInspectorProps> = ({ core }) => {
  const [activeView, setActiveView] = useState<GraphViewName>("CAPABILITY");
  const caps = core.capabilityRegistry;
  const factsArray: ContextFact[] = Array.from(core.contextFacts.values());
  const nodeStates = core.getNodeStates();
  const negotiationSessions = core.negotiationEngine.getActiveSessions();
  const fastPathGrants = core.fastPathEngine.getActiveGrants();

  // Unified Meta-Model projections (Volume II Ch 4 / Volume XI Ch 21)
  const meta = core.metaModel;
  const allEntities: MetaEntity[] = Array.from(meta.entities.values());
  const entityTypeCounts: Record<string, number> = {};
  allEntities.forEach(e => {
    entityTypeCounts[e.entityType] = (entityTypeCounts[e.entityType] || 0) + 1;
  });
  const view = core.graphAlgebra.project(activeView);
  const relByView = meta.relationships.filter(
    r => view.entities.some(e => e.did === r.subjectDid) || view.entities.some(e => e.did === r.objectDid)
  );

  const viewTabs: GraphViewName[] = ["CAPABILITY", "CONTEXT", "MODULE", "RESOURCE", "SECURITY"];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Capability Graph & Fusion Section */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Capability Graph & Quality of Capability (QoC)</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Hardware-abstracted intent subscription layer (Volume V - Capabilities Specification)
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg flex items-center space-x-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Fused Capabilities: {caps.filter(c => c.isFused).length}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {caps.map(cap => (
            <div
              key={`${cap.capabilityId}-${cap.providerNodeId}`}
              className={`p-4 rounded-xl border transition shadow-lg flex flex-col justify-between ${
                cap.isFused
                  ? "bg-[#1A1A1E] border-purple-500/40 shadow-purple-500/5"
                  : "bg-[#111114] border-white/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs truncate uppercase tracking-wider">{cap.name}</span>
                  {cap.isFused && (
                    <span className="px-2 py-0.5 text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded font-bold uppercase tracking-wider">
                      FUSED
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-indigo-300 mb-3 truncate">{cap.capabilityId}</p>

                <div className="space-y-1.5 text-[10px] text-gray-300 bg-[#1A1A1E] p-2.5 rounded-lg border border-white/5">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center space-x-1 uppercase">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>Latency:</span>
                    </span>
                    <span className="text-emerald-400 font-bold">{cap.qoc.latencyMs} ms</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center space-x-1 uppercase">
                      <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                      <span>Accuracy Score:</span>
                    </span>
                    <span className="text-indigo-400 font-bold">
                      {(cap.qoc.accuracyScore * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center space-x-1 uppercase">
                      <Shield className="w-3 h-3 text-amber-400" />
                      <span>Privacy Domain:</span>
                    </span>
                    <span className="text-amber-300 font-semibold">{cap.qoc.privacyClass}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 text-[9px] text-gray-500 flex items-center justify-between uppercase">
                <span>Provider: {cap.providerNodeId}</span>
                <span>Energy: {cap.qoc.energyCost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unified Meta-Model & Graph Algebra Projections (CPT Review §4 / GL Review Part II) */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <span>Unified Meta-Model & Graph Algebra</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              One canonical knowledge graph — subsystem views are π projections (Volume II Ch 4 / Volume XI Ch 21)
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg flex items-center space-x-1.5 uppercase tracking-wider">
            <Network className="w-3.5 h-3.5 text-emerald-400" />
            <span>{allEntities.length} Entities</span>
          </span>
        </div>

        {/* Entity type breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(entityTypeCounts).map(([type, count]) => (
            <div key={type} className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg text-center">
              <div className="text-lg font-bold text-emerald-400 font-mono">{count}</div>
              <div className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">{type}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mr-1">Projection (π):</span>
          {viewTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition ${
                activeView === tab
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-[#1A1A1E] text-gray-400 border-white/10 hover:border-white/30"
              }`}
            >
              {tab}
            </button>
          ))}
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider ml-auto">
            Rel: {relByView.length} • Constraints: {meta.constraints.length} • Events: {meta.events.length}
          </span>
        </div>

        {/* Projection grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 font-mono text-xs max-h-72 overflow-y-auto pr-1">
            {view.entities.map(e => (
              <div
                key={e.did}
                className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-white font-bold text-[11px] truncate uppercase tracking-wider">{e.name}</div>
                  <div className="text-[9px] text-emerald-400/80 truncate">{e.did}</div>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase font-bold">
                  {e.entityType}
                </span>
              </div>
            ))}
            {view.entities.length === 0 && (
              <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg text-gray-500 text-[11px]">
                Empty {activeView} view. Populated as entities are registered.
              </div>
            )}
          </div>

          {/* Relationships in current view */}
          <div className="space-y-2 font-mono text-xs max-h-72 overflow-y-auto pr-1">
            <div className="text-[9px] text-gray-500 uppercase tracking-wider border-b border-white/5 pb-1.5">
              Edges ({relByView.length})
            </div>
            {relByView.slice(0, 20).map(r => (
              <div key={r.id} className="p-2 bg-[#1A1A1E] border border-white/5 rounded-lg text-[10px] flex items-center gap-1.5">
                <span className="text-gray-400 truncate">{r.subjectDid.slice(0, 24)}</span>
                <span className="shrink-0 px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[8px] uppercase">
                  {r.relationship}
                </span>
                <span className="text-gray-400 truncate">{r.objectDid.slice(0, 24)}</span>
              </div>
            ))}
            {relByView.length === 0 && (
              <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg text-gray-500 text-[11px]">
                No relationships in this projection.
              </div>
            )}
          </div>
        </div>

        {/* Recent meta-model events (immutable temporal chain) */}
        <div className="bg-[#1A1A1E] border border-white/5 rounded-lg p-3 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            <span>Recent Meta-Model Events</span>
          </div>
          {meta.events.slice(0, 6).map(evt => (
            <div key={evt.id} className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-emerald-300">{evt.eventType}</span>
              <span className="text-gray-500 truncate px-2">{evt.entityDid}</span>
              <span className="text-gray-600 shrink-0">
                {new Date(evt.timestampMs).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {meta.events.length === 0 && (
            <div className="text-gray-500 text-[11px]">No events emitted yet.</div>
          )}
        </div>
      </div>

      {/* Negotiation Sessions & Fast-Path Grants (Volume VIII §7.7 / Volume XI Ch 13) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-xs font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Capability Negotiation Sessions</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Volume VIII §7.7 — REQUEST → OFFER → ACCEPT → BOUND state machine
            </p>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {negotiationSessions.length === 0 && (
              <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg text-gray-500 text-[11px]">
                No active negotiation sessions. Use CLI: <span className="text-indigo-300">negotiate &lt;capabilityId&gt;</span>
              </div>
            )}
            {negotiationSessions.map(s => (
              <div
                key={s.sessionId}
                className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold text-[11px]">{s.capabilityId}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${
                    s.state === "BOUND"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                  }`}>
                    {s.state}
                  </span>
                </div>
                <div className="text-[9px] text-gray-500 mt-1">
                  {s.consumerNodeId} → {s.providerNodeId} | Seq: {s.sequence}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-xs font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Fast-Path Direct Streams</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Volume XI Ch 13 — low-latency stream bindings bypassing semantic path
            </p>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {fastPathGrants.length === 0 && (
              <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg text-gray-500 text-[11px]">
                No fast-path grants. Use CLI: <span className="text-amber-300">fastpath &lt;capabilityId&gt;</span>
              </div>
            )}
            {fastPathGrants.map(g => (
              <div
                key={g.grantId}
                className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold text-[11px]">Token #{g.streamToken}</span>
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded text-[9px] uppercase font-bold">
                    {g.grantedHz} Hz
                  </span>
                </div>
                <div className="text-[9px] text-gray-500 mt-1">
                  Provider: {g.providerNodeId} | Valid until: {new Date(g.validUntilMs).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Context Graph & Primary Node Election Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Context Graph (Human Digital Twin) */}
        <div className="lg:col-span-6 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-xs font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Context Graph (Human Digital Twin)</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Environment & user posture telemetry (Volume VII - Context Engine)
            </p>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {factsArray.map(fact => (
              <div
                key={fact.key}
                className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg flex items-center justify-between"
              >
                <div>
                  <span className="text-emerald-400 font-bold block text-[11px]">{fact.key}</span>
                  <span className="text-[9px] text-gray-500 uppercase">
                    Layer: {fact.layer} • Source: {fact.provenanceNode}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-white font-bold text-xs block">
                    {String(fact.value)}
                  </span>
                  <span className="text-[9px] text-gray-500">
                    Confidence: {(fact.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Node Election Score Matrix */}
        <div className="lg:col-span-6 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-xs font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Primary Election Matrix</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Deterministic coordinator scoring: Battery (25%) + Compute (25%) + NPU (20%) + IBN (30%)
            </p>
          </div>

          <div className="overflow-x-auto font-mono text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-wider">
                  <th className="py-2 px-3">Node</th>
                  <th className="py-2 px-3">Batt</th>
                  <th className="py-2 px-3">MIPS</th>
                  <th className="py-2 px-3">NPU</th>
                  <th className="py-2 px-3">Score</th>
                  <th className="py-2 px-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {nodeStates.map(n => (
                  <tr
                    key={n.descriptor.moduleId}
                    className={`hover:bg-white/5 ${
                      n.isPrimaryCoordinator ? "bg-amber-500/10 font-bold" : ""
                    }`}
                  >
                    <td className="py-2.5 px-3 text-white truncate max-w-[120px] text-[11px]">
                      {n.descriptor.name}
                    </td>
                    <td className="py-2.5 px-3 text-gray-300 text-[11px]">
                      {(n.descriptor.batteryLevel * 100).toFixed(0)}%
                    </td>
                    <td className="py-2.5 px-3 text-gray-300 text-[11px]">{n.descriptor.computeMips}</td>
                    <td className="py-2.5 px-3 text-[11px]">
                      {n.descriptor.hasNpu ? (
                        <span className="text-emerald-400 font-bold">YES</span>
                      ) : (
                        <span className="text-gray-600">NO</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-indigo-400 font-bold text-[11px]">{n.fitnessScore}</td>
                    <td className="py-2.5 px-3">
                      {n.isPrimaryCoordinator ? (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[9px] uppercase font-bold">
                          ★ PRIMARY
                        </span>
                      ) : n.isOnline ? (
                        <span className="text-gray-500 text-[9px] uppercase">MEMBER</span>
                      ) : (
                        <span className="text-rose-500 text-[9px] uppercase">OFFLINE</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
