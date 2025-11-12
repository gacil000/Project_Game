# Quick Start Guide - Echo of Light

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```
This will download Phaser 3.70.0 into `node_modules/`.

### 2. Run Local Server
```bash
npm start
```
This starts a local HTTP server on `http://localhost:8080`

### 3. Open in Browser
Navigate to: **http://localhost:8080**

---

## Game Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** | Move player |
| **SPACE** | Attack enemies |
| **Mouse** | Click buttons in menus |

---

## Game Flow

1. **Boot Scene** → Quick initialization
2. **Preload Scene** → Loads all assets with progress bar
3. **Home Scene** → Main menu, buy upgrades with fragments
4. **Game Scene** → Procedural dungeon, fight enemies, collect fragments
5. **UI Scene** → Overlay HUD showing health, fragments, and minimap
6. **Error Scene** → Shows if critical error occurs

---

## Key Features

- 🎮 **Procedural Rooms** — Each run has a randomly generated 10×10 dungeon
- 💪 **Upgrade System** — Spend fragments to boost HP, ATK before runs
- 👾 **Enemy AI** — Basic pathfinding toward player within range
- 🏥 **Health System** — Take damage, go invulnerable briefly on hit
- 🔦 **Lighting** — Dynamic light effect around player
- 📊 **Persistent Progress** — Fragments and upgrades saved to localStorage
- 🎨 **Pixel Art** — Crisp rendering optimized for retro aesthetic

---

## Common Issues & Fixes

### Issue: Assets not loading (see fallback graphics)
**Cause:** Missing sprite sheets or UI images  
**Fix:** Ensure all asset files exist in the correct paths:
- `assets/ui/PNG/Blue/Default/blue_button*.png`
- `assets/ui/PNG/Grey/Default/grey_*.png`
- `assets/ui/Sounds/*.ogg`

### Issue: Game won't start
**Cause:** Phaser not loaded  
**Fix:** Check browser console (F12) for errors. Ensure `npm install` was run.

### Issue: Sound not playing
**Cause:** Audio files missing or browser not supporting format  
**Fix:** Verify audio files exist. Try `.ogg` format (Phaser will try alternative formats).

### Issue: Controls not responding
**Cause:** Focus not on window  
**Fix:** Click the game area first, then use arrow keys.

---

## Next Steps

1. ✅ **Run `npm install`** — Install Phaser dependency
2. ✅ **Run `npm start`** — Start local server
3. ✅ **Test the game** — Play through a run to check functionality
4. 📋 **Read CODE_REVIEW_AND_FIXES.md** — See all bugs that were fixed
5. 🚀 **Phase 2 Improvements** — See feature recommendations in review

---

## File Structure Quick Reference

```
echo of light/
├── index.html              # Entry point (loads Phaser + main.js)
├── package.json            # Dependencies (Phaser 3.70+)
├── src/
│   ├── main.js            # Game config + Phaser initialization
│   ├── scenes/
│   │   ├── BootScene.js          # Quick setup
│   │   ├── PreloadScene.js       # Asset loading + progress bar
│   │   ├── HomeScene.js          # Main menu + upgrades
│   │   ├── GameScene.js          # Main gameplay loop
│   │   ├── UIScene.js            # HUD overlay + minimap
│   │   └── ErrorScene.js         # Error display
│   ├── systems/
│   │   ├── AudioManager.js       # (Currently unused - for future)
│   │   └── ParallaxBackground.js # (Currently unused - for future)
│   └── utils/
│       └── AssetLoader.js        # Fallback graphics/audio if assets fail
├── assets/
│   ├── audio/    # Sound effects & BGM
│   ├── backgrounds/
│   ├── characters/
│   ├── icons/
│   ├── items/
│   ├── sprites/  # Character & enemy animations
│   ├── tiles/
│   ├── tilesets/
│   └── ui/       # UI components from Kenney Pack
└── README.md     # Project description
```

