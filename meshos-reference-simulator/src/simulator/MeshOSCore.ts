import {
  MeshEnvelope,
  ModuleDescriptor,
  CapabilityAdvertisement,
  InteractionObject,
  ContextFact,
  NodeState,
  FaultEvent,
  FaultCode,
  LogEntry,
  PayloadType,
  Verb,
  PrivacyDomain,
  QoSClass
} from "../types/dmwe";
import { MeshRadio } from "./MeshRadio";
import { VirtualNode } from "./VirtualNodes";
import { NegotiationEngine } from "./NegotiationEngine";
import { FastPathEngine } from "./FastPathEngine";
import { MetaModel } from "./MetaModel";
import { GraphAlgebra, ComposeResult } from "./GraphAlgebra";
import { CompositionRule } from "../types/dmwe";

type AppIntentCallback = (interaction: InteractionObject) => void;

export class MeshOSCore {
  public nodes: Map<string, VirtualNode> = new Map();
  public capabilityRegistry: CapabilityAdvertisement[] = [];
  public contextFacts: Map<string, ContextFact> = new Map();
  public activePrimaryNodeId: string | null = null;
  public faultEvents: FaultEvent[] = [];
  public logs: LogEntry[] = [];
  public isCapabilityFused: boolean = false;
  public negotiationEngine: NegotiationEngine;
  public fastPathEngine: FastPathEngine;
  public metaModel: MetaModel;
  public graphAlgebra: GraphAlgebra;
  private moduleDidByNodeId: Map<string, string> = new Map();
  private capabilityDidByCapId: Map<string, string> = new Map();
  private contextFactDidByKey: Map<string, string> = new Map();
  private appSubscriptions: Map<Verb, Set<AppIntentCallback>> = new Map();

  constructor(public radio: MeshRadio) {
    this.negotiationEngine = new NegotiationEngine(this);
    this.fastPathEngine = new FastPathEngine(this);
    this.metaModel = new MetaModel();
    this.graphAlgebra = new GraphAlgebra(this.metaModel, msg => this.addLog("PROTOCOL", "GraphAlgebra", msg));
    // Listen to packet traffic on MeshRadio
    this.radio.subscribe("MESH_OS_PRIMARY", (envelope) => this.handlePacket(envelope));

    // Initialize Default Context Facts (Volume VII)
    this.setContextFact("user.posture", "SITTING", "SENSOR", "SYS_PRIMARY", 0.99);
    this.setContextFact("user.activity", "WORKSTATION_FOCUS", "USER_ACTIVITY", "SYS_PRIMARY", 0.95);
    this.setContextFact("environment.ambient_light_lux", 450, "ENVIRONMENT", "SYS_PRIMARY", 0.90);
    this.setContextFact("mesh.qos_status", "OPTIMAL", "DEVICE", "SYS_PRIMARY", 1.0);
  }

  public registerVirtualNode(node: VirtualNode) {
    this.nodes.set(node.descriptor.moduleId, node);

    // Seed Unified Meta-Model (Volume II Ch 4)
    const moduleEntity = this.metaModel.addEntity("MODULE", node.descriptor.name, {
      moduleId: node.descriptor.moduleId,
      deviceClass: node.descriptor.deviceClass,
      spatialPose: node.descriptor.spatialPose,
      isIbn: node.descriptor.isIbn
    });
    this.moduleDidByNodeId.set(node.descriptor.moduleId, moduleEntity.did);
    node.capabilities.forEach(cap => this.registerCapabilityInMetaModel(cap));
  }

  private registerCapabilityInMetaModel(cap: CapabilityAdvertisement) {
    const moduleDid = this.moduleDidByNodeId.get(cap.providerNodeId);
    if (!moduleDid) return;

    const capEntity = this.metaModel.addEntity("CAPABILITY", cap.name, {
      capabilityId: cap.capabilityId,
      latencyMs: cap.qoc.latencyMs,
      accuracyScore: cap.qoc.accuracyScore,
      energyCost: cap.qoc.energyCost,
      privacyClass: cap.qoc.privacyClass,
      isFused: !!cap.isFused
    });
    this.capabilityDidByCapId.set(cap.capabilityId, capEntity.did);
    this.metaModel.addRelationship(moduleDid, "REL_PROVIDES", capEntity.did);
  }

  private syncNodeProperties(nodeId: string) {
    const node = this.nodes.get(nodeId);
    const did = this.moduleDidByNodeId.get(nodeId);
    if (!node || !did) return;
    this.metaModel.setProperty(did, "battery", node.descriptor.batteryLevel);
    this.metaModel.setProperty(did, "isOnline", node.isOnline);
    this.metaModel.setProperty(did, "thermalCelsius", node.thermalCelsius);
    this.metaModel.setProperty(did, "cpuLoadPercent", node.cpuLoadPercent);
    this.metaModel.setProperty(did, "linkQualityPercent", node.linkQualityPercent);
  }

  public bootNode(moduleId: string) {
    const node = this.nodes.get(moduleId);
    if (node) {
      node.boot();
      this.syncNodeProperties(moduleId);
      this.metaModel.emitEvent("NODE_BOOTED", this.moduleDidByNodeId.get(moduleId) || "", { moduleId });
      this.addLog("INFO", "NodeManager", `Booted node ${node.descriptor.name} (${node.descriptor.moduleId})`);
    }
  }

  public dieNode(moduleId: string, reason: string = "Battery Critical") {
    const node = this.nodes.get(moduleId);
    if (node) {
      node.die(reason);
      this.syncNodeProperties(moduleId);
      this.metaModel.emitEvent("NODE_DROPPED", this.moduleDidByNodeId.get(moduleId) || "", { moduleId, reason });
      this.addLog("WARN", "HealthManager", `Node ${node.descriptor.name} powered down (${reason})`);
    }
  }

  public tickHealth() {
    this.nodes.forEach(node => {
      node.updateHealth();
      this.syncNodeProperties(node.descriptor.moduleId);
    });
  }

  // Volume IV, Ch 16 — Fault Injection Scenarios (canonical F-codes)
  public triggerF004ModuleDisconnect(nodeId: string) {
    const node = this.nodes.get(nodeId);
    if (node && node.isOnline) {
      node.die("Module Hot-Swap Disconnect");
      this.recordFault(
        FaultCode.F_004_MODULE_DISCONNECT,
        nodeId,
        `Module ${nodeId} hot-swap disconnected from mesh.`,
        "Capability Graph re-evaluated; graceful teardown"
      );
    }
  }

  public triggerF007MeshPartition() {
    const nodeIds = Array.from(this.nodes.keys());
    const midpoint = Math.floor(nodeIds.length / 2);
    for (let i = midpoint; i < nodeIds.length; i++) {
      const node = this.nodes.get(nodeIds[i]);
      if (node && node.isOnline) {
        node.die("Mesh Partition Event");
      }
    }
    this.recordFault(
      FaultCode.F_007_MESH_PARTITION,
      "MESH_OS",
      "Mesh partition detected. Half of nodes isolated.",
      "Each partition electing local Primary Node"
    );
  }

  public triggerF009CommCongestion() {
    this.radio.simulatedLatencyMs = 50;
    this.recordFault(
      FaultCode.F_009_COMM_CONGESTION,
      "MESH_OS",
      "Communication congestion detected. Latency increased to 50ms.",
      "Throttling background traffic"
    );
    setTimeout(() => {
      this.radio.simulatedLatencyMs = 4;
      this.addLog("INFO", "CommManager", "Congestion cleared. Normal latency restored.");
    }, 10000);
  }

  public triggerF022ContextPoisoning() {
    this.setContextFact(
      "user.posture",
      "LYING_DOWN",
      "SENSOR",
      "UNTRUSTED_SOURCE",
      0.99
    );
    this.recordFault(
      FaultCode.F_022_CONTEXT_POISONING,
      "CONTEXT_ENGINE",
      "Context Graph poisoning detected. Anomalous confidence score on posture fact.",
      "Quarantined suspicious fact; re-collected from trusted source"
    );
  }

