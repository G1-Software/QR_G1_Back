const express = require("express");
const supabase = require("../supabase");
const detectTopic = require("../services/topic_detector.service");
require("dotenv").config();
const jwtCheck = require('../middleware/auth0');

const router = express.Router();

// Recibir pregunta y guardarla en la bdd
router.post("/question", async (req, res) => {
  try {
    const { question, qr_id, is_answered } = req.body;

    if (!question || !qr_id) {
      return res
        .status(400)
        .json({ error: "Los campos question y qr_id son obligatorios." });
    }

    const { error } = await supabase.from("chatbot_questions").insert({
      qr_id,
      question,
      question_topic: detectTopic(question),
      is_answered,
    });

    if (error) console.error("Error guardando la pregunta:", error);

    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar la pregunta" });
  }
});

// Obtener todas
router.get("/", jwtCheck, async (_req, res) => {
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
