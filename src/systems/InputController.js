export default class InputController {
  constructor(scene, useJoystick = false) {
    this.scene = scene;
    this.isMobile = this.detectMobileDevice();
    this.useJoystick = useJoystick && this.isMobile; // Only use joystick on mobile
    
    // Input state
    this.input = {
      left: false,
      right: false,
      up: false,
      down: false,
      attack: false
    };
    
    // UI elements (if mobile)
    this.controls = null;
    this.joystickActive = false;
    
    if (this.isMobile) {
      if (this.useJoystick) {
        this.createJoystickControls();
      } else {
        this.createDPadControls();
      }
    } else {
      this.createDesktopControls();
    }
  }
  
  detectMobileDevice() {
    if (!this.scene || !this.scene.sys || !this.scene.sys.game) return false;
    const device = this.scene.sys.game.device;
    return device.os.android || device.os.iOS || device.input.touch;
  }
  
  createDesktopControls() {
    // Use keyboard controls
    this.keys = this.scene.input.keyboard.createCursorKeys();
    this.spaceKey = this.scene.input.keyboard.addKey(
      this.scene.input.keyboard.KeyCodes.SPACE
    );
    
    // Spacebar for attack
    this.scene.input.keyboard.on('keydown-SPACE', () => {
      this.input.attack = true;
    });
    this.scene.input.keyboard.on('keyup-SPACE', () => {
      this.input.attack = false;
    });
  }
  
  createDPadControls() {
    const w = this.scene.cameras.main.width;
    const h = this.scene.cameras.main.height;
    const buttonSize = 60;
    const padding = 20;
    
    // D-Pad position (bottom-left)
    const dpadX = padding + buttonSize;
    const dpadY = h - padding - buttonSize * 1.5;
    
    // Attack button position (bottom-right)
    const attackX = w - padding - buttonSize;
    const attackY = h - padding - buttonSize;
    
    // Create D-Pad buttons (UP, DOWN, LEFT, RIGHT)
    const upBtn = this.createDPadButton(dpadX, dpadY - buttonSize - 10, buttonSize, '▲', () => {
      this.input.up = true;
    });
    upBtn.on('pointerup', () => { this.input.up = false; });
    
    const downBtn = this.createDPadButton(dpadX, dpadY + buttonSize + 10, buttonSize, '▼', () => {
      this.input.down = true;
    });
    downBtn.on('pointerup', () => { this.input.down = false; });
    
    const leftBtn = this.createDPadButton(dpadX - buttonSize - 10, dpadY, buttonSize, '◀', () => {
      this.input.left = true;
    });
    leftBtn.on('pointerup', () => { this.input.left = false; });
    
    const rightBtn = this.createDPadButton(dpadX + buttonSize + 10, dpadY, buttonSize, '▶', () => {
      this.input.right = true;
    });
    rightBtn.on('pointerup', () => { this.input.right = false; });
    
    // Create Attack button (larger, red)
    const atkBtn = this.createAttackButton(attackX, attackY, buttonSize * 1.2, 'ATK', () => {
      this.input.attack = true;
    });
    atkBtn.on('pointerup', () => { this.input.attack = false; });
    
    this.controls = {
      up: upBtn,
      down: downBtn,
      left: leftBtn,
      right: rightBtn,
      attack: atkBtn
    };
  }
  
  createJoystickControls() {
    const w = this.scene.cameras.main.width;
    const h = this.scene.cameras.main.height;
    const joystickSize = 120;
    const padding = 20;
    const attackSize = 80;
    
    // Joystick position (bottom-left)
    const joystickX = padding + joystickSize / 2;
    const joystickY = h - padding - joystickSize / 2;
    
    // Attack button position (bottom-right)
    const attackX = w - padding - attackSize / 2;
    const attackY = h - padding - attackSize / 2;
    
    // Create joystick background
    const joystickBg = this.scene.add.circle(joystickX, joystickY, joystickSize / 2, 0x333366, 0.6);
    joystickBg.setScrollFactor(0);
    joystickBg.setDepth(1000);
    
    // Create joystick stick
    const joystickStick = this.scene.add.circle(joystickX, joystickY, joystickSize / 4, 0x6666cc, 0.8);
    joystickStick.setScrollFactor(0);
    joystickStick.setDepth(1001);
    
    // Joystick input handling
    joystickBg.setInteractive();
    joystickBg.on('pointermove', (pointer) => {
      if (!pointer.isDown) return;
      
      const dx = pointer.x - joystickX;
      const dy = pointer.y - joystickY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = joystickSize / 2 - joystickSize / 4;
      
      // Clamp stick within circle
      const clampedDist = Math.min(distance, maxDistance);
      const angle = Math.atan2(dy, dx);
      
      joystickStick.x = joystickX + Math.cos(angle) * clampedDist;
      joystickStick.y = joystickY + Math.sin(angle) * clampedDist;
      
      // Update input based on angle
      const threshold = Math.PI / 4;
      this.input.left = angle > Math.PI * 0.75 || angle < -Math.PI * 0.75;
      this.input.right = angle > -Math.PI * 0.25 && angle < Math.PI * 0.25;
      this.input.up = angle > -Math.PI * 0.75 && angle < -Math.PI * 0.25;
      this.input.down = angle > Math.PI * 0.25 && angle < Math.PI * 0.75;
    });
    
    joystickBg.on('pointerup', () => {
      // Reset joystick stick to center
      joystickStick.x = joystickX;
      joystickStick.y = joystickY;
      this.input.left = false;
      this.input.right = false;
      this.input.up = false;
      this.input.down = false;
    });
    
    // Create Attack button (red, circular)
    const atkBtn = this.createAttackButton(attackX, attackY, attackSize, 'ATTACK', () => {
      this.input.attack = true;
    });
    atkBtn.on('pointerup', () => { this.input.attack = false; });
    
    this.controls = {
      joystick: joystickBg,
      stick: joystickStick,
      attack: atkBtn
    };
  }
  
  createDPadButton(x, y, size, label, callback) {
    // Create button with gradient-like effect
    const button = this.scene.add.rectangle(x, y, size, size, 0x4488aa, 0.8);
    button.setInteractive();
    button.setScrollFactor(0);
    button.setDepth(1000);
    
    // Add border effect
    const border = this.scene.add.rectangle(x, y, size + 4, size + 4, 0x2266aa, 0);
    border.setStrokeStyle(2, 0x6699ff);
    border.setScrollFactor(0);
    border.setDepth(999);
    
    // Add text label
    const text = this.scene.add.text(x, y, label, {
      font: '20px monospace',
      fill: '#fff',
      align: 'center'
    });
    text.setOrigin(0.5);
    text.setScrollFactor(0);
    text.setDepth(1001);
    
    // Hover effects
    button.on('pointerover', () => {
      button.setFillStyle(0x66aacc, 0.9);
      text.setScale(1.1);
    });
    
    button.on('pointerout', () => {
      button.setFillStyle(0x4488aa, 0.8);
      text.setScale(1);
    });
    
    button.on('pointerdown', callback);
    
    return button;
  }
  
  createAttackButton(x, y, size, label, callback) {
    // Create button with red color
    const button = this.scene.add.circle(x, y, size / 2, 0xcc3333, 0.8);
    button.setInteractive();
    button.setScrollFactor(0);
    button.setDepth(1000);
    
    // Add border effect
    const border = this.scene.add.circle(x, y, size / 2 + 3, 0xff6666, 0);
    border.setStrokeStyle(2, 0xff8888);
    border.setScrollFactor(0);
    border.setDepth(999);
    
    // Add text label
    const text = this.scene.add.text(x, y, label, {
      font: 'bold 14px monospace',
      fill: '#fff',
      align: 'center'
    });
    text.setOrigin(0.5);
    text.setScrollFactor(0);
    text.setDepth(1001);
    
    // Hover effects
    button.on('pointerover', () => {
      button.setFillStyle(0xff5555, 0.9);
      text.setScale(1.15);
    });
    
    button.on('pointerout', () => {
      button.setFillStyle(0xcc3333, 0.8);
      text.setScale(1);
    });
    
    button.on('pointerdown', callback);
    
    return button;
  }
  

  
  update() {
    if (!this.isMobile) {
      // Update desktop keyboard input
      this.input.left = this.keys.left.isDown;
      this.input.right = this.keys.right.isDown;
      this.input.up = this.keys.up.isDown;
      this.input.down = this.keys.down.isDown;
      this.input.attack = this.spaceKey.isDown;
    }
    // Mobile input is updated by button press/release handlers
  }
  
  getMovement() {
    return {
      left: this.input.left,
      right: this.input.right,
      up: this.input.up,
      down: this.input.down
    };
  }
  
  isAttacking() {
    return this.input.attack;
  }
  
  isMobileDevice() {
    return this.isMobile;
  }
}
