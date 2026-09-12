import { MeshOSCore } from "./MeshOSCore";
import { Verb, Target, Modifier, PrivacyDomain, CompositionRule, CompareOp } from "../types/dmwe";
import { REFERENCE_APPS } from "./ReferenceApps";

export interface CLIOutputLine {
  id: string;
  type: "input" | "output" | "error" | "success" | "system";
  text: string;
}

export class CLIEngine {
  constructor(private core: MeshOSCore) {}

  public async executeCommand(commandStr: string): Promise<CLIOutputLine[]> {
    const trimmed = commandStr.trim();
    if (!trimmed) return [];

    const args = trimmed.split(/\s+/);
    const cmd = args[0].toLowerCase();

    const output: CLIOutputLine[] = [];
    const addOut = (text: string, type: CLIOutputLine["type"] = "output") => {
      output.push({
        id: `cli-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type,
        text
      });
    };

    addOut(`dmwe> ${trimmed}`, "input");

    switch (cmd) {
      case "help":
        addOut("=== DMWE MeshOS CLI Sandbox Commands ===", "system");
        addOut("  nodes                       List all hardware nodes & election scores");
        addOut("  boot <nodeId|all>           Power on node or all nodes");
        addOut("  kill <nodeId|all>           Power off node (simulate battery crash F-001)");
        addOut("  caps                        Inspect Capability Graph & Fusion state");
        addOut("  facts                       Inspect Context Graph & Human Digital Twin state");
        addOut("  gesture <nodeId> <action>   Trigger gesture (pinch, blink, subvocal, twitch, tap)");
        addOut("  negotiate <capId>           Run capability negotiation protocol (Volume VIII §7.7)");
        addOut("  fastpath <capId>            Establish fast-path low-latency binding (Volume XI Ch 13)");
        addOut("  health                      Show node health telemetry (thermal, mem, cpu, link)");
        addOut("  fault <code>                Trigger fault: F-004, F-007, F-009, F-022, F-023, F-026");
        addOut("  election                    Trigger Primary Coordinator election recalculation");
        addOut("  faults                      Show Fault Tolerance log matrix");
        addOut("  logs                        Show system packet & event log stream");
        addOut("  app <appId>                 Execute reference app scenario");
        addOut("  ai <prompt>                 Parse natural language prompt via Gemini AI");
        addOut("  clear                       Clear CLI terminal screen");
        break;

      case "nodes":
        addOut("--- Registered Hardware Nodes & Election Fitness ---", "system");
        this.core.getNodeStates().forEach(n => {
          const status = n.isOnline ? "🟢 ONLINE" : "🔴 OFFLINE";
          const primaryTag = n.isPrimaryCoordinator ? " [PRIMARY COORDINATOR]" : "";
          const batt = `${(n.descriptor.batteryLevel * 100).toFixed(0)}%`;
          addOut(
            `• [${n.descriptor.moduleId}] ${n.descriptor.name} - ${status}${primaryTag} | Batt: ${batt} | Score: ${n.fitnessScore} | Pose: ${n.descriptor.spatialPose}`
          );
        });
        break;

      case "boot":
        const bootTarget = args[1];
        if (!bootTarget) {
          addOut("Usage: boot <nodeId|all>", "error");
        } else if (bootTarget === "all") {
          this.core.nodes.forEach(node => this.core.bootNode(node.descriptor.moduleId));
          addOut("Booted all hardware nodes into mesh.", "success");
        } else {
          this.core.bootNode(bootTarget);
          addOut(`Boot sequence initiated for ${bootTarget}.`, "success");
        }
        break;

      case "kill":
        const killTarget = args[1];
        if (!killTarget) {
          addOut("Usage: kill <nodeId|all>", "error");
        } else if (killTarget === "all") {
          this.core.nodes.forEach(node => this.core.dieNode(node.descriptor.moduleId, "Manual CLI Kill All"));
          addOut("Killed all hardware nodes.", "error");
        } else {
          this.core.dieNode(killTarget, "CLI Fault Trigger F-001");
          addOut(`Simulated battery crash F-001 on ${killTarget}.`, "error");
        }
        break;

      case "caps":
        addOut("--- Capability Graph Registry (Volume V) ---", "system");
        this.core.capabilityRegistry.forEach(c => {
          const fusedTag = c.isFused ? " 🌀 [FUSED]" : "";
          addOut(`• [${c.capabilityId}] ${c.name}${fusedTag} | Provider: ${c.providerNodeId} | Latency: ${c.qoc.latencyMs}ms | Acc: ${(c.qoc.accuracyScore * 100).toFixed(0)}%`);
        });
        break;

      case "facts":
        addOut("--- Context Graph & Human Digital Twin (Volume VII) ---", "system");
        this.core.contextFacts.forEach((fact, key) => {
          addOut(`• ${key} = ${fact.value} (Layer: ${fact.layer}, Confidence: ${(fact.confidence * 100).toFixed(0)}%)`);
        });
        break;

      case "election":
        this.core.recalculatePrimaryElection();
        addOut(`Primary election completed. Active Primary: ${this.core.activePrimaryNodeId || "None"}`, "success");
        break;

      case "faults":
        addOut("--- Fault Tolerance Matrix Log (Volume IV, Ch 16) ---", "system");
        if (this.core.faultEvents.length === 0) {
          addOut("No fault events recorded yet.", "output");
        } else {
          this.core.faultEvents.forEach(f => {
            addOut(`• [${f.code}] ${f.nodeId}: ${f.description} (Resolution: ${f.resolutionAction || "Pending"})`, "error");
          });
        }
        break;

      case "logs":
        addOut("--- Recent Packet & OS Event Logs ---", "system");
        this.core.logs.slice(0, 15).forEach(l => {
          const time = new Date(l.timestampMs).toLocaleTimeString();
          addOut(`[${time}] [${l.level}] [${l.source}] ${l.message}`);
        });
        break;

      case "gesture":
        const nodeArg = args[1];
        const actionArg = args[2]?.toLowerCase();
        if (!nodeArg || !actionArg) {
          addOut("Usage: gesture <nodeId> <pinch|blink|subvocal|twitch|tap>", "error");
          break;
        }
        const node = this.core.nodes.get(nodeArg);
        if (!node) {
          addOut(`Node ${nodeArg} not found.`, "error");
          break;
        }
        if (!node.isOnline) {
          addOut(`Node ${nodeArg} is OFFLINE. Boot it first.`, "error");
          break;
        }

        if (actionArg === "pinch") {
          node.triggerAction(Verb.SELECT, Target.IOT_DEVICE, [Modifier.PRECISE], "Air Pinch");
          addOut(`Triggered Air Pinch on ${node.descriptor.name}.`, "success");
        } else if (actionArg === "blink") {
          node.triggerAction(Verb.SELECT, Target.IOT_DEVICE, [Modifier.PRECISE], "Prolonged Blink");
          addOut(`Triggered Prolonged Blink on ${node.descriptor.name}.`, "success");
        } else if (actionArg === "subvocal") {
          node.triggerAction(Verb.AUTHENTICATE, Target.WORKSPACE, [Modifier.SILENT], "Subvocal Speech", { textValue: "Mute presentation call" });
          addOut(`Triggered Subvocal Speech on ${node.descriptor.name}.`, "success");
        } else if (actionArg === "twitch") {
          node.triggerAction(Verb.AUTHENTICATE, Target.WORKSPACE, [Modifier.PRECISE], "Neuromuscular Flex");
          addOut(`Triggered Neuromuscular Flex on ${node.descriptor.name}.`, "success");
        } else if (actionArg === "tap") {
          node.triggerAction(Verb.SELECT, Target.CURRENT_OBJECT, [Modifier.PRECISE], "Acoustic Surface Tap");
          addOut(`Triggered Acoustic Surface Tap on ${node.descriptor.name}.`, "success");
        } else {
          addOut(`Unknown gesture '${actionArg}'. Supported: pinch, blink, subvocal, twitch, tap`, "error");
        }
        break;

      case "negotiate":
        const capIdArg = args[1];
        if (!capIdArg) {
          addOut("Usage: negotiate <capabilityId>", "error");
        } else {
          const session = this.core.negotiationEngine.initiateNegotiation(
            "DMWE-RNG-9942",
            capIdArg,
            { maxLatencyMs: 20, minAccuracy: 0.9, minAvailability: 0.95, maxEnergyCost: "LOW", maxPrivacyClass: PrivacyDomain.PERSONAL }
          );
          if (session) {
            addOut(`Negotiation initiated: ${session.sessionId}`, "success");
            addOut(`  Provider: ${session.providerNodeId}`);
            addOut(`  Capability: ${session.capabilityId}`);
            addOut(`  State: ${session.state}`);
          } else {
            addOut("No provider found for capability (or QoC requirement unmet).", "error");
          }
        }
        break;

      case "fastpath":
        const fpCapId = args[1];
        if (!fpCapId) {
          addOut("Usage: fastpath <capabilityId>", "error");
        } else {
          const grant = this.core.fastPathEngine.requestBinding(
            "DMWE-RNG-9942",
            fpCapId,
            1000,
            8000
          );
          if (grant) {
            addOut("Fast-Path binding established:", "success");
            addOut(`  Grant ID: ${grant.grantId}`);
            addOut(`  Stream Token: ${grant.streamToken}`);
            addOut(`  Provider: ${grant.providerNodeId}`);
            addOut(`  Granted Hz: ${grant.grantedHz}`);
          } else {
            addOut("Fast-Path binding denied. Check provider availability & latency budget.", "error");
          }
        }
        break;

      case "health":
        addOut("--- Node Health Telemetry ---", "system");
        this.core.getNodeStates().forEach(n => {
          const status = n.isOnline ? "🟢" : "🔴";
          addOut(`${status} [${n.descriptor.moduleId}] ${n.descriptor.name} | Thermal: ${n.thermalCelsius.toFixed(1)}°C | Mem: ${n.memoryUsagePercent}% | CPU: ${n.cpuLoadPercent}% | Link: ${n.linkQualityPercent}%`);
        });
        break;

      case "umm":
        addOut("--- Unified Meta-Model (Volume II Ch 4) ---", "system");
        const entityTypes = Array.from(this.core.metaModel.entities.values())
          .reduce<Record<string, number>>((acc, e) => {
            acc[e.entityType] = (acc[e.entityType] || 0) + 1;
            return acc;
          }, {});
        Object.entries(entityTypes).forEach(([type, count]) => {
          addOut(`  Entities [${type}]: ${count}`);
        });
        addOut(`  Relationships: ${this.core.metaModel.relationships.length}`);
        addOut(`  Constraints: ${this.core.metaModel.constraints.length}`);
        addOut(`  Events (temporal chain): ${this.core.metaModel.events.length}`);
        addOut("  --- Recent Meta-Model Events ---");
        this.core.metaModel.events.slice(0, 8).forEach(evt => {
          addOut(`  • [${evt.eventType}] ${evt.entityDid} ${new Date(evt.timestampMs).toLocaleTimeString()}`);
        });
        break;

      case "graph":
        const viewName = (args[1] || "CAPABILITY").toUpperCase();
        addOut(`--- Graph Algebra Projection (π) — ${viewName} View ---`, "system");
        const view = this.core.graphAlgebra.project(viewName);
        view.entities.forEach(e => {
          addOut(`  • [${e.entityType}] ${e.did} ${e.name}`);
        });
        if (view.entities.length === 0) {
          addOut("  (empty view)", "output");
        }
        break;

      case "algebra":
        const opArg = args[1]?.toLowerCase();
        if (!opArg) {
          addOut("Usage: algebra <compose|verify|aggregate|substitute>", "error");
          break;
        }
        if (opArg === "compose") {
          const ringCap = this.core.metaModel.allOfType("CAPABILITY")[0]?.did;
          const glassesCap = this.core.metaModel.allOfType("CAPABILITY")[1]?.did;
          if (ringCap && glassesCap) {
            const result = this.core.graphAlgebra.compose(
              [ringCap, glassesCap],
              "Fused Spatial Pointer (CLI)",
              CompositionRule.COMPOSE_FUSION
            );
            if (result) {
              addOut(`Compose(⊕) executed:`, "success");
              addOut(`  Output DID: ${result.output.did}`);
              addOut(`  Latency: ${result.latencyMs}ms | Accuracy: ${result.accuracyScore} | Power: ${result.powerCost}`);
            }
          } else {
            addOut("Not enough capabilities registered to compose.", "error");
          }
        } else if (opArg === "verify") {
          // Formal verification: prove battery constraint before scheduling
          const nodeDid = this.core.metaModel.allOfType("MODULE")[0]?.did;
          if (nodeDid) {
            const battery = this.core.metaModel.getProperty(nodeDid, "battery") as number;
            const ok = this.core.graphAlgebra.verify(nodeDid, "battery", CompareOp.CMP_GREATER_THAN, 0.15);
            addOut(`Formal Verification (GL Part V): battery=${(battery * 100).toFixed(0)}%`, "system");
            addOut(`  Constraint: Battery > 15% => ${ok ? "SATISFIED ✓" : "VIOLATED ✗"}`, ok ? "success" : "error");
            if (!ok) {
              addOut("  → Task would be rejected before execution (energy deadlock prevention).");
            }
          }
        } else if (opArg === "aggregate") {
          const batteryDids = this.core.metaModel.allOfType("MODULE")
            .map(m => m.did)
            .slice(0, 5);
          const agg = this.core.graphAlgebra.aggregate(batteryDids, "battery");
          addOut(`Aggregate(Σ) Battery Pool:`, "success");
          addOut(`  Pool DID: ${agg.poolDid}`);
          addOut(`  Members: ${agg.members} | Total: ${agg.total.toFixed(2)}`);
        } else {
          addOut("Unknown algebra op. Supported: compose, verify, aggregate", "error");
        }
        break;

      case "fault":
        const faultCode = args[1]?.toUpperCase();
        switch (faultCode) {
          case "F-004":
            this.core.triggerF004ModuleDisconnect("DMWE-RNG-9942");
            addOut("Triggered Module Disconnect F-004 on Smart Ring.", "error");
            break;
          case "F-007":
            this.core.triggerF007MeshPartition();
            addOut("Triggered Mesh Partition F-007.", "error");
            break;
          case "F-009":
            this.core.triggerF009CommCongestion();
            addOut("Triggered Comm Congestion F-009.", "error");
            break;
          case "F-022":
            this.core.triggerF022ContextPoisoning();
            addOut("Triggered Context Poisoning F-022.", "error");
            break;
          case "F-023":
            this.core.triggerF023SchedulerDeadlock();
            addOut("Triggered Scheduler Deadlock F-023.", "error");
            break;
          case "F-026":
            this.core.triggerF026SchemaMismatch();
            addOut("Triggered Schema Mismatch F-026.", "error");
            break;
          default:
            addOut("Unknown fault code. Supported: F-004, F-007, F-009, F-022, F-023, F-026", "error");
        }
        break;

      case "app":
        const appIdArg = args[1];
        const app = REFERENCE_APPS.find(a => a.id === appIdArg || a.id.includes(appIdArg));
        if (!app) {
          addOut(`App '${appIdArg}' not found. Available: ${REFERENCE_APPS.map(a => a.id).join(", ")}`, "error");
        } else {
          addOut(`Running Reference App Scenario: ${app.name}...`, "success");
          // Trigger corresponding simulation action
          const ringNode = Array.from(this.core.nodes.values()).find(n => n.descriptor.moduleId === "DMWE-RNG-9942");
          if (ringNode && ringNode.isOnline) {
            ringNode.triggerAction(Verb.SELECT, Target.IOT_DEVICE, [Modifier.PRECISE], `App Execution: ${app.name}`);
          } else {
            addOut("Note: Boot 'DMWE-RNG-9942' (Ring) to see full intent pipeline execution.", "error");
          }
        }
        break;

      case "ai":
        const promptStr = args.slice(1).join(" ");
        if (!promptStr) {
          addOut("Usage: ai <natural language prompt>", "error");
          break;
        }
        addOut(`Querying Gemini AI Intent Parser for: "${promptStr}"...`, "system");
        try {
          const res = await fetch("/api/ai/parse-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptStr })
          });
          const data = await res.json();
          if (data.error) {
            addOut(`AI Error: ${data.error}`, "error");
          } else {
            addOut(`AI Parsed DMWE Intent Packet:`, "success");
            addOut(`  • Verb: ${data.verb}`);
            addOut(`  • Target: ${data.target}`);
            addOut(`  • Modifiers: ${JSON.stringify(data.modifiers)}`);
            addOut(`  • Confidence: ${(data.confidence * 100).toFixed(0)}%`);
            addOut(`  • Suggested Capability: ${data.suggestedCapability}`);
            addOut(`  • Explanation: ${data.explanation}`);
          }
        } catch (e: any) {
          addOut(`Failed to parse with AI: ${e.message}`, "error");
        }
        break;

      case "clear":
        return [];

      default:
        addOut(`Unknown command: '${cmd}'. Type 'help' for command list.`, "error");
        break;
    }

    return output;
  }
}
