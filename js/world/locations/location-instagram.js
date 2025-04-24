// Classic red phone booth with 8-bit styling
// Simplified from the original cyberpunk Instagram design
function drawPhoneBox(x, y, location) {
  const width = location.width;
  const height = location.height;
  const isCompleted = gameState.stagesCompleted[location.id];
  const isActive = locations.indexOf(location) === gameState.currentStage;
  const pixelSize = 4; // Keep consistent pixel size for 8-bit feel
  
  // Animation time variables for subtle effects
  const time = Date.now() / 1000;
  const pulseAmount = Math.sin(time * 2) * 0.1 + 0.9; // Subtle pulse between 0.8 and 1.0
  
  // Draw a subtle glow around the booth when active
  if (isActive) {
    drawBoothGlow(x, y, width, height, time);
  }
  
  // Main booth body - classic red color
  ctx.fillStyle = isCompleted ? 
    '#AA0000' : // Darker red if completed
    '#FF0000'; // Bright red if active or normal
  drawPixelRect(x, y, width, height, pixelSize);
  
  // Phone booth top - slightly darker red for dimension
  ctx.fillStyle = isCompleted ? 
    '#880000' : // Darker red if completed
    '#CC0000'; // Slightly darker red for normal state
  drawPixelRect(x, y - 10, width, 10, pixelSize);
  
  // Phone booth door - darker red
  ctx.fillStyle = isCompleted ? 
    '#770000' : // Darker red if completed
    '#BB0000'; // Door color
  drawPixelRect(x + 10, y + 20, width - 20, height - 30, pixelSize);
  
  // Phone booth windows with 8-bit look
  drawWindows(x, y, width, height, pixelSize, isActive, isCompleted);
  
  // Top crown detail
  drawCrown(x, y - 10, width, pixelSize, isCompleted);
  
  // "TELEPHONE" text panel at the top
  ctx.fillStyle = '#FFFFFF';
  drawPixelRect(x + 15, y - 5, width - 30, 8, pixelSize);
  
  // Phone inside
  if (isActive || isCompleted) {
    // Phone handset
    ctx.fillStyle = '#000000';
    drawPixelRect(x + width / 2 - 8, y + height - 40, 16, 25, pixelSize);
    
    // Phone cord (zigzag pattern)
    drawPhoneCord(x, y, width, height, pixelSize, time);
    
    // Phone dial/keypad
    ctx.fillStyle = '#222222';
    drawPixelRect(x + width / 2 - 10, y + height - 70, 20, 20, pixelSize);
    
    // Active phone has a message or ringing indicator
    if (isActive) {
      // Ringing effect with simple animation
      if (Math.sin(time * 5) > 0) {
        ctx.fillStyle = '#FFFF00'; // Yellow ring indicator
        drawPixelRect(x + width / 2 + 15, y + height - 60, 6, 6, pixelSize);
      }
    }
  }
  
  // Add some ground shadow for grounding the booth
  drawGroundShadow(x, y, width, height, pixelSize);
}

// Draw a pixelated rectangle for 8-bit look
function drawPixelRect(x, y, width, height, pixelSize) {
  // Ensure we're drawing on pixel grid for true 8-bit look
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

// Draw classic phone booth windows with cross pattern
function drawWindows(x, y, width, height, pixelSize, isActive, isCompleted) {
  // Window panels - 3 panels along the width
  const panelWidth = (width - 20) / 3;
  
  for (let panelX = 0; panelX < 3; panelX++) {
    // Main window glass
    ctx.fillStyle = isCompleted ? 
      'rgba(200, 200, 255, 0.5)' : // Faded blue tint if completed
      'rgba(220, 255, 255, 0.7)'; // Light blue tint for glass
    
    const windowX = x + 10 + panelX * panelWidth;
    drawPixelRect(windowX, y + 30, panelWidth, height - 70, pixelSize);
    
    // Window frame cross (vertical)
    ctx.fillStyle = isCompleted ? 
      '#880000' : // Darker if completed
      '#BB0000'; // Window frame color
    
    drawPixelRect(windowX + panelWidth/2 - pixelSize, y + 30, pixelSize*2, height - 70, pixelSize);
    
    // Window frame cross (horizontal) - only on the side panels
    if (panelX !== 1) { // Skip middle panel horizontal bar for door look
      drawPixelRect(windowX, y + 30 + (height - 70)/2 - pixelSize, panelWidth, pixelSize*2, pixelSize);
    }
  }
}

// Draw the phone cord with 8-bit zigzag pattern
function drawPhoneCord(x, y, width, height, pixelSize, time) {
  ctx.fillStyle = '#000000';
  
  const cordStartX = x + width / 2;
  const cordStartY = y + height - 40;
  const cordEndX = x + width / 2;
  const cordEndY = y + height - 70;
  
  // Simple zigzag pattern for 8-bit cord
  const zigzagWidth = 8;
  const zigzagSteps = 4;
  const zigzagHeight = (cordStartY - cordEndY) / zigzagSteps;
  
  for (let step = 0; step < zigzagSteps; step++) {
    const stepY = cordEndY + step * zigzagHeight;
    const direction = step % 2 === 0 ? 1 : -1;
    
    // Draw zigzag segment
    for (let i = 0; i < zigzagWidth; i += pixelSize) {
      const zigX = cordEndX + (direction * i) - zigzagWidth/2;
      drawPixelRect(zigX, stepY, pixelSize, zigzagHeight, pixelSize);
    }
  }
}

// Draw the crown top detail of the classic phone booth
function drawCrown(x, y, width, pixelSize, isCompleted) {
  ctx.fillStyle = isCompleted ? 
    '#880000' : // Darker red if completed
    '#CC0000'; // Crown color
  
  // Draw the dome/crown shape with simplified 8-bit styling
  const centerX = x + width / 2;
  const crownHeight = 15;
  
  // Center dome
  for (let h = 0; h < crownHeight; h += pixelSize) {
    const widthAtHeight = width * (1 - h/crownHeight) * 0.8;
    drawPixelRect(centerX - widthAtHeight/2, y - h - pixelSize, widthAtHeight, pixelSize, pixelSize);
  }
}

// Draw a simple ground shadow for the booth
function drawGroundShadow(x, y, width, height, pixelSize) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  
  // Draw an 8-bit styled oval shadow
  const shadowWidth = width * 1.2;
  const shadowHeight = 10;
  
  for (let i = 0; i < shadowWidth; i += pixelSize) {
    // Calculate height at this point to create an oval shape
    const distFromCenter = Math.abs(i - shadowWidth/2);
    const heightAtPoint = shadowHeight * (1 - Math.pow(distFromCenter/(shadowWidth/2), 2));
    
    if (heightAtPoint > 0) {
      drawPixelRect(
        x + width/2 - shadowWidth/2 + i,
        y + height,
        pixelSize,
        heightAtPoint,
        pixelSize
      );
    }
  }
}

// Draw a subtle glow around active booth
function drawBoothGlow(x, y, width, height, time) {
  // Subtle pulsing glow for active booth
  const glowSize = 30 + Math.sin(time) * 5;
  
  const activeGlow = ctx.createRadialGradient(
    x + width / 2, y + height / 2, 5,
    x + width / 2, y + height / 2, glowSize
  );
  activeGlow.addColorStop(0, 'rgba(255, 200, 200, 0.2)');
  activeGlow.addColorStop(1, 'rgba(255, 0, 0, 0)');
  
  ctx.fillStyle = activeGlow;
  ctx.fillRect(x - 20, y - 20, width + 40, height + 40);
}