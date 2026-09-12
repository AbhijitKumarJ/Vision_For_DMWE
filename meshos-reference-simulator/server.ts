import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy Gemini AI initialization
  let aiClient: GoogleGenAI | null = null;
  function getGenAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing.");
      }
      aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", system: "DMWE MeshOS Simulator", version: "0.1.0" });
  });

  // AI Intent Parser endpoint
  app.post("/api/ai/parse-intent", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        res.status(400).json({ error: "Prompt string is required." });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        // Fallback rule-based parsing if key not present
        const lower = prompt.toLowerCase();
        let verb = "SELECT";
        let target = "IOT_DEVICE";
        let confidence = 0.88;
        let suggestedCapability = "interaction.pointer.precision";

        if (lower.includes("dim") || lower.includes("scroll") || lower.includes("volume") || lower.includes("zoom")) {
          verb = "SCROLL";
        } else if (lower.includes("grab")) {
          verb = "GRAB";
          target = "CURRENT_OBJECT";
        } else if (lower.includes("release") || lower.includes("drop")) {
          verb = "RELEASE";
          target = "CURRENT_OBJECT";
        } else if (lower.includes("swipe")) {
          verb = "SWIPE";
          target = "WORKSPACE";
        } else if (lower.includes("nod")) {
          verb = "HEAD_NOD";
          target = "SYSTEM_CONTROL";
        } else if (lower.includes("shake head") || lower.includes("head shake")) {
          verb = "HEAD_SHAKE";
          target = "SYSTEM_CONTROL";
        } else if (lower.includes("dwell") || lower.includes("stare")) {
          verb = "DWELL";
          target = "CURRENT_OBJECT";
          suggestedCapability = "interaction.gaze.select";
        } else if (lower.includes("wave")) {
          verb = "WAVE";
          target = "COMMUNICATION";
        } else if (lower.includes("point")) {
          verb = "POINT";
          target = "IOT_DEVICE";
        } else if (lower.includes("move") || lower.includes("drag") || lower.includes("slide")) {
          verb = "MOVE";
        } else if (lower.includes("type") || lower.includes("write") || lower.includes("speak") || lower.includes("whisper")) {
          verb = "AUTHENTICATE";
          suggestedCapability = "subvocal.emg.text";
        } else if (lower.includes("pay") || lower.includes("buy")) {
          verb = "AUTHENTICATE";
          target = "IOT_DEVICE";
          suggestedCapability = "interaction.pointer.precision";
        } else if (lower.includes("presentation") || lower.includes("zoom") || lower.includes("mute")) {
          verb = "SELECT";
          target = "WORKSPACE";
        }

        let modifiers = ["PRECISE"];
        if (lower.includes("continuous") || lower.includes("dim") || lower.includes("scroll")) {
          modifiers = ["CONTINUOUS"];
        } else if (lower.includes("rapid") || lower.includes("quick")) {
          modifiers = ["RAPID"];
        } else if (lower.includes("slow")) {
          modifiers = ["SLOW"];
        } else if (lower.includes("silent") || lower.includes("quiet")) {
          modifiers = ["SILENT"];
        }

        res.json({
          verb,
          target,
          modifiers,
          confidence,
          suggestedCapability,
          explanation: `Heuristic interpretation (No GEMINI_API_KEY set): Identified intent '${verb}' targeted at '${target}' using capability '${suggestedCapability}'.`,
          fastPathEligible: verb === "MOVE" || verb === "SCROLL" || verb === "SWIPE"
        });
        return;
      }

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are the DMWE (Distributed Modular Wearable Ecosystem) Intent Engine AI parser.
Map the user's natural language request into a valid DMWE Intent Packet (Volume XI, Ch 9).

User Request: "${prompt}"

Available DMWE Verbs: ["SELECT", "MOVE", "ROTATE", "SCROLL", "PROJECT", "AUTHENTICATE", "UNDO", "GRAB", "RELEASE", "PINCH", "SPREAD", "SWIPE", "DWELL", "AIR_TAP", "PINCH_DRAG", "WRIST_TWIST", "HEAD_NOD", "HEAD_SHAKE", "EYE_GAZE", "VOICE_COMMAND", "SQUEEZE", "FINGER_SPREAD", "ARM_SWEEP", "POINT", "WAVE"]
Available DMWE Targets: ["CURRENT_OBJECT", "WORKSPACE", "ROOM", "IOT_DEVICE", "APPLICATION", "SYSTEM_CONTROL", "MEDIA_PLAYER", "COMMUNICATION", "FILE_SYSTEM", "DISPLAY", "AUDIO_OUTPUT", "HAPTIC_ACTUATOR", "NETWORK_SERVICE", "CLOUD_RESOURCE"]
Available DMWE Modifiers: ["PRECISE", "CONTINUOUS", "SILENT", "SHARED", "FORCEFUL", "GENTLE", "RAPID", "SLOW", "DOUBLE", "TRIPLE", "LONG_PRESS", "DOUBLE_AIR_TAP", "PINCH_AND_HOLD"]
Available Capabilities:
- "interaction.pointer.precision" (Smart Ring)
- "interaction.gaze.select" (Smart Glasses)
- "subvocal.emg.text" (Subvocalization Patch)
- "acoustic.vibration.touch" (Smart Table IBN)
- "emg.muscle.twitches" (EMG Wristband)
- "haptic.shape_memory.tactile" (Haptic Bead)
- "audio.directional.ultrasonic" (Hearable)

Return ONLY a valid JSON object strictly conforming to this structure:
{
  "verb": "one of the DMWE Verbs",
  "target": "one of the DMWE Targets",
  "modifiers": ["one or more of the DMWE Modifiers"],
  "confidence": number (between 0.70 and 0.99),
  "suggestedCapability": string,
  "explanation": string,
  "fastPathEligible": boolean
}`
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response from Gemini.");
      }
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (err: any) {
      console.error("Gemini Intent Parse Error:", err);
      res.status(500).json({
        error: "Failed to parse intent with Gemini AI",
        details: err.message
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MeshOS Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
