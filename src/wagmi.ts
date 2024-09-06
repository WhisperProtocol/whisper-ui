import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import { cookieStorage, createStorage } from 'wagmi';
import {
  arbitrumSepolia,
  hederaTestnet,
  rootstockTestnet,
  morphHolesky,
  optimismSepolia,
  baseSepolia,
  sepolia,
  hardhat
} from 'wagmi/chains';

const Inco = {
  id: 9_090,
  name: 'Inco Testnet',
  nativeCurrency: {name: 'Inco', symbol: 'INCO', decimals: 18},
  rpcUrls: {
    default: { http: ['https://testnet.inco.org']}
  },
  blockExplorers: {
    default: { name: 'Inco Testnet Explorer', url: 'https://explorer.testnet.inco.org' },
  }
} as const satisfies Chain

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    baseSepolia,
    sepolia,
    arbitrumSepolia,
    hederaTestnet,
    rootstockTestnet,
    morphHolesky,
    optimismSepolia,
    hardhat,
    Inco
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  })
});