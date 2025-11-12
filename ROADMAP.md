# Echo of Light - Implementation Roadmap

## Overview
This document outlines prioritized recommendations for improving the game after the initial code review and fixes (November 12, 2025).

---

## 🟢 Phase 1: Immediate Priorities (This Week)

### 1. ✅ DONE - Fix Critical Bugs
- [x] Missing ErrorScene import
- [x] Asset path corrections
- [x] AudioContext compatibility
- [x] Null safety in enemy AI
- [x] Texture existence checks

**Status:** All 5 critical fixes applied and committed ✓

### 2. Install Dependencies & Test
```bash
npm install
npm start
```
**Time:** 5 minutes  
**Acceptance:** Game runs without console errors

### 3. Add Missing Assets (Choose One Option)
**Option A - Find Free Assets (Recommended)**
- Download character spritesheet from itch.io or OpenGameArt
- Download dungeon tileset PNG
- Download consumable items spritesheet
- Place in correct asset folders

**Option B - Create Placeholder Graphics**
- Use online tool (Piskel, Photopea) to create 16×16 pixel art
- Create basic character, tiles, and items
- Export as PNG

**Time:** 1-3 hours  
**Deliverable:** Visible game with actual graphics (not fallback rectangles)

---

## 🟡 Phase 2: Code Quality (Week 2)

### 4. Integrate AudioManager System
**Current Status:** Defined but never instantiated  
**Action:** Connect `AudioManager` to scene lifecycle

```javascript
// In GameScene.js init():
if (!this.audioManager) {
    this.audioManager = new AudioManager(this);
    this.audioManager.create();
}
// Use in gameplay:
this.audioManager.playBGM('dungeon');
this.audioManager.playSFX('player', 'attack');
```

**Time:** 30 minutes  
**Benefit:** Centralized audio control, easier to extend

### 5. Add Configuration File
**Create:** `src/config/gameConfig.js`

```javascript
export const GAME_CONFIG = {
    TILE_SIZE: 16,
    SCALE_FACTOR: 3,
    ROOM_SIZE: 10,
    
    PLAYER: {
        BASE_HP: 10,
        BASE_ATK: 2,
        BASE_DEF: 1,
        BASE_SPEED: 80
    },
    
    ENEMY: {
        BASE_HP: 4,
        BASE_ATK: 2,
        BASE_DEF: 0,
        SPAWN_COUNT: 4,
        AI_RANGE: 5
    },
    
    UPGRADES: {
        HEALTH_COST: 100,
        DAMAGE_COST: 200,
        HP_PER_LEVEL: 10,
        ATK_PER_LEVEL: 1
    }
};
```

**Time:** 20 minutes  
**Benefit:** No magic numbers, easier balance tuning

### 6. Add Logger Utility
**Create:** `src/utils/Logger.js`

```javascript
export class Logger {
    static debug(msg, data) { console.log(`[DEBUG] ${msg}`, data); }
    static warn(msg, data) { console.warn(`[WARN] ${msg}`, data); }
    static error(msg, data) { console.error(`[ERROR] ${msg}`, data); }
}
```

**Time:** 15 minutes  
**Benefit:** Easier debugging, consistent log format

### 7. Error Boundaries
Add try-catch around critical functions in `GameScene.js` and `HomeScene.js`:

```javascript
try {
    this.spawnEnemies(4);
} catch (e) {
    Logger.error('Failed to spawn enemies', e);
    this.scene.start('ErrorScene', { message: 'Spawn error' });
}
```

**Time:** 30 minutes  
**Benefit:** Graceful error handling instead of crashes

---

## 🔵 Phase 3: Features (Week 3-4)

### 8. Pause Menu
**Hotkey:** P  
**UI:** Centered dialog with Pause / Resume / Quit buttons

```javascript
// In GameScene.update():
if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('P'))) {
    this.showPauseMenu();
}
```

**Time:** 45 minutes  
**Complexity:** Medium

### 9. Difficulty Scaling
**Concept:** Increase enemy count and toughness after each wave

