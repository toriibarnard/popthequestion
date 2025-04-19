// World and environment functionality

// Define the locations of special interactions (in order)
const locations = [
    {
      id: "instagram",
      x: 300,
      y: 200,
      width: 50,
      height: 50,
      name: "First Interaction",
      description: "Our first Instagram DM 'hey gorgeous'",
      color: "#E1306C" // Instagram color
    },
    {
      id: "restaurant",
      x: 900,
      y: 200,
      width: 60,
      height: 60,
      name: "First Date",
      description: "Restauranté Amano",
      color: "#D4AF37" // Gold color for fancy restaurant
    },
    {
      id: "song",
      x: 1500,
      y: 200,
      width: 50,
      height: 50,
      name: "Our Song",
      description: "Lover, You Should've Come Over by Joel Plaskett",
      color: "#1DB954" // Spotify green
    },
    {
      id: "ramen",
      x: 2100,
      y: 200,
      width: 55,
      height: 55,
      name: "Favorite Food",
      description: "Buta Ramen",
      color: "#FF4500" // Reddish color for food
    },
    {
      id: "proposal",
      x: 2700,
      y: 200,
      width: 70,
      height: 70,
      name: "Special Moment",
      description: "Will you go out with me?",
      color: "#FF69B4" // Pink color for the proposal
    }
  ];
  
  // Map dimensions (larger than viewport to allow scrolling)
  const mapWidth = 3000;
  const mapHeight = 600;
  
  // Camera position
  const camera = {
    x: 0,
    y: 0,
    width: 800,
    height: 600
  };
  
  // Map tiles and decoration objects
  const mapTiles = [];
  const decorations = [];
  
  // Weather particles for ambiance
  const particles = [];
  
  // Initialize map tiles and decorations
  function initializeMap() {
    // Create tile types
    const tileTypes = {
      grass: { color: '#8FCB9B' },
      grassDark: { color: '#7FBB8B' },
      path: { color: '#E8D8C3' },
      pathEdge: { color: '#D8C8B3' },
      water: { color: '#5DA9E9' },
      waterDeep: { color: '#4D99D9' },
      flowers1: { color: '#FF69B4' },
      flowers2: { color: '#FFFF00' },
      flowers3: { color: '#9370DB' },
      dirt: { color: '#8B4513' }
    };
    
    // Create base grass layer with pattern
    for (let x = 0; x < mapWidth; x += 20) {
      for (let y = 0; y < mapHeight; y += 20) {
        // Create patterns in the grass with darker patches
        const isDark = ((Math.floor(x / 60) + Math.floor(y / 60)) % 2 === 0) && (Math.random() > 0.7);
        
        mapTiles.push({
          x: x,
          y: y,
          width: 20,
          height: 20,
          type: isDark ? 'grassDark' : 'grass',
          color: isDark ? tileTypes.grassDark.color : tileTypes.grass.color,
          // Slight variation in grass color
          colorVariation: Math.random() * 15 - 7
        });
      }
    }
    
    // Create path from start to end with more detail
    const pathWidth = 80;
    for (let x = 100; x < mapWidth - 100; x += 20) {
      const pathY = 180;
      
      // Path with texture
      const pathVariation = Math.sin(x / 200) * 10;
      
      // Main path
      mapTiles.push({
        x: x,
        y: pathY + pathVariation,
        width: 20,
        height: pathWidth,
        type: 'path',
        color: tileTypes.path.color,
        // Slight variation in path color
        colorVariation: Math.random() * 10 - 5
      });
      
      // Path edges with stones
      if (Math.random() > 0.4) {
        mapTiles.push({
          x: x,
          y: pathY + pathVariation - 10,
          width: 20,
          height: 10,
          type: 'pathEdge',
          color: tileTypes.pathEdge.color
        });
      }
      
      if (Math.random() > 0.4) {
        mapTiles.push({
          x: x,
          y: pathY + pathVariation + pathWidth,
          width: 20,
          height: 10,
          type: 'pathEdge',
          color: tileTypes.pathEdge.color
        });
      }
      
      // Occasional dirt patches on path
      if (Math.random() > 0.9) {
        mapTiles.push({
          x: x + 5,
          y: pathY + pathVariation + pathWidth/2 - 10,
          width: 15,
          height: 15,
          type: 'dirt',
          color: tileTypes.dirt.color
        });
      }
    }
    
    // Add decorative elements
    
    // Add trees in clusters for a forest feel
    addTreeCluster(150, 50, 10);
    addTreeCluster(600, 350, 15);
    addTreeCluster(1200, 50, 12);
    addTreeCluster(1800, 400, 18);
    addTreeCluster(2400, 100, 20);
    
    // Add individual trees for variety
    for (let i = 0; i < 30; i++) {
      const treeX = Math.random() * mapWidth;
      const treeY = Math.random() * mapHeight;
      
      // Don't place trees on the path
      if (treeY > 160 && treeY < 280) continue;
      
      const treeSize = 20 + Math.random() * 20;
      const treeType = Math.random() > 0.7 ? 'pine' : 'oak';
      
      decorations.push({
        type: 'tree',
        treeType: treeType,
        x: treeX,
        y: treeY,
        size: treeSize
      });
    }
    
    // Add flower beds
    addFlowerBed(400, 350, 80, 40, 'flowers1');
    addFlowerBed(1100, 80, 60, 30, 'flowers2');
    addFlowerBed(1700, 320, 70, 35, 'flowers3');
    addFlowerBed(2300, 430, 90, 45, 'flowers1');
    
    // Add individual flowers everywhere
    for (let i = 0; i < 200; i++) {
      const flowerX = Math.random() * mapWidth;
      const flowerY = Math.random() * mapHeight;
      
      // Don't place flowers on the path
      if (flowerY > 170 && flowerY < 270) continue;
      
      const flowerTypes = ['flowers1', 'flowers2', 'flowers3'];
      const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      
      decorations.push({
        type: 'flower',
        flowerType: flowerType,
        x: flowerX,
        y: flowerY,
        color: tileTypes[flowerType].color
      });
    }
    
    // Add water features - ponds and streams
    addPond(500, 100, 80);
    addPond(1300, 400, 100);
    addPond(2000, 120, 70);
    addPond(2600, 350, 120);
    
    // Add a stream
    addStream(1000, 400, 400, 320);
    
    // Add benches near locations for resting spots
    locations.forEach(location => {
      // Different bench position based on location
      const offset = (location.id === 'proposal') ? -100 : 60;
      
      decorations.push({
        type: 'bench',
        x: location.x + offset,
        y: location.y + 30,
        width: 40,
        height: 20
      });
    });
    
    // Add special decorations for the proposal spot
    addProposalSpot();
    
    // Add bridges over water features
    addBridge(1100, 400, 60);
    
    // Add lampposts along the path
    for (let x = 300; x < mapWidth - 200; x += 400) {
      decorations.push({
        type: 'lamppost',
        x: x,
        y: 150,
        height: 50
      });
    }
    
    // Initialize particles
    initParticles();
  }
  
  // Add a cluster of trees
  function addTreeCluster(centerX, centerY, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80;
      const treeX = centerX + Math.cos(angle) * distance;
      const treeY = centerY + Math.sin(angle) * distance;
      
      const treeSize = 15 + Math.random() * 25;
      const treeType = Math.random() > 0.6 ? 'pine' : 'oak';
      
      decorations.push({
        type: 'tree',
        treeType: treeType,
        x: treeX,
        y: treeY,
        size: treeSize
      });
    }
  }
  
  // Add a flower bed
  function addFlowerBed(x, y, width, height, flowerType) {
    // Add flower bed outline
    decorations.push({
      type: 'flowerBed',
      x: x,
      y: y,
      width: width,
      height: height,
      flowerType: flowerType
    });
    
    // Add individual flowers inside the bed
    for (let i = 0; i < 20; i++) {
      const flowerX = x + Math.random() * width;
      const flowerY = y + Math.random() * height;
      
      decorations.push({
        type: 'flower',
        flowerType: flowerType,
        x: flowerX,
        y: flowerY,
        color: flowerType === 'flowers1' ? '#FF69B4' : 
               flowerType === 'flowers2' ? '#FFFF00' : '#9370DB'
      });
    }
  }
  
  // Add a pond water feature
  function addPond(x, y, size) {
    // Main pond
    decorations.push({
      type: 'pond',
      x: x,
      y: y,
      size: size,
      color: '#5DA9E9'
    });
    
    // Add water lilies
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (size/2);
      const lilyX = x + Math.cos(angle) * distance;
      const lilyY = y + Math.sin(angle) * distance;
      
      decorations.push({
        type: 'waterLily',
        x: lilyX,
        y: lilyY,
        size: 5 + Math.random() * 5
      });
    }
  }
  
  // Add a stream between two points
  function addStream(x1, y1, x2, y2) {
    const segments = 20;
    const dx = (x2 - x1) / segments;
    const dy = (y2 - y1) / segments;
    
    for (let i = 0; i < segments; i++) {
      const wiggle = Math.sin(i / 2) * 15;
      
      decorations.push({
        type: 'streamSegment',
        x: x1 + dx * i,
        y: y1 + dy * i + wiggle,
        width: 30 + Math.random() * 10,
        color: '#5DA9E9'
      });
    }
  }
  
  // Add a bridge over water
  function addBridge(x, y, width) {
    decorations.push({
      type: 'bridge',
      x: x,
      y: y,
      width: width,
      height: 10
    });
  }
  
  // Add special decorations for proposal spot
  function addProposalSpot() {
    const proposalLocation = locations.find(loc => loc.id === 'proposal');
    if (!proposalLocation) return;
    
    const centerX = proposalLocation.x;
    const centerY = proposalLocation.y;
    
    // Create a gazebo/pavilion for the proposal
    decorations.push({
      type: 'gazebo',
      x: centerX - 50,
      y: centerY - 50,
      width: 120,
      height: 120
    });
    
    // Add flower arch
    decorations.push({
      type: 'flowerArch',
      x: centerX - 30,
      y: centerY - 30,
      width: 60,
      height: 60
    });
    
    // Add fairy lights around the area
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const lightX = centerX + Math.cos(angle) * 70;
      const lightY = centerY + Math.sin(angle) * 70;
      
      decorations.push({
        type: 'fairyLight',
        x: lightX,
        y: lightY,
        color: i % 2 === 0 ? '#FFD700' : '#FF69B4'
      });
    }
    
    // Add romantic lanterns
    decorations.push({
      type: 'lantern',
      x: centerX - 70,
      y: centerY - 10,
      color: '#FF6347'
    });
    
    decorations.push({
      type: 'lantern',
      x: centerX + 70,
      y: centerY - 10,
      color: '#FF6347'
    });
    
    // Add heart-shaped flower bed
    decorations.push({
      type: 'heartFlowers',
      x: centerX,
      y: centerY + 80,
      size: 40
    });
  }
  
  // Initialize particles for ambient effects
  function initParticles() {
    // Create different types of particles for ambiance
    for (let i = 0; i < 50; i++) {
      particles.push({
        type: 'leaf',
        x: Math.random() * mapWidth,
        y: Math.random() * mapHeight,
        size: 2 + Math.random() * 3,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.2 - 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        color: Math.random() > 0.5 ? '#8B4513' : '#006400'
      });
    }
    
    // Add butterfly particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        type: 'butterfly',
        x: Math.random() * mapWidth,
        y: 100 + Math.random() * 300,
        size: 3 + Math.random() * 2,
        amplitude: 20 + Math.random() * 10,
        xFactor: Math.random() * 0.1,
        yFactor: Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '#9370DB' : '#FF69B4'
      });
    }
  }
  
  // Update particles for animation
  function updateParticles() {
    // Update each particle's position and state
    particles.forEach(particle => {
      if (particle.type === 'leaf') {
        // Update leaf particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Reset if out of bounds
        if (particle.x < 0) particle.x = mapWidth;
        if (particle.x > mapWidth) particle.x = 0;
        if (particle.y < 0) particle.y = mapHeight;
        if (particle.y > mapHeight) particle.y = 0;
      }
      else if (particle.type === 'butterfly') {
        // Update butterfly particles with sinusoidal movement
        particle.phase += 0.02;
        
        particle.x += Math.cos(particle.phase) * particle.xFactor * particle.amplitude;
        particle.y += Math.sin(particle.phase * 2) * particle.yFactor * particle.amplitude/2;
        
        // Ensure butterflies stay within map bounds
        if (particle.x < 0) particle.x = mapWidth;
        if (particle.x > mapWidth) particle.x = 0;
        if (particle.y < 50) particle.y = 50;
        if (particle.y > mapHeight - 50) particle.y = mapHeight - 50;
      }
    });
  }
  
  // Update camera to follow player
  function updateCamera() {
    // Center camera on player
    camera.x = player.x - camera.width / 2;
    
    // Clamp camera to map bounds
    if (camera.x < 0) camera.x = 0;
    if (camera.x > mapWidth - camera.width) camera.x = mapWidth - camera.width;
  }
  
  // Update and draw the world
  function updateWorld() {
    updateCamera();
    updateParticles();
    drawBackground();
    drawTiles();
    drawDecorations();
    drawParticles();
    drawLocations();
    drawProgressIndicator();
  }
  
  // Draw the world background
  function drawBackground() {
    // Sky background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(1, '#E0F7FA'); // Light cyan
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw distant mountains
    drawMountains();
    
    // Draw clouds
    drawClouds();
  }
  
  // Draw distant mountains for depth
  function drawMountains() {
    ctx.fillStyle = '#9FA8DA'; // Light indigo
    
    // First mountain range (farthest)
    ctx.beginPath();
    ctx.moveTo(0, 150);
    
    for (let x = 0; x < canvas.width; x += 50) {
      const height = 50 + Math.sin(x / 200 + camera.x / 1000) * 30;
      ctx.lineTo(x, 150 - height);
    }
    
    ctx.lineTo(canvas.width, 150);
    ctx.closePath();
    ctx.fill();
    
    // Second mountain range (closer)
    ctx.fillStyle = '#7986CB'; // Indigo
    ctx.beginPath();
    ctx.moveTo(0, 170);
    
    for (let x = 0; x < canvas.width; x += 30) {
      const height = 60 + Math.sin(x / 100 + camera.x / 800) * 40;
      ctx.lineTo(x, 170 - height);
    }
    
    ctx.lineTo(canvas.width, 170);
    ctx.closePath();
    ctx.fill();
  }
  
  // Draw clouds in the sky
  function drawClouds() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    
    // Cloud positions based on camera for parallax effect
    const cloudPositions = [
      { x: (100 - camera.x * 0.1) % canvas.width, y: 50, size: 30 },
      { x: (300 - camera.x * 0.15) % canvas.width, y: 80, size: 40 },
      { x: (600 - camera.x * 0.12) % canvas.width, y: 40, size: 35 },
      { x: (900 - camera.x * 0.08) % canvas.width, y: 70, size: 50 }
    ];
    
    // Draw each cloud
    cloudPositions.forEach(cloud => {
      // Cloud is made of overlapping circles
      for (let i = 0; i < 5; i++) {
        const offsetX = (i - 2) * (cloud.size * 0.6);
        const offsetY = Math.sin(i * 0.8) * (cloud.size * 0.2);
        const size = cloud.size * (0.7 + Math.sin(i) * 0.3);
        
        ctx.beginPath();
        ctx.arc(
          cloud.x + offsetX,
          cloud.y + offsetY,
          size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
  }
  
  // Draw map tiles
  function drawTiles() {
    mapTiles.forEach(tile => {
      // Only draw tiles visible in camera view
      if (isInCameraView(tile)) {
        // Apply color variation for natural look
        const colorValue = hexToRgb(tile.color);
        if (colorValue && tile.colorVariation) {
          const r = Math.min(255, Math.max(0, colorValue.r + tile.colorVariation));
          const g = Math.min(255, Math.max(0, colorValue.g + tile.colorVariation));
          const b = Math.min(255, Math.max(0, colorValue.b + tile.colorVariation));
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        } else {
          ctx.fillStyle = tile.color;
        }
        
        ctx.fillRect(
          tile.x - camera.x,
          tile.y,
          tile.width,
          tile.height
        );
      }
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
  
  // Check if an object is in camera view
  function isInCameraView(obj) {
    return obj.x + obj.width > camera.x && 
           obj.x < camera.x + camera.width;
  }
  
  // Draw decorative elements
  function drawDecorations() {
    decorations.forEach(decoration => {
      // Only draw decorations visible in camera view
      if (isInCameraView(decoration)) {
        switch(decoration.type) {
          case 'tree':
            if (decoration.treeType === 'pine') {
              drawPineTree(
                decoration.x - camera.x,
                decoration.y,
                decoration.size
              );
            } else {
              drawOakTree(
                decoration.x - camera.x,
                decoration.y,
                decoration.size
              );
            }
            break;
          case 'flower':
            drawFlower(
              decoration.x - camera.x,
              decoration.y,
              decoration.color
            );
            break;
          case 'flowerBed':
            drawFlowerBed(
              decoration.x - camera.x,
              decoration.y,
              decoration.width,
              decoration.height,
              decoration.flowerType
            );
            break;
          case 'pond':
            drawPond(
              decoration.x - camera.x,
              decoration.y,
              decoration.size,
              decoration.color
            );
            break;
          case 'waterLily':
            drawWaterLily(
              decoration.x - camera.x,
              decoration.y,
              decoration.size
            );
            break;
          case 'streamSegment':
            drawStreamSegment(
              decoration.x - camera.x,
              decoration.y,
              decoration.width,
              decoration.color
            );
            break;
          case 'bench':
            drawBench(
              decoration.x - camera.x,
              decoration.y,
              decoration.width,
              decoration.height
            );
            break;
          case 'bridge':
            drawBridge(
              decoration.x - camera.x,
              decoration.y,
              decoration.width,
              decoration.height
            );
            break;
          case 'lamppost':
            drawLamppost(
              decoration.x - camera.x,
              decoration.y,
              decoration.height
            );
            break;
          case 'gazebo':
            drawGazebo(
              decoration.x - camera.x,
              decoration.y,
              decoration.width,
              decoration.height
            );
            break;
          case 'flowerArch':
            drawFlowerArch(
              decoration.x - camera.x,
              decoration.y,
              decoration.width,
              decoration.height
            );
            break;
          case 'fairyLight':
            drawFairyLight(
              decoration.x - camera.x,
              decoration.y,
              decoration.color
            );
            break;
          case 'lantern':
            drawLantern(
              decoration.x - camera.x,
              decoration.y,
              decoration.color
            );
            break;
          case 'heartFlowers':
            drawHeartFlowers(
              decoration.x - camera.x,
              decoration.y,
              decoration.size
            );
            break;
        }
      }
    });
  }
  
  // Draw particles for ambient effects
  function drawParticles() {
    particles.forEach(particle => {
      if (isInCameraView(particle)) {
        if (particle.type === 'leaf') {
          drawLeaf(
            particle.x - camera.x,
            particle.y,
            particle.size,
            particle.rotation,
            particle.color
          );
        }
        else if (particle.type === 'butterfly') {
          drawButterfly(
            particle.x - camera.x,
            particle.y,
            particle.size,
            particle.phase,
            particle.color
          );
        }
      }
    });
  }
  
  // Draw an oak tree
  function drawOakTree(x, y, size) {
    // Tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - size/6, y, size/3, size * 1.2);
    
    // Tree leaves in layers for more detail
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(x, y - size/3, size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#006400';
    ctx.beginPath();
    ctx.arc(x + size/5, y - size/4, size * 0.7, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(x - size/4, y - size/2, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw a pine tree
  function drawPineTree(x, y, size) {
    // Tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - size/8, y + size, size/4, size * 0.5);
    
    // Pine tree triangles
    ctx.fillStyle = '#006400';
    
    // Bottom layer
    ctx.beginPath();
    ctx.moveTo(x - size, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    
    // Middle layer
    ctx.beginPath();
    ctx.moveTo(x - size * 0.8, y + size * 0.7);
    ctx.lineTo(x + size * 0.8, y + size * 0.7);
    ctx.lineTo(x, y - size * 0.2);
    ctx.closePath();
    ctx.fill();
    
    // Top layer
    ctx.beginPath();
    ctx.moveTo(x - size * 0.6, y + size * 0.4);
    ctx.lineTo(x + size * 0.6, y + size * 0.4);
    ctx.lineTo(x, y - size * 0.4);
    ctx.closePath();
    ctx.fill();
  }
  
  // Draw a flower
  function drawFlower(x, y, color) {
    const size = 5;
    
    // Flower stem
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + size);
    ctx.lineTo(x, y + size * 3);
    ctx.stroke();
    
    // Flower petals
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const petalX = x + Math.cos(angle) * size;
      const petalY = y + Math.sin(angle) * size;
      
      ctx.beginPath();
      ctx.arc(petalX, petalY, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Flower center
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(x, y, size/2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw a flower bed
  function drawFlowerBed(x, y, width, height, flowerType) {
    // Flower bed border
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x, y, width, height);
    
    // Flower bed soil
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(x + 2, y + 2, width - 4, height - 4);
  }
  
  // Draw a pond
  function drawPond(x, y, size, color) {
    // Main pond with gradient for depth
    const gradient = ctx.createRadialGradient(
      x, y, size * 0.2,
      x, y, size
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#4D89C9');
  
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, size, size/2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x - size/4, y - size/8, size/3, size/6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    const time = Date.now() / 1000;
    const rippleCount = 3;
    
    for (let i = 0; i < rippleCount; i++) {
        const rippleSize = (0.3 + 0.7 * ((time + i) % 3) / 3) * size;
        
        ctx.beginPath();
        ctx.ellipse(
        x, y, 
        rippleSize, rippleSize/2, 
        0, 0, Math.PI * 2
        );
        ctx.stroke();
    }
    }

// Draw a water lily
function drawWaterLily(x, y, size) {
  // Lily pad
  ctx.fillStyle = '#3A5F0B';
  ctx.beginPath();
  ctx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Lily flower
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const petalX = x + Math.cos(angle) * size/2;
    const petalY = y + Math.sin(angle) * size/2;
    
    ctx.beginPath();
    ctx.ellipse(
      petalX, petalY, 
      size/2, size/4, 
      angle, 0, Math.PI * 2
    );
    ctx.fill();
  }
  
  // Flower center
  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  ctx.arc(x, y, size/3, 0, Math.PI * 2);
  ctx.fill();
}

// Draw a stream segment
function drawStreamSegment(x, y, width, color) {
  // Stream water
  ctx.fillStyle = color;
  
  // Curved stream segment
  ctx.beginPath();
  ctx.ellipse(x, y, width/2, width/4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Add flowing water effect
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  
  const time = Date.now() / 1000;
  
  for (let i = 0; i < 3; i++) {
    const offsetX = ((time * 2 + i) % 3) * width/3 - width/2;
    
    ctx.beginPath();
    ctx.moveTo(x + offsetX - width/6, y - width/8);
    ctx.lineTo(x + offsetX + width/6, y + width/8);
    ctx.stroke();
  }
}

// Draw a bench
function drawBench(x, y, width, height) {
  // Bench seat
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x, y, width, height);
  
  // Bench surface detail
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 1;
  
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y + height * i/3);
    ctx.lineTo(x + width, y + height * i/3);
    ctx.stroke();
  }
  
  // Bench legs
  ctx.fillStyle = '#5D4037';
  ctx.fillRect(x + 5, y + height, 5, 15);
  ctx.fillRect(x + width - 10, y + height, 5, 15);
  
  // Bench back
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x, y - 15, width, 5);
  
  for (let i = 0; i < 3; i++) {
    const barX = x + 5 + i * (width - 10)/2;
    ctx.fillRect(barX, y - 15, 3, -15);
  }
}

// Draw a bridge
function drawBridge(x, y, width, height) {
  // Bridge structure
  ctx.fillStyle = '#8B4513';
  
  // Bridge base
  ctx.fillRect(x, y, width, height);
  
  // Bridge railings
  ctx.fillRect(x, y - 15, width, 3);
  ctx.fillRect(x, y - 30, width, 3);
  
  // Bridge supports
  for (let i = 0; i <= 4; i++) {
    const supportX = x + i * (width / 4);
    ctx.fillRect(supportX - 2, y - 30, 4, 30);
  }
  
  // Bridge detail
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 1;
  
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y + i);
    ctx.lineTo(x + width, y + i);
    ctx.stroke();
  }
}

// Draw a lamppost
function drawLamppost(x, y, height) {
  // Post
  ctx.fillStyle = '#333333';
  ctx.fillRect(x - 2, y, 4, height);
  
  // Lamp
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Light glow
  const time = Date.now() / 1000;
  const glowSize = 12 + Math.sin(time * 2) * 2;
  
  ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
  ctx.beginPath();
  ctx.arc(x, y, glowSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Lamp cap
  ctx.fillStyle = '#555555';
  ctx.beginPath();
  ctx.arc(x, y, 10, Math.PI, Math.PI * 2);
  ctx.fill();
}

// Draw a leaf particle
function drawLeaf(x, y, size, rotation, color) {
  ctx.save();
  
  ctx.translate(x, y);
  ctx.rotate(rotation);
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 2, size, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Leaf vein
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-size * 2, 0);
  ctx.lineTo(size * 2, 0);
  ctx.stroke();
  
  ctx.restore();
}

// Draw a butterfly
function drawButterfly(x, y, size, phase, color) {
  ctx.save();
  
  ctx.translate(x, y);
  
  // Wing flap animation
  const wingFactor = Math.sin(phase * 2) * 0.5;
  
  // Left wing
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(
    -size * 2 * wingFactor, 0, 
    size * 3, size * 2, 
    -Math.PI/4 * wingFactor, 0, Math.PI * 2
  );
  ctx.fill();
  
  // Right wing
  ctx.beginPath();
  ctx.ellipse(
    size * 2 * wingFactor, 0, 
    size * 3, size * 2, 
    Math.PI/4 * wingFactor, 0, Math.PI * 2
  );
  ctx.fill();
  
  // Body
  ctx.fillStyle = '#333333';
  ctx.fillRect(-size/4, -size * 2, size/2, size * 4);
  
  ctx.restore();
}

// Draw a gazebo
function drawGazebo(x, y, width, height) {
  // Base platform
  ctx.fillStyle = '#A0522D';
  ctx.fillRect(x, y + height - 10, width, 10);
  
  // Roof
  ctx.fillStyle = '#8B4513';
  
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 20);
  ctx.lineTo(x + width + 10, y + 20);
  ctx.lineTo(x + width/2, y - 20);
  ctx.closePath();
  ctx.fill();
  
  // Roof detail
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 20);
  ctx.lineTo(x + width + 10, y + 20);
  ctx.stroke();
  
  // Support columns
  const columns = 6;
  const columnWidth = 5;
  
  for (let i = 0; i <= columns; i++) {
    const columnX = x + (i * width / columns);
    
    if (i === 3) continue; // Skip middle column for entrance
    
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(
      columnX - columnWidth/2, 
      y + 20, 
      columnWidth, 
      height - 30
    );
  }
  
  // Gazebo floor
  ctx.fillStyle = '#DEB887';
  ctx.fillRect(
    x + 10, 
    y + height - 5, 
    width - 20, 
    5
  );
}

// Draw a flower arch
function drawFlowerArch(x, y, width, height) {
  // Arch structure
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 3;
  
  ctx.beginPath();
  ctx.arc(
    x + width/2, 
    y + height, 
    width/2, 
    Math.PI, 
    Math.PI * 2
  );
  ctx.stroke();
  
  // Flowers on the arch
  const flowerColors = ['#FF69B4', '#FF6347', '#9370DB', '#FFFFFF'];
  const flowerCount = 15;
  
  for (let i = 0; i < flowerCount; i++) {
    const angle = Math.PI + (i / (flowerCount - 1)) * Math.PI;
    const flowerX = x + width/2 + Math.cos(angle) * (width/2);
    const flowerY = y + height + Math.sin(angle) * (width/2);
    const flowerColor = flowerColors[i % flowerColors.length];
    const flowerSize = 3 + Math.random() * 2;
    
    // Draw a small flower
    ctx.fillStyle = flowerColor;
    for (let j = 0; j < 5; j++) {
      const petalAngle = (j / 5) * Math.PI * 2;
      const petalX = flowerX + Math.cos(petalAngle) * flowerSize;
      const petalY = flowerY + Math.sin(petalAngle) * flowerSize;
      
      ctx.beginPath();
      ctx.arc(petalX, petalY, flowerSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(flowerX, flowerY, flowerSize/2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw a fairy light
function drawFairyLight(x, y, color) {
  // Light with glow effect
  const time = Date.now() / 1000;
  const pulseScale = 0.5 + Math.sin(time * 2 + x * 0.1) * 0.5;
  
  // Outer glow
  ctx.fillStyle = `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, 0.2)`;
  ctx.beginPath();
  ctx.arc(x, y, 8 * pulseScale, 0, Math.PI * 2);
  ctx.fill();
  
  // Inner glow
  ctx.fillStyle = `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, 0.5)`;
  ctx.beginPath();
  ctx.arc(x, y, 4 * pulseScale, 0, Math.PI * 2);
  ctx.fill();
  
  // Light center
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 2 * pulseScale, 0, Math.PI * 2);
  ctx.fill();
}

// Draw a lantern
function drawLantern(x, y, color) {
  // Lantern body
  ctx.fillStyle = color;
  ctx.fillRect(x - 8, y, 16, 20);
  
  // Lantern top
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x + 10, y);
  ctx.lineTo(x + 5, y - 5);
  ctx.lineTo(x - 5, y - 5);
  ctx.closePath();
  ctx.fill();
  
  // Lantern bottom
  ctx.beginPath();
  ctx.moveTo(x - 8, y + 20);
  ctx.lineTo(x + 8, y + 20);
  ctx.lineTo(x + 5, y + 25);
  ctx.lineTo(x - 5, y + 25);
  ctx.closePath();
  ctx.fill();
  
  // Lantern handle
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 5);
  ctx.quadraticCurveTo(x, y - 15, x + 5, y - 5);
  ctx.stroke();
  
  // Lantern glow
  const time = Date.now() / 1000;
  const glowSize = 10 + Math.sin(time * 2) * 2;
  
  ctx.fillStyle = 'rgba(255, 255, 200, 0.3)';
  ctx.beginPath();
  ctx.arc(x, y + 10, glowSize, 0, Math.PI * 2);
  ctx.fill();
}

// Draw heart-shaped flower bed
function drawHeartFlowers(x, y, size) {
  // Heart outline
  ctx.fillStyle = '#5D4037';
  
  // Draw heart shape
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.7);
  ctx.bezierCurveTo(
    x, y + size * 0.3, 
    x - size * 0.5, y, 
    x - size, y + size * 0.3
  );
  ctx.bezierCurveTo(
    x - size * 1.1, y + size * 0.6, 
    x - size * 0.5, y + size * 1.1, 
    x, y + size * 1.4
  );
  ctx.bezierCurveTo(
    x + size * 0.5, y + size * 1.1, 
    x + size * 1.1, y + size * 0.6, 
    x + size, y + size * 0.3
  );
  ctx.bezierCurveTo(
    x + size * 0.5, y, 
    x, y + size * 0.3, 
    x, y + size * 0.7
  );
  ctx.closePath();
  ctx.fill();
  
  // Fill with flowers
  const flowerColors = ['#FF69B4', '#FF1493', '#DB7093'];
  
  for (let i = 0; i < 15; i++) {
    // Random position within the heart
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * size * 0.7;
    const flowerX = x + Math.cos(angle) * distance;
    const flowerY = y + size * 0.7 + Math.sin(angle) * distance;
    
    // Draw flower
    const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    const flowerSize = 2 + Math.random() * 3;
    
    ctx.fillStyle = flowerColor;
    for (let j = 0; j < 5; j++) {
      const petalAngle = (j / 5) * Math.PI * 2;
      const petalX = flowerX + Math.cos(petalAngle) * flowerSize;
      const petalY = flowerY + Math.sin(petalAngle) * flowerSize;
      
      ctx.beginPath();
      ctx.arc(petalX, petalY, flowerSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(flowerX, flowerY, flowerSize/2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw locations where interactions happen
function drawLocations() {
  locations.forEach((location, index) => {
    // Skip drawing future stages until they're unlocked
    if (index > gameState.currentStage && location.id !== 'proposal') {
      return;
    }
    
    // Only draw locations visible in camera view
    if (isInCameraView(location)) {
      // Special handling for proposal spot
      if (location.id === 'proposal') {
        // Only show proposal spot when all other stages are complete
        const allPreviousComplete = Object.entries(gameState.stagesCompleted)
          .filter(([id, _]) => id !== 'proposal')
          .every(([_, completed]) => completed);
        
        if (!allPreviousComplete && !gameState.stagesCompleted.proposal) {
          return;
        }
      }
      
      // Determine if completed
      const isCompleted = gameState.stagesCompleted[location.id];
      const isActive = index === gameState.currentStage;
      
      // Draw location marker with adjusted position for camera
      ctx.fillStyle = isCompleted ? '#A0A0A0' : location.color;
      
      // Add pulsing effect to current active location
      let size = location.width / 2;
      if (isActive) {
        const pulseFactor = Math.sin(Date.now() / 500) * 5;
        size += pulseFactor;
      }
      
      // For proposal spot, make it more fancy
      if (location.id === 'proposal') {
        // Special heart-shaped marker for proposal
        ctx.fillStyle = '#FF69B4';
        
        // Heart shape pulsing
        const heartSize = location.width / 2 + (isActive ? Math.sin(Date.now() / 500) * 5 : 0);
        const heartX = location.x - camera.x + location.width/2;
        const heartY = location.y + location.height/2;
        
        drawHeart(heartX, heartY, heartSize);
        
        // Particle effects around the heart
        if (isActive) {
          drawProposalParticles(heartX, heartY, heartSize * 2);
        }
      } else {
        // Draw the location as a circle
        ctx.beginPath();
        ctx.arc(
          location.x - camera.x + location.width/2, 
          location.y + location.height/2, 
          size, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
      }
      
      // Draw icon or symbol based on location type
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      
      let emoji = '';
      switch (location.id) {
        case 'instagram': emoji = '📱'; break;
        case 'restaurant': emoji = '🍽️'; break;
        case 'song': emoji = '🎵'; break;
        case 'ramen': emoji = '🍜'; break;
        case 'proposal': emoji = '❤️'; break;
      }
      
      // Only draw emoji for non-proposal locations
      if (location.id !== 'proposal') {
        ctx.fillText(
          emoji, 
          location.x - camera.x + location.width/2, 
          location.y + location.height/2 + 6
        );
      }
      
      // Draw name above if active
      if (isActive) {
        ctx.font = '14px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(
          location.name, 
          location.x - camera.x + location.width/2, 
          location.y - 10
        );
      }
      
      // Draw a decorative sign by non-proposal locations
      if ((isActive || isCompleted) && location.id !== 'proposal') {
        drawLocationSign(
          location.x - camera.x - 20,
          location.y - 40,
          location.name
        );
      }
    }
  });
}

// Draw a heart shape
function drawHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(
    x, y, 
    x - size, y, 
    x - size, y + size * 0.3
  );
  ctx.bezierCurveTo(
    x - size, y + size * 0.6, 
    x - size * 0.5, y + size, 
    x, y + size * 1.2
  );
  ctx.bezierCurveTo(
    x + size * 0.5, y + size, 
    x + size, y + size * 0.6, 
    x + size, y + size * 0.3
  );
  ctx.bezierCurveTo(
    x + size, y, 
    x, y, 
    x, y + size * 0.3
  );
  ctx.closePath();
  ctx.fill();
}

// Draw particles around the proposal spot
function drawProposalParticles(x, y, radius) {
  const time = Date.now() / 1000;
  const particleCount = 8;
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2 + time;
    const distance = radius + Math.sin(time * 3 + i) * 10;
    
    const particleX = x + Math.cos(angle) * distance;
    const particleY = y + Math.sin(angle) * distance;
    
    ctx.fillStyle = i % 2 === 0 ? '#FF69B4' : '#FFD700';
    ctx.beginPath();
    ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw a decorative sign for a location
function drawLocationSign(x, y, text) {
  // Sign post
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x + 40, y + 30, 5, 40);
  
  // Sign board
  ctx.fillStyle = '#D2B48C';
  ctx.fillRect(x, y, 80, 30);
  
  // Border
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, 80, 30);
  
  // Text
  ctx.fillStyle = '#5D4037';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + 40, y + 18);
}

// Draw progress indicator
function drawProgressIndicator() {
  // Calculate how many stages completed
  const completedCount = Object.values(gameState.stagesCompleted).filter(Boolean).length;
  
  // Draw progress bar
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 40, 200, 20);
  
  ctx.fillStyle = '#FF6B6B';
  const progressWidth = (completedCount / locations.length) * 190;
  ctx.fillRect(15, 45, progressWidth, 10);
  
  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Journey Progress: ${completedCount}/${locations.length}`, 20, 57);
  
  // Draw mini-map to show player position
  drawMiniMap();
}

// Draw mini-map to show overall journey progress
function drawMiniMap() {
  const miniMapWidth = 200;
  const miniMapHeight = 30;
  const miniMapX = canvas.width - miniMapWidth - 10;
  const miniMapY = 10;
  
  // Background
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(miniMapX, miniMapY, miniMapWidth, miniMapHeight);
  
  // Draw path on mini-map
  ctx.fillStyle = '#E8D8C3';
  ctx.fillRect(miniMapX + 5, miniMapY + miniMapHeight/2 - 2, miniMapWidth - 10, 4);
  
  // Draw locations on mini-map
  locations.forEach((location, index) => {
    // Skip future stages on mini-map
    if (index > gameState.currentStage && location.id !== 'proposal') {
      return;
    }
    
    // For proposal, only show when all others are complete
    if (location.id === 'proposal') {
      const allPreviousComplete = Object.entries(gameState.stagesCompleted)
        .filter(([id, _]) => id !== 'proposal')
        .every(([_, completed]) => completed);
      
      if (!allPreviousComplete && !gameState.stagesCompleted.proposal) {
        return;
      }
    }
    
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = index === gameState.currentStage;
    
    // Calculate position on mini-map
    const mapRatio = (location.x) / mapWidth;
    const dotX = miniMapX + 5 + (miniMapWidth - 10) * mapRatio;
    
    // Draw location dot
    if (location.id === 'proposal') {
      // Heart for proposal
      ctx.fillStyle = isCompleted ? '#A0A0A0' : '#FF69B4';
      drawMiniHeart(dotX, miniMapY + miniMapHeight/2, 3);
    } else {
      // Regular dot for other locations
      ctx.fillStyle = isCompleted ? '#A0A0A0' : (isActive ? location.color : '#FFFFFF');
      ctx.beginPath();
      ctx.arc(dotX, miniMapY + miniMapHeight/2, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  
  // Draw player position on mini-map
  const playerMapRatio = player.x / mapWidth;
  const playerDotX = miniMapX + 5 + (miniMapWidth - 10) * playerMapRatio;
  
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.arc(playerDotX, miniMapY + miniMapHeight/2, 3, 0, Math.PI * 2);
  ctx.fill();
}

// Draw mini heart for the mini-map
function drawMiniHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(
    x, y, 
    x - size, y, 
    x - size, y + size * 0.3
  );
  ctx.bezierCurveTo(
    x - size, y + size * 0.6, 
    x - size * 0.5, y + size, 
    x, y + size * 1.2
  );
  ctx.bezierCurveTo(
    x + size * 0.5, y + size, 
    x + size, y + size * 0.6, 
    x + size, y + size * 0.3
  );
  ctx.bezierCurveTo(
    x + size, y, 
    x, y, 
    x, y + size * 0.3
  );
  ctx.closePath();
  ctx.fill();
}

// Call once at startup to initialize the map
initializeMap();