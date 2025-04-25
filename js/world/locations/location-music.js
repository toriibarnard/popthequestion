// Music Shop Location - 8-bit version
// A boombox/speaker design with pixel art styling

function drawMusicShop(x, y, location) {
  const width = location.width;
  const height = location.height;
  const isCompleted = gameState.stagesCompleted[location.id];
  const isActive = locations.indexOf(location) === gameState.currentStage;
  const pixelSize = 4; // Consistent pixel size for 8-bit look
  
  // Animation time variable for effects
  const time = Date.now() / 1000;
  
  // Speaker/boombox dimensions
  const speakerWidth = width * 0.8;
  const speakerHeight = height * 0.7;
  const speakerX = x + (width - speakerWidth) / 2;
  const speakerY = y + height - speakerHeight;
  
  // Add subtle glow if active
  if (isActive && !isCompleted) {
      drawSpeakerGlow(speakerX, speakerY, speakerWidth, speakerHeight, time);
  }
  
  // Speaker body - pixelated
  ctx.fillStyle = isCompleted ? '#616161' : '#212121';
  drawPixelRect(speakerX, speakerY, speakerWidth, speakerHeight, pixelSize);
  
  // Speaker top - pixelated
  ctx.fillStyle = isCompleted ? '#757575' : '#1DB954'; // Spotify green
  drawPixelRect(speakerX, speakerY - pixelSize, speakerWidth, pixelSize, pixelSize);
  
  // Add pixelated texture details to speaker body
  if (!isCompleted) {
      drawSpeakerTexture(speakerX, speakerY, speakerWidth, speakerHeight, pixelSize);
  }
  
  // Speaker cones - pixelated circles
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#424242';
  const cone1X = speakerX + speakerWidth * 0.3;
  const cone2X = speakerX + speakerWidth * 0.7;
  const coneY = speakerY + speakerHeight * 0.4;
  const coneRadius1 = speakerWidth * 0.25;
  
  // Left speaker cone
  drawPixelCircle(cone1X, coneY, coneRadius1, pixelSize);
  
  // Right speaker cone
  drawPixelCircle(cone2X, coneY, coneRadius1, pixelSize);
  
  // Speaker dust caps - pixelated
  ctx.fillStyle = isCompleted ? '#E0E0E0' : '#1DB954'; // Spotify green
  const coneRadius2 = speakerWidth * 0.15;
  
  // Left speaker dust cap
  drawPixelCircle(cone1X, coneY, coneRadius2, pixelSize);
  
  // Right speaker dust cap
  drawPixelCircle(cone2X, coneY, coneRadius2, pixelSize);
  
  // Control panel - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#E0E0E0';
  const panelX = speakerX + speakerWidth * 0.2;
  const panelY = speakerY + speakerHeight * 0.7;
  const panelWidth = speakerWidth * 0.6;
  const panelHeight = speakerHeight * 0.2;
  drawPixelRect(panelX, panelY, panelWidth, panelHeight, pixelSize);
  
  // Control knobs - pixelated
  ctx.fillStyle = isCompleted ? '#616161' : '#1DB954'; // Spotify green
  
  for (let i = 0; i < 3; i++) {
      const knobX = speakerX + speakerWidth * (0.3 + i * 0.2);
      const knobY = speakerY + speakerHeight * 0.8;
      const knobSize = speakerWidth * 0.04;
      drawPixelCircle(knobX, knobY, knobSize, pixelSize);
  }
  
  // Add 8-bit style music notes if active
  if (isActive && !isCompleted) {
      draw8BitMusicNotes(x, y, width, speakerHeight, time, pixelSize);
  }
  
  // Add additional 8-bit details
  drawBoomboxDetails(speakerX, speakerY, speakerWidth, speakerHeight, pixelSize, isCompleted);
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

// Draw pixelated texture on the speaker body
function drawSpeakerTexture(x, y, width, height, pixelSize) {
  // Slightly lighter shade for texture
  ctx.fillStyle = '#2A2A2A';
  
  // Draw grid pattern on the speaker
  for (let i = x + pixelSize*2; i < x + width - pixelSize*2; i += pixelSize*4) {
      for (let j = y + pixelSize*2; j < y + height - pixelSize*2; j += pixelSize*4) {
          // Skip areas where the speaker cones and control panel will be
          const centerY = y + height * 0.4;
          const leftConeX = x + width * 0.3;
          const rightConeX = x + width * 0.7;
          const coneRadius = width * 0.25;
          
          // Check if current pixel is in speaker cone areas
          const inLeftCone = Math.pow(i - leftConeX, 2) + Math.pow(j - centerY, 2) < Math.pow(coneRadius, 2);
          const inRightCone = Math.pow(i - rightConeX, 2) + Math.pow(j - centerY, 2) < Math.pow(coneRadius, 2);
          const inControlPanel = j > y + height * 0.7 && j < y + height * 0.9 && 
                                i > x + width * 0.2 && i < x + width * 0.8;
          
          if (!inLeftCone && !inRightCone && !inControlPanel) {
              drawPixelRect(i, j, pixelSize, pixelSize, pixelSize);
          }
      }
  }
}

// Draw 8-bit style music notes
function draw8BitMusicNotes(x, y, width, speakerHeight, time, pixelSize) {
  for (let i = 0; i < 3; i++) {
      const notePhase = time + i * 0.7;
      const noteX = Math.floor((x + width / 2 + Math.sin(notePhase * 2) * 15) / pixelSize) * pixelSize;
      const noteY = Math.floor((y + speakerHeight - 20 - (notePhase % 3) * 15) / pixelSize) * pixelSize;
      
      ctx.fillStyle = '#1DB954'; // Spotify green
      
      // Note head - pixelated oval
      drawPixelRect(noteX, noteY, pixelSize*2, pixelSize, pixelSize);
      
      // Note stem - pixelated line
      for (let j = 0; j < 12; j += pixelSize) {
          drawPixelRect(noteX + pixelSize, noteY - j, pixelSize, pixelSize, pixelSize);
      }
      
      // Note flag for eighth notes - pixelated
      if (i % 2 === 0) {
          drawPixelRect(noteX + pixelSize, noteY - 12, pixelSize*2, pixelSize, pixelSize);
          drawPixelRect(noteX + pixelSize*2, noteY - 12 + pixelSize, pixelSize, pixelSize, pixelSize);
      }
  }
}

// Draw glow around active speaker
function drawSpeakerGlow(x, y, width, height, time) {
  // Create pixelated glow effect with subtle animation
  const pulseSize = 60 + Math.sin(time * 2) * 10;
  
  const glowGradient = ctx.createRadialGradient(
      x + width / 2, y + height / 2, 10,
      x + width / 2, y + height / 2, pulseSize
  );
  
  // Spotify green glow with animation
  const alpha = 0.2 + Math.sin(time * 3) * 0.1;
  glowGradient.addColorStop(0, `rgba(29, 185, 84, ${alpha + 0.1})`);
  glowGradient.addColorStop(1, 'rgba(29, 185, 84, 0)');
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(x - 20, y - 20, width + 40, height + 40);
}

// Draw additional 8-bit boombox details
function drawBoomboxDetails(x, y, width, height, pixelSize, isCompleted) {
  // Handle/grip on top
  ctx.fillStyle = isCompleted ? '#424242' : '#333333';
  drawPixelRect(x + width*0.3, y - pixelSize*3, width*0.4, pixelSize*2, pixelSize);
  
  // Speaker name/brand text area
  ctx.fillStyle = isCompleted ? '#757575' : '#1DB954';
  drawPixelRect(x + width*0.3, y + pixelSize*3, width*0.4, pixelSize*3, pixelSize);
  
  // Cassette deck - pixelated
  if (!isCompleted) {
      ctx.fillStyle = '#111111';
      const deckX = x + width*0.35;
      const deckY = y + height*0.2;
      const deckWidth = width*0.3;
      const deckHeight = height*0.15;
      drawPixelRect(deckX, deckY, deckWidth, deckHeight, pixelSize);
      
      // Cassette details
      ctx.fillStyle = '#333333';
      drawPixelRect(deckX + pixelSize*2, deckY + pixelSize*2, deckWidth - pixelSize*4, deckHeight - pixelSize*4, pixelSize);
      
      // Cassette reels - pixelated circles
      ctx.fillStyle = '#1DB954';
      drawPixelCircle(deckX + deckWidth*0.25, deckY + deckHeight*0.5, pixelSize*2, pixelSize);
      drawPixelCircle(deckX + deckWidth*0.75, deckY + deckHeight*0.5, pixelSize*2, pixelSize);
  }
  
  // Volume level indicators - pixelated
  if (!isCompleted) {
      // Level bars
      for (let i = 0; i < 5; i++) {
          ctx.fillStyle = i < 3 ? '#1DB954' : '#FF5252'; // Green then red for peak levels
          drawPixelRect(
              x + width*0.2 + i*width*0.12, 
              y + height*0.55, 
              pixelSize*2, 
              pixelSize*3 + i*pixelSize, 
              pixelSize
          );
      }
  }
  
  // Bass port - pixelated
  ctx.fillStyle = '#111111';
  drawPixelRect(x + width*0.45, y + height*0.25, width*0.1, height*0.05, pixelSize);
}