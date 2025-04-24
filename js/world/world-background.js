// Background elements: 8-bit cyberpunk night city skyline with enhanced purple ambience

// City buildings data for the skyline - expanded with more variety
const cityBuildings = [
  { x: 0, width: 120, height: 280, windows: true, neonSign: false, pixelSize: 4 },
  { x: 130, width: 90, height: 180, windows: true, neonSign: true, neonColor: '#00FFFF', pixelSize: 4, neonFlicker: true },
  { x: 230, width: 200, height: 350, windows: true, neonSign: false, pixelSize: 4, antenna: true },
  { x: 440, width: 150, height: 240, windows: true, neonSign: true, neonColor: '#FF00FF', pixelSize: 4, neonFlicker: true },
  { x: 600, width: 110, height: 300, windows: true, neonSign: false, pixelSize: 4, antenna: true },
  { x: 720, width: 180, height: 400, windows: true, neonSign: true, neonColor: '#FF3366', pixelSize: 4, neonFlicker: false },
  { x: 910, width: 100, height: 260, windows: true, neonSign: false, pixelSize: 4 },
  { x: 1020, width: 140, height: 320, windows: true, neonSign: true, neonColor: '#66FF33', pixelSize: 4, neonFlicker: true },
  { x: 1170, width: 220, height: 380, windows: true, neonSign: false, pixelSize: 4, antenna: true },
  { x: 1400, width: 130, height: 220, windows: true, neonSign: true, neonColor: '#FFCC00', pixelSize: 4, neonFlicker: false },
  // Additional buildings
  { x: 1550, width: 170, height: 330, windows: true, neonSign: true, neonColor: '#9966FF', pixelSize: 4, neonFlicker: true },
  { x: 1730, width: 110, height: 290, windows: true, neonSign: false, pixelSize: 4 },
  { x: 1850, width: 200, height: 360, windows: true, neonSign: true, neonColor: '#FF66CC', pixelSize: 4, neonFlicker: false },
  { x: 2060, width: 130, height: 240, windows: true, neonSign: false, pixelSize: 4, antenna: true },
  { x: 2200, width: 170, height: 310, windows: true, neonSign: true, neonColor: '#66FFCC', pixelSize: 4, neonFlicker: true }
];

// Define pixel stars for 8-bit effect
const pixelStars = [];
const numStars = 300; // More stars for denser sky

// Initialize background elements
function initializeBackground() {
  console.log("Initializing enhanced 8-bit background");
  
  // Generate pixel stars with random positions
  for (let i = 0; i < numStars; i++) {
    // Create different star sizes and types for variety
    const starType = Math.random() < 0.1 ? 'large' : (Math.random() < 0.3 ? 'medium' : 'small');
    const pulsating = Math.random() < 0.4; // 40% of stars pulsate
    const color = Math.random() < 0.1 ? 
      '#' + ['FF', 'CC', '99', 'FF'][Math.floor(Math.random() * 4)] + 
            ['99', 'CC', 'FF', '66'][Math.floor(Math.random() * 4)] + 
            ['FF', 'CC', '99', 'FF'][Math.floor(Math.random() * 4)] : 
      '#FFFFFF'; // 10% of stars are colored, rest white
    
    pixelStars.push({
      x: Math.random() * (canvas.width * 3), // Wider distribution for parallax
      y: Math.random() * (canvas.height * 0.8), // Only in upper 80% of screen
      type: starType,
      pulsating: pulsating,
      color: color,
      phase: Math.random() * Math.PI * 2 // Random starting phase for pulsating
    });
  }
}

// Draw the world background (city skyline and night sky)
function drawBackground() {
  // Enhanced night sky gradient with deeper purple cyberpunk ambience
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGradient.addColorStop(0, '#0D0221'); // Deep dark purple at the top
  skyGradient.addColorStop(0.3, '#1A0B36'); // Rich dark purple
  skyGradient.addColorStop(0.6, '#331155'); // Medium purple
  skyGradient.addColorStop(0.8, '#5C2751'); // Brighter purple/pink at horizon
  skyGradient.addColorStop(1, '#802A6E'); // Vivid purple at bottom
  
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle 8-bit noise pattern to sky
  addPixelNoise();
  
  // Add distant nebula/aurora effect
  drawPixelNebula();
  
  // Draw pixel stars
  drawPixelStars();
  
  // Draw pixelated moon
  drawPixelMoon();
  
  // Draw distant mountains
  drawPixelMountains();
  
  // Draw clouds
  drawPixelClouds();
  
  // Draw distant city skyline
  drawPixelCitySkyline();
  
  // Add scanlines for retro effect
  drawScanlines();
}

// Add pixel noise texture for 8-bit aesthetic
function addPixelNoise() {
  // Create noise with very low opacity
  ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
  
  // Draw noise in 8x8 pixel blocks
  for (let x = 0; x < canvas.width; x += 8) {
    for (let y = 0; y < canvas.height; y += 8) {
      if (Math.random() < 0.1) { // Only 10% of blocks get noise
        ctx.fillRect(x, y, 8, 8);
      }
    }
  }
}

// Draw a pixelated nebula/aurora in the background
function drawPixelNebula() {
  // Draw a few distant nebula formations with low opacity
  const nebulaColors = [
    'rgba(138, 43, 226, 0.05)', // Purple
    'rgba(75, 0, 130, 0.04)',   // Indigo
    'rgba(148, 0, 211, 0.06)',  // Violet
    'rgba(186, 85, 211, 0.05)', // Medium Orchid
    'rgba(218, 112, 214, 0.04)' // Orchid
  ];
  
  const time = Date.now() / 20000; // Very slow movement
  
  // Draw several nebula "clouds"
  for (let i = 0; i < 3; i++) {
    const nebulaX = (i * 300 + Math.sin(time + i) * 50 - camera.x * 0.02) % (canvas.width * 2);
    const nebulaY = 100 + i * 60;
    const nebulaWidth = 300 + i * 50;
    const nebulaHeight = 150 + i * 30;
    
    // Draw nebula as a collection of large pixel blocks
    const pixelSize = 12; // Large pixels for nebula
    ctx.fillStyle = nebulaColors[i % nebulaColors.length];
    
    for (let x = 0; x < nebulaWidth; x += pixelSize) {
      for (let y = 0; y < nebulaHeight; y += pixelSize) {
        // Create a perlin-noise-like pattern using sine waves
        const noise = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time * 0.7);
        if (noise > 0.7) {
          ctx.fillRect(
            Math.floor((nebulaX + x) / pixelSize) * pixelSize, 
            Math.floor((nebulaY + y) / pixelSize) * pixelSize, 
            pixelSize, pixelSize
          );
        }
      }
    }
  }
}

// Draw pixel stars with 8-bit aesthetic
function drawPixelStars() {
  const time = Date.now() / 1000;
  
  // Draw each pixel star
  pixelStars.forEach((star, index) => {
    // Apply parallax effect based on y position (stars higher in sky move slower)
    const parallaxFactor = 0.02 + (star.y / canvas.height) * 0.05;
    const starX = (star.x - camera.x * parallaxFactor) % (canvas.width * 3);
    
    // Skip if off-screen
    if (starX < -10 || starX > canvas.width + 10) return;
    
    // Determine size and pulsation
    let size;
    switch(star.type) {
      case 'large': size = star.pulsating ? 3 + Math.sin(time * 2 + star.phase) * 1 : 3; break;
      case 'medium': size = star.pulsating ? 2 + Math.sin(time * 3 + star.phase) * 0.5 : 2; break;
      default: size = 1; // Small stars don't pulsate visibly
    }
    
    // Round size to integer for pixel-perfect rendering
    size = Math.max(1, Math.floor(size));
    
    // Draw the pixel star - perfectly square for 8-bit look
    ctx.fillStyle = star.color;
    ctx.fillRect(
      Math.floor(starX), 
      Math.floor(star.y), 
      size, size
    );
    
    // For large stars, occasionally add cross shape
    if (star.type === 'large' && size >= 3) {
      // Add cross extensions for large stars (+ shape)
      if (size > 2) {
        ctx.fillRect(Math.floor(starX) - 1, Math.floor(star.y), 1, 1); // Left
        ctx.fillRect(Math.floor(starX) + size, Math.floor(star.y), 1, 1); // Right
        ctx.fillRect(Math.floor(starX), Math.floor(star.y) - 1, 1, 1); // Top
        ctx.fillRect(Math.floor(starX), Math.floor(star.y) + size, 1, 1); // Bottom
      }
    }
  });
}

