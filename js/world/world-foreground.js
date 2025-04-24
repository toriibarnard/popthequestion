// Foreground elements: ground, interactive locations, NPCs, and decorations for 8-bit cyberpunk night city

// Ground tiles and decorations
const groundTiles = [];
const foregroundDecorations = [];

// NPCs and interactive objects
const npcs = [];
const interactiveObjects = [];

// Initialize foreground elements
function initializeForeground() {
  console.log("Initializing 8-bit cyberpunk foreground...");
  
  // Clear existing arrays
  groundTiles.length = 0;
  foregroundDecorations.length = 0;
  npcs.length = 0;
  interactiveObjects.length = 0;
  
  // Create ground tiles with cyberpunk 8-bit style
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
      // Street drain with pixelated grate
      foregroundDecorations.push({
        type: 'drain',
        x: x + 15,
        y: 502,
        width: 10,
        height: 4,
        pixelSize: 2
      });
    }
    
    // Add street markings in 8-bit style
    if (x % 200 < 80) {
      foregroundDecorations.push({
        type: 'streetMarking',
        x: x + (x % 200 < 40 ? 0 : 40),
        y: 520,
        width: 40,
        height: 5,
        pixelSize: 2
      });
    }
  }
  
  // Add cyberpunk street lamps in 8-bit style
  for (let i = 0; i < 30; i++) {
    const x = 200 + i * 200;
    
    foregroundDecorations.push({
      type: 'streetLamp',
      x: x,
      y: 500,
      pixelSize: 4
    });
  }
  
  // Add pixelated neon signs near locations
  locations.forEach((location, index) => {
    if (location.id !== 'proposal') {
      // Add neon signs near each location
      foregroundDecorations.push({
        type: 'neonSign',
        x: location.x - 60,
        y: 400,
        text: location.name,
        color: getLocationColor(location.id),
        pixelSize: 4
      });
    }
  });
  
  // Add cyberpunk-style puddles that reflect neon
  for (let i = 0; i < 20; i++) {
    const x = 100 + i * 250 + Math.random() * 50;
    
    foregroundDecorations.push({
      type: 'puddle',
      x: x,
      y: 505,
      width: 60 + Math.random() * 40,
      height: 8 + Math.random() * 5,
      pixelSize: 2
    });
  }
  
  // Add NPCs to the scene
  initializeNPCs();
  
  // Add interactive objects
  initializeInteractiveObjects();
  
  // Special decorations for proposal spot
  addProposalDecorations();
  
  console.log("Foreground initialized with", groundTiles.length, "ground tiles,", foregroundDecorations.length, "decorations,", 
              npcs.length, "NPCs, and", interactiveObjects.length, "interactive objects");
}

// Add NPCs to the scene
function initializeNPCs() {
  // NPC types: 'cyborg', 'punk', 'corp', 'vendor', 'robot'
  const npcTypes = ['cyborg', 'punk', 'corp', 'vendor', 'robot'];
  
  // Place NPCs at strategic locations
  for (let i = 0; i < 19; i++) {
    const x = 300 + i * 280 + Math.random() * 100;
    const type = npcTypes[Math.floor(Math.random() * npcTypes.length)];
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    const moving = Math.random() > 0.7;
    
    npcs.push({
      type: type,
      x: x,
      y: 500,
      direction: direction,
      moving: moving,
      moveSpeed: 0.5 + Math.random() * 0.5,
      animationState: 0,
      animationFrame: 0,
      pixelSize: 4,
      // Movement boundaries - stay within a local area
      minX: x - 100,
      maxX: x + 100
    });
  }
  
  // Add a static group of NPCs near a location
  const specialLocation = locations.find(loc => loc.id === 'restaurant' || loc.id === 'ramen');
  if (specialLocation) {
    const groupX = specialLocation.x + 40;
    
    // Add a small group of NPCs
    for (let i = 0; i < 3; i++) {
      npcs.push({
        type: i === 0 ? 'vendor' : (i === 1 ? 'punk' : 'cyborg'),
        x: groupX + i * 30,
        y: 500,
        direction: i % 2 === 0 ? 'left' : 'right',
        moving: false,
        animationState: 0,
        animationFrame: 0,
        pixelSize: 4,
        conversing: true // These NPCs are conversing
      });
    }
  }
}

// Add interactive objects to the scene
function initializeInteractiveObjects() {
  // Add various cyberpunk objects throughout the scene
  
  // Vending machines
  for (let i = 0; i < 10; i++) {
    const x = 400 + i * 600 + Math.random() * 200;
    
    interactiveObjects.push({
      type: 'vendingMachine',
      x: x,
      y: 500,
      width: 30,
      height: 60,
      pixelSize: 4,
      color: ['#FF00FF', '#00FFFF', '#FF5722'][i % 3],
      animated: true
    });
  }
  
  // Holographic displays
  for (let i = 0; i < 15; i++) {
    const x = 250 + i * 400 + Math.random() * 100;
    
    interactiveObjects.push({
      type: 'hologram',
      x: x,
      y: 450,
      width: 50,
      height: 30,
      pixelSize: 2,
      content: ['SALE', 'NEWS', 'WANTED', '24/7', 'BYTES'][i % 5],
      color: ['#00FFFF', '#FF00FF', '#FFCC00', '#66FF66'][i % 4],
      animated: true
    });
  }
  
  // Trash cans and dumpsters
  for (let i = 0; i < 18; i++) {
    const x = 180 + i * 320 + Math.random() * 60;
    const isLarge = Math.random() > 0.7;
    
    interactiveObjects.push({
      type: isLarge ? 'dumpster' : 'trashCan',
      x: x,
      y: 500,
      width: isLarge ? 40 : 20,
      height: isLarge ? 30 : 25,
      pixelSize: 4
    });
  }
  
  // Flying drones
  for (let i = 0; i < 9; i++) {
    const x = 300 + i * 600;
    const y = 350 + Math.random() * 100;
    
    interactiveObjects.push({
      type: 'drone',
      x: x,
      y: y,
      pixelSize: 4,
      direction: Math.random() > 0.5 ? 'left' : 'right',
      moveSpeed: 0.7 + Math.random() * 0.5,
      minX: x - 200,
      maxX: x + 200,
      minY: y - 30,
      maxY: y + 30,
      lights: ['#FF0000', '#00FFFF', '#FFCC00'][i % 3]
    });
  }
  
  // Digital billboards
  for (let i = 0; i < 7; i++) {
    const x = 400 + i * 800;
    
    interactiveObjects.push({
      type: 'billboard',
      x: x,
      y: 350,
      width: 120,
      height: 70,
      pixelSize: 4,
      content: ['CYBER', 'NEON', 'PIXEL'][i % 3],
      animated: true
    });
  }
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
  
  // Add neon hearts around the area in 8-bit style
  for (let i = 0; i < 6; i++) {
    const x = centerX - 120 + i * 40;
    
    foregroundDecorations.push({
      type: 'neonHeart',
      x: x,
      y: 400 - (i % 2) * 20, // Alternate heights
      size: 15 + (i % 3) * 5,
      color: i % 2 === 0 ? '#FF4081' : '#00FFFF', // Alternate colors
      pixelSize: 2
    });
  }
  
  // Add floating lanterns in 8-bit style
  for (let i = 0; i < 10; i++) {
    const x = centerX - 100 + i * 20;
    
    foregroundDecorations.push({
      type: 'floatingLantern',
      x: x,
      y: 380 - (i % 3) * 10,
      speed: 0.2 + Math.random() * 0.3,
      color: ['#FF4081', '#FFC107', '#00FFFF'][i % 3],
      pixelSize: 2
    });
  }
  
  // Add special proposal-specific decorations
  
  // Pixel confetti
  for (let i = 0; i < 30; i++) {
    foregroundDecorations.push({
      type: 'pixelConfetti',
      x: centerX - 80 + Math.random() * 160,
      y: 420 - Math.random() * 100,
      size: 2 + Math.random() * 2,
      speed: 0.3 + Math.random() * 0.5,
      color: ['#FF4081', '#00FFFF', '#FFFF00', '#66FF66', '#FF66FF'][Math.floor(Math.random() * 5)],
      pixelSize: 2
    });
  }
  
  // Special holographic ring display
  interactiveObjects.push({
    type: 'ringHologram',
    x: centerX,
    y: 450,
    size: 25,
    pixelSize: 2,
    color: '#FF4081',
    animated: true
  });
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
          drawDrain(decoration.x - camera.x, decoration.y, decoration.width, decoration.height, decoration.pixelSize);
          break;
          
        case 'streetMarking':
          drawStreetMarking(decoration.x - camera.x, decoration.y, decoration.width, decoration.height, decoration.pixelSize);
          break;
          
        case 'streetLamp':
          drawCyberpunkStreetLamp(decoration.x - camera.x, decoration.y, decoration.pixelSize);
          break;
          
        case 'neonSign':
          drawNeonSign(decoration.x - camera.x, decoration.y, decoration.text, decoration.color, decoration.pixelSize);
          break;
          
        case 'puddle':
          drawPuddle(decoration.x - camera.x, decoration.y, decoration.width, decoration.height, decoration.pixelSize);
          break;
          
        case 'neonHeart':
          drawNeonHeart(decoration.x - camera.x, decoration.y, decoration.size, decoration.color, decoration.pixelSize);
          break;
          
        case 'floatingLantern':
          drawFloatingLantern(decoration.x - camera.x, decoration.y, decoration.color, decoration.speed, decoration.pixelSize);
          break;
          
        case 'pixelConfetti':
          drawPixelConfetti(decoration.x - camera.x, decoration.y, decoration.size, decoration.color, decoration.speed, decoration.pixelSize);
          break;
      }
    }
  });
  
  // Draw interactive objects
  interactiveObjects.forEach(object => {
    if (isInCameraView(object)) {
      switch(object.type) {
        case 'vendingMachine':
          drawVendingMachine(object.x - camera.x, object.y, object.width, object.height, object.color, object.pixelSize);
          break;
          
        case 'hologram':
          drawHologram(object.x - camera.x, object.y, object.width, object.height, object.content, object.color, object.pixelSize);
          break;
          
        case 'trashCan':
          drawTrashCan(object.x - camera.x, object.y, object.width, object.height, object.pixelSize);
          break;
          
        case 'dumpster':
          drawDumpster(object.x - camera.x, object.y, object.width, object.height, object.pixelSize);
          break;
          
        case 'drone':
          drawDrone(object.x - camera.x, object.y, object.direction, object.lights, object.pixelSize);
          updateDronePosition(object);
          break;
          
        case 'billboard':
          drawBillboard(object.x - camera.x, object.y, object.width, object.height, object.content, object.pixelSize);
          break;
          
        case 'ringHologram':
          drawRingHologram(object.x - camera.x, object.y, object.size, object.color, object.pixelSize);
          break;
      }
    }
  });
  
  // Draw NPCs
  npcs.forEach(npc => {
    if (isInCameraView(npc)) {
      drawNPC(npc.x - camera.x, npc.y, npc.type, npc.direction, npc.animationFrame, npc.pixelSize);
      updateNPCState(npc);
    }
  });
}

// Update NPCs position and animation
function updateNPCState(npc) {
  // Update animation frame
  npc.animationFrame = (npc.animationFrame + 0.05) % 4;
  
  // Move NPC if it's a moving one
  if (npc.moving) {
    const direction = npc.direction === 'right' ? 1 : -1;
    npc.x += direction * npc.moveSpeed;
    
    // Change direction if reaching boundary
    if (npc.x <= npc.minX) {
      npc.direction = 'right';
    } else if (npc.x >= npc.maxX) {
      npc.direction = 'left';
    }
  }
}

// Update drone position
function updateDronePosition(drone) {
  // Move drone
  const xDirection = drone.direction === 'right' ? 1 : -1;
  drone.x += xDirection * drone.moveSpeed;
  
  // Gentle floating up and down
  const time = Date.now() / 1000;
  drone.y = drone.minY + Math.sin(time * 1.5) * (drone.maxY - drone.minY) / 2;
  
  // Change direction if reaching boundary
  if (drone.x <= drone.minX) {
    drone.direction = 'right';
  } else if (drone.x >= drone.maxX) {
    drone.direction = 'left';
  }
}

// Drawing functions for various foreground elements

// Draw a cyberpunk night city street tile with 8-bit aesthetic
function drawGroundTile(x, y, width, height) {
  const pixelSize = 4; // Size of pixels for 8-bit look
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  // Dark asphalt ground - solid blocks for 8-bit look
  ctx.fillStyle = '#1E1E24'; // Dark nighttime street
  ctx.fillRect(x, y, width, height);
  
  // Add pixel grid texture
  for (let px = 0; px < width; px += pixelSize * 2) {
    for (let py = 0; py < height; py += pixelSize * 2) {
      if ((px / pixelSize + py / pixelSize) % 2 === 0) {
        ctx.fillStyle = '#191920';
        ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
      }
    }
  }
  
  // Add occasional glowing grid lines for cyber effect
  if (Math.floor(x / (width * 2)) % 4 === 0) {
    ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';
    ctx.fillRect(x, y + height - pixelSize, width, pixelSize);
  }
}

// Draw a street drain with pixelated look
function drawDrain(x, y, width, height, pixelSize) {
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, width, height);
  
  // Drain grate with pixel look
  ctx.fillStyle = '#222';
  for (let i = 0; i < width / pixelSize / 2; i++) {
    ctx.fillRect(x + i * pixelSize * 2, y, pixelSize, height);
  }
}

// Draw street markings with pixelated look
function drawStreetMarking(x, y, width, height, pixelSize) {
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Faded white
  
  // Draw marking as a series of pixels for 8-bit look
  for (let px = 0; px < width; px += pixelSize) {
    for (let py = 0; py < height; py += pixelSize) {
      // Skip some pixels for worn look
      if (Math.random() > 0.2) {
        ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
      }
    }
  }
}

// Draw a cyberpunk street lamp with 8-bit aesthetic
function drawCyberpunkStreetLamp(x, y, pixelSize) {
  const height = 120;
  const time = Date.now() / 1000;
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  
  // Lamp post
  ctx.fillStyle = '#333';
  for (let py = 0; py < height; py += pixelSize) {
    ctx.fillRect(x - pixelSize, y - height + py, pixelSize * 2, pixelSize);
  }
  
  // Lamp arm
  for (let px = 0; px < 25; px += pixelSize) {
    ctx.fillRect(x, y - height + 20, pixelSize * 6, pixelSize);
  }
  
  // Lamp housing - pixelated circle
  ctx.fillStyle = '#222';
  drawPixelCircle(x + 25, y - height + 22, 10, pixelSize, '#222');
  
  // Randomly choose between cyan, purple, or pink for the neon light
  const lampColors = ['#00FFFF', '#FF00FF', '#FF007F'];
  const colorIndex = Math.floor(x / 200) % lampColors.length;
  const lampColor = lampColors[colorIndex];
  
  // Light glow with flicker effect
  const flickerIntensity = 0.8 + Math.sin(time * 10) * 0.2;
  
  // Convert hex to rgba
  const rgbColor = hexToRgb(lampColor);
  
  // Draw pixelated light
  drawPixelCircle(x + 25, y - height + 22, 8 * flickerIntensity, pixelSize, 
                 `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.8)`);
  
  // Light cone as a trapezoid of pixels
  const coneWidth = 60;
  const coneHeight = height - 30;
  
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1)`;
  
  // Draw cone as a series of decreasing rectangles
  for (let i = 0; i < coneHeight; i += pixelSize) {
    const ratio = i / coneHeight;
    const lineWidth = Math.floor((pixelSize * 4 + ratio * coneWidth) / pixelSize) * pixelSize;
    const lineX = x + 25 - lineWidth / 2;
    
    ctx.fillRect(lineX, y - height + 22 + i, lineWidth, pixelSize);
  }
}

// Helper function to draw pixel-perfect circle
function drawPixelCircle(centerX, centerY, radius, pixelSize, color) {
  ctx.fillStyle = color;
  
  // Align to pixel grid
  centerX = Math.floor(centerX / pixelSize) * pixelSize;
  centerY = Math.floor(centerY / pixelSize) * pixelSize;
  
  // Draw circle as collection of pixels
  for (let x = -radius; x <= radius; x += pixelSize) {
    for (let y = -radius; y <= radius; y += pixelSize) {
      if (x*x + y*y <= radius*radius) {
        ctx.fillRect(centerX + x, centerY + y, pixelSize, pixelSize);
      }
    }
  }
}

// Draw a neon sign with 8-bit aesthetic
function drawNeonSign(x, y, text, color, pixelSize) {
  const time = Date.now() / 1000;
  const flicker = Math.sin(time * 10 + x) > 0.9 ? 0.7 : 1; // Occasional flicker
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  
  // Sign background
  ctx.fillStyle = '#111';
  
  const textWidth = ctx.measureText(text).width;
  const signWidth = Math.floor((textWidth + 30) / pixelSize) * pixelSize;
  const signHeight = Math.floor(25 / pixelSize) * pixelSize;
  
  ctx.fillRect(x, y, signWidth, signHeight);
  
  // Draw pixelated border
  ctx.fillStyle = '#333';
  for (let px = 0; px < signWidth; px += pixelSize) {
    ctx.fillRect(x + px, y, pixelSize, pixelSize); // Top
    ctx.fillRect(x + px, y + signHeight - pixelSize, pixelSize, pixelSize); // Bottom
  }
  
  for (let py = pixelSize; py < signHeight - pixelSize; py += pixelSize) {
    ctx.fillRect(x, y + py, pixelSize, pixelSize); // Left
    ctx.fillRect(x + signWidth - pixelSize, y + py, pixelSize, pixelSize); // Right
  }
  
  // Neon text - use original font but add pixel effect
  if (flicker > 0.8) {
    // For 8-bit look, we use small text and pixelate it
    ctx.fillStyle = color;
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text character by character with pixel jitter
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      const charX = x + signWidth / 2 - ((text.length - 1) * 6) + i * 12;
      const charY = y + signHeight / 2 + Math.sin(time * 5 + i) * pixelSize;
      
      ctx.fillText(char, charX, charY);
    }
    
    // Neon glow with pixel-perfect shape
    const rgbColor = hexToRgb(color);
    ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
    
    // Simple glow effect as a slightly larger rectangle
    ctx.fillRect(
      x - pixelSize, 
      y - pixelSize, 
      signWidth + pixelSize * 2, 
      signHeight + pixelSize * 2
    );
  }
}

// Draw a realistic water puddle that reflects neon with pixelated look
function drawPuddle(x, y, width, height, pixelSize) {
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  // Base puddle shape as pixelated ellipse
  ctx.fillStyle = 'rgba(10, 10, 20, 0.7)'; // Dark water
  
  // Draw puddle shape using pixels
  for (let px = 0; px < width; px += pixelSize) {
    for (let py = 0; py < height; py += pixelSize) {
      // Ellipse equation
      const normalizedX = (px - width/2) / (width/2);
      const normalizedY = (py - height/2) / (height/2);
      
      if (normalizedX*normalizedX + normalizedY*normalizedY*4 <= 1) {
        ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
      }
    }
  }
  
  // Get random neon colors to reflect
  const neonColors = ['#00FFFF', '#FF00FF', '#FF007F', '#1DB954'];
  const reflectionColor = neonColors[Math.floor(Math.random() * neonColors.length)];
  
  // Add a subtle neon reflection
  const rgbColor = hexToRgb(reflectionColor);
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.15)`;
  
  // Reflection is thinner than the puddle - pixelated style
  for (let px = width/4; px < width*3/4; px += pixelSize) {
    for (let py = height/4; py < height*3/4; py += pixelSize) {
      // Ellipse equation
      const normalizedX = (px - width/2) / (width/4);
      const normalizedY = (py - height/2) / (height/4);
      
      if (normalizedX*normalizedX + normalizedY*normalizedY*4 <= 1) {
        ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
      }
    }
  }
  
  // Add ripple effect with pixelated circles
  const time = Date.now() / 1000;
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`;
  
  // Draw pixelated ripple rings
  const rippleCount = 2;
  for (let i = 0; i < rippleCount; i++) {
    const rippleProgress = (time + i) % 2 / 2;
    const rippleRadius = Math.floor((width/3 * rippleProgress) / pixelSize) * pixelSize;
    
    // Draw each ripple as a series of pixels in a circle pattern
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI/8) {
      const rippleX = x + width/2 + Math.cos(angle) * rippleRadius;
      const rippleY = y + height/2 + Math.sin(angle) * (rippleRadius / 2); // Elliptical shape
      
      // Only draw if in bounds
      if (rippleX >= x && rippleX < x + width && rippleY >= y && rippleY < y + height) {
        ctx.fillRect(
          Math.floor(rippleX / pixelSize) * pixelSize, 
          Math.floor(rippleY / pixelSize) * pixelSize, 
          pixelSize, pixelSize
        );
      }
    }
  }
  
  // Add occasional glint highlights (small bright spots)
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.6)`;
  
  const glintCount = 3;
  for (let i = 0; i < glintCount; i++) {
    const glintX = x + width/4 + (i * width/3) + Math.sin(time * (i+1)) * width/8;
    const glintY = y + height/3 + Math.cos(time * 1.5 + i) * height/6;
    
    // Draw the glint as a small plus shape
    ctx.fillRect(
      Math.floor(glintX / pixelSize) * pixelSize, 
      Math.floor(glintY / pixelSize) * pixelSize, 
      pixelSize, pixelSize
    );
    
    // Cross pattern for sparkle effect (only on larger puddles)
    if (width > pixelSize * 10 && Math.sin(time * 3 + i) > 0.7) {
      ctx.fillRect(
        Math.floor((glintX - pixelSize) / pixelSize) * pixelSize, 
        Math.floor(glintY / pixelSize) * pixelSize, 
        pixelSize, pixelSize
      );
      ctx.fillRect(
        Math.floor((glintX + pixelSize) / pixelSize) * pixelSize, 
        Math.floor(glintY / pixelSize) * pixelSize, 
        pixelSize, pixelSize
      );
      ctx.fillRect(
        Math.floor(glintX / pixelSize) * pixelSize, 
        Math.floor((glintY - pixelSize) / pixelSize) * pixelSize, 
        pixelSize, pixelSize
      );
      ctx.fillRect(
        Math.floor(glintX / pixelSize) * pixelSize, 
        Math.floor((glintY + pixelSize) / pixelSize) * pixelSize, 
        pixelSize, pixelSize
      );
    }
  }
}


