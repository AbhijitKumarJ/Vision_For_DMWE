import React from "react";
import {
  Cpu,
  Zap,
  Activity,
  Radio,
  Layers,
  Terminal,
  Play,
  Bot,
  AlertTriangle,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";

interface HeaderProps {
  core: MeshOSCore;
  activeTab: "topology" | "studio" | "sandbox" | "graphs" | "terminal" | "apps" | "ai";
  setActiveTab: (tab: "topology" | "studio" | "sandbox" | "graphs" | "terminal" | "apps" | "ai") => void;
  onResetMesh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  core,
  activeTab,
  setActiveTab,
  onResetMesh
}) => {
  const nodeStates = core.getNodeStates();
  const onlineCount = nodeStates.filter(n => n.isOnline).length;
  const primaryNode = nodeStates.find(n => n.isPrimaryCoordinator);
  const totalCaps = core.capabilityRegistry.length;
  const faultCount = core.faultEvents.filter(f => !f.resolved).length;

  return (
    <header className="bg-[#141418] border-b border-white/5 text-gray-200 px-6 py-3.5 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-600/30">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-semibold uppercase tracking-widest text-white">
                MeshOS <span className="text-indigo-400">Reference Simulator</span>
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono uppercase">
                v0.1.2-ALPHA
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono tracking-tighter">
              STANDARDS DRAFT COMPLIANT (VOL I–XII) • DISTRIBUTED MODULAR WEARABLE ECOSYSTEM
            </p>
          </div>
        </div>

        {/* Live Metrics Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {/* Primary Coordinator */}
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-2">
            <Radio className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-gray-500 text-[10px] uppercase">Primary Node:</span>
            <span className="text-emerald-400 font-semibold truncate max-w-[140px]">
              {primaryNode ? primaryNode.descriptor.name : "ELECTING..."}
            </span>
          </div>

          {/* Active Nodes */}
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-500 text-[10px] uppercase">Mesh Nodes:</span>
            <span className="text-emerald-400 font-bold">
              {onlineCount}/{nodeStates.length}
            </span>
          </div>

          {/* Registered Capabilities */}
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-gray-500 text-[10px] uppercase">Caps:</span>
            <span className="text-indigo-300 font-bold">{totalCaps}</span>
            {core.isCapabilityFused && (
              <span className="px-1.5 py-0.5 text-[9px] bg-emerald-500/20 text-emerald-400 rounded uppercase font-sans font-medium border border-emerald-500/30">
                FUSED
              </span>
            )}
          </div>

          {/* Fault Alerts */}
          {faultCount > 0 && (
            <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center space-x-1.5 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">FAULTS: {faultCount}</span>
            </div>
          )}

          {/* Reset Mesh Button */}
          <button
            onClick={onResetMesh}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition flex items-center space-x-1.5 cursor-pointer text-[11px]"
            title="Reset All Mesh Nodes to Initial State"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mt-3 flex items-center space-x-1 overflow-x-auto pb-0.5 font-mono text-xs border-t border-white/5 pt-2.5">
        <button
          onClick={() => setActiveTab("topology")}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-2 font-medium transition cursor-pointer text-[11px] ${
            activeTab === "topology"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Mesh Topology</span>
        </button>

        <button
          onClick={() => setActiveTab("studio")}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-2 font-medium transition cursor-pointer text-[11px] ${
            activeTab === "studio"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Node Studio</span>
        </button>

        <button
          onClick={() => setActiveTab("sandbox")}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-2 font-medium transition cursor-pointer text-[11px] ${
            activeTab === "sandbox"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Gesture Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab("graphs")}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-2 font-medium transition cursor-pointer text-[11px] ${
            activeTab === "graphs"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Graph Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab("terminal")}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-2 font-medium transition cursor-pointer text-[11px] ${
            activeTab === "terminal"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Terminal & Logs</span>
        </button>

        <button
          onClick={() => setActiveTab("apps")}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-2 font-medium transition cursor-pointer text-[11px] ${
            activeTab === "apps"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Apps Playground</span>
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-2 font-medium transition cursor-pointer text-[11px] ${
            activeTab === "ai"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Intent Interpreter</span>
        </button>
      </div>
    </header>
  );
};
