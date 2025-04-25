// Restaurant Amano Location - Enhanced 8-bit version
// A beautiful high-end restaurant with pixel art styling

function drawRestaurant(x, y, location) {
  const width = location.width;
  const height = location.height;
  const isCompleted = gameState.stagesCompleted[location.id];
  const isActive = locations.indexOf(location) === gameState.currentStage;
  const pixelSize = 4; // Consistent pixel size for 8-bit aesthetic
  
  // Animation time variable for subtle effects
  const time = Date.now() / 1000;
  
  // Add subtle ambient glow for active restaurant
  if (isActive && !isCompleted) {
      drawRestaurantGlow(x, y, width, height, time);
  }
  
  // Base building structure - cream colored exterior
  ctx.fillStyle = isCompleted ? '#757575' : '#FFF8E1';
  drawPixelRect(x, y, width, height, pixelSize);
  
  // Decorative stone foundation
  ctx.fillStyle = isCompleted ? '#616161' : '#A1887F';
  drawPixelRect(x - pixelSize*2, y + height - pixelSize*5, width + pixelSize*4, pixelSize*5, pixelSize);
  
  // Draw vertical stone pattern in foundation
  if (!isCompleted) {
      drawStonePattern(x - pixelSize*2, y + height - pixelSize*5, width + pixelSize*4, pixelSize*5, pixelSize);
  }
  
  // Restaurant roof - elegant sloped design
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#8D6E63'; // Wood colored roof
  drawPixelRoof(x - pixelSize*3, y, width + pixelSize*6, pixelSize*5, pixelSize);
  
  // Roof trim detail - gold accent
  ctx.fillStyle = isCompleted ? '#757575' : '#D4AF37'; 
  drawPixelRect(x - pixelSize*4, y + pixelSize*5, width + pixelSize*8, pixelSize*2, pixelSize);
  
  // Ornate windows with frames
  drawOrnateWindows(x, y, width, height, pixelSize, isCompleted);
  
  // Elegant restaurant door
  drawRestaurantDoor(x, y, width, height, pixelSize, isCompleted, isActive, time);
  
  // Restaurant name sign - ornate gold panel
  drawRestaurantSign(x, y, width, pixelSize, isCompleted);
  
  // Outdoor decor elements
  if (!isCompleted) {
      // Awning with pixel stripes
      drawPixelAwning(x + width/4, y + pixelSize*10, width/2, pixelSize);
      
      // Fancy outdoor lanterns
      drawPixelLantern(x + pixelSize*5, y + height - pixelSize*15, pixelSize, time);
      drawPixelLantern(x + width - pixelSize*10, y + height - pixelSize*15, pixelSize, time);
      
      // Potted plants - more detailed 8-bit versions
      drawPixelPottedPlant(x - pixelSize*4, y + height - pixelSize*10, pixelSize);
      drawPixelPottedPlant(x + width - pixelSize*6, y + height - pixelSize*10, pixelSize);
      
      // Small tables visible through windows
      drawPixelTables(x, y, width, height, pixelSize);
      
      // Pixel art red carpet at entrance
      drawRedCarpet(x + width/2 - pixelSize*5, y + height - pixelSize*5, pixelSize*10, pixelSize*5, pixelSize);
  }
  
  // Add ambient light from windows at night
  if (!isCompleted && Math.sin(time * 0.5) > 0) {
      drawWindowLight(x, y, width, height, pixelSize, time);
  }
}

// Draw a pixelated rectangle for 8-bit look
function drawPixelRect(x, y, width, height, pixelSize) {
  // Ensure drawing on pixel grid for true 8-bit look
  const startX = Math.floor(x / pixelSize) * pixelSize;
  const startY = Math.floor(y / pixelSize) * pixelSize;
  const pixelWidth = Math.ceil(width / pixelSize) * pixelSize;
  const pixelHeight = Math.ceil(height / pixelSize) * pixelSize;
  
  for (let i = startX; i < startX + pixelWidth; i += pixelSize) {
      for (let j = startY; j < startY + pixelHeight; j += pixelSize) {
          ctx.fillRect(i, j, pixelSize, pixelSize);
      }
  }
}

