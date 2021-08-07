const withTM = require('next-transpile-modules')(['react-native-vector-icons']);

module.exports = withTM({
  // Issue dynamic route when deploy static page in digital ocean
  // https://www.digitalocean.com/community/questions/next-js-static-site-requires-html-extension-in-url-for-dynamic-routes
  trailingSlash: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]
    return config
  },
});
