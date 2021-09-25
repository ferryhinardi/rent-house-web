// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const withTM = require('next-transpile-modules')(['react-native-vector-icons', 'rn-placeholder', 'react-native-toast-message']); // https://github.com/vercel/next.js/issues/12481#issuecomment-623703081

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
const ANALYZE = process.env.ANALYZE;

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
  withTM({
    // Issue dynamic route when deploy static page in digital ocean
    // https://www.digitalocean.com/community/questions/next-js-static-site-requires-html-extension-in-url-for-dynamic-routes
    trailingSlash: true,
    reactStrictMode: true,
    images: {
      domains: ['theryna.sgp1.cdn.digitaloceanspaces.com'],
    },
    webpack: (config, { dev, isServer, webpack }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: dev,
        }),
      );

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Transform all direct `react-native` imports to `react-native-web`
        'react-native$': 'react-native-web',
      }
      config.module.rules.push({
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      })

      // https://medium.com/ne-digital/how-to-reduce-next-js-bundle-size-68f7ac70c375
      if (ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          })
        );
      }
      config.plugins.push(new DuplicatePackageCheckerPlugin());
      config.resolve.alias['fast-deep-equal'] = path.resolve(
        __dirname,
        'node_modules',
        'fast-deep-equal'
      )
      config.resolve.extensions = [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions,
      ]
      return config
    },
  }),
  SentryWebpackPluginOptions
);
