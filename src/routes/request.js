const express = require("express");
const supabase = require("../supabase");
const router = express.Router();
const { handleRequestEmailFlow } = require("../services/email.service");

// Obtener todas (con filtros y paginación)
router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    area,
    subarea,
    status,
    startDate,
    endDate,
  } = req.query;

  const from = (page - 1) * limit;
  const to = from + Number(limit) - 1;

  let query = supabase.from("request").select("*", { count: "exact" });

  if (area) query = query.eq("area", area);
  if (subarea) query = query.eq("subarea", subarea);
  if (status) query = query.eq("status", status);

  if (startDate && endDate) {
    const adjustedEnd = new Date(endDate);
    adjustedEnd.setDate(adjustedEnd.getDate() + 1); // mover al siguiente día
    adjustedEnd.setMilliseconds(adjustedEnd.getMilliseconds() - 1); // último ms del día original

    query = query
      .gte("created_at", startDate)
      .lte("created_at", adjustedEnd.toISOString());
  } else if (startDate) {
    query = query.gte("created_at", startDate);
  } else if (endDate) {
    const adjustedEnd = new Date(endDate);
    adjustedEnd.setDate(adjustedEnd.getDate() + 1);
    adjustedEnd.setMilliseconds(adjustedEnd.getMilliseconds() - 1);

    query = query.lte("created_at", adjustedEnd.toISOString());
  }

  query = query.range(from, to).order("created_at", { ascending: false });

  const { data, error, count } = await query;

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message: "Listado obtenido correctamente.",
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count,
      totalPages: Math.ceil(count / limit),
    },
    data,
  });
});

// Obtener una por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("request")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json({
    message: `Request con id ${id} obtenida correctamente.`,
    data,
  });
});

// Crear solicitud
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const { data, error } = await supabase
      .from("request")
      .insert(body)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Request creada correctamente.", data });
    handleRequestEmailFlow(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al crear la solicitud." });
  }
});

// Actualizar una
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updatedBody = {
    ...body,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("request")
    .update(updatedBody)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message: `Request con id ${id} actualizada correctamente.`,
    data,
  });
});

// Eliminar una por id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("request")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({
    message: `Request con id ${id} eliminada correctamente.`,
    data,
  });
});

module.exports = router;