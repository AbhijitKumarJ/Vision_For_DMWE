import {
  ModuleDescriptor,
  CapabilityAdvertisement,
  ModuleClass,
  SpatialPose,
  PrivacyDomain,
  PayloadType,
  QoSClass,
  Verb,
  Target,
  Modifier,
  InteractionObject
} from "../types/dmwe";
import { MeshRadio } from "./MeshRadio";

export class VirtualNode {
  public descriptor: ModuleDescriptor;
  public capabilities: CapabilityAdvertisement[];
  public isOnline: boolean = false;
  public thermalCelsius: number = 35;
  public memoryUsagePercent: number = 45;
  public cpuLoadPercent: number = 30;
  public linkQualityPercent: number = 95;

  constructor(
    descriptor: ModuleDescriptor,
    capabilities: CapabilityAdvertisement[],
    private radio: MeshRadio
  ) {
    this.descriptor = descriptor;
    this.capabilities = capabilities;
  }

  public updateHealth() {
    if (!this.isOnline) {
      this.thermalCelsius = Math.max(25, this.thermalCelsius - 1);
      return;
    }

    // Simulate thermal dynamics from load
    this.cpuLoadPercent = Math.max(5, Math.min(100, this.cpuLoadPercent + (Math.random() - 0.5) * 12));
    this.thermalCelsius += ((this.cpuLoadPercent / 10) - 3) * 0.3 + (Math.random() - 0.5) * 1.5;
    this.thermalCelsius = Math.max(25, Math.min(60, this.thermalCelsius));

    // Memory usage drifts with activity
    this.memoryUsagePercent = Math.max(20, Math.min(98, this.memoryUsagePercent + (Math.random() - 0.5) * 8));

    // Link quality degrades with thermal stress
    if (this.thermalCelsius > 45) {
      this.linkQualityPercent = Math.max(30, this.linkQualityPercent - 3);
      this.cpuLoadPercent = Math.max(10, this.cpuLoadPercent - 8);
    } else if (this.thermalCelsius < 38) {
      this.linkQualityPercent = Math.min(99, this.linkQualityPercent + 2);
    }
  }

