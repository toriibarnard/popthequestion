// Date Ranking Location - New location for ranking our best dates

// Draw Date Ranking location (a fancy display board)
function drawDateRanking(x, y, location) {
    const width = location.width;
    const height = location.height;
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = locations.indexOf(location) === gameState.currentStage;
    
    // Main structure - digital display board 
    ctx.fillStyle = isCompleted ? '#757575' : '#263238'; // Dark blue-grey
    ctx.fillRect(x, y, width, height);
    
    // Screen frame
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#546E7A'; // Lighter blue-grey
    ctx.fillRect(x + 5, y + 5, width - 10, height - 10);
    
    // Screen
    ctx.fillStyle = isCompleted ? '#616161' : '#0D47A1'; // Deep blue 
    ctx.fillRect(x + 10, y + 25, width - 20, height - 35);
    
    // Title bar
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#1565C0'; // Medium blue
    ctx.fillRect(x + 10, y + 10, width - 20, 15);
    
    // Title text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("OUR DATES RANKING", x + width / 2, y + 20);
    
    // Control buttons
    for (let i = 0; i < 3; i++) {
      const buttonX = x + width - 25 + i * 8;
      ctx.fillStyle = isCompleted ? '#9E9E9E' : ['#F44336', '#FFC107', '#4CAF50'][i]; // Red, Yellow, Green
      ctx.beginPath();
      ctx.arc(buttonX, y + 17, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Decorative keyboard/control panel
    ctx.fillStyle = isCompleted ? '#9E9E9E' : '#455A64'; // Blue-grey
    ctx.fillRect(x + width / 4, y + height - 15, width / 2, 10);
    
    // Display content - show date rankings
    if (isActive || isCompleted) {
      const dates = [
        { name: "Picnic at Sunset", rank: 1 },
        { name: "Beach Day", rank: 2 },
        { name: "Movie Night", rank: 3 },
        { name: "Hiking Trip", rank: 4 },
        { name: "Dinner Date", rank: 5 }
      ];
      
      // Screen content area
      const contentX = x + 20;
      const contentY = y + 40;
      const contentWidth = width - 40;
      const contentHeight = height - 60;
      
      // Draw list of dates
      dates.forEach((date, index) => {
        const itemY = contentY + 15 + index * 20;
        
        // Rank number with background
        ctx.fillStyle = isCompleted ? '#9E9E9E' : 
          (index === 0 ? '#FFD700' : // Gold
           index === 1 ? '#C0C0C0' : // Silver
           index === 2 ? '#CD7F32' : // Bronze
           '#607D8B'); // Blue grey for others
        
        ctx.beginPath();
        ctx.arc(contentX + 10, itemY - 5, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Rank number
        ctx.fillStyle = '#000000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(date.rank, contentX + 10, itemY - 2);
        
        // Date name
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '9px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(date.name, contentX + 25, itemY);
        
        // Decorative line
        ctx.strokeStyle = isCompleted ? '#757575' : '#4FC3F7'; // Light blue
        ctx.beginPath();
        ctx.moveTo(contentX, itemY + 5);
        ctx.lineTo(contentX + contentWidth - 20, itemY + 5);
        ctx.stroke();
      });
      
      // Add heart icons for the top dates
      for (let i = 0; i < 3; i++) {
        const itemY = contentY + 15 + i * 20;
        const hearts = 3 - i; // 3 hearts for 1st, 2 for 2nd, 1 for 3rd
        
        for (let h = 0; h < hearts; h++) {
          const heartX = contentX + contentWidth - 15 - h * 12;
          ctx.fillStyle = isCompleted ? '#9E9E9E' : '#FF4081'; // Pink
          drawSmallHeart(heartX, itemY - 5, 4);
        }
      }
    }
    
    // Add technology elements
    if (!isCompleted) {
      // Glowing elements
      const time = Date.now() / 1000;
      
      // Blinking cursor
      if (Math.floor(time) % 2 === 0) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x + 40, y + height - 40, 5, 10);
      }
      
      // Glowing LED lights on the control panel
      for (let i = 0; i < 5; i++) {
        const ledX = x + width / 4 + 10 + i * (width / 2 - 20) / 4;
        ctx.fillStyle = ['#F44336', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0'][i % 5]; // Various colors
        ctx.beginPath();
        ctx.arc(ledX, y + height - 10, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow
        const glow = ctx.createRadialGradient(
          ledX, y + height - 10, 1,
          ledX, y + height - 10, 5
        );
        glow.addColorStop(0, ['rgba(244,67,54,0.7)', 'rgba(33,150,243,0.7)', 'rgba(76,175,80,0.7)', 'rgba(255,193,7,0.7)', 'rgba(156,39,176,0.7)'][i % 5]);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ledX, y + height - 10, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Add subtle glow if active
    if (isActive && !isCompleted) {
      const glowGradient = ctx.createRadialGradient(
        x + width / 2, y + height / 2, 10,
        x + width / 2, y + height / 2, 80
      );
      glowGradient.addColorStop(0, 'rgba(33, 150, 243, 0.3)'); // Blue
      glowGradient.addColorStop(1, 'rgba(33, 150, 243, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - 30, y - 30, width + 60, height + 60);
    }
  }
  
  // Helper function to draw a small heart
  function drawSmallHeart(x, y, size) {
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