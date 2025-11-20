const express = require("express");
const axios = require("axios");
const supabase = require("../supabase");
const detectTopic = require("../services/topic_detector.service");
require("dotenv").config();

const router = express.Router();

// Hacer pregunta y guardarla en la bdd
router.post("/question", async (req, res) => {
  try {
    const { question, qr_id } = req.body;

    if (!question || !qr_id) {
      return res.status(400).json({ error: "Los campos question y qr_id son obligatorios." });
    }
    const response = await axios.post(
      "https://www.chatbase.co/api/v1/chat",
      {
        messages: [{ role: "user", content: question }],
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
      "Lo siento, no encontré información oficial sobre tu pregunta. ¿Te puedo ayudar en algo más?",
    ];
    
    const is_answered = !genericResponses.some((txt) => botReply.includes(txt));
    
    const { error } = await supabase.from("chatbot_questions").insert({
      qr_id,
      question: question,
      question_topic: detectTopic(question),
      is_answered,
    });

    if (error) console.error("Error guardando la pregunta:", error);

    return res.json({
      reply: botReply,
      is_answered,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al procesar la pregunta" });
  }
});

// Obtener todas
router.get("/", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("chatbot_questions")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las preguntas" });
  }
});

module.exports = router;