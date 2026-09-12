import { ReferenceApp } from "../types/dmwe";

export const REFERENCE_APPS: ReferenceApp[] = [
  {
    id: "app-aura-home",
    name: "Aura Home (Universal Spatial Control)",
    category: "Smart Home & IoT",
    description: "Your body is the universal remote. Point your Smart Ring or Gaze at any IoT lamp or Smart TV to control state or dim brightness.",
    requiredCapabilities: ["interaction.pointer.precision", "interaction.gaze.select"],
    targetIbn: "IBN-HUB-2020",
    icon: "Home",
    codeSnippet: `import { MeshOS, Verb, Target } from '@dmwe/sdk';

// Subscribe to 'SELECT' & 'SCROLL' intents on IoT devices
MeshOS.onIntent({ verb: Verb.SELECT, target: Target.IOT_DEVICE }, (intent) => {
    console.log("Toggle Smart Lamp power state!");
    SmartHomeHub.toggleLamp(intent.origin.providerNodeId);
});

MeshOS.onIntent({ verb: Verb.SCROLL, target: Target.IOT_DEVICE }, (intent) => {
    console.log("Dim Lamp level by delta:", intent.intent.scalarDelta);
    SmartHomeHub.adjustDimmer(intent.intent.scalarDelta);
});`
  },
  {
    id: "app-whisperscribe",
    name: "WhisperScribe (Discreet Commuter AI)",
    category: "Communication & AI",
    description: "Completely silent, hands-free interaction with AI in crowded public transport. Subvocalize speech without uttering audible sound.",
    requiredCapabilities: ["subvocal.emg.text", "audio.directional.ultrasonic"],
    icon: "Mic",
    codeSnippet: `import { MeshOS, Verb, Modifier } from '@dmwe/sdk';

// Listen for silent speech intent from subvocalization patch
MeshOS.onIntent({ verb: Verb.AUTHENTICATE, modifier: Modifier.SILENT }, (intent) => {
    const silentQuery = intent.intent.textValue;
    console.log("Subvocalized Query:", silentQuery);
    
    // Process query with Edge AI and reply via Ultrasonic Ear Bead
    const reply = AIProcessor.query(silentQuery);
    AudioBead.streamUltrasonic(reply);
});`
  },
  {
    id: "app-ghostdesk",
    name: "GhostDesk (Agnostic Workstation)",
    category: "Productivity",
    description: "Turn any plain cafe table into a high-speed touch keyboard by fusing table acoustic vibrations with EMG wristband muscle twitches.",
    requiredCapabilities: ["acoustic.vibration.touch", "emg.muscle.twitches"],
    targetIbn: "IBN-TBL-5590",
    icon: "Keyboard",
    codeSnippet: `import { MeshOS, Capability } from '@dmwe/sdk';

// Binds to Fused Acoustic-EMG Surface Keyboard Capability
MeshOS.bindFusedCapability("interaction.surface_typing.fused", (typingStream) => {
    const char = typingStream.character;
    console.log("Acoustic Surface Touch:", char);
    VirtualDocument.typeCharacter(char);
});`
  },
  {
    id: "app-spatial-presenter",
    name: "Spatial Presenter (Zoom/Teams Assistant)",
    category: "Remote Work",
    description: "Present naturally away from desk. Air swipe right to advance PowerPoint slides; fist-clench to instantly mute Zoom/Teams call.",
    requiredCapabilities: ["interaction.pointer.precision", "emg.muscle.twitches"],
    icon: "MonitorPlay",
    codeSnippet: `import { MeshOS, Verb, Target } from '@dmwe/sdk';

// Slide Advancement
MeshOS.onIntent({ verb: Verb.MOVE, target: Target.WORKSPACE }, (intent) => {
    if (intent.intent.spatialVector?.x > 0) {
        PowerPoint.nextSlide();
    }
});

// Fist-Clench Mute
MeshOS.onIntent({ verb: Verb.AUTHENTICATE, target: Target.WORKSPACE }, (intent) => {
    ZoomCall.toggleMute();
});`
  },
  {
    id: "app-point-and-pay",
    name: "Point-and-Pay (10ft Spatial Drive-Thru)",
    category: "Commerce & Retail",
    description: "Point ring at a POS terminal 10ft away in a drive-thru or cafe, double-tap thumb to send secure token without pulling out phone.",
    requiredCapabilities: ["interaction.pointer.precision", "payment.pos.uwb_relay"],
    targetIbn: "IBN-POS-1090",
    icon: "CreditCard",
    codeSnippet: `import { MeshOS, Verb, Target } from '@dmwe/sdk';

// UWB Vector match with POS Terminal IBN
MeshOS.onIntent({ verb: Verb.AUTHENTICATE, target: Target.IOT_DEVICE }, (intent) => {
    if (intent.origin.capabilityId.includes("uwb_relay") || intent.origin.capabilityId.includes("pointer")) {
        console.log("Transmitting encrypted payment token over UWB...");
        SecureEnclave.transmitToken(intent.origin.providerNodeId);
    }
});`
  },
  {
    id: "app-tesla-dash",
    name: "Tesla Spatial Dash (Automotive CAN Bridge)",
    category: "Automotive",
    description: "Control vehicle cabin systems via spatial pointing. Point at passenger window & swipe up to roll up window without touching screen.",
    requiredCapabilities: ["interaction.pointer.precision", "automotive.can.bridge"],
    targetIbn: "IBN-AUTO-007",
    icon: "Car",
    codeSnippet: `import { MeshOS, Verb, Target } from '@dmwe/sdk';

MeshOS.onIntent({ verb: Verb.MOVE, target: Target.ROOM }, (intent) => {
    const vector = intent.intent.spatialVector;
    console.log("Cabin Spatial Vector:", vector);
    TeslaCanBridge.setPassengerWindowPosition(vector.y);
});`
  },
  {
    id: "app-bio-token",
    name: "Bio-Token MFA (Zero-Friction 2FA)",
    category: "Security & Enterprise",
    description: "Perform a personalized micro-muscle flex (twitching ring finger twice) for instant 0.5s cryptographic 2FA approval without touching phone.",
    requiredCapabilities: ["emg.muscle.twitches"],
    icon: "ShieldCheck",
    codeSnippet: `import { MeshOS, Verb } from '@dmwe/sdk';

MeshOS.onIntent({ verb: Verb.AUTHENTICATE }, (intent) => {
    console.log("biometric neuromuscular signature verified!");
    OktaMFA.approveLoginChallenge(intent.confidence);
});`
  },
  {
    id: "app-ghost-scroll",
    name: "Kindle Ghost Scroll (Hands-Free Reading)",
    category: "Media & Accessibility",
    description: "Read propped up in bed or subway. Double jaw-click or prolonged blink turns e-reader pages completely hands-free.",
    requiredCapabilities: ["interaction.gaze.select", "audio.directional.ultrasonic"],
    icon: "BookOpen",
    codeSnippet: `import { MeshOS, Verb } from '@dmwe/sdk';

MeshOS.onIntent({ verb: Verb.SCROLL }, (intent) => {
    KindleReader.nextPage();
});`
  }
];
