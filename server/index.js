// server/index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(express.json({ extended: false }));
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://observatorio-da-mulher.vercel.app' 
      : 'http://localhost:3000',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

// Rotas
app.use('/api', require('./routes/api'));

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));