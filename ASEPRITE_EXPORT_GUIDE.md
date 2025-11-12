# Aseprite to PNG Export Guide - Online Converter

## 🎯 Goal
Export TOP 8 characters dari Basic Asset Pack ke PNG spritesheet (tanpa Aseprite)

---

## ✅ TOP 8 Characters (Recommended)

### Players (Pick 4-5):
1. **Elf Bladedancer** ⚔️ - Balanced, cool sword
2. **Elf Enchanter** 🔮 - Magic user
3. **Merfolk Scout** 👁️ - Fast, agile
4. **Adventurous Adolescent** 🧭 - Generic hero
5. **(Optional) Elf Lord** 👑 - Strong character

### Enemies (Pick 8+):
1. **Ochre Jelly** 🟨 - Weak starter
2. **Brawny Ogre** 💪 - Medium
3. **Crimson Slaad** 🔴 - Medium-hard
4. **Stone Troll** 🗻 - Hard
5. **Crushing Cyclops** 🗿 - Very hard
6. **Blinded Grimlock** 👹 - Boss material
7. **Death Slime** 🟢 - Variant weak
8. **Fungal Myconid** 🍄 - Ranged?

---

## 🌐 METHOD 1: Online Converter (EASIEST)

### Website: Aseprite to PNG Online Converter
**URL**: Search "aseprite to png converter online"

**Popular Options:**
1. **ezgif.com** - Simple, reliable
2. **cloudconvert.com** - Professional
3. **zamzar.com** - Versatile

### Step-by-Step (Using ezgif or similar):

#### For Each Character:

1. **Go to converter website**
   - Example: https://ezgif.com/

2. **Click "Convert to PNG"** or similar option

3. **Upload file**
   - Select: `Elf Bladedancer.aseprite`
   - Click "Choose file"
   - Wait for upload

4. **Download result**
   - Click "Download"
   - Saves as PNG

5. **Check output**
   - Should be 64x64 or 128x128 px spritesheet
   - With all animation frames in grid

---

## 🖥️ METHOD 2: Batch Online Converter

### Website: CloudConvert
**URL**: https://cloudconvert.com/aseprite-to-png

### Batch Upload (FASTER!):

1. **Go to CloudConvert**

2. **Click "Select Files"**
   - Choose MULTIPLE files at once:
     ```
     Elf Bladedancer.aseprite
     Elf Enchanter.aseprite
     Merfolk Scout.aseprite
     Adventurous Adolescent.aseprite
     Ochre Jelly.aseprite
     Brawny Ogre.aseprite
     Crimson Slaad.aseprite
     Stone Troll.aseprite
     ```

3. **Conversion settings**
   - Input: ASEPRITE
   - Output: PNG
   - Leave other settings default

4. **Convert**
   - Click "Convert"
   - Wait (2-5 minutes for batch)

5. **Download All**
   - Click "Download All"
   - Saves as ZIP file with all PNGs

6. **Extract ZIP**
   - Right-click → Extract All
   - Get folder with all PNG files

---

## 📋 SIMPLE STEP-BY-STEP (Recommended for You)

### Step 1: Collect Files
```
Create folder: C:\temp_export\
Copy these 8 .aseprite files:

CHARACTERS (4-5):
□ Elf Bladedancer.aseprite
□ Elf Enchanter.aseprite
□ Merfolk Scout.aseprite
□ Adventurous Adolescent.aseprite

ENEMIES (8):
□ Ochre Jelly.aseprite
□ Brawny Ogre.aseprite
□ Crimson Slaad.aseprite
□ Stone Troll.aseprite
□ Crushing Cyclops.aseprite
□ Blinded Grimlock.aseprite
□ Death Slime.aseprite
□ Fungal Myconid.aseprite
```

### Step 2: Batch Convert
```
Go to: https://cloudconvert.com/aseprite-to-png

1. Upload 8 files (drag & drop all)
2. Click "Convert"
3. Download all as ZIP
4. Extract ZIP → folder dengan 8 PNG files
```

### Step 3: Check Files
```
Open each PNG:
- Should see grid of animation frames
- Typical: 64x64 or 128x128 px
- All frames in one file (perfect!)

Note down actual size for each character
```

### Step 4: Organize
```
Create in project:
C:\Tugas kuliah\semester 5\Pemrpgraman web\Project_Game\echo of light\assets\sprites\

NEW FOLDERS:
├── characters/
│   ├── elf_bladedancer.png
│   ├── elf_enchanter.png
│   ├── merfolk_scout.png
│   └── adventurous_adolescent.png
│
└── enemies/
    ├── ochre_jelly.png
    ├── brawny_ogre.png
    ├── crimson_slaad.png
    ├── stone_troll.png
    ├── crushing_cyclops.png
    ├── blinded_grimlock.png
    ├── death_slime.png
    └── fungal_myconid.png
```

### Step 5: Check Sizes
```
For each PNG, note the dimensions:
- Right-click → Properties (Windows)
- Or: Open in Paint/GIMP → look at title bar

Examples (likely):
- Might be 64x64
- Might be 128x128
- Might be 256x128

Write down for each character!
```

---

## 🔧 If PNG is Too Large (128x128+)

### Option 1: Scale Down Online
**Website**: https://www.befunky.com/

1. Upload PNG
2. Tools → Resize
3. Scale to 64x64 (50% if 128x128)
4. Download

### Option 2: Use ImageMagick (Command-line)
```powershell
# Single file
magick convert elf_bladedancer.png -scale 64x64 elf_bladedancer_64.png

# Batch all PNG files in folder
cd C:\path\to\exported\pngs
magick mogrify -scale 64x64 *.png
```

### Option 3: Keep Original Size
- If 64x64 or 128x128 → fine!
- Game will scale accordingly

---

## 📊 Expected Output

### After Conversion:
```
Each PNG file = 1 spritesheet with all frames
Example: elf_bladedancer.png
- Size: 64x64 px (if 1 frame) OR 256x192 px (if 4x3 grid)
- Contains: All animation frames already arranged
- Format: PNG 32-bit (with transparency)
```

### Aseprite Export Format:
```
Aseprite exports spritesheets already arranged!
So output will be:
- Horizontal grid: [frame1][frame2][frame3]...
- Width: number_of_frames × frame_width
- Height: frame_height × number_of_rows

Example: 12 frames of 64x64 in 6×2:
- Output: 384×128 px
```

---

## 🎬 Animation Frame Structure

### Typical Output (Based on Aseprite):
```
When exported, likely structure:
- Idle: 1-2 frames
- Walk: 4-6 frames
- Attack: 2-4 frames
- Total: ~8-12 frames per direction

OR arranged as:
Row 1: Idle down, left, right, up + spares
Row 2: Walk variations
Row 3: Attack variations
```

### Game will use it as:
```javascript
// In Phaser
this.load.spritesheet('elf_bladedancer', 'assets/sprites/characters/elf_bladedancer.png', {
  frameWidth: 64,  // if 64x64 single frame
  frameHeight: 64
});

// Or if spritesheet:
this.load.spritesheet('elf_bladedancer', 'assets/sprites/characters/elf_bladedancer.png', {
  frameWidth: 64,
  frameHeight: 64  // figure out from exported dimensions
});
```

---

## ✅ SIMPLE CHECKLIST

### BEFORE EXPORT:
- [ ] Tahu lokasi file `.aseprite` (16 files di Basic Asset Pack)
- [ ] Tentukan TOP 8 yang mau (4-5 characters, 8 enemies)
- [ ] Go to converter website

### DURING EXPORT:
- [ ] Upload 8 files (batch or one-by-one)
- [ ] Convert to PNG
- [ ] Download hasil

### AFTER EXPORT:
- [ ] Extract/save 8 PNG files
- [ ] Check ukuran setiap file
- [ ] Rename untuk konsistensi:
  ```
  Elf Bladedancer.png → elf_bladedancer.png
  Ochre Jelly.png → ochre_jelly.png
  (lowercase, underscore, no spaces)
  ```
- [ ] Copy ke `assets/sprites/characters/` dan `assets/sprites/enemies/`

### FINAL CHECK:
- [ ] All 8 PNG files di project
- [ ] Format: PNG 32-bit (transparent)
- [ ] Size noted (64x64? 128x128?)
- [ ] Ready untuk game integration

---

## 🚀 NEXT STEP SETELAH EXPORT

Setelah 8 PNG files ready, kita akan:

1. **Update PreloadScene.js**
   ```javascript
   this.load.spritesheet('elf_bladedancer', 'assets/sprites/characters/elf_bladedancer.png', {
     frameWidth: 64,
     frameHeight: 64
   });
   ```

2. **Update GameScene.js**
   ```javascript
   // Spawn player with selected character
   const characters = ['elf_bladedancer', 'elf_enchanter', 'merfolk_scout', ...];
   
   // Spawn enemies dengan variety
   const enemies = ['ochre_jelly', 'brawny_ogre', 'crimson_slaad', ...];
   ```

3. **Add HomeScene selection**
   - Character pick screen
   - UI buttons untuk setiap character

---

## ⚡ QUICK REFERENCE

### Converter Links:
- **Batch (RECOMMENDED)**: https://cloudconvert.com/aseprite-to-png
- **Single File**: https://ezgif.com/
- **Alternative**: https://zamzar.com/ (aseprite to png)

### File Names (8 Top):
```
CHARACTERS:
elf_bladedancer.png
elf_enchanter.png
merfolk_scout.png
adventurous_adolescent.png

ENEMIES:
ochre_jelly.png
brawny_ogre.png
crimson_slaad.png
stone_troll.png
crushing_cyclops.png
blinded_grimlock.png
death_slime.png
fungal_myconid.png
```

### Destination:
```
assets/sprites/characters/ (4 files)
assets/sprites/enemies/ (8 files)
```

---

## 💡 TIPS

1. **Best approach**: Use CloudConvert batch upload
   - Upload semua 8 sekaligus
   - Download 1 ZIP dengan semua PNG
   - Unzip dan organize

2. **If stuck**:
   - Try single file converter (ezgif.com)
   - Slower tapi lebih reliable

3. **After export**:
   - Tell me size of each PNG (64x64? 128x128?)
   - Then I update game code

---

## ❓ FAQs

**Q: Besar file hasil export?**
A: Tiap PNG ~8-15 KB (sudah compressed). Total ~80-120 KB untuk 8 files.

**Q: Output PNG berisi semua frames?**
A: Yes! Aseprite export includes semua animation frames already arranged dalam grid.

**Q: Perlu resize?**
A: Tergantung output size. Jika 64x64 sudah pas, no resize needed. Jika 128x128+, bisa scale down.

**Q: Format harus PNG 32-bit?**
A: Ideal untuk transparency, tapi converter otomatis handle.

**Q: Berapa lama convert?**
A: Single file: 30 detik. Batch 8 files: 2-5 menit.

---

**READY? Mulai convert!** 🚀

