import SpriteGenerator from '../utils/SpriteGenerator.js';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }
  preload() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    
    // Loading text with dark fantasy style
    this.add.text(w/2, h/2 - 30, 'Gathering shadows...', { 
      font: '18px "Press Start 2P"', 
      fill: '#8a2be2',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Dark themed progress bar
    const progressBox = this.add.rectangle(w/2, h/2 + 10, 300, 18, 0x1a1a2e).setOrigin(0.5);
    const progressBar = this.add.rectangle(w/2 - 150, h/2 + 10, 0, 18, 0x8a2be2).setOrigin(0,0.5);

    // Load game assets
    this.load.image('tiles', 'assets/tiles/dungeon.png');
    
    // Character spritesheet (16x16 frames)
    this.load.spritesheet('chars', 'assets/sprites/characters.png', { 
      frameWidth: 16, 
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    
    // UI elements from Kenney UI Pack (corrected paths)
    this.load.image('button', 'assets/ui/PNG/Blue/Default/blue_button00.png');
    this.load.image('button_hover', 'assets/ui/PNG/Blue/Default/blue_button01.png');
    this.load.image('panel', 'assets/ui/PNG/Grey/Default/grey_panel.png');
    this.load.image('box', 'assets/ui/PNG/Grey/Default/grey_box.png');
    
    // Load icons (use a consumables sheet from the icons folder - adjust if you prefer another file)
    this.load.spritesheet('icons', 'assets/icons/consumables.png', { 
      frameWidth: 16, 
      frameHeight: 16 
    });

    // Load UI / SFX from Kenney UI Sounds folder (fallbacks if you add more audio)
    this.load.audio('sfx_click', ['assets/ui/Sounds/click-a.ogg']);
    this.load.audio('sfx_click2', ['assets/ui/Sounds/click-b.ogg']);
    this.load.audio('sfx_tap', ['assets/ui/Sounds/tap-a.ogg']);
    this.load.audio('sfx_tap2', ['assets/ui/Sounds/tap-b.ogg']);
    this.load.audio('sfx_switch', ['assets/ui/Sounds/switch-a.ogg']);
    this.load.audio('sfx_switch2', ['assets/ui/Sounds/switch-b.ogg']);

  // Optional: load selected Owlish Media SFX (you copied them into assets/audio)
  // Footsteps
  this.load.audio('owlish_step1', ['assets/audio/Owlish Media Sound Effects/Footsteps/step1.wav']);
  this.load.audio('owlish_step2', ['assets/audio/Owlish Media Sound Effects/Footsteps/step2.wav']);
  // Impact / hit
  this.load.audio('owlish_hit', ['assets/audio/Owlish Media Sound Effects/Impacts/hit.wav']);
  // UI / tap
  this.load.audio('owlish_tap', ['assets/audio/Owlish Media Sound Effects/UI/UI_005.wav']);

    // Handle progress and errors gracefully
    this.load.on('progress', (value) => {
      progressBar.width = 300 * value;
    });

    this.load.on('filecomplete', (key, type, data) => {
      // console.log('loaded', key);
    });

    // If an asset fails to load, use our fallback system
    this.load.on('loaderror', (file) => {
      console.warn('Failed to load', file.key, file.src);
      
      // Create appropriate fallback based on file type
      if (file.type === 'image') {
        AssetLoader.createFallbackGraphics(this, file.key);
      } else if (file.type === 'spritesheet') {
        AssetLoader.createFallbackSprite(this, file.key, file.config);
      } else if (file.type === 'audio') {
        AssetLoader.createFallbackAudio(this, file.key);
      }
    });
  }
  create() {
    // Generate placeholder spritesheets for testing
    // Will be replaced with real assets later
    SpriteGenerator.initializePlaceholderSprites(this);
    
    // Create basic animations if spritesheets are available
    const hasCharsTexture = this.textures.exists('chars');
    
    if (!hasCharsTexture) {
      console.warn('chars spritesheet not loaded, using procedural sprites');
    }
    
    try {
      // Create animations for placeholder sprites
      // For each character/enemy with 4 columns x 3 rows (12 frames)
      
      // Idle animations (frame 0)
      this.anims.create({ 
        key: 'player_idle_down', 
        frames: [{ key: 'chars', frame: 0 }], 
        frameRate: 1 
      });
      this.anims.create({ 
        key: 'player_idle_left', 
        frames: [{ key: 'chars', frame: 1 }], 
        frameRate: 1 
      });
      this.anims.create({ 
        key: 'player_idle_right', 
        frames: [{ key: 'chars', frame: 2 }], 
        frameRate: 1 
      });
      this.anims.create({ 
        key: 'player_idle_up', 
        frames: [{ key: 'chars', frame: 3 }], 
        frameRate: 1 
      });
      
      // Walk animations (frames 4-7 for different directions)
      this.anims.create({
        key: 'player_walk_down',
        frames: this.anims.generateFrameNumbers('chars', { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1
      });
      
      this.anims.create({
        key: 'player_walk_left',
        frames: this.anims.generateFrameNumbers('chars', { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1
      });
      
      this.anims.create({
        key: 'player_walk_right',
        frames: this.anims.generateFrameNumbers('chars', { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1
      });
      
      this.anims.create({
        key: 'player_walk_up',
        frames: this.anims.generateFrameNumbers('chars', { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1
      });
    } catch (e) {
      console.warn('Could not create animations:', e.message);
    }

    // Proceed to home scene after a short delay so the progress bar is visible
    this.time.delayedCall(300, () => this.scene.start('HomeScene'));
  }
}
