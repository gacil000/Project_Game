import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import HomeScene from './scenes/HomeScene.js';
import GameScene from './scenes/GameScene.js';
import UIScene from './scenes/UIScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  backgroundColor: '#0b0b10',
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: { 
      debug: false,
      gravity: { y: 0 },
      fps: 60
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom: {
    createContainer: true
  },
  fps: {
    target: 60,
    forceSetTimeOut: true
  },
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true
  },
  scene: [BootScene, PreloadScene, HomeScene, GameScene, UIScene, ErrorScene]
};

window.EOL = window.EOL || {};
window.EOL.storageKey = 'eol_fragments';
window.EOL.upgradeKey = 'eol_upgrades';

const game = new Phaser.Game(config);

export default game;