// Draw ornate 8-bit style windows with detailed frames
function drawOrnateWindows(x, y, width, height, pixelSize, isCompleted) {
  // Window base locations
  const windowPositions = [
      {x: x + width*0.2, y: y + height*0.25, w: width*0.2, h: height*0.3},
      {x: x + width*0.6, y: y + height*0.25, w: width*0.2, h: height*0.3}
  ];
  
  // Draw each window with ornate frame
  windowPositions.forEach(win => {
      // Window frame - wooden texture
      ctx.fillStyle = isCompleted ? '#9E9E9E' : '#8D6E63';
      drawPixelRect(win.x - pixelSize, win.y - pixelSize, win.w + pixelSize*2, win.h + pixelSize*2, pixelSize);
      
      // Window glass - with slight blue tint
      ctx.fillStyle = isCompleted ? '#E0E0E0' : '#D6EAF8';
      drawPixelRect(win.x, win.y, win.w, win.h, pixelSize);
      
      // Window pane dividers
      ctx.fillStyle = isCompleted ? '#9E9E9E' : '#8D6E63';
      
      // Horizontal divider
      drawPixelRect(win.x, win.y + win.h*0.5 - pixelSize/2, win.w, pixelSize, pixelSize);
      
      // Vertical divider
      drawPixelRect(win.x + win.w*0.5 - pixelSize/2, win.y, pixelSize, win.h, pixelSize);
      
      // Ornate top arch detail
      if (!isCompleted) {
          ctx.fillStyle = '#D4AF37'; // Gold accent
          for (let i = 0; i < win.w + pixelSize*2; i += pixelSize) {
              // Decorative pixel pattern above window
              if (i % (pixelSize*3) === 0) {
                  drawPixelRect(win.x - pixelSize + i, win.y - pixelSize*3, pixelSize, pixelSize*2, pixelSize);
              }
          }
      }
      
      // Window sill detail
      ctx.fillStyle = isCompleted ? '#757575' : '#A1887F';  
      drawPixelRect(win.x - pixelSize*2, win.y + win.h, win.w + pixelSize*4, pixelSize*2, pixelSize);
  });
}

// Draw a detailed 8-bit restaurant door
function drawRestaurantDoor(x, y, width, height, pixelSize, isCompleted, isActive, time) {
  // Door frame
  ctx.fillStyle = isCompleted ? '#616161' : '#5D4037';  // Dark wood
  drawPixelRect(x + width/2 - pixelSize*7, y + height - pixelSize*20, pixelSize*14, pixelSize*20, pixelSize);
  
  // Main door
  ctx.fillStyle = isCompleted ? '#757575' : '#8D6E63';  // Wood color
  drawPixelRect(x + width/2 - pixelSize*6, y + height - pixelSize*18, pixelSize*12, pixelSize*18, pixelSize);
  
  // Door panels - decorative
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#A1887F'; 
  drawPixelRect(x + width/2 - pixelSize*5, y + height - pixelSize*16, pixelSize*4, pixelSize*7, pixelSize);
  drawPixelRect(x + width/2 + pixelSize*1, y + height - pixelSize*16, pixelSize*4, pixelSize*7, pixelSize);
  drawPixelRect(x + width/2 - pixelSize*5, y + height - pixelSize*8, pixelSize*4, pixelSize*6, pixelSize);
  drawPixelRect(x + width/2 + pixelSize*1, y + height - pixelSize*8, pixelSize*4, pixelSize*6, pixelSize);
  
  // Door handles - gold
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#D4AF37';
  drawPixelRect(x + width/2 + pixelSize*3, y + height - pixelSize*11, pixelSize*2, pixelSize*3, pixelSize);
  
  // Add subtle animation to door if active
  if (isActive && !isCompleted && Math.sin(time * 4) > 0.7) {
      // Door slightly ajar with light coming through
      ctx.fillStyle = 'rgba(255, 248, 225, 0.5)';
      drawPixelRect(x + width/2 - pixelSize*5, y + height - pixelSize*17, pixelSize, pixelSize*17, pixelSize);
  }
}

