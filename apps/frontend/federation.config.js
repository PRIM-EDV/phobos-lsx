const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'phobos-lsx',

  exposes: {
    './Component': './src/app/app.component.ts',
    './Routes': './src/app/app.routes.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', }),
    '@phobos/core': { requiredVersion: 'auto', import: '@phobos/core', singleton: true },
  },


  skip: [
    '@phobos/elements',
    '@phobos-lsx/protocol',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: false
  }

});
