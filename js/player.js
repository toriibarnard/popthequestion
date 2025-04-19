// Player character functionality for side-scrolling view

// Player state
const player = {
    x: 150, // Starting position
    y: 450, // Fixed y-position for side-scrolling
    width: 40,
    height: 60,
    speed: 4,
    moving: false,
    direction: 'right', // Default direction is right in side-scrolling
    frame: 0,
    jumping: false,
    verticalSpeed: 0,
    onGround: true
  };
  
  // Physics constants
  const gravity = 0.5;
  const jumpStrength = 12;
  
  // Update player position and state
  function updatePlayer() {
    // Only allow movement if no interaction is active
    if (gameState.activeInteraction === null) {
      movePlayer();
      applyPhysics();
      checkLocationInteractions();
    }
    
    drawPlayer();
  }
  
  // Handle player horizontal movement
  function movePlayer() {
    // Only allow left-right movement (side-scrolling)
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
    
    // Jump when up is pressed and player is on ground
    if ((keys.ArrowUp || keys.w || keys[" "]) && player.onGround) {
      player.verticalSpeed = -jumpStrength;
      player.jumping = true;
      player.onGround = false;
      
      // Consume the space key to prevent immediate interaction
      keys[" "] = false;
    }
    
    // If no horizontal movement keys pressed, player is not moving horizontally
    if (!(keys.ArrowLeft || keys.a || keys.ArrowRight || keys.d)) {
      player.moving = false;
    }
    
    // Animation frame update
    if (player.moving) {
      player.frame = (player.frame + 0.1) % 4;
    }
  }
  
  // Apply physics (gravity, jumping)
  function applyPhysics() {
    // Apply gravity
    player.verticalSpeed += gravity;
    player.y += player.verticalSpeed;
    
    // Check floor collision
    if (player.y >= 450) { // Fixed floor position
      player.y = 450;
      player.verticalSpeed = 0;
      player.onGround = true;
      player.jumping = false;
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
      if (distance < 80) {
        showDialog("Press Space to interact", 500);
        
        // If Space is pressed and player is on ground, trigger the interaction
        if (keys[" "] && player.onGround) {
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
            case "proposal":
              showFinalQuestion();
              gameState.activeInteraction = "finalQuestion";
              break;
          }
        }
      }
    }
  }
  
  // Draw the player character
  function drawPlayer() {
    // Calculate position on screen with camera offset
    const screenX = player.x - camera.x;
    
    // Body with direction-based colors
    let bodyColor = '#FF5252'; // Base red color
    
    // Draw the player differently based on direction
    if (player.direction === 'left') {
      drawPlayerFacingLeft(screenX, player.y);
    } else {
      drawPlayerFacingRight(screenX, player.y);
    }
  }
  
  // Draw player facing left
  function drawPlayerFacingLeft(x, y) {
    // Body
    ctx.fillStyle = '#FF5252';
    ctx.fillRect(x, y, player.width, player.height);
    
    // Head
    ctx.fillStyle = '#FFB74D'; // Skin tone
    ctx.fillRect(x + 5, y + 5, player.width - 10, player.height / 3);
    
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.fillRect(x + 10, y + 15, 5, 5);
    
    // Mouth
    const mouthY = player.jumping ? y + 25 : (player.moving ? y + 20 + Math.sin(Date.now() / 200) * 3 : y + 20);
    ctx.fillRect(x + 10, mouthY, 10, 3);
    
    // Legs with walking animation
    ctx.fillStyle = '#424242';
    
    // Left leg
    const leftLegX = player.moving ? x + 10 - Math.sin(player.frame * Math.PI) * 5 : x + 10;
    const leftLegY = player.jumping ? y + player.height - 15 : y + player.height;
    ctx.fillRect(leftLegX, y + player.height - 15, 5, 15);
    
    // Right leg
    const rightLegX = player.moving ? x + 25 + Math.sin(player.frame * Math.PI) * 5 : x + 25;
    const rightLegY = player.jumping ? y + player.height - 15 : y + player.height;
    ctx.fillRect(rightLegX, y + player.height - 15, 5, 15);
    
    // Arms
    ctx.fillStyle = '#FF5252';
    
    // Left arm
    const leftArmX = player.moving ? x - 5 + Math.sin(player.frame * Math.PI) * 5 : x - 5;
    ctx.fillRect(leftArmX, y + player.height / 3, 5, player.height / 2);
    
    // Jump effect
    if (player.jumping) {
      // Dust particles
      ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
      for (let i = 0; i < 5; i++) {
        const particleX = x + Math.random() * player.width;
        const particleY = y + player.height + Math.random() * 10;
        const particleSize = 2 + Math.random() * 3;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  
  // Draw player facing right
  function drawPlayerFacingRight(x, y) {
    // Body
    ctx.fillStyle = '#FF5252';
    ctx.fillRect(x, y, player.width, player.height);
    
    // Head
    ctx.fillStyle = '#FFB74D'; // Skin tone
    ctx.fillRect(x + 5, y + 5, player.width - 10, player.height / 3);
    
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.fillRect(x + 25, y + 15, 5, 5);
    
    // Mouth
    const mouthY = player.jumping ? y + 25 : (player.moving ? y + 20 + Math.sin(Date.now() / 200) * 3 : y + 20);
    ctx.fillRect(x + 20, mouthY, 10, 3);
    
    // Legs with walking animation
    ctx.fillStyle = '#424242';
    
    // Left leg
    const leftLegX = player.moving ? x + 10 - Math.sin(player.frame * Math.PI) * 5 : x + 10;
    const leftLegY = player.jumping ? y + player.height - 15 : y + player.height;
    ctx.fillRect(leftLegX, y + player.height - 15, 5, 15);
    
    // Right leg
    const rightLegX = player.moving ? x + 25 + Math.sin(player.frame * Math.PI) * 5 : x + 25;
    const rightLegY = player.jumping ? y + player.height - 15 : y + player.height;
    ctx.fillRect(rightLegX, y + player.height - 15, 5, 15);
    
    // Arms
    ctx.fillStyle = '#FF5252';
    
    // Right arm
    const rightArmX = player.moving ? x + player.width - Math.sin(player.frame * Math.PI) * 5 : x + player.width;
    ctx.fillRect(rightArmX, y + player.height / 3, 5, player.height / 2);
    
    // Jump effect
    if (player.jumping) {
      // Dust particles
      ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
      for (let i = 0; i < 5; i++) {
        const particleX = x + Math.random() * player.width;
        const particleY = y + player.height + Math.random() * 10;
        const particleSize = 2 + Math.random() * 3;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }