module.exports = {
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    enabled: process.env.LOGGER_ENABLED || true,
  },
};
