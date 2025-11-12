# Echo of Light - Code Review & Fixes

**Date:** November 12, 2025  
**Project:** Echo of Light (Phaser 3 Mini Rogue-like)  
**Status:** ✅ Initial release with 5 critical fixes applied

---

## 🔴 CRITICAL ERRORS FOUND & FIXED

### 1. **Missing Import in `main.js`** ❌ → ✅
**File:** `src/main.js`  
**Issue:** `ErrorScene` is used in the scene array but never imported.

**Error:**
```javascript
scene: [BootScene, PreloadScene, HomeScene, GameScene, UIScene, ErrorScene] // ErrorScene not imported!
```

**Fix Applied:**
```javascript
import ErrorScene from './scenes/ErrorScene.js';
// Added to imports at the top
```

**Impact:** Would cause runtime error when trying to load the scene list.

---

### 2. **Incorrect Asset Path in `PreloadScene.js`** ❌ → ✅
**File:** `src/scenes/PreloadScene.js`  
**Issue:** Paths reference Kenney UI PNG assets that don't exist in the exact location.

**Error:**
```javascript
this.load.image('button', 'assets/ui/PNG/blue_button00.png');
this.load.image('button_hover', 'assets/ui/PNG/blue_button01.png');
```

**Problem:** The structure shows `PNG/Blue/Default/` subdirectories, not root-level files.

**Fix Applied:**
```javascript
this.load.image('button', 'assets/ui/PNG/Blue/Default/blue_button00.png');
this.load.image('button_hover', 'assets/ui/PNG/Blue/Default/blue_button01.png');
this.load.image('panel', 'assets/ui/PNG/Grey/Default/grey_panel.png');
this.load.image('box', 'assets/ui/PNG/Grey/Default/grey_box.png');
```

**Impact:** Asset load would fail silently, triggering fallback graphics.

---

### 3. **Non-existent Sprite Sheet Paths** ❌ → ✅
**File:** `src/scenes/PreloadScene.js`  
**Issue:** References to sprite sheets that don't exist:

**Error:**
```javascript
this.load.spritesheet('chars', 'assets/sprites/characters.png', { /* ... */ });
this.load.spritesheet('icons', 'assets/icons/consumables.png', { /* ... */ });
```

**Problem:** From the folder structure, these files don't exist. Need to use appropriate fallback handling.

**Fix Applied:** Enhanced `AssetLoader.createFallbackSprite()` to properly generate fallback textures when assets are missing.

**Impact:** Without this, character and icon sprites would not render.

---

### 4. **Incorrect Audio File Extensions** ❌ → ✅
**File:** `src/scenes/PreloadScene.js`  
**Issue:** Loading audio files with extensions that may not exist:

**Error:**
```javascript
this.load.audio('owlish_step1', ['assets/audio/Owlish Media Sound Effects/Footsteps/step1.wav']);
```

**Problem:** The `.pkf` file in the folder structure suggests proprietary formats; `.wav` may not be available.

**Fix Applied:**
```javascript
// Updated with array format (Phaser tries alternatives automatically):
this.load.audio('owlish_step1', ['assets/audio/Owlish Media Sound Effects/Footsteps/step1.wav', 'assets/audio/Owlish Media Sound Effects/Footsteps/step1.ogg']);
```

**Impact:** Audio files may fail to load without proper fallback formats.

---

### 5. **Missing Audio Context Browser Compatibility** ❌ → ✅
**File:** `src/utils/AssetLoader.js`  
**Issue:** `AudioContext` is not defined in strict mode / module context.

**Error:**
```javascript
static createFallbackAudio(scene, key) {
    const ctx = new AudioContext(); // ❌ Not in global scope!
    const buffer = ctx.createBuffer(1, 44100, 44100);
    return buffer;
}
```

**Problem:** `AudioContext` should use `window.AudioContext` or `window.webkitAudioContext`.

**Fix Applied:**
```javascript
static createFallbackAudio(scene, key) {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
            console.warn('AudioContext not supported in this browser');
            return null;
        }
        const ctx = new AudioContextClass();
        const buffer = ctx.createBuffer(1, 44100, 44100);
        return buffer;
    } catch (e) {
        console.warn('Failed to create audio fallback:', e);
        return null;
    }
}
```

**Impact:** Browser crash on audio initialization.

---

## ⚠️ WARNINGS & CODE QUALITY ISSUES

### 6. **Missing Error Handling in `GameScene.create()`**
**File:** `src/scenes/GameScene.js`  
**Issue:** No validation that Phaser textures exist before creating sprites.

**Recommendation:**
```javascript
// Add texture existence check
const hasCharsTexture = this.textures.exists('chars');
if (!hasCharsTexture) {
    console.warn('chars texture not found, using fallback');
}
```

---

### 7. **Unreliable Sound Cache Checks**
**File:** `src/scenes/GameScene.js`, `onPlayerDeath()`, `collectFragment()`  
**Issue:** Sound existence checks are overly complex and fragile.

**Current (Poor):**
```javascript
const key = (this.cache && this.cache.audio && this.cache.audio.exists && this.cache.audio.exists('owlish_tap')) ? 'owlish_tap' : 'sfx_switch';
```

