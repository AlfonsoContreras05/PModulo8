module.exports = (err, req, res, next) => {
  console.error(err.message);
  let statusCode = 500;
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') statusCode = 400;
  if (err.message && (err.message.includes('obligatorios') || err.message.includes('Tipo de archivo'))) statusCode = 400;
  if (err.code === 'LIMIT_FILE_SIZE') { statusCode = 413; err.message = 'Archivo demasiado grande. Máximo 5 MB'; }
  res.status(statusCode).json({ status: 'error', message: err.message || 'Error interno del servidor', data: null });
};
