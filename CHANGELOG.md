# CHANGELOG

## [0.2.0] - 2025-11-12

### Fixed
- **CRITICAL:** Missing ErrorScene import in main.js
- **CRITICAL:** Incorrect UI asset paths in PreloadScene.js (subdirectory correction)
- **CRITICAL:** AudioContext scope error in AssetLoader.js (browser compatibility)
- **HIGH:** Missing texture existence checks in GameScene.js
- **HIGH:** Weak null safety in enemy AI loop

### Changed
- Refactored complex audio checks to use playSoundSafely() helper function
- Enhanced asset fallback system with better error handling
- Improved browser compatibility for AudioContext creation

### Added
- playSoundSafely() utility function in GameScene.js
- Texture existence validation before sprite creation
- Comprehensive null checks in enemy AI update loop

## [0.1.0] - Initial Release
- Core gameplay loop
- Procedural dungeon generation
- Player movement & combat
- Enemy AI
- Upgrade system
- HUD & UI overlay
- LocalStorage persistence
