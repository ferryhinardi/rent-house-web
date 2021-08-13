import '../styles/globals.css'
import { QueryClientProvider, QueryClient, QueryCache } from 'react-query';
import type { AppProps } from 'next/app'
import createLocalization from 'utils/createLocalization';

createLocalization();

const queryCache = new QueryCache();
const queryClient = new QueryClient({ queryCache });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
export default MyApp