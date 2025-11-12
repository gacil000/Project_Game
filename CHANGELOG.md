# CHANGELOG

## [0.3.1] - 2025-11-12 (Visual Improvements & Polish)

### Added
- Enhanced D-Pad button styling with visual hierarchy (blue color scheme, borders, gradient effects)
- Attack button styling (red/circular, visual feedback, scaling on hover)
- Button hover effects with color transitions and text scaling
- Analog joystick control option as alternative to D-Pad
- Joystick features: smooth stick movement, angle-based direction detection, boundary clamping
- Joystick initialization parameter in InputController constructor
- **NEW:** Button press animations with smooth tweens
  - D-Pad: Scale animation (0.85x) + color change on press
  - Attack button: Enhanced scale animation (0.80x, yoyo) + pulse glow effect
  - Text scaling on hover with Quad.easeOut easing

### Changed
- InputController methods: createDPadControls() and createJoystickControls() reorganized
- Button creation refactored into separate methods: createDPadButton() and createAttackButton()
- Improved visual depth layering for touch controls (depth 999-1001)
- Better color scheme for mobile controls (blue for movement, red for attack)
- Button event handling: added smooth tween animations for all transitions

### Improved
- Touch control visibility and usability on mobile
- Button visual feedback during user interaction
- Overall mobile UI polish and consistency
- Tactile feel with animations (60 FPS smooth)

### Testing
- ✅ Visual improvements verified on desktop and mobile browsers
- ✅ All button animations working smoothly
- ✅ Joystick control functional and responsive
- ✅ No performance issues with animations at 60 FPS
- ✅ Touch responsiveness maintained

## [0.3.0] - 2025-11-12 (Mobile Support)

### Added
- Mobile input controller system (InputController.js)
- Virtual D-Pad controls for mobile (UP, DOWN, LEFT, RIGHT buttons)
- On-screen attack button for mobile
- Mobile device detection
- Responsive touch controls

### Changed
- Input handling now abstracted through InputController

### Docs
- Added MOBILE_REPORT.md with detailed compatibility analysis

## [0.2.1] - 2025-11-12 (Testing & Fixes)

### Fixed
- **CRITICAL:** Fragment sprite uses fallback texture if 'icons' not loaded
- **HIGH:** Enemy sprite frame validation (prevents out-of-bounds frame access)
- **HIGH:** Animation creation checks for texture existence before creating animations
- **HIGH:** Added max level cap (20) on upgrades to prevent stat overflow
- **MINOR:** Fragment icon in UIScene now uses fallback if 'icons' missing
- **MINOR:** Room generation validates roomSize is valid integer

### Added
- Texture validation checks throughout game
- Animation existence checks before playing
- Room size validation in generateRoom()
- MAX_LEVEL constant (20) for upgrade system

### Changed
- Enemy spawn now safely handles missing 'chars' texture
- Animations only play if they were successfully created
- Upgrade purchase includes max level check

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
