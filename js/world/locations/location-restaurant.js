// Restaurant Amano Location

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