// Base file for locations - containing the main functions and helpers

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
            
          case 'dateRanking':
            drawDateRanking(x, y, location);
            break;
        }
        
        // Interaction prompt if this is the active location
        if (index === gameState.currentStage && !gameState.stagesCompleted[location.id]) {
          drawInteractionPrompt(x + location.width / 2, y - 20);
        }
      }
    });
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