// Drawing functions for various foreground elements

// Draw a neon heart with 8-bit aesthetic
function drawNeonHeart(x, y, size, color, pixelSize) {
  const time = Date.now() / 1000;
  const pulse = 0.8 + Math.sin(time * 2 + x * 0.1) * 0.2;
  const flicker = Math.sin(time * 15 + x) > 0.95 ? 0.5 : 1; // Occasional flicker
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  
  const scaledSize = Math.floor((size * pulse * flicker) / pixelSize) * pixelSize;
  
  // Draw pixelated heart
  ctx.fillStyle = color;
  
  // Create heart shape using pixel blocks
  const heartPixels = [];
  
  // Calculate heart outline in pixel coordinates
  for (let px = -scaledSize; px <= scaledSize; px += pixelSize) {
    for (let py = -scaledSize; py <= scaledSize * 1.2; py += pixelSize) {
      // Heart equation (x^2 + (y-|x|^(2/3))^2 < size^2)
      const normalizedX = px / scaledSize;
      const normalizedY = py / scaledSize;
      
      // Simplified heart shape for 8-bit look
      if (Math.pow(normalizedX, 2) + Math.pow(normalizedY - 0.5 * Math.sqrt(Math.abs(normalizedX)), 2) < 0.6) {
        heartPixels.push({x: px, y: py});
      }
    }
  }
  
  // Draw heart pixels
  heartPixels.forEach(pixel => {
    ctx.fillRect(x + pixel.x, y + pixel.y, pixelSize, pixelSize);
  });
  
  // Neon glow - simplified for 8-bit look
  const rgbColor = hexToRgb(color);
  
  // Draw a slightly larger heart shape with lower opacity for glow
  if (flicker > 0.7) {
    ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
    
    // Draw glow pixels (slightly offset from original)
    heartPixels.forEach(pixel => {
      // Only draw some of the glow pixels for pixelated look
      if (Math.random() > 0.5) {
        const glowX = pixel.x + (Math.random() > 0.5 ? pixelSize : -pixelSize);
        const glowY = pixel.y + (Math.random() > 0.5 ? pixelSize : -pixelSize);
        
        ctx.fillRect(x + glowX, y + glowY, pixelSize, pixelSize);
      }
    });
  }
}

// Draw a floating paper lantern with 8-bit aesthetic
function drawFloatingLantern(x, y, color, speed, pixelSize) {
  const time = Date.now() / 1000;
  const floatOffset = Math.floor((Math.sin(time * speed) * 5) / pixelSize) * pixelSize;
  const floatY = y + floatOffset;
  
  // Apply pixel grid alignment
  const alignedX = Math.floor(x / pixelSize) * pixelSize;
  const alignedY = Math.floor(floatY / pixelSize) * pixelSize;
  
  // Lantern body - pixelated rectangle
  ctx.fillStyle = color;
  
  // Main lantern body
  const lanternWidth = pixelSize * 4;
  const lanternHeight = pixelSize * 5;
  ctx.fillRect(alignedX - lanternWidth/2, alignedY, lanternWidth, lanternHeight);
  
  // Lantern top - pixelated trapezoid
  for (let px = -lanternWidth/2 - pixelSize; px <= lanternWidth/2 + pixelSize; px += pixelSize) {
    // Only draw top shape pixels
    if (Math.abs(px) <= lanternWidth/2 + pixelSize) {
      const topY = alignedY - (Math.abs(px) < lanternWidth/2 ? pixelSize : 0);
      ctx.fillRect(alignedX + px, topY, pixelSize, pixelSize);
    }
  }
  
  // Lantern bottom - pixelated trapezoid
  for (let px = -lanternWidth/2; px <= lanternWidth/2; px += pixelSize) {
    // Only draw bottom shape pixels
    if (Math.abs(px) <= lanternWidth/2) {
      const bottomY = alignedY + lanternHeight;
      const extraY = Math.abs(px) < lanternWidth/4 ? pixelSize : 0;
      ctx.fillRect(alignedX + px, bottomY, pixelSize, pixelSize);
      ctx.fillRect(alignedX + px, bottomY + pixelSize, pixelSize, extraY);
    }
  }
  
  // Lantern glow - pixelated
  const rgbColor = hexToRgb(color);
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
  
  // Draw glow as a pixelated circle
  const glowRadius = Math.floor((8 + Math.sin(time * 2) * 2) / pixelSize) * pixelSize;
  
  for (let px = -glowRadius; px <= glowRadius; px += pixelSize) {
    for (let py = -glowRadius; py <= glowRadius; py += pixelSize) {
      if (px*px + py*py <= glowRadius*glowRadius) {
        // Only draw some pixels for a more sparse, 8-bit look
        if (Math.random() > 0.5) {
          ctx.fillRect(alignedX + px, alignedY + lanternHeight/2 + py, pixelSize, pixelSize);
        }
      }
    }
  }
  
  // String - pixelated
  ctx.fillStyle = '#DDD';
  
  // Draw string as a series of vertical pixels
  for (let py = -4 * pixelSize; py < -pixelSize; py += pixelSize) {
    ctx.fillRect(alignedX, alignedY + py, pixelSize, pixelSize);
  }
}

// Draw floating pixel confetti
function drawPixelConfetti(x, y, size, color, speed, pixelSize) {
  const time = Date.now() / 1000;
  
  // Apply floating animation
  const floatY = y + Math.sin(time * speed) * 10;
  const floatX = x + Math.cos(time * speed * 0.7) * 5;
  
  // Apply pixel grid alignment
  const alignedX = Math.floor(floatX / pixelSize) * pixelSize;
  const alignedY = Math.floor(floatY / pixelSize) * pixelSize;
  
  // Draw simple pixel square
  ctx.fillStyle = color;
  ctx.fillRect(alignedX, alignedY, size, size);
  
  // Occasionally add sparkle effect
  if (Math.sin(time * 3 + x) > 0.7) {
    // Draw a small cross pattern around the confetti
    ctx.fillRect(alignedX + size/2, alignedY - pixelSize, pixelSize, pixelSize);
    ctx.fillRect(alignedX - pixelSize, alignedY + size/2, pixelSize, pixelSize);
    ctx.fillRect(alignedX + size, alignedY + size/2, pixelSize, pixelSize);
    ctx.fillRect(alignedX + size/2, alignedY + size, pixelSize, pixelSize);
  }
}

// Draw a cyberpunk vending machine with 8-bit aesthetic
function drawVendingMachine(x, y, width, height, color, pixelSize) {
  const time = Date.now() / 1000;
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  // Machine body
  ctx.fillStyle = '#333';
  ctx.fillRect(x, y - height, width, height);
  
  // Machine border
  ctx.fillStyle = '#222';
  for (let px = 0; px < width; px += pixelSize) {
    ctx.fillRect(x + px, y - height, pixelSize, pixelSize); // Top
    ctx.fillRect(x + px, y - pixelSize, pixelSize, pixelSize); // Bottom
  }
  
  for (let py = 0; py < height; py += pixelSize) {
    ctx.fillRect(x, y - height + py, pixelSize, pixelSize); // Left
    ctx.fillRect(x + width - pixelSize, y - height + py, pixelSize, pixelSize); // Right
  }
  
  // Display screen
  ctx.fillStyle = color;
  const screenWidth = width - pixelSize * 4;
  const screenHeight = height / 4;
  const screenX = x + pixelSize * 2;
  const screenY = y - height + pixelSize * 2;
  
  ctx.fillRect(screenX, screenY, screenWidth, screenHeight);
  
  // Flashing screen effect
  if (Math.sin(time * 3) > 0.7) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(screenX + pixelSize, screenY + pixelSize, pixelSize * 2, pixelSize);
  }
  
  // Product windows - 2x3 grid
  const windowSize = width / 2 - pixelSize * 3;
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const windowX = x + pixelSize * 2 + col * (windowSize + pixelSize * 2);
      const windowY = y - height + screenHeight + pixelSize * 3 + row * (windowSize + pixelSize);
      
      // Window background
      ctx.fillStyle = '#111';
      ctx.fillRect(windowX, windowY, windowSize, windowSize);
      
      // Product (simple colored rectangle)
      const productColor = ['#FF00FF', '#00FFFF', '#FFCC00', '#66FF66', '#FF6666', '#9966FF'][row * 2 + col];
      
      // Only show product if window isn't empty (random)
      if ((row + col) % 2 === 0 || Math.random() > 0.3) {
        ctx.fillStyle = productColor;
        ctx.fillRect(
          windowX + pixelSize * 2, 
          windowY + pixelSize * 2, 
          windowSize - pixelSize * 4, 
          windowSize - pixelSize * 4
        );
      }
    }
  }
  
  // Coin slot
  ctx.fillStyle = '#111';
  ctx.fillRect(x + width - pixelSize * 4, y - height + pixelSize * 2, pixelSize * 2, pixelSize * 4);
  
  // Dispenser
  ctx.fillRect(x + width/2 - pixelSize * 3, y - pixelSize * 6, pixelSize * 6, pixelSize * 4);
}

// Draw a holographic display with 8-bit aesthetic
function drawHologram(x, y, width, height, content, color, pixelSize) {
  const time = Date.now() / 1000;
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  // Hologram base
  ctx.fillStyle = '#333';
  ctx.fillRect(x, y, width, height);
  
  // Hologram screen with scan lines
  const rgbColor = hexToRgb(color);
  
  // Draw scan lines 
  for (let py = 0; py < height; py += pixelSize * 2) {
    const opacity = 0.2 + Math.sin(time * 3 + py * 0.1) * 0.1;
    ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`;
    ctx.fillRect(x, y + py, width, pixelSize);
  }
  
  // Hologram content - text in 8-bit style
  const flickerIntensity = Math.sin(time * 10) > 0.9 ? 0.5 : 1;
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${0.8 * flickerIntensity})`;
  
  // Draw content pixel by pixel
  const letterWidth = pixelSize * 3;
  const letterHeight = pixelSize * 5;
  const startX = x + width/2 - content.length * letterWidth/2;
  
  for (let i = 0; i < content.length; i++) {
    const charX = startX + i * letterWidth;
    const charY = y + height/2 - letterHeight/2;
    
    // Draw each character as a simple rectangle (placeholder)
    ctx.fillRect(charX, charY, letterWidth, letterHeight);
  }
  
  // Add glitchy effect
  if (Math.random() > 0.9) {
    const glitchX = x + Math.random() * width * 0.8;
    const glitchY = y + Math.random() * height;
    const glitchWidth = Math.random() * width * 0.2;
    
    ctx.fillStyle = '#FFF';
    ctx.fillRect(glitchX, glitchY, glitchWidth, pixelSize);
  }
  
  // Hologram glow
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1)`;
  ctx.fillRect(x - pixelSize * 2, y - pixelSize * 2, width + pixelSize * 4, height + pixelSize * 4);
}

// Draw a trash can with 8-bit aesthetic
function drawTrashCan(x, y, width, height, pixelSize) {
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  // Trash can body
  ctx.fillStyle = '#444';
  ctx.fillRect(x, y - height, width, height);
  
  // Trash can lid
  ctx.fillStyle = '#333';
  ctx.fillRect(x - pixelSize, y - height - pixelSize * 2, width + pixelSize * 2, pixelSize * 2);
  
  // Trash details
  ctx.fillStyle = '#222';
  
  // Pixelated ridges
  for (let py = pixelSize * 3; py < height - pixelSize * 2; py += pixelSize * 3) {
    ctx.fillRect(x, y - py, width, pixelSize);
  }
}

// Draw a dumpster with 8-bit aesthetic
function drawDumpster(x, y, width, height, pixelSize) {
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  // Dumpster body
  ctx.fillStyle = '#2A634F'; // Dumpster green
  ctx.fillRect(x, y - height, width, height);
  
  // Dumpster lid
  ctx.fillStyle = '#245344';
  ctx.fillRect(x, y - height - pixelSize * 3, width, pixelSize * 3);
  
  // Lid handle
  ctx.fillStyle = '#111';
  ctx.fillRect(x + width/2 - pixelSize * 3, y - height - pixelSize * 2, pixelSize * 6, pixelSize);
  
  // Dumpster details
  ctx.fillStyle = '#111';
  
  // Wheels
  ctx.fillRect(x + pixelSize, y - pixelSize * 3, pixelSize * 3, pixelSize * 3);
  ctx.fillRect(x + width - pixelSize * 4, y - pixelSize * 3, pixelSize * 3, pixelSize * 3);
  
  // Graffiti (simple pixel art)
  if (Math.random() > 0.5) {
    ctx.fillStyle = '#FF00FF'; // Neon graffiti
    
    // Simple tag
    for (let px = 0; px < pixelSize * 8; px += pixelSize) {
      ctx.fillRect(x + width/4 + px, y - height/2, pixelSize, pixelSize);
    }
  }
}



// Draw a flying drone with 8-bit aesthetic
function drawDrone(x, y, direction, lightColor, pixelSize) {
  const time = Date.now() / 1000;
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  
  // Drone body
  ctx.fillStyle = '#333';
  
  // Main body
  ctx.fillRect(x - pixelSize * 3, y - pixelSize, pixelSize * 6, pixelSize * 2);
  
  // Front side (direction dependent)
  if (direction === 'right') {
    ctx.fillRect(x + pixelSize * 3, y - pixelSize * 2, pixelSize * 2, pixelSize);
    ctx.fillRect(x + pixelSize * 3, y + pixelSize, pixelSize * 2, pixelSize);
  } else {
    ctx.fillRect(x - pixelSize * 5, y - pixelSize * 2, pixelSize * 2, pixelSize);
    ctx.fillRect(x - pixelSize * 5, y + pixelSize, pixelSize * 2, pixelSize);
  }
  
  // Propellers (animated)
  const propellerState = Math.floor(time * 20) % 3;
  
  ctx.fillStyle = '#999';
  
  // Left propeller
  if (propellerState === 0) {
    ctx.fillRect(x - pixelSize * 5, y - pixelSize * 3, pixelSize * 4, pixelSize);
  } else if (propellerState === 1) {
    ctx.fillRect(x - pixelSize * 4, y - pixelSize * 4, pixelSize * 2, pixelSize * 2);
    ctx.fillRect(x - pixelSize * 4, y - pixelSize, pixelSize * 2, pixelSize * 2);
  } else {
    ctx.fillRect(x - pixelSize * 3, y - pixelSize * 5, pixelSize, pixelSize * 4);
  }
  
  // Right propeller
  if (propellerState === 0) {
    ctx.fillRect(x + pixelSize, y - pixelSize * 3, pixelSize * 4, pixelSize);
  } else if (propellerState === 1) {
    ctx.fillRect(x + pixelSize * 2, y - pixelSize * 4, pixelSize * 2, pixelSize * 2);
    ctx.fillRect(x + pixelSize * 2, y - pixelSize, pixelSize * 2, pixelSize * 2);
  } else {
    ctx.fillRect(x + pixelSize * 2, y - pixelSize * 5, pixelSize, pixelSize * 4);
  }
  
  // Drone lights (blinking)
  const lightBlink = Math.sin(time * 10) > 0.5;
  
  if (lightBlink) {
    ctx.fillStyle = lightColor;
    ctx.fillRect(x - pixelSize * 2, y, pixelSize, pixelSize);
    ctx.fillRect(x + pixelSize, y, pixelSize, pixelSize);
  }
  
  // Scanner beam - occasional downward beam
  if (Math.sin(time * 3) > 0.7) {
    const rgbColor = hexToRgb(lightColor);
    ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
    
    const beamHeight = pixelSize * 10 + Math.sin(time * 8) * pixelSize * 5;
    ctx.fillRect(x - pixelSize, y + pixelSize, pixelSize * 2, beamHeight);
  }
}

// Draw a digital billboard with 8-bit aesthetic
function drawBillboard(x, y, width, height, content, pixelSize) {
  const time = Date.now() / 1000;
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  width = Math.floor(width / pixelSize) * pixelSize;
  height = Math.floor(height / pixelSize) * pixelSize;
  
  // Billboard frame
  ctx.fillStyle = '#333';
  ctx.fillRect(x - pixelSize * 2, y - pixelSize * 2, width + pixelSize * 4, height + pixelSize * 4);
  
  // Screen background
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, width, height);
  
  // Support pole
  ctx.fillStyle = '#444';
  ctx.fillRect(x + width/2 - pixelSize * 2, y + height, pixelSize * 4, pixelSize * 20);
  
  // Screen content changes every few seconds
  const contentPhase = Math.floor(time / 3) % 3;
  
  // Colors cycle through neon options
  const contentColors = ['#00FFFF', '#FF00FF', '#FFCC00'];
  const activeColor = contentColors[contentPhase];
  const rgbColor = hexToRgb(activeColor);
  
  // Draw content
  ctx.fillStyle = activeColor;
  
  switch(contentPhase) {
    case 0:
      // Text blocks
      for (let i = 0; i < content.length; i++) {
        const blockWidth = pixelSize * 4;
        const blockX = x + width/2 - (content.length * blockWidth)/2 + i * blockWidth;
        ctx.fillRect(blockX, y + height/2 - pixelSize * 3, blockWidth - pixelSize, pixelSize * 6);
      }
      break;
      
    case 1:
      // Animated bars
      for (let i = 0; i < 5; i++) {
        const barHeight = pixelSize * 2 + Math.sin(time * 5 + i) * pixelSize * 4;
        ctx.fillRect(x + pixelSize * 5 + i * pixelSize * 6, y + height - barHeight, pixelSize * 4, barHeight);
      }
      break;
      
    case 2:
      // Pixelated logo
      drawPixelCircle(x + width/2, y + height/2, pixelSize * 8, pixelSize, activeColor);
      ctx.fillStyle = '#111';
      drawPixelCircle(x + width/2, y + height/2, pixelSize * 4, pixelSize, '#111');
      break;
  }
  
  // Add scan lines across the entire screen
  ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
  for (let scanY = 0; scanY < height; scanY += pixelSize * 2) {
    const scanOffset = (scanY + Math.floor(time * 20) * pixelSize) % height;
    ctx.fillRect(x, y + scanOffset, width, pixelSize);
  }
  
  // Screen glow
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1)`;
  ctx.fillRect(x - pixelSize * 4, y - pixelSize * 4, width + pixelSize * 8, height + pixelSize * 8);
}

// Draw a holographic ring for the proposal area
function drawRingHologram(x, y, size, color, pixelSize) {
  const time = Date.now() / 1000;
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  size = Math.floor(size / pixelSize) * pixelSize;
  
  // Rotation effect
  const rotation = time * 2;
  
  // Pulsing effect
  const pulse = 0.8 + Math.sin(time * 3) * 0.2;
  const effectiveSize = size * pulse;
  
  // Convert to RGB for glow effects
  const rgbColor = hexToRgb(color);
  
  // Draw ring base
  ctx.fillStyle = color;
  
  // Draw as pixelated circle with hole
  for (let px = -effectiveSize; px <= effectiveSize; px += pixelSize) {
    for (let py = -effectiveSize; py <= effectiveSize; py += pixelSize) {
      // Ring equation (donut shape)
      const distSq = px*px + py*py;
      if (distSq <= effectiveSize*effectiveSize && distSq >= (effectiveSize * 0.6)*(effectiveSize * 0.6)) {
        // Apply rotation effect
        const angle = Math.atan2(py, px) + rotation;
        const dist = Math.sqrt(distSq);
        const rotX = Math.cos(angle) * dist;
        const rotY = Math.sin(angle) * dist;
        
        ctx.fillRect(x + rotX, y + rotY, pixelSize, pixelSize);
      }
    }
  }
  
  // Add floating sparkles around the ring
  for (let i = 0; i < 12; i++) {
    const sparkleAngle = (i / 12) * Math.PI * 2 + time * (i % 3 + 1) * 0.5;
    const sparkleDistance = effectiveSize * 1.2 + Math.sin(time * 2 + i) * size * 0.1;
    const sparkleX = x + Math.cos(sparkleAngle) * sparkleDistance;
    const sparkleY = y + Math.sin(sparkleAngle) * sparkleDistance;
    
    ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${0.5 + Math.sin(time * 3 + i) * 0.5})`;
    ctx.fillRect(
      Math.floor(sparkleX / pixelSize) * pixelSize, 
      Math.floor(sparkleY / pixelSize) * pixelSize, 
      pixelSize, pixelSize
    );
  }
  
  // Add glow effect
  ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`;
  drawPixelCircle(x, y, effectiveSize + pixelSize * 4, pixelSize * 2, `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`);
  
  // Add a small pedestal below the ring
  ctx.fillStyle = '#333';
  ctx.fillRect(x - pixelSize * 3, y + effectiveSize + pixelSize, pixelSize * 6, pixelSize * 2);
  ctx.fillRect(x - pixelSize * 4, y + effectiveSize + pixelSize * 3, pixelSize * 8, pixelSize);
}

