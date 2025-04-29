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
   origin: [
     'https://observatorio-da-mulher.vercel.app',
     'https://observatorio-da-mulher-29cd1fwu0-dominicks-projects-20c5fdae.vercel.app'
   ],
   optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rotas
app.use('/', require('./routes/api')); // Changed from '/api' to '/'

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));