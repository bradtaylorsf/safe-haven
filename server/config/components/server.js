module.exports = {
  server: {
    port: process.env.PORT,
    domain: process.env.DOMAIN || 'www.safe-haven.com',
    env: process.env.NODE_ENV,
  },
};
