// Buta Ramen Shop Location - 8-bit version
// A pixel art styled ramen shop with detailed elements

function drawRamenShop(x, y, location) {
  const width = location.width;
  const height = location.height;
  const isCompleted = gameState.stagesCompleted[location.id];
  const isActive = locations.indexOf(location) === gameState.currentStage;
  const pixelSize = 4; // Consistent pixel size for 8-bit aesthetic
  
  // Animation time variable
  const time = Date.now() / 1000;
  
  // Add subtle glow for active ramen shop
  if (isActive && !isCompleted) {
      drawRamenShopGlow(x, y, width, height, time);
  }
  
  // Ramen shop building - pixelated rectangle
  ctx.fillStyle = isCompleted ? '#757575' : '#FFAB91'; // Soft orange
  drawPixelRect(x, y, width, height, pixelSize);
  
  // Shop roof/awning - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#FF5722'; // Deeper orange
  drawPixelRect(x - pixelSize*4, y, width + pixelSize*8, pixelSize*5, pixelSize);
  
  // Traditional Japanese style roof elements
  if (!isCompleted) {
      drawJapaneseRoof(x, y, width, pixelSize);
  }
  
  // Shop window - pixelated
  ctx.fillStyle = isCompleted ? '#E0E0E0' : '#FFF3E0'; // Light warm color
  drawPixelRect(x + pixelSize*4, y + pixelSize*8, width - pixelSize*8, height - pixelSize*16, pixelSize);
  
  // Window frame - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#3E2723'; // Dark brown
  
  // Top frame
  drawPixelRect(x + pixelSize*3, y + pixelSize*7, width - pixelSize*6, pixelSize, pixelSize);
  
  // Bottom frame
  drawPixelRect(x + pixelSize*3, y + height - pixelSize*8, width - pixelSize*6, pixelSize, pixelSize);
  
  // Left frame
  drawPixelRect(x + pixelSize*3, y + pixelSize*7, pixelSize, height - pixelSize*15, pixelSize);
  
  // Right frame
  drawPixelRect(x + width - pixelSize*4, y + pixelSize*7, pixelSize, height - pixelSize*15, pixelSize);
  
  // Window grid - traditional Japanese style
  if (!isCompleted) {
      drawWindowGrid(x + pixelSize*4, y + pixelSize*8, width - pixelSize*8, height - pixelSize*16, pixelSize);
  }
  
  // Shop door - pixelated
  ctx.fillStyle = isCompleted ? '#616161' : '#5D4037'; // Brown
  drawPixelRect(x + width/2 - pixelSize*4, y + height - pixelSize*8, pixelSize*8, pixelSize*8, pixelSize);
  
  // Door frame
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#3E2723'; // Dark brown
  drawPixelRect(x + width/2 - pixelSize*5, y + height - pixelSize*8, pixelSize, pixelSize*8, pixelSize);
  drawPixelRect(x + width/2 + pixelSize*4, y + height - pixelSize*8, pixelSize, pixelSize*8, pixelSize);
  drawPixelRect(x + width/2 - pixelSize*5, y + height - pixelSize*9, pixelSize*10, pixelSize, pixelSize);
  
  // Door handle - pixelated circle
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#FFC107'; // Yellow/gold
  drawPixelCircle(x + width/2 + pixelSize*2, y + height - pixelSize*4, pixelSize, pixelSize);
  
  // Traditional noren curtain above door
  if (!isCompleted) {
      drawNorenCurtain(x + width/2 - pixelSize*6, y + height - pixelSize*10, pixelSize*12, pixelSize);
  }
  
  // Shop sign - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#FF5722'; // Orange
  drawPixelRect(x + width/2 - pixelSize*10, y + pixelSize, pixelSize*20, pixelSize*3, pixelSize);
  
  // Sign text - pixel art "BUTA RAMEN"
  drawPixelText("BUTA RAMEN", x + width/2, y + pixelSize*2.5, 
               isCompleted ? '#E0E0E0' : '#FFFFFF', pixelSize);
  
  // Traditional lantern
  if (!isCompleted) {
      drawJapaneseLantern(x + pixelSize*5, y + pixelSize*15, pixelSize, time);
  }
  
  // Ramen bowl on display in window if active or completed
  if (isActive || isCompleted) {
      drawRamenBowl(x, y, width, height, pixelSize, isCompleted, time);
  }
  
  // Steam if active - pixelated
  if (isActive && !isCompleted) {
      drawRamenSteam(x, y, width, height, time, pixelSize);
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

// Draw pixelated text
function drawPixelText(text, x, y, color, pixelSize) {
  ctx.fillStyle = color;
  
  // Base font just for measuring
  ctx.font = '10px Arial';
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
          
          // For capital letters (most of title)
          if (char === char.toUpperCase() && char !== ' ') {
              // Basic letter shape (simplified pixel version)
              drawPixelRect(posX - renderSize, y - renderSize*2, renderSize*2, renderSize*4, renderSize);
              
              // For letters with holes (O, A, R, etc)
              if (['O', 'A', 'R', 'D', 'P', 'B'].includes(char)) {
                  ctx.fillStyle = '#FF5722'; // Sign background color
                  drawPixelRect(posX - renderSize/2, y - renderSize/2, renderSize, renderSize, renderSize);
                  ctx.fillStyle = color; // Reset color
              }
          } else {
              // Lowercase or special chars
              drawPixelRect(posX - renderSize/2, y - renderSize, renderSize, renderSize*2, renderSize);
          }
      }
      offsetX += charWidth;
  });
}

