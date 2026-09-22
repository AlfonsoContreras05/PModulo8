const User = require('./User');
const Order = require('./Order');

// Relación 1:N: un usuario puede tener muchos pedidos.
User.hasMany(Order, { foreignKey: 'userId', as: 'pedidos', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

module.exports = { User, Order };
