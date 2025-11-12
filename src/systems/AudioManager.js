export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
        
        // BGM tracks
        this.bgm = {
            menu: null,
            dungeon: null,
            combat: null
        };
        
        // SFX categories
        this.sfx = {
            player: {},
            enemy: {},
            ui: {}
        };
        
        // Current BGM track
        this.currentBGM = null;
    }
    
    preloadAudio() {
        const scene = this.scene;
        
        // BGM
        scene.load.audio('bgm_menu', 'assets/audio/bgm/menu/main_theme.ogg');
        scene.load.audio('bgm_dungeon', 'assets/audio/bgm/dungeon/ambient.ogg');
        scene.load.audio('bgm_combat', 'assets/audio/bgm/combat/battle.ogg');
        
        // Player SFX
        scene.load.audio('sfx_player_attack', 'assets/audio/sfx/player/attack.ogg');
        scene.load.audio('sfx_player_hurt', 'assets/audio/sfx/player/hurt.ogg');
        scene.load.audio('sfx_player_death', 'assets/audio/sfx/player/death.ogg');
        
        // Enemy SFX
        scene.load.audio('sfx_enemy_hurt', 'assets/audio/sfx/enemy/hurt.ogg');
        scene.load.audio('sfx_enemy_death', 'assets/audio/sfx/enemy/death.ogg');
        
        // UI SFX
        scene.load.audio('sfx_ui_click', 'assets/audio/sfx/ui/click.ogg');
        scene.load.audio('sfx_ui_hover', 'assets/audio/sfx/ui/hover.ogg');
    }
    
    create() {
        // Create BGM tracks
        this.bgm.menu = this.scene.sound.add('bgm_menu', { loop: true, volume: 0.5 });
        this.bgm.dungeon = this.scene.sound.add('bgm_dungeon', { loop: true, volume: 0.5 });
        this.bgm.combat = this.scene.sound.add('bgm_combat', { loop: true, volume: 0.5 });
        
        // Create SFX
        this.sfx.player.attack = this.scene.sound.add('sfx_player_attack', { volume: 0.7 });
        this.sfx.player.hurt = this.scene.sound.add('sfx_player_hurt', { volume: 0.7 });
        this.sfx.player.death = this.scene.sound.add('sfx_player_death', { volume: 0.7 });
        
        this.sfx.enemy.hurt = this.scene.sound.add('sfx_enemy_hurt', { volume: 0.6 });
        this.sfx.enemy.death = this.scene.sound.add('sfx_enemy_death', { volume: 0.6 });
        
        this.sfx.ui.click = this.scene.sound.add('sfx_ui_click', { volume: 0.5 });
        this.sfx.ui.hover = this.scene.sound.add('sfx_ui_hover', { volume: 0.3 });
    }
    
    playBGM(key) {
        if (this.currentBGM === this.bgm[key]) return;
        
        if (this.currentBGM) {
            this.currentBGM.stop();
        }
        
        this.currentBGM = this.bgm[key];
        if (this.currentBGM) {
            this.currentBGM.play();
        }
    }
    
    playSFX(category, name) {
        if (this.sfx[category] && this.sfx[category][name]) {
            this.sfx[category][name].play();
        }
    }
    
    stopAll() {
        this.scene.sound.stopAll();
        this.currentBGM = null;
    }
}