// Midground elements with parallax effect

// Midground objects (trees, lamp posts, etc.)
const midgroundObjects = [];

// Initialize midground objects
function initializeMidground() {
  // Add distant trees
  for (let i = 0; i < 30; i++) {
    const x = 100 + i * 120 + Math.random() * 60;
    const height = 80 + Math.random() * 40;
    
    midgroundObjects.push({
      type: 'tree',
      x: x,
      y: 380,
      width: 50,
      height: height,
      parallaxFactor: 0.3,
      treeType: Math.random() > 0.3 ? 'normal' : 'pine'
    });
  }
  
  // Add lamp posts
  for (let i = 0; i < 15; i++) {
    const x = 200 + i * 230;
    
    midgroundObjects.push({
      type: 'lampPost',
      x: x,
      y: 390,
      width: 10,
      height: 80,
      parallaxFactor: 0.5
    });
  }
  
  // Add distant benches
  for (let i = 0; i < 8; i++) {
    const x = 350 + i * 400;
    
    midgroundObjects.push({
      type: 'bench',
      x: x,
      y: 430,
      width: 40,
      height: 20,
      parallaxFactor: 0.5
    });
  }
}

// Draw midground elements (with parallax)
function drawMidground() {
  updateClouds();
  drawStars();
  
  // Draw all midground objects with parallax effect
  midgroundObjects.forEach(obj => {
    // Apply parallax effect to x-position
    const parallaxX = obj.x - camera.x * obj.parallaxFactor;
    
    // Only draw if visible with parallax
    if (parallaxX + obj.width > 0 && parallaxX < canvas.width) {
      switch(obj.type) {
        case 'tree':
          if (obj.treeType === 'pine') {
            drawPineTree(parallaxX, obj.y, obj.height);
          } else {
            drawTree(parallaxX, obj.y, obj.height);
          }
          break;
          
        case 'lampPost':
          drawLampPost(parallaxX, obj.y, obj.height);
          break;
          
        case 'bench':
          drawBench(parallaxX, obj.y, obj.width, obj.height);
          break;
      }
    }
  });
}

// Draw a stylized tree
function drawTree(x, y, height) {
  const trunkWidth = height * 0.15;
  const trunkHeight = height * 0.6;
  const foliageRadius = height * 0.4;
  
  // Tree trunk
  ctx.fillStyle = '#5D4037';
  ctx.fillRect(
    x - trunkWidth / 2,
    y - trunkHeight,
    trunkWidth,
    trunkHeight
  );
  
  // Tree foliage - multiple circles for fuller look
  ctx.fillStyle = '#388E3C';
  
  ctx.beginPath();
  ctx.arc(
    x,
    y - trunkHeight - foliageRadius * 0.5,
    foliageRadius,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(
    x - foliageRadius * 0.5,
    y - trunkHeight - foliageRadius * 0.3,
    foliageRadius * 0.7,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(
    x + foliageRadius * 0.5,
    y - trunkHeight - foliageRadius * 0.3,
    foliageRadius * 0.7,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(
    x,
    y - trunkHeight - foliageRadius,
    foliageRadius * 0.6,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

// Draw a pine tree
function drawPineTree(x, y, height) {
  const trunkWidth = height * 0.1;
  const trunkHeight = height * 0.3;
  const triangleWidth = height * 0.6;
  
  // Tree trunk
  ctx.fillStyle = '#5D4037';
  ctx.fillRect(
    x - trunkWidth / 2,
    y - trunkHeight,
    trunkWidth,
    trunkHeight
  );
  
  // Tree triangles
  ctx.fillStyle = '#2E7D32';
  
  // Bottom triangle
  ctx.beginPath();
  ctx.moveTo(x - triangleWidth / 2, y - trunkHeight);
  ctx.lineTo(x + triangleWidth / 2, y - trunkHeight);
  ctx.lineTo(x, y - trunkHeight - triangleWidth * 0.8);
  ctx.closePath();
  ctx.fill();
  
  // Middle triangle
  ctx.beginPath();
  ctx.moveTo(x - triangleWidth * 0.4, y - trunkHeight - triangleWidth * 0.6);
  ctx.lineTo(x + triangleWidth * 0.4, y - trunkHeight - triangleWidth * 0.6);
  ctx.lineTo(x, y - trunkHeight - triangleWidth * 1.2);
  ctx.closePath();
  ctx.fill();
  
  // Top triangle
  ctx.beginPath();
  ctx.moveTo(x - triangleWidth * 0.3, y - trunkHeight - triangleWidth * 1.1);
  ctx.lineTo(x + triangleWidth * 0.3, y - trunkHeight - triangleWidth * 1.1);
  ctx.lineTo(x, y - trunkHeight - triangleWidth * 1.5);
  ctx.closePath();
  ctx.fill();
}

// Draw a lamp post
function drawLampPost(x, y, height) {
  // Post
  ctx.fillStyle = '#616161';
  ctx.fillRect(x - 2, y - height, 4, height);
  
  // Lamp housing
  ctx.fillStyle = '#424242';
  ctx.beginPath();
  ctx.arc(x, y - height, 8, 0, Math.PI, true);
  ctx.fill();
  
  // Light
  const time = Date.now() / 1000;
  const glowSize = 8 + Math.sin(time * 2) * 1.5;
  
  ctx.fillStyle = 'rgba(255, 255, 150, 0.7)';
  ctx.beginPath();
  ctx.arc(x, y - height, glowSize, 0, Math.PI * 2);
  ctx.fill();
}

// Draw a bench
function drawBench(x, y, width, height) {
  // Bench seat
  ctx.fillStyle = '#8D6E63';
  ctx.fillRect(x, y, width, height);
  
  // Bench legs
  ctx.fillStyle = '#5D4037';
  ctx.fillRect(x + 5, y + height, 3, 10);
  ctx.fillRect(x + width - 8, y + height, 3, 10);
  
  // Bench back
  ctx.fillRect(x, y - 15, width, 3);
  
  // Back supports
  ctx.fillRect(x + 5, y - 15, 2, 15);
  ctx.fillRect(x + width - 7, y - 15, 2, 15);
}