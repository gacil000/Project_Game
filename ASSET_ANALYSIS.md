# Echo of Light - Asset Analysis & Checklist

## Current Asset Status

### ✅ Loaded Assets (Present in Code)
1. **tiles** (`assets/tiles/dungeon.png`) - Dungeon tileset
2. **chars** (`assets/sprites/characters.png`) - Character & enemy spritesheet (16x16 frames)
3. **icons** (`assets/icons/consumables.png`) - Fragment/item icons (16x16 frames)
4. **UI Assets**:
   - `blue_button00.png` - Button
   - `blue_button01.png` - Button hover
   - `grey_panel.png` - Panel
   - `grey_box.png` - Box/fallback

5. **Audio Assets** (Kenney UI Sounds & Owlish Media):
   - sfx_click, sfx_click2, sfx_tap, sfx_tap2, sfx_switch, sfx_switch2
   - owlish_step1, owlish_step2, owlish_hit, owlish_tap

---

## ❌ Missing Assets (Should Be Created/Added)

### Critical for Gameplay
| Asset | Location | Purpose | Fallback | Priority |
|-------|----------|---------|----------|----------|
| **characters.png** | `assets/sprites/characters.png` | Player & enemies sprite | Circle shape | 🔴 CRITICAL |
| **dungeon.png** | `assets/tiles/dungeon.png` | Floor & wall tiles | Grey box | 🔴 CRITICAL |
| **consumables.png** | `assets/icons/consumables.png` | Fragment/item icons | Small box | 🟡 HIGH |

### Audio (Gameplay)
| Asset | Location | Purpose | Fallback | Priority |
|-------|----------|---------|----------|----------|
| **Player attack SFX** | `assets/audio/` | Attack/slash sound | None | 🟡 HIGH |
| **Enemy death SFX** | `assets/audio/` | Enemy defeat sound | None | 🟡 HIGH |
| **Item pickup SFX** | `assets/audio/` | Fragment collection | sfx_tap | 🟡 HIGH |
| **Game over music** | `assets/audio/` | Death/game over | None | 🟡 MEDIUM |
| **Background music** | `assets/audio/` | Ambient dungeon | None | 🟠 LOW |

### Visual Effects (Enhancement)
| Asset | Location | Purpose | Fallback | Priority |
|-------|----------|---------|----------|----------|
| **Particle effects** | `assets/sprites/effects/` | Magic/hit effects | Not in use | 🟠 LOW |
| **Enemy sprites** | `assets/sprites/enemies/` | Different enemy types | Current char | 🟠 LOW |
| **Backgrounds** | `assets/backgrounds/` | Parallax layers | Not in use | 🟠 LOW |

---

## Asset Usage in Code

### PreloadScene - What's Loaded
```javascript
// Required
this.load.image('tiles', 'assets/tiles/dungeon.png');
this.load.spritesheet('chars', 'assets/sprites/characters.png', { frameWidth: 16, frameHeight: 16 });
this.load.spritesheet('icons', 'assets/icons/consumables.png', { frameWidth: 16, frameHeight: 16 });
this.load.image('button', 'assets/ui/PNG/Blue/Default/blue_button00.png');
this.load.image('button_hover', 'assets/ui/PNG/Blue/Default/blue_button01.png');
this.load.image('panel', 'assets/ui/PNG/Grey/Default/grey_panel.png');
this.load.image('box', 'assets/ui/PNG/Grey/Default/grey_box.png');

// Optional Audio
this.load.audio('sfx_click', ['assets/ui/Sounds/click-a.ogg']);
this.load.audio('owlish_hit', ['assets/audio/Owlish Media Sound Effects/Impacts/hit.wav']);
```

### GameScene - Asset Usage
- **Tile Drawing**: Uses `tiles` texture (fallback: `box`)
- **Player**: Uses `chars` spritesheet frame 0 (fallback: `box`)
- **Enemies**: Uses `chars` frame 48 (fallback: `box`)
- **Fragments**: Uses `icons` texture (fallback: `box`)
- **Audio**: Uses `playSoundSafely()` with fallbacks

---

## Recommendations

### 🎯 Immediate Needs (v0.3.2)
1. **Create/Add spritesheet files** - The 3 critical spritesheets
   - `characters.png` - 16x16 pixel art, ~60+ frames
   - `dungeon.png` - 16x16 tiles, ~8-16 tile variations
   - `consumables.png` - 16x16 icons, ~4-8 items

2. **Add gameplay audio**
   - Attack SFX (sword slash or magic hit)
   - Enemy death sound
   - Item pickup/collection sound
   - Consider: Background ambient music

### 🚀 Nice-to-Have (Future)
- Enemy variety sprites (different enemy types)
- Particle effects for hits/magic
- Visual transitions/fade effects
- Parallax scrolling backgrounds
- Boss encounter graphics

### 💡 Quick Wins
1. Can generate pixel art sprites using:
   - Aseprite, Piskel, or Photoshop
   - Online generators (itch.io asset packs, OpenGameArt)
   - AI pixel art generators
   
2. Can source audio from:
   - Kenney.nl (already using)
   - OpenGameArt.org
   - Freesound.org
   - Itch.io game assets

---

## Next Steps

**Create missing assets or:**
1. Find open-source pixel art packs
2. Use temporary placeholder art
3. Focus on gameplay mechanics first
4. Polish visuals in post

**Current Status**: Game is **fully playable** with fallback graphics and sounds ✅
