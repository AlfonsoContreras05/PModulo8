const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcion: { type: DataTypes.STRING(200), allowNull: false },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
  estado: { type: DataTypes.ENUM('pendiente', 'pagado', 'cancelado'), defaultValue: 'pendiente' },
}, {
  tableName: 'pedidos',
  timestamps: true,
});

module.exports = Order;
