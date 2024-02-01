/* eslint-disable */
import { removeFailure, throwFailure } from '~lib/state';
import { GamePlatform } from '~type/game';
import { FailureType } from '~type/state';

import pkg from '../package.json';

import { Game } from '~game';

// Web3 wallet LOGIC: 

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi1'

import { arbitrum } from 'viem/chains'

// 1. Define constants
const projectId = '25c26fd34edf969870ce0e54e30eb6db'

// 2. Create wagmiConfig
const metadata = {
  name: 'DealerWave | Web3Modal by medicinestore.xyz',
  description: 'Web3Modal for DealerWave game by medicinestore.xyz',
  url: 'https://medicinestore.xyz',
  icons: ['https://medicinestore.xyz/pills-bg.png']
}

const chains = [ arbitrum ]
// const chains = [ { ...arbitrum, id: arbitrum?.id?.toString()} ]
// @ts-ignore
const config = defaultWagmiConfig({ chains, projectId, metadata })
// @ts-ignore
const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

window.modal = modal

// GAME LOGIC:

const game = new Game();

if (ENV_MODE === GamePlatform.DEVELOPMENT) {
  window.GAME = game;
}

const checkScreenOrientation = (event?: MediaQueryListEvent) => {
  if (event ? event.matches : window.innerWidth >= window.innerHeight) {
    removeFailure(FailureType.BAD_SCREEN_SIZE);
  } else {
    throwFailure(FailureType.BAD_SCREEN_SIZE);
  }
};

checkScreenOrientation();
window.matchMedia('(orientation: landscape)')
  .addEventListener('change', checkScreenOrientation);

console.clear();
console.log([
  `Created by ${pkg.author.name} / ${pkg.author.url}`,
  `Reskinned by MedicineStore.XYZ / https://medicinestore.xyz`,
  `Build v${pkg.version}-${ENV_MODE}`,
  `Open-Source at ${pkg.repository.url.replace('git+', '')}`,
].join('\n'));
