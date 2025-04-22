// Background elements: night city skyline with cyberpunk aesthetic

// City buildings data for the skyline
const cityBuildings = [
  { x: 0, width: 120, height: 280, windows: true, neonSign: false },
  { x: 130, width: 90, height: 180, windows: true, neonSign: true, neonColor: '#00FFFF' },
  { x: 230, width: 200, height: 350, windows: true, neonSign: false },
  { x: 440, width: 150, height: 240, windows: true, neonSign: true, neonColor: '#FF00FF' },
  { x: 600, width: 110, height: 300, windows: true, neonSign: false },
  { x: 720, width: 180, height: 400, windows: true, neonSign: true, neonColor: '#FF3366' },
  { x: 910, width: 100, height: 260, windows: true, neonSign: false },
  { x: 1020, width: 140, height: 320, windows: true, neonSign: true, neonColor: '#66FF33' },
  { x: 1170, width: 220, height: 380, windows: true, neonSign: false },
  { x: 1400, width: 130, height: 220, windows: true, neonSign: true, neonColor: '#FFCC00' }
];

// Initialize the background
function initializeBackground() {
  // No initialization needed for the background elements
  console.log("Background initialized");
}

// Draw the world background (city skyline and night sky)
function drawBackground() {
  // Night sky gradient with purple cyberpunk ambience
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGradient.addColorStop(0, '#0D0221'); // Deep dark purple at the top
  skyGradient.addColorStop(0.4, '#171550'); // Dark purple in the middle
  skyGradient.addColorStop(0.8, '#5C2751'); // Brighter purple/pink at horizon
  
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Distant moon with glow
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(canvas.width * 0.8, canvas.height * 0.15, 30, 0, Math.PI * 2);
  ctx.fill();
  
  // Moon glow
  const moonGlow = ctx.createRadialGradient(
    canvas.width * 0.8, canvas.height * 0.15, 30,
    canvas.width * 0.8, canvas.height * 0.15, 100
  );
  moonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  moonGlow.addColorStop(0.5, 'rgba(230, 230, 250, 0.3)');
  moonGlow.addColorStop(1, 'rgba(230, 230, 250, 0)');
  
  ctx.fillStyle = moonGlow;
  ctx.beginPath();
  ctx.arc(canvas.width * 0.8, canvas.height * 0.15, 100, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw stars
  drawStars();
  
  // Draw clouds
  drawClouds();
  
  // Draw distant city skyline
  drawCitySkyline();
}

// Draw the city skyline (fixed position, doesn't move with camera)
function drawCitySkyline() {
  const horizonY = canvas.height; // Floor level - no gap to skyline
  
  // Draw all buildings
  cityBuildings.forEach(building => {
    // Building silhouette
    ctx.fillStyle = '#080808'; // Very dark for buildings
    
    const buildingX = (building.x - camera.x * 0.1) % (canvas.width * 2); // Slow parallax
    const buildingY = horizonY - building.height;
    const buildingWidth = building.width;
    const buildingHeight = building.height;
    
    ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeight);
    
    // Windows (if this building has them)
    if (building.windows) {
      // Smaller, more numerous windows for distant city feel
      const windowWidth = 3;
      const windowHeight = 5;
      const windowSpacingX = 8;
      const windowSpacingY = 10;
      
      // Calculate how many windows fit
      const windowsPerRow = Math.floor(buildingWidth / windowSpacingX);
      const windowRows = Math.floor(buildingHeight / windowSpacingY);
      
      // Draw window grid - no flashing
      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowsPerRow; col++) {
          // Determine if window is lit (fixed pattern, not random)
          if ((row + col) % 3 !== 0) { // Simple pattern - 2/3 of windows lit
            const windowX = buildingX + col * windowSpacingX + (windowSpacingX - windowWidth) / 2;
            const windowY = buildingY + row * windowSpacingY + (windowSpacingY - windowHeight) / 2;
            
            // Window color - either cyan or soft yellow
            const windowColor = ((row + col) % 5 === 0) ? 
              'rgba(0, 255, 255, 0.8)' : 'rgba(255, 255, 180, 0.8)';
            
            ctx.fillStyle = windowColor;
            ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
          }
        }
      }
    }
    
    // Neon sign (if this building has one)
    if (building.neonSign) {
      ctx.fillStyle = building.neonColor;
      
      const signWidth = building.width * 0.6;
      const signHeight = 12;
      const signX = buildingX + (building.width - signWidth) / 2;
      const signY = buildingY + building.height * 0.2;
      
      ctx.fillRect(signX, signY, signWidth, signHeight);
      
      // Neon glow
      const glowWidth = signWidth + 10;
      const glowHeight = signHeight + 10;
      const glowX = signX - 5;
      const glowY = signY - 5;
      
      const neonGlow = ctx.createRadialGradient(
        signX + signWidth / 2, signY + signHeight / 2, 0,
        signX + signWidth / 2, signY + signHeight / 2, signWidth / 2
      );
      
      const rgbColor = hexToRgb(building.neonColor);
      neonGlow.addColorStop(0, `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.7)`);
      neonGlow.addColorStop(1, `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`);
      
      ctx.fillStyle = neonGlow;
      ctx.fillRect(glowX, glowY, glowWidth, glowHeight);
    }
  });
}

// Draw clouds in the night sky
function drawClouds() {
  // Purple-tinted clouds like in the screenshot
  const clouds = [
    { x: 100, y: 160, width: 200, height: 40 },
    { x: 300, y: 120, width: 300, height: 60 },
    { x: 700, y: 180, width: 250, height: 50 },
    { x: -50, y: 250, width: 1000, height: 70 }
  ];
  
  clouds.forEach(cloud => {
    // Apply parallax effect
    const cloudX = (cloud.x - camera.x * 0.05) % (canvas.width * 2);
    
    // Create gradient for cloud
    const gradient = ctx.createLinearGradient(cloudX, cloud.y, cloudX, cloud.y + cloud.height);
    gradient.addColorStop(0, 'rgba(188, 143, 250, 0.2)'); // Light purple
    gradient.addColorStop(1, 'rgba(128, 0, 128, 0.1)'); // Dark purple
    
    ctx.fillStyle = gradient;
    
    // Draw cloud as a series of connected circles
    for (let i = 0; i < cloud.width; i += 30) {
      const circleY = cloud.y + Math.sin(i * 0.1) * 10;
      const radius = 20 + Math.sin(i * 0.2) * 10;
      
      ctx.beginPath();
      ctx.arc(cloudX + i, circleY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

// Draw stars in the night sky
function drawStars() {
  ctx.fillStyle = '#FFFFFF';
  
  // Fixed stars pattern
  const starPositions = [
    {x: 50, y: 30, size: 1}, {x: 120, y: 60, size: 1.5}, {x: 200, y: 40, size: 1},
    {x: 280, y: 80, size: 2}, {x: 350, y: 30, size: 1}, {x: 420, y: 70, size: 1.5},
    {x: 500, y: 50, size: 1}, {x: 580, y: 30, size: 2}, {x: 660, y: 70, size: 1},
    {x: 720, y: 40, size: 1.5}, {x: 780, y: 80, size: 1}, {x: 30, y: 100, size: 1.5},
    {x: 150, y: 120, size: 1}, {x: 300, y: 140, size: 2}, {x: 450, y: 110, size: 1},
    {x: 600, y: 130, size: 1.5}, {x: 750, y: 120, size: 1}
  ];
  
  // Draw each star with subtle twinkling
  const time = Date.now() / 1000;
  
  starPositions.forEach((star, index) => {
    // Twinkle effect - different phase for each star
    const twinkle = 0.5 + Math.sin(time * 1.5 + index * 1.3) * 0.5;
    const size = star.size * twinkle;
    
    ctx.beginPath();
    ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
    ctx.fill();
  });
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