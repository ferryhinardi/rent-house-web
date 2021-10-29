import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Hydrate } from 'react-query/hydration';
import { QueryClientProvider, QueryClient, QueryCache } from 'react-query';
import Toast from 'react-native-toast-message';
import { ReactQueryDevtools } from 'react-query/devtools';
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
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NProgress
          color={Token.colors.gold}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow
        />
        <Toast
          ref={(ref) => Toast.setRef(ref)}
          // @ts-ignore
          style={{ position: 'fixed', zIndex: 1 }}
        />
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;