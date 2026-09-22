const userService = require('../services/userService');

const ok = (res, message, data, status = 200) => res.status(status).json({ status: 'success', message, data });

exports.list = async (req, res, next) => {
  try { ok(res, 'Usuarios obtenidos correctamente', await userService.getUsers(req.query.nombre)); } catch (e) { next(e); }
};
exports.listRaw = async (req, res, next) => {
  try { ok(res, 'Usuarios obtenidos mediante SQL manual', await userService.getUsersRawSQL()); } catch (e) { next(e); }
};
exports.detail = async (req, res, next) => {
  try {
    const user = await userService.getUserWithOrders(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado', data: null });
    ok(res, 'Usuario y pedidos obtenidos correctamente', user);
  } catch (e) { next(e); }
};
exports.create = async (req, res, next) => {
  try { ok(res, 'Usuario creado correctamente', await userService.createUser(req.body), 201); } catch (e) { next(e); }
};
exports.update = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado', data: null });
    ok(res, 'Usuario actualizado correctamente', user);
  } catch (e) { next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    if (!(await userService.deleteUser(req.params.id))) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado', data: null });
    ok(res, 'Usuario eliminado correctamente', null);
  } catch (e) { next(e); }
};
exports.transactionDemo = async (req, res, next) => {
  try {
    const result = await userService.createUserAndOrder(req.body, req.query.error === 'true');
    ok(res, 'Transacción completada: usuario y pedido creados', result, 201);
  } catch (e) { next(e); }
};
