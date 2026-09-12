// ============================================================================
// DMWE (Distributed Modular Wearable Ecosystem) & MeshOS Core Type Definitions
// Volume XI — API & Schema Reference Standards
// ============================================================================

export enum PayloadType {
  DESCRIPTOR = "DESCRIPTOR",
  CAPABILITY_ADVERT = "CAPABILITY_ADVERT",
  INTERACTION_OBJ = "INTERACTION_OBJ",
  CONTEXT_FACT = "CONTEXT_FACT",
  NODE_OFFLINE = "NODE_OFFLINE",
  FASTPATH_STREAM = "FASTPATH_STREAM",
  RESOURCE_SYNC = "RESOURCE_SYNC",
  FAULT_ALERT = "FAULT_ALERT",
  ERROR_RESPONSE = "ERROR_RESPONSE",
  CAPABILITY_NEGOTIATE = "CAPABILITY_NEGOTIATE",
  FAST_PATH_HANDSHAKE = "FAST_PATH_HANDSHAKE",
  GRAPH_QUERY = "GRAPH_QUERY",
  GRAPH_RESULT = "GRAPH_RESULT"
}

export enum QoSClass {
  QOS_BACKGROUND = "QOS_BACKGROUND",
  QOS_AI_INFERENCE = "QOS_AI_INFERENCE",
  QOS_VIDEO = "QOS_VIDEO",
  QOS_AUDIO = "QOS_AUDIO",
  QOS_REALTIME_INTERACTION = "QOS_REALTIME_INTERACTION" // < 10ms latency
}

// Volume XI, Ch 9 — Interaction Grammar (26 Verbs)
export enum Verb {
  SELECT = "SELECT",
  MOVE = "MOVE",
  ROTATE = "ROTATE",
  SCROLL = "SCROLL",
  PROJECT = "PROJECT",
  AUTHENTICATE = "AUTHENTICATE",
  UNDO = "UNDO",
  GRAB = "GRAB",
  RELEASE = "RELEASE",
  PINCH = "PINCH",
  SPREAD = "SPREAD",
  SWIPE = "SWIPE",
  DWELL = "DWELL",
  AIR_TAP = "AIR_TAP",
  PINCH_DRAG = "PINCH_DRAG",
  WRIST_TWIST = "WRIST_TWIST",
  HEAD_NOD = "HEAD_NOD",
  HEAD_SHAKE = "HEAD_SHAKE",
  EYE_GAZE = "EYE_GAZE",
  VOICE_COMMAND = "VOICE_COMMAND",
  SQUEEZE = "SQUEEZE",
  FINGER_SPREAD = "FINGER_SPREAD",
  ARM_SWEEP = "ARM_SWEEP",
  POINT = "POINT",
  WAVE = "WAVE"
}

// Volume XI, Ch 9 — Interaction Grammar (13 Modifiers)
export enum Target {
  CURRENT_OBJECT = "CURRENT_OBJECT",
  WORKSPACE = "WORKSPACE",
  ROOM = "ROOM",
  IOT_DEVICE = "IOT_DEVICE",
  APPLICATION = "APPLICATION",
  SYSTEM_CONTROL = "SYSTEM_CONTROL",
  MEDIA_PLAYER = "MEDIA_PLAYER",
  COMMUNICATION = "COMMUNICATION",
  FILE_SYSTEM = "FILE_SYSTEM",
  DISPLAY = "DISPLAY",
  AUDIO_OUTPUT = "AUDIO_OUTPUT",
  HAPTIC_ACTUATOR = "HAPTIC_ACTUATOR",
  NETWORK_SERVICE = "NETWORK_SERVICE",
  CLOUD_RESOURCE = "CLOUD_RESOURCE"
}

// Volume XI, Ch 9 — Interaction Grammar (15 Modifiers)
export enum Modifier {
  PRECISE = "PRECISE",
  CONTINUOUS = "CONTINUOUS",
  SILENT = "SILENT",
  SHARED = "SHARED",
  FORCEFUL = "FORCEFUL",
  GENTLE = "GENTLE",
  RAPID = "RAPID",
  SLOW = "SLOW",
  DOUBLE = "DOUBLE",
  TRIPLE = "TRIPLE",
  LONG_PRESS = "LONG_PRESS",
  DOUBLE_AIR_TAP = "DOUBLE_AIR_TAP",
  PINCH_AND_HOLD = "PINCH_AND_HOLD"
}

export enum ModuleClass {
  SENSOR = "SENSOR",
  COMPUTE = "COMPUTE",
  VISION = "VISION",
  BIO = "BIO",
  AUDIO = "AUDIO",
  OUTPUT = "OUTPUT",
  POWER = "POWER",
  COMMS = "COMMS",
  INTERMEDIARY_IBN = "INTERMEDIARY_IBN"
}

export enum SpatialPose {
  LEFT_INDEX_FINGER = "LEFT_INDEX_FINGER",
  HEAD_FRAME = "HEAD_FRAME",
  NECK_CHASSIS = "NECK_CHASSIS",
  WRIST_RIGHT = "WRIST_RIGHT",
  ANKLE_LEFT = "ANKLE_LEFT",
  CAFE_TABLE_SURFACE = "CAFE_TABLE_SURFACE",
  POS_TERMINAL = "POS_TERMINAL",
  VEHICLE_DASH = "VEHICLE_DASH",
  HOME_HUB_SHELF = "HOME_HUB_SHELF"
}

export enum PrivacyDomain {
  PUBLIC = "PUBLIC",
  PERSONAL = "PERSONAL",
  PRIVATE = "PRIVATE"
}

// Volume XI, Ch 5 §5.7 — Canonical Error Code Enum (DMWEErrorCode)
export enum DMWEErrorCode {
  OK = 0,

  // Protocol errors (1xxx)
  UNKNOWN_MESSAGE_TYPE = 1001,
  MALFORMED_ENVELOPE = 1002,
  MALFORMED_PAYLOAD = 1003,
  UNSUPPORTED_VERSION = 1004,
  DUPLICATE_MESSAGE_ID = 1005,
  MESSAGE_TOO_LARGE = 1006,
  ROUTING_FAILURE = 1007,
  SESSION_NOT_FOUND = 1008,
  SESSION_EXPIRED = 1009,
  QOS_VIOLATION = 1010,

  // Authentication & authorization (2xxx)
  AUTH_REQUIRED = 2001,
  AUTH_FAILED = 2002,
  TOKEN_EXPIRED = 2003,
  TOKEN_REVOKED = 2004,
  UNTRUSTED_NODE = 2005,
  UNTRUSTED_APPLICATION = 2006,
  INSUFFICIENT_PERMISSIONS = 2007,
  CAPABILITY_ACCESS_DENIED = 2008,
  CROSS_DOMAIN_DENIED = 2009,

  // Capability errors (3xxx)
  CAPABILITY_NOT_FOUND = 3001,
  CAPABILITY_UNAVAILABLE = 3002,
  CAPABILITY_VERSION_MISMATCH = 3003,
  CAPABILITY_DEPENDENCY_MISSING = 3004,
  CAPABILITY_NEGOTIATION_FAILED = 3005,
  CAPABILITY_PROVIDER_BUSY = 3006,
  CAPABILITY_PROVIDER_FAILED = 3007,
  FAST_PATH_DENIED = 3008,
  FAST_PATH_REVOKED = 3009,

  // State & data errors (4xxx)
  STATE_READ_FAILED = 4001,
  STATE_WRITE_FAILED = 4002,
  STATE_CONFLICT = 4003,
  STATE_CORRUPTED = 4004,
  STATE_NOT_FOUND = 4005,
  CONTEXT_STALE = 4006,
  CONTEXT_CONFLICT = 4007,
  SCHEMA_MISMATCH = 4008,

  // Resource errors (5xxx)
  RESOURCE_EXHAUSTED = 5001,
  RESOURCE_DENIED = 5002,
  ENERGY_LOW = 5003,
  ENERGY_CRITICAL = 5004,
  THERMAL_CRITICAL = 5005,
  MEMORY_EXHAUSTED = 5006,
  STORAGE_FULL = 5007,

  // Scheduling errors (6xxx)
  SCHEDULER_NO_CAPABLE_NODE = 6001,
  SCHEDULER_DEADLINE_MISSED = 6002,
  SCHEDULER_PREEMPTED = 6003,
  TASK_MIGRATION_FAILED = 6004,
  CHECKPOINT_MISSING = 6005,

  // System errors (7xxx)
  MESH_PARTITIONED = 7001,
  PRIMARY_NODE_LOST = 7002,
  TIME_SYNC_LOST = 7003,
  FIRMWARE_UPDATE_FAILED = 7004,
  HARDWARE_FAULT = 7005,
  INTERNAL_ERROR = 7999
}

// Volume IV, Ch 14 §14.8 — Data Classification Tiers
export enum DataClassificationTier {
  T0_PUBLIC = "T0_PUBLIC",
  T1_INTERNAL = "T1_INTERNAL",
  T2_PERSONAL = "T2_PERSONAL",
  T3_SENSITIVE = "T3_SENSITIVE",
  T4_CONFIDENTIAL = "T4_CONFIDENTIAL",
  T5_RESTRICTED = "T5_RESTRICTED"
}

// Volume IV, Ch 16 §16.1 — Failure Mode Catalog (F-001..F-026)
export enum FaultCode {
  F_001_BATTERY_EXHAUSTION = "F-001",
  F_002_RADIO_LINK_LOSS = "F-002",
  F_003_NODE_PHYSICAL_REMOVAL = "F-003",
  F_004_MODULE_DISCONNECT = "F-004",
  F_005_MODULE_FIRMWARE_CRASH = "F-005",
  F_006_PRIMARY_NODE_LOSS = "F-006",
  F_007_MESH_PARTITION = "F-007",
  F_008_CAPABILITY_PROVIDER_FAILURE = "F-008",
  F_009_COMM_CONGESTION = "F-009",
  F_010_MEMORY_EXHAUSTION = "F-010",
  F_011_STATE_CORRUPTION = "F-011",
  F_012_TIME_SYNC_DRIFT = "F-012",
  F_013_SECURITY_EVENT = "F-013",
  F_014_TRANSPORT_FAILURE_SINGLE = "F-014",
  F_015_TRANSPORT_FAILURE_ALL = "F-015",
  F_016_CAPABILITY_ADVERT_STALE = "F-016",
  F_017_CONTEXT_GRAPH_INCONSISTENCY = "F-017",
  F_018_FAST_PATH_TOKEN_REVOCATION = "F-018",
  F_019_ENERGY_BUDGET_EXCEEDED = "F-019",
  F_020_HDT_DESYNC = "F-020",
  F_021_CAPABILITY_NEGOTIATION_FAILED = "F-021",
  F_022_CONTEXT_POISONING = "F-022",
  F_023_SCHEDULER_DEADLOCK = "F-023",
  F_024_STATE_REPLICATION_DIVERGENCE = "F-024",
  F_025_FUSION_RACE_CONDITION = "F-025",
  F_026_SCHEMA_MISMATCH = "F-026"
}

// Volume III, Ch 9 §9.6 — Interaction Latency Classes
export enum LatencyClass {
  CRITICAL_REALTIME = "CRITICAL_REALTIME", // ≤5ms
  INTERACTIVE = "INTERACTIVE",             // ≤10ms
  RESPONSIVE = "RESPONSIVE",               // ≤20ms
  CONVERSATIONAL = "CONVERSATIONAL",       // ≤50ms
  PERCEPTUAL = "PERCEPTUAL",               // ≤150ms
  BACKGROUND = "BACKGROUND",               // ≤2000ms
  DEFERRED = "DEFERRED"                    // best-effort
}

export const LATENCY_BUDGETS: Record<LatencyClass, number> = {
  [LatencyClass.CRITICAL_REALTIME]: 5,
  [LatencyClass.INTERACTIVE]: 10,
  [LatencyClass.RESPONSIVE]: 20,
  [LatencyClass.CONVERSATIONAL]: 50,
  [LatencyClass.PERCEPTUAL]: 150,
  [LatencyClass.BACKGROUND]: 2000,
  [LatencyClass.DEFERRED]: Infinity
};

export const CAPABILITY_LATENCY_REQUIREMENTS: Record<string, LatencyClass> = {
  "interaction.pointer.precision": LatencyClass.CRITICAL_REALTIME,
  "interaction.gaze.select": LatencyClass.INTERACTIVE,
  "subvocal.emg.text": LatencyClass.CONVERSATIONAL,
  "emg.muscle.twitches": LatencyClass.INTERACTIVE,
  "acoustic.vibration.touch": LatencyClass.INTERACTIVE,
  "audio.directional.ultrasonic": LatencyClass.CONVERSATIONAL,
  "projection.holographic.3d": LatencyClass.INTERACTIVE,
  "payment.pos.uwb_relay": LatencyClass.INTERACTIVE,
  "automotive.can.bridge": LatencyClass.INTERACTIVE
};