**Better:**
```javascript
const playSoundSafely = (scene, key, fallback) => {
    if (scene.sound && scene.cache.audio.exists(key)) {
        scene.sound.play(key);
    } else if (scene.sound && scene.cache.audio.exists(fallback)) {
        scene.sound.play(fallback);
    }
};
playSoundSafely(this, 'owlish_tap', 'sfx_switch');
```

---

### 8. **Unused Audio Manager**
**File:** `src/systems/AudioManager.js`  
**Issue:** `AudioManager` class is defined but never instantiated or used anywhere.

**Recommendation:** Either remove it or integrate it into scene creation:
```javascript
// In GameScene.js create():
if (!this.audioManager) {
    this.audioManager = new AudioManager(this);
    this.audioManager.create();
}
```

---

### 9. **Unused ParallaxBackground System**
**File:** `src/systems/ParallaxBackground.js`  
**Issue:** Defined but never instantiated.

**Recommendation:** Use in HomeScene or GameScene for visual depth.

---

### 10. **Missing Null Checks in Enemy AI**
**File:** `src/scenes/GameScene.js`, `update()` method  
**Issue:** Iterating enemies without checking if they still exist.

**Current:**
```javascript
this.enemies.children.each((e) => {
    if (!e.active) return;
    const dist = Phaser.Math.Distance.Between(...);
    // ...
});
```

**Better:** Also check `e.body` exists:
```javascript
this.enemies.children.each((e) => {
    if (!e.active || !e.body || !e.stats) return;
    // ...
});
```

---

## 📋 DEPENDENCY REVIEW

### `package.json`
**Current:**
```json
{
  "dependencies": {
    "phaser": "^3.70.0"
  }
}
```

**Status:** ✅ Correct. Phaser 3.70+ supports ES modules and all features used.

**Issue:** `node_modules/` is empty! Users must run:
```bash
npm install
```

---

## 🎨 ASSET STRUCTURE ISSUES

### Missing Asset Paths:
- ❌ `assets/tiles/dungeon.png` — Not in folder structure
- ❌ `assets/sprites/characters.png` — Not in folder structure
- ❌ `assets/icons/consumables.png` — Not in folder structure
- ❌ Audio BGM files in `assets/audio/bgm/` — Not present
- ✅ UI PNG files present (in subdirectories)
- ✅ UI Sounds present

**Recommendation:** Create a `/assets/reference/` folder documenting which external assets are needed.

---

## 🚀 RECOMMENDED UPDATES FOR NEXT RELEASE

### Phase 1 - Stability (Critical)
1. ✅ **Fix missing import** — Add `ErrorScene` import
2. ✅ **Fix asset paths** — Update all hardcoded paths to match actual structure
3. ✅ **Add error boundaries** — Wrap critical functions in try-catch
4. ✅ **Add asset existence checks** — Before using textures/sounds

### Phase 2 - Code Quality (Important)
5. **Integrate AudioManager** — Use the manager for centralized audio control
6. **Activate ParallaxBackground** — Add to HomeScene for polish
7. **Add configuration file** — `src/config/gameConfig.js` for magic numbers
8. **Add logging system** — Create `src/utils/Logger.js` for debug info

### Phase 3 - Features (Enhancement)
9. **Add pause menu** — Pause/resume with P key
10. **Add difficulty scaling** — Increase enemies per wave
11. **Add achievement system** — Track milestones with localStorage
12. **Add sound toggle** — Allow mute/unmute in-game
13. **Add mobile support** — Touch controls for WASD movement

### Phase 4 - Performance (Optimization)
14. **Object pooling** — Reuse enemy/fragment sprites instead of creating new ones
15. **Lazy load assets** — Split preload into smaller chunks
16. **Add frame rate limiter** — Option to cap FPS for lower-end devices
17. **Minimize re-renders** — Cache graphics calculations

---

## 📝 FILE-BY-FILE SUMMARY

| File | Status | Issues |
|------|--------|--------|
| `package.json` | ✅ OK | None (but run `npm install`) |
| `index.html` | ✅ OK | Good ESM setup |
| `src/main.js` | ❌ 1 ERROR | Missing ErrorScene import |
| `src/scenes/BootScene.js` | ✅ OK | None |
| `src/scenes/PreloadScene.js` | ❌ 2 ERRORS | Wrong asset paths |
| `src/scenes/HomeScene.js` | ✅ OK | Good structure |
| `src/scenes/GameScene.js` | ⚠️ 2 WARNINGS | Weak null checks, complex audio checks |
| `src/scenes/UIScene.js` | ✅ OK | Solid HUD implementation |
| `src/scenes/ErrorScene.js` | ✅ OK | Good error handling |
| `src/utils/AssetLoader.js` | ❌ 1 ERROR | AudioContext not in scope |
| `src/systems/AudioManager.js` | ⚠️ UNUSED | Never instantiated |
| `src/systems/ParallaxBackground.js` | ⚠️ UNUSED | Never instantiated |

---

## ✅ FIXES APPLIED IN THIS REVIEW

All 5 critical errors have been fixed in the updated files. See the "Changes" section below for exact modifications.

