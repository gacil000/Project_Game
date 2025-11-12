# 🛠️ Asset Processing Tools - Quick Reference

## ✅ Recommended: GIMP (Free, Full-Featured)

### Installation:
- Download: https://www.gimp.org/
- Windows installer available
- ~200MB download

### How to Resize Sprite:
1. **Open image**: File → Open
2. **Scale image**: Image → Scale Image
3. **Set to 32x32**: Width: 32, Height: 32
4. **Interpolation**: Choose "None (Fastest)" for pixel art
5. **Scale**: Click "Scale"
6. **Export**: File → Export As → sprite_name.png
7. **Repeat** for all sprites

### Time per sprite: ~2-3 minutes

---

## ⚡ Alternative: ImageMagick (Command-line, Fastest)

### Installation (Windows):
```powershell
# Option 1: Using Scoop
scoop install imagemagick

# Option 2: Download MSI installer
# https://imagemagick.org/script/download.php#windows
```

### Batch Resize All PNG Files:
```powershell
# Navigate to folder with sprites
cd "C:\Users\zandi\Downloads\Compressed\Tiny RPG Character Asset Pack v1.03b -Free Soldier_Orc\Characters(100x100)\Soldier"

# Downscale all PNG to 32x32
magick mogrify -path "C:\output" -resize 32x32 -background none -gravity center -extent 32x32 *.png

# OR: One-by-one with explicit scaling
magick convert input.png -scale 32x32 output.png
```

### Time for batch: ~1-2 minutes (all sprites at once!)

---

## 🎨 Online: Piskel (No Installation)

### Website: https://www.piskelapp.com

### How to use:
1. Go to website (no login needed)
2. File → Import → Select PNG file
3. Image → Resize → 32x32
4. File → Download as PNG

### Pros:
- No installation
- Can edit while resizing
- Real-time preview

### Cons:
- Browser-based (slower)
- Works one file at a time

### Time per sprite: ~3-5 minutes

---

## 📋 Simple: IrfanView (Fast & Lightweight)

### Installation:
- Download: https://www.irfanview.com/
- Portable version available (~500KB)

### Batch Resize:
1. Open IrfanView
2. File → Batch (conversion/rename)
3. Select all PNG files
4. Choose "Resize" option
5. Set to 32x32
6. Run

### Time for batch: ~5-10 minutes

---

## 🚀 My Recommendation for Your Case:

### **BEST**: ImageMagick (Fastest)
- Batch process all files instantly
- Command-line (one command for all)
- Free & lightweight

### **EASIER**: GIMP (Most User-Friendly)
- No command-line needed
- Visual preview
- Fine-tuning control

### **QUICKEST**: Piskel (Browser)
- Zero installation
- Just open URL
- Works on laptop without setup

---

## Step-by-Step: Using GIMP (Recommended for First Time)

1. **Download GIMP**: https://www.gimp.org/ → Download
2. **Install** (next, next, finish)
3. **Create folder**: `C:\Projects\sprites_32x32` (output folder)
4. **For each sprite**:
   - File → Open → select PNG
   - Image → Scale Image
   - Change to: Width 32, Height 32
   - Interpolation: "None (Fastest)"
   - Click "Scale"
   - File → Export As
   - Save to output folder
   - Close (Ctrl+W)

**Time**: ~3 min per sprite × number of sprites

---

## Alternative: Using Free Online Services

### Batch resize online (no install):
- https://ezgif.com/ → Resize
- https://imageresizer.com/ → Batch upload
- https://www.befunky.com/ → Batch processing

---

## ⚙️ Quick Command Reference (if using ImageMagick)

```powershell
# Single file resize
magick convert input.png -scale 32x32 output.png

# Batch resize entire folder
cd "C:\path\to\sprites"
magick mogrify -path "scaled_32x32" -scale 32x32 *.png

# Preserve aspect ratio (adds padding)
magick convert input.png -scale 32x32 -background none -gravity center -extent 32x32 output.png

# Batch with quality optimization
magick mogrify -path "scaled_32x32" -scale 32x32 -colors 256 -compress LZW *.png
```

---

## 📊 Comparison Table

| Tool | Installation | Speed | Learning Curve | Batch Support | Best For |
|------|---|---|---|---|---|
| **ImageMagick** | Command-line | ⚡⚡⚡ Fastest | 🔴 Steep | ✅ Yes | Power users |
| **GIMP** | Desktop app | ⚡ Medium | 🟡 Medium | ✅ Scripts | Visual editing |
| **Piskel** | None (browser) | ⚡ Medium | 🟢 Easy | ❌ No | Quick edits |
| **IrfanView** | Desktop app | ⚡⚡ Fast | 🟢 Easy | ✅ Yes | Batch resize |
| **Paint.NET** | Desktop app | ⚡ Medium | 🟢 Easy | ❌ No | Simple edits |

---

## My Personal Recommendation

**Use GIMP if**:
- First time resizing sprites
- Want visual feedback
- Want full control

**Use ImageMagick if**:
- Comfortable with command-line
- Have many sprites (50+)
- Want automation

**Use Piskel if**:
- Just want quick resize
- Don't want to install anything
- Have few sprites (<10)

---

## Next Steps

1. **Choose tool** (GIMP recommended for ease)
2. **Extract asset pack** to known folder
3. **Resize all sprites** to 32x32
4. **Create spritesheets** (grid layout)
5. **Copy to project** assets folder
6. **Update game code** to use new sprites

Ready? Let me know which tool you want to use! 🚀

