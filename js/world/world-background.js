// Background elements: night city skyline with cyberpunk/Shanghai aesthetic

// City buildings data for the skyline
const cityBuildings = [
  { x: 0, width: 80, height: 140, windows: true, neonSign: false },
  { x: 90, width: 60, height: 100, windows: true, neonSign: true, neonColor: '#00FFFF' },
  { x: 160, width: 100, height: 180, windows: true, neonSign: false },
  { x: 270, width: 90, height: 120, windows: true, neonSign: true, neonColor: '#FF00FF' },
  { x: 370, width: 70, height: 150, windows: true, neonSign: false },
  { x: 450, width: 120, height: 200, windows: true, neonSign: true, neonColor: '#FF3366' },
  { x: 580, width: 60, height: 130, windows: true, neonSign: false },
  { x: 650, width: 80, height: 160, windows: true, neonSign: true, neonColor: '#66FF33' },
  { x: 740, width: 110, height: 190, windows: true, neonSign: false },
  { x: 860, width: 70, height: 110, windows: true, neonSign: true, neonColor: '#FFCC00' }
];

// Draw the world background (city skyline and night sky)
function drawBackground() {
  // Night sky gradient with purple cyberpunk ambience
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
  skyGradient.addColorStop(0, '#0D0221'); // Deep dark purple at the top
  skyGradient.addColorStop(0.5, '#241734'); // Dark purple in the middle
  skyGradient.addColorStop(1, '#5C2751'); // Brighter purple/pink at horizon
  
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);
  
  // Distant moon with glow
  ctx.fillStyle = '#E6E6FA';
  ctx.beginPath();
  ctx.arc(canvas.width * 0.8, canvas.height * 0.15, 30, 0, Math.PI * 2);
  ctx.fill();
  
  // Moon glow
  const moonGlow = ctx.createRadialGradient(
    canvas.width * 0.8, canvas.height * 0.15, 30,
    canvas.width * 0.8, canvas.height * 0.15, 100
  );
  moonGlow.addColorStop(0, 'rgba(230, 230, 250, 0.3)');
  moonGlow.addColorStop(1, 'rgba(230, 230, 250, 0)');
  
  ctx.fillStyle = moonGlow;
  ctx.beginPath();
  ctx.arc(canvas.width * 0.8, canvas.height * 0.15, 100, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw stars
  drawStars();
  
  // Draw distant city skyline
  drawCitySkyline();
}

// Draw the city skyline (fixed position, doesn't move with camera)
function drawCitySkyline() {
  const horizonY = canvas.height * 0.6; // Horizon line
  
  // Draw all buildings
  cityBuildings.forEach(building => {
    // Building silhouette
    ctx.fillStyle = '#121212'; // Dark grey for buildings
    
    const buildingX = building.x;
    const buildingY = horizonY - building.height;
    const buildingWidth = building.width;
    const buildingHeight = building.height;
    
    ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeight);
    
    // Windows (if this building has them)
    if (building.windows) {
      // Random lit windows with purple/cyan glow
      const windowWidth = 6;
      const windowHeight = 10;
      const windowSpacingX = 15;
      const windowSpacingY = 20;
      
      // Calculate how many windows fit
      const windowsPerRow = Math.floor(buildingWidth / windowSpacingX);
      const windowRows = Math.floor(buildingHeight / windowSpacingY);
      
      // Draw window grid
      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowsPerRow; col++) {
          // Only light some windows randomly
          if (Math.random() > 0.4) {
            const windowX = buildingX + col * windowSpacingX + (windowSpacingX - windowWidth) / 2;
            const windowY = buildingY + row * windowSpacingY + (windowSpacingY - windowHeight) / 2;
            
            // Random window color - either yellow, cyan or purple
            const windowColors = ['rgba(255, 255, 150, 0.8)', 'rgba(0, 255, 255, 0.8)', 'rgba(255, 0, 255, 0.8)'];
            ctx.fillStyle = windowColors[Math.floor(Math.random() * windowColors.length)];
            
            ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
            
            // Window glow
            const glowColor = ctx.fillStyle.replace('0.8', '0.3');
            ctx.fillStyle = glowColor;
            ctx.fillRect(windowX - 2, windowY - 2, windowWidth + 4, windowHeight + 4);
          }
        }
      }
    }
    
    // Neon sign (if this building has one)
    if (building.neonSign) {
      ctx.fillStyle = building.neonColor;
      
      const signWidth = building.width * 0.6;
      const signHeight = 15;
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