import React, { useState, useEffect } from "react";
import { MeshOSCore } from "./simulator/MeshOSCore";
import { globalMeshRadio } from "./simulator/MeshRadio";
import { createPresetNodes } from "./simulator/VirtualNodes";
import { Header } from "./components/Header";
import { TopologyView } from "./components/TopologyView";
import { NodeStudio } from "./components/NodeStudio";
import { GestureSandbox } from "./components/GestureSandbox";
import { GraphInspector } from "./components/GraphInspector";
import { TerminalView } from "./components/TerminalView";
import { AppsPlayground } from "./components/AppsPlayground";
import { AIIntentParserView } from "./components/AIIntentParserView";

// Initialize Singleton MeshOS Core Engine
const coreEngine = new MeshOSCore(globalMeshRadio);

// Boot Preset Hardware Nodes
const presetNodes = createPresetNodes(globalMeshRadio);
presetNodes.forEach(node => {
  coreEngine.registerVirtualNode(node);
  node.boot();
});

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "topology" | "studio" | "sandbox" | "graphs" | "terminal" | "apps" | "ai"
  >("topology");
  const [, setTick] = useState(0);

  const triggerRefresh = () => {
    setTick(t => t + 1);
  };

  // Periodic health telemetry tick (Volume IV Ch 14: Health Manager)
  useEffect(() => {
    const interval = setInterval(() => {
      coreEngine.tickHealth();
      setTick(t => t + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleResetMesh = () => {
    coreEngine.nodes.forEach(node => {
      coreEngine.bootNode(node.descriptor.moduleId);
      node.updateBattery(0.85);
    });
    triggerRefresh();
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-gray-200 font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      <div>
        <Header
          core={coreEngine}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onResetMesh={handleResetMesh}
        />

        <main className="pb-12">
          {activeTab === "topology" && (
            <TopologyView core={coreEngine} onRefresh={triggerRefresh} />
          )}

          {activeTab === "studio" && (
            <NodeStudio core={coreEngine} onRefresh={triggerRefresh} />
          )}

          {activeTab === "sandbox" && (
            <GestureSandbox core={coreEngine} onRefresh={triggerRefresh} />
          )}

          {activeTab === "graphs" && <GraphInspector core={coreEngine} />}

          {activeTab === "terminal" && (
            <TerminalView core={coreEngine} onRefresh={triggerRefresh} />
          )}

          {activeTab === "apps" && (
            <AppsPlayground core={coreEngine} onRefresh={triggerRefresh} />
          )}

          {activeTab === "ai" && (
            <AIIntentParserView core={coreEngine} onRefresh={triggerRefresh} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0A0A0C] py-4 px-6 text-center text-xs text-gray-500 font-mono tracking-tight">
        <p>
          Distributed Modular Wearable Ecosystem (DMWE) & MeshOS Reference Simulator • Volumes I – XII Standards Compliant
        </p>
      </footer>
    </div>
  );
}