// Draw a Japanese style roof with pixel details
function drawJapaneseRoof(x, y, width, pixelSize) {
  // Roof ridge
  ctx.fillStyle = '#D84315'; // Darker orange
  drawPixelRect(x - pixelSize*5, y - pixelSize, width + pixelSize*10, pixelSize, pixelSize);
  
  // Decorative roof tiles
  ctx.fillStyle = '#BF360C'; // Even darker orange
  for (let i = 0; i < width + pixelSize*8; i += pixelSize*3) {
      drawPixelRect(x - pixelSize*4 + i, y + pixelSize, pixelSize*2, pixelSize, pixelSize);
  }
}

// Draw window grid in traditional Japanese style
function drawWindowGrid(x, y, width, height, pixelSize) {
  ctx.fillStyle = '#5D4037'; // Dark brown
  
  // Vertical dividers
  for (let i = 1; i < 3; i++) {
      drawPixelRect(x + (width * i / 3), y, pixelSize, height, pixelSize);
  }
  
  // Horizontal dividers
  for (let i = 1; i < 3; i++) {
      drawPixelRect(x, y + (height * i / 3), width, pixelSize, pixelSize);
  }
}

// Draw traditional Japanese noren curtain
function drawNorenCurtain(x, y, width, pixelSize) {
  // Curtain base
  ctx.fillStyle = '#D32F2F'; // Red
  drawPixelRect(x, y, width, pixelSize*2, pixelSize);
  
  // Curtain strips
  for (let i = 0; i < 3; i++) {
      const stripX = x + pixelSize*2 + i * pixelSize*3;
      drawPixelRect(stripX, y + pixelSize*2, pixelSize*2, pixelSize*4, pixelSize);
  }
}

// Draw traditional Japanese lantern
function drawJapaneseLantern(x, y, pixelSize, time) {
  // Lantern body
  ctx.fillStyle = '#D32F2F'; // Red
  drawPixelRect(x, y, pixelSize*6, pixelSize*8, pixelSize);
  
  // Lantern top
  ctx.fillStyle = '#5D4037'; // Brown
  drawPixelRect(x, y - pixelSize*2, pixelSize*6, pixelSize*2, pixelSize);
  
  // Japanese character (simplified pixel "拉" for ramen)
  ctx.fillStyle = '#000000';
  
  // Horizontal stroke
  drawPixelRect(x + pixelSize*2, y + pixelSize*2, pixelSize*2, pixelSize, pixelSize);
  
  // Vertical stroke
  drawPixelRect(x + pixelSize*3, y + pixelSize*2, pixelSize, pixelSize*4, pixelSize);
  
  // Bottom stroke
  drawPixelRect(x + pixelSize*2, y + pixelSize*5, pixelSize*2, pixelSize, pixelSize);
  
  // Lantern light effect (subtle animation)
  if (Math.sin(time * 2) > 0) {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
      drawPixelCircle(x + pixelSize*3, y + pixelSize*4, pixelSize*2, pixelSize);
  }
}

// Draw detailed ramen bowl in 8-bit style
function drawRamenBowl(x, y, width, height, pixelSize, isCompleted, time) {
  // Bowl - pixelated ellipse
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#F5F5F5';
  drawPixelEllipse(x + width/2, y + height/2, pixelSize*5, pixelSize*2.5, pixelSize);
  
  // Bowl interior - pixelated ellipse
  ctx.fillStyle = isCompleted ? '#757575' : '#FFC107'; // Yellow broth
  drawPixelEllipse(x + width/2, y + height/2, pixelSize*4, pixelSize*2, pixelSize);
  
  // Bowl rim highlight
  if (!isCompleted) {
      ctx.fillStyle = '#FFFFFF';
      drawPixelRect(x + width/2 - pixelSize*3, y + height/2 - pixelSize*2, pixelSize*6, pixelSize, pixelSize);
  }
  
  // Ramen noodles - pixelated
  if (!isCompleted) {
      ctx.fillStyle = '#FFECB3'; // Light yellow
      
      // Create pixel pattern for noodles
      for (let i = 0; i < 8; i++) {
          const noodleX = Math.floor((x + width/2 - pixelSize*3 + (i % 4) * pixelSize*2) / pixelSize) * pixelSize;
          const noodleY = Math.floor((y + height/2 - pixelSize + Math.floor(i/4) * pixelSize*1.5) / pixelSize) * pixelSize;
          
          // Curved noodle shape
          drawPixelRect(noodleX, noodleY, pixelSize, pixelSize, pixelSize);
          drawPixelRect(noodleX + pixelSize, noodleY, pixelSize, pixelSize, pixelSize);
          drawPixelRect(noodleX + pixelSize, noodleY + pixelSize, pixelSize, pixelSize, pixelSize);
      }
      
      // Toppings - pixelated
      
      // Egg - pixelated oval
      ctx.fillStyle = '#FFECB3'; // Light yellow
      drawPixelEllipse(x + width/2 - pixelSize*2, y + height/2, pixelSize, pixelSize/2, pixelSize/2);
      
      // Egg yolk
      ctx.fillStyle = '#FFA000'; // Darker yellow
      drawPixelRect(x + width/2 - pixelSize*2, y + height/2, pixelSize, pixelSize/2, pixelSize/2);
      
      // Pork (chashu) - pixelated
      ctx.fillStyle = '#D7CCC8'; // Light brown
      drawPixelRect(x + width/2 + pixelSize, y + height/2 - pixelSize, pixelSize*2, pixelSize, pixelSize);
      
      // Pork fat line
      ctx.fillStyle = '#FFFFFF';
      drawPixelRect(x + width/2 + pixelSize, y + height/2 - pixelSize/2, pixelSize*2, pixelSize/2, pixelSize/2);
      
      // Green onions - pixelated
      ctx.fillStyle = '#4CAF50'; // Green
      
      // Place several green onion pieces
      for (let i = 0; i < 4; i++) {
          const onionX = Math.floor((x + width/2 - pixelSize*3 + i * pixelSize*2) / pixelSize) * pixelSize;
          const onionY = Math.floor((y + height/2 - pixelSize/2) / pixelSize) * pixelSize;
          
          if (i % 2 === 0) {
              drawPixelRect(onionX, onionY, pixelSize, pixelSize/2, pixelSize/2);
          }
      }
      
      // Nori (seaweed) - pixelated
      ctx.fillStyle = '#2E7D32'; // Dark green
      drawPixelRect(x + width/2 + pixelSize*2, y + height/2 - pixelSize*2, pixelSize, pixelSize*2, pixelSize);
  }
}

// Draw pixelated ellipse
function drawPixelEllipse(centerX, centerY, radiusX, radiusY, pixelSize) {
  for (let y = -radiusY; y <= radiusY; y += pixelSize) {
      for (let x = -radiusX; x <= radiusX; x += pixelSize) {
          if ((x*x)/(radiusX*radiusX) + (y*y)/(radiusY*radiusY) <= 1) {
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

// Draw steam from ramen in 8-bit style
function drawRamenSteam(x, y, width, height, time, pixelSize) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  
  for (let i = 0; i < 3; i++) {
      const steamPhase = time + i * 0.7;
      const steamX = Math.floor((x + width/2 + Math.sin(steamPhase) * 8) / pixelSize) * pixelSize;
      const steamY = Math.floor((y + height/2 - 15 - (steamPhase % 2) * 10) / pixelSize) * pixelSize;
      
      // Draw pixelated "cloud" shapes for steam
      drawPixelRect(steamX, steamY, pixelSize*2, pixelSize, pixelSize);
      drawPixelRect(steamX - pixelSize, steamY - pixelSize, pixelSize*4, pixelSize, pixelSize);
      drawPixelRect(steamX, steamY - pixelSize*2, pixelSize*2, pixelSize, pixelSize);
      
      // Animate steam rising
      if (Math.sin(time * 4 + i) > 0) {
          drawPixelRect(steamX + pixelSize, steamY - pixelSize*3, pixelSize, pixelSize, pixelSize);
      }
  }
}

// Draw glow around active ramen shop
function drawRamenShopGlow(x, y, width, height, time) {
  const pulseSize = 70 + Math.sin(time * 1.5) * 10;
  
  const glowGradient = ctx.createRadialGradient(
      x + width/2, y + height/2, 10,
      x + width/2, y + height/2, pulseSize
  );
  
  // Orange glow with animation
  const alpha = 0.2 + Math.sin(time * 2) * 0.1;
  glowGradient.addColorStop(0, `rgba(255, 87, 34, ${alpha + 0.1})`);
  glowGradient.addColorStop(1, 'rgba(255, 87, 34, 0)');
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(x - 20, y - 20, width + 40, height + 40);
}