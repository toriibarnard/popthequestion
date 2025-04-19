// Foreground elements: ground, interactive locations, decorations

// Ground tiles and decorations
const groundTiles = [];
const foregroundDecorations = [];

// Initialize foreground elements
function initializeForeground() {
  // Create ground tiles
  for (let x = 0; x < mapWidth; x += 40) {
    // Main ground
    groundTiles.push({
      x: x,
      y: 500,
      width: 40,
      height: 100,
      type: 'ground'
    });
    
    // Grass on top of ground
    if (Math.random() > 0.7) {
      foregroundDecorations.push({
        type: 'grass',
        x: x + Math.random() * 35,
        y: 497,
        width: 10 + Math.random() * 15,
        height: 5 + Math.random() * 8
      });
    }
  }
  
  // Add some flowers
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * mapWidth;
    
    foregroundDecorations.push({
      type: 'flower',
      x: x,
      y: 495,
      flowerType: Math.floor(Math.random() * 3)
    });
  }
  
  // Add street lamps in foreground
  for (let i = 0; i < 10; i++) {
    const x = 150 + i * 300;
    
    foregroundDecorations.push({
      type: 'streetLamp',
      x: x,
      y: 500
    });
  }
  
  // Add street signs near locations
  locations.forEach(location => {
    if (location.id !== 'proposal') {
      foregroundDecorations.push({
        type: 'streetSign',
        x: location.x - 50,
        y: 440,
        text: location.name
      });
    }
  });
  
  // Special decorations for proposal spot
  addProposalDecorations();
}

// Add special decorations around the proposal spot
function addProposalDecorations() {
  const proposalLocation = locations.find(loc => loc.id === 'proposal');
  if (!proposalLocation) return;
  
  const centerX = proposalLocation.x + proposalLocation.width / 2;
  
  // Add fairy lights around the area
  for (let i = 0; i < 10; i++) {
    const x = centerX - 100 + i * 20;
    
    foregroundDecorations.push({
      type: 'fairyLight',
      x: x,
      y: 440,
      color: i % 2 === 0 ? '#FFD700' : '#FF69B4'
    });
  }
  
  // Add flowers around the gazebo
  for (let i = 0; i < 20; i++) {
    const x = centerX - 100 + Math.random() * 200;
    
    foregroundDecorations.push({
      type: 'flower',
      x: x,
      y: 495,
      flowerType: Math.floor(Math.random() * 3)
    });
  }
  
  // Add heart decorations
  for (let i = 0; i < 5; i++) {
    const x = centerX - 80 + i * 40;
    
    foregroundDecorations.push({
      type: 'heart',
      x: x,
      y: 430,
      size: 10 + Math.random() * 5
    });
  }
}

// Draw the foreground elements
function drawForeground() {
  // Draw ground
  groundTiles.forEach(tile => {
    if (isInCameraView(tile)) {
      drawGroundTile(tile.x - camera.x, tile.y, tile.width, tile.height);
    }
  });
  
  // Draw foreground decorations
  foregroundDecorations.forEach(decoration => {
    if (isInCameraView(decoration)) {
      switch(decoration.type) {
        case 'grass':
          drawGrass(decoration.x - camera.x, decoration.y, decoration.width, decoration.height);
          break;
          
        case 'flower':
          drawFlower(decoration.x - camera.x, decoration.y, decoration.flowerType);
          break;
          
        case 'streetLamp':
          drawStreetLamp(decoration.x - camera.x, decoration.y);
          break;
          
        case 'streetSign':
          drawStreetSign(decoration.x - camera.x, decoration.y, decoration.text);
          break;
          
        case 'fairyLight':
          drawFairyLight(decoration.x - camera.x, decoration.y, decoration.color);
          break;
          
        case 'heart':
          drawHeartDecoration(decoration.x - camera.x, decoration.y, decoration.size);
          break;
      }
    }
  });
}

// Draw a ground tile
function drawGroundTile(x, y, width, height) {
  // Main ground
  const groundGradient = ctx.createLinearGradient(x, y, x, y + height);
  groundGradient.addColorStop(0, '#9E9E9E'); // Sidewalk color
  groundGradient.addColorStop(0.1, '#757575');
  groundGradient.addColorStop(0.15, '#9E9E9E');
  groundGradient.addColorStop(1, '#424242'); // Darker at bottom
  
  ctx.fillStyle = groundGradient;
  ctx.fillRect(x, y, width, height);
  
  // Sidewalk cracks (random)
  if (Math.random() > 0.7) {
    ctx.strokeStyle = '#616161';
    ctx.lineWidth = 1;
    
    const crackX = x + Math.random() * width;
    const crackY = y + 5;
    
    ctx.beginPath();
    ctx.moveTo(crackX, crackY);
    ctx.lineTo(crackX + (Math.random() * 20 - 10), crackY + 10 + Math.random() * 15);
    ctx.stroke();
  }
  
  // Sidewalk lines
  if (x % 80 < 2) {
    ctx.strokeStyle = '#616161';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 15);
    ctx.stroke();
  }
}

// Draw grass
function drawGrass(x, y, width, height) {
  ctx.fillStyle = '#4CAF50';
  
  // Draw individual grass blades
  for (let i = 0; i < width; i += 3) {
    const grassHeight = height * (0.7 + Math.random() * 0.3);
    const tipX = x + i + (Math.random() * 3 - 1.5);
    
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(tipX, y - grassHeight);
    ctx.lineTo(x + i + 1.5, y);
    ctx.closePath();
    ctx.fill();
  }
}

// Draw a flower
function drawFlower(x, y, flowerType) {
  // Stem
  ctx.strokeStyle = '#388E3C';
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 10 - Math.random() * 5);
  ctx.stroke();
  
  // Flower head
  let color;
  switch(flowerType) {
    case 0: color = '#E91E63'; break; // Pink
    case 1: color = '#FFC107'; break; // Yellow
    case 2: color = '#9C27B0'; break; // Purple
  }
  
  const petalSize = 3 + Math.random() * 2;
  
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const petalX = x + Math.cos(angle) * petalSize;
    const petalY = y - 12 + Math.sin(angle) * petalSize;
    
    ctx.beginPath();
    ctx.arc(petalX, petalY, petalSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Flower center
  ctx.fillStyle = '#FFC107';
  ctx.beginPath();
  ctx.arc(x, y - 12, petalSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Draw a street lamp
function drawStreetLamp(x, y) {
  const height = 120;
  const time = Date.now() / 1000;
  
  // Lamp post
  ctx.fillStyle = '#424242';
  ctx.fillRect(x - 3, y - height, 6, height);
  
  // Lamp arm
  ctx.fillRect(x, y - height + 20, 25, 4);
  
  // Lamp housing
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.ellipse(x + 25, y - height + 22, 10, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Light glow with flicker effect
  const flickerIntensity = 0.8 + Math.sin(time * 10) * 0.2;
  ctx.fillStyle = `rgba(255, 255, 150, ${0.4 * flickerIntensity})`;
  
  ctx.beginPath();
  ctx.ellipse(x + 25, y - height + 22, 15 * flickerIntensity, 20 * flickerIntensity, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Light cone
  const gradient = ctx.createRadialGradient(
    x + 25, y - height + 22, 0,
    x + 25, y - height + 22, 70
  );
  gradient.addColorStop(0, 'rgba(255, 255, 150, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 150, 0)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x + 25, y - height + 22);
  ctx.lineTo(x - 20, y);
  ctx.lineTo(x + 70, y);
  ctx.closePath();
  ctx.fill();
}

// Draw a street sign
function drawStreetSign(x, y, text) {
  // Sign post
  ctx.fillStyle = '#616161';
  ctx.fillRect(x, y, 3, 60);
  
  // Sign background
  ctx.fillStyle = '#E0E0E0';
  const textWidth = ctx.measureText(text).width;
  const signWidth = textWidth + 20;
  
  ctx.fillRect(x + 3, y + 10, signWidth, 20);
  
  // Sign text
  ctx.fillStyle = '#212121';
  ctx.font = '10px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(text, x + 12, y + 23);
}

// Draw a fairy light
function drawFairyLight(x, y, color) {
  const time = Date.now() / 1000;
  const pulseScale = 0.7 + Math.sin(time * 2 + x * 0.1) * 0.3;
  
  // Light glow
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 3 * pulseScale, 0, Math.PI * 2);
  ctx.fill();
  
  // Outer glow
  const rgbColor = hexToRgb(color);
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
  ctx.beginPath();
  ctx.arc(x, y, 6 * pulseScale, 0, Math.PI * 2);
  ctx.fill();
}

// Draw a decorative heart
function drawHeartDecoration(x, y, size) {
  const time = Date.now() / 1000;
  const pulseScale = 0.8 + Math.sin(time * 1.5) * 0.2;
  const scaledSize = size * pulseScale;
  
  ctx.fillStyle = '#FF4081';
  
  ctx.beginPath();
  ctx.moveTo(x, y + scaledSize * 0.3);
  ctx.bezierCurveTo(
    x, y, 
    x - scaledSize, y, 
    x - scaledSize, y + scaledSize * 0.3
  );
  ctx.bezierCurveTo(
    x - scaledSize, y + scaledSize * 0.6, 
    x - scaledSize * 0.5, y + scaledSize, 
    x, y + scaledSize * 1.2
  );
  ctx.bezierCurveTo(
    x + scaledSize * 0.5, y + scaledSize, 
    x + scaledSize, y + scaledSize * 0.6, 
    x + scaledSize, y + scaledSize * 0.3
  );
  ctx.bezierCurveTo(
    x + scaledSize, y, 
    x, y, 
    x, y + scaledSize * 0.3
  );
  ctx.closePath();
  ctx.fill();
}