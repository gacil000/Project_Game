export default class InputController {
  constructor(scene) {
    this.scene = scene;
    this.isMobile = this.detectMobileDevice();
    
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
    
    if (this.isMobile) {
      this.createMobileControls();
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
  
  createMobileControls() {
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
    const upBtn = this.createButton(dpadX, dpadY - buttonSize - 10, buttonSize, 'UP', () => {
      this.input.up = true;
    });
    upBtn.on('pointerup', () => { this.input.up = false; });
    
    const downBtn = this.createButton(dpadX, dpadY + buttonSize + 10, buttonSize, 'DOWN', () => {
      this.input.down = true;
    });
    downBtn.on('pointerup', () => { this.input.down = false; });
    
    const leftBtn = this.createButton(dpadX - buttonSize - 10, dpadY, buttonSize, 'LEFT', () => {
      this.input.left = true;
    });
    leftBtn.on('pointerup', () => { this.input.left = false; });
    
    const rightBtn = this.createButton(dpadX + buttonSize + 10, dpadY, buttonSize, 'RIGHT', () => {
      this.input.right = true;
    });
    rightBtn.on('pointerup', () => { this.input.right = false; });
    
    // Create Attack button
    const atkBtn = this.createButton(attackX, attackY, buttonSize * 1.2, 'ATK', () => {
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
  
  createButton(x, y, size, label, callback) {
    // Create button background
    const button = this.scene.add.rectangle(x, y, size, size, 0x444488, 0.7);
    button.setInteractive();
    button.on('pointerdown', callback);
    button.setScrollFactor(0); // Don't scroll with camera
    button.setDepth(1000); // On top
    
    // Add text label
    const text = this.scene.add.text(x, y, label, {
      font: '12px monospace',
      fill: '#fff',
      align: 'center'
    });
    text.setOrigin(0.5);
    text.setScrollFactor(0);
    text.setDepth(1001);
    
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
