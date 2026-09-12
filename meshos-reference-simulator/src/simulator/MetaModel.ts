import {
  MetaEntity,
  MetaRelationship,
  MetaEvent,
  MetaConstraint,
  EntityType,
  RelationshipType,
  CompareOp,
  GraphViewName,
  createCanonicalDid
} from "../types/dmwe";

export interface GraphDiff {
  subjectDid: string;
  relationship?: RelationshipType;
  objectDid?: string;
  propertyKey?: string;
  propertyValue?: string | number | boolean;
  eventType?: string;
  timestampMs: number;
}

// Volume II Ch 4 / GL Review Part I — Unified Meta-Model
// One canonical knowledge graph; every subsystem view is a projection (π).
export class MetaModel {
  public entities: Map<string, MetaEntity> = new Map();
  public relationships: MetaRelationship[] = [];
  public events: MetaEvent[] = [];
  public constraints: MetaConstraint[] = [];
  private nextIdByType: Record<string, number> = {};

  // --- Entity lifecycle ---

  public addEntity(entityType: EntityType, name: string, properties: MetaEntity["properties"] = {}): MetaEntity {
    const id = this.allocId(entityType);
    const did = createCanonicalDid(entityType, id);
    const entity: MetaEntity = { did, entityType, name, properties };
    this.entities.set(did, entity);
    this.emitEvent("ENTITY_CREATED", did, { entityType, name });
    return entity;
  }

  public getEntity(did: string): MetaEntity | undefined {
    return this.entities.get(did);
  }

  public removeEntity(did: string) {
    const entity = this.entities.get(did);
    if (!entity) return;
    this.relationships = this.relationships.filter(
      r => r.subjectDid !== did && r.objectDid !== did
    );
    this.entities.delete(did);
    this.emitEvent("ENTITY_REMOVED", did, { entityType: entity.entityType });
  }

  // --- Properties (on entities) ---

  public setProperty(did: string, key: string, value: string | number | boolean) {
    const entity = this.entities.get(did);
    if (!entity) return;
    entity.properties[key] = value;
    this.diffs.push({ subjectDid: did, propertyKey: key, propertyValue: value, timestampMs: Date.now() });
  }

  public getProperty(did: string, key: string): string | number | boolean | undefined {
    return this.entities.get(did)?.properties[key];
  }

  // --- Relationships ---

  public addRelationship(
    subjectDid: string,
    relationship: RelationshipType,
    objectDid: string,
    properties: MetaRelationship["properties"] = {}
  ): MetaRelationship | null {
    if (!this.entities.has(subjectDid) || !this.entities.has(objectDid)) return null;
    const rel: MetaRelationship = {
      id: `rel-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      subjectDid,
      relationship,
      objectDid,
      properties
    };
    this.relationships.push(rel);
    this.diffs.push({ subjectDid, relationship, objectDid, timestampMs: Date.now() });
    return rel;
  }

  public getRelationships(did: string): MetaRelationship[] {
    return this.relationships.filter(r => r.subjectDid === did || r.objectDid === did);
  }

  public findRelationships(subjectDid: string, relationship: RelationshipType): MetaRelationship[] {
    return this.relationships.filter(
      r => r.subjectDid === subjectDid && r.relationship === relationship
    );
  }

  public removeRelationship(subjectDid: string, relationship: RelationshipType, objectDid: string) {
    this.relationships = this.relationships.filter(
      r => !(r.subjectDid === subjectDid && r.relationship === relationship && r.objectDid === objectDid)
    );
  }

  // --- Events (immutable, temporal chain) ---

  public emitEvent(eventType: string, entityDid: string, data: MetaEvent["data"] = {}) {
    const event: MetaEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestampMs: Date.now(),
      eventType,
      entityDid,
      data
    };
    this.events.unshift(event);
    if (this.events.length > 200) this.events.pop();
  }

  // --- Constraints (boolean predicates for formal verification) ---

  public addConstraint(
    propertyDid: string,
    operator: CompareOp,
    threshold: string | number | boolean,
    isHardConstraint: boolean = true
  ): MetaConstraint {
    const constraint: MetaConstraint = {
      id: `cnst-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      propertyDid,
      operator,
      threshold,
      isHardConstraint
    };
    this.constraints.push(constraint);
    return constraint;
  }

  // --- Projections (π) — subsystem views of the single graph ---

  public project(view: GraphViewName): { entities: MetaEntity[]; relationships: MetaRelationship[] } {
    switch (view) {
      case "MODULE":
        return {
          entities: this.allOfType("MODULE"),
          relationships: this.relationships.filter(r => r.relationship === "REL_PROVIDES")
        };
      case "CAPABILITY":
        return {
          entities: this.allOfType("CAPABILITY"),
          relationships: this.relationships.filter(
            r => r.relationship === "REL_PROVIDES" || r.relationship === "REL_CONSUMES"
          )
        };
      case "CONTEXT":
        return {
          entities: this.allOfType("CONTEXT"),
          relationships: this.relationships.filter(r => r.relationship === "REL_DEPENDS_ON")
        };
      case "RESOURCE":
        return {
          entities: this.allOfType("RESOURCE"),
          relationships: this.relationships.filter(r => r.relationship === "REL_ALLOCATED_TO")
        };
      case "SECURITY":
        return {
          entities: this.allOfType("USER"),
          relationships: this.relationships.filter(r => r.relationship === "REL_AUTHENTICATED_BY")
        };
      default:
        return { entities: [], relationships: [] };
    }
  }

  public allOfType(entityType: EntityType): MetaEntity[] {
    return Array.from(this.entities.values()).filter(e => e.entityType === entityType);
  }

  // Volume VIII Ch 9 §9.12 — Graph-Diff buffer (a few bytes per update)
  public diffs: GraphDiff[] = [];
  public drainDiffs(): GraphDiff[] {
    const drained = this.diffs;
    this.diffs = [];
    return drained;
  }

  private allocId(entityType: EntityType): number {
    const next = (this.nextIdByType[entityType] || 0) + 1;
    this.nextIdByType[entityType] = next;
    return next;
  }
}
