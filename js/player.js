// Player character functionality

// Player state
const player = {
    x: 150, // Starting position
    y: 220,
    width: 40,
    height: 60,
    speed: 4,
    moving: false,
    direction: 'right', // Start facing right
    frame: 0,
    sprites: {
      up: null,
      down: null,
      left: null,
      right: null
    }
  };
  
  // Load player sprite images
  function loadPlayerSprites() {
    // For now, we'll just use colored rectangles
    // In a real game, you'd load actual sprite images here
  }
  
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
    // Check keyboard input
    if ((keys.ArrowUp || keys.w) && player.y > 0) {
      player.y -= player.speed;
      player.direction = 'up';
      player.moving = true;
    }
    if ((keys.ArrowDown || keys.s) && player.y < mapHeight - player.height) {
      player.y += player.speed;
      player.direction = 'down';
      player.moving = true;
    }
    if ((keys.ArrowLeft || keys.a) && player.x > 0) {
      player.x -= player.speed;
      player.direction = 'left';
      player.moving = true;
    }
    if ((keys.ArrowRight || keys.d) && player.x < mapWidth - player.width) {
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
  }
  
  // Check if player can interact with any locations
  function checkLocationInteractions() {
    // Handle normal stage interactions
    if (gameState.currentStage < gameState.stages.length - 1) {
      const currentStageId = gameState.stages[gameState.currentStage];
      const currentLocation = locations.find(loc => loc.id === currentStageId);
      
      if (currentLocation && !gameState.stagesCompleted[currentStageId]) {
        // Check if player is near this location
        const dx = (player.x + player.width/2) - (currentLocation.x + currentLocation.width/2);
        const dy = (player.y + player.height/2) - (currentLocation.y + currentLocation.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If player is close enough to the location
        if (distance < 60) {
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
    // Handle proposal interaction separately (only after all other stages are complete)
    else if (gameState.currentStage === gameState.stages.length - 1) {
      const proposalLocation = locations.find(loc => loc.id === "proposal");
      
      if (proposalLocation && !gameState.stagesCompleted.proposal) {
        // Check if player is near the proposal location
        const dx = (player.x + player.width/2) - (proposalLocation.x + proposalLocation.width/2);
        const dy = (player.y + player.height/2) - (proposalLocation.y + proposalLocation.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If player is close enough to the proposal spot
        if (distance < 80) {
          showDialog("Press Space to have a special moment", 500);
          
          // If Space is pressed, trigger the proposal
          if (keys[" "]) {
            // Prevent immediate re-trigger
            keys[" "] = false;
            
            // Show the proposal question directly
            showFinalQuestion();
            
            // Mark the stage as active (but not completed yet)
            gameState.activeInteraction = "finalQuestion";
          }
        }
      }
    }
  }
  
  // Draw the player character (with camera offset)
  function drawPlayer() {
    // Calculate position on screen with camera offset
    const screenX = player.x - camera.x;
    
    // Body with direction-based colors
    let bodyColor;
    switch(player.direction) {
      case 'up': bodyColor = '#FF8080'; break;
      case 'down': bodyColor = '#FF6B6B'; break;
      case 'left': bodyColor = '#FF5555'; break;
      case 'right': bodyColor = '#FF3333'; break;
    }
    
    ctx.fillStyle = bodyColor;
    ctx.fillRect(screenX, player.y, player.width, player.height);
    
    // Add face with more detailed features
    ctx.fillStyle = '#FFF';
    
    // Different face based on direction
    if (player.direction === 'left') {
      // Eyes
      ctx.fillRect(screenX + 8, player.y + 15, 8, 8);
      
      // Mouth
      if (player.moving) {
        // Animated mouth for walking
        const mouthOffset = Math.sin(Date.now() / 200) * 2;
        ctx.fillRect(screenX + 10, player.y + 35 + mouthOffset, 15, 5);
      } else {
        ctx.fillRect(screenX + 10, player.y + 35, 15, 5);
      }
    } else if (player.direction === 'right') {
      // Eyes
      ctx.fillRect(screenX + 24, player.y + 15, 8, 8);
      
      // Mouth
      if (player.moving) {
        // Animated mouth for walking
        const mouthOffset = Math.sin(Date.now() / 200) * 2;
        ctx.fillRect(screenX + 15, player.y + 35 + mouthOffset, 15, 5);
      } else {
        ctx.fillRect(screenX + 15, player.y + 35, 15, 5);
      }
    } else if (player.direction === 'up') {
      // Eyes
      ctx.fillRect(screenX + 10, player.y + 15, 8, 8);
      ctx.fillRect(screenX + 22, player.y + 15, 8, 8);
      
      // Small mouth when looking up
      ctx.fillRect(screenX + 15, player.y + 35, 10, 3);
    } else {
      // Eyes
      ctx.fillRect(screenX + 10, player.y + 15, 8, 8);
      ctx.fillRect(screenX + 22, player.y + 15, 8, 8);
      
      // Mouth
      if (player.moving) {
        // Animated mouth for walking
        const mouthOffset = Math.sin(Date.now() / 200) * 2;
        ctx.fillRect(screenX + 15, player.y + 35 + mouthOffset, 10, 5);
      } else {
        ctx.fillRect(screenX + 15, player.y + 35, 10, 5);
      }
    }
    
    // Add walking animation
    if (player.moving) {
      // Bobbing effect when walking
      const bobAmount = Math.sin(Date.now() / 150) * 2;
      ctx.fillStyle = bodyColor;
      
      // Left leg
      ctx.fillRect(
        screenX + 5, 
        player.y + player.height, 
        10, 
        5 + bobAmount
      );
      
      // Right leg
      ctx.fillRect(
        screenX + player.width - 15, 
        player.y + player.height, 
        10, 
        5 - bobAmount
      );
    }
  }