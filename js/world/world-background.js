// Background elements: city skyline, clouds, ambient elements

// City buildings data for the skyline
const cityBuildings = [
    { x: 0, width: 80, height: 140, windows: true, antenna: false },
    { x: 90, width: 60, height: 100, windows: true, antenna: false },
    { x: 160, width: 100, height: 180, windows: true, antenna: true },
    { x: 270, width: 90, height: 120, windows: true, antenna: false },
    { x: 370, width: 70, height: 150, windows: true, antenna: false },
    { x: 450, width: 120, height: 200, windows: true, antenna: true },
    { x: 580, width: 60, height: 130, windows: true, antenna: false },
    { x: 650, width: 80, height: 160, windows: true, antenna: false },
    { x: 740, width: 110, height: 190, windows: true, antenna: false },
    { x: 860, width: 70, height: 110, windows: true, antenna: true }
  ];
  
  // Draw the city skyline (fixed position, doesn't move with camera)
  function drawCitySkyline() {
    const horizonY = canvas.height * 0.6; // Horizon line
    
    // Draw all buildings
    cityBuildings.forEach(building => {
      // Building silhouette
      ctx.fillStyle = '#263238'; // Dark blue-gray for buildings
      
      const buildingX = building.x;
      const buildingY = horizonY - building.height;
      const buildingWidth = building.width;
      const buildingHeight = building.height;
      
      ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeight);
      
      // Windows (if this building has them)
      if (building.windows) {
        ctx.fillStyle = 'rgba(255, 255, 200, 0.5)'; // Warm yellow glow
        
        const windowWidth = 5;
        const windowHeight = 8;
        const windowSpacingX = 15;
        const windowSpacingY = 20;
        
        // Calculate how many windows fit
        const windowsPerRow = Math.floor(buildingWidth / windowSpacingX);
        const windowRows = Math.floor(buildingHeight / windowSpacingY);
        
        // Draw window grid
        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowsPerRow; col++) {
            // Only light some windows randomly
            if (Math.random() > 0.3) {
              const windowX = buildingX + col * windowSpacingX + (windowSpacingX - windowWidth) / 2;
              const windowY = buildingY + row * windowSpacingY + (windowSpacingY - windowHeight) / 2;
              
              ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
            }
          }
        }
      }
      
      // Antenna (if this building has one)
      if (building.antenna) {
        ctx.strokeStyle = '#546E7A';
        ctx.lineWidth = 2;
        
        const antennaX = buildingX + buildingWidth / 2;
        const antennaBaseY = buildingY;
        const antennaHeight = 30;
        
        ctx.beginPath();
        ctx.moveTo(antennaX, antennaBaseY);
        ctx.lineTo(antennaX, antennaBaseY - antennaHeight);
        ctx.stroke();
        
        // Antenna light
        ctx.fillStyle = '#F44336';
        ctx.beginPath();
        ctx.arc(antennaX, antennaBaseY - antennaHeight, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
  
  // Cloud data
  const clouds = [
    { x: 100, y: 100, size: 30, speed: 0.02 },
    { x: 300, y: 70, size: 40, speed: 0.01 },
    { x: 600, y: 120, size: 25, speed: 0.015 },
    { x: 900, y: 80, size: 35, speed: 0.008 }
  ];
  
  // Update and draw clouds (slight parallax)
  function updateClouds() {
    clouds.forEach(cloud => {
      // Slowly move clouds
      cloud.x -= cloud.speed;
      
      // Reset cloud position when it goes off-screen
      if (cloud.x + cloud.size * 3 < 0) {
        cloud.x = canvas.width + cloud.size;
        cloud.y = 50 + Math.random() * 100;
      }
      
      // Draw cloud at current position (minimal parallax effect)
      const screenX = cloud.x - camera.x * 0.1;
      
      // Cloud is made of overlapping circles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      
      for (let i = 0; i < 5; i++) {
        const offsetX = (i - 2) * (cloud.size * 0.6);
        const offsetY = Math.sin(i * 0.8) * (cloud.size * 0.2);
        const size = cloud.size * (0.7 + Math.sin(i) * 0.3);
        
        ctx.beginPath();
        ctx.arc(
          screenX + offsetX,
          cloud.y + offsetY,
          size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
  }
  
  // Star data
  const stars = [];
  
  // Initialize stars
  function initializeStars() {
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.5),
        size: 0.5 + Math.random() * 1.5,
        twinkleSpeed: 0.01 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  // Draw stars
  function drawStars() {
    const time = Date.now() / 1000;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    stars.forEach(star => {
      // Twinkle effect
      const twinkle = 0.5 + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5;
      
      ctx.beginPath();
      ctx.arc(
        star.x,
        star.y,
        star.size * twinkle,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }
  
  // Initialize background elements
  function initializeBackground() {
    initializeStars();
  }