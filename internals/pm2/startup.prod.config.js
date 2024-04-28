const path = require('path');
const APP_PATH = path.resolve(__dirname, '../../dist/main.js');

module.exports = {
  apps: [
    {
      name: 'kyungbiseo-server',
      script: APP_PATH,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
