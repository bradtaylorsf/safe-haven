const instances = process.env.WEB_CONCURRENCY || -1;
const maxMemory = process.env.WEB_MEMORY || 512;

module.exports = {
  apps: [{
    name: 'www',
    script: './build-scripts/www',
    watch: true,
    instances,
    exec_mode: 'cluster',
    max_memory_restart: `${maxMemory}M`,
  }],
};
