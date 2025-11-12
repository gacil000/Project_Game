# Asset Processing Guide - Echo of Light

## 🎯 Goal
Convert downloaded asset packs (100x100px) into game-ready spritesheets (16x16px optimal, or consistent scale)

---

## 📊 Asset Pack Analysis

### Pack 1: Tiny RPG Character Asset Pack v1.03b
**Location**: `C:\Users\zandi\Downloads\Compressed\Tiny RPG Character Asset Pack v1.03b -Free Soldier_Orc`

#### Characters (100x100 px)

**SOLDIER:**
- Path: `Characters(100x100)/Soldier/Soldier/` (likely PNG with animations)
- With shadows: `Soldier with shadows/`
- Split effects: `Soldier(Split Effects)/`
- Projectile: `Arrow(Projectile)/`

**ORC:**
- Path: `Characters(100x100)/Orc/Orc/` (likely PNG with animations)
- With shadows: `Orc with shadows/`
- Split effects: `Orc(Split Effects)/`

**Format**: PNG files (likely individual frames or spritesheet)
**Size**: 100x100 px
**Recommended Use**:
- **Soldier** → Player character
- **Orc** → Enemy type 1

---

### Pack 2: Monster_Creatures_Fantasy v1.3
**Location**: `C:\Users\zandi\Downloads\Compressed\Monster_Creatures_Fantasy(Version 1.3)`

**Contains** (need to check exact sizes):
- Flying Eye
- Goblin
- Mushroom
- Skeleton

**Recommended Use**:
- **Goblin** → Enemy type 2
- **Skeleton** → Enemy type 3
- **Flying Eye** → Enemy type 4 (special/flying)
- **Mushroom** → Boss or special enemy

**Potential Issue**: Likely much larger than 100x100 (200x200 or more)

---

### Pack 3: Knight Pack
**Location**: `C:\Users\zandi\Downloads\Compressed\Knight`

**Unknown contents** (need to verify)
- Could be alternative player character
- Could complement Soldier/Orc

---

## 🔧 Processing Steps

### Step 1: Extract & Examine All Assets
```
For each pack:
1. Extract all .png/.aseprite files
2. Note dimensions (100x100? 200x200? etc)
3. Determine if spritesheet or individual frames
4. Check animation frame count
```

### Step 2: Decide on Scaling Strategy

**Option A: Scale Everything to 64x64**
- Downscale Tiny RPG from 100x100 → 64x64
- Downscale/crop Monster Fantasy to 64x64
- Scale up game tiles from 16x16 → 48x48 display
- Pro: Higher quality sprites
- Con: Larger asset files

**Option B: Scale Everything to 32x32** (RECOMMENDED)
- Downscale Tiny RPG from 100x100 → 32x32
- Downscale/crop Monster Fantasy to 32x32
- Adjust game scale to 2x or 3x display
- Pro: Balanced quality/performance
- Con: Some detail loss

**Option C: Keep at 16x16** (Current game scale)
- Downscale Tiny RPG from 100x100 → 16x16
- Heavy downsampling (quality loss)
- Con: Very pixelated, loses detail
- Pro: Tiny file sizes

**CHOSEN**: Option B (32x32) - best balance

---

### Step 3: Create Spritesheets

#### Soldier → Player Spritesheet
```
Input: 100x100 individual frames or spritesheet
Output: player_spritesheet.png (32x32 frames)
Frames needed:
- Idle: 4 frames (down, left, right, up)
- Walk: 8-12 frames (2-3 per direction)
- Attack: 4-6 frames
Total: ~18-24 frames arranged in grid
```

#### Orc → Enemy Spritesheet
```
Input: 100x100 Orc sprites
Output: orc_spritesheet.png (32x32 frames)
Frames: Idle + Walk (similar to player)
Total: ~12-16 frames
```

#### Monster Pack → Enemy Spritesheets
```
Goblin: goblin_spritesheet.png (32x32)
Skeleton: skeleton_spritesheet.png (32x32)
Flying Eye: flying_eye_spritesheet.png (32x32)
Mushroom: mushroom_spritesheet.png (32x32)
```

---

## 📝 Processing Workflow

### Using Free Tools:

#### **Option 1: Aseprite** (NOT FREE but professional)
- Open `.aseprite` files from pack
- Downscale: Image → Scale Image → 32x32
- Export as PNG

#### **Option 2: Piskel** (Free, online)
- piskelapp.com
- Import sprite
- Scale down
- Export as PNG grid

#### **Option 3: ImageMagick** (Command-line, free)
```powershell
# Downscale single image 100x100 → 32x32
magick convert input.png -scale 32x32 output.png

# Batch downscale all PNG files
magick mogrify -path output_folder -scale 32x32 *.png
```

#### **Option 4: GIMP** (Free, desktop)
1. Open image
2. Image → Scale Image → 32x32
3. File → Export As PNG

#### **Option 5: IrfanView** (Free, fast)
- Open image
- Image → Resize/Resample → 32x32
- Save as PNG

---

## 🎨 Step-by-Step Manual Process

### For Soldier Character:
1. Extract `Soldier/` folder
2. Identify frame dimensions (likely 100x100 each or spritesheet)
3. If individual frames:
   - Open each in GIMP
   - Scale to 32x32
   - Save as `soldier_idle_down.png`, `soldier_walk_down_1.png`, etc
4. If spritesheet:
   - Open in GIMP
   - Scale to proportional size
   - Crop to 32x32 sections
   - Create grid in Aseprite or Piskel

### For Monsters:
1. Check existing dimensions
2. Scale to 32x32
3. Create individual files per direction/animation

---

## 📦 Final Asset Structure

After processing, folder structure should be:
```
assets/
├── sprites/
│   ├── characters/
│   │   ├── soldier_spritesheet.png (32x32 frames)
│   │   ├── orc_spritesheet.png (32x32 frames)
│   ├── enemies/
│   │   ├── goblin_spritesheet.png (32x32 frames)
│   │   ├── skeleton_spritesheet.png (32x32 frames)
│   │   ├── flying_eye_spritesheet.png (32x32 frames)
│   │   └── mushroom_spritesheet.png (32x32 frames)
├── tiles/
│   └── dungeon.png (should be 32x32 tiles)
└── icons/
    └── consumables.png (32x32 icons)
```

---

## 🔄 Code Changes Required

After assets ready, will need to update:

1. **PreloadScene.js**
   ```javascript
   this.load.spritesheet('soldier', 'assets/sprites/characters/soldier_spritesheet.png', {
     frameWidth: 32,
     frameHeight: 32
   });
   this.load.spritesheet('orc', 'assets/sprites/enemies/orc_spritesheet.png', {
     frameWidth: 32,
     frameHeight: 32
   });
   ```

2. **GameScene.js**
   - Update scale factor from 3x to 1x or 2x
   - Update tile sizes
   - Update sprite creation

3. **Animation frame numbers**
   - Adjust based on spritesheet layout

---

## ⚠️ Important Notes

1. **License**: Check `Autor_note.txt` in Final folder for usage rights
2. **Performance**: 32x32 sprites at 60 FPS should be fine
3. **Quality**: Test on mobile to ensure visibility
4. **Frame rate**: Animations may need adjustment after scaling

---

## Recommended Tools (Free)

1. **GIMP** - Full-featured image editor
2. **Piskel** - Pixel art online editor (browser-based)
3. **ImageMagick** - Batch processing (command-line)
4. **IrfanView** - Quick batch resize
5. **Paint.NET** - Lightweight alternative

---

## Timeline

- Step 1 (Analyze): 5-10 min
- Step 2 (Decide scale): 2 min
- Step 3 (Process all): 30-60 min (depends on tool)
- Step 4 (Create spritesheets): 20-30 min
- Step 5 (Setup game): 15-20 min

**Total**: ~2 hours for complete asset processing & integration

