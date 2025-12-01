const express = require("express");
const supabase = require("../supabase");
const router = express.Router();
const { handleRequestEmailFlow } = require("../services/email.service");
const jwtCheck = require('../middleware/auth0');

// Obtener todas (con filtros y paginación)
router.get("/", jwtCheck, async (req, res) => {
  const {
    page = 1,
    limit = 10,
    area,
    subarea,
    status,
    startDate,
    endDate,
    institution,
    building,
    floor,
    service,
    room,
    bed,
  } = req.query;

  const from = (page - 1) * limit;
  const to = from + Number(limit) - 1;

  try {
    let query = supabase
      .from("vw_request_with_qr")
      .select("*", { count: "exact" });

    // Filtros viejos
    if (area) query = query.eq("area", area);
    if (subarea) query = query.eq("subarea", subarea);
    if (status) query = query.eq("status", status);

    // Fechas
    if (startDate && endDate) {
      const adjustedEnd = new Date(endDate);
      adjustedEnd.setDate(adjustedEnd.getDate() + 1);
      adjustedEnd.setMilliseconds(adjustedEnd.getMilliseconds() - 1);

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

    // Nuevos filtros de QR
    if (institution) query = query.eq("institution", institution);
    if (building) query = query.eq("building", building);
    if (floor) query = query.eq("floor", Number(floor));
    if (service) query = query.eq("service", service);
    if (room) query = query.eq("room", Number(room));
    if (bed) query = query.eq("bed", Number(bed));

    // Orden y paginación
    query = query
      .range(from, to)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: "Listado obtenido correctamente.",
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
      },
      data,
    });
  } catch (err) {
    console.error("Error obteniendo requests:", err);
    return res.status(400).json({ error: "Error interno del servidor." });
  }
});

router.get("/filters/qr-options", async (req, res) => {
  try {
    const fields = [
      "institution",
      "building",
      "floor",
      "service",
      "room",
      "bed",
    ];

    const responses = await Promise.all(
      fields.map((field) =>
        supabase.from("qr").select(field, { distinct: true })
      )
    );

    const result = {};

    fields.forEach((field, i) => {
      const { data, error } = responses[i];

      if (error) {
        console.error(`Error en campo ${field}:`, error);
        return res.status(400).json({ error: error.message });
      }

      result[field] = [...new Set(data.map((row) => row[field]))].sort();
    });

    return res.json({
      message: "Opciones de filtros obtenidas correctamente.",
      data: result,
    });
  } catch (err) {
    console.error("Error general:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Obtener una por id
router.get("/:id", jwtCheck, async (req, res) => {
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
router.put("/:id", jwtCheck, async (req, res) => {
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
router.delete("/:id", jwtCheck, async (req, res) => {
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
