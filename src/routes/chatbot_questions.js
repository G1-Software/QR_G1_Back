const express = require("express");
const axios = require("axios");
const supabase = require("../supabase");
const detectTopic = require("../services/topic_detector.service");
require("dotenv").config();

const router = express.Router();

// Crear mensaje en Chatbase y guardarlo en Bdd
router.post("/message", async (req, res) => {
  try {
    const { message, qr_id } = req.body;

    if (!message || !qr_id) {
      return res.status(400).json({ error: "Falta message o qr_id" });
    }

    const response = await axios.post(
      "https://www.chatbase.co/api/v1/chat",
      {
        messages: [{ role: "user", content: message }],
        chatbotId: process.env.CHATBASE_CHATBOT_ID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHATBASE_API_KEY}`,
        },
      }
    );

    const botReply = response.data.text;

    const genericResponses = [
      "Lo siento, no tengo información específica al respecto.",
    ];
    const answered = !genericResponses.some((text) => botReply.includes(text));

    const { error } = await supabase.from("chatbot_questions").insert({
      qr_id,
      content: message,
      answered,
      topic: detectTopic(message),
    });

    if (error) console.error("Error guardando pregunta:", error);

    return res.json({
      reply: botReply,
      answered,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al procesar la pregunta" });
  }
});

// Obtener todas las preguntas
router.get("/all", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("chatbot_questions")
      .select("*")
      .order("created_at", { ascending: true }); // opcional: orden por fecha

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener todas las preguntas" });
  }
});

module.exports = router;
