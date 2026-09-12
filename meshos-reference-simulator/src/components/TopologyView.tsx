import React, { useState } from "react";
import {
  Activity,
  Radio,
  Zap,
  BatteryCharging,
  ShieldCheck,
  CircleDot,
  Glasses,
  Mic,
  Headphones,
  Sparkles,
  Square,
  CreditCard,
  Car,
  Layers,
  Power
} from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";
import { NodeState } from "../types/dmwe";

interface TopologyViewProps {
  core: MeshOSCore;
  onRefresh: () => void;
}

export const TopologyView: React.FC<TopologyViewProps> = ({ core, onRefresh }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("DMWE-RNG-9942");
  const nodeStates = core.getNodeStates();
  const selectedNode = nodeStates.find(n => n.descriptor.moduleId === selectedNodeId);
  const primaryNode = nodeStates.find(n => n.isPrimaryCoordinator);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "CircleDot": return <CircleDot className="w-5 h-5 text-cyan-400" />;
      case "Glasses": return <Glasses className="w-5 h-5 text-indigo-400" />;
      case "Mic": return <Mic className="w-5 h-5 text-purple-400" />;
      case "Activity": return <Activity className="w-5 h-5 text-emerald-400" />;
      case "Headphones": return <Headphones className="w-5 h-5 text-amber-400" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-pink-400" />;
      case "Square": return <Square className="w-5 h-5 text-sky-400" />;
      case "CreditCard": return <CreditCard className="w-5 h-5 text-teal-400" />;
      case "Car": return <Car className="w-5 h-5 text-red-400" />;
      default: return <Radio className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">
      {/* Visual Canvas Diagram */}
      <div className="lg:col-span-8 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
              <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Real-Time Mesh Topology & RF Matrix</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Personal Area Mesh (PAM) + Intermediary Bridge Nodes (IBN)
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded text-[10px] uppercase border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>RF Spectrum: Active</span>
            </span>
          </div>
        </div>

        {/* SVG Mesh Visualization */}
        <div className="relative w-full h-[480px] bg-[#0F0F12] rounded-lg border border-white/5 flex items-center justify-center p-4 overflow-hidden">
          {/* Background Grid Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#6366f1" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Central Body Silhouette Outline */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
            <svg width="240" height="400" viewBox="0 0 100 180" fill="none" stroke="#6366f1" strokeWidth="1">
              {/* Head */}
              <circle cx="50" cy="22" r="14" />
              {/* Neck & Shoulders */}
              <path d="M50 36 L50 48 M30 52 L70 52 L65 110 L35 110 Z" />
              {/* Arms */}
              <path d="M30 52 L15 100 M70 52 L85 100" />
              {/* Legs */}
              <path d="M40 110 L35 170 M60 110 L65 170" />
            </svg>
          </div>

          {/* Connected Wireless Link Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodeStates.map(node => {
              if (!node.isOnline || !primaryNode || node.descriptor.moduleId === primaryNode.descriptor.moduleId) {
                return null;
              }
              // Coordinates mapping for node positions
              const getPos = (id: string) => {
                if (id === "DMWE-RNG-9942") return { x: "28%", y: "48%" }; // Left Finger
                if (id === "DMWE-GLS-1123") return { x: "50%", y: "16%" }; // Head
                if (id === "DMWE-SUB-8812") return { x: "50%", y: "28%" }; // Neck
                if (id === "DMWE-WST-3301") return { x: "72%", y: "48%" }; // Right Wrist
                if (id === "DMWE-EAR-7711") return { x: "42%", y: "18%" }; // In-Ear
                if (id === "DMWE-PRJ-4010") return { x: "50%", y: "36%" }; // Chest Projector
                if (id === "IBN-TBL-5590") return { x: "15%", y: "78%" }; // Cafe Table
                if (id === "IBN-POS-1090") return { x: "82%", y: "78%" }; // POS Terminal
                if (id === "IBN-AUTO-007") return { x: "85%", y: "25%" }; // Tesla Dash
                return { x: "50%", y: "50%" };
              };

              const start = getPos(node.descriptor.moduleId);
              const end = getPos(primaryNode.descriptor.moduleId);

              return (
                <g key={`link-${node.descriptor.moduleId}`}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={node.descriptor.isIbn ? "#10b981" : "#6366f1"}
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="opacity-60"
                  />
                  <circle cx={start.x} cy={start.y} r="3" fill="#10b981" className="animate-ping opacity-75" />
                </g>
              );
            })}
          </svg>

          {/* Node Overlay Interactive Cards */}
          <div className="absolute inset-0 p-6 pointer-events-auto flex flex-col justify-between">
            {/* Top Row: Head/Vision Nodes */}
            <div className="flex justify-between items-start">
              {/* Glasses */}
              <NodeBadge
                node={nodeStates.find(n => n.descriptor.moduleId === "DMWE-GLS-1123")}
                icon={<Glasses className="w-4 h-4 text-indigo-400" />}
                isSelected={selectedNodeId === "DMWE-GLS-1123"}
                onSelect={() => setSelectedNodeId("DMWE-GLS-1123")}
              />
              {/* Tesla IBN */}
              <NodeBadge
                node={nodeStates.find(n => n.descriptor.moduleId === "IBN-AUTO-007")}
                icon={<Car className="w-4 h-4 text-red-400" />}
                isSelected={selectedNodeId === "IBN-AUTO-007"}
                onSelect={() => setSelectedNodeId("IBN-AUTO-007")}
              />
            </div>

            {/* Middle Row: Hands / Neck Nodes */}
            <div className="flex justify-between items-center my-auto">
              {/* Smart Ring */}
              <NodeBadge
                node={nodeStates.find(n => n.descriptor.moduleId === "DMWE-RNG-9942")}
                icon={<CircleDot className="w-4 h-4 text-emerald-400" />}
                isSelected={selectedNodeId === "DMWE-RNG-9942"}
                onSelect={() => setSelectedNodeId("DMWE-RNG-9942")}
              />

              {/* Neck & Projector Beads */}
              <div className="flex flex-col space-y-2 items-center">
                <NodeBadge
                  node={nodeStates.find(n => n.descriptor.moduleId === "DMWE-SUB-8812")}
                  icon={<Mic className="w-4 h-4 text-purple-400" />}
                  isSelected={selectedNodeId === "DMWE-SUB-8812"}
                  onSelect={() => setSelectedNodeId("DMWE-SUB-8812")}
                />
                <NodeBadge
                  node={nodeStates.find(n => n.descriptor.moduleId === "DMWE-PRJ-4010")}
                  icon={<Sparkles className="w-4 h-4 text-indigo-400" />}
                  isSelected={selectedNodeId === "DMWE-PRJ-4010"}
                  onSelect={() => setSelectedNodeId("DMWE-PRJ-4010")}
                />
              </div>

              {/* Wristband */}
              <NodeBadge
                node={nodeStates.find(n => n.descriptor.moduleId === "DMWE-WST-3301")}
                icon={<Activity className="w-4 h-4 text-emerald-400" />}
                isSelected={selectedNodeId === "DMWE-WST-3301"}
                onSelect={() => setSelectedNodeId("DMWE-WST-3301")}
              />
            </div>

            {/* Bottom Row: Environmental Intermediary Bridge Nodes (IBN) */}
            <div className="flex justify-between items-end">
              <NodeBadge
                node={nodeStates.find(n => n.descriptor.moduleId === "IBN-TBL-5590")}
                icon={<Square className="w-4 h-4 text-sky-400" />}
                isSelected={selectedNodeId === "IBN-TBL-5590"}
                onSelect={() => setSelectedNodeId("IBN-TBL-5590")}
              />
              <NodeBadge
                node={nodeStates.find(n => n.descriptor.moduleId === "IBN-POS-1090")}
                icon={<CreditCard className="w-4 h-4 text-teal-400" />}
                isSelected={selectedNodeId === "IBN-POS-1090"}
                onSelect={() => setSelectedNodeId("IBN-POS-1090")}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Topology Legend */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Chassis Node</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Intermediary IBN</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Primary Coordinator</span>
            </span>
          </div>
          <span>Total Nodes: {nodeStates.length}</span>
        </div>
      </div>

      {/* Selected Node Inspector Sidebar */}
      <div className="lg:col-span-4 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl flex flex-col justify-between">
        {selectedNode ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  {getIcon(selectedNode.descriptor.iconName)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">
                    {selectedNode.descriptor.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {selectedNode.descriptor.moduleId}
                  </p>
                </div>
              </div>

              {/* Power Toggle Button */}
              <button
                onClick={() => {
                  if (selectedNode.isOnline) {
                    core.dieNode(selectedNode.descriptor.moduleId, "Manual Toggle Off");
                  } else {
                    core.bootNode(selectedNode.descriptor.moduleId);
                  }
                  onRefresh();
                }}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  selectedNode.isOnline
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-400"
                    : "bg-white/5 border-white/10 text-gray-500 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-400"
                }`}
                title={selectedNode.isOnline ? "Power Off Node" : "Power On Node"}
              >
                <Power className="w-4 h-4" />
              </button>
            </div>

            {/* Status Tags */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#1A1A1E] p-3 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px] uppercase">State</span>
                <span
                  className={`font-bold ${
                    selectedNode.isOnline ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {selectedNode.isOnline ? "ONLINE" : "OFFLINE"}
                </span>
              </div>

              <div className="bg-[#1A1A1E] p-3 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px] uppercase">Fitness</span>
                <span className="text-indigo-400 font-bold">
                  {selectedNode.fitnessScore}{" "}
                  {selectedNode.isPrimaryCoordinator ? "(Elected)" : ""}
                </span>
              </div>

              <div className="bg-[#1A1A1E] p-3 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px] uppercase">Battery</span>
                <span className="text-gray-200 font-bold flex items-center space-x-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{(selectedNode.descriptor.batteryLevel * 100).toFixed(0)}%</span>
                </span>
              </div>

              <div className="bg-[#1A1A1E] p-3 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px] uppercase">Spatial Pose</span>
                <span className="text-indigo-300 font-medium truncate block text-[11px]">
                  {selectedNode.descriptor.spatialPose}
                </span>
              </div>
            </div>

            {/* Registered Capabilities */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 font-mono uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Exposed Capabilities</span>
              </h4>
              <div className="space-y-2">
                {selectedNode.capabilities.length > 0 ? (
                  selectedNode.capabilities.map(cap => (
                    <div
                      key={cap.capabilityId}
                      className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg font-mono text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-300 font-semibold text-[11px]">{cap.name}</span>
                        <span className="text-[10px] text-gray-500">v{cap.version}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {cap.capabilityId}
                      </p>
                      <div className="flex items-center space-x-3 mt-2 text-[10px] text-gray-400 border-t border-white/5 pt-1.5">
                        <span>Latency: <strong className="text-emerald-400">{cap.qoc.latencyMs}ms</strong></span>
                        <span>Accuracy: <strong className="text-emerald-400">{(cap.qoc.accuracyScore * 100).toFixed(0)}%</strong></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 font-mono italic">
                    No capabilities active (Node is Offline).
                  </p>
                )}
              </div>
            </div>

            {/* Quick Test Trigger */}
            {selectedNode.isOnline && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    const nodeInstance = core.nodes.get(selectedNode.descriptor.moduleId);
                    if (nodeInstance) {
                      nodeInstance.triggerAction(
                        selectedNode.descriptor.isIbn ? 1 as any : 0 as any,
                        0 as any,
                        [0 as any],
                        `Interactive Ping Test from ${selectedNode.descriptor.name}`
                      );
                      onRefresh();
                    }
                  }}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-semibold text-xs shadow-lg transition cursor-pointer flex items-center justify-center space-x-2 uppercase tracking-wider"
                >
                  <Zap className="w-4 h-4" />
                  <span>Pulse Test Envelope</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 font-mono text-xs">
            Select a node on the diagram to inspect properties.
          </div>
        )}
      </div>
    </div>
  );
};

// Helper badge component
const NodeBadge: React.FC<{
  node?: NodeState;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ node, icon, isSelected, onSelect }) => {
  if (!node) return null;

  return (
    <div
      onClick={onSelect}
      className={`p-2.5 rounded-lg border transition transform hover:scale-105 cursor-pointer flex items-center space-x-2.5 max-w-[170px] shadow-lg ${
        isSelected
          ? "bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500"
          : node.isOnline
          ? node.isPrimaryCoordinator
            ? "bg-amber-500/10 border-amber-500/40 text-amber-200"
            : node.descriptor.isIbn
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
            : "bg-[#141418] border-white/10 text-gray-200"
          : "bg-white/2 border-white/5 text-gray-600 opacity-60"
      }`}
    >
      <div className="p-1.5 rounded bg-white/5 shrink-0">{icon}</div>
      <div className="truncate text-xs font-mono">
        <div className="font-semibold truncate leading-tight text-[11px]">{node.descriptor.name}</div>
        <div className="text-[10px] opacity-75 flex items-center space-x-1">
          <span className={`w-1.5 h-1.5 rounded-full ${node.isOnline ? "bg-emerald-400" : "bg-rose-500"}`} />
          <span>{node.isOnline ? `${(node.descriptor.batteryLevel * 100).toFixed(0)}%` : "Off"}</span>
          {node.isPrimaryCoordinator && <span className="text-amber-400 font-bold ml-1">★</span>}
        </div>
      </div>
    </div>
  );
};
