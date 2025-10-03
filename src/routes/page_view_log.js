const express = require('express');
const supabase = require('../supabase');
const router = express.Router();

// Obtener todos
router.get('/', async (_req, res) => {
    const { data, error } = await supabase.from('page_view_log').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json({
        message: 'Listado obtenido correctamente.',
        data
    });
});

// Obtener uno por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('page_view_log').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: error.message });
    res.json({
        message: `Page View Log con id ${id} obtenido correctamente.`,
        data
    });
});

// Crear uno
router.post('/', async (req, res) => {
    const body = req.body; 
    const { data, error } = await supabase.from('page_view_log').insert(body).select().single();
    if (error) return res.status(400).json({ error: error.message });
    res.json({
        message: 'Page View Log creado correctamente.',
        data
    });
});

module.exports = router;
