import React, { useState } from "react";
import {
  Play,
  Code,
  CheckCircle2,
  Home,
  Mic,
  Keyboard,
  MonitorPlay,
  CreditCard,
  Car,
  ShieldCheck,
  BookOpen,
  Sparkles
} from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";
import { REFERENCE_APPS } from "../simulator/ReferenceApps";
import { Verb, Target, Modifier } from "../types/dmwe";

interface AppsPlaygroundProps {
  core: MeshOSCore;
  onRefresh: () => void;
}

export const AppsPlayground: React.FC<AppsPlaygroundProps> = ({ core, onRefresh }) => {
  const [selectedAppId, setSelectedAppId] = useState<string>("app-aura-home");
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const selectedApp = REFERENCE_APPS.find(a => a.id === selectedAppId) || REFERENCE_APPS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home": return <Home className="w-5 h-5 text-cyan-400" />;
      case "Mic": return <Mic className="w-5 h-5 text-purple-400" />;
      case "Keyboard": return <Keyboard className="w-5 h-5 text-sky-400" />;
      case "MonitorPlay": return <MonitorPlay className="w-5 h-5 text-indigo-400" />;
      case "CreditCard": return <CreditCard className="w-5 h-5 text-teal-400" />;
      case "Car": return <Car className="w-5 h-5 text-rose-400" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case "BookOpen": return <BookOpen className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleRunAppScenario = () => {
    const ringNode = core.nodes.get("DMWE-RNG-9942");
    if (!ringNode || !ringNode.isOnline) {
      setExecutionOutput("⚠️ Execution Failed: Smart Ring ('DMWE-RNG-9942') is OFFLINE. Please power on all nodes in Node Studio.");
      return;
    }

    ringNode.triggerAction(
      Verb.SELECT,
      Target.IOT_DEVICE,
      [Modifier.PRECISE],
      `App Execution Trigger: ${selectedApp.name}`
    );

    setExecutionOutput(
      `✅ [SUCCESS] Executed '${selectedApp.name}' scenario!\n` +
      `• Intent Received: [SELECT -> IOT_DEVICE]\n` +
      `• Hardware Origin: ${ringNode.descriptor.name} (${ringNode.descriptor.moduleId})\n` +
      `• SDK Event Handler: MeshOS.onIntent() fired in 2ms.\n` +
      `• Target IBN Bridge: ${selectedApp.targetIbn || "Direct PAM Mesh"}`
    );

    onRefresh();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
          <Play className="w-4 h-4 text-indigo-400" />
          <span>Reference Applications Sandbox (Volume XII Specification)</span>
        </h2>
        <p className="text-[11px] text-gray-500 font-mono mt-1">
          Explore production-grade TypeScript SDK code snippets and execute live hardware scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* App List Sidebar */}
        <div className="lg:col-span-4 bg-[#111114] border border-white/10 rounded-xl p-4 shadow-2xl space-y-2">
          <h3 className="text-xs font-bold text-gray-500 font-mono px-2 uppercase tracking-wider mb-2">
            Reference Apps Library
          </h3>

          <div className="space-y-1.5 font-mono text-xs">
            {REFERENCE_APPS.map(app => (
              <button
                key={app.id}
                onClick={() => {
                  setSelectedAppId(app.id);
                  setExecutionOutput(null);
                }}
                className={`w-full p-3 rounded-xl border text-left transition flex items-center space-x-3 cursor-pointer ${
                  selectedAppId === app.id
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md"
                    : "bg-[#1A1A1E] border-white/5 text-gray-300 hover:bg-white/5"
                }`}
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                  {getIcon(app.icon)}
                </div>
                <div className="truncate">
                  <span className="font-bold block truncate text-xs uppercase tracking-wider">{app.name}</span>
                  <span className="text-[10px] text-gray-500 block">{app.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected App Inspector & SDK Viewer */}
        <div className="lg:col-span-8 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#1A1A1E] border border-white/10 rounded-xl">
                  {getIcon(selectedApp.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">{selectedApp.name}</h3>
                  <span className="text-xs text-indigo-400 font-mono">{selectedApp.category}</span>
                </div>
              </div>

              <button
                onClick={handleRunAppScenario}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-mono font-bold transition shadow-lg cursor-pointer flex items-center space-x-2 uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Simulate App Execution</span>
              </button>
            </div>

            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              {selectedApp.description}
            </p>

            {/* Required Capabilities & Target IBN Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg">
                <span className="text-gray-500 text-[10px] uppercase block mb-1">Required Capabilities:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedApp.requiredCapabilities.map(cap => (
                    <span
                      key={cap}
                      className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded text-[10px]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg">
                <span className="text-gray-500 text-[10px] uppercase block mb-1">Target Intermediary IBN:</span>
                <span className="text-teal-300 font-semibold text-xs">
                  {selectedApp.targetIbn ? selectedApp.targetIbn : "Direct PAM Personal Area Mesh"}
                </span>
              </div>
            </div>

            {/* SDK TypeScript Code Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center space-x-1.5 uppercase text-[11px]">
                  <Code className="w-4 h-4 text-indigo-400" />
                  <span>SDK TypeScript Code Implementation (Volume IX SDK)</span>
                </span>
              </div>

              <pre className="p-4 bg-[#0F0F12] border border-white/10 rounded-lg text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed shadow-inner">
                <code>{selectedApp.codeSnippet}</code>
              </pre>
            </div>

            {/* Execution Output Box */}
            {executionOutput && (
              <div className="p-4 bg-[#0F0F12] border border-emerald-500/30 rounded-lg font-mono text-xs text-emerald-300 space-y-1">
                <pre className="whitespace-pre-wrap">{executionOutput}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
