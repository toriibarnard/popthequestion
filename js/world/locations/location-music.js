// Music Shop Location

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