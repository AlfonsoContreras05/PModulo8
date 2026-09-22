const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '..', 'logs', 'access.log');
module.exports = (req, res, next) => {
  const line = `${new Date().toISOString()} | ${req.method} ${req.originalUrl}\n`;
  fs.appendFile(logPath, line, () => {});
  next();
};
