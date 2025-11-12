export default class ParallaxBackground {
    constructor(scene, key, factor) {
        this.scene = scene;
        this.factor = factor;
        
        // Create the sprite that spans the entire camera view
        const { width, height } = scene.cameras.main;
        this.sprite = scene.add.tileSprite(0, 0, width, height, key)
            .setOrigin(0, 0)
            .setScrollFactor(0);
    }

    update(camX, camY) {
        // Move the background at a different rate than the camera
        this.sprite.tilePositionX = camX * this.factor;
        this.sprite.tilePositionY = camY * this.factor;
    }
}