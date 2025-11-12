# Echo of Light - Asset Configuration Guide

## Current Asset Status

### ✅ Assets That Exist
- `assets/ui/PNG/Blue/Default/` — Blue button pack (✓ used)
- `assets/ui/PNG/Grey/Default/` — Grey panels and boxes (✓ used)
- `assets/ui/Sounds/` — UI click/tap sounds (✓ used)
- `assets/audio/Owlish Media Sound Effects/` — Various sound libraries (⚠️ partially used)

### ❌ Assets That Are Missing
- `assets/tiles/dungeon.png` — Dungeon tileset sprite
- `assets/sprites/characters.png` — Character spritesheet
- `assets/icons/consumables.png` — Item/consumable icons

### ⚠️ Workarounds Applied
Since critical assets are missing, the game uses **fallback graphics**:
- Missing tiles → Gray rectangle
- Missing characters → Green rectangle with white border
- Missing icons → Yellow rectangle

This allows the game to run without crashes, but visual quality is reduced.

---

## How to Add Missing Assets

### Option A: Find Free Assets Online

#### 1. Character Sprites (16×16 pixel art)
Download from:
- **OpenGameArt.org** — Free pixel art library
- **Itch.io** — Game asset packs
- **Kenney Assets** — High-quality free game art

Requirements:
- Format: PNG with transparency
- Frame size: 16×16 pixels
- Should include idle + walk animations in all 4 directions

**Where to place:** `assets/sprites/characters.png`

#### 2. Dungeon Tileset (16×16 tiles)
Look for:
- Dungeon/fantasy tileset PNG
- Should include wall, floor, door variations
- Typical size: 256×256 or 512×512

**Where to place:** `assets/tiles/dungeon.png`

#### 3. Item/Consumable Icons (16×16)
Find:
- Spritesheet with consumable items
- Potions, weapons, fragments, etc.
- Format: Multiple frames in single sprite

**Where to place:** `assets/icons/consumables.png`

### Option B: Create Simple Assets

#### Using Aseprite (Recommended)
1. Create new 16×16 image
2. Draw character or tile
3. Export as PNG

#### Using Online Tools
- **Piskel** (piskelapp.com) — Free online pixel editor
- **Photopea** (photopea.com) — Free Photoshop-like editor

---

## Updating Asset Paths in Code

Once you add assets, update the load paths in `src/scenes/PreloadScene.js`:

### Current (with fallbacks):
```javascript
this.load.image('tiles', 'assets/tiles/dungeon.png');
this.load.spritesheet('chars', 'assets/sprites/characters.png', { 
  frameWidth: 16, 
  frameHeight: 16
});
this.load.spritesheet('icons', 'assets/icons/consumables.png', { 
  frameWidth: 16, 
  frameHeight: 16 
});
```

### If you have custom paths:
```javascript
// For example, if your character file is in a subdirectory:
this.load.spritesheet('chars', 'assets/sprites/custom/my_character.png', { 
  frameWidth: 16, 
  frameHeight: 16
});
```

---

## Audio Asset Status

### Partially Available
The project includes **Owlish Media Sound Effects** pack with folders:
- Footsteps/ — Walking sounds
- Impacts/ — Hit/collision sounds
- Misc Foley/ — Environmental sounds
- UI/ — Click/tap sounds
- Water/ — Water effects
- Technology/ — Sci-fi sounds

### What's Referenced But Missing
Audio that `AudioManager.js` expects (not currently used):
- `assets/audio/bgm/menu/main_theme.ogg`
- `assets/audio/bgm/dungeon/ambient.ogg`
- `assets/audio/bgm/combat/battle.ogg`
- `assets/audio/sfx/player/*.ogg`
- `assets/audio/sfx/enemy/*.ogg`

**Solution:** Either:
1. Find/create these audio files and place them in the correct folders
2. OR remove the unused `AudioManager` class (it's not currently integrated)

---

## Testing Asset Loading

### To check if assets load correctly:

1. **Open browser DevTools** (F12)
2. **Go to Console** tab
3. **Start the game** (`npm start` → http://localhost:8080)
4. **Look for warnings:**
   - ✅ No warnings = All assets loaded
   - ⚠️ Warnings about missing assets = Fallbacks being used
   - ❌ Errors = Something is broken

### Example console output:
```
[Phaser] Failed to load assets/tiles/dungeon.png
[AssetLoader] Creating fallback graphics for 'tiles'
```

---

## Performance Tip

**Sprite Sheet Optimization:**

If your spritesheet is large (>1MB), consider:
1. Reducing resolution (make each tile 8×8 instead of 16×16)
2. Using texture atlas (combine multiple images into one file)
3. Lazy loading (load assets only when needed)

See `src/systems/AudioManager.js` and `CODE_REVIEW_AND_FIXES.md` for future improvements.

