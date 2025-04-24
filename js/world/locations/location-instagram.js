// Enhanced 8-bit cyberpunk Instagram phone booth with pixelated detail
// Matches the nighttime cyberpunk aesthetic of world-background.js
function drawPhoneBox(x, y, location) {
  const width = location.width;
  const height = location.height;
  const isCompleted = gameState.stagesCompleted[location.id];
  const isActive = locations.indexOf(location) === gameState.currentStage;
  const pixelSize = 4; // Match pixel size with world-background.js
  
  // Animation time variables
  const time = Date.now() / 1000;
  const flickerSpeed = 0.2 + Math.sin(time * 0.5) * 0.1;
  const pulseAmount = Math.sin(time * 3) * 0.2 + 0.8; // Pulsing between 0.6 and 1.0
  
  // Add subtle 8-bit noise pattern behind the booth (like in world-background)
  addPixelNoise(x - 10, y - 10, width + 20, height + 20);
  
  // Add glow effect for cyberpunk feel
  drawCyberpunkGlow(x, y, width, height, isActive, isCompleted);
  
  // Phone booth body with enhanced cyberpunk colors
  ctx.fillStyle = isCompleted ? 
    '#331155' : // Deep purple (matching skyGradient in background)
    '#FF3366' + (isActive ? Math.floor(Math.abs(Math.sin(time * 6) * 20)).toString(16) : ''); // Neon pink with subtle flicker if active
  drawPixelRect(x, y, width, height, pixelSize);
  
  // Add scanlines effect for retro feel
  drawScanlines(x, y, width, height);
  
  // Phone booth top with enhanced cyberpunk style
  ctx.fillStyle = isCompleted ? 
    '#5C2751' : // Medium purple (matching skyGradient)
    '#00FFFF' + (isActive ? Math.floor(Math.abs(Math.sin(time * 8) * 15)).toString(16) : ''); // Cyan neon with subtle flicker
  drawPixelTriangle(x, y, width, pixelSize);
  
  // Phone booth door with pixelated edges - more cyberpunk
  ctx.fillStyle = isCompleted ? 
    '#1A0B36' : // Rich dark purple (matching skyGradient)
    '#7B68EE' + (isActive ? Math.floor(Math.abs(Math.cos(time * 5) * 30)).toString(16) : ''); // Electric indigo with subtle flicker
  drawPixelRect(x + 10, y + 20, width - 20, height - 30, pixelSize);
  
  // Phone booth windows with neon-like glow
  drawNeonWindows(x, y, width, height, pixelSize, isActive, isCompleted, time);
  
  // Top panel with Instagram logo, pixelated
  ctx.fillStyle = isCompleted ? 
    '#0D0221' : // Deepest dark purple (matching skyGradient)
    '#111111';
  drawPixelRect(x + 20, y + 5, width - 40, 10, pixelSize);
  
  // Instagram camera icon, with enhanced cyberpunk style
  drawCyberpunkCamera(x, y, width, pixelSize, isActive, isCompleted, time);
  
  // Phone inside with enhanced cyberpunk screen
  if (isActive || isCompleted) {
    // Phone device body
    ctx.fillStyle = '#212121';
    drawPixelRect(x + width / 2 - 8, y + height - 40, 16, 25, pixelSize);
    
    // Phone screen with pixelated cyberpunk glow effect
    const screenColor = isCompleted ? 
      '#757575' : // Dimmed if completed
      `rgba(102, 255, ${Math.floor(Math.sin(time * 4) * 30 + 150)}, ${pulseAmount.toFixed(2)})`; // Pulsing neon green
    
    ctx.fillStyle = screenColor;
    drawPixelRect(x + width / 2 - 6, y + height - 38, 12, 18, pixelSize);
    
    // Message on screen (cyberpunk text effect)
    if (isActive) {
      // Message bubble with pixelation
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 4; i += pixelSize) {
        for (let j = 0; j < 4; j += pixelSize) {
          ctx.fillRect(x + width / 2 - 4 + i, y + height - 35 + j, pixelSize, pixelSize);
        }
      }
      
      // Draw text pixel by pixel for 8-bit effect
      drawPixelText("hey gorgeous", x + width / 2, y + height - 28, '#00FFFF', pixelSize / 2);
    }
  }
  
  // Enhanced neon glow effect if active (cyberpunk style)
  if (isActive && !isCompleted) {
    drawEnhancedNeonGlow(x, y, width, height, time);
  }
}
// Draw a pixelated rectangle with blocky 8-bit detail
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
// Draw a pixelated triangle (for phone booth top) with enhanced cyberpunk style
function drawPixelTriangle(x, y, width, pixelSize) {
  const topHeight = 15; // Slightly taller for more dramatic cyberpunk look
  const centerX = x + width / 2;
  
  // Ensure we're drawing on pixel grid
  const startX = Math.floor(x / pixelSize) * pixelSize;
  const endX = Math.ceil((x + width) / pixelSize) * pixelSize;
  const startY = Math.floor((y - topHeight) / pixelSize) * pixelSize;
  const middleX = Math.floor(centerX / pixelSize) * pixelSize;
  
  for (let i = startX; i < endX; i += pixelSize) {
    // Create sharper triangle for cyberpunk look
    const distFromCenter = Math.abs(i - middleX);
    const heightAtPoint = Math.max(0, topHeight - (distFromCenter / 4));
    
    for (let j = 0; j < heightAtPoint; j += pixelSize) {
      ctx.fillRect(i, y - j, pixelSize, pixelSize);
    }
  }
}
// Draw cyberpunk camera icon with neon effect
function drawCyberpunkCamera(x, y, width, pixelSize, isActive, isCompleted, time) {
  // Determine color based on state and add subtle animation
  const cameraColor = isCompleted ? 
    '#8A2BE2' : // Purple for completed
    isActive ? 
      `rgb(${Math.floor(Math.sin(time * 5) * 55 + 200)}, 20, ${Math.floor(Math.cos(time * 3) * 55 + 200)})` : // Animated neon pink
      '#FF1493'; // Static neon pink
  
  ctx.strokeStyle = cameraColor;
  ctx.lineWidth = pixelSize / 2;
  
  // Camera outline - pixelated style
  const camX = Math.floor((x + width / 2 - 7) / pixelSize) * pixelSize;
  const camY = Math.floor((y + 7) / pixelSize) * pixelSize;
  const camWidth = Math.ceil(14 / pixelSize) * pixelSize;
  const camHeight = Math.ceil(6 / pixelSize) * pixelSize;
  
  // Draw camera body pixel by pixel
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Dark background for contrast
  drawPixelRect(camX, camY, camWidth, camHeight, pixelSize);
  
  // Draw camera outline
  ctx.beginPath();
  for (let i = 0; i < camWidth; i += pixelSize) {
    ctx.fillStyle = cameraColor;
    // Top line
    ctx.fillRect(camX + i, camY, pixelSize, pixelSize);
    // Bottom line
    ctx.fillRect(camX + i, camY + camHeight - pixelSize, pixelSize, pixelSize);
  }
  
  for (let j = pixelSize; j < camHeight - pixelSize; j += pixelSize) {
    ctx.fillStyle = cameraColor;
    // Left line
    ctx.fillRect(camX, camY + j, pixelSize, pixelSize);
    // Right line
    ctx.fillRect(camX + camWidth - pixelSize, camY + j, pixelSize, pixelSize);
  }
  
  // Camera lens with pixelated neon glow
  const lensX = Math.floor((x + width / 2) / pixelSize) * pixelSize;
  const lensY = Math.floor((y + 10) / pixelSize) * pixelSize;
  const lensSize = Math.ceil(4 / pixelSize) * pixelSize;
  
  // Lens glow (subtle neon effect)
  if (isActive) {
    ctx.fillStyle = `rgba(255, 20, 147, ${0.3 + Math.sin(time * 4) * 0.2})`;
    ctx.fillRect(lensX - lensSize/2, lensY - lensSize/2, lensSize * 2, lensSize * 2);
  }
  
  // Lens pixel circle
  ctx.fillStyle = isActive ? '#FF00FF' : cameraColor;
  for (let i = -lensSize/2; i <= lensSize/2; i += pixelSize) {
    for (let j = -lensSize/2; j <= lensSize/2; j += pixelSize) {
      if (i*i + j*j <= (lensSize/2)*(lensSize/2)) {
        ctx.fillRect(lensX + i, lensY + j, pixelSize, pixelSize);
      }
    }
  }
}
// Draw pixelated neon windows in the phone booth
function drawNeonWindows(x, y, width, height, pixelSize, isActive, isCompleted, time) {
  const windowSpacingX = pixelSize * 4; // Slightly more spaced
  const windowSpacingY = pixelSize * 5; // Slightly more spaced
  
  // Window color with neon effect
  const windowColor = isCompleted ? 
    'rgba(176, 196, 222, 0.7)' : // Light blue-gray for completed
    isActive ? 
      `rgba(50, ${Math.floor(Math.sin(time * 3) * 55 + 200)}, 50, ${0.7 + Math.sin(time * 2) * 0.3})` : // Animated neon green
      'rgba(50, 205, 50, 0.7)'; // Static neon green
  
  ctx.fillStyle = windowColor;
  
  for (let row = 0; row < Math.floor((height - 30) / windowSpacingY); row++) {
    for (let col = 0; col < Math.floor((width - 20) / windowSpacingX); col++) {
      // Skip some windows randomly for aesthetic variation (based on position, not random)
      if ((row * 3 + col) % 4 !== 0) {
        // Window position
        const winX = Math.floor((x + col * windowSpacingX + 15) / pixelSize) * pixelSize;
        const winY = Math.floor((y + row * windowSpacingY + 25) / pixelSize) * pixelSize;
        
        // Window size - slightly varied for cyberpunk asymmetry
        const winWidth = ((col % 3) + 1) * pixelSize;
        const winHeight = pixelSize;
        
        // Draw window
        ctx.fillRect(winX, winY, winWidth, winHeight);
        
        // Add subtle glow for active neon windows
        if (isActive && !isCompleted && (row + col) % 2 === 0) {
          ctx.fillStyle = `rgba(50, 255, 50, ${0.2 + Math.sin(time * 3 + row * 0.5 + col * 0.7) * 0.1})`;
          ctx.fillRect(winX - pixelSize, winY - pixelSize, winWidth + pixelSize * 2, winHeight + pixelSize * 2);
          ctx.fillStyle = windowColor; // Reset color
        }
      }
    }
  }
}
// Draw enhanced neon glow with cyberpunk effect
function drawEnhancedNeonGlow(x, y, width, height, time) {
  // Create multiple glow layers with different colors for cyberpunk effect
  const glowRadius = 90 + Math.sin(time * 2) * 10; // Pulsating glow
  
  // Layer 1: Purple glow
  const purpleGlow = ctx.createRadialGradient(
    x + width / 2, y + height / 2, 10,
    x + width / 2, y + height / 2, glowRadius
  );
  purpleGlow.addColorStop(0, 'rgba(255, 0, 255, 0.3)'); // Neon magenta core
  purpleGlow.addColorStop(0.5, 'rgba(138, 43, 226, 0.15)'); // Purple mid
  purpleGlow.addColorStop(1, 'rgba(138, 43, 226, 0)'); // Transparent edge
  
  ctx.fillStyle = purpleGlow;
  ctx.fillRect(x - 40, y - 40, width + 80, height + 80);
  
  // Layer 2: Cyan accent glow (smaller)
  const cyanGlow = ctx.createRadialGradient(
    x + width / 2, y + height / 2, 5,
    x + width / 2, y + height / 2, glowRadius * 0.7
  );
  cyanGlow.addColorStop(0, 'rgba(0, 255, 255, 0.25)'); // Neon cyan core
  cyanGlow.addColorStop(0.6, 'rgba(0, 255, 255, 0.05)'); // Cyan mid
  cyanGlow.addColorStop(1, 'rgba(0, 255, 255, 0)'); // Transparent edge
  
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(x - 30, y - 30, width + 60, height + 60);
}
// Add subtle cyberpunk glow behind the phone booth
function drawCyberpunkGlow(x, y, width, height, isActive, isCompleted) {
  if (isCompleted) {
    // Subtle purple glow for completed booths
    const completedGlow = ctx.createRadialGradient(
      x + width / 2, y + height / 2, 10,
      x + width / 2, y + height / 2, 60
    );
    completedGlow.addColorStop(0, 'rgba(138, 43, 226, 0.15)');
    completedGlow.addColorStop(1, 'rgba(138, 43, 226, 0)');
    
    ctx.fillStyle = completedGlow;
    ctx.fillRect(x - 20, y - 20, width + 40, height + 40);
  } 
  else if (!isActive) {
    // Subtle pink glow for inactive booths
    const inactiveGlow = ctx.createRadialGradient(
      x + width / 2, y + height / 2, 10,
      x + width / 2, y + height / 2, 50
    );
    inactiveGlow.addColorStop(0, 'rgba(255, 51, 102, 0.1)');
    inactiveGlow.addColorStop(1, 'rgba(255, 51, 102, 0)');
    
    ctx.fillStyle = inactiveGlow;
    ctx.fillRect(x - 15, y - 15, width + 30, height + 30);
  }
}
// Add subtle 8-bit noise pattern similar to world-background.js
function addPixelNoise(x, y, width, height) {
  // Create noise with very low opacity for cyberpunk texture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  
  // Draw noise in 8x8 pixel blocks (match world-background)
  for (let i = x; i < x + width; i += 8) {
    for (let j = y; j < y + height; j += 8) {
      // Use a deterministic pattern based on position instead of random
      if ((i + j) % 16 === 0) {
        ctx.fillRect(i, j, 8, 8);
      }
    }
  }
}
// Draw scanlines for retro CRT effect, matching world-background
function drawScanlines(x, y, width, height) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  
  // Draw horizontal scanlines every 4 pixels
  for (let j = y; j < y + height; j += 4) {
    if (j % 8 === 0) { // Only every other line for subtle effect
      ctx.fillRect(x, j, width, 1);
    }
  }
}
// Draw 8-bit pixelated text
function drawPixelText(text, x, y, color, dotSize) {
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  
  // Get text metrics
  ctx.font = '6px Arial';
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  
  // Draw text pixels
  const startX = x - textWidth / 2;
  
  for (let i = 0; i < textWidth; i += dotSize) {
    // Sample text at this position using a 1-pixel font
    ctx.font = '1px Arial';
    const charAtPos = Math.floor(i / (textWidth / text.length));
    const char = text[Math.min(charAtPos, text.length - 1)];
    
    // Draw pixel if it should be visible
    if (char !== ' ') {
      ctx.fillRect(startX + i, y - 2, dotSize, dotSize);
    }
  }
}