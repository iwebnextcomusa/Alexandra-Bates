import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Safe initialize Gemini API
  let ai: any = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI successfully initialized for chatbot.");
  } else {
    console.log("Gemini API key missing or set to placeholder. Chatbot will run in fallback simulation mode.");
  }

  // Secure AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!ai) {
        // Simulated local fallback responses for smooth offline preview
        const lowerMsg = message.toLowerCase();
        let fallbackReply = "Thank you for asking! Alexandra's mountain workshop is active. To enable full AI intelligence, please enter your GEMINI_API_KEY in the Secrets panel in AI Studio.";
        
        if (lowerMsg.includes("custom") || lowerMsg.includes("bespoke") || lowerMsg.includes("make") || lowerMsg.includes("commission")) {
          fallbackReply = "Alexandra loves collaborating on custom pieces! Her design process involves a personal consultation, full hand-rendered sketches, custom-sourced stones (like teal sapphires and local quartz), and local carving and metal handcrafting right here in Nelson, BC. You can fill out the Custom Jewellery Inquiry form on our 'Custom' page to get started!";
        } else if (lowerMsg.includes("contact") || lowerMsg.includes("phone") || lowerMsg.includes("email") || lowerMsg.includes("location") || lowerMsg.includes("where")) {
          fallbackReply = "We would love to talk to you! You can reach Alexandra Bates Jewellery directly at 403-629-4300, or by emailing atbates4@gmail.com. Our studio is located in the mountain community of Nelson, British Columbia, and appointments can be scheduled online.";
        } else if (lowerMsg.includes("ring") || lowerMsg.includes("sapphire") || lowerMsg.includes("aquamarine")) {
          fallbackReply = "Our featured rings are the Kootenay Shore Sapphire Ring ($1,850) with a teal sapphire set in textured 14k gold and the Glacier Stream Aquamarine Ring ($2,100). Both capture the natural elements of British Columbia. You can view them and inquire directly on our 'Collections' page!";
        } else if (lowerMsg.includes("necklace") || lowerMsg.includes("fern") || lowerMsg.includes("earring") || lowerMsg.includes("bracelet") || lowerMsg.includes("cuff")) {
          fallbackReply = "Alexandra offers exquisite organic collections! The Nelson Forest Fern Pendant ($420) is cast directly from a natural wild forest fern into 925 sterling silver. The Slocan Slate Cuff ($780) is heavily carved like the stratified stones of the Kootenay peaks. Explore our Collections tab to see details!";
        } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
          fallbackReply = "Welcome! I'm your virtual concierge for Alexandra Bates Jewellery in Nelson, BC. I can answer questions about our collections, custom bespoke options, caring for our metals, or how to contact our workshop. What can I assist you with today?";
        }
        return res.json({ reply: fallbackReply });
      }

      const systemInstruction = `You are the elegant and welcoming AI Concierge for Alexandra Bates Jewellery, a luxury handcrafted jewellery brand based in the beautiful mountain forest city of Nelson, British Columbia, Canada.
Your goal is to assist customers with inquiries about Alexandra's collections, custom bespoke creations, ethical gemstone sourcing, metalwork techniques, or booking consultations.
Keep your tone elegant, warm, authentic, artistic, and professional. Avoid looking like a pushy salesman; represent the slow-crafted, artisanal nature of the work.

Alexandra Bates Jewellery business profile:
- Artist Name: Alexandra Bates
- Specialty: Traditional, hand-hammered metallurgy, unique sand-castings, direct organic casting (such as wild ferns), and rough organic gemstone settings.
- Location: Nelson, British Columbia, Canada.
- Phone: 403-629-4300
- Email: atbates4@gmail.com
- Main Collections:
  * "Kootenay Shore Sapphire Ring" - Teal blue sapphire, textured 14k yellow gold wave band ($1,850).
  * "Nelson Forest Fern Pendant" - Direct cast of a real wild pine forest fern, oxidised sterling silver ($420).
  * "Kokanee Peak Quartz Earrings" - Locally sourced double-terminated quartz crystals on sterling hooks ($380).
  * "Slocan Slate Cuff" - Bold, tactile sterling silver with geological strata textures ($780).
  * "Valhalla Emerald Drops" - Pear emeralds suspended from 18k yellow gold pine sprig mounts ($1,240).
  * "Glacier Stream Aquamarine Ring" - Ice-blue aquamarine with a liquid gold & silver band ($2,100).
  * "Moss Agate Bespoke Band" - Handcrafted leaf details enclosing a magical green moss agate ($1,950).
- The Custom Process:
  1. Consultation (discuss budget, stones, styles).
  2. Sketches & Wax carving (rendering profiles, hand-carving wax prototypes).
  3. Gemstone Sourcing (ethically sourced stones, custom lapidaries).
  4. Handcrafting & Hand-polishing in Nelson workshop.
- Care instructions: Clean with warm, soapy water and a soft toothbrush. Avoid harsh chemicals or ultrasonic cleaners on soft crystals like local quartz or opals.

Please answer the customer's question directly, keeping answers within 2-4 sentences. Keep the formatting neat and warm.`;

      // Map chat history so Gemini receives past messages for multi-turn chat
      const contents = [];
      if (history && Array.isArray(history)) {
        // Slice to keep context lightweight (last 6 messages)
        const recentHistory = history.slice(-6);
        for (const msg of recentHistory) {
          contents.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I apologize, I wasn't able to process that request. Let me know how else I can help you with your jewellery inquiries!";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Failed to generate AI response: " + error.message });
    }
  });

  // serve static build or mount Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production assets mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Alexandra Bates Jewellery full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
