'use client';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';

const { provider, webSocketProvider } = configureChains(
  [mainnet, polygon, polygonMumbai, goerli],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
});

export default function WalletConfigWrapper({
  children
}: React.PropsWithChildren) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