  public triggerF023SchedulerDeadlock() {
    this.recordFault(
      FaultCode.F_023_SCHEDULER_DEADLOCK,
      "SCHEDULER",
      "Task queue depth increasing without completion. Deadlock detected.",
      "Force preempted lowest-priority task; released held resources"
    );
  }

  public triggerF026SchemaMismatch() {
    this.recordFault(
      FaultCode.F_026_SCHEMA_MISMATCH,
      "PROTOCOL_ENGINE",
      "Message deserialization failed. Schema version mismatch.",
      "Rejected message; requested re-advertisement with current schema"
    );
  }

  public handlePacket(envelope: MeshEnvelope) {
    this.addLog("PROTOCOL", "MeshRadio", `Rx Envelope [${envelope.payloadType}] from ${envelope.senderNodeId}`, envelope);

    switch (envelope.payloadType) {
      case PayloadType.DESCRIPTOR:
        this.processDescriptor(envelope.payload as ModuleDescriptor);
        break;

      case PayloadType.CAPABILITY_ADVERT:
        this.processCapabilityAdvert(envelope.payload as CapabilityAdvertisement);
        break;

      case PayloadType.INTERACTION_OBJ:
        this.processInteractionObject(envelope.payload as InteractionObject);
        break;

      case PayloadType.NODE_OFFLINE:
        this.processNodeOffline(envelope.senderNodeId, envelope.payload?.reason || "Disconnected");
        break;

      case PayloadType.CONTEXT_FACT:
        const fact = envelope.payload as ContextFact;
        this.setContextFact(fact.key, fact.value, fact.layer, fact.provenanceNode, fact.confidence);
        break;
    }
  }

  private processDescriptor(desc: ModuleDescriptor) {
    const node = this.nodes.get(desc.moduleId);
    if (node) {
      node.descriptor = desc;
      node.isOnline = true;
      this.syncNodeProperties(desc.moduleId);
    }
    this.recalculatePrimaryElection();
  }

  private processCapabilityAdvert(cap: CapabilityAdvertisement) {
    // Upsert capability
    const existingIndex = this.capabilityRegistry.findIndex(c => c.capabilityId === cap.capabilityId && c.providerNodeId === cap.providerNodeId);
    if (existingIndex >= 0) {
      this.capabilityRegistry[existingIndex] = cap;
    } else {
      this.capabilityRegistry.push(cap);
    }
    if (!this.capabilityDidByCapId.has(cap.capabilityId)) {
      this.registerCapabilityInMetaModel(cap);
    }
    this.addLog("SUCCESS", "CapabilityGraph", `Registered Capability '${cap.name}' (${cap.capabilityId})`);
    this.evaluateCapabilityFusion();
  }

  private processInteractionObject(interaction: InteractionObject) {
    this.addLog(
      "SUCCESS",
      "IntentEngine",
      `Received Intent [Verb: ${interaction.intent.verb} -> Target: ${interaction.intent.target}] (Confidence: ${(interaction.confidence * 100).toFixed(0)}%)`
    );

    // Fault check: low confidence
    if (interaction.confidence < 0.70) {
      this.recordFault(
        FaultCode.F_008_CAPABILITY_PROVIDER_FAILURE,
        interaction.origin.providerNodeId,
        `Intent confidence ${interaction.confidence} below threshold. Capability provider degraded. Requesting user clarification.`,
        "Fallback to secondary confirmation prompt"
      );
    }

    // Register declarative Intent entity in Unified Meta-Model (Execution Model Stage 1-2)
    const intentEntity = this.metaModel.addEntity("INTENT", `${interaction.intent.verb}->${interaction.intent.target}`, {
      verb: interaction.intent.verb,
      target: interaction.intent.target,
      confidence: interaction.confidence,
      sourceCapability: interaction.origin.capabilityId
    });
    this.metaModel.emitEvent("INTENT_STARTED", intentEntity.did, {
      verb: interaction.intent.verb,
      target: interaction.intent.target,
      confidence: interaction.confidence
    });
    this.metaModel.addRelationship(intentEntity.did, "REL_CONSUMES", this.capabilityDidByCapId.get(interaction.origin.capabilityId) || "");

    // Route to subscribers
    const callbacks = this.appSubscriptions.get(interaction.intent.verb);
    if (callbacks) {
      callbacks.forEach(cb => cb(interaction));
    }
    this.metaModel.emitEvent("INTENT_COMPLETED", intentEntity.did, {});
  }

  private processNodeOffline(nodeId: string, reason: string) {
    const node = this.nodes.get(nodeId);
    if (node) {
      node.isOnline = false;
    }
    this.syncNodeProperties(nodeId);
    this.metaModel.emitEvent("NODE_DROPPED", this.moduleDidByNodeId.get(nodeId) || "", { nodeId, reason });

    // Remove node's capabilities
    const removedCaps = this.capabilityRegistry.filter(c => c.providerNodeId === nodeId);
    this.capabilityRegistry = this.capabilityRegistry.filter(c => c.providerNodeId !== nodeId);

    this.recordFault(
      FaultCode.F_001_BATTERY_EXHAUSTION,
      nodeId,
      `Node ${nodeId} offline (${reason}). Removed ${removedCaps.length} capabilities.`,
      "Re-evaluated Capability Graph & Fallback Routing"
    );

    this.evaluateCapabilityFusion();
    this.recalculatePrimaryElection();
  }

  // Volume IV, Ch 4: Deterministic Primary Node Election Calculation
  public recalculatePrimaryElection() {
    let bestScore = -1;
    let bestNodeId: string | null = null;

    this.nodes.forEach(node => {
      if (!node.isOnline) return;
      const desc = node.descriptor;
      // Fitness Score = Battery * 0.25 + Compute/4000 * 0.25 + NPU(0.2) + IBN(0.3)
      const batteryPart = desc.batteryLevel * 0.25;
      const computePart = Math.min(1.0, desc.computeMips / 3000) * 0.25;
      const npuPart = desc.hasNpu ? 0.20 : 0.05;
      const ibnPart = desc.isIbn ? 0.30 : 0.10;
      const totalScore = parseFloat((batteryPart + computePart + npuPart + ibnPart).toFixed(3));

      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestNodeId = desc.moduleId;
      }
    });

