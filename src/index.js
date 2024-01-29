import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  arbitrum,
  polygon,
  base,
  bsc,
  zkSync,
  pulsechain,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  argentWallet,
  trustWallet,
  imTokenWallet,
  tokenPocketWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';

const { chains, publicClient } = configureChains(
  [mainnet, bsc, polygon, arbitrum, zkSync, base],
  [
    alchemyProvider({ apiKey: 'ekZhZsGjfWuK39pYW_YXSEcRKDN8amSN' }),
    publicProvider()
  ]
);

// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended',
//     wallets: [
//       injectedWallet({ chains }),
//       metaMaskWallet({ projectId, chains }),
//       walletConnectWallet({ projectId, chains }),
//     ],
//   },
// ]);

const projectId = 'fe62b424c4ab666f47d64744e0b3dca0';

const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: 'walletConnect' }),
      walletConnectWallet({ projectId, chains }),
      argentWallet({ projectId, chains }),
      trustWallet({projectId, chains}),
      imTokenWallet({projectId, chains}),
      tokenPocketWallet({projectId, chains})
    ],
  },
]);

// const { connectors } = getDefaultWallets({
//   appName: 'walletConnect',
//   projectId: 'fe62b424c4ab666f47d64744e0b3dca0',
//   chains
// });

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

reportWebVitals();