// Draw 8-bit roof with pixel detail
function drawPixelRoof(x, y, width, height, pixelSize) {
  // Create a triangular roof shape with pixels
  const centerX = x + width/2;
  
  for (let h = 0; h < height; h += pixelSize) {
      const widthAtHeight = width * (1 - h/height);
      drawPixelRect(centerX - widthAtHeight/2, y - h - pixelSize, widthAtHeight, pixelSize, pixelSize);
  }
}

// Draw ornate restaurant sign
function drawRestaurantSign(x, y, width, pixelSize, isCompleted) {
  // Sign background - elegant gold panel
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#D4AF37';
  const signWidth = width - pixelSize*16;
  const signHeight = pixelSize*6;
  const signX = x + width/2 - signWidth/2;
  const signY = y + pixelSize*8;
  
  drawPixelRect(signX, signY, signWidth, signHeight, pixelSize);
  
  // Ornate border for sign
  if (!isCompleted) {
      ctx.fillStyle = '#5D4037'; // Dark wood border
      
      // Top and bottom borders
      for (let i = 0; i < signWidth; i += pixelSize*3) {
          // Skip every other pixel for decorative pattern
          drawPixelRect(signX + i, signY - pixelSize, pixelSize*2, pixelSize, pixelSize);
          drawPixelRect(signX + i, signY + signHeight, pixelSize*2, pixelSize, pixelSize);
      }
  }
  
  // Restaurant name text
  drawPixelText("RESTAURANT AMANO", signX + signWidth/2, signY + signHeight/2, 
               isCompleted ? '#E0E0E0' : '#3E2723', pixelSize);
}

// Draw 8-bit styled text
function drawPixelText(text, x, y, color, pixelSize) {
  ctx.fillStyle = color;
  ctx.font = '8px Arial'; // Base font for measurement
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Get text metrics for positioning
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  
  // Scale down for cleaner pixel look
  const renderSize = pixelSize / 2;
  
  // Draw simplified pixel version of text
  const chars = text.split('');
  let offsetX = 0;
  
  chars.forEach(char => {
      const charWidth = ctx.measureText(char).width;
      // Skip spaces with minimal width
      if (char !== ' ') {
          // Simplified pixel representation of character
          const posX = x - textWidth/2 + offsetX + charWidth/2;
          
          // For capital letters (most of restaurant name)
          if (char === char.toUpperCase() && char !== ' ') {
              // Simplified capital letter shape
              drawPixelRect(posX - renderSize*1.5, y - renderSize*2, renderSize*3, renderSize*4, renderSize);
              
              // Center gap for letters like A, B, P, R
              if (['A', 'B', 'D', 'P', 'R'].includes(char)) {
                  ctx.fillStyle = (color === '#E0E0E0' || color === '#3E2723') ? 
                                  (color === '#E0E0E0' ? '#9E9E9E' : '#FFF8E1') : color;
                  drawPixelRect(posX - renderSize/2, y - renderSize/2, renderSize, renderSize, renderSize);
                  ctx.fillStyle = color; // Reset color
              }
          } else {
              // Lowercase or special chars
              drawPixelRect(posX - renderSize, y - renderSize, renderSize*2, renderSize*2, renderSize);
          }
      }
      offsetX += charWidth;
  });
}

// Draw a decorative 8-bit awning
function drawPixelAwning(x, y, width, pixelSize) {
  // Awning structure
  ctx.fillStyle = '#D4AF37'; // Gold color
  
  // Draw awning with striped pattern
  for (let i = 0; i < width; i += pixelSize*2) {
      const height = pixelSize*4 + ((i / pixelSize) % 3) * pixelSize; // Varied height
      drawPixelRect(x + i, y, pixelSize, height, pixelSize);
  }
  
  // Awning support
  ctx.fillStyle = '#5D4037'; // Dark wood
  drawPixelRect(x, y, width, pixelSize, pixelSize);
}

