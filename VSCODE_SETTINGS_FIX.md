# Manual PixelLab MCP Setup - VS Code Settings

## 🎯 Situation
Your settings.json has 2 separate JSON objects (invalid format). We need to merge them into ONE valid JSON.

---

## ✅ CORRECT Format

Your current file has:
```json
{
    "files.autoSave": "onWindowChange",
    ...existing settings...
}

{
  "servers": {
    "pixellab": { ... }
  }
}
```

❌ **Problem**: 2 separate objects = Invalid JSON

✅ **Solution**: Merge into 1 object

---

## 📋 Step-by-Step Manual Fix

### Step 1: Open settings.json
```
File Explorer → Paste path:
C:\Users\zandi\AppData\Roaming\Code\User\settings.json

Right-click → Open With → Notepad
```

### Step 2: Delete ALL content
```
Select All (Ctrl+A)
Delete
```

### Step 3: Paste CORRECT JSON

Copy this entire block:

```json
{
    "files.autoSave": "onWindowChange",
    "gitlens.ai.model": "vscode",      
    "gitlens.ai.vscode.model": "copilot:gpt-4.1",
    "workbench.secondarySideBar.defaultVisibility": "visible",
    "workbench.colorTheme": "Mermaid Dark",
    "github.copilot.enable": {
        "*": true,
        "plaintext": false,
        "markdown": true,
        "scminput": false
    },
    "github.copilot.nextEditSuggestions.enabled": true,
    "chat.mcp.serverSampling": {

    },
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

Paste into Notepad (Ctrl+V)

### Step 4: Save
```
Ctrl+S
Close Notepad
```

### Step 5: Restart VS Code
```
Close VS Code completely
Reopen VS Code
```

### Step 6: Verify
```
At bottom of VS Code, look for "PixelLab" 
Should see it connected ✓
```

---

## 🔍 If Still Issues

### Q: File shows syntax error
A: Make sure:
- ✓ No extra commas after last property
- ✓ All { } brackets matched
- ✓ All " quotes closed
- ✓ No duplicate keys

### Q: Can't find AppData folder
A: Use this path in File Explorer:
```
%APPDATA%\Code\User\settings.json

OR

C:\Users\zandi\AppData\Roaming\Code\User\settings.json
```

### Q: Still not working after restart
A: Try:
1. Close VS Code
2. Delete corrupted settings.json
3. Reopen VS Code (creates default)
4. Paste correct JSON again
5. Restart

---

## ✨ Expected Result

After correct setup, settings.json should look like:
```json
{
    "your.existing": "settings",
    ...
    "mcpServers": {
        "pixellab": { ... }
    }
}
```

**ONE object with ALL settings inside** ✓

---

## 🚀 Then

Tell me when done:
```
"✅ PixelLab MCP configured in settings.json"
```

Then we continue with asset export! 🎮