    if (bestNodeId !== this.activePrimaryNodeId) {
      const prev = this.activePrimaryNodeId;
      this.activePrimaryNodeId = bestNodeId;
      if (bestNodeId) {
        const node = this.nodes.get(bestNodeId);
        this.addLog(
          "WARN",
          "ElectionEngine",
          `Primary Coordinator elected: ${node ? node.descriptor.name : bestNodeId} (Fitness Score: ${bestScore})`
        );
        if (prev) {
          this.recordFault(
            FaultCode.F_006_PRIMARY_NODE_LOSS,
            bestNodeId,
            `Primary Node failed over from ${prev} to ${bestNodeId}`,
            "Re-established primary sync & coordinator lock"
          );
        }
      }
    }
  }

  // Volume V, Ch 12: Capability Fusion Engine
  public evaluateCapabilityFusion() {
    const hasRing = this.capabilityRegistry.some(c => c.capabilityId === "interaction.pointer.precision");
    const hasGlasses = this.capabilityRegistry.some(c => c.capabilityId === "interaction.gaze.select");
    const hasTable = this.capabilityRegistry.some(c => c.capabilityId === "acoustic.vibration.touch");
    const hasWrist = this.capabilityRegistry.some(c => c.capabilityId === "emg.muscle.twitches");

    // Fused Spatial Pointer
    const fusedPointerId = "interaction.spatial_pointer.fused";
    const existingFusedIndex = this.capabilityRegistry.findIndex(c => c.capabilityId === fusedPointerId);

    if (hasRing && hasGlasses) {
      if (!this.isCapabilityFused) {
        this.isCapabilityFused = true;
        const fusedCap: CapabilityAdvertisement = {
          capabilityId: fusedPointerId,
          name: "Fused Gaze-Pointer Vector",
          version: "3.0.0-FUSED",
          providerNodeId: "FUSED_MESH_GRAPH",
          isFused: true,
          fusedFromNodes: ["DMWE-RNG-9942", "DMWE-GLS-1123"],
          qoc: {
            latencyMs: 4,
            accuracyScore: 0.99,
            energyCost: "MEDIUM",
            privacyClass: PrivacyDomain.PERSONAL
          }
        };
        if (existingFusedIndex >= 0) {
          this.capabilityRegistry[existingFusedIndex] = fusedCap;
        } else {
          this.capabilityRegistry.push(fusedCap);
        }

        // Volume XI Ch 21: re-route fusion through Graph Algebra Compose(⊕)
        const ringDid = this.moduleDidByNodeId.get("DMWE-RNG-9942");
        const glassesDid = this.moduleDidByNodeId.get("DMWE-GLS-1123");
        const ringCapDid = this.capabilityDidByCapId.get("interaction.pointer.precision");
        const glassesCapDid = this.capabilityDidByCapId.get("interaction.gaze.select");
        const composeResult: ComposeResult | null = this.graphAlgebra.compose(
          [ringCapDid || "", glassesCapDid || ""].filter(Boolean),
          fusedPointerId,
          CompositionRule.COMPOSE_FUSION
        );
        if (composeResult) {
          this.metaModel.emitEvent("FUSION_ACTIVE", composeResult.output.did, {
            composite: fusedPointerId,
            latencyMs: composeResult.latencyMs
          });
        }
        // Register fused capability entity in meta-model
        if (ringDid && glassesDid && ringCapDid && glassesCapDid) {
          this.metaModel.emitEvent("FUSION_ACTIVE", glassesDid, {
            composite: fusedPointerId,
            inputs: [ringDid, glassesDid].join(",")
          });
        }
        this.addLog("SUCCESS", "FusionEngine", "CREATED Fused Capability: 'Fused Gaze-Pointer Vector' (Ring + Glasses)");
      }
    } else if (this.isCapabilityFused) {
      this.isCapabilityFused = false;
      this.capabilityRegistry = this.capabilityRegistry.filter(c => c.capabilityId !== fusedPointerId);
      this.recordFault(
        FaultCode.F_008_CAPABILITY_PROVIDER_FAILURE,
        "MESH_OS",
        "Spatial Pointer Fusion broken due to node disconnect. Falling back to discrete capability.",
        "Automatic fallback to remaining active single capability"
      );
      this.addLog("WARN", "FusionEngine", "DEGRADED Fusion: Removed 'Fused Gaze-Pointer Vector'. Fallback active.");
    }

    // Fused Surface Typing
    const fusedTypingId = "interaction.surface_typing.fused";
    const existingTypingIndex = this.capabilityRegistry.findIndex(c => c.capabilityId === fusedTypingId);
    if (hasTable && hasWrist) {
      if (existingTypingIndex < 0) {
        this.capabilityRegistry.push({
          capabilityId: fusedTypingId,
          name: "Fused Acoustic-EMG Surface Keyboard",
          version: "2.5.0-FUSED",
          providerNodeId: "FUSED_MESH_GRAPH",
          isFused: true,
          fusedFromNodes: ["IBN-TBL-5590", "DMWE-WST-3301"],
          qoc: {
            latencyMs: 5,
            accuracyScore: 0.98,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PUBLIC
          }
        });
        this.addLog("SUCCESS", "FusionEngine", "CREATED Fused Capability: 'Fused Acoustic-EMG Surface Keyboard' (Table IBN + Wristband)");
      }
    } else if (existingTypingIndex >= 0) {
      this.capabilityRegistry = this.capabilityRegistry.filter(c => c.capabilityId !== fusedTypingId);
    }
  }

  // Application SDK Subscription Interface (Volume IX)
  public subscribeToIntent(verb: Verb, callback: AppIntentCallback) {
    if (!this.appSubscriptions.has(verb)) {
      this.appSubscriptions.set(verb, new Set());
    }
    this.appSubscriptions.get(verb)!.add(callback);
  }

  public unsubscribeIntent(verb: Verb, callback: AppIntentCallback) {
    const callbacks = this.appSubscriptions.get(verb);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  public setContextFact(
    key: string,
    value: string | number | boolean,
    layer: ContextFact["layer"],
    provenanceNode: string,
    confidence: number = 0.95
  ) {
    const fact: ContextFact = {
      factId: `fact-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      layer,
      key,
      value,
      confidence,
      updatedAtMs: Date.now(),
      provenanceNode
    };
    this.contextFacts.set(key, fact);

    // Sync into Unified Meta-Model (Context View projection)
    const ctxDid = this.contextFactDidByKey.get(key);
    if (ctxDid) {
      this.metaModel.setProperty(ctxDid, "value", fact.value);
      this.metaModel.setProperty(ctxDid, "confidence", fact.confidence);
      this.metaModel.emitEvent("CONTEXT_CHANGED", ctxDid, { key, value: fact.value });
    } else {
      const ctxEntity = this.metaModel.addEntity("CONTEXT", key, {
        value: fact.value,
        confidence: fact.confidence,
        layer: fact.layer
      });
      this.contextFactDidByKey.set(key, ctxEntity.did);
      this.metaModel.emitEvent("CONTEXT_CHANGED", ctxEntity.did, { key, value: fact.value });
    }
    this.addLog("INFO", "ContextEngine", `Context Fact Updated: [${key} = ${value}]`);
  }

  public recordFault(code: FaultCode, nodeId: string, description: string, resolutionAction?: string) {
    const event: FaultEvent = {
      id: `fault-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestampMs: Date.now(),
      code,
      nodeId,
      description,
      resolved: !!resolutionAction,
      resolutionAction
    };
    this.faultEvents.unshift(event);
    if (this.faultEvents.length > 50) this.faultEvents.pop();
    this.addLog("ERROR", "FaultManager", `FAULT ALERT [${code}] on ${nodeId}: ${description}`);

    // Emit as an immutable Meta-Model event (GL Review Part I §1.2.4)
    const entityDid = this.moduleDidByNodeId.get(nodeId);
    this.metaModel.emitEvent("FAULT_ALERT", entityDid || "", { code, description, resolved: event.resolved });

    // Volume VIII §14.12: Broadcast FAULT_ALERT notification to mesh
    this.radio.broadcast({
      messageId: `fault-alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestampMs: Date.now(),
      senderNodeId: nodeId,
      qosClass: QoSClass.QOS_BACKGROUND,
      payloadType: PayloadType.FAULT_ALERT,
      payload: event
    });
  }

  public addLog(level: LogEntry["level"], source: string, message: string, envelope?: MeshEnvelope) {
    const entry: LogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestampMs: Date.now(),
      level,
      source,
      message,
      envelope
    };
    this.logs.unshift(entry);
    if (this.logs.length > 300) this.logs.pop();
  }

  public getNodeStates(): NodeState[] {
    const states: NodeState[] = [];
    this.nodes.forEach(node => {
      const desc = node.descriptor;
      const caps = this.capabilityRegistry.filter(c => c.providerNodeId === desc.moduleId);
      
      // Calculate score
      const batteryPart = desc.batteryLevel * 0.25;
      const computePart = Math.min(1.0, desc.computeMips / 3000) * 0.25;
      const npuPart = desc.hasNpu ? 0.20 : 0.05;
      const ibnPart = desc.isIbn ? 0.30 : 0.10;
      const fitnessScore = parseFloat((batteryPart + computePart + npuPart + ibnPart).toFixed(3));

      states.push({
        descriptor: { ...desc },
        capabilities: caps,
        isOnline: node.isOnline,
        isPrimaryCoordinator: desc.moduleId === this.activePrimaryNodeId,
        fitnessScore,
        signalStrengthDbm: node.isOnline ? -52 : -99,
        thermalCelsius: node.thermalCelsius,
        memoryUsagePercent: node.memoryUsagePercent,
        cpuLoadPercent: node.cpuLoadPercent,
        linkQualityPercent: node.linkQualityPercent
      });
    });
    return states;
  }
}
