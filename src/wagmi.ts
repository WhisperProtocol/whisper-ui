import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import { cookieStorage, createStorage } from 'wagmi';
import {
  holesky,
  rootstockTestnet,
  morphHolesky,
  hardhat
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    holesky,
    rootstockTestnet,
    morphHolesky,
    hardhat,
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  })
});