// Draw 8-bit potted plant with more detail
function drawPixelPottedPlant(x, y, pixelSize) {
  // Decorative pot
  ctx.fillStyle = '#8D6E63'; // Terracotta
  drawPixelRect(x, y, pixelSize*10, pixelSize*10, pixelSize);
  
  // Pot rim
  ctx.fillStyle = '#A1887F'; // Lighter terracotta
  drawPixelRect(x - pixelSize, y, pixelSize*12, pixelSize*2, pixelSize);
  
  // Plant base/soil
  ctx.fillStyle = '#3E2723'; // Dark soil
  drawPixelRect(x + pixelSize, y + pixelSize*2, pixelSize*8, pixelSize*2, pixelSize);
  
  // Plant foliage - detailed pixel clusters
  ctx.fillStyle = '#2E7D32'; // Dark green
  
  // Main bush shape
  drawPixelCircle(x + pixelSize*5, y - pixelSize*2, pixelSize*5, pixelSize);
  
  // Additional foliage details in lighter green
  ctx.fillStyle = '#388E3C'; // Medium green
  drawPixelCircle(x + pixelSize*3, y - pixelSize*4, pixelSize*3, pixelSize);
  drawPixelCircle(x + pixelSize*7, y - pixelSize*4, pixelSize*3, pixelSize);
  
  // Highlight details
  ctx.fillStyle = '#43A047'; // Light green highlights
  drawPixelCircle(x + pixelSize*5, y - pixelSize*6, pixelSize*2, pixelSize);
  
  // Optional flowers or berries
  ctx.fillStyle = '#F44336'; // Red
  drawPixelRect(x + pixelSize*3, y - pixelSize*5, pixelSize, pixelSize, pixelSize);
  drawPixelRect(x + pixelSize*7, y - pixelSize*3, pixelSize, pixelSize, pixelSize);
}

// Draw 8-bit circle using pixels
function drawPixelCircle(centerX, centerY, radius, pixelSize) {
  const radiusSquared = radius * radius;
  
  for (let y = -radius; y <= radius; y += pixelSize) {
      for (let x = -radius; x <= radius; x += pixelSize) {
          if (x*x + y*y <= radiusSquared) {
              ctx.fillRect(
                  Math.floor((centerX + x) / pixelSize) * pixelSize,
                  Math.floor((centerY + y) / pixelSize) * pixelSize,
                  pixelSize,
                  pixelSize
              );
          }
      }
  }
}

// Draw ornate 8-bit lantern
function drawPixelLantern(x, y, pixelSize, time) {
  // Lantern top
  ctx.fillStyle = '#5D4037'; // Dark wood
  drawPixelRect(x, y, pixelSize*6, pixelSize*2, pixelSize);
  
  // Lantern body
  ctx.fillStyle = '#D4AF37'; // Gold frame
  drawPixelRect(x, y + pixelSize*2, pixelSize*6, pixelSize*8, pixelSize);
  
  // Lantern glass
  ctx.fillStyle = '#FFECB3'; // Light amber
  drawPixelRect(x + pixelSize, y + pixelSize*3, pixelSize*4, pixelSize*6, pixelSize);
  
  // Lantern light - animate glow
  if (Math.sin(time * 3) > 0.2) {
      ctx.fillStyle = 'rgba(255, 236, 179, 0.5)';
      drawPixelCircle(x + pixelSize*3, y + pixelSize*6, pixelSize*3, pixelSize);
  }
  
  // Lantern bottom
  ctx.fillStyle = '#5D4037'; // Dark wood
  drawPixelRect(x, y + pixelSize*10, pixelSize*6, pixelSize*1, pixelSize);
}

