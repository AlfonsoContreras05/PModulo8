require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./config/database');
require('./models');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/status', (req, res) => res.json({ status: 'success', message: 'Servidor activo', data: { uptime: process.uptime() } }));
app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/upload', uploadRoutes);
app.use('/pedidos', orderRoutes);
app.use((req, res) => res.status(404).json({ status: 'error', message: 'Ruta no encontrada', data: null }));
app.use(errorHandler);

async function start() {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
}
start().catch((error) => { console.error('No fue posible iniciar:', error.message); process.exit(1); });
