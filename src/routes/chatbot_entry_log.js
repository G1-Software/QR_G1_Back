const express = require("express");
const supabase = require("../supabase");
require("dotenv").config();

const router = express.Router();

// Crear uno
router.post("/", async (req, res) => {
  try {
    const { qr_id } = req.body;

    if (!qr_id) {
      return res.status(400).json({ error: "qr_id es requerido" });
    }

    const { data, error } = await supabase
      .from("chatbot_entry_log")
      .insert([{ qr_id }])
      .select();

    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({ error: "Error insertando log" });
    }

    return res.json({
      message: "Log de entrada registrado correctamente",
      data,
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("chatbot_entry_log")
      .select("*")
      .order("entry_date", { ascending: false }); // opcional: último primero

    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({ error: "Error obteniendo logs" });
    }

    return res.json({
      message: "Logs obtenidos correctamente",
      data,
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
