import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Hydrate } from 'react-query/hydration';
import { QueryClientProvider, useQueryErrorResetBoundary, QueryClient, QueryCache } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { captureMessage, Severity } from '@sentry/browser';
import Toast from 'react-native-toast-message';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorPage } from 'components';
import createLocalization from 'utils/createLocalization';
import NProgress from 'components/NProgress';
import { Token } from 'core';
import '../styles/globals.css';
import '../sentry.client.config';

createLocalization();

// https://react-query.tanstack.com/guides/ssr
const queryCache = new QueryCache();
const queryClientOptions = {
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => <ErrorPage onRetry={resetErrorBoundary} />}
      onError={(error, info) => {
        captureMessage(error.message, {
          extra: {
            componentStack: info.componentStack,
          },
          level: Severity.Error,
          contexts: {
            react: info,
            metadata: {
              errorKind: 'page_error',
            },
          },
        });
      }}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <NProgress color={Token.colors.gold} startPosition={0.3} stopDelayMs={200} height={3} showOnShallow />
          <Toast
            ref={(ref) => Toast.setRef(ref)}
            // @ts-ignore
            style={{ position: 'fixed', zIndex: 1 }}
          />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
