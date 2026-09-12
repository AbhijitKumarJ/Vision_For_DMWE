import { MetaModel } from "./MetaModel";
import {
  MetaEntity,
  MetaRelationship,
  EntityType,
  RelationshipType,
  CompositionRule,
  CompareOp,
  createCanonicalDid
} from "../types/dmwe";

export interface ComposeResult {
  output: MetaEntity;
  latencyMs: number;
  accuracyScore: number;
  powerCost: string;
  rule: CompositionRule;
}

export interface SubstituteResult {
  substituted: MetaRelationship | null;
  degradedTo2D: boolean;
}

export interface AggregateResult {
  poolDid: string;
  total: number;
  members: number;
}

export type AlgebraLogFn = (message: string) => void;

// CPT Review §2 / GL Review Part III / Vol XI Ch 21
// 12 primitive operators with declared algebraic properties.
export class GraphAlgebra {
  constructor(private meta: MetaModel, private log: AlgebraLogFn = () => {}) {}

  // 1. ⊕ COMPOSE — combine entities preserving identities; derives fused QoC.
  public compose(
    inputDids: string[],
    outputName: string,
    rule: CompositionRule = CompositionRule.COMPOSE_FUSION
  ): ComposeResult | null {
    const inputs = inputDids
      .map(did => this.meta.getEntity(did))
      .filter((e): e is MetaEntity => !!e);
    if (inputs.length < 2) {
      this.log(`Compose aborted: fewer than 2 valid inputs (${inputDids.join(", ")})`);
      return null;
    }

    const output: MetaEntity = {
      did: createCanonicalDid("CAP", this.meta.allOfType("CAPABILITY").length + 1000),
      entityType: "CAPABILITY",
      name: outputName,
      properties: { isFused: true, rule }
    };

    // QoC derivation: Latency = max(inputs) + overhead; Power = sum; Accuracy = avg
    const latencies = inputs.map(e => (e.properties.latencyMs as number) || 0);
    const accuracies = inputs.map(e => (e.properties.accuracyScore as number) || 0);
    const fusionOverhead = rule === CompositionRule.COMPOSE_SEQUENCE ? 6 : 2;
    const latencyMs = Math.max(...latencies) + fusionOverhead;
    const accuracyScore = accuracies.reduce((a, b) => a + b, 0) / Math.max(1, accuracies.length);
    const powerCost = inputs.reduce(
      (sum, e) => sum + (e.properties.energyCost === "HIGH" ? 2 : e.properties.energyCost === "MEDIUM" ? 1 : 0),
      0
    ) >= 2 ? "MEDIUM" : "LOW";

    output.properties.latencyMs = latencyMs;
    output.properties.accuracyScore = Math.min(1, parseFloat(accuracyScore.toFixed(3)));
    output.properties.energyCost = powerCost;

    this.meta.entities.set(output.did, output);
    inputs.forEach(input => {
      this.meta.addRelationship(input.did, "REL_PART_OF", output.did);
    });
    this.meta.emitEvent("CAPABILITY_COMPOSED", output.did, {
      rule,
      inputs: inputs.map(i => i.did).join(","),
      latencyMs
    });
    this.log(`Compose(⊕) ${inputs.map(i => i.name).join(" + ")} -> ${outputName} [${rule}] latency=${latencyMs}ms acc=${output.properties.accuracyScore}`);

    return { output, latencyMs, accuracyScore: output.properties.accuracyScore as number, powerCost, rule };
  }

  // 2. ⊗ MERGE — fuse equivalent entities behind one logical identity.
  public merge(targetDids: string[], logicalName: string): MetaEntity | null {
    const targets = targetDids
      .map(did => this.meta.getEntity(did))
      .filter((e): e is MetaEntity => !!e);
    if (targets.length < 2) return null;

    const logical: MetaEntity = {
      did: createCanonicalDid("CAP", this.meta.allOfType("CAPABILITY").length + 2000),
      entityType: "CAPABILITY",
      name: logicalName,
      properties: { isMerged: true, mergedFrom: targets.map(t => t.did).join(",") }
    };
    this.meta.entities.set(logical.did, logical);
    targets.forEach(t => {
      this.meta.entities.delete(t.did);
      this.meta.addRelationship(t.did, "REL_PART_OF", logical.did);
    });
    this.meta.emitEvent("CAPABILITY_MERGED", logical.did, { logicalName, sources: targets.length });
    this.log(`Merge(⊗) ${targets.length} equivalent entities -> ${logicalName}`);
    return logical;
  }

  // 3. ÷ SPLIT — decompose a complex entity into independent components.
  public split(entityDid: string): MetaEntity[] {
    const source = this.meta.getEntity(entityDid);
    if (!source) return [];
    const parts: MetaEntity[] = [];
    const baseType: EntityType = "CAPABILITY";
    for (let i = 0; i < 3; i++) {
      const part = this.meta.addEntity(baseType, `${source.name} [Stage ${i + 1}]`, {
        splitOf: source.did
      });
      parts.push(part);
      this.meta.addRelationship(source.did, "REL_PART_OF", part.did);
    }
    this.meta.emitEvent("CAPABILITY_SPLIT", source.did, { parts: parts.length });
    this.log(`Split(÷) ${source.name} into ${parts.length} independent components`);
    return parts;
  }

  // 4. π PROJECT — extract a subsystem view (delegates to MetaModel).
  public project(view: string) {
    return this.meta.project(view as any);
  }

  // 5. σ FILTER — keep only nodes satisfying a predicate.
  public filter(predicate: (e: MetaEntity) => boolean): MetaEntity[] {
    return Array.from(this.meta.entities.values()).filter(predicate);
  }

  // 6. ⧉ REPLICATE — create synchronized copies across nodes (eventual consistency).
  public replicate(entityDid: string, targetNodeDids: string[]): MetaEntity[] {
    const source = this.meta.getEntity(entityDid);
    if (!source) return [];
    const replicas: MetaEntity[] = [];
    targetNodeDids.forEach((nodeDid, i) => {
      const replica = this.meta.addEntity("CONTEXT", `${source.name} replica ${i + 1}`, {
        replicatedFrom: source.did,
        hostedOn: nodeDid
      });
      replicas.push(replica);
      this.meta.addRelationship(source.did, "REL_DEPENDS_ON", replica.did);
    });
    this.meta.emitEvent("SUBGRAPH_REPLICATED", source.did, { replicas: replicas.length });
    this.log(`Replicate(⧉) ${source.name} across ${targetNodeDids.length} nodes`);
    return replicas;
  }

  // 7. ⤳ BIND — create a runtime dependency edge; reserve target resource.
  public bind(subjectDid: string, objectDid: string, relationship: RelationshipType = "REL_BOUND_TO"): MetaRelationship | null {
    const rel = this.meta.addRelationship(subjectDid, relationship, objectDid, { reserved: true });
    if (rel) {
      this.meta.emitEvent("BOUND", subjectDid, { objectDid, relationship });
      this.log(`Bind(⤳) ${subjectDid} -> ${relationship} -> ${objectDid}`);
    }
    return rel;
  }

  // 8. ⊘ UNBIND — remove a runtime dependency without destroying entities.
  public unbind(subjectDid: string, objectDid: string, relationship: RelationshipType = "REL_BOUND_TO") {
    this.meta.removeRelationship(subjectDid, relationship, objectDid);
    this.meta.emitEvent("UNBOUND", subjectDid, { objectDid, relationship });
    this.log(`Unbind(⊘) ${subjectDid} -x- ${relationship} -x- ${objectDid}`);
  }

  // 9. ⇄ SUBSTITUTE — atomically replace a bound entity (Unbind + Bind).
  public substitute(
    subjectDid: string,
    existingTargetDid: string,
    newTargetDid: string,
    relationship: RelationshipType = "REL_BOUND_TO"
  ): SubstituteResult {
    const existingRel = this.meta.findRelationships(subjectDid, relationship)
      .find(r => r.objectDid === existingTargetDid);

    if (existingRel) {
      this.meta.removeRelationship(subjectDid, relationship, existingTargetDid);
      this.meta.emitEvent("UNBOUND", subjectDid, { objectDid: existingTargetDid, relationship });
    }

    const newRel = this.meta.addRelationship(subjectDid, relationship, newTargetDid, { reserved: true });
    if (newRel) {
      this.meta.emitEvent("SUBSTITUTED", subjectDid, { from: existingTargetDid, to: newTargetDid });
      this.log(`Substitute(⇄) ${subjectDid}: ${existingTargetDid} -> ${newTargetDid}`);
    }
    // Degrade to 2D pointer if no replacement capability is bound (GL review §9)
    const degradedTo2D = !newRel;
    return { substituted: newRel, degradedTo2D };
  }

  // 10. ↑ ENHANCE — improve QoC of an existing capability without changing identity.
  public enhance(entityDid: string, auxiliaryDid: string) {
    const target = this.meta.getEntity(entityDid);
    const aux = this.meta.getEntity(auxiliaryDid);
    if (!target || !aux) return;
    const boost = (aux.properties.accuracyScore as number) || 0;
    const currentAcc = (target.properties.accuracyScore as number) || 0;
    const newAcc = Math.min(1, currentAcc + boost * 0.1);
    this.meta.setProperty(entityDid, "accuracyScore", parseFloat(newAcc.toFixed(3)));
    this.meta.addRelationship(auxiliaryDid, "REL_DEPENDS_ON", entityDid);
    this.meta.emitEvent("CAPABILITY_ENHANCED", entityDid, { auxiliary: aux.did, newAccuracy: newAcc });
    this.log(`Enhance(↑) ${target.name} boosted to ${newAcc.toFixed(3)} accuracy via ${aux.name}`);
  }

  // 11. Σ AGGREGATE — collect many independent properties into a unified pool.
  public aggregate(entityDids: string[], propertyKey: string): AggregateResult {
    const values = entityDids
      .map(did => this.meta.getProperty(did, propertyKey))
      .filter((v): v is number => typeof v === "number");
    const total = values.reduce((a, b) => a + b, 0);
    const poolDid = createCanonicalDid("RES", this.meta.allOfType("RESOURCE").length + 100);
    this.meta.entities.set(poolDid, {
      did: poolDid,
      entityType: "RESOURCE",
      name: `${propertyKey} pool`,
      properties: { total, members: values.length, sourceKeys: propertyKey }
    });
    this.meta.emitEvent("RESOURCE_AGGREGATED", poolDid, { propertyKey, total });
    this.log(`Aggregate(Σ) ${propertyKey}: ${values.length} members -> total ${total}`);
    return { poolDid, total, members: values.length };
  }

  // 12. ⇢ MIGRATE — move execution locus while preserving identity & state.
  public migrate(taskDid: string, sourceNodeDid: string, targetNodeDid: string) {
    this.meta.removeRelationship(taskDid, "REL_HOSTED_ON", sourceNodeDid);
    this.meta.addRelationship(taskDid, "REL_HOSTED_ON", targetNodeDid);
    this.meta.setProperty(taskDid, "hostedOn", targetNodeDid);
    this.meta.emitEvent("TASK_MIGRATED", taskDid, { from: sourceNodeDid, to: targetNodeDid });
    this.log(`Migrate(⇢) task ${taskDid}: ${sourceNodeDid} -> ${targetNodeDid}`);
  }

  // Formal Verification (GL Review Part V) — evaluate constraints before commit
  public verify(did: string, propertyKey: string, operator: CompareOp, threshold: string | number | boolean): boolean {
    const actual = this.meta.getProperty(did, propertyKey);
    return this.evaluate(actual, operator, threshold);
  }

  private evaluate(actual: any, operator: CompareOp, threshold: any): boolean {
    switch (operator) {
      case CompareOp.CMP_EQUAL: return actual === threshold;
      case CompareOp.CMP_NOT_EQUAL: return actual !== threshold;
      case CompareOp.CMP_GREATER_THAN: return actual > threshold;
      case CompareOp.CMP_LESS_THAN: return actual < threshold;
      case CompareOp.CMP_IN_SET:
        return Array.isArray(threshold) && threshold.includes(actual);
      default: return false;
    }
  }
}
