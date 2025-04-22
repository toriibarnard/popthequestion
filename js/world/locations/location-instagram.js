// Instagram Phone Booth Location

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