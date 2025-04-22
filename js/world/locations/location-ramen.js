// Buta Ramen Shop Location

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