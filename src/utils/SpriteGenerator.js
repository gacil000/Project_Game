// Sprite Generator - Create placeholder spritesheets dynamically
// This generates colorful pixel art sprites for testing
// Will be replaced with real assets later

export function generateCharacterSpritesheet(scene, characterName, color) {
  const size = 64;
  const frameWidth = size;
  const frameHeight = size;
  const cols = 4;
  const rows = 3;
  
  const canvasWidth = frameWidth * cols;
  const canvasHeight = frameHeight * rows;
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw frames
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * frameWidth;
      const y = row * frameHeight;
      
      // Draw frame background (slight variation per row)
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7 + (row * 0.1);
      ctx.fillRect(x + 8, y + 8, frameWidth - 16, frameHeight - 16);
      ctx.globalAlpha = 1;
      
      // Draw character body (simple pixel art style)
      drawCharacter(ctx, x, y, frameWidth, frameHeight, color, row, col);
      
      // Border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, frameWidth, frameHeight);
    }
  }
  
  // Convert to texture
  const texture = canvas.toDataURL();
  scene.textures.addBase64(characterName, texture);
  
  return {
    key: characterName,
    width: canvasWidth,
    height: canvasHeight,
    frameWidth: frameWidth,
    frameHeight: frameHeight
  };
}

function drawCharacter(ctx, x, y, w, h, color, row, col) {
  const centerX = x + w / 2;
  const centerY = y + h / 2;
  const scale = 0.3;
  
  // Head
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY - 8, 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Body
  ctx.fillRect(centerX - 4, centerY - 2, 8, 10);
  
  // Limbs (vary by animation frame)
  const legOffset = Math.sin((row * 2 + col) * 0.5) * 3;
  const armOffset = Math.cos((row * 2 + col) * 0.5) * 2;
  
  // Left arm
  ctx.fillRect(centerX - 7, centerY, 3, 5 + armOffset);
  // Right arm
  ctx.fillRect(centerX + 4, centerY, 3, 5 - armOffset);
  // Left leg
  ctx.fillRect(centerX - 4, centerY + 8, 3, 5 + legOffset);
  // Right leg
  ctx.fillRect(centerX + 1, centerY + 8, 3, 5 - legOffset);
}

export function generateEnemySpritesheet(scene, enemyName, color) {
  const size = 64;
  const frameWidth = size;
  const frameHeight = size;
  const cols = 4;
  const rows = 3;
  
  const canvasWidth = frameWidth * cols;
  const canvasHeight = frameHeight * rows;
  
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * frameWidth;
      const y = row * frameHeight;
      
      // Enemy body
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      
      // Vary enemy type by row
      if (row === 0) {
        // Blob/Slime
        drawBlob(ctx, x, y, frameWidth, frameHeight, color, col);
      } else if (row === 1) {
        // Humanoid/Ogre
        drawHumanoid(ctx, x, y, frameWidth, frameHeight, color, col);
      } else {
        // Monster/Creature
        drawMonster(ctx, x, y, frameWidth, frameHeight, color, col);
      }
      
      ctx.globalAlpha = 1;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, frameWidth, frameHeight);
    }
  }
  
  const texture = canvas.toDataURL();
  scene.textures.addBase64(enemyName, texture);
  
  return {
    key: enemyName,
    width: canvasWidth,
    height: canvasHeight,
    frameWidth: frameWidth,
    frameHeight: frameHeight
  };
}

function drawBlob(ctx, x, y, w, h, color, frame) {
  const centerX = x + w / 2;
  const centerY = y + h / 2;
  const wobble = Math.sin(frame * 0.8) * 2;
  
  // Blob shape
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, 12 + wobble, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#000';
  ctx.fillRect(centerX - 6, centerY - 3, 3, 3);
  ctx.fillRect(centerX + 3, centerY - 3, 3, 3);
}

function drawHumanoid(ctx, x, y, w, h, color, frame) {
  const centerX = x + w / 2;
  const centerY = y + h / 2;
  
  // Head
  ctx.fillRect(centerX - 6, centerY - 12, 12, 12);
  
  // Body
  ctx.fillRect(centerX - 7, centerY, 14, 12);
  
  // Arms (wider, more aggressive)
  ctx.fillRect(centerX - 9, centerY + 2, 4, 10);
  ctx.fillRect(centerX + 5, centerY + 2, 4, 10);
  
  // Legs
  const legVariation = Math.sin(frame * 0.6) * 2;
  ctx.fillRect(centerX - 5, centerY + 12, 4, 8 + legVariation);
  ctx.fillRect(centerX + 1, centerY + 12, 4, 8 - legVariation);
}

function drawMonster(ctx, x, y, w, h, color, frame) {
  const centerX = x + w / 2;
  const centerY = y + h / 2;
  
  // Spiky monster
  ctx.beginPath();
  ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Spikes (vary animation)
  const spikeCount = 8;
  for (let i = 0; i < spikeCount; i++) {
    const angle = (i / spikeCount) * Math.PI * 2;
    const spikeLen = 5 + Math.sin(frame * 0.4 + i) * 2;
    const fromX = centerX + Math.cos(angle) * 10;
    const fromY = centerY + Math.sin(angle) * 10;
    const toX = centerX + Math.cos(angle) * (10 + spikeLen);
    const toY = centerY + Math.sin(angle) * (10 + spikeLen);
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }
  
  // Eyes
  ctx.fillStyle = '#000';
  ctx.fillRect(centerX - 5, centerY - 3, 2, 2);
  ctx.fillRect(centerX + 3, centerY - 3, 2, 2);
}

// Initialize all placeholder sprites
export function initializePlaceholderSprites(scene) {
  const characters = [
    { key: 'elf_bladedancer', color: '#4169E1' },      // Royal Blue
    { key: 'elf_enchanter', color: '#9932CC' },        // Dark Orchid
    { key: 'merfolk_scout', color: '#20B2AA' },        // Light Sea Green
    { key: 'adventurous_adolescent', color: '#FFD700' }// Gold
  ];
  
  const enemies = [
    { key: 'ochre_jelly', color: '#DAA520' },          // Goldenrod
    { key: 'brawny_ogre', color: '#8B4513' },          // Saddle Brown
    { key: 'crimson_slaad', color: '#DC143C' },        // Crimson
    { key: 'stone_troll', color: '#808080' },          // Gray
    { key: 'crushing_cyclops', color: '#696969' },     // Dim Gray
    { key: 'blinded_grimlock', color: '#2F4F4F' },     // Dark Slate Gray
    { key: 'death_slime', color: '#32CD32' },          // Lime Green
    { key: 'fungal_myconid', color: '#9400D3' }        // Dark Violet
  };
  
  // Generate character spritesheets
  characters.forEach(char => {
    generateCharacterSpritesheet(scene, char.key, char.color);
  });
  
  // Generate enemy spritesheets
  enemies.forEach(enemy => {
    generateEnemySpritesheet(scene, enemy.key, enemy.color);
  });
}
