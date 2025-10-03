const express = require('express');
const supabase = require('../supabase');
const router = express.Router();

// Obtener todos
router.get('/', async (_req, res) => {
    const { data, error } = await supabase.from('qr').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json({
        message: 'Listado obtenido correctamente.',
        data
  });
});

// Obtener uno por id
router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    const { data, error } = await supabase.from('qr').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: error.message });
    res.json({
        message: `QR con id ${id} obtenida correctamente.`,
        data
  });
});


module.exports = router;