// Draw an NPC with 8-bit aesthetic
function drawNPC(x, y, type, direction, animationFrame, pixelSize) {
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  
  // Get animation frame as an integer
  const frame = Math.floor(animationFrame);
  
  // NPC base properties
  let headColor, bodyColor, legColor, extraColor;
  
  // Set colors based on NPC type
  switch(type) {
    case 'cyborg':
      headColor = '#CCC';
      bodyColor = '#444';
      legColor = '#333';
      extraColor = '#00FFFF'; // Cyan for cyborg parts
      break;
      
    case 'punk':
      headColor = '#FFB6C1'; // Light pink
      bodyColor = '#6A0DAD'; // Purple
      legColor = '#333';
      extraColor = '#FF00FF'; // Magenta for mohawk
      break;
      
    case 'corp':
      headColor = '#FFD700'; // Gold
      bodyColor = '#000';
      legColor = '#111';
      extraColor = '#FFFFFF'; // White for corp logo
      break;
      
    case 'vendor':
      headColor = '#CD853F'; // Peru
      bodyColor = '#FF5722'; // Deep orange
      legColor = '#333';
      extraColor = '#FFEB3B'; // Yellow for vendor items
      break;
      
    case 'robot':
      headColor = '#888';
      bodyColor = '#555';
      legColor = '#444';
      extraColor = '#FF0000'; // Red for robot eyes
      break;
      
    default:
      headColor = '#FFD700';
      bodyColor = '#1E88E5';
      legColor = '#333';
      extraColor = '#FFF';
  }
  
  // Draw legs
  ctx.fillStyle = legColor;
  
  // Left leg with animation
  const leftLegOffset = frame % 2 === 0 ? 0 : (direction === 'right' ? pixelSize : -pixelSize);
  ctx.fillRect(x - pixelSize * 2 + leftLegOffset, y - pixelSize * 4, pixelSize * 2, pixelSize * 4);
  
  // Right leg with animation (opposite phase)
  const rightLegOffset = frame % 2 === 0 ? (direction === 'right' ? pixelSize : -pixelSize) : 0;
  ctx.fillRect(x + pixelSize * 0 + rightLegOffset, y - pixelSize * 4, pixelSize * 2, pixelSize * 4);
  
  // Draw body (slightly different shapes per type)
  ctx.fillStyle = bodyColor;
  
  if (type === 'robot') {
    // Robot has a square body
    ctx.fillRect(x - pixelSize * 3, y - pixelSize * 8, pixelSize * 6, pixelSize * 4);
  } else if (type === 'corp') {
    // Corp has suit-like shape
    ctx.fillRect(x - pixelSize * 3, y - pixelSize * 8, pixelSize * 6, pixelSize * 4);
    // Tie
    ctx.fillStyle = extraColor;
    ctx.fillRect(x - pixelSize, y - pixelSize * 7, pixelSize * 2, pixelSize * 3);
  } else {
    // Others have slightly trapezoidal body
    ctx.fillRect(x - pixelSize * 3, y - pixelSize * 8, pixelSize * 6, pixelSize * 4);
  }
  
  // Draw arms based on direction
  ctx.fillStyle = bodyColor;
  
  if (direction === 'right') {
    // Left arm
    ctx.fillRect(x - pixelSize * 3, y - pixelSize * 8, pixelSize, pixelSize * 3);
    // Right arm with animation
    const rightArmY = y - pixelSize * (8 - frame % 2);
    ctx.fillRect(x + pixelSize * 3, rightArmY, pixelSize, pixelSize * 3);
  } else {
    // Left arm with animation
    const leftArmY = y - pixelSize * (8 - frame % 2);
    ctx.fillRect(x - pixelSize * 4, leftArmY, pixelSize, pixelSize * 3);
    // Right arm
    ctx.fillRect(x + pixelSize * 3, y - pixelSize * 8, pixelSize, pixelSize * 3);
  }
  
  // Draw head
  ctx.fillStyle = headColor;
  ctx.fillRect(x - pixelSize * 2, y - pixelSize * 12, pixelSize * 4, pixelSize * 4);
  
  // Draw type-specific features
  switch(type) {
    case 'cyborg':
      // Cyborg eye
      ctx.fillStyle = extraColor;
      ctx.fillRect(
        direction === 'right' ? x + pixelSize : x - pixelSize * 2, 
        y - pixelSize * 10, 
        pixelSize, pixelSize
      );
      
      // Cyborg implants
      ctx.fillRect(x - pixelSize * 2, y - pixelSize * 12, pixelSize * 4, pixelSize);
      ctx.fillRect(x - pixelSize * 3, y - pixelSize * 7, pixelSize, pixelSize * 3);
      break;
      
    case 'punk':
      // Mohawk
      ctx.fillStyle = extraColor;
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(x - pixelSize + i * pixelSize, y - pixelSize * 13, pixelSize, pixelSize);
      }
      break;
      
    case 'corp':
      // Sunglasses
      ctx.fillStyle = '#111';
      ctx.fillRect(x - pixelSize * 2, y - pixelSize * 10, pixelSize * 4, pixelSize);
      
      // Earpiece
      ctx.fillStyle = extraColor;
      ctx.fillRect(
        direction === 'right' ? x + pixelSize * 2 : x - pixelSize * 3, 
        y - pixelSize * 10, 
        pixelSize, pixelSize * 2
      );
      break;
      
    case 'vendor':
      // Vendor hat
      ctx.fillStyle = extraColor;
      ctx.fillRect(x - pixelSize * 3, y - pixelSize * 13, pixelSize * 6, pixelSize);
      ctx.fillRect(x - pixelSize * 2, y - pixelSize * 14, pixelSize * 4, pixelSize);
      break;
      
    case 'robot':
      // Robot eyes
      ctx.fillStyle = extraColor;
      ctx.fillRect(x - pixelSize, y - pixelSize * 10, pixelSize, pixelSize);
      ctx.fillRect(x + pixelSize * 0, y - pixelSize * 10, pixelSize, pixelSize);
      
      // Antenna
      ctx.fillRect(x, y - pixelSize * 13, pixelSize, pixelSize);
      break;
  }
  
  // Speech bubble for conversing NPCs (if applicable)
  if (type.conversing) {
    drawSpeechBubble(x, y - pixelSize * 16, pixelSize);
  }
}

// Draw a simple speech bubble for NPCs
function drawSpeechBubble(x, y, pixelSize) {
  const time = Date.now() / 1000;
  
  // Apply pixel grid alignment
  x = Math.floor(x / pixelSize) * pixelSize;
  y = Math.floor(y / pixelSize) * pixelSize;
  
  // Bubble border
  ctx.fillStyle = '#FFF';
  ctx.fillRect(x - pixelSize * 6, y - pixelSize * 6, pixelSize * 12, pixelSize * 6);
  
  // Bubble interior
  ctx.fillStyle = '#000';
  ctx.fillRect(x - pixelSize * 5, y - pixelSize * 5, pixelSize * 10, pixelSize * 4);
  
  // Bubble tail
  ctx.fillStyle = '#FFF';
  ctx.fillRect(x - pixelSize, y, pixelSize * 2, pixelSize * 2);
  ctx.fillRect(x, y + pixelSize * 2, pixelSize, pixelSize);
  
  // Text dots (simplified for 8-bit look)
  ctx.fillStyle = '#FFF';
  
  // Animated dots for "talking" effect
  const dotCount = Math.floor(time * 2) % 4;
  for (let i = 0; i < dotCount; i++) {
    ctx.fillRect(x - pixelSize * 3 + i * pixelSize * 2, y - pixelSize * 3, pixelSize, pixelSize);
  }
}

// Helper function to convert hex color to RGB
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}