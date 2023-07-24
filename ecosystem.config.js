module.exports = {
  apps : [{
    name: 'backend',
    script: 'yarn run start:dev',
    cwd: 'backend'
  }, {
    name: 'frontend',
    script: 'yarn run dev',
    cwd: 'frontend'
  }],
};
