'use client';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, polygonMumbai, goerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
});

export default function WalletConfigWrapper({
  children
}: React.PropsWithChildren) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
