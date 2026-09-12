import React, { useState } from "react";
import {
  Cpu,
  Power,
  BatteryCharging,
  Sliders,
  AlertTriangle,
  Plus,
  RefreshCw,
  Zap,
  Activity,
  Layers,
  ShieldAlert,
  Radio
} from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";
import { VirtualNode } from "../simulator/VirtualNodes";
import { ModuleClass, SpatialPose, PrivacyDomain, Verb, Target, Modifier } from "../types/dmwe";

interface NodeStudioProps {
  core: MeshOSCore;
  onRefresh: () => void;
}

export const NodeStudio: React.FC<NodeStudioProps> = ({ core, onRefresh }) => {
  const nodeStates = core.getNodeStates();
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Custom Bead Form State
  const [customName, setCustomName] = useState("Custom Sensor Bead");
  const [customClass, setCustomClass] = useState<ModuleClass>(ModuleClass.SENSOR);
  const [customPose, setCustomPose] = useState<SpatialPose>(SpatialPose.WRIST_RIGHT);
  const [customCapName, setCustomCapName] = useState("Custom Sensor Stream");

  const handleCreateCustomNode = () => {
    const moduleId = `DMWE-CUST-${Math.floor(Math.random() * 9000 + 1000)}`;
    const newNode = new VirtualNode(
      {
        moduleId,
        name: customName,
        manufacturer: "DMWE Custom Lab",
        deviceClass: customClass,
        spatialPose: customPose,
        batteryLevel: 0.9,
        computeMips: 250,
        hasNpu: true,
        trustLevel: PrivacyDomain.PERSONAL,
        isIbn: customClass === ModuleClass.INTERMEDIARY_IBN,
        iconName: "Activity"
      },
      [
        {
          capabilityId: `custom.capability.${Date.now()}`,
          name: customCapName,
          version: "1.0.0",
          providerNodeId: moduleId,
          qoc: {
            latencyMs: 10,
            accuracyScore: 0.95,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PERSONAL
          }
        }
      ],
      core.radio
    );

    core.registerVirtualNode(newNode);
    newNode.boot();
    setShowCustomModal(false);
    onRefresh();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Fault Injectors */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Bead Dock & Fault Injection Studio</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Hot-swap virtual modules, adjust real-time battery curves, and simulate hardware failures.
            </p>
          </div>

          <button
            onClick={() => setShowCustomModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-mono font-semibold transition flex items-center space-x-2 shadow-lg cursor-pointer self-start md:self-auto uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Bead</span>
          </button>
        </div>

        {/* Fault Injection Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-white/5">
          <button
            onClick={() => {
              const primary = nodeStates.find(n => n.isPrimaryCoordinator);
              if (primary) {
                core.triggerF004ModuleDisconnect(primary.descriptor.moduleId);
                onRefresh();
              }
            }}
            className="p-3 bg-[#0F0F12] hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/30 text-gray-300 hover:text-rose-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-rose-400 text-[11px] uppercase">Module Disconnect F-004</span>
              <span className="text-[10px] text-gray-500 block">Hot-swap disconnect Primary Coordinator to trigger re-election</span>
            </div>
          </button>

          <button
            onClick={() => {
              const ring = core.nodes.get("DMWE-RNG-9942");
              if (ring && ring.isOnline) {
                core.triggerF004ModuleDisconnect("DMWE-RNG-9942");
                onRefresh();
              }
            }}
            className="p-3 bg-[#0F0F12] hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 text-gray-300 hover:text-amber-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-400 text-[11px] uppercase">Fusion Degrade F-008</span>
              <span className="text-[10px] text-gray-500 block">Kill Smart Ring to break Fused Pointer and test fallback</span>
            </div>
          </button>

          <button
            onClick={() => {
              core.triggerF009CommCongestion();
              onRefresh();
            }}
            className="p-3 bg-[#0F0F12] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-gray-300 hover:text-cyan-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <Radio className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-cyan-400 text-[11px] uppercase">Comm Congestion F-009</span>
              <span className="text-[10px] text-gray-500 block">Raise radio latency to 50ms and observe QoS budget breach</span>
            </div>
          </button>

          <button
            onClick={() => {
              core.triggerF007MeshPartition();
              onRefresh();
            }}
            className="p-3 bg-[#0F0F12] hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 text-gray-300 hover:text-red-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-red-400 text-[11px] uppercase">Mesh Partition F-007</span>
              <span className="text-[10px] text-gray-500 block">Isolate half the mesh nodes and test split-brain election</span>
            </div>
          </button>

          <button
            onClick={() => {
              core.triggerF022ContextPoisoning();
              onRefresh();
            }}
            className="p-3 bg-[#0F0F12] hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 text-gray-300 hover:text-purple-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-purple-400 text-[11px] uppercase">Context Poisoning F-022</span>
              <span className="text-[10px] text-gray-500 block">Inject untrusted posture fact with anomalous confidence</span>
            </div>
          </button>

          <button
            onClick={() => {
              core.triggerF023SchedulerDeadlock();
              onRefresh();
            }}
            className="p-3 bg-[#0F0F12] hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 text-gray-300 hover:text-indigo-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-indigo-400 text-[11px] uppercase">Scheduler Deadlock F-023</span>
              <span className="text-[10px] text-gray-500 block">Simulate task queue stall and force preemption</span>
            </div>
          </button>

          <button
            onClick={() => {
              core.triggerF026SchemaMismatch();
              onRefresh();
            }}
            className="p-3 bg-[#0F0F12] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-gray-300 hover:text-emerald-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-400 text-[11px] uppercase">Schema Mismatch F-026</span>
              <span className="text-[10px] text-gray-500 block">Reject envelope with stale message schema version</span>
            </div>
          </button>

          <button
            onClick={() => {
              core.nodes.forEach(n => {
                if (n.isOnline) n.updateBattery(0.01);
              });
              onRefresh();
            }}
            className="p-3 bg-[#0F0F12] hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 text-gray-300 hover:text-indigo-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <BatteryCharging className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-indigo-400 text-[11px] uppercase">Battery Drain F-001</span>
              <span className="text-[10px] text-gray-500 block">Drain all online nodes to 1% critical battery level</span>
            </div>
          </button>

          <button
            onClick={() => {
              core.nodes.forEach(n => core.bootNode(n.descriptor.moduleId));
              onRefresh();
            }}
            className="p-3 bg-[#0F0F12] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-gray-300 hover:text-emerald-200 rounded-lg transition font-mono text-xs text-left flex items-start space-x-2.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-400 text-[11px] uppercase">Restore All Nodes</span>
              <span className="text-[10px] text-gray-500 block">Power on all preset nodes and re-arm capabilities</span>
            </div>
          </button>
        </div>
      </div>

      {/* Nodes Hardware Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodeStates.map(n => {
          const nodeInstance = core.nodes.get(n.descriptor.moduleId);

          return (
            <div
              key={n.descriptor.moduleId}
              className={`bg-[#111114] border rounded-xl p-5 shadow-2xl transition flex flex-col justify-between ${
                n.isOnline
                  ? n.isPrimaryCoordinator
                    ? "border-amber-500/50 shadow-amber-500/5"
                    : "border-white/10 hover:border-indigo-500/50"
                  : "border-white/5 opacity-60"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                  <div>
                    <h3 className="font-bold text-white font-mono text-sm flex items-center space-x-2">
                      <span>{n.descriptor.name}</span>
                      {n.isPrimaryCoordinator && (
                        <span className="text-amber-400 font-bold text-[10px] uppercase" title="Primary Coordinator">
                          ★ PRIMARY
                        </span>
                      )}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">
                      {n.descriptor.moduleId} • {n.descriptor.spatialPose}
                    </p>
                  </div>

                  {/* Power Button */}
                  <button
                    onClick={() => {
                      if (n.isOnline) {
                        core.dieNode(n.descriptor.moduleId, "User Studio Manual Switch");
                      } else {
                        core.bootNode(n.descriptor.moduleId);
                      }
                      onRefresh();
                    }}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      n.isOnline
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-400"
                        : "bg-white/5 border-white/10 text-gray-500 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-400"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>

                {/* Specs List */}
                <div className="space-y-2 text-xs font-mono text-gray-300 mb-4">
                  <div className="flex justify-between items-center bg-[#1A1A1E] p-2 rounded-lg border border-white/5">
                    <span className="text-gray-500 text-[10px] uppercase">Class & Type:</span>
                    <span className="text-indigo-300 font-semibold text-[11px]">{n.descriptor.deviceClass}</span>
                  </div>

                  <div className="flex justify-between items-center bg-[#1A1A1E] p-2 rounded-lg border border-white/5">
                    <span className="text-gray-500 text-[10px] uppercase">Election Fitness:</span>
                    <span className="text-amber-400 font-bold text-[11px]">{n.fitnessScore}</span>
                  </div>

                  {/* Interactive Battery Slider */}
                  <div className="bg-[#1A1A1E] p-2.5 rounded-lg border border-white/5">
                    <div className="flex justify-between items-center mb-1 text-[10px] font-mono uppercase">
                      <span className="text-gray-500 flex items-center space-x-1">
                        <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Battery Level:</span>
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {(n.descriptor.batteryLevel * 100).toFixed(0)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(n.descriptor.batteryLevel * 100)}
                      onChange={e => {
                        if (nodeInstance) {
                          nodeInstance.updateBattery(parseInt(e.target.value) / 100);
                          onRefresh();
                        }
                      }}
                      className="w-full accent-indigo-500 bg-white/10 h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Exposed Capabilities */}
                <div>
                  <span className="text-[10px] text-gray-500 font-mono block mb-1 uppercase tracking-wider">
                    Capability Advertisements:
                  </span>
                  <div className="space-y-1">
                    {n.capabilities.map(cap => (
                      <div
                        key={cap.capabilityId}
                        className="p-2 bg-[#1A1A1E] border border-white/5 rounded-lg text-[10px] font-mono flex items-center justify-between"
                      >
                        <span className="text-indigo-300 font-semibold">{cap.name}</span>
                        <span className="text-emerald-400">{cap.qoc.latencyMs}ms</span>
                      </div>
                    ))}
                    {n.capabilities.length === 0 && (
                      <span className="text-xs text-gray-500 italic font-mono block">
                        No capabilities (Node is Offline)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-2">
                <button
                  disabled={!n.isOnline}
                  onClick={() => {
                    if (nodeInstance) {
                      nodeInstance.triggerAction(
                        Verb.SELECT,
                        Target.CURRENT_OBJECT,
                        [Modifier.PRECISE],
                        `Test Pulse from ${n.descriptor.name}`
                      );
                      onRefresh();
                    }
                  }}
                  className={`w-full py-2 rounded-lg font-mono text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer uppercase tracking-wider ${
                    n.isOnline
                      ? "bg-white/5 hover:bg-white/10 text-indigo-300 border border-white/10"
                      : "bg-[#0F0F12] text-gray-600 border border-white/5 cursor-not-allowed"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Pulse Envelope</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Node Creation Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-[#0F0F12]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 font-mono">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 uppercase tracking-wider">
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Create Custom DMWE Bead / IBN</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-500 block mb-1 text-[10px] uppercase">Module Name:</label>
                <input
                  type="text"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full bg-[#0F0F12] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-gray-500 block mb-1 text-[10px] uppercase">Module Class:</label>
                <select
                  value={customClass}
                  onChange={e => setCustomClass(e.target.value as ModuleClass)}
                  className="w-full bg-[#0F0F12] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={ModuleClass.SENSOR}>SENSOR</option>
                  <option value={ModuleClass.COMPUTE}>COMPUTE</option>
                  <option value={ModuleClass.VISION}>VISION</option>
                  <option value={ModuleClass.BIO}>BIO</option>
                  <option value={ModuleClass.OUTPUT}>OUTPUT</option>
                  <option value={ModuleClass.INTERMEDIARY_IBN}>INTERMEDIARY_IBN</option>
                </select>
              </div>

              <div>
                <label className="text-gray-500 block mb-1 text-[10px] uppercase">Spatial Pose:</label>
                <select
                  value={customPose}
                  onChange={e => setCustomPose(e.target.value as SpatialPose)}
                  className="w-full bg-[#0F0F12] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={SpatialPose.WRIST_RIGHT}>WRIST_RIGHT</option>
                  <option value={SpatialPose.LEFT_INDEX_FINGER}>LEFT_INDEX_FINGER</option>
                  <option value={SpatialPose.HEAD_FRAME}>HEAD_FRAME</option>
                  <option value={SpatialPose.NECK_CHASSIS}>NECK_CHASSIS</option>
                  <option value={SpatialPose.CAFE_TABLE_SURFACE}>CAFE_TABLE_SURFACE</option>
                  <option value={SpatialPose.POS_TERMINAL}>POS_TERMINAL</option>
                </select>
              </div>

              <div>
                <label className="text-gray-500 block mb-1 text-[10px] uppercase">Exposed Capability Name:</label>
                <input
                  type="text"
                  value={customCapName}
                  onChange={e => setCustomCapName(e.target.value)}
                  className="w-full bg-[#0F0F12] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/5">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomNode}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition shadow-lg cursor-pointer uppercase tracking-wider"
              >
                Boot & Add Node
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