  public boot() {
    this.isOnline = true;
    this.descriptor.batteryLevel = Math.max(0.05, this.descriptor.batteryLevel);

    // 1. Broadcast Module Descriptor (MDP)
    this.radio.broadcast({
      messageId: `mdp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestampMs: Date.now(),
      senderNodeId: this.descriptor.moduleId,
      qosClass: QoSClass.QOS_BACKGROUND,
      payloadType: PayloadType.DESCRIPTOR,
      payload: this.descriptor
    });

    // 2. Broadcast Capability Advertisements (CEP)
    for (const cap of this.capabilities) {
      this.radio.broadcast({
        messageId: `cep-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestampMs: Date.now(),
        senderNodeId: this.descriptor.moduleId,
        qosClass: QoSClass.QOS_BACKGROUND,
        payloadType: PayloadType.CAPABILITY_ADVERT,
        payload: cap
      });
    }
  }

  public die(reason: string = "Battery Critical") {
    this.isOnline = false;
    this.radio.broadcast({
      messageId: `offline-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestampMs: Date.now(),
      senderNodeId: this.descriptor.moduleId,
      qosClass: QoSClass.QOS_REALTIME_INTERACTION,
      payloadType: PayloadType.NODE_OFFLINE,
      payload: { reason }
    });
  }

  public updateBattery(newLevel: number) {
    this.descriptor.batteryLevel = Math.min(1.0, Math.max(0.0, newLevel));
    if (this.descriptor.batteryLevel <= 0.02 && this.isOnline) {
      this.die("Battery Depleted (0%)");
    }
  }

  public triggerAction(
    verb: Verb,
    target: Target,
    modifiers: Modifier[] = [Modifier.PRECISE],
    rawActionName: string = "Action",
    opts: { spatialVector?: { x: number; y: number; z: number }; scalarDelta?: number; textValue?: string } = {}
  ) {
    if (!this.isOnline) return null;

    const cap = this.capabilities[0];
    const interaction: InteractionObject = {
      interactionId: `ix-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestampMs: Date.now(),
      intent: {
        verb,
        target,
        modifiers,
        spatialVector: opts.spatialVector,
        scalarDelta: opts.scalarDelta,
        textValue: opts.textValue
      },
      origin: {
        capabilityId: cap ? cap.capabilityId : "unknown.capability",
        providerNodeId: this.descriptor.moduleId
      },
      confidence: cap ? cap.qoc.accuracyScore : 0.85,
      rawActionName,
      fastPathEligible: verb === Verb.MOVE || verb === Verb.SCROLL
    };

    this.radio.broadcast({
      messageId: `ixmsg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestampMs: Date.now(),
      senderNodeId: this.descriptor.moduleId,
      qosClass: QoSClass.QOS_REALTIME_INTERACTION,
      payloadType: PayloadType.INTERACTION_OBJ,
      payload: interaction
    });

    return interaction;
  }
}

// Preset Hardware Profiles from DMWE Specs
export function createPresetNodes(radio: MeshRadio): VirtualNode[] {
  return [
    // 1. Smart Ring Node
    new VirtualNode(
      {
        moduleId: "DMWE-RNG-9942",
        name: "Aura Smart Ring",
        manufacturer: "Aura Kinematics",
        deviceClass: ModuleClass.SENSOR,
        spatialPose: SpatialPose.LEFT_INDEX_FINGER,
        batteryLevel: 0.88,
        computeMips: 120,
        hasNpu: false,
        trustLevel: PrivacyDomain.PERSONAL,
        isIbn: false,
        iconName: "CircleDot"
      },
      [
        {
          capabilityId: "interaction.pointer.precision",
          name: "Precision Spatial Pointer",
          version: "2.1.0",
          providerNodeId: "DMWE-RNG-9942",
          qoc: {
            latencyMs: 6,
            accuracyScore: 0.96,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PERSONAL
          }
        }
      ],
      radio
    ),

    // 2. Smart Glasses Node
    new VirtualNode(
      {
        moduleId: "DMWE-GLS-1123",
        name: "Lumina AR Glasses",
        manufacturer: "Lumina Vision",
        deviceClass: ModuleClass.VISION,
        spatialPose: SpatialPose.HEAD_FRAME,
        batteryLevel: 0.72,
        computeMips: 850,
        hasNpu: true,
        trustLevel: PrivacyDomain.PERSONAL,
        isIbn: false,
        iconName: "Glasses"
      },
      [
        {
          capabilityId: "interaction.gaze.select",
          name: "IR Gaze Target & Blink Selector",
          version: "1.8.0",
          providerNodeId: "DMWE-GLS-1123",
          qoc: {
            latencyMs: 14,
            accuracyScore: 0.89,
            energyCost: "MEDIUM",
            privacyClass: PrivacyDomain.PERSONAL
          }
        }
      ],
      radio
    ),

    // 3. Subvocalization Patch
    new VirtualNode(
      {
        moduleId: "DMWE-SUB-8812",
        name: "SubVocal Neck Patch",
        manufacturer: "AcousticSense",
        deviceClass: ModuleClass.BIO,
        spatialPose: SpatialPose.NECK_CHASSIS,
        batteryLevel: 0.91,
        computeMips: 240,
        hasNpu: true,
        trustLevel: PrivacyDomain.PRIVATE,
        isIbn: false,
        iconName: "Mic"
      },
      [
        {
          capabilityId: "subvocal.emg.text",
          name: "Silent Speech EMG Synthesizer",
          version: "3.0.0",
          providerNodeId: "DMWE-SUB-8812",
          qoc: {
            latencyMs: 18,
            accuracyScore: 0.94,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PRIVATE
          }
        }
      ],
      radio
    ),

    // 4. EMG Wristband Node
    new VirtualNode(
      {
        moduleId: "DMWE-WST-3301",
        name: "NeuralFlex EMG Wristband",
        manufacturer: "NeuralFlex Labs",
        deviceClass: ModuleClass.BIO,
        spatialPose: SpatialPose.WRIST_RIGHT,
        batteryLevel: 0.65,
        computeMips: 310,
        hasNpu: true,
        trustLevel: PrivacyDomain.PERSONAL,
        isIbn: false,
        iconName: "Activity"
      },
      [
        {
          capabilityId: "emg.muscle.twitches",
          name: "Neuromuscular Twitch Classifier",
          version: "2.0.0",
          providerNodeId: "DMWE-WST-3301",
          qoc: {
            latencyMs: 8,
            accuracyScore: 0.97,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PERSONAL
          }
        }
      ],
      radio
    ),

    // 5. Hearable Audio Bead
    new VirtualNode(
      {
        moduleId: "DMWE-EAR-7711",
        name: "SonicPulse In-Ear Bead",
        manufacturer: "SonicPulse Audio",
        deviceClass: ModuleClass.AUDIO,
        spatialPose: SpatialPose.HEAD_FRAME,
        batteryLevel: 0.81,
        computeMips: 180,
        hasNpu: false,
        trustLevel: PrivacyDomain.PERSONAL,
        isIbn: false,
        iconName: "Headphones"
      },
      [
        {
          capabilityId: "audio.directional.ultrasonic",
          name: "Directional Audio & Jaw Click",
          version: "1.5.0",
          providerNodeId: "DMWE-EAR-7711",
          qoc: {
            latencyMs: 12,
            accuracyScore: 0.91,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PERSONAL
          }
        }
      ],
      radio
    ),

    // 6. Holographic Projector Bead
    new VirtualNode(
      {
        moduleId: "DMWE-PRJ-4010",
        name: "Twin Hologram Pico Projector",
        manufacturer: "PhotonPico Inc",
        deviceClass: ModuleClass.OUTPUT,
        spatialPose: SpatialPose.NECK_CHASSIS,
        batteryLevel: 0.54,
        computeMips: 400,
        hasNpu: false,
        trustLevel: PrivacyDomain.PUBLIC,
        isIbn: false,
        iconName: "Sparkles"
      },
      [
        {
          capabilityId: "projection.holographic.3d",
          name: "Mid-Air Holographic 3D Emitter",
          version: "1.0.0",
          providerNodeId: "DMWE-PRJ-4010",
          qoc: {
            latencyMs: 16,
            accuracyScore: 0.92,
            energyCost: "HIGH",
            privacyClass: PrivacyDomain.PUBLIC
          }
        }
      ],
      radio
    ),

    // 7. Smart Cafe Table IBN
    new VirtualNode(
      {
        moduleId: "IBN-TBL-5590",
        name: "Cafe Surface Acoustic IBN",
        manufacturer: "UrbanTech Infrastructure",
        deviceClass: ModuleClass.INTERMEDIARY_IBN,
        spatialPose: SpatialPose.CAFE_TABLE_SURFACE,
        batteryLevel: 1.0, // Mains powered
        computeMips: 1200,
        hasNpu: true,
        trustLevel: PrivacyDomain.PUBLIC,
        isIbn: true,
        iconName: "Square"
      },
      [
        {
          capabilityId: "acoustic.vibration.touch",
          name: "Wood Vibration Trackpad Matrix",
          version: "2.2.0",
          providerNodeId: "IBN-TBL-5590",
          qoc: {
            latencyMs: 5,
            accuracyScore: 0.98,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PUBLIC
          }
        }
      ],
      radio
    ),

    // 8. POS Payment Terminal IBN
    new VirtualNode(
      {
        moduleId: "IBN-POS-1090",
        name: "Drive-Thru POS UWB IBN",
        manufacturer: "PayPoint Systems",
        deviceClass: ModuleClass.INTERMEDIARY_IBN,
        spatialPose: SpatialPose.POS_TERMINAL,
        batteryLevel: 1.0,
        computeMips: 950,
        hasNpu: true,
        trustLevel: PrivacyDomain.PUBLIC,
        isIbn: true,
        iconName: "CreditCard"
      },
      [
        {
          capabilityId: "payment.pos.uwb_relay",
          name: "10ft UWB Spatial Point-and-Pay Relay",
          version: "1.1.0",
          providerNodeId: "IBN-POS-1090",
          qoc: {
            latencyMs: 10,
            accuracyScore: 0.99,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PUBLIC
          }
        }
      ],
      radio
    ),

    // 9. Tesla / Auto Spatial Dash IBN
    new VirtualNode(
      {
        moduleId: "IBN-AUTO-007",
        name: "Vehicle Infotainment CAN IBN",
        manufacturer: "CyberDrive Motors",
        deviceClass: ModuleClass.INTERMEDIARY_IBN,
        spatialPose: SpatialPose.VEHICLE_DASH,
        batteryLevel: 1.0,
        computeMips: 3200,
        hasNpu: true,
        trustLevel: PrivacyDomain.PERSONAL,
        isIbn: true,
        iconName: "Car"
      },
      [
        {
          capabilityId: "automotive.can.bridge",
          name: "Cabin Spatial CAN-Bus Bridge",
          version: "3.1.0",
          providerNodeId: "IBN-AUTO-007",
          qoc: {
            latencyMs: 4,
            accuracyScore: 0.99,
            energyCost: "LOW",
            privacyClass: PrivacyDomain.PERSONAL
          }
        }
      ],
      radio
    )
  ];
}
