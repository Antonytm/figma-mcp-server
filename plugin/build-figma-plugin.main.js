const path = require('path');

module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    define: {
      global: 'globalThis'
    },
    platform: 'node',
    mainFields: ['browser', 'module', 'main', 'node'],
    resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx']
  }
}