export interface ErrorResponse {
  errorCode: DMWEErrorCode;
  errorMessage: string;
  originalMessageId: string;
  occurredAtMs: number;
  nodeId: string;
}

export interface MeshEnvelope {
  messageId: string;
  timestampMs: number;
  senderNodeId: string;
  receiverNodeId?: string; // Empty if broadcast
  qosClass: QoSClass;
  payloadType: PayloadType;
  payload: any;
  rssiDbm?: number;
  errorResponse?: ErrorResponse;
}

export interface ModuleDescriptor {
  moduleId: string;
  name: string;
  manufacturer: string;
  deviceClass: ModuleClass;
  spatialPose: SpatialPose;
  batteryLevel: number; // 0.0 - 1.0
  computeMips: number;
  hasNpu: boolean;
  trustLevel: PrivacyDomain;
  isIbn: boolean;
  iconName: string;
}

export interface CapabilityAdvertisement {
  capabilityId: string;
  name: string;
  version: string;
  providerNodeId: string;
  isFused?: boolean;
  fusedFromNodes?: string[];
  qoc: {
    latencyMs: number;
    accuracyScore: number; // 0.0 - 1.0
    energyCost: "LOW" | "MEDIUM" | "HIGH";
    privacyClass: PrivacyDomain;
  };
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface InteractionObject {
  interactionId: string;
  timestampMs: number;
  intent: {
    verb: Verb;
    target: Target;
    modifiers: Modifier[];
    spatialVector?: Vector3D;
    scalarDelta?: number; // e.g. -5 to +5
    textValue?: string;
  };
  origin: {
    capabilityId: string;
    providerNodeId: string;
  };
  confidence: number; // 0.0 - 1.0
  fastPathEligible?: boolean;
  rawActionName?: string;
}

export interface ContextFact {
  factId: string;
  layer: "SENSOR" | "DEVICE" | "USER_ACTIVITY" | "ENVIRONMENT" | "APPLICATION";
  key: string;
  value: string | number | boolean;
  confidence: number;
  updatedAtMs: number;
  provenanceNode: string;
}

// Volume VIII, Ch 7 §7.7 — Capability Negotiation
export enum NegotiationMessageType {
  REQUEST = "REQUEST",
  OFFER = "OFFER",
  COUNTER = "COUNTER",
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  RELEASE = "RELEASE",
  ACK = "ACK"
}

export enum NegotiationState {
  IDLE = "IDLE",
  REQUESTING = "REQUESTING",
  OFFERING = "OFFERING",
  COUNTER_OFFERING = "COUNTER_OFFERING",
  ACCEPTING = "ACCEPTING",
  BOUND = "BOUND",
  RELEASING = "RELEASING"
}

export interface NegotiationSession {
  sessionId: string;
  capabilityId: string;
  consumerNodeId: string;
  providerNodeId: string;
  state: NegotiationState;
  sequence: number;
  timeoutMs: number;
  createdAtMs: number;
}

export interface QoCRequirement {
  maxLatencyMs: number;
  minAccuracy: number;
  minAvailability: number;
  maxEnergyCost: "LOW" | "MEDIUM" | "HIGH";
  maxPrivacyClass: PrivacyDomain;
}

// Volume XI, Ch 13 — Fast-Path Binding & Low-Latency Streams
export interface DirectStreamRequest {
  interactionId: string;
  capabilityId: string;
  consumerNodeId: string;
  targetHz: number;
  maxLatencyUs: number;
}

export interface DirectStreamGrant {
  grantId: string;
  streamToken: number;
  providerNodeId: string;
  grantedHz: number;
  validUntilMs: number;
}

export interface FastPathStream {
  streamToken: number;
  timestampUs: number;
  quaternionWxyz: number[];
  accelXyz: number[];
}

export interface NodeState {
  descriptor: ModuleDescriptor;
  capabilities: CapabilityAdvertisement[];
  isOnline: boolean;
  isPrimaryCoordinator: boolean;
  fitnessScore: number;
  signalStrengthDbm: number; // e.g. -45 to -90
  thermalCelsius: number;
  memoryUsagePercent: number;
  cpuLoadPercent: number;
  linkQualityPercent: number;
}

export interface FaultEvent {
  id: string;
  timestampMs: number;
  code: FaultCode;
  nodeId: string;
  description: string;
  resolved: boolean;
  resolutionAction?: string;
}

export interface LogEntry {
  id: string;
  timestampMs: number;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS" | "PROTOCOL";
  source: string;
  message: string;
  envelope?: MeshEnvelope;
}

export interface ReferenceApp {
  id: string;
  name: string;
  category: string;
  description: string;
  requiredCapabilities: string[];
  targetIbn?: string;
  codeSnippet: string;
  activeStateDescription?: string;
  icon: string;
}

// ============================================================================
// Unified Meta-Model (Volume II Ch 4 / GL Review Part I)
// Five primitives: Entity, Relationship, Property, Event, Constraint
// ============================================================================

export type EntityType =
  | "DEVICE"
  | "MODULE"
  | "CAPABILITY"
  | "USER"
  | "INTENT"
  | "TASK"
  | "CONTEXT"
  | "RESOURCE"
  | "POLICY"
  | "APPLICATION";

// Volume XI Ch 21 §21.7 — Canonical Relationship Types
export type RelationshipType =
  | "REL_UNKNOWN"
  | "REL_BOUND_TO"
  | "REL_CONSUMES"
  | "REL_DEPENDS_ON"
  | "REL_ALLOCATED_TO"
  | "REL_PROVIDES"
  | "REL_AUTHENTICATED_BY"
  | "REL_HOSTED_ON"
  | "REL_PART_OF"
  | "REL_LOCATED_ON";

// Volume XI Ch 21 §21.6 — Constraint Comparison Operators
export enum CompareOp {
  CMP_UNKNOWN = "CMP_UNKNOWN",
  CMP_EQUAL = "CMP_EQUAL",
  CMP_NOT_EQUAL = "CMP_NOT_EQUAL",
  CMP_GREATER_THAN = "CMP_GREATER_THAN",
  CMP_LESS_THAN = "CMP_LESS_THAN",
  CMP_IN_SET = "CMP_IN_SET"
}

// Volume XI Ch 21 §21.7 — Capability Composition Rules
export enum CompositionRule {
  COMPOSE_UNKNOWN = "COMPOSE_UNKNOWN",
  COMPOSE_FUSION = "COMPOSE_FUSION",
  COMPOSE_SEQUENCE = "COMPOSE_SEQUENCE",
  COMPOSE_PARALLEL = "COMPOSE_PARALLEL",
  COMPOSE_FALLBACK = "COMPOSE_FALLBACK"
}

export interface MetaEntity {
  did: string;
  entityType: EntityType;
  name: string;
  properties: Record<string, string | number | boolean>;
}

export interface MetaRelationship {
  id: string;
  subjectDid: string;
  relationship: RelationshipType;
  objectDid: string;
  properties: Record<string, string | number | boolean>;
}

export interface MetaEvent {
  id: string;
  timestampMs: number;
  eventType: string;
  entityDid: string;
  data: Record<string, string | number | boolean>;
}

export interface MetaConstraint {
  id: string;
  propertyDid: string;
  operator: CompareOp;
  threshold: string | number | boolean;
  isHardConstraint: boolean;
}

export type GraphViewName = "CAPABILITY" | "CONTEXT" | "RESOURCE" | "SECURITY" | "MODULE";

// ============================================================================
// Canonical DID system (CPT Review §4 / GL Review Part II)
// DID:<Domain>:<Authority>:<Type>:<ID>:<Version>
// ============================================================================

const DID_TYPE_CODES: Record<string, string> = {
  CAP: "CAP",
  MOD: "MOD",
  DEV: "DEV",
  USR: "USR",
  INT: "INT",
  TSK: "TSK",
  CTX: "CTX",
  RES: "RES",
  POL: "POL",
  APP: "APP",
  EVT: "EVT"
};

export function createCanonicalDid(type: string, id: number, version: number = 1): string {
  const code = DID_TYPE_CODES[type] || type;
  return `DID:DMWE:STD:${code}:${String(id).padStart(6, "0")}:v${version}`;
}
