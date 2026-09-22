require('dotenv').config();
const { sequelize } = require('../config/database');
const { User, Order } = require('../models');
(async () => {
  try {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate([
      { nombre: 'Juan Pérez', email: 'juan@example.com', password: 'demo123' },
      { nombre: 'Ana Soto', email: 'ana@example.com', password: 'demo123' },
      { nombre: 'Pedro Díaz', email: 'pedro@example.com', password: 'demo123' }
    ]);
    await Order.bulkCreate([
      { descripcion: 'Pedido de prueba A', total: 15990, userId: users[0].id },
      { descripcion: 'Pedido de prueba B', total: 24990, userId: users[0].id },
      { descripcion: 'Pedido de prueba C', total: 9990, userId: users[1].id }
    ]);
    console.log('Seed completado: 3 usuarios y 3 pedidos.');
  } catch (e) { console.error(e); } finally { await sequelize.close(); }
})();
