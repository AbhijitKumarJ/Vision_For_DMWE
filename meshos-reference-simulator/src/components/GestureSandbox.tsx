import React, { useState } from "react";
import {
  Zap,
  Activity,
  CircleDot,
  Glasses,
  Mic,
  Square,
  CreditCard,
  Car,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Hand,
  Move,
  Eye,
  MousePointerClick,
  Headphones,
  Sparkles
} from "lucide-react";
import { MeshOSCore } from "../simulator/MeshOSCore";
import { Verb, Target, Modifier, InteractionObject } from "../types/dmwe";

interface GestureSandboxProps {
  core: MeshOSCore;
  onRefresh: () => void;
}

export const GestureSandbox: React.FC<GestureSandboxProps> = ({ core, onRefresh }) => {
  const [activePipeline, setActivePipeline] = useState<{
    nodeName: string;
    rawGesture: string;
    verb: Verb;
    target: Target;
    modifiers: Modifier[];
    confidence: number;
    capabilityId: string;
    appTriggered: string;
  } | null>({
    nodeName: "Aura Smart Ring",
    rawGesture: "Air Pinch Gesture",
    verb: Verb.SELECT,
    target: Target.IOT_DEVICE,
    modifiers: [Modifier.PRECISE],
    confidence: 0.96,
    capabilityId: "interaction.pointer.precision",
    appTriggered: "Aura Home (Universal Spatial Control)"
  });

  const nodeStates = core.getNodeStates();

  const handleTriggerGesture = (
    nodeId: string,
    rawGesture: string,
    verb: Verb,
    target: Target,
    modifiers: Modifier[],
    appTriggered: string,
    opts: { textValue?: string; scalarDelta?: number; spatialVector?: { x: number; y: number; z: number } } = {}
  ) => {
    const nodeInstance = core.nodes.get(nodeId);
    if (!nodeInstance || !nodeInstance.isOnline) {
      alert(`Node ${nodeId} is OFFLINE or missing. Please power it on in Node Studio.`);
      return;
    }

    const ix = nodeInstance.triggerAction(verb, target, modifiers, rawGesture, opts);
    if (ix) {
      const cap = nodeInstance.capabilities[0];
      setActivePipeline({
        nodeName: nodeInstance.descriptor.name,
        rawGesture,
        verb,
        target,
        modifiers,
        confidence: ix.confidence,
        capabilityId: cap ? cap.capabilityId : "unknown",
        appTriggered
      });
      onRefresh();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>Interactive Gesture & Intent Pipeline Sandbox</span>
        </h2>
        <p className="text-[11px] text-gray-500 font-mono mt-1">
          Perform real physical micro-gestures across your wearable mesh and inspect the end-to-end HIL pipeline in real-time.
        </p>
      </div>

      {/* Preset Gesture Triggers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {/* 1. Smart Ring Air Pinch */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-RNG-9942",
              "Air Pinch Gesture",
              Verb.SELECT,
              Target.IOT_DEVICE,
              [Modifier.PRECISE],
              "Aura Home (Universal Spatial Control)"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-indigo-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <CircleDot className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                Ring
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Air Pinch</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Select/Toggle IoT Device (Pinch thumb & index)
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: interaction.pointer.precision
          </span>
        </button>

        {/* 2. Smart Glasses Prolonged Blink */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-GLS-1123",
              "Prolonged Blink",
              Verb.SELECT,
              Target.IOT_DEVICE,
              [Modifier.PRECISE],
              "Kindle Ghost Scroll"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-indigo-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Glasses className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">
                Glasses
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Prolonged Blink</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              IR Eye Gaze Target Selection
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: interaction.gaze.select
          </span>
        </button>

        {/* 3. Subvocalization Silent Speech */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-SUB-8812",
              "Subvocal Speech",
              Verb.AUTHENTICATE,
              Target.WORKSPACE,
              [Modifier.SILENT],
              "WhisperScribe Commuter AI",
              { textValue: "Mute presentation call and set status to busy" }
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-purple-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Mic className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 uppercase">
                SubVocal
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Subvocal Mouth</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Mouth silent words without audible vocal sound
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: subvocal.emg.text
          </span>
        </button>

        {/* 4. EMG Neuromuscular Flex */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-WST-3301",
              "Micro Muscle Flex",
              Verb.AUTHENTICATE,
              Target.WORKSPACE,
              [Modifier.PRECISE],
              "Bio-Token 2FA Approval"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-emerald-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                Wrist
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Micro-Muscle Flex</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Double ring finger twitch for instant 2FA token
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: emg.muscle.twitches
          </span>
        </button>

        {/* 5. Smart Table Vibration Tap */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "IBN-TBL-5590",
              "Acoustic Wood Tap",
              Verb.SELECT,
              Target.WORKSPACE,
              [Modifier.PRECISE],
              "GhostDesk Agnostic Workstation"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-sky-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Square className="w-4 h-4 text-sky-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 uppercase">
                Table IBN
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Acoustic Table Tap</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Tap plain wooden cafe table to register keystrokes
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: acoustic.vibration.touch
          </span>
        </button>

        {/* 6. POS UWB Point and Pay */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "IBN-POS-1090",
              "UWB Vector Point",
              Verb.AUTHENTICATE,
              Target.IOT_DEVICE,
              [Modifier.PRECISE],
              "Point-and-Pay 10ft Drive-Thru"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-teal-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 uppercase">
                POS IBN
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Point & Pay (10ft)</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              UWB spatial vector match with store POS terminal
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: payment.pos.uwb_relay
          </span>
        </button>

        {/* 7. Tesla Air Swipe */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "IBN-AUTO-007",
              "Cabin Air Swipe Up",
              Verb.MOVE,
              Target.ROOM,
              [Modifier.CONTINUOUS],
              "Tesla Spatial Dash",
              { spatialVector: { x: 0, y: 1.0, z: 0 } }
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-rose-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Car className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 uppercase">
                Tesla IBN
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Cabin Air Swipe</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Swipe up to roll up car passenger window
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: automotive.can.bridge
          </span>
        </button>

        {/* 8. Ring Slider Dimmer */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-RNG-9942",
              "Thumb Slide Scroll",
              Verb.SCROLL,
              Target.IOT_DEVICE,
              [Modifier.CONTINUOUS],
              "Aura Home Dimmer",
              { scalarDelta: -15 }
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-amber-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <CircleDot className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                Ring Slider
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Thumb Slide</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Continuous scalar slider change (Delta: -15)
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Cap: interaction.pointer.precision
          </span>
        </button>

        {/* 9. Grab Gesture */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-RNG-9942",
              "Grab Gesture",
              Verb.GRAB,
              Target.CURRENT_OBJECT,
              [Modifier.PRECISE],
              "Spatial Object Manipulation"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-emerald-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Hand className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                Ring
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Grab</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Grab virtual object in mid-air space
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: GRAB
          </span>
        </button>

        {/* 10. Release Gesture */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-RNG-9942",
              "Release Gesture",
              Verb.RELEASE,
              Target.CURRENT_OBJECT,
              [Modifier.PRECISE],
              "Spatial Object Manipulation"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-rose-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Hand className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 uppercase">
                Ring
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Release</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Release grabbed object at destination
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: RELEASE
          </span>
        </button>

        {/* 11. Swipe Gesture */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-RNG-9942",
              "Swipe Right",
              Verb.SWIPE,
              Target.WORKSPACE,
              [Modifier.RAPID],
              "Virtual Desktop Navigation"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-sky-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Move className="w-4 h-4 text-sky-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 uppercase">
                Ring
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Swipe</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Rapid directional swipe to flip workspace
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: SWIPE
          </span>
        </button>

        {/* 12. Gaze Dwell */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-GLS-1123",
              "Gaze Dwell 2s",
              Verb.DWELL,
              Target.CURRENT_OBJECT,
              [Modifier.SLOW],
              "Kindle Ghost Scroll"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-indigo-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">
                Glasses
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Gaze Dwell</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Hold gaze for 2s to select highlighted object
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: DWELL
          </span>
        </button>

        {/* 13. Air Tap */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-GLS-1123",
              "Air Tap",
              Verb.AIR_TAP,
              Target.CURRENT_OBJECT,
              [Modifier.PRECISE],
              "Aura Home Selection"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-purple-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <MousePointerClick className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 uppercase">
                Glasses
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Air Tap</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Quick air tap gesture to confirm selection
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: AIR_TAP
          </span>
        </button>

        {/* 14. Head Nod */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-GLS-1123",
              "Head Nod",
              Verb.HEAD_NOD,
              Target.SYSTEM_CONTROL,
              [Modifier.PRECISE],
              "System Confirmation"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-teal-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Sparkles className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 uppercase">
                Glasses
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Head Nod</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Nod to accept dialog / system prompt
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: HEAD_NOD
          </span>
        </button>

        {/* 15. Head Shake */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-GLS-1123",
              "Head Shake",
              Verb.HEAD_SHAKE,
              Target.SYSTEM_CONTROL,
              [Modifier.PRECISE],
              "System Dismissal"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-amber-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                Glasses
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Head Shake</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Shake head to dismiss notification / reject
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: HEAD_SHAKE
          </span>
        </button>

        {/* 16. Wrist Twist */}
        <button
          onClick={() =>
            handleTriggerGesture(
              "DMWE-WST-3301",
              "Wrist Twist",
              Verb.WRIST_TWIST,
              Target.MEDIA_PLAYER,
              [Modifier.CONTINUOUS],
              "SonicPulse Media Control"
            )
          }
          className="p-4 bg-[#111114] hover:bg-[#1A1A1E] border border-white/10 hover:border-cyan-500/50 rounded-xl text-left transition shadow-lg group cursor-pointer flex flex-col justify-between h-36"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
              <span className="text-[9px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 uppercase">
                Wrist
              </span>
            </div>
            <span className="font-bold text-white text-xs block uppercase tracking-wider">Wrist Twist</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-sans">
              Twist wrist to scrub media playback timeline
            </span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono">
            Verb: WRIST_TWIST
          </span>
        </button>
      </div>

      {/* Live Pipeline Execution Stream Inspector */}
      {activePipeline && (
        <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-2xl font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-xs font-bold text-white flex items-center space-x-2 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>End-to-End Pipeline Trace</span>
            </h3>
            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded text-[10px] uppercase flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pipeline Status: EXECUTED (2ms)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
            {/* Step 1 */}
            <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold">1. Physical Action</span>
              <span className="text-indigo-300 font-bold block text-[11px]">{activePipeline.rawGesture}</span>
              <span className="text-[10px] text-gray-400 block">{activePipeline.nodeName}</span>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-600 mx-auto hidden md:block" />

            {/* Step 2 */}
            <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold">2. Wire Envelope</span>
              <span className="text-purple-300 font-bold block text-[11px]">MeshEnvelope (Protobuf)</span>
              <span className="text-[10px] text-gray-400 block">QoS: Realtime (&lt;10ms)</span>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-600 mx-auto hidden md:block" />

            {/* Step 3 */}
            <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold">3. MeshOS Intent</span>
              <span className="text-emerald-400 font-bold block text-[11px]">
                [{activePipeline.verb} &rarr; {activePipeline.target}]
              </span>
              <span className="text-[10px] text-gray-400 block">
                Confidence: {(activePipeline.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-600 mx-auto hidden md:block" />

            {/* Step 4 */}
            <div className="p-3 bg-[#1A1A1E] border border-white/5 rounded-lg space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold">4. App SDK Callback</span>
              <span className="text-amber-400 font-bold block text-[11px]">{activePipeline.appTriggered}</span>
              <span className="text-[10px] text-gray-400 block">MeshOS.onIntent()</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
