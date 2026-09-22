const { Order } = require('../models');

async function getOrders() {
  return Order.findAll({ order: [['id', 'ASC']] });
}
async function createOrder(data) {
  const { descripcion, total, userId, estado } = data;
  if (!descripcion || total === undefined || !userId) throw new Error('descripcion, total y userId son obligatorios');
  return Order.create({ descripcion, total, userId, estado });
}
async function updateOrder(id, data) {
  const order = await Order.findByPk(id);
  if (!order) return null;
  const allowed = ['descripcion', 'total', 'estado'];
  const changes = {};
  allowed.forEach((f) => { if (data[f] !== undefined) changes[f] = data[f]; });
  return order.update(changes);
}
async function deleteOrder(id) {
  const order = await Order.findByPk(id);
  if (!order) return false;
  await order.destroy();
  return true;
}
module.exports = { getOrders, createOrder, updateOrder, deleteOrder };
