const path = require('path');

module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    define: {
      global: 'window'
    },
    platform: 'browser',
    mainFields: ['browser', 'module', 'main'],
    resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx'],
  }
}
