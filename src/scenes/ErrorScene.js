export default class ErrorScene extends Phaser.Scene {
    constructor() {
        super('ErrorScene');
    }

    init(data) {
        this.errorMessage = data.message || 'An unexpected error occurred';
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // Dark background
        this.add.rectangle(0, 0, w, h, 0x000000, 0.95).setOrigin(0);

        // Error message
        this.add.text(w/2, h/2 - 50, 'Game Error', {
            font: '32px "Press Start 2P"',
            fill: '#ff0000',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(w/2, h/2 + 20, this.errorMessage, {
            font: '16px monospace',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 2,
            wordWrap: { width: w - 100 }
        }).setOrigin(0.5);

        // Retry button
        const button = this.add.image(w/2, h - 100, 'button')
            .setInteractive()
            .setScale(1.5);

        const buttonText = this.add.text(w/2, h - 100, 'Retry', {
            font: '20px "Press Start 2P"',
            fill: '#ffffff'
        }).setOrigin(0.5);

        button.on('pointerdown', () => {
            this.scene.start('BootScene');
        });
    }
}