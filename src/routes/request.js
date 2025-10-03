const express = require('express');
const supabase = require('../supabase');
const router = express.Router();

// Obtener todas
router.get('/', async (_req, res) => {
    const { data, error } = await supabase.from('request').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json({
        message: 'Listado obtenido correctamente.',
        data
    });
});

// Obtener una por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('request').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: error.message });
    res.json({
        message: `Request con id ${id} obtenida correctamente.`,
        data
    });
});

// Crear una
router.post('/', async (req, res) => {
    const body = req.body; 
    const { data, error } = await supabase.from('request').insert(body).select().single();
    if (error) return res.status(400).json({ error: error.message });
    res.json({
        message: 'Request creada correctamente.',
        data
    });
});

// Actualizar una
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { data, error } = await supabase.from('request').update(body).eq('id', id).select().single();
    if (error) return res.status(400).json({ error: error.message });
    res.json({
        message: `Request con id ${id} actualizada correctamente.`,
        data
    });
});

// Eliminar una por id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('request').delete().eq('id', id).select().single();
    if (error) return res.status(400).json({ error: error.message });
    res.json({
        message: `Request con id ${id} eliminada correctamente.`,
        data
    });
});

module.exports = router;
