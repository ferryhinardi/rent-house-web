// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_DSN_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_DSN_ENVIRONMENT;

Sentry.init({
  dsn: SENTRY_DSN || 'https://c6fb2e33fef54dd4a5bfd6386c365ad4@o934296.ingest.sentry.io/5883687',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  environment: SENTRY_DSN_ENVIRONMENT,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