// Draw 8-bit tables visible through windows
function drawPixelTables(x, y, width, height, pixelSize) {
  // Table positions - aligned with windows
  const tablePositions = [
      {x: x + width*0.25, y: y + height*0.4},
      {x: x + width*0.65, y: y + height*0.4}
  ];
  
  tablePositions.forEach(pos => {
      // Table top
      ctx.fillStyle = '#5D4037'; // Dark wood
      drawPixelRect(pos.x - pixelSize*3, pos.y, pixelSize*6, pixelSize*2, pixelSize);
      
      // Table cloth
      ctx.fillStyle = '#B71C1C'; // Deep red
      drawPixelRect(pos.x - pixelSize*2, pos.y - pixelSize, pixelSize*4, pixelSize*1, pixelSize);
      
      // Table leg
      ctx.fillStyle = '#5D4037'; // Dark wood
      drawPixelRect(pos.x - pixelSize, pos.y + pixelSize*2, pixelSize*2, pixelSize*4, pixelSize);
      
      // Table setting - plate
      ctx.fillStyle = '#FAFAFA'; // White
      drawPixelRect(pos.x - pixelSize, pos.y - pixelSize*1, pixelSize*2, pixelSize*1, pixelSize);
  });
}

// Draw ambient window light effect
function drawWindowLight(x, y, width, height, pixelSize, time) {
  // Window positions from earlier function
  const windowPositions = [
      {x: x + width*0.2, y: y + height*0.25, w: width*0.2, h: height*0.3},
      {x: x + width*0.6, y: y + height*0.25, w: width*0.2, h: height*0.3}
  ];
  
  // Gentle pulsing window light
  const alpha = 0.1 + Math.sin(time) * 0.05;
  
  windowPositions.forEach(win => {
      // Create light gradient
      const lightGradient = ctx.createRadialGradient(
          win.x + win.w/2, win.y + win.h/2, 5,
          win.x + win.w/2, win.y + win.h/2, win.w
      );
      
      lightGradient.addColorStop(0, `rgba(255, 236, 179, ${alpha + 0.1})`);
      lightGradient.addColorStop(1, `rgba(255, 236, 179, 0)`);
      
      ctx.fillStyle = lightGradient;
      ctx.fillRect(win.x - win.w/2, win.y - win.h/2, win.w*2, win.h*2);
  });
}

// Draw a subtle glow for active restaurant
function drawRestaurantGlow(x, y, width, height, time) {
  const glowSize = 60 + Math.sin(time) * 10;
  
  const activeGlow = ctx.createRadialGradient(
      x + width/2, y + height/2, 10,
      x + width/2, y + height/2, glowSize
  );
  
  activeGlow.addColorStop(0, 'rgba(255, 236, 179, 0.2)'); // Warm gold glow
  activeGlow.addColorStop(1, 'rgba(255, 236, 179, 0)');
  
  ctx.fillStyle = activeGlow;
  ctx.fillRect(x - 40, y - 40, width + 80, height + 80);
}

// Draw red carpet at entrance
function drawRedCarpet(x, y, width, height, pixelSize) {
  // Main carpet
  ctx.fillStyle = '#B71C1C'; // Deep red
  drawPixelRect(x, y, width, height, pixelSize);
  
  // Gold trim
  ctx.fillStyle = '#D4AF37';
  drawPixelRect(x, y, width, pixelSize, pixelSize);
  drawPixelRect(x, y + height - pixelSize, width, pixelSize, pixelSize);
  drawPixelRect(x, y, pixelSize, height, pixelSize);
  drawPixelRect(x + width - pixelSize, y, pixelSize, height, pixelSize);
  
  // Pattern detail
  ctx.fillStyle = '#7F0000'; // Darker red
  for (let i = pixelSize*2; i < width - pixelSize*2; i += pixelSize*4) {
      for (let j = pixelSize*2; j < height - pixelSize*2; j += pixelSize*4) {
          drawPixelRect(x + i, y + j, pixelSize*2, pixelSize*2, pixelSize);
      }
  }
}

// Draw stone pattern for foundation
function drawStonePattern(x, y, width, height, pixelSize) {
  ctx.fillStyle = '#8D6E63'; // Lighter stone color
  
  // Create brick-like pattern
  for (let i = 0; i < width; i += pixelSize*4) {
      for (let j = 0; j < height; j += pixelSize*2) {
          // Offset every other row
          const offsetX = j % (pixelSize*4) === 0 ? 0 : pixelSize*2;
          
          // Draw individual stone
          if ((i + offsetX) < width) {
              drawPixelRect(x + i + offsetX, y + j, pixelSize*3, pixelSize, pixelSize);
          }
      }
  }
}