export default class AssetLoader {
    static createFallbackGraphics(scene, key) {
        // Create a simple colored rectangle as fallback
        const graphics = scene.add.graphics();
        const colors = {
            'tiles': 0x333333,
            'button': 0x4444aa,
            'button_hover': 0x6666cc,
            'panel': 0x666666,
            'box': 0x444444
        };
        
        graphics.fillStyle(colors[key] || 0x666666);
        graphics.fillRect(0, 0, 32, 32);
        
        // Convert to texture
        const texture = graphics.generateTexture(key, 32, 32);
        graphics.destroy();
        
        return texture;
    }
    
    static createFallbackSprite(scene, key, frameConfig) {
        const graphics = scene.add.graphics();
        
        // Create a simple character placeholder
        if (key === 'chars') {
            graphics.fillStyle(0x00ff00);
            graphics.fillRect(0, 0, frameConfig.frameWidth, frameConfig.frameHeight);
            graphics.lineStyle(1, 0xffffff);
            graphics.strokeRect(0, 0, frameConfig.frameWidth, frameConfig.frameHeight);
        }
        // Create a simple icon placeholder
        else if (key === 'icons') {
            graphics.fillStyle(0xffff00);
            graphics.fillRect(0, 0, frameConfig.frameWidth, frameConfig.frameHeight);
        }
        
        const texture = graphics.generateTexture(key, frameConfig.frameWidth, frameConfig.frameHeight);
        graphics.destroy();
        
        return texture;
    }
    
    static createFallbackAudio(scene, key) {
        // Create a silent audio buffer with proper browser compatibility
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                console.warn('AudioContext not supported in this browser for fallback', key);
                return null;
            }
            const ctx = new AudioContextClass();
            const buffer = ctx.createBuffer(1, 44100, 44100);
            return buffer;
        } catch (e) {
            console.warn('Failed to create audio fallback for', key, ':', e.message);
            return null;
        }
    }
}