// Draw a pixelated moon for 8-bit aesthetic
function drawPixelMoon() {
  const moonX = canvas.width * 0.8;
  const moonY = canvas.height * 0.15;
  const moonRadius = 15; // Size in "logical" pixels
  const pixelSize = 2; // Size of each "physical" pixel
  
  // Draw moon background (glow)
  const time = Date.now() / 5000;
  const glowSize = 20 + Math.sin(time) * 5; // Subtle breathing effect
  
  // Create discrete glow steps for 8-bit feel
  for (let i = 5; i > 0; i--) {
    const intensity = i / 5;
    ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.2})`;
    
    // Draw glow as concentric squares (pixelated circles)
    const size = moonRadius * 2 + glowSize * (1 - intensity);
    ctx.fillRect(
      Math.floor(moonX - size/2), 
      Math.floor(moonY - size/2), 
      Math.floor(size), 
      Math.floor(size)
    );
  }
  
  // Draw moon as a pixelated circle
  ctx.fillStyle = '#FFFFFF';
  
  // Calculate pixels to fill to create a circle
  for (let x = -moonRadius; x <= moonRadius; x += pixelSize) {
    for (let y = -moonRadius; y <= moonRadius; y += pixelSize) {
      // Check if point is in circle
      if (x*x + y*y <= moonRadius*moonRadius) {
        ctx.fillRect(
          Math.floor(moonX + x), 
          Math.floor(moonY + y), 
          pixelSize, pixelSize
        );
      }
    }
  }
  
  // Add some moon craters for detail
  const craters = [
    { x: moonX - 5, y: moonY - 3, size: 3 },
    { x: moonX + 7, y: moonY + 5, size: 4 },
    { x: moonX - 2, y: moonY + 8, size: 2 }
  ];
  
  craters.forEach(crater => {
    ctx.fillStyle = 'rgba(200, 200, 220, 0.8)';
    ctx.fillRect(
      Math.floor(crater.x - crater.size/2), 
      Math.floor(crater.y - crater.size/2), 
      crater.size, crater.size
    );
  });
}

// Draw pixelated distant mountains for depth
function drawPixelMountains() {
  // Define mountain ranges - closer to horizon
  const mountainRanges = [
    { color: '#2A1B47', height: 80, pixelSize: 4, distance: 0.03 },
    { color: '#1E1133', height: 120, pixelSize: 6, distance: 0.04 },
    { color: '#150C26', height: 150, pixelSize: 8, distance: 0.05 }
  ];
  
  mountainRanges.forEach(range => {
    const horizonY = canvas.height;
    const baseY = horizonY - range.height;
    const pixelSize = range.pixelSize;
    
    ctx.fillStyle = range.color;
    
    // Create jagged mountain silhouette with varied heights
    for (let x = 0; x < canvas.width + 100; x += pixelSize) {
      // Apply parallax based on distance factor
      const parallaxedX = (x + (camera.x * range.distance) % (canvas.width * 2));
      
      // Generate mountain height using sine waves for natural-looking peaks
      const mountainHeight = Math.sin(parallaxedX * 0.01) * 20 + 
                            Math.sin(parallaxedX * 0.02 + 1) * 15 + 
                            Math.sin(parallaxedX * 0.005 + 2) * 25;
      
      // Ensure height stays within range
      const height = Math.max(20, Math.min(range.height, Math.abs(mountainHeight) + range.height * 0.6));
      
      // Draw mountain column as pixelated rectangle
      ctx.fillRect(
        Math.floor(parallaxedX / pixelSize) * pixelSize, 
        Math.floor((baseY + (range.height - height)) / pixelSize) * pixelSize, 
        pixelSize, 
        Math.floor((horizonY - (baseY + (range.height - height))) / pixelSize) * pixelSize + pixelSize
      );
    }
  });
}

// Draw pixelated clouds
function drawPixelClouds() {
  // Define cloud layers with different speeds and sizes
  const cloudLayers = [
    { y: 160, speed: 0.02, pixelSize: 4, color: 'rgba(188, 143, 250, 0.15)' },
    { y: 120, speed: 0.03, pixelSize: 6, color: 'rgba(148, 93, 210, 0.12)' },
    { y: 200, speed: 0.01, pixelSize: 8, color: 'rgba(218, 173, 250, 0.1)' }
  ];
  
  cloudLayers.forEach(layer => {
    const time = Date.now() / 10000; // Very slow cloud movement
    const pixelSize = layer.pixelSize;
    
    // Draw several cloud clusters in this layer
    for (let i = 0; i < 5; i++) {
      const cloudX = ((i * 400 + Math.sin(time + i) * 50) - camera.x * layer.speed) % (canvas.width * 2);
      const cloudY = layer.y + Math.sin(time * 0.5 + i) * 10; // Slight bobbing
      const cloudWidth = 200 + i * 20;
      const cloudHeight = 40 + i * 5;
      
      ctx.fillStyle = layer.color;
      
      // Draw cloud as a collection of pixel blocks
      for (let x = 0; x < cloudWidth; x += pixelSize) {
        // Calculate height using sine waves for cloud shape
        const height = Math.sin((x + cloudX) * 0.05) * 20 + 
                      Math.sin((x + cloudX) * 0.02) * 10 + 
                      Math.sin((x + cloudX) * 0.01 + time) * 5;
        
        // Only draw if height is positive (creates cloud shape)
        if (height > 0) {
          // Ensure pixelated by rounding to pixel size grid
          ctx.fillRect(
            Math.floor((cloudX + x) / pixelSize) * pixelSize, 
            Math.floor((cloudY - height) / pixelSize) * pixelSize, 
            pixelSize, 
            Math.floor((height * 2) / pixelSize) * pixelSize + pixelSize
          );
        }
      }
    }
  });
}

// Draw the city skyline with 8-bit aesthetics
function drawPixelCitySkyline() {
  const horizonY = canvas.height; // Floor level - no gap to skyline
  
  // Draw all buildings
  cityBuildings.forEach(building => {
    const pixelSize = building.pixelSize;
    
    // Building silhouette - perfectly pixel-aligned for 8-bit look
    ctx.fillStyle = '#080808'; // Very dark for buildings
    
    const buildingX = (building.x - camera.x * 0.1) % (canvas.width * 3); // Slow parallax
    const buildingY = horizonY - building.height;
    const buildingWidth = building.width;
    const buildingHeight = building.height;
    
    // Quantize positions to pixel grid
    const pixeledX = Math.floor(buildingX / pixelSize) * pixelSize;
    const pixeledY = Math.floor(buildingY / pixelSize) * pixelSize;
    const pixeledWidth = Math.floor(buildingWidth / pixelSize) * pixelSize;
    const pixeledHeight = Math.floor(buildingHeight / pixelSize) * pixelSize;
    
    ctx.fillRect(pixeledX, pixeledY, pixeledWidth, pixeledHeight);
    
    // Add antenna to some buildings
    if (building.antenna) {
      const antennaHeight = 20 + Math.random() * 10;
      const antennaWidth = pixelSize * 2;
      const antennaX = pixeledX + pixeledWidth / 2 - antennaWidth / 2;
      
      // Main antenna pole
      ctx.fillStyle = '#111111';
      ctx.fillRect(
        Math.floor(antennaX / pixelSize) * pixelSize, 
        Math.floor((pixeledY - antennaHeight) / pixelSize) * pixelSize, 
        antennaWidth, 
        antennaHeight
      );
      
      // Antenna light - blinking
      const time = Date.now() / 500;
      const blinking = Math.sin(time) > 0 ? 1 : 0;
      ctx.fillStyle = blinking ? '#FF0000' : '#660000';
      ctx.fillRect(
        Math.floor(antennaX / pixelSize) * pixelSize, 
        Math.floor((pixeledY - antennaHeight - pixelSize * 2) / pixelSize) * pixelSize, 
        antennaWidth, 
        pixelSize * 2
      );
    }
    
    // Windows (if this building has them)
    if (building.windows) {
      // Pixelated windows
      const windowSize = pixelSize;
      const windowSpacingX = pixelSize * 3;
      const windowSpacingY = pixelSize * 4;
      
      // Calculate how many windows fit
      const windowsPerRow = Math.floor(buildingWidth / windowSpacingX);
      const windowRows = Math.floor(buildingHeight / windowSpacingY);
      
      // Draw window grid - perfect pixel alignment
      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowsPerRow; col++) {
          // Determine if window is lit (fixed pattern, not random)
          if ((row + col) % 3 !== 0) { // Simple pattern - 2/3 of windows lit
            const windowX = pixeledX + col * windowSpacingX;
            const windowY = pixeledY + row * windowSpacingY;
            
            // Window color - either cyan, purple or soft yellow - more purple tints
            let windowColor;
            const colorType = (row + col) % 7;
            switch(colorType) {
              case 0: windowColor = 'rgba(0, 255, 255, 0.8)'; break; // Cyan
              case 1: windowColor = 'rgba(255, 255, 180, 0.8)'; break; // Yellow
              case 2: windowColor = 'rgba(255, 100, 255, 0.8)'; break; // Pink
              case 3: windowColor = 'rgba(180, 100, 255, 0.8)'; break; // Purple
              case 4: windowColor = 'rgba(150, 255, 255, 0.8)'; break; // Light cyan
              case 5: windowColor = 'rgba(200, 150, 255, 0.8)'; break; // Lavender
              default: windowColor = 'rgba(255, 200, 255, 0.8)'; break; // Light pink
            }
            
            // Flickering effect for some windows
            const time = Date.now() / 100;
            const flickerSpeed = (row * 13 + col * 17) % 10 + 5;
            const flickerPhase = (row * 7 + col * 11) % (2 * Math.PI);
            const flicker = Math.sin(time / flickerSpeed + flickerPhase) > 0.7 ? 0.3 : 1;
            
            // Make window color
            ctx.fillStyle = windowColor.replace('0.8', 0.8 * flicker);
            
            // Draw perfectly square window
            ctx.fillRect(
              Math.floor(windowX / pixelSize) * pixelSize, 
              Math.floor(windowY / pixelSize) * pixelSize, 
              windowSize, 
              windowSize
            );
          }
        }
      }
    }
    
    // Neon sign (if this building has one) - with pixelated aesthetic
    if (building.neonSign) {
      const time = Date.now() / 1000;
      const flicker = building.neonFlicker ? 
        (Math.sin(time * 5 + building.x) > 0.9 ? 0.6 : 1) : 1; // Occasional flicker
      
      const signWidth = Math.floor((building.width * 0.6) / pixelSize) * pixelSize;
      const signHeight = pixelSize * 3;
      const signX = pixeledX + Math.floor(((building.width - signWidth) / 2) / pixelSize) * pixelSize;
      const signY = pixeledY + Math.floor((building.height * 0.2) / pixelSize) * pixelSize;
      
      // Draw the sign with pixel-perfect positioning
      ctx.fillStyle = building.neonColor;
      ctx.fillRect(signX, signY, signWidth, signHeight);
      
      // Extra detail: Draw scanlines on neon sign
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      for (let y = 0; y < signHeight; y += pixelSize) {
        if (y % (pixelSize * 2) === 0) {
          ctx.fillRect(signX, signY + y, signWidth, pixelSize);
        }
      }
      
      // Neon glow - pixelated
      if (flicker > 0.7) { // Only show glow when sign is bright enough
        const rgbColor = hexToRgb(building.neonColor);
        
        // Create pixelated glow
        for (let intensity = 3; intensity > 0; intensity--) {
          // Calculate glow size for this level
          const glowSize = pixelSize * intensity;
          
          // Draw glow as a rectangle
          ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${0.1 * flicker * (4-intensity)/3})`;
          ctx.fillRect(
            signX - glowSize, 
            signY - glowSize, 
            signWidth + glowSize * 2, 
            signHeight + glowSize * 2
          );
        }
      }
    }
  });
}

// Draw retro scanlines
function drawScanlines() {
  // Create very subtle scanlines
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  
  // Draw every 4 pixels
  for (let y = 0; y < canvas.height; y += 4) {
    if (y % 8 === 0) {
      ctx.fillRect(0, y, canvas.width, 1);
    }
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