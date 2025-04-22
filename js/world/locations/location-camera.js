// Camera Location for Picture Puzzle

// Draw Camera location
function drawCamera(x, y, location) {
    const width = location.width;
    const height = location.height;
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = locations.indexOf(location) === gameState.currentStage;
    
    // Camera body
    ctx.fillStyle = isCompleted ? '#757575' : '#212121'; // Dark grey/black for camera
    ctx.fillRect(x + width/4, y + height/4, width/2, height/2);
    
    // Camera lens
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#1A237E'; // Dark blue lens
    ctx.beginPath();
    ctx.arc(x + width/2, y + height/2, width/6, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner lens
    ctx.fillStyle = isCompleted ? '#616161' : '#000000';
    ctx.beginPath();
    ctx.arc(x + width/2, y + height/2, width/10, 0, Math.PI * 2);
    ctx.fill();
    
    // Flash
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#FFECB3'; // Light yellow
    ctx.fillRect(x + width/4 + width/10, y + height/4 - height/10, width/5, height/10);
    
    // Camera grip (right side)
    ctx.fillStyle = isCompleted ? '#757575' : '#37474F'; // Dark blue-grey
    ctx.fillRect(x + width*3/4, y + height/4, width/8, height/2);
    
    // Camera viewfinder
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#546E7A'; // Blue-grey
    ctx.fillRect(x + width/4, y + height/4 - height/8, width/5, height/10);
    
    // Shutter button
    ctx.fillStyle = isCompleted ? '#E0E0E0' : '#F44336'; // Red
    ctx.beginPath();
    ctx.arc(x + width*3/4 + width/16, y + height/4 + height/10, width/20, 0, Math.PI * 2);
    ctx.fill();
    
    // Camera strap attachments
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#37474F';
    ctx.fillRect(x + width/4 - width/20, y + height/3, width/20, height/10);
    ctx.fillRect(x + width*3/4 + width/8, y + height/3, width/20, height/10);
    
    // Add a photo coming out if active
    if (isActive && !isCompleted) {
      const time = Date.now() / 1000;
      const photoY = y + height/4 + height/2 + Math.sin(time * 2) * 2; // Slight bobbing
      
      // Photo frame
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + width/2 - width/6, photoY, width/3, height/4);
      
      // Photo image (simplified)
      ctx.fillStyle = '#3F51B5'; // Indigo color for photo content
      ctx.fillRect(x + width/2 - width/6 + 3, photoY + 3, width/3 - 6, height/4 - 6);
      
      // Pixel pattern to suggest image
      ctx.fillStyle = '#7986CB'; // Lighter blue
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          if ((i + j) % 2 === 0) {
            ctx.fillRect(
              x + width/2 - width/6 + 6 + i * 10, 
              photoY + 6 + j * 10, 
              8, 8
            );
          }
        }
      }
      
      // Add glow around camera
      const glowGradient = ctx.createRadialGradient(
        x + width/2, y + height/2, 10,
        x + width/2, y + height/2, width
      );
      glowGradient.addColorStop(0, 'rgba(33, 150, 243, 0.3)'); // Blue
      glowGradient.addColorStop(1, 'rgba(33, 150, 243, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 20, y - 20, width + 40, height + 40);
    }
    
    // Add small flash effect if active
    if (isActive && !isCompleted) {
      const time = Date.now() / 1000;
      if (Math.sin(time * 3) > 0.95) { // Flash every few seconds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(x + width/4 + width/10 + width/10, y + height/4 - height/20, width/12, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }