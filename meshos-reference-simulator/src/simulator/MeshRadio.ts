import { MeshEnvelope, QoSClass } from "../types/dmwe";

type PacketListener = (envelope: MeshEnvelope) => void;

export interface LatencyObservation {
  messageId: string;
  senderNodeId: string;
  declaredMs: number;
  actualMs: number;
  qosClass: QoSClass;
}

export class MeshRadio {
  private listeners: Map<string, PacketListener> = new Map();
  private packetHistory: MeshEnvelope[] = [];
  public simulatedNoiseDbm: number = -85; // Default background noise
  public simulatedLatencyMs: number = 4;
  public latencyHistory: LatencyObservation[] = [];

  public subscribe(nodeId: string, callback: PacketListener) {
    this.listeners.set(nodeId, callback);
  }

  public unsubscribe(nodeId: string) {
    this.listeners.delete(nodeId);
  }

  public broadcast(envelope: MeshEnvelope) {
    // Record history (cap at 200)
    this.packetHistory.unshift(envelope);
    if (this.packetHistory.length > 200) {
      this.packetHistory.pop();
    }

    // Determine declared latency budget based on QoS class
    let declaredMs = this.simulatedLatencyMs;
    if (envelope.qosClass === QoSClass.QOS_REALTIME_INTERACTION) {
      declaredMs = 5; // Volume III §9.6: Realtime Interaction budget ≤10ms
    } else if (envelope.qosClass === QoSClass.QOS_AI_INFERENCE) {
      declaredMs = 50;
    } else if (envelope.qosClass === QoSClass.QOS_VIDEO) {
      declaredMs = 150;
    } else if (envelope.qosClass === QoSClass.QOS_AUDIO) {
      declaredMs = 20;
    } else {
      declaredMs = 2000; // QOS_BACKGROUND
    }

    // Determine actual (simulated) latency
    let latency = this.simulatedLatencyMs;
    if (envelope.qosClass === QoSClass.QOS_REALTIME_INTERACTION) {
      latency = Math.max(1, Math.floor(latency / 2));
    }

    // Record declared vs actual latency observation
    this.latencyHistory.unshift({
      messageId: envelope.messageId,
      senderNodeId: envelope.senderNodeId,
      declaredMs,
      actualMs: latency,
      qosClass: envelope.qosClass
    });
    if (this.latencyHistory.length > 100) {
      this.latencyHistory.pop();
    }

    // Dispatch async over the air
    setTimeout(() => {
      this.listeners.forEach((callback, listenerNodeId) => {
        // Don't loop back to sender unless specific test
        if (listenerNodeId !== envelope.senderNodeId) {
          callback(envelope);
        }
      });
    }, latency);
  }

  public getPacketHistory(): MeshEnvelope[] {
    return this.packetHistory;
  }

  public getLatencyHistory(): LatencyObservation[] {
    return this.latencyHistory;
  }

  public clearHistory() {
    this.packetHistory = [];
    this.latencyHistory = [];
  }
}

export const globalMeshRadio = new MeshRadio();
