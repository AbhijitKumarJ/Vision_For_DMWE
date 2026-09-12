import React, { useState } from "react";
import { Sparkles, Send, ArrowRight, Zap, CheckCircle2, AlertCircle, Bot, BookOpen } from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";
import { Verb, Target, Modifier } from "../types/dmwe";

const GRAMMAR_VERBS = Object.values(Verb);
const GRAMMAR_TARGETS = Object.values(Target);
const GRAMMAR_MODIFIERS = Object.values(Modifier);

interface AIIntentParserViewProps {
  core: MeshOSCore;
  onRefresh: () => void;
}

export const AIIntentParserView: React.FC<AIIntentParserViewProps> = ({ core, onRefresh }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const samplePrompts = [
    "Dim the living room lamp by scrolling my smart ring slider down",
    "Mute my Zoom call silently without uttering audible speech",
    "Turn plain wooden cafe table into a keyboard and type 'Hello MeshOS'",
    "Point my ring at drive-thru POS terminal 10ft away to authorize payment",
    "Roll down the Tesla passenger window by swiping up in mid-air",
    "Approve 2FA challenge with micro-muscle twitch on wristband"
  ];

  const handleParsePrompt = async (promptToUse?: string) => {
    const activePrompt = promptToUse || prompt;
    if (!activePrompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai/parse-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: activePrompt })
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to parse intent.");
    } finally {
      setLoading(false);
    }
  };

  const handleInjectPacketIntoMesh = () => {
    if (!result) return;

    const ringNode = core.nodes.get("DMWE-RNG-9942");
    if (ringNode && ringNode.isOnline) {
      ringNode.triggerAction(
        result.verb || Verb.SELECT,
        result.target || Target.IOT_DEVICE,
        result.modifiers || [Modifier.PRECISE],
        `AI Intent Injection: "${prompt}"`,
        { textValue: result.explanation }
      );
      alert(`✅ Injected AI Intent [${result.verb} -> ${result.target}] into MeshOS Coordinator!`);
      onRefresh();
    } else {
      alert("Please ensure Smart Ring ('DMWE-RNG-9942') is online in Node Studio.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      {/* Title */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 shadow-lg">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Gemini AI Natural Language Intent Interpreter
            </h2>
            <p className="text-[11px] text-gray-500 font-mono">
              Translates plain English user prompts into structured DMWE Intent Packets (Volume VIII)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form & Sample Prompts */}
        <div className="lg:col-span-6 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Enter Natural Language Prompt:</h3>

          <div className="space-y-3">
            <textarea
              rows={3}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. 'I want to dim the living room light using my ring slider'..."
              className="w-full bg-[#0F0F12] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-xs font-mono placeholder-gray-600"
            />

            <button
              onClick={() => handleParsePrompt()}
              disabled={loading || !prompt.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs shadow-lg transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50 uppercase tracking-wider"
            >
              {loading ? (
                <span>Parsing with Gemini AI...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Parse Intent with Gemini AI</span>
                </>
              )}
            </button>
          </div>

          {/* Sample Chips */}
          <div className="pt-3 border-t border-white/5 space-y-2">
            <span className="text-gray-500 text-[10px] uppercase block">Sample User Commands:</span>
            <div className="flex flex-col gap-1.5 text-xs">
              {samplePrompts.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(s);
                    handleParsePrompt(s);
                  }}
                  className="p-2.5 bg-[#1A1A1E] hover:bg-white/5 border border-white/5 hover:border-indigo-500/50 rounded-lg text-left text-gray-300 transition cursor-pointer text-[11px]"
                >
                  "{s}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Parsed Intent Packet */}
        <div className="lg:col-span-6 bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-300 border-b border-white/5 pb-3 flex items-center justify-between uppercase tracking-wider">
              <span className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>DMWE Intent Packet Structure</span>
              </span>
              {result && (
                <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
                  {(result.confidence * 100).toFixed(0)}% Confidence
                </span>
              )}
            </h3>

            {loading && (
              <div className="py-16 text-center text-indigo-300 animate-pulse text-xs">
                Querying Gemini AI Intent Parser...
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs space-y-1 my-4">
                <strong>Gemini API Error:</strong> {error}
              </div>
            )}

            {result && !loading && (
              <div className="space-y-4 pt-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg">
                    <span className="text-gray-500 text-[10px] uppercase block">Verb (Semantic Action)</span>
                    <span className="text-indigo-400 font-bold text-xs block uppercase mt-0.5">{result.verb}</span>
                  </div>

                  <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg">
                    <span className="text-gray-500 text-[10px] uppercase block">Target Category</span>
                    <span className="text-purple-300 font-bold text-xs block uppercase mt-0.5">{result.target}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg">
                  <span className="text-gray-500 text-[10px] uppercase block mb-1">Suggested Capability</span>
                  <span className="text-amber-300 font-semibold text-xs">{result.suggestedCapability}</span>
                </div>

                <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase block">AI Semantic Explanation</span>
                  <p className="text-gray-300 font-sans text-xs leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="py-20 text-center text-gray-500 text-xs">
                Select a sample command or enter a prompt to inspect AI intent mapping.
              </div>
            )}
          </div>

          {result && (
            <button
              onClick={handleInjectPacketIntoMesh}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow-lg transition cursor-pointer flex items-center justify-center space-x-2 uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Inject Intent Packet Into MeshOS Engine</span>
            </button>
          )}
        </div>
      </div>

      {/* Interaction Grammar Reference (Volume XI, Ch 9) */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl font-mono text-xs">
        <h3 className="text-xs font-bold text-gray-300 border-b border-white/5 pb-3 flex items-center space-x-2 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Interaction Grammar Reference (Volume XI, Ch 9)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div>
            <span className="text-gray-500 text-[10px] uppercase block mb-2">Verbs ({GRAMMAR_VERBS.length})</span>
            <div className="flex flex-wrap gap-1.5">
              {GRAMMAR_VERBS.map(v => (
                <span key={v} className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded text-[10px]">
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-gray-500 text-[10px] uppercase block mb-2">Targets ({GRAMMAR_TARGETS.length})</span>
            <div className="flex flex-wrap gap-1.5">
              {GRAMMAR_TARGETS.map(t => (
                <span key={t} className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-gray-500 text-[10px] uppercase block mb-2">Modifiers ({GRAMMAR_MODIFIERS.length})</span>
            <div className="flex flex-wrap gap-1.5">
              {GRAMMAR_MODIFIERS.map(m => (
                <span key={m} className="px-2 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded text-[10px]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
