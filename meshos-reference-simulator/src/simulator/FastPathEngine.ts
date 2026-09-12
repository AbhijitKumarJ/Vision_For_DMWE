import { MeshOSCore } from "./MeshOSCore";
import {
  DirectStreamRequest,
  DirectStreamGrant,
  FastPathStream,
  FaultCode
} from "../types/dmwe";

export class FastPathEngine {
  private activeGrants: Map<string, DirectStreamGrant> = new Map();
  private streamIntervals: Map<string, ReturnType<typeof setInterval>> = new Map();
  public streamCount: number = 0;

  constructor(private core: MeshOSCore) {}

  public requestBinding(
    consumerNodeId: string,
    capabilityId: string,
    targetHz: number,
    maxLatencyUs: number
  ): DirectStreamGrant | null {
    const provider = this.core.capabilityRegistry.find(
      c => c.capabilityId === capabilityId
    );

    if (!provider) {
      this.core.recordFault(
        FaultCode.F_018_FAST_PATH_TOKEN_REVOCATION,
        consumerNodeId,
        `Fast-Path denied: no provider for ${capabilityId}`,
        "Reverting to semantic path"
      );
      return null;
    }

    const providerLatencyUs = provider.qoc.latencyMs * 1000;
    if (providerLatencyUs > maxLatencyUs) {
      this.core.recordFault(
        FaultCode.F_018_FAST_PATH_TOKEN_REVOCATION,
        consumerNodeId,
        `Fast-Path denied: provider latency ${providerLatencyUs}μs exceeds max ${maxLatencyUs}μs`,
        "Reverting to semantic path"
      );
      return null;
    }

    const grant: DirectStreamGrant = {
      grantId: `fp-grant-${Date.now()}`,
      streamToken: Math.floor(Math.random() * 65535),
      providerNodeId: provider.providerNodeId,
      grantedHz: targetHz,
      validUntilMs: Date.now() + 30000
    };

    this.activeGrants.set(grant.grantId, grant);
    this.core.addLog("SUCCESS", "FastPathEngine", `GRANT issued: token=${grant.streamToken}, provider=${grant.providerNodeId}, hz=${grant.grantedHz}`);

    this.startStream(grant);

    return grant;
  }

  private startStream(grant: DirectStreamGrant) {
    const intervalMs = Math.max(1, Math.round(1000 / grant.grantedHz));
    const interval = setInterval(() => {
      const stream: FastPathStream = {
        streamToken: grant.streamToken,
        timestampUs: Date.now() * 1000,
        quaternionWxyz: [
          1.0 + (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ],
        accelXyz: [
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          9.8 + (Math.random() - 0.5) * 0.05
        ]
      };
      this.streamCount++;
      this.core.addLog("PROTOCOL", "FastPathStream", `Stream packet: token=${stream.streamToken}, t=${stream.timestampUs}μs`);
    }, intervalMs);

    this.streamIntervals.set(grant.grantId, interval);
  }

  public revokeBinding(grantId: string) {
    const interval = this.streamIntervals.get(grantId);
    if (interval) {
      clearInterval(interval);
      this.streamIntervals.delete(grantId);
    }
    this.activeGrants.delete(grantId);
    this.core.addLog("INFO", "FastPathEngine", `Grant ${grantId} revoked`);
  }

  public getActiveGrants(): DirectStreamGrant[] {
    return Array.from(this.activeGrants.values());
  }
}
