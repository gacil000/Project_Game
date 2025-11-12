# Asset Export Plan - 9 Selected Characters

## 📋 Your Selection (9 Files)

### CHARACTERS (5):
1. ✅ **Adventurous Adolescent** - Generic hero
2. ✅ **Elf Enchanter** - Magic user
3. ✅ **Joyful Kid** - Small/fast character
4. ✅ **Merfolk Impaler** - Melee/spear user
5. ✅ **Overworked Villager** - Unique personality

### ENEMIES (4):
1. ✅ **Shrieker Mushroom** - Ranged/special
2. ✅ **Stone Troll** - Melee/strong
3. ✅ **Bloodshot Eye** - Flying/weird
4. ✅ **Death Slime** - Weak/slow

**Total: 9 sprites = ~70-100 KB**

---

## 🚀 QUICK EXPORT STEPS

### Step 1: Collect Files
Already done - kamu pilih 9 files! ✓

### Step 2: Go to Online Converter
**Website**: https://cloudconvert.com/aseprite-to-png

### Step 3: Upload 9 Files

**Method A (Drag & Drop - EASIEST):**
1. Open CloudConvert
2. Drag semua 9 `.aseprite` files ke browser
3. System otomatis upload

**Method B (Click Upload):**
1. Open CloudConvert  
2. Click "Select Files"
3. Hold Ctrl + Click ke 9 files sekaligus
4. Click "Open"

### Step 4: Convert
1. Input format: ASEPRITE (auto-detect)
2. Output format: PNG (select if needed)
3. Click "Convert"
4. Wait 2-5 minutes

### Step 5: Download
1. Click "Download All" → ZIP file
2. Save to: `C:\temp_export\` or Desktop

### Step 6: Extract ZIP
1. Right-click ZIP file
2. "Extract All"
3. Folder terbentuk dengan 9 PNG files

---

## 📝 File Mapping

### After Convert, akan jadi:

**CHARACTERS (5):**
```
AdventurousAdolescent.png → adventurous_adolescent.png
ElfEnchanter.png → elf_enchanter.png
JoyfulKid.png → joyful_kid.png
MerfolkImpaler.png → merfolk_impaler.png
OverworkedVillager.png → overworked_villager.png
```

**ENEMIES (4):**
```
ShriekerMushroom.png → shrieker_mushroom.png
StoneTroll.png → stone_troll.png
BloodshotEye.png → bloodshot_eye.png
DeathSlime.png → death_slime.png
```

---

## 📂 Setup Project Structure

### Create Folders (jika belum ada):
```
C:\Tugas kuliah\semester 5\Pemrpgraman web\Project_Game\echo of light\assets\sprites\
├── characters\
└── enemies\
```

### Copy Files:

**CHARACTERS folder:**
```
assets/sprites/characters/
├── adventurous_adolescent.png
├── elf_enchanter.png
├── joyful_kid.png
├── merfolk_impaler.png
└── overworked_villager.png
```

**ENEMIES folder:**
```
assets/sprites/enemies/
├── shrieker_mushroom.png
├── stone_troll.png
├── bloodshot_eye.png
└── death_slime.png
```

---

## ✅ Verification Checklist

After copy, verify setiap file:

```
☐ adventurous_adolescent.png
  - Size: ?x? (note down)
  - Has animation frames (grid): YES/NO
  - File size: ~KB
  
☐ elf_enchanter.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB

☐ joyful_kid.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB

☐ merfolk_impaler.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB

☐ overworked_villager.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB

☐ shrieker_mushroom.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB

☐ stone_troll.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB

☐ bloodshot_eye.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB

☐ death_slime.png
  - Size: ?x?
  - Has animation frames: YES/NO
  - File size: ~KB
```

---

## 🎯 What's Next After Export

Once 9 PNG files ready di project:

### I Will:
1. Update `PreloadScene.js`
   ```javascript
   this.load.spritesheet('adventurous_adolescent', 'assets/sprites/characters/adventurous_adolescent.png', {
     frameWidth: 64,  // adjust if needed
     frameHeight: 64
   });
   // ... repeat for all 9
   ```

2. Update `GameScene.js`
   ```javascript
   // Support multiple playable characters
   const selectedCharacter = this.playerStats.character || 'adventurous_adolescent';
   this.player = this.physics.add.sprite(spawnX, spawnY, selectedCharacter, 0);
   ```

3. Add character selection to `HomeScene.js`
   ```javascript
   // Show 5 character buttons for player to choose
   const characters = ['adventurous_adolescent', 'elf_enchanter', 'joyful_kid', ...];
   // Create UI for selection
   ```

4. Update enemy spawning
   ```javascript
   // Pick random enemy from 4 available
   const enemies = ['shrieker_mushroom', 'stone_troll', 'bloodshot_eye', 'death_slime'];
   const enemy = Phaser.Utils.Array.GetRandom(enemies);
   ```

5. Test everything
6. Commit & push v0.4.0

---

## 🔄 Timeline

**Your work:**
- Export: 5 min (CloudConvert batch)
- Extract: 2 min
- Rename: 3 min
- Copy: 2 min
- Verify: 5 min
- **Total: ~20 min**

**My work (after):**
- Code updates: 30-45 min
- Testing: 15 min
- Commit & push: 5 min
- **Total: ~50 min**

**Full deployment: ~1.5 hours**

---

## 📞 If You Get Stuck

**Problem: CloudConvert tidak support Aseprite**
→ Solution: Use https://ezgif.com/ (upload 1 file at a time, slower but works)

**Problem: Download doesn't work**
→ Solution: Try different browser (Chrome recommended)

**Problem: PNG size too big**
→ Solution: Tell me dimensions, I'll scale down

**Problem: PNG blank/corrupted**
→ Solution: Try export again dengan tool lain

---

## 🚀 LET'S GO!

**STEP 1**: Go to https://cloudconvert.com/aseprite-to-png
**STEP 2**: Upload 9 `.aseprite` files
**STEP 3**: Convert
**STEP 4**: Download ZIP
**STEP 5**: Extract & rename files
**STEP 6**: Copy to `assets/sprites/`

**Then tell me**: "Done! 9 files ready di project"

I akan handle sisanya! 💪

---

## 📊 Expected Results After Integration

### Game Features:
✅ Character selection screen (5 options)
✅ Enemy variety (4 different types)
✅ Unique sprite per character + enemy
✅ Proper animations (walk, idle, attack)
✅ Professional look & feel
✅ Better replayability

### Version: v0.4.0
- Character selection system
- Multi-sprite support
- Enemy variety
- Enhanced visual quality

---

**SIAP? START CONVERTING!** 🎮

