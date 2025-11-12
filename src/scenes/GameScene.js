import InputController from '../systems/InputController.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.tileSize = 16;
    this.scaleFactor = 3; // display scale for crisp pixel art
  this.roomSize = 10; // generate a 10x10 room
  }

  init(data) {
    // Player stats
    this.upgrades = data.upgrades || { health:0, speed:0, damage:0 };
    this.playerStats = {
      // Base HP is 10, each health upgrade adds +10 HP (per HomeScene rule)
      hp: 10 + (this.upgrades.health || 0) * 10,
      maxHp: 10 + (this.upgrades.health || 0) * 10,
      // Base attack 2, each damage upgrade adds +1
      atk: 2 + (this.upgrades.damage || 0),
      // Simple DEF derived from health upgrades
      def: 1 + Math.floor((this.upgrades.health || 0) / 2)
    };
    
    // Game state
    this.enemiesKilled = 0;
    this.startTime = Date.now();
    this.sessionFragments = 0; // fragments collected this run
    this.lightFragments = [];
  }
  
  generateRoom() {
    // Validate room size
    if (!Number.isInteger(this.roomSize) || this.roomSize < 5) {
      console.warn('Invalid room size, using default 10');
      this.roomSize = 10;
    }
    
    // Create a new room layout
    const room = [];
    for (let y = 0; y < this.roomSize; y++) {
      room[y] = [];
      for (let x = 0; x < this.roomSize; x++) {
        // Border walls
        if (x === 0 || y === 0 || x === this.roomSize-1 || y === this.roomSize-1) {
          room[y][x] = 1; // wall
        } else {
          // Random obstacles (15% chance)
          room[y][x] = Math.random() < 0.15 ? 1 : 0;
        }
      }
    }
    
    // Ensure there's always a path
    // Clear corners for potential doors
    room[1][1] = 0;
    room[1][this.roomSize-2] = 0;
    room[this.roomSize-2][1] = 0;
    room[this.roomSize-2][this.roomSize-2] = 0;
    
    return room;
  }

  create() {
    // scale tiles
    this.displayTile = this.tileSize * this.scaleFactor;
    
    // Create the room
    this.map = this.generateRoom();
    
    // Helper function for safe audio playback
    this.playSoundSafely = (preferredKey, fallbackKey) => {
      if (!this.sound) return;
      try {
        if (this.cache?.audio?.exists(preferredKey)) {
          this.sound.play(preferredKey);
        } else if (this.cache?.audio?.exists(fallbackKey)) {
          this.sound.play(fallbackKey);
        }
      } catch (e) {
        console.warn('Audio playback error:', e.message);
      }
    };
    
    // Create a dark overlay for the light effect
    const worldW = this.roomSize * this.displayTile;
    const worldH = this.roomSize * this.displayTile;
    
    // Create base layer for the room
    this.layer = this.add.layer();
    
    // Verify that textures exist before using them
    const hasTilesTexture = this.textures.exists('tiles');
    const hasPlayerTexture = this.textures.exists('elf_bladedancer');
    
    if (!hasTilesTexture) {
        console.warn('Warning: tiles texture not loaded, using fallback');
    }
    if (!hasPlayerTexture) {
        console.warn('Warning: player sprites not loaded, using fallback');
    }
    
    // Draw the dungeon tiles
    for (let y = 0; y < this.roomSize; y++) {
      for (let x = 0; x < this.roomSize; x++) {
        const px = x * this.displayTile;
        const py = y * this.displayTile;
        
        // Use proper dungeon tiles
        const tileSprite = this.add.sprite(px, py, hasTilesTexture ? 'tiles' : 'box', this.map[y][x] ? 1 : 0)
          .setOrigin(0)
          .setScale(this.scaleFactor);
          
        this.layer.add(tileSprite);
      }
    }
    
  // Create darkness overlay and a mask graphics for the light
  this.darkness = this.add.graphics();
  this.darkness.fillStyle(0x000000, 1);
  this.darkness.fillRect(0, 0, worldW, worldH);
    
  // graphics used as mask (we'll draw a circle where light exists)
  this.lightMask = this.add.graphics();
  this.lightMask.fillStyle(0xffffff);
  // create geometry mask once
  this.lightGeometryMask = new Phaser.Display.Masks.GeometryMask(this, this.lightMask);
  this.darkness.setMask(this.lightGeometryMask);
    
    // Set world bounds
    this.physics.world.setBounds(0, 0, worldW, worldH);
    this.cameras.main.setBounds(0, 0, worldW, worldH);

    // (procedural room created above) world bounds already set

  // Create player in center of room
  const spawnX = Math.floor(this.roomSize/2) * this.displayTile + this.displayTile/2;
  const spawnY = Math.floor(this.roomSize/2) * this.displayTile + this.displayTile/2;

  this.player = this.physics.add.sprite(spawnX, spawnY, 'elf_bladedancer', 0).setScale(this.scaleFactor);
  this.player.body.setSize(14, 14);
  this.player.facing = 'down';
  this.player.speed = 80 + ((this.upgrades && this.upgrades.speed) ? this.upgrades.speed * 8 : 0);

  // Attach stats object (used everywhere)
  this.player.stats = Object.assign({}, this.playerStats);
  this.player.setCollideWorldBounds(true);
  this.player.play('player_idle_down');

    // create static group of wall sprites for arcade collision checks from generated room
    this.walls = this.physics.add.staticGroup();
    for (let y = 0; y < this.roomSize; y++) {
      for (let x = 0; x < this.roomSize; x++) {
        if (this.map[y][x] === 1) {
          const wall = this.add.rectangle(x*this.displayTile + this.displayTile/2, y*this.displayTile + this.displayTile/2, this.displayTile, this.displayTile, 0x666666);
          this.walls.add(wall);
        }
      }
    }
    this.physics.add.collider(this.player, this.walls);

  // fragments group (collectible light fragments)
  this.fragments = this.physics.add.group();
  this.physics.add.overlap(this.player, this.fragments, this.collectFragment, null, this);

  // enemies
  this.enemies = this.physics.add.group();
  this.spawnEnemies(4);
  this.physics.add.overlap(this.player, this.enemies, this.onPlayerHit, null, this);

    // camera follow
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // input - use universal InputController
    this.inputController = new InputController(this);

    // score/time
    this.score = 0;

    // events for UI: report player stats
    this.events.emit('updateHUD', { fragments: parseInt(localStorage.getItem(window.EOL.storageKey)||'0',10), health: this.player.stats.hp, maxHealth: this.player.stats.maxHp });
  }
  updatePlayerLight() {
    if (!this.player || !this.lightMask) return;
    this.lightMask.clear();
    const radius = this.displayTile * 3;
    this.lightMask.fillStyle(0xffffff, 1);
    this.lightMask.fillCircle(this.player.x, this.player.y, radius);
  }

  spawnEnemies(n) {
    // spawn on random floor tiles inside generated room
    const floorPositions = [];
    for (let y = 1; y < this.roomSize - 1; y++) {
      for (let x = 1; x < this.roomSize - 1; x++) {
        if (this.map[y][x] === 0) floorPositions.push({ x, y });
      }
    }
    Phaser.Utils.Array.Shuffle(floorPositions);
    
    // Enemy sprite types available (4 types cycling)
    const enemyTypes = ['ochre_jelly', 'death_slime', 'blinded_grimlock', 'fungal_myconid'];
    
    for (let i = 0; i < Math.min(n, floorPositions.length); i++) {
      const tile = floorPositions[i];
      const px = tile.x * this.displayTile + this.displayTile / 2;
      const py = tile.y * this.displayTile + this.displayTile / 2;
      // skip if too close
      if (Phaser.Math.Distance.Between(px, py, this.player.x, this.player.y) < this.displayTile * 2) continue;

      // Use cycling enemy type, fallback to 'box' if sprite not loaded
      const enemyType = enemyTypes[i % enemyTypes.length];
      const charTexture = this.textures.exists(enemyType) ? enemyType : 'box';
      const e = this.physics.add.sprite(px, py, charTexture, 0).setScale(this.scaleFactor);
      e.body.setSize(14, 14);
      e.setCollideWorldBounds(true);
      // Balance: slightly tougher enemies
      e.stats = { hp: 4, atk: 2, def: 0 };
      e.nextMoveAt = 0;
      this.enemies.add(e);
      // Only play animation if it exists
      if (this.anims.exists('player_idle_down')) {
        e.play('player_idle_down');
      }
    }
  }

  onPlayerHit(playerSprite, enemySprite) {
    if (!playerSprite.stats || !enemySprite.stats) return;
    if (playerSprite.isInvulnerable) return;
    const dmg = Math.max(1, enemySprite.stats.atk - (playerSprite.stats.def || 0));
    playerSprite.stats.hp -= dmg;
    playerSprite.isInvulnerable = true;
    playerSprite.setAlpha(0.5);
    this.time.delayedCall(800, () => { playerSprite.isInvulnerable = false; playerSprite.setAlpha(1); });
    this.events.emit('playerHit', { health: playerSprite.stats.hp, maxHealth: playerSprite.stats.maxHp });
    if (playerSprite.stats.hp <= 0) this.onPlayerDeath();
  }

  onPlayerDeath() {
    this.cameras.main.fade(800, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      const current = parseInt(localStorage.getItem(window.EOL.storageKey) || '0', 10);
      // award fragments collected this run
      const gained = Math.max(1, this.sessionFragments);
      localStorage.setItem(window.EOL.storageKey, String(current + gained));
      // play death sfx with safe fallback
      this.playSoundSafely('owlish_tap', 'sfx_switch');
      this.scene.start('HomeScene');
    });
  }

  createFragment(x, y) {
    // Use fallback texture if icons not loaded
    const fragTexture = this.textures.exists('icons') ? 'icons' : 'box';
    const frag = this.add.sprite(x, y, fragTexture, 0).setScale(this.scaleFactor * 0.6);
    this.physics.add.existing(frag);
    frag.body.setSize(10, 10);
    frag.body.setAllowGravity(false);
    frag.setDepth(2);
    this.fragments.add(frag);
    // initial pop-up impulse so it looks like an item drop
    frag.body.setVelocity(Phaser.Math.Between(-10, 10), -30);
    // float and bob
    this.tweens.add({ targets: frag, y: y - 8, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: frag, scale: frag.scale * 1.08, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  }

  collectFragment(player, frag) {
    if (!frag || !frag.active) return;
    frag.destroy();
    this.sessionFragments += 1;
    // play pickup sfx with safe fallback
    this.playSoundSafely('owlish_tap', 'sfx_tap');
    // update HUD (stored + session)
    const stored = parseInt(localStorage.getItem(window.EOL.storageKey) || '0', 10);
    this.events.emit('updateHUD', { fragments: stored + this.sessionFragments, health: this.player.stats.hp, maxHealth: this.player.stats.maxHp });
  }

  update(time, dt) {
    if (!this.player || !this.player.body) return;
    
    // Performance optimization: Skip update if game is paused
    if (this.scene.isPaused()) return;
    
    // Update input controller
    this.inputController.update();
    const input = this.inputController.getMovement();
    
    // player movement
    const speed = this.player.speed;
    const body = this.player.body;
    body.setVelocity(0);
    
    // Track if we're moving
    let isMoving = false;
    
    // Handle movement and animations
    if (input.left) {
      body.setVelocityX(-speed);
      this.player.play('player_walk_left', true);
      this.player.facing = 'left';
      isMoving = true;
    } 
    else if (input.right) {
      body.setVelocityX(speed);
      this.player.play('player_walk_right', true);
      this.player.facing = 'right';
      isMoving = true;
    }
    
    if (input.up) {
      body.setVelocityY(-speed);
      if (!input.left && !input.right) {
        this.player.play('player_walk_up', true);
        this.player.facing = 'up';
      }
      isMoving = true;
    }
    else if (input.down) {
      body.setVelocityY(speed);
      if (!input.left && !input.right) {
        this.player.play('player_walk_down', true);
        this.player.facing = 'down';
      }
      isMoving = true;
    }
    
    // If not moving, play idle animation for current direction
    if (!isMoving) {
      this.player.play(`player_idle_${this.player.facing}`, true);
    }
    
    // reduce diagonal speed
    body.velocity.normalize().scale(speed);

    // Update light position
    this.updatePlayerLight();

    // Enemy AI: follow player when within 5 tiles, else idle
    const followRange = this.displayTile * 5;
    this.enemies.children.each((e) => {
      if (!e.active || !e.body || !e.stats) return;
      const dist = Phaser.Math.Distance.Between(e.x, e.y, this.player.x, this.player.y);
      if (dist < followRange) {
        const angle = Phaser.Math.Angle.Between(e.x, e.y, this.player.x, this.player.y);
        e.body.setVelocity(Math.cos(angle) * 40, Math.sin(angle) * 40);
      } else {
        e.body.setVelocity(0, 0);
      }
    });

    // Simple melee attack: press SPACE to hit nearby enemies
    // Handle attack with input controller (works on desktop and mobile)
    if (this.inputController.isAttacking()) {
      // attack sfx with safe fallback
      this.playSoundSafely('owlish_hit', 'sfx_click');
      this.enemies.children.each((e) => {
        if (!e.active) return;
        const d = Phaser.Math.Distance.Between(e.x, e.y, this.player.x, this.player.y);
        if (d <= this.displayTile * 1.8) {
          const damage = (this.player.stats.atk || 1);
          e.stats.hp -= Math.max(1, damage - (e.stats.def || 0));
          this.tweens.add({ targets: e, alpha: 0.4, duration: 80, yoyo: true, onComplete: () => {
            if (e.stats.hp <= 0) {
              // spawn fragment and play pickup sound when collected
              this.createFragment(e.x, e.y);
              e.destroy();
              this.enemiesKilled++;
            }
          }});
        }
      });
    }
  }
}
