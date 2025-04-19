// World and environment functionality

// Define the locations of special interactions (in order)
const locations = [
    {
      id: "instagram",
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      name: "First Interaction",
      description: "Our first Instagram DM 'hey gorgeous'",
      color: "#E1306C" // Instagram color
    },
    {
      id: "restaurant",
      x: 300,
      y: 150,
      width: 60,
      height: 60,
      name: "First Date",
      description: "Restauranté Amano",
      color: "#D4AF37" // Gold color for fancy restaurant
    },
    {
      id: "song",
      x: 500,
      y: 250,
      width: 50,
      height: 50,
      name: "Our Song",
      description: "Lover, You Should've Come Over by Joel Plaskett",
      color: "#1DB954" // Spotify green
    },
    {
      id: "ramen",
      x: 650,
      y: 400,
      width: 55,
      height: 55,
      name: "Favorite Food",
      description: "Buta Ramen",
      color: "#FF4500" // Reddish color for food
    }
  ];
  
  // Define barriers player can't walk through
  const barriers = [
    // Left wall
    { x: -10, y: 0, width: 10, height: 600 },
    // Right wall
    { x: 800, y: 0, width: 10, height: 600 },
    // Top wall
    { x: 0, y: -10, width: 800, height: 10 },
    // Bottom wall
    { x: 0, y: 600, width: 800, height: 10 },
    
    // Create a linear path with barriers to guide the flow
    // Between Instagram and Restaurant
    { x: 0, y: 100, width: 80, height: 80 },
    { x: 170, y: 100, width: 110, height: 80 },
    
    // Between Restaurant and Song
    { x: 380, y: 150, width: 100, height: 80 },
    
    // Between Song and Ramen
    { x: 570, y: 250, width: 60, height: 130 }
  ];
  
  // Update and draw the world
  function updateWorld() {
    drawBackground();
    drawPath();
    drawLocations();
    drawProgressIndicator();
  }
  
  // Draw the world background
  function drawBackground() {
    // Basic ground
    ctx.fillStyle = '#8FCB9B'; // Softer green
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Draw path connecting locations
  function drawPath() {
    ctx.fillStyle = '#E8D8C3'; // Sandy path color
    
    // Main path
    ctx.beginPath();
    ctx.moveTo(100, 225);
    ctx.lineTo(300, 175);
    ctx.lineTo(500, 275);
    ctx.lineTo(650, 425);
    ctx.lineWidth = 30;
    ctx.strokeStyle = '#E8D8C3';
    ctx.stroke();
    
    // Add some decorative elements
    // Trees
    for (let i = 0; i < 10; i++) {
      drawTree(50 + i * 80, 50 + (i % 5) * 100, 15 + (i % 3) * 5);
    }
    
    // Draw water
    ctx.fillStyle = '#5DA9E9';
    ctx.fillRect(700, 100, 100, 200);
    
    // Add decorative rocks
    for (let i = 0; i < 15; i++) {
      drawRock(
        Math.random() * canvas.width, 
        Math.random() * canvas.height,
        5 + Math.random() * 10
      );
    }
  }
  
  // Draw locations where interactions happen
  function drawLocations() {
    locations.forEach((location, index) => {
      // Skip drawing future stages until they're unlocked
      if (index > gameState.currentStage) {
        return;
      }
      
      // Determine if completed
      const isCompleted = gameState.stagesCompleted[location.id];
      const isActive = index === gameState.currentStage;
      
      // Draw location marker
      ctx.fillStyle = isCompleted ? '#A0A0A0' : location.color;
      
      // Add pulsing effect to current active location
      let size = location.width / 2;
      if (isActive) {
        const pulseFactor = Math.sin(Date.now() / 500) * 5;
        size += pulseFactor;
      }
      
      // Draw the location as a circle
      ctx.beginPath();
      ctx.arc(
        location.x + location.width/2, 
        location.y + location.height/2, 
        size, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
      
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
      }
      
      ctx.fillText(
        emoji, 
        location.x + location.width/2, 
        location.y + location.height/2 + 6
      );
      
      // Draw name above if active
      if (isActive) {
        ctx.font = '14px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(
          location.name, 
          location.x + location.width/2, 
          location.y - 10
        );
      }
    });
  }
  
  // Draw a decorative tree
  function drawTree(x, y, size) {
    // Tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - size/4, y, size/2, size * 1.5);
    
    // Tree leaves
    ctx.fillStyle = '#006400';
    ctx.beginPath();
    ctx.arc(x, y - size/2, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw a decorative rock
  function drawRock(x, y, size) {
    ctx.fillStyle = '#808080';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
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
  }