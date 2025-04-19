// Player character functionality

// Player state
const player = {
    x: 400,
    y: 500,
    width: 40,
    height: 60,
    speed: 4,
    moving: false,
    direction: 'down',
    frame: 0
  };
  
  // Update player position and state
  function updatePlayer() {
    // Only allow movement if no interaction is active
    if (gameState.activeInteraction === null) {
      movePlayer();
      checkLocationInteractions();
    }
    
    drawPlayer();
  }
  
  // Handle player movement
  function movePlayer() {
    // Previous position (for collision detection)
    const prevX = player.x;
    const prevY = player.y;
    
    // Check keyboard input
    if ((keys.ArrowUp || keys.w) && player.y > 0) {
      player.y -= player.speed;
      player.direction = 'up';
      player.moving = true;
    }
    if ((keys.ArrowDown || keys.s) && player.y < canvas.height - player.height) {
      player.y += player.speed;
      player.direction = 'down';
      player.moving = true;
    }
    if ((keys.ArrowLeft || keys.a) && player.x > 0) {
      player.x -= player.speed;
      player.direction = 'left';
      player.moving = true;
    }
    if ((keys.ArrowRight || keys.d) && player.x < canvas.width - player.width) {
      player.x += player.speed;
      player.direction = 'right';
      player.moving = true;
    }
    
    // If no keys pressed, player is not moving
    if (!(keys.ArrowUp || keys.w || keys.ArrowDown || keys.s || 
          keys.ArrowLeft || keys.a || keys.ArrowRight || keys.d)) {
      player.moving = false;
    }
    
    // Animation
    if (player.moving) {
      player.frame = (player.frame + 0.1) % 4;
    }
    
    // Check for collision with barriers
    if (checkCollisionWithBarriers()) {
      // Revert position if collision occurred
      player.x = prevX;
      player.y = prevY;
    }
  }
  
  // Check if player can interact with any locations
  function checkLocationInteractions() {
    // Only allow interaction with the current stage
    const currentStageId = gameState.stages[gameState.currentStage];
    const currentLocation = locations.find(loc => loc.id === currentStageId);
    
    if (currentLocation && !gameState.stagesCompleted[currentStageId]) {
      // Check if player is near this location
      const dx = (player.x + player.width/2) - (currentLocation.x + currentLocation.width/2);
      const dy = (player.y + player.height/2) - (currentLocation.y + currentLocation.height/2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If player is close enough to the location
      if (distance < 50) {
        showDialog("Press Space to interact", 500);
        
        // If Space is pressed, trigger the interaction
        if (keys[" "]) {
          // Prevent immediate re-trigger
          keys[" "] = false;
          
          // Start the appropriate interaction
          switch(currentStageId) {
            case "instagram":
              showInteraction("instagramInteraction");
              break;
            case "restaurant":
              showInteraction("restaurantInteraction");
              break;
            case "song":
              showInteraction("songInteraction");
              break;
            case "ramen":
              showInteraction("ramenInteraction");
              break;
          }
        }
      }
    }
  }
  
  // Check collision with map barriers
  function checkCollisionWithBarriers() {
    for (const barrier of barriers) {
      if (player.x < barrier.x + barrier.width &&
          player.x + player.width > barrier.x &&
          player.y < barrier.y + barrier.height &&
          player.y + player.height > barrier.y) {
        return true;
      }
    }
    return false;
  }
  
  // Draw the player character
  function drawPlayer() {
    // Body
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Add face
    ctx.fillStyle = '#FFF';
    
    // Different face based on direction
    if (player.direction === 'left') {
      ctx.fillRect(player.x + 8, player.y + 15, 8, 8);
      ctx.fillRect(player.x + 10, player.y + 35, 20, 5);
    } else if (player.direction === 'right') {
      ctx.fillRect(player.x + 24, player.y + 15, 8, 8);
      ctx.fillRect(player.x + 10, player.y + 35, 20, 5);
    } else if (player.direction === 'up') {
      ctx.fillRect(player.x + 10, player.y + 15, 8, 8);
      ctx.fillRect(player.x + 22, player.y + 15, 8, 8);
      ctx.fillRect(player.x + 15, player.y + 35, 10, 5);
    } else {
      ctx.fillRect(player.x + 10, player.y + 15, 8, 8);
      ctx.fillRect(player.x + 22, player.y + 15, 8, 8);
      ctx.fillRect(player.x + 15, player.y + 35, 10, 5);
    }
  }