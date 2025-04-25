// Date Ranking Location - 8-bit version
// A digital display board for ranking dates with pixel art styling

function drawDateRanking(x, y, location) {
  const width = location.width;
  const height = location.height;
  const isCompleted = gameState.stagesCompleted[location.id];
  const isActive = locations.indexOf(location) === gameState.currentStage;
  const pixelSize = 4; // Consistent pixel size for 8-bit look
  
  // Animation time variable
  const time = Date.now() / 1000;
  
  // Main structure - digital display board - pixelated
  ctx.fillStyle = isCompleted ? '#757575' : '#263238'; // Dark blue-grey
  drawPixelRect(x, y, width, height, pixelSize);
  
  // Screen frame - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#546E7A'; // Lighter blue-grey
  drawPixelRect(x + pixelSize, y + pixelSize, width - pixelSize*2, height - pixelSize*2, pixelSize);
  
  // Screen - pixelated
  ctx.fillStyle = isCompleted ? '#616161' : '#0D47A1'; // Deep blue 
  drawPixelRect(x + pixelSize*3, y + pixelSize*6, width - pixelSize*6, height - pixelSize*9, pixelSize);
  
  // Title bar - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#1565C0'; // Medium blue
  drawPixelRect(x + pixelSize*3, y + pixelSize*3, width - pixelSize*6, pixelSize*3, pixelSize);
  
  // Title text - pixelated version
  drawPixelText("OUR DATES RANKING", x + width/2, y + pixelSize*4.5, 
                '#FFFFFF', pixelSize);
  
  // Control buttons - pixelated circles
  const buttonColors = isCompleted ? 
      ['#9E9E9E', '#9E9E9E', '#9E9E9E'] : 
      ['#F44336', '#FFC107', '#4CAF50']; // Red, Yellow, Green
  
  for (let i = 0; i < 3; i++) {
      const buttonX = x + width - pixelSize*6 + i * pixelSize*4;
      const buttonY = y + pixelSize*4.5;
      
      drawPixelCircle(buttonX, buttonY, pixelSize*1.5, pixelSize);
      
      // Add button detail
      if (!isCompleted) {
          ctx.fillStyle = shadeColor(buttonColors[i], -20); // Darker version for detail
          drawPixelRect(buttonX, buttonY, pixelSize, pixelSize, pixelSize);
      }
  }
  
  // Decorative keyboard/control panel - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#455A64'; // Blue-grey
  drawPixelRect(x + width/4, y + height - pixelSize*4, width/2, pixelSize*3, pixelSize);
  
  // Add keyboard detail - keys
  if (!isCompleted) {
      ctx.fillStyle = '#37474F'; // Darker blue-grey
      for (let i = 0; i < 5; i++) {
          drawPixelRect(
              x + width/4 + pixelSize*2 + i * (width/2 - pixelSize*4)/5, 
              y + height - pixelSize*3.5, 
              pixelSize*3, pixelSize, pixelSize
          );
      }
  }
  
  // Display content - show date rankings with 8-bit styling
  if (isActive || isCompleted) {
      drawRankingsContent(x, y, width, height, pixelSize, isCompleted, time);
  }
  
  // Add technology elements - LEDs and indicators in 8-bit style
  if (!isCompleted) {
      drawTechElements(x, y, width, height, pixelSize, time);
  }
  
  // Add subtle glow if active - keep the gradient but make it more blocky
  if (isActive && !isCompleted) {
      drawDateRankingGlow(x, y, width, height, time);
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
              // Basic letter shape
              drawPixelRect(posX - renderSize, y - renderSize*2, renderSize*2, renderSize*4, renderSize);
              
              // For letters with holes (O, A, R, etc)
              if (['O', 'A', 'R', 'D', 'P', 'B'].includes(char)) {
                  ctx.fillStyle = '#0D47A1'; // Screen background color
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

// Draw rankings content in 8-bit style
function drawRankingsContent(x, y, width, height, pixelSize, isCompleted, time) {
  const dates = [
      { name: "Torii is awesome", rank: 1 },
      { name: "Torii is cool", rank: 2 },
      { name: "Torii is handsome", rank: 3 },
      { name: "Torii is funny", rank: 4 },
      { name: "Torii is smart", rank: 5 }
  ];
  
  // Screen content area
  const contentX = x + pixelSize*5;
  const contentY = y + pixelSize*10;
  const contentWidth = width - pixelSize*10;
  const contentHeight = height - pixelSize*15;
  
  // Draw list of dates in 8-bit style
  dates.forEach((date, index) => {
      const itemY = contentY + pixelSize*4 + index * pixelSize*5;
      
      // Rank background - pixelated circle
      ctx.fillStyle = isCompleted ? '#9E9E9E' : 
          (index === 0 ? '#FFD700' : // Gold
           index === 1 ? '#C0C0C0' : // Silver
           index === 2 ? '#CD7F32' : // Bronze
           '#607D8B'); // Blue grey for others
      
      drawPixelCircle(contentX + pixelSize*2, itemY - pixelSize, pixelSize*2, pixelSize);
      
      // Rank number in pixel style
      ctx.fillStyle = '#000000';
      drawPixelText(date.rank.toString(), contentX + pixelSize*2, itemY - pixelSize, '#000000', pixelSize);
      
      // Date name in pixel style - simplified
      drawDateName(date.name, contentX + pixelSize*6, itemY, isCompleted, pixelSize);
      
      // Decorative line - pixelated
      ctx.fillStyle = isCompleted ? '#757575' : '#4FC3F7'; // Light blue
      drawPixelRect(contentX, itemY + pixelSize*2, contentWidth - pixelSize*5, pixelSize, pixelSize);
      
      // Add slight animation to active lines
      if (!isCompleted && index === Math.floor(time) % 5) {
          ctx.fillStyle = '#81D4FA'; // Lighter blue highlight
          for (let i = 0; i < contentWidth - pixelSize*5; i += pixelSize*4) {
              drawPixelRect(contentX + i, itemY + pixelSize*2, pixelSize*2, pixelSize, pixelSize);
          }
      }
  });
  
  // Add heart icons for the top dates - pixelated version
  for (let i = 0; i < 3; i++) {
      const itemY = contentY + pixelSize*4 + i * pixelSize*5;
      const hearts = 3 - i; // 3 hearts for 1st, 2 for 2nd, 1 for 3rd
      
      for (let h = 0; h < hearts; h++) {
          const heartX = contentX + contentWidth - pixelSize*4 - h * pixelSize*3;
          ctx.fillStyle = isCompleted ? '#9E9E9E' : '#FF4081'; // Pink
          drawPixelHeart(heartX, itemY - pixelSize, pixelSize);
      }
  }
}

// Helper function to draw a pixelated heart
function drawPixelHeart(x, y, pixelSize) {
  // Simple pixel heart pattern
  const heartPattern = [
      [0,1,0,1,0],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [0,1,1,1,0],
      [0,0,1,0,0]
  ];
  
  for (let i = 0; i < heartPattern.length; i++) {
      for (let j = 0; j < heartPattern[0].length; j++) {
          if (heartPattern[i][j] === 1) {
              ctx.fillRect(
                  x + (j-2) * pixelSize,
                  y + (i-2) * pixelSize,
                  pixelSize,
                  pixelSize
              );
          }
      }
  }
}

// Draw technology elements in 8-bit style
function drawTechElements(x, y, width, height, pixelSize, time) {
  // Blinking cursor - pixelated
  if (Math.floor(time) % 2 === 0) {
      ctx.fillStyle = '#FFFFFF';
      drawPixelRect(x + pixelSize*10, y + height - pixelSize*10, pixelSize*2, pixelSize*3, pixelSize);
  }
  
  // Glowing LED lights on the control panel - pixelated
  const ledColors = ['#F44336', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0']; // Various colors
  
  for (let i = 0; i < 5; i++) {
      const ledX = x + width/4 + pixelSize*2 + i * (width/2 - pixelSize*4) / 5;
      const ledY = y + height - pixelSize*2.5;
      
      // LED base
      ctx.fillStyle = ledColors[i];
      drawPixelRect(ledX, ledY, pixelSize*2, pixelSize, pixelSize);
      
      // Add blink pattern - alternate LEDs
      if ((Math.floor(time * 4) + i) % 5 === 0) {
          // Simple glow effect
          ctx.fillStyle = ledColors[i];
          drawPixelRect(ledX - pixelSize, ledY - pixelSize, pixelSize*4, pixelSize*3, pixelSize);
          
          // Brighter center
          ctx.fillStyle = lightenColor(ledColors[i], 50);
          drawPixelRect(ledX, ledY, pixelSize*2, pixelSize, pixelSize);
      }
  }
  
  // Add scanline effect for CRT look
  drawScanlines(x + pixelSize*3, y + pixelSize*6, width - pixelSize*6, height - pixelSize*9, time, pixelSize);
}

// Draw scanlines for retro CRT look
function drawScanlines(x, y, width, height, time, pixelSize) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  
  // Moving scanline
  const scanPos = Math.floor((time * 20) % height);
  drawPixelRect(x, y + scanPos, width, pixelSize, pixelSize);
  
  // Static scanlines (every few pixels)
  for (let j = 0; j < height; j += pixelSize*3) {
      drawPixelRect(x, y + j, width, pixelSize/2, pixelSize/2);
  }
}

// Helper function to draw date name in pixel style
function drawDateName(name, x, y, isCompleted, pixelSize) {
  ctx.fillStyle = isCompleted ? '#E0E0E0' : '#FFFFFF';
  
  // Simplify approach for 8-bit style with blocks representing text
  const words = name.split(' ');
  let offsetX = 0;
  
  words.forEach((word, wordIndex) => {
      // Represent each word as a series of pixel blocks
      for (let i = 0; i < word.length; i++) {
          // Skip lowercase letter parts
          if (i % 2 === 0 || word[i].toUpperCase() === word[i]) {
              drawPixelRect(
                  x + offsetX + i * pixelSize, 
                  y - pixelSize, 
                  pixelSize, 
                  pixelSize*2, 
                  pixelSize
              );
          }
      }
      
      // Move to next word
      offsetX += (word.length * pixelSize) + pixelSize*2;
  });
}

// Draw glow around the display board
function drawDateRankingGlow(x, y, width, height, time) {
  const pulseSize = 80 + Math.sin(time * 2) * 10;
  
  const glowGradient = ctx.createRadialGradient(
      x + width/2, y + height/2, 10,
      x + width/2, y + height/2, pulseSize
  );
  
  // Blue glow with animation
  const alpha = 0.2 + Math.sin(time * 3) * 0.1;
  glowGradient.addColorStop(0, `rgba(33, 150, 243, ${alpha + 0.1})`);
  glowGradient.addColorStop(1, 'rgba(33, 150, 243, 0)');
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(x - 30, y - 30, width + 60, height + 60);
}

// Helper function to darken a color by percentage
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.floor(R * (100 + percent) / 100);
  G = Math.floor(G * (100 + percent) / 100);
  B = Math.floor(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  R = (R > 0) ? R : 0;
  G = (G > 0) ? G : 0;
  B = (B > 0) ? B : 0;

  const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}

// Helper function to lighten a color by percentage
function lightenColor(color, percent) {
  return shadeColor(color, percent);
}