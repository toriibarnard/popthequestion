// Foreground elements: ground, interactive locations, decorations for cyberpunk night city

// Ground tiles and decorations
const groundTiles = [];
const foregroundDecorations = [];

// Initialize foreground elements
function initializeForeground() {
  // Create ground tiles
  for (let x = 0; x < mapWidth; x += 40) {
    // Main ground (nighttime street)
    groundTiles.push({
      x: x,
      y: 500,
      width: 40,
      height: 100,
      type: 'ground'
    });
    
    // Add street details
    if (x % 240 < 40) {
      // Street drain
      foregroundDecorations.push({
        type: 'drain',
        x: x + 15,
        y: 502,
        width: 10,
        height: 4
      });
    }
    
    // Add street markings
    if (x % 200 < 80) {
      foregroundDecorations.push({
        type: 'streetMarking',
        x: x + (x % 200 < 40 ? 0 : 40),
        y: 520,
        width: 40,
        height: 5
      });
    }
  }
  
  // Add street lamps
  for (let i = 0; i < 15; i++) {
    const x = 200 + i * 200;
    
    foregroundDecorations.push({
      type: 'streetLamp',
      x: x,
      y: 500
    });
  }
  
  // Add neon signs near locations
  locations.forEach((location, index) => {
    if (location.id !== 'proposal') {
      // Add neon signs near each location
      foregroundDecorations.push({
        type: 'neonSign',
        x: location.x - 60,
        y: 400,
        text: location.name,
        color: getLocationColor(location.id)
      });
    }
  });
  
  // Add cyberpunk-style puddles that reflect neon
  for (let i = 0; i < 12; i++) {
    const x = 100 + i * 250 + Math.random() * 50;
    
    foregroundDecorations.push({
      type: 'puddle',
      x: x,
      y: 505,
      width: 60 + Math.random() * 40,
      height: 8 + Math.random() * 5
    });
  }
  
  // Special decorations for proposal spot
  addProposalDecorations();
}

// Get color based on location type
function getLocationColor(locationType) {
  switch(locationType) {
    case 'instagram': return '#E1306C'; // Instagram pink
    case 'restaurant': return '#D4AF37'; // Gold
    case 'song': return '#1DB954'; // Spotify green
    case 'ramen': return '#FF5722'; // Orange
    case 'proposal': return '#FF4081'; // Pink
    default: return '#FFFFFF';
  }
}

// Add special decorations around the proposal spot
function addProposalDecorations() {
  const proposalLocation = locations.find(loc => loc.id === 'proposal');
  if (!proposalLocation) return;
  
  const centerX = proposalLocation.x + proposalLocation.width / 2;
  
  // Add neon hearts around the area
  for (let i = 0; i < 6; i++) {
    const x = centerX - 120 + i * 40;
    
    foregroundDecorations.push({
      type: 'neonHeart',
      x: x,
      y: 400 - (i % 2) * 20, // Alternate heights
      size: 15 + (i % 3) * 5,
      color: i % 2 === 0 ? '#FF4081' : '#00FFFF' // Alternate colors
    });
  }
  
  // Add floating lanterns
  for (let i = 0; i < 10; i++) {
    const x = centerX - 100 + i * 20;
    
    foregroundDecorations.push({
      type: 'floatingLantern',
      x: x,
      y: 380 - (i % 3) * 10,
      speed: 0.2 + Math.random() * 0.3,
      color: ['#FF4081', '#FFC107', '#00FFFF'][i % 3]
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
        case 'drain':
          drawDrain(decoration.x - camera.x, decoration.y, decoration.width, decoration.height);
          break;
          
        case 'streetMarking':
          drawStreetMarking(decoration.x - camera.x, decoration.y, decoration.width, decoration.height);
          break;
          
        case 'streetLamp':
          drawCyberpunkStreetLamp(decoration.x - camera.x, decoration.y);
          break;
          
        case 'neonSign':
          drawNeonSign(decoration.x - camera.x, decoration.y, decoration.text, decoration.color);
          break;
          
        case 'puddle':
          drawPuddle(decoration.x - camera.x, decoration.y, decoration.width, decoration.height);
          break;
          
        case 'neonHeart':
          drawNeonHeart(decoration.x - camera.x, decoration.y, decoration.size, decoration.color);
          break;
          
        case 'floatingLantern':
          drawFloatingLantern(decoration.x - camera.x, decoration.y, decoration.color, decoration.speed);
          break;
      }
    }
  });
}

// Draw a cyberpunk night city street tile
function drawGroundTile(x, y, width, height) {
  // Dark asphalt ground
  const groundGradient = ctx.createLinearGradient(x, y, x, y + height);
  groundGradient.addColorStop(0, '#1E1E24'); // Dark nighttime street
  groundGradient.addColorStop(0.1, '#2B2B35');
  groundGradient.addColorStop(1, '#111116'); // Darker at bottom
  
  ctx.fillStyle = groundGradient;
  ctx.fillRect(x, y, width, height);
  
  // Random subtle street texture
  if (Math.random() > 0.8) {
    ctx.fillStyle = 'rgba(30, 30, 36, 0.7)';
    ctx.fillRect(x + Math.random() * width * 0.8, y + Math.random() * 10, 5 + Math.random() * 10, 2);
  }
}

// Draw a street drain
function drawDrain(x, y, width, height) {
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, width, height);
  
  // Drain grate
  ctx.fillStyle = '#222';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(x + 2 + i * 3, y, 1, height);
  }
}

// Draw street markings
function drawStreetMarking(x, y, width, height) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Faded white
  ctx.fillRect(x, y, width, height);
}

// Draw a cyberpunk street lamp
function drawCyberpunkStreetLamp(x, y) {
  const height = 120;
  const time = Date.now() / 1000;
  
  // Lamp post
  ctx.fillStyle = '#333';
  ctx.fillRect(x - 3, y - height, 6, height);
  
  // Lamp arm
  ctx.fillRect(x, y - height + 20, 25, 4);
  
  // Lamp housing
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.ellipse(x + 25, y - height + 22, 10, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Randomly choose between cyan, purple, or pink for the neon light
  const lampColors = ['#00FFFF', '#FF00FF', '#FF007F'];
  const colorIndex = Math.floor(x / 200) % lampColors.length;
  const lampColor = lampColors[colorIndex];
  
  // Light glow with flicker effect
  const flickerIntensity = 0.8 + Math.sin(time * 10) * 0.2;
  
  // Convert hex to rgba
  const rgbColor = hexToRgb(lampColor);
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${0.4 * flickerIntensity})`;
  
  ctx.beginPath();
  ctx.ellipse(x + 25, y - height + 22, 15 * flickerIntensity, 20 * flickerIntensity, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Light cone
  const gradient = ctx.createRadialGradient(
    x + 25, y - height + 22, 0,
    x + 25, y - height + 22, 70
  );
  gradient.addColorStop(0, `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`);
  gradient.addColorStop(1, `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`);
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x + 25, y - height + 22);
  ctx.lineTo(x - 20, y);
  ctx.lineTo(x + 70, y);
  ctx.closePath();
  ctx.fill();
}

// Draw a neon sign
function drawNeonSign(x, y, text, color) {
  const time = Date.now() / 1000;
  const flicker = Math.sin(time * 10 + x) > 0.9 ? 0.7 : 1; // Occasional flicker
  
  // Sign background
  ctx.fillStyle = '#111';
  
  const textWidth = ctx.measureText(text).width;
  const signWidth = textWidth + 30;
  const signHeight = 25;
  
  ctx.fillRect(x, y, signWidth, signHeight);
  
  // Neon text
  ctx.fillStyle = color;
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + signWidth / 2, y + 17);
  
  // Neon glow
  if (flicker > 0.9) {
    const rgbColor = hexToRgb(color);
    ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
    ctx.fillText(text, x + signWidth / 2, y + 17);
    ctx.fillText(text, x + signWidth / 2, y + 17);
  }
}

// Draw a neon heart
function drawNeonHeart(x, y, size, color) {
  const time = Date.now() / 1000;
  const pulse = 0.8 + Math.sin(time * 2 + x * 0.1) * 0.2;
  const flicker = Math.sin(time * 15 + x) > 0.95 ? 0.5 : 1; // Occasional flicker
  
  // Draw heart shape
  ctx.fillStyle = color;
  
  const scaledSize = size * pulse * flicker;
  
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
  
  // Neon glow
  const rgbColor = hexToRgb(color);
  ctx.shadowColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.8)`;
  ctx.shadowBlur = 10 * pulse;
  
  ctx.stroke();
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
}

// Draw a realistic water puddle that reflects neon
function drawPuddle(x, y, width, height) {
  // Base puddle shape
  ctx.fillStyle = 'rgba(10, 10, 20, 0.7)'; // Dark water
  
  // Elliptical puddle
  ctx.beginPath();
  ctx.ellipse(x + width/2, y + height/2, width/2, height, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Get random neon colors to reflect
  const neonColors = ['#00FFFF', '#FF00FF', '#FF007F', '#1DB954'];
  const reflectionColor = neonColors[Math.floor(Math.random() * neonColors.length)];
  
  // Add a subtle neon reflection
  const rgbColor = hexToRgb(reflectionColor);
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1)`;
  
  // Reflection is thinner than the puddle
  ctx.beginPath();
  ctx.ellipse(
    x + width/2, 
    y + height/2, 
    width/4, 
    height/2, 
    0, 0, Math.PI * 2
  );
  ctx.fill();
  
  // Add ripple effect
  const time = Date.now() / 1000;
  ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`;
  ctx.lineWidth = 1;
  
  const rippleCount = 2;
  for (let i = 0; i < rippleCount; i++) {
    const rippleScale = (0.5 + 0.5 * ((time + i) % 2) / 2);
    
    ctx.beginPath();
    ctx.ellipse(
      x + width/2, 
      y + height/2, 
      width/2 * rippleScale, 
      height * rippleScale, 
      0, 0, Math.PI * 2
    );
    ctx.stroke();
  }
}

// Draw a floating paper lantern
function drawFloatingLantern(x, y, color, speed) {
  const time = Date.now() / 1000;
  const floatY = y + Math.sin(time * speed) * 5;
  
  // Lantern body
  ctx.fillStyle = color;
  ctx.fillRect(x - 8, floatY, 16, 20);
  
  // Lantern top
  ctx.beginPath();
  ctx.moveTo(x - 10, floatY);
  ctx.lineTo(x + 10, floatY);
  ctx.lineTo(x + 5, floatY - 5);
  ctx.lineTo(x - 5, floatY - 5);
  ctx.closePath();
  ctx.fill();
  
  // Lantern bottom
  ctx.beginPath();
  ctx.moveTo(x - 8, floatY + 20);
  ctx.lineTo(x + 8, floatY + 20);
  ctx.lineTo(x + 5, floatY + 25);
  ctx.lineTo(x - 5, floatY + 25);
  ctx.closePath();
  ctx.fill();
  
  // Lantern glow
  const rgbColor = hexToRgb(color);
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
  ctx.beginPath();
  ctx.arc(x, floatY + 10, 12 + Math.sin(time * 2) * 2, 0, Math.PI * 2);
  ctx.fill();
  
  // String
  ctx.strokeStyle = '#DDD';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, floatY - 5);
  ctx.lineTo(x, floatY - 15);
  ctx.stroke();
}