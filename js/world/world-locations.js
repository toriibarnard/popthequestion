// Interactive locations: Instagram phone booth, restaurant, music shop, ramen shop, gazebo

// Draw the interactive locations
function drawLocations() {
    locations.forEach((location, index) => {
      // Skip drawing future stages until they're unlocked
      if (index > gameState.currentStage && location.id !== 'proposal') {
        return;
      }
      
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
      
      // Only draw if in camera view
      if (isInCameraView(location)) {
        const x = location.x - camera.x;
        const y = location.y;
        
        // Draw the appropriate location based on type
        switch(location.objectType) {
          case 'phoneBox':
            drawPhoneBox(x, y, location);
            break;
            
          case 'restaurant':
            drawRestaurant(x, y, location);
            break;
            
          case 'musicShop':
            drawMusicShop(x, y, location);
            break;
            
          case 'ramenShop':
            drawRamenShop(x, y, location);
            break;
            
          case 'gazebo':
            drawGazebo(x, y, location);
            break;
        }
        
        // Interaction prompt if this is the active location
        if (index === gameState.currentStage && !gameState.stagesCompleted[location.id]) {
          drawInteractionPrompt(x + location.width / 2, y - 20);
        }
      }
    });
  }
  
  // Draw Instagram DM interaction as a phone booth
  function drawPhoneBox(x, y, location) {
    const width = location.width;
    const height = location.height;
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = locations.indexOf(location) === gameState.currentStage;
    
    // Phone booth body
    ctx.fillStyle = isCompleted ? '#757575' : '#E1306C'; // Instagram color
    ctx.fillRect(x, y, width, height);
    
    // Phone booth top
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#F56040'; // Instagram gradient color
    ctx.beginPath();
    ctx.moveTo(x - 5, y);
    ctx.lineTo(x + width + 5, y);
    ctx.lineTo(x + width, y - 10);
    ctx.lineTo(x, y - 10);
    ctx.closePath();
    ctx.fill();
    
    // Phone booth door
    ctx.fillStyle = isCompleted ? '#616161' : '#833AB4'; // Instagram gradient color
    ctx.fillRect(x + 10, y + 20, width - 20, height - 30);
    
    // Phone booth windows
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#FCAF45'; // Instagram gradient color
    
    // Top panel with Instagram logo
    ctx.fillRect(x + 20, y + 5, width - 40, 10);
    
    // Instagram logo/Camera icon
    ctx.strokeStyle = isCompleted ? '#9E9E9E' : '#E1306C';
    ctx.lineWidth = 2;
    
    // Camera outline
    ctx.beginPath();
    ctx.rect(x + width / 2 - 7, y + 7, 14, 6);
    ctx.stroke();
    
    // Camera lens
    ctx.beginPath();
    ctx.arc(x + width / 2, y + 10, 2, 0, Math.PI * 2);
    ctx.stroke();
    
    // Phone inside
    if (isActive || isCompleted) {
      ctx.fillStyle = '#212121';
      ctx.fillRect(x + width / 2 - 8, y + height - 40, 16, 25);
      
      // Phone screen
      ctx.fillStyle = isCompleted ? '#757575' : '#4CAF50';
      ctx.fillRect(x + width / 2 - 6, y + height - 38, 12, 18);
      
      // Message on screen
      if (isActive) {
        // Draw tiny message bubble
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x + width / 2 - 4, y + height - 35, 8, 4);
        
        // Text suggestion
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '6px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("hey gorgeous", x + width / 2, y + height - 28);
      }
    }
    
    // Add subtle glow if active
    if (isActive && !isCompleted) {
      const glowGradient = ctx.createRadialGradient(
        x + width / 2, y + height / 2, 10,
        x + width / 2, y + height / 2, 80
      );
      glowGradient.addColorStop(0, 'rgba(225, 48, 108, 0.3)');
      glowGradient.addColorStop(1, 'rgba(225, 48, 108, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 30, y - 30, width + 60, height + 60);
    }
  }
  
  // Draw Restaurant Amano
  function drawRestaurant(x, y, location) {
    const width = location.width;
    const height = location.height;
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = locations.indexOf(location) === gameState.currentStage;
    
    // Restaurant building
    ctx.fillStyle = isCompleted ? '#757575' : '#FFF8E1'; // Cream color
    ctx.fillRect(x, y, width, height);
    
    // Restaurant roof
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#D4AF37'; // Gold color
    ctx.beginPath();
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + width + 10, y);
    ctx.lineTo(x + width, y - 15);
    ctx.lineTo(x, y - 15);
    ctx.closePath();
    ctx.fill();
    
    // Restaurant door
    ctx.fillStyle = isCompleted ? '#616161' : '#8D6E63'; // Wood color
    ctx.fillRect(x + width / 2 - 15, y + height - 40, 30, 40);
    
    // Door handle
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#D4AF37'; // Gold color
    ctx.beginPath();
    ctx.arc(x + width / 2 + 8, y + height - 20, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Windows
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#B0BEC5'; // Window color
    
    // Left window
    ctx.fillRect(x + 15, y + 20, 30, 30);
    
    // Right window
    ctx.fillRect(x + width - 45, y + 20, 30, 30);
    
    // Window frames
    ctx.strokeStyle = isCompleted ? '#9E9E9E' : '#8D6E63';
    ctx.lineWidth = 2;
    
    // Left window frame
    ctx.strokeRect(x + 15, y + 20, 30, 30);
    ctx.beginPath();
    ctx.moveTo(x + 15, y + 35);
    ctx.lineTo(x + 45, y + 35);
    ctx.stroke();
    
    // Right window frame
    ctx.strokeRect(x + width - 45, y + 20, 30, 30);
    ctx.beginPath();
    ctx.moveTo(x + width - 45, y + 35);
    ctx.lineTo(x + width - 15, y + 35);
    ctx.stroke();
    
    // Restaurant name sign
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#D4AF37'; // Gold color
    ctx.fillRect(x + 20, y + 5, width - 40, 10);
    
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#3E2723'; // Dark brown text
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("RESTAURANTÉ AMANO", x + width / 2, y + 12);
    
    // Fancy restaurant elements
    if (!isCompleted) {
      // Awning
      ctx.fillStyle = '#D4AF37'; // Gold color
      ctx.beginPath();
      ctx.moveTo(x - 5, y + 30);
      ctx.lineTo(x, y + 15);
      ctx.lineTo(x + width, y + 15);
      ctx.lineTo(x + width + 5, y + 30);
      ctx.stroke();
      
      // Potted plants
      drawPottedPlant(x - 10, y + height - 25);
      drawPottedPlant(x + width - 5, y + height - 25);
    }
    
    // Add subtle glow if active
    if (isActive && !isCompleted) {
      const glowGradient = ctx.createRadialGradient(
        x + width / 2, y + height / 2, 10,
        x + width / 2, y + height / 2, 80
      );
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 30, y - 30, width + 60, height + 60);
    }
  }
  
  // Helper function to draw a potted plant
  function drawPottedPlant(x, y) {
    // Pot
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(x, y, 15, 15);
    
    // Plant
    ctx.fillStyle = '#388E3C';
    
    ctx.beginPath();
    ctx.arc(x + 7, y - 5, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + 3, y - 8, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + 11, y - 8, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw Music Shop for the song location
  function drawMusicShop(x, y, location) {
    const width = location.width;
    const height = location.height;
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = locations.indexOf(location) === gameState.currentStage;
    
    // Instead of a shop, draw a speaker/boombox on the sidewalk
    const speakerWidth = width * 0.8;
    const speakerHeight = height * 0.7;
    
    // Speaker body
    ctx.fillStyle = isCompleted ? '#616161' : '#212121';
    ctx.fillRect(x + (width - speakerWidth) / 2, y + height - speakerHeight, speakerWidth, speakerHeight);
    
    // Speaker top
    ctx.fillStyle = isCompleted ? '#757575' : '#1DB954'; // Spotify green
    ctx.fillRect(x + (width - speakerWidth) / 2, y + height - speakerHeight - 5, speakerWidth, 5);
    
    // Speaker cones
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#424242';
    const coneRadius1 = speakerWidth * 0.25;
    const coneRadius2 = speakerWidth * 0.15;
    
    // Left speaker cone
    ctx.beginPath();
    ctx.arc(
      x + (width - speakerWidth) / 2 + speakerWidth * 0.3,
      y + height - speakerHeight * 0.6,
      coneRadius1,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Right speaker cone
    ctx.beginPath();
    ctx.arc(
      x + (width - speakerWidth) / 2 + speakerWidth * 0.7,
      y + height - speakerHeight * 0.6,
      coneRadius1,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Speaker dust caps
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#1DB954'; // Spotify green
    
    // Left speaker dust cap
    ctx.beginPath();
    ctx.arc(
      x + (width - speakerWidth) / 2 + speakerWidth * 0.3,
      y + height - speakerHeight * 0.6,
      coneRadius2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Right speaker dust cap
    ctx.beginPath();
    ctx.arc(
      x + (width - speakerWidth) / 2 + speakerWidth * 0.7,
      y + height - speakerHeight * 0.6,
      coneRadius2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Control panel
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#E0E0E0';
    ctx.fillRect(
      x + (width - speakerWidth) / 2 + speakerWidth * 0.2,
      y + height - speakerHeight * 0.3,
      speakerWidth * 0.6,
      speakerHeight * 0.2
    );
    
    // Control knobs
    ctx.fillStyle = isCompleted ? '#616161' : '#1DB954'; // Spotify green
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(
        x + (width - speakerWidth) / 2 + speakerWidth * (0.3 + i * 0.2),
        y + height - speakerHeight * 0.2,
        speakerWidth * 0.04,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    // Add music notes if active
    if (isActive && !isCompleted) {
      const time = Date.now() / 1000;
      
      for (let i = 0; i < 3; i++) {
        const notePhase = time + i * 0.7;
        const noteX = x + width / 2 + Math.sin(notePhase * 2) * 10;
        const noteY = y + height - speakerHeight - 10 - (notePhase % 3) * 15;
        
        ctx.fillStyle = '#1DB954'; // Spotify green
        
        // Note head
        ctx.beginPath();
        ctx.ellipse(noteX, noteY, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Note stem
        ctx.strokeStyle = '#1DB954';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(noteX + 3, noteY);
        ctx.lineTo(noteX + 3, noteY - 15);
        ctx.stroke();
      }
      
      // Add subtle glow
      const glowGradient = ctx.createRadialGradient(
        x + width / 2, y + height - speakerHeight / 2, 10,
        x + width / 2, y + height - speakerHeight / 2, 60
      );
      glowGradient.addColorStop(0, 'rgba(29, 185, 84, 0.3)'); // Spotify green
      glowGradient.addColorStop(1, 'rgba(29, 185, 84, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 20, y + height - speakerHeight - 20, width + 40, speakerHeight + 40);
    }
  }
  
  // Draw Buta Ramen shop
  function drawRamenShop(x, y, location) {
    const width = location.width;
    const height = location.height;
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = locations.indexOf(location) === gameState.currentStage;
    
    // Ramen shop building
    ctx.fillStyle = isCompleted ? '#757575' : '#FFAB91'; // Soft orange
    ctx.fillRect(x, y, width, height);
    
    // Shop roof/awning
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#FF5722'; // Deeper orange
    ctx.beginPath();
    ctx.moveTo(x - 15, y + 20);
    ctx.lineTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width + 15, y + 20);
    ctx.fillRect(x - 15, y, width + 30, 20);
    
    // Shop window
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#FFF3E0'; // Light warm color
    ctx.fillRect(x + 15, y + 30, width - 30, height - 60);
    
    // Window frame
    ctx.strokeStyle = isCompleted ? '#9E9E9E' : '#3E2723'; // Dark brown
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 15, y + 30, width - 30, height - 60);
    
    // Shop door
    ctx.fillStyle = isCompleted ? '#616161' : '#5D4037'; // Brown
    ctx.fillRect(x + width / 2 - 15, y + height - 30, 30, 30);
    
    // Door handle
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#FFC107'; // Yellow/gold
    ctx.beginPath();
    ctx.arc(x + width / 2 + 8, y + height - 15, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Shop sign
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#FFFFFF';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("BUTA RAMEN", x + width / 2, y + 14);
    
    // Ramen bowl on display in window if active or completed
    if (isActive || isCompleted) {
      // Bowl
      ctx.fillStyle = isCompleted ? '#9E9E9E' : '#F5F5F5';
      ctx.beginPath();
      ctx.ellipse(
        x + width / 2,
        y + height / 2,
        20,
        10,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Bowl interior
      ctx.fillStyle = isCompleted ? '#757575' : '#FFC107';
      ctx.beginPath();
      ctx.ellipse(
        x + width / 2,
        y + height / 2,
        15,
        7,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Ramen noodles
      if (!isCompleted) {
        ctx.strokeStyle = '#FFECB3';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 8; i++) {
          const startX = x + width / 2 - 10 + Math.random() * 20;
          const startY = y + height / 2 - 3 + Math.random() * 6;
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          
          for (let j = 0; j < 3; j++) {
            const nextX = startX + (Math.random() * 10 - 5);
            const nextY = startY + (Math.random() * 6 - 3);
            
            ctx.lineTo(nextX, nextY);
          }
          
          ctx.stroke();
        }
        
        // Toppings
        // Egg
        ctx.fillStyle = '#FFECB3';
        ctx.beginPath();
        ctx.ellipse(
          x + width / 2 - 5,
          y + height / 2 - 2,
          4,
          3,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // Pork (chashu)
        ctx.fillStyle = '#D7CCC8';
        ctx.fillRect(x + width / 2 + 3, y + height / 2 - 3, 8, 4);
        
        // Green onions
        ctx.fillStyle = '#4CAF50';
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(
            x + width / 2 - 10 + Math.random() * 20,
            y + height / 2 - 4 + Math.random() * 8,
            2,
            1
          );
        }
      }
    }
    
    // Steam if active
    if (isActive && !isCompleted) {
      const time = Date.now() / 1000;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      
      for (let i = 0; i < 3; i++) {
        const steamPhase = time + i * 0.7;
        const steamX = x + width / 2 + Math.sin(steamPhase) * 8;
        const steamY = y + height / 2 - 15 - (steamPhase % 2) * 10;
        const steamSize = 5 + Math.sin(steamPhase * 2) * 2;
        
        ctx.beginPath();
        ctx.arc(steamX, steamY, steamSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add subtle glow
      const glowGradient = ctx.createRadialGradient(
        x + width / 2, y + height / 2, 10,
        x + width / 2, y + height / 2, 70
      );
      glowGradient.addColorStop(0, 'rgba(255, 87, 34, 0.3)'); // Orange
      glowGradient.addColorStop(1, 'rgba(255, 87, 34, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 20, y - 20, width + 40, height + 40);
    }
  }
  
  // Draw Gazebo for the proposal
  function drawGazebo(x, y, location) {
    const width = location.width;
    const height = location.height;
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = locations.indexOf(location) === gameState.currentStage;
    
    // Base platform
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#8D6E63'; // Brown wood
    ctx.fillRect(x, y + height - 20, width, 20);
    
    // Gazebo posts
    const postWidth = 6;
    const posts = 6; // Number of posts
    
    ctx.fillStyle = isCompleted ? '#757575' : '#6D4C41'; // Darker wood
    
    for (let i = 0; i <= posts; i++) {
      // Skip some posts in the middle for the entrance
      if (i !== 0 && i !== posts && i !== Math.floor(posts / 2)) {
        const postX = x + (i * width / posts) - postWidth / 2;
        ctx.fillRect(postX, y + height - 100, postWidth, 80);
      }
    }
    
    // Gazebo roof
    ctx.fillStyle = isCompleted ? '#616161' : '#FF80AB'; // Pink
    
    // Main roof
    ctx.beginPath();
    ctx.moveTo(x - 15, y + height - 100);
    ctx.lineTo(x + width + 15, y + height - 100);
    ctx.lineTo(x + width / 2, y + height - 140);
    ctx.closePath();
    ctx.fill();
    
    // Roof details
    ctx.strokeStyle = isCompleted ? '#9E9E9E' : '#C2185B'; // Darker pink
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(x - 15, y + height - 100);
    ctx.lineTo(x + width + 15, y + height - 100);
    ctx.stroke();
    
    // Railings
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#8D6E63'; // Brown wood
    
    // Top railing
    ctx.fillRect(x, y + height - 60, width, 4);
    
    // Bottom railing
    ctx.fillRect(x, y + height - 40, width, 4);
    
    // Vertical rails
    for (let i = 1; i < posts; i++) {
      // Skip the middle for entrance
      if (i !== Math.floor(posts / 2)) {
        const railX = x + (i * width / posts);
        ctx.fillRect(railX - 2, y + height - 60, 4, 24);
      }
    }
    
    // Heart decorations if not completed
    if (!isCompleted) {
      ctx.fillStyle = '#FF4081'; // Pink
      
      // Hearts on roof peaks
      drawHeart(x + width / 2, y + height - 150, 10);
      
      // Garland of hearts
      const time = Date.now() / 1000;
      for (let i = 0; i < 7; i++) {
        const heartX = x + 20 + i * (width - 40) / 6;
        const heartY = y + height - 80 + Math.sin(time + i) * 3;
        drawHeart(heartX, heartY, 5);
      }
    }
    
    // Rose petals on the floor if active
    if (isActive && !isCompleted) {
      ctx.fillStyle = '#FF80AB'; // Pink
      
      for (let i = 0; i < 15; i++) {
        const petalX = x + 10 + Math.random() * (width - 20);
        const petalY = y + height - 15 + Math.random() * 10;
        const petalSize = 2 + Math.random() * 3;
        
        ctx.beginPath();
        ctx.ellipse(
          petalX,
          petalY,
          petalSize,
          petalSize / 2,
          Math.random() * Math.PI,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      
      // Magical glow
      const time = Date.now() / 1000;
      const glowGradient = ctx.createRadialGradient(
        x + width / 2, y + height - 70, 20,
        x + width / 2, y + height - 70, 100
      );
      
      const alpha = 0.2 + Math.sin(time) * 0.1;
      glowGradient.addColorStop(0, `rgba(255, 64, 129, ${alpha})`); // Pink
      glowGradient.addColorStop(1, 'rgba(255, 64, 129, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 50, y + height - 170, width + 100, height + 50);
      
      // Particle effects
      for (let i = 0; i < 5; i++) {
        const particlePhase = time + i * 0.7;
        const particleX = x + width / 2 + Math.cos(particlePhase * 2) * 50;
        const particleY = y + height - 70 + Math.sin(particlePhase * 3) * 30;
        const particleSize = 3 + Math.sin(particlePhase) * 2;
        
        ctx.fillStyle = i % 2 === 0 ? '#FF4081' : '#FFC107'; // Pink or gold
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
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
  
  // Draw interaction prompt for active locations
  function drawInteractionPrompt(x, y) {
    const time = Date.now() / 1000;
    const bobAmount = Math.sin(time * 3) * 5;
    
    // Draw space bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(x - 30, y - 20 + bobAmount, 60, 15);
    
    // Space bar details
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 30, y - 20 + bobAmount, 60, 15);
    
    // Text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("SPACE", x, y - 10 + bobAmount);
    
    // Arrow pointing down
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.moveTo(x, y + bobAmount);
    ctx.lineTo(x - 8, y - 8 + bobAmount);
    ctx.lineTo(x + 8, y - 8 + bobAmount);
    ctx.closePath();
    ctx.fill();
  }
  
  // Helper function for color conversion
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