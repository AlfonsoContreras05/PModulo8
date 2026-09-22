const service = require('../services/orderService');
const ok = (res, message, data, status = 200) => res.status(status).json({ status: 'success', message, data });
exports.list = async (req,res,next) => { try { ok(res,'Pedidos obtenidos correctamente',await service.getOrders()); } catch(e){next(e);} };
exports.create = async (req,res,next) => { try { ok(res,'Pedido creado correctamente',await service.createOrder(req.body),201); } catch(e){next(e);} };
exports.update = async (req,res,next) => { try { const x=await service.updateOrder(req.params.id,req.body); if(!x)return res.status(404).json({status:'error',message:'Pedido no encontrado',data:null}); ok(res,'Pedido actualizado correctamente',x); } catch(e){next(e);} };
exports.remove = async (req,res,next) => { try { if(!(await service.deleteOrder(req.params.id)))return res.status(404).json({status:'error',message:'Pedido no encontrado',data:null}); ok(res,'Pedido eliminado correctamente',null); } catch(e){next(e);} };
