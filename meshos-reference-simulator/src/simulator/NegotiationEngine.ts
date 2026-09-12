import { MeshOSCore } from "./MeshOSCore";
import {
  NegotiationSession,
  NegotiationState,
  QoCRequirement,
  FaultCode,
  CapabilityAdvertisement
} from "../types/dmwe";

export class NegotiationEngine {
  private sessions: Map<string, NegotiationSession> = new Map();

  constructor(private core: MeshOSCore) {}

  public initiateNegotiation(
    consumerNodeId: string,
    capabilityId: string,
    requiredQoc: QoCRequirement,
    timeoutMs: number = 5000
  ): NegotiationSession | null {
    const providers = this.core.capabilityRegistry.filter(
      c => c.capabilityId === capabilityId
    );

    if (providers.length === 0) {
      this.core.recordFault(
        FaultCode.F_021_CAPABILITY_NEGOTIATION_FAILED,
        consumerNodeId,
        `No provider found for capability ${capabilityId}`,
        "Negotiation failed: no providers available"
      );
      return null;
    }

    // Select best provider by QoC score
    const bestProvider = providers
      .slice()
      .sort((a, b) => {
        const scoreA = a.qoc.accuracyScore * 0.4 + (1 - a.qoc.latencyMs / 100) * 0.3 + (a.qoc.energyCost === "LOW" ? 0.3 : 0.1);
        const scoreB = b.qoc.accuracyScore * 0.4 + (1 - b.qoc.latencyMs / 100) * 0.3 + (b.qoc.energyCost === "LOW" ? 0.3 : 0.1);
        return scoreB - scoreA;
      })[0];

    // Check QoC requirement feasibility (Volume VIII §7.7)
    if (bestProvider.qoc.latencyMs > requiredQoc.maxLatencyMs) {
      this.core.recordFault(
        FaultCode.F_021_CAPABILITY_NEGOTIATION_FAILED,
        consumerNodeId,
        `Negotiation failed: provider latency ${bestProvider.qoc.latencyMs}ms exceeds requirement ${requiredQoc.maxLatencyMs}ms`,
        "Requested re-advertisement from alternate provider"
      );
      return null;
    }

    const session: NegotiationSession = {
      sessionId: `nego-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      capabilityId,
      consumerNodeId,
      providerNodeId: bestProvider.providerNodeId,
      state: NegotiationState.REQUESTING,
      sequence: 1,
      timeoutMs,
      createdAtMs: Date.now()
    };

    this.sessions.set(session.sessionId, session);
    this.core.addLog("PROTOCOL", "NegotiationEngine", `REQUEST sent: ${capabilityId} from ${consumerNodeId} to ${bestProvider.providerNodeId}`);

    // Simulate provider response after 100ms
    setTimeout(() => this.processOffer(session, bestProvider), 100);

    return session;
  }

  private processOffer(session: NegotiationSession, provider: CapabilityAdvertisement) {
    session.state = NegotiationState.OFFERING;
    session.sequence = 2;
    this.core.addLog("PROTOCOL", "NegotiationEngine", `OFFER received: ${provider.capabilityId} v${provider.version} from ${provider.providerNodeId}`);

    setTimeout(() => this.processAccept(session), 50);
  }

  private processAccept(session: NegotiationSession) {
    session.state = NegotiationState.ACCEPTING;
    session.sequence = 3;
    this.core.addLog("PROTOCOL", "NegotiationEngine", `ACCEPT sent for ${session.capabilityId}`);

    setTimeout(() => this.processAck(session), 50);
  }

  private processAck(session: NegotiationSession) {
    session.state = NegotiationState.BOUND;
    session.sequence = 4;
    this.core.addLog("SUCCESS", "NegotiationEngine", `BOUND: ${session.capabilityId} negotiated successfully (${session.providerNodeId})`);
  }

  public releaseNegotiation(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.state = NegotiationState.RELEASING;
      this.core.addLog("PROTOCOL", "NegotiationEngine", `RELEASE sent for ${session.capabilityId}`);
      setTimeout(() => {
        session.state = NegotiationState.IDLE;
        this.sessions.delete(sessionId);
        this.core.addLog("INFO", "NegotiationEngine", `Session ${sessionId} closed`);
      }, 50);
    }
  }

  public getActiveSessions(): NegotiationSession[] {
    return Array.from(this.sessions.values()).filter(
      s => s.state !== NegotiationState.IDLE
    );
  }
}
