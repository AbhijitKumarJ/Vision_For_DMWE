import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, Trash2, ShieldAlert, Cpu } from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";
import { CLIEngine, CLIOutputLine } from "../simulator/CLIEngine";

interface TerminalViewProps {
  core: MeshOSCore;
  onRefresh: () => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ core, onRefresh }) => {
  const [cliEngine] = useState(() => new CLIEngine(core));
  const [inputVal, setInputVal] = useState("");
  const [lines, setLines] = useState<CLIOutputLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "=== MeshOS CLI Shell v0.1.0 Ready. Type 'help' for command list. ==="
    },
    {
      id: "init-2",
      type: "output",
      text: "Try commands: 'nodes', 'caps', 'gesture DMWE-RNG-9942 pinch', 'ai dim light', 'faults'"
    }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [viewMode, setViewMode] = useState<"cli" | "protocol" | "faults">("cli");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, core.logs, core.faultEvents]);

  const handleRunCommand = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal;
    setInputVal("");
    setHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);

    const resultLines = await cliEngine.executeCommand(cmd);
    setLines(prev => [...prev, ...resultLines]);
    onRefresh();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 font-mono">
      {/* Top Controls & View Switcher */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-indigo-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">CLI Sandbox Terminal & Packet Logs</h2>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setViewMode("cli")}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer text-[11px] uppercase font-semibold ${
              viewMode === "cli"
                ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/50"
                : "bg-white/5 text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            Interactive CLI
          </button>

          <button
            onClick={() => setViewMode("protocol")}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer text-[11px] uppercase font-semibold ${
              viewMode === "protocol"
                ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                : "bg-white/5 text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            Live Protocol Trace ({core.logs.length})
          </button>

          <button
            onClick={() => setViewMode("faults")}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer text-[11px] uppercase font-semibold ${
              viewMode === "faults"
                ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                : "bg-white/5 text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            Fault Matrix ({core.faultEvents.length})
          </button>

          <button
            onClick={() => setLines([])}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
            title="Clear Console Output"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Terminal Shell Window */}
      {viewMode === "cli" && (
        <div className="bg-[#0F0F12] border border-white/10 rounded-xl p-4 shadow-2xl h-[520px] flex flex-col justify-between text-xs">
          {/* Scrollable Output Screen */}
          <div className="overflow-y-auto space-y-1.5 pr-2 font-mono flex-1">
            {lines.map(line => (
              <div
                key={line.id}
                className={`${
                  line.type === "input"
                    ? "text-indigo-400 font-bold"
                    : line.type === "system"
                    ? "text-purple-300 font-semibold"
                    : line.type === "error"
                    ? "text-rose-400"
                    : line.type === "success"
                    ? "text-emerald-400 font-semibold"
                    : "text-gray-300"
                }`}
              >
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Command Suggestion Pills */}
          <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5 text-[10px] mb-2 uppercase">
            <span className="text-gray-500 self-center mr-1">Quick:</span>
            {["nodes", "caps", "facts", "gesture DMWE-RNG-9942 pinch", "ai turn on light", "kill DMWE-RNG-9942", "boot all"].map(q => (
              <button
                key={q}
                onClick={() => setInputVal(q)}
                className="px-2 py-0.5 bg-[#1A1A1E] hover:bg-white/10 text-gray-300 border border-white/5 rounded cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleRunCommand} className="flex items-center space-x-2 pt-2 border-t border-white/5">
            <span className="text-indigo-400 font-bold text-sm">dmwe&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command e.g. 'nodes', 'caps', 'gesture DMWE-RNG-9942 pinch', 'ai dim room'..."
              className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder-gray-600"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition cursor-pointer flex items-center space-x-1 text-xs uppercase tracking-wider"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run</span>
            </button>
          </form>
        </div>
      )}

      {/* Protocol Log Stream */}
      {viewMode === "protocol" && (
        <div className="bg-[#0F0F12] border border-white/10 rounded-xl p-4 shadow-2xl h-[520px] overflow-y-auto space-y-2 text-xs">
          {core.logs.length === 0 ? (
            <p className="text-gray-500 italic">No logs recorded yet.</p>
          ) : (
            core.logs.map(l => (
              <div
                key={l.id}
                className="p-2.5 bg-[#1A1A1E] border border-white/5 rounded-lg flex items-start space-x-3 font-mono"
              >
                <span className="text-[10px] text-gray-500 shrink-0">
                  {new Date(l.timestampMs).toLocaleTimeString()}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 uppercase ${
                    l.level === "ERROR"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : l.level === "WARN"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : l.level === "SUCCESS"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  }`}
                >
                  {l.level}
                </span>
                <span className="text-purple-400 font-bold shrink-0">[{l.source}]</span>
                <span className="text-gray-200">{l.message}</span>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Fault Events Matrix View */}
      {viewMode === "faults" && (
        <div className="bg-[#0F0F12] border border-white/10 rounded-xl p-4 shadow-2xl h-[520px] overflow-y-auto space-y-3 text-xs">
          {core.faultEvents.length === 0 ? (
            <p className="text-gray-500 italic">No hardware fault events recorded.</p>
          ) : (
            core.faultEvents.map(f => (
              <div
                key={f.id}
                className="p-4 bg-[#1A1A1E] border border-rose-500/30 rounded-lg space-y-2 font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400 text-xs flex items-center space-x-2 uppercase">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Fault Code [{f.code}]</span>
                  </span>
                  <span className="text-gray-500 text-[10px]">
                    {new Date(f.timestampMs).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-200">{f.description}</p>

                {f.resolutionAction && (
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 text-[11px]">
                    <strong>Resolution Action:</strong> {f.resolutionAction}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
