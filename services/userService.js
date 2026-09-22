const { Op, QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { User, Order } = require('../models');
const bcrypt = require('bcryptjs');

const safeAttributes = ['id', 'nombre', 'email', 'activo', 'createdAt', 'updatedAt'];

async function getUsers(nombre) {
  const where = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : {};
  return User.findAll({ where, attributes: safeAttributes, order: [['id', 'ASC']] });
}

async function getUsersRawSQL() {
  return sequelize.query(
    'SELECT id, nombre, email, activo, "createdAt", "updatedAt" FROM usuarios ORDER BY id ASC',
    { type: QueryTypes.SELECT }
  );
}

async function getUserWithOrders(id) {
  return User.findByPk(id, {
    attributes: safeAttributes,
    include: [{ model: Order, as: 'pedidos' }],
  });
}

async function createUser(data) {
  const { nombre, email, password } = data;
  if (!nombre || !email || !password) throw new Error('nombre, email y password son obligatorios');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ nombre, email, password: hashedPassword });
  return User.findByPk(user.id, { attributes: safeAttributes });
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;
  const allowed = ['nombre', 'email', 'activo'];
  const changes = {};
  allowed.forEach((field) => {
    if (data[field] !== undefined) changes[field] = data[field];
  });
  await user.update(changes);
  return User.findByPk(id, { attributes: safeAttributes });
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) return false;
  await user.destroy();
  return true;
}

async function createUserAndOrder(data, forceError = false) {
  return sequelize.transaction(async (transaction) => {
    const userData = { ...data.user };
    if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);
    const user = await User.create(userData, { transaction });
    if (forceError) throw new Error('Error forzado para demostrar ROLLBACK');
    const order = await Order.create({ ...data.order, userId: user.id }, { transaction });
    return { user: { id: user.id, nombre: user.nombre, email: user.email }, order };
  });
}

module.exports = { getUsers, getUsersRawSQL, getUserWithOrders, createUser, updateUser, deleteUser, createUserAndOrder };
