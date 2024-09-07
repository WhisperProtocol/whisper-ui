import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';
import { KycProvider } from '../context/KycContext';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider 
          modalSize='compact'
          theme={lightTheme({
            overlayBlur: 'small',
            accentColor: '#4ec0e8',
            accentColorForeground: '#1a1a1a',
          })}
        >
          <KycProvider>
            <Component {...pageProps} />
          </KycProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