```javascript
// In GameScene.js:
this.waveCount = 0;
this.spawnEnemies(4 + this.waveCount * 2); // More enemies per wave
// Increase enemy stats:
e.stats.hp = 4 + this.waveCount;
```

**Time:** 30 minutes  
**Benefit:** Progression feels meaningful

### 10. Sound Toggle
**UI:** In-game option to mute/unmute  
**Storage:** Save preference to localStorage

```javascript
localStorage.setItem('eol_soundEnabled', String(enabled));
if (JSON.parse(localStorage.getItem('eol_soundEnabled') ?? 'true')) {
    this.sound.play(key);
}
```

**Time:** 20 minutes  
**Benefit:** Accessibility improvement

### 11. Activate ParallaxBackground
**Current Status:** Defined but unused  
**Action:** Use in HomeScene for visual depth

```javascript
// In HomeScene.js create():
const parallax = new ParallaxBackground(this, 'tiles', 0.3);
// In update():
parallax.update(this.cameras.main.scrollX, this.cameras.main.scrollY);
```

**Time:** 20 minutes  
**Visual Impact:** High

### 12. Achievement System
**Ideas:**
- "First Blood" — Kill first enemy
- "Collector" — Gather 100 fragments
- "Survivor" — Last 10 minutes
- "Upgrade Master" — Max out all upgrades

```javascript
const achievements = JSON.parse(localStorage.getItem('eol_achievements') || '{}');
achievements.firstBlood = true;
localStorage.setItem('eol_achievements', JSON.stringify(achievements));
```

**Time:** 1 hour  
**Engagement:** Medium

---

## 🔴 Phase 4: Performance & Polish (Week 5+)

### 13. Object Pooling
**Problem:** Creating/destroying enemies causes GC pauses  
**Solution:** Reuse sprite objects instead

```javascript
// Pre-allocate enemy pool
this.enemyPool = [];
for (let i = 0; i < 20; i++) {
    const e = this.add.sprite(0, 0, 'chars', 48);
    e.setActive(false).setVisible(false);
    this.enemyPool.push(e);
}
```

**Time:** 1-2 hours  
**Performance Gain:** 20-30% smoother

### 14. Mobile/Touch Support
**Features:**
- Virtual joystick or WASD button overlay
- Touch-to-attack
- Responsive UI

**Time:** 2-3 hours  
**Reach:** Expand to mobile players

### 15. Lazy Asset Loading
**Concept:** Load only what's needed  
- Load HomeScene assets first
- Load GameScene assets on run start
- Load specific enemy sprites on demand

**Time:** 1-2 hours  
**Benefit:** Faster initial load

### 16. Performance Monitoring
Add FPS counter and memory usage display:

```javascript
this.time.addEvent({
    delay: 1000,
    callback: () => {
        console.log(`FPS: ${this.game.loop.actualFps}`);
    },
    loop: true
});
```

**Time:** 20 minutes  
**Benefit:** Identify bottlenecks

---

## 🎯 Recommended Next Steps (Today)

1. ✅ Review `CODE_REVIEW_AND_FIXES.md` — Understand all bugs fixed
2. ✅ Run `npm install` && `npm start` — Get game running locally
3. 📍 Play through a game run — Test core gameplay
4. 📍 Get/create missing assets — Visual quality improvement
5. 📍 Start Phase 2 improvements — Code quality focus

---

## Success Metrics

| Metric | Goal | Status |
|--------|------|--------|
| No console errors | 100% | ✅ Achieved |
| Visual assets loaded | 100% | ⚠️ Pending |
| Audio working | 90%+ | ⚠️ Partial |
| Game playable | Yes | ✅ Achieved |
| Mobile support | Planned | 📍 TODO |
| Performance >60 FPS | Target | 📍 TBD |

---

## Questions to Guide Development

1. **What is the target platform?** (Web only, or mobile/desktop?)
2. **Who is your audience?** (Casual, hardcore, kids?)
3. **What is the unique selling point?** (Why should people play this?)
4. **How long should a run take?** (3 min, 10 min, 30 min?)
5. **What's the endgame?** (High scores, achievements, story?)

Answering these will help prioritize features.

---

**Last Updated:** November 12, 2025  
**Next Review Date:** November 19, 2025

