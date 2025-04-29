// server/routes/api.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Rota para enviar respostas do formulário
router.post('/forms', async (req, res) => {
  try {
    const newForm = new Form({
      responses: req.body
    });

    const form = await newForm.save();
    res.status(201).json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para obter todas as respostas
router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para deletar todas as respostas
router.delete('/forms', async (req, res) => {
  try {
    await Form.deleteMany({});
    res.json({ message: 'Todos os dados foram excluídos com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;