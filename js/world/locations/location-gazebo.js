// Gazebo Location (Proposal)

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