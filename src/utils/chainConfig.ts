export interface ChainConfig {
    contractAddress: string;
    depositValues: { [key: string]: string};
    symbol: string;
}

export const chainConfigs: { [chainId: number]: ChainConfig } = {
  17000: { // Holesky Network
    contractAddress: "0x8817E04D4F6bE869a391B145759B062B3c7BaE85",
    depositValues: {
      a: "0.001",
      b: "0.005",
      c: "0.01",
    },
    symbol: "ETH"
  },

  31: {
    contractAddress: "0x816B0048683588D04C58e5b355Cb8C1Cabc3ae56",
    depositValues: {
        a: "0.000001",
        b: "0.000005",
        c: "0.00001",
    }, // Rootstock Testnet
    symbol: "tRBTC"
  }
}

export const getChainConfig = (chainId: number): ChainConfig => {
  return chainConfigs[chainId];
}