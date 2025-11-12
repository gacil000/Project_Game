# PixelLab MCP Server Setup

## 🤖 What is PixelLab MCP?

**PixelLab** = AI-powered pixel art generation tool via MCP (Model Context Protocol)

**Benefits:**
- Generate pixel art sprites directly in VS Code
- Automate sprite creation
- Integration with Copilot
- No manual tool switching needed

---

## ⚙️ Setup Instructions

### Step 1: Locate VS Code Settings

**Windows:**
```
C:\Users\{username}\AppData\Roaming\Code\User\settings.json
```

In your case:
```
C:\Users\zandi\AppData\Roaming\Code\User\settings.json
```

### Step 2: Open settings.json

**Method 1: Through VS Code UI**
1. Open VS Code
2. Ctrl+Shift+P
3. Type: "Preferences: Open Settings (JSON)"
4. File opens in editor

**Method 2: Manual**
1. Open File Explorer
2. Paste path: `C:\Users\zandi\AppData\Roaming\Code\User\settings.json`
3. Right-click → Open With → Notepad

### Step 3: Add PixelLab MCP Config

Find or create `"mcpServers"` object in settings.json

**Current format (if exists):**
```json
{
  "mcpServers": {
    "existing-server": { ... }
  }
}
```

**Add PixelLab:**
```json
{
  "mcpServers": {
    "pixellab": {
      "url": "https://api.pixellab.ai/mcp",
      "type": "http",
      "headers": {
        "Authorization": "Bearer 918595bf-8bdd-44dc-9909-f10b5a2f443a"
      }
    }
  }
}
```

### Step 4: Save & Restart

1. Save file (Ctrl+S)
2. Close VS Code
3. Reopen VS Code
4. Check if PixelLab MCP shows in status bar

---

## 🔍 Verify Setup

### Method 1: Check Status Bar
- Look at bottom of VS Code
- Should see "PixelLab MCP Connected" or similar

### Method 2: Test in Terminal
```powershell
# This won't work directly, but check if MCP is registered
# Go to VS Code settings UI (Ctrl+,) and search "mcp"
# Should see pixellab listed
```

### Method 3: Try Using It
- Ask Copilot: "Generate a 32x32 pixel sword sprite"
- If working, PixelLab will be available

---

## 📝 Full Example (Complete settings.json)

```json
{
  "mcpServers": {
    "pixellab": {
      "url": "https://api.pixellab.ai/mcp",
      "type": "http",
      "headers": {
        "Authorization": "Bearer 918595bf-8bdd-44dc-9909-f10b5a2f443a"
      }
    }
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.colorTheme": "One Dark Pro"
}
```

---

## ⚠️ Important

### API Key Security
```
Bearer 918595bf-8bdd-44dc-9909-f10b5a2f443a
```

**DO NOT:**
- ❌ Commit this to GitHub
- ❌ Share publicly
- ❌ Post in forums/chat

**This token is:**
- Personal to your PixelLab account
- Tied to your API quota
- Should be kept private

### If Compromised
1. Go to PixelLab dashboard
2. Regenerate API key
3. Update settings.json
4. Restart VS Code

---

## 🎮 Usage Example

After setup, you can use Copilot like:

```
User: "Generate a 32x32 pixel art sword sprite in red"
Copilot (using PixelLab): Creates PNG, downloads to project

User: "Create a 64x64 mushroom enemy sprite"
Copilot (using PixelLab): Generates and saves sprite
```

---

## 🚀 Benefits for Your Project

### Can automate:
1. **Generate missing sprites** (if Aseprite export fails)
2. **Quick placeholder sprites** for testing
3. **Spritesheet variations** (different colors, rotations)
4. **Icon generation** for UI elements
5. **Background tiles** for dungeon

### Example commands:
```
"Generate 5 different 32x32 pixel monster sprites for enemies"
"Create a set of UI buttons in blue and red (32x32)"
"Generate a fantasy dungeon tileset (16x16 tiles, 8 variations)"
```

---

## 🔗 Documentation

**PixelLab:** https://pixellab.ai/
**MCP Protocol:** https://modelcontextprotocol.io/

---

## ❓ Troubleshooting

### Q: Settings.json not found
A: 
- Ctrl+Shift+P in VS Code
- Type "Preferences: Open Settings (JSON)"
- Creates file if doesn't exist

### Q: After restart, still not working
A:
- Check for syntax errors in JSON (missing commas, brackets)
- Use online JSON validator
- Restart VS Code again
- Check internet connection

### Q: API key error
A:
- Copy key exactly as provided
- No extra spaces
- Check Bearer prefix is included
- Verify API key hasn't expired

### Q: Can't find Preferences in Command Palette
A:
- Make sure VS Code is updated
- Try: Settings → Open Settings (UI)
- Then → "Open Settings (JSON)" button

---

## 📋 Checklist

```
☐ Located VS Code settings.json file
☐ Opened settings.json in editor
☐ Added "mcpServers" object with PixelLab config
☐ Saved file
☐ Restarted VS Code
☐ Verified PixelLab is listed/connected
☐ Tested with Copilot command
```

---

## 🎯 Next Steps

After setup:
1. We can use PixelLab to generate sprites if needed
2. Backup plan if Aseprite conversion fails
3. Generate variations of existing sprites
4. Create custom game assets

---

**Need help with setup? Let me know!** 🚀

