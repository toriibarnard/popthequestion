// Camera Location for Picture Puzzle - 8-bit version

// Draw Camera location with pixel art styling
function drawCamera(x, y, location) {
  const width = location.width;
  const height = location.height;
  const isCompleted = gameState.stagesCompleted[location.id];
  const isActive = locations.indexOf(location) === gameState.currentStage;
  const pixelSize = 4; // Consistent pixel size for 8-bit look
  
  // Animation time variable
  const time = Date.now() / 1000;
  
  // Add glow effect for active camera
  if (isActive && !isCompleted) {
      drawCameraGlow(x, y, width, height, time);
  }
  
  // Camera body - pixelated rectangle
  ctx.fillStyle = isCompleted ? '#757575' : '#212121'; // Dark grey/black
  drawPixelRect(x + width/4, y + height/4, width/2, height/2, pixelSize);
  
  // Camera lens - pixelated circle
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#1A237E'; // Dark blue lens
  drawPixelCircle(x + width/2, y + height/2, width/6, pixelSize);
  
  // Inner lens - smaller pixelated circle
  ctx.fillStyle = isCompleted ? '#616161' : '#000000';
  drawPixelCircle(x + width/2, y + height/2, width/10, pixelSize);
  
  // Lens reflection detail (small white pixel)
  if (!isCompleted) {
      ctx.fillStyle = '#FFFFFF';
      drawPixelRect(x + width/2 - width/20, y + height/2 - width/20, pixelSize, pixelSize, pixelSize);
  }
  
  // Flash - pixelated rectangle
  ctx.fillStyle = isCompleted ? '#E0E0E0' : '#FFECB3'; // Light yellow
  drawPixelRect(x + width/4 + width/10, y + height/4 - height/10, width/5, height/10, pixelSize);
  
  // Camera grip (right side) - pixelated
  ctx.fillStyle = isCompleted ? '#757575' : '#37474F'; // Dark blue-grey
  drawPixelRect(x + width*3/4, y + height/4, width/8, height/2, pixelSize);
  
  // Camera viewfinder - pixelated
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#546E7A'; // Blue-grey
  drawPixelRect(x + width/4, y + height/4 - height/8, width/5, height/10, pixelSize);
  
  // Viewfinder detail - inner rectangle
  if (!isCompleted) {
      ctx.fillStyle = '#263238'; // Darker blue-grey
      drawPixelRect(x + width/4 + pixelSize, y + height/4 - height/8 + pixelSize, 
                  width/5 - pixelSize*2, height/10 - pixelSize*2, pixelSize);
  }
  
  // Shutter button - pixelated circle
  ctx.fillStyle = isCompleted ? '#E0E0E0' : '#F44336'; // Red
  drawPixelCircle(x + width*3/4 + width/16, y + height/4 + height/10, width/20, pixelSize);
  
  // Camera strap attachments - pixelated rectangles
  ctx.fillStyle = isCompleted ? '#9E9E9E' : '#37474F';
  drawPixelRect(x + width/4 - width/20, y + height/3, width/20, height/10, pixelSize);
  drawPixelRect(x + width*3/4 + width/8, y + height/3, width/20, height/10, pixelSize);
  
  // Camera details - add some 8-bit detailing
  drawCameraDetails(x, y, width, height, pixelSize, isCompleted);
  
  // Add a photo coming out if active - pixelated version
  if (isActive && !isCompleted) {
      drawPixelPhoto(x, y, width, height, time, pixelSize);
  }
  
  // Add flash effect if active - pixelated version
  if (isActive && !isCompleted) {
      if (Math.sin(time * 3) > 0.95) { // Flash every few seconds
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          drawPixelCircle(x + width/4 + width/10 + width/10, y + height/4 - height/20, width/12, pixelSize);
      }
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

// Draw additional camera details in 8-bit style
function drawCameraDetails(x, y, width, height, pixelSize, isCompleted) {
  if (!isCompleted) {
      // Model name or brand on top - pixelated text effect
      ctx.fillStyle = '#FFFFFF';
      const brandX = x + width/4 + width/4;
      const brandY = y + height/4 - height/15;
      
      // Simplified "CAMERA" text in pixels
      const letterWidth = pixelSize*2;
      const letterSpacing = pixelSize*3;
      
      for (let i = 0; i < 6; i++) { // CAMERA has 6 letters
          drawPixelRect(brandX + i * letterSpacing, brandY, letterWidth, pixelSize, pixelSize);
      }
      
      // Camera controls - mode dial
      ctx.fillStyle = '#E0E0E0';
      drawPixelCircle(x + width/4 + width/8, y + height/4 + height/12, width/25, pixelSize);
      
      // Mode dial detail
      ctx.fillStyle = '#F44336'; // Red indicator
      drawPixelRect(
          x + width/4 + width/8 + width/40, 
          y + height/4 + height/12, 
          pixelSize, pixelSize, pixelSize
      );
      
      // Camera texture - subtle pattern
      ctx.fillStyle = '#171717'; // Slightly lighter than body
      
      for (let i = 0; i < width/2; i += pixelSize*4) {
          for (let j = 0; j < height/2; j += pixelSize*4) {
              // Skip areas where other features are
              if (j > height/10 && j < height/3 && i > width/8 && i < width*3/8) {
                  drawPixelRect(
                      x + width/4 + i, 
                      y + height/4 + j, 
                      pixelSize, pixelSize, pixelSize
                  );
              }
          }
      }
  }
}

// Draw the photo coming out in 8-bit style
function drawPixelPhoto(x, y, width, height, time, pixelSize) {
  const photoY = Math.floor((y + height/4 + height/2 + Math.sin(time * 2) * 2) / pixelSize) * pixelSize; // Pixel-aligned bobbing
  
  // Photo frame - pixelated
  ctx.fillStyle = '#FFFFFF';
  drawPixelRect(x + width/2 - width/6, photoY, width/3, height/4, pixelSize);
  
  // Photo image - pixelated
  ctx.fillStyle = '#3F51B5'; // Indigo color for photo content
  drawPixelRect(x + width/2 - width/6 + pixelSize, photoY + pixelSize, width/3 - pixelSize*2, height/4 - pixelSize*2, pixelSize);
  
  // Pixel pattern to suggest image - now properly 8-bit
  ctx.fillStyle = '#7986CB'; // Lighter blue
  
  // Use a more structured pattern for 8-bit look
  for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
          if ((i + j) % 2 === 0 || (i === 3 && j < 4) || (j === 2 && i > 1)) {
              drawPixelRect(
                  x + width/2 - width/6 + pixelSize*2 + i * pixelSize*2,
                  photoY + pixelSize*2 + j * pixelSize*2,
                  pixelSize*2, pixelSize*2, pixelSize
              );
          }
      }
  }
  
  // Photo development area - white strip at bottom
  ctx.fillStyle = '#EEEEEE';
  drawPixelRect(
      x + width/2 - width/6 + pixelSize,
      photoY + height/4 - pixelSize*6,
      width/3 - pixelSize*2, pixelSize*4, pixelSize
  );
}

// Draw camera glow effect in 8-bit style
function drawCameraGlow(x, y, width, height, time) {
  // Create pixelated glow effect with subtle animation
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
  ctx.fillRect(x - 20, y - 20, width + 40, height + 40);
}