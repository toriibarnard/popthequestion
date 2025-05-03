// Cat companion functionality
// A simple cat that follows alongside the player on the left

// Cat state - using similar structure to guide
const catChar = {
    x: 120,                // Starting position
    y: 510,                // Ground level (ground is at 500)
    width: 35,             // Width for the image
    height: 35,            // Height for the image
    direction: 'right',    // Facing direction
    offset: 50,            // Distance to left of player
    image: null,           // Will hold the cat image
    imageLoaded: false,    // Flag to check if image is loaded
    jumping: false,        // Jump state
    verticalSpeed: 0,      // Vertical movement speed
    onGround: true,        // On ground state
    lastJumpTime: 0,       // Time tracking for jumping
    meowTimer: 0,          // Timer for occasional meows
    meowDuration: 0,       // How long to show the current meow
    meowText: ""           // Current meow text
  };
  
  // Load cat image
  function loadCatImage(imagePath) {
    catChar.image = new Image();
    catChar.image.onload = function() {
      console.log("Cat image loaded successfully");
      catChar.imageLoaded = true;
    };
    catChar.image.onerror = function() {
      console.error("Could not load cat image:", imagePath);
      catChar.imageLoaded = false;
    };
    catChar.image.src = imagePath || "images/cat.png";
  }
  
  // Initialize cat - call this from main game.js
  function initializeCatFace(imagePath) {
    console.log("Initializing cat with:", imagePath);
    loadCatImage(imagePath || "images/cat.png");
    
    // Set initial position
    catChar.x = player.x - catChar.offset;
    
    // Initialize timers
    catChar.lastJumpTime = Date.now();
    catChar.meowTimer = Date.now() + Math.random() * 8000;
  }
  
  // Update cat position and state
  function updateCat() {
    // Only update if no interaction is active
    if (gameState.activeInteraction === null) {
      // Update cat position to stay on player's left
      catChar.x = player.x - catChar.offset;
      
      // Match player's direction for image flipping
      catChar.direction = player.direction;
      
      // Random jumps occasionally (using guide character logic)
      checkForRandomJump();
      
      // Apply physics - using guide character logic
      applyPhysicsForCat();
      
      // Check if it's time for a meow
      updateMeows();
    }
    
    // Draw the cat
    drawCat();
  }
  
  // Check for random jumps - using similar logic to guide character
  function checkForRandomJump() {
    // Only jump if on ground and after cooldown period
    const currentTime = Date.now();
    if (catChar.onGround && (currentTime - catChar.lastJumpTime > 1000)) {
      // Random chance to jump (approximately every 5-10 seconds)
      if (Math.random() < 0.01) {
        catChar.verticalSpeed = -8; // Slightly weaker jump than player
        catChar.jumping = true;
        catChar.onGround = false;
        catChar.lastJumpTime = currentTime;
      }
    }
  }
  
  // Apply physics for cat jumping - using similar logic to guide character
  function applyPhysicsForCat() {
    // Apply gravity with consistent physics
    catChar.verticalSpeed += 0.5; // Gravity strength
    catChar.y += catChar.verticalSpeed;
    
    // Check floor collision
    if (catChar.y >= 510) { // Cat's floor level
      catChar.y = 510;
      catChar.verticalSpeed = 0;
      catChar.onGround = true;
      catChar.jumping = false;
    }
  }
  
  // Handle occasional meows
  function updateMeows() {
    const currentTime = Date.now();
    
    // Decrease meow duration if active
    if (catChar.meowDuration > 0) {
      catChar.meowDuration -= 16; // Assuming ~60fps
      
      // Clear meow when duration is up
      if (catChar.meowDuration <= 0) {
        catChar.meowText = "";
      }
    } 
    // Otherwise, check if it's time for a new meow
    else if (currentTime > catChar.meowTimer) {
      // Random meow options
      const meows = [
        "Meow!", 
        "RAWR", 
        "PUMPKIN", 
      ];
      
      // 80% chance to actually meow when timer is up
      if (Math.random() > 0.2) {
        // Set a new meow
        catChar.meowText = meows[Math.floor(Math.random() * meows.length)];
        catChar.meowDuration = 2000 + Math.random() * 1000; // 2-3 seconds
      }
      
      // Reset timer (1-2 seconds)
      catChar.meowTimer = currentTime + 200 + Math.random() * 500;
    }
  }
  
  // Draw the cat
  function drawCat() {
    // Calculate position on screen with camera offset
    const screenX = catChar.x - camera.x;
    
    // Only draw cat if on screen
    if (screenX > -catChar.width && screenX < canvas.width) {
      // Draw speech bubble first if there's a meow
      if (catChar.meowText) {
        drawCatSpeechBubble(screenX, catChar.y, catChar.meowText);
      }
      
      // Draw the cat image
      if (catChar.imageLoaded && catChar.image) {
        if (catChar.direction === 'left') {
          // Flip image horizontally for left direction
          ctx.save();
          ctx.translate(screenX + catChar.width, catChar.y - catChar.height);
          ctx.scale(-1, 1);
          ctx.drawImage(catChar.image, 0, 0, catChar.width, catChar.height);
          ctx.restore();
        } else {
          // Normal drawing for right direction
          ctx.drawImage(catChar.image, screenX, catChar.y - catChar.height, catChar.width, catChar.height);
        }
      }
    }
  }
  
  // Draw cat speech bubble similar to guide speech bubble
  function drawCatSpeechBubble(x, y, message) {
    const bubbleMargin = 10;
    const bubblePadding = 8;
    const bubbleArrowHeight = 10;
    
    ctx.font = '12px Arial';
    
    // Split message into multiple lines if it's too long
    const maxWidth = 100; // Smaller width for cat bubble
    let words = message.split(' ');
    let lines = [];
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
      let testLine = currentLine + ' ' + words[i];
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      
      if (testWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    
    // Calculate bubble dimensions based on text
    const lineHeight = 15;
    const bubbleHeight = lines.length * lineHeight + bubblePadding * 2;
    let maxLineWidth = 0;
    
    for (let i = 0; i < lines.length; i++) {
      let metrics = ctx.measureText(lines[i]);
      let lineWidth = metrics.width;
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    
    const bubbleWidth = maxLineWidth + bubblePadding * 2;
    
    // Position bubble above character
    const bubbleX = x - (bubbleWidth / 2) + (catChar.width / 2);
    const bubbleY = y - 35 - bubbleHeight;
    
    // Draw bubble background with rounded corners
    ctx.fillStyle = 'rgba(255, 200, 200, 0.7)'; // Pinkish for cat
    ctx.beginPath();
    ctx.moveTo(bubbleX + bubblePadding, bubbleY);
    ctx.lineTo(bubbleX + bubbleWidth - bubblePadding, bubbleY);
    ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + bubblePadding);
    ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - bubblePadding);
    ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - bubblePadding, bubbleY + bubbleHeight);
    ctx.lineTo(bubbleX + (bubbleWidth / 2) + 10, bubbleY + bubbleHeight);
    ctx.lineTo(bubbleX + (bubbleWidth / 2), bubbleY + bubbleHeight + bubbleArrowHeight);
    ctx.lineTo(bubbleX + (bubbleWidth / 2) - 10, bubbleY + bubbleHeight);
    ctx.lineTo(bubbleX + bubblePadding, bubbleY + bubbleHeight);
    ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - bubblePadding);
    ctx.lineTo(bubbleX, bubbleY + bubblePadding);
    ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + bubblePadding, bubbleY);
    ctx.closePath();
    ctx.fill();
    
    // Add neon border glow
    ctx.strokeStyle = '#FF9999'; // Pinkish border for cat
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw text
    ctx.fillStyle = '#000000'; // Black text
    ctx.textAlign = 'left';
    
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], bubbleX + bubblePadding, bubbleY + bubblePadding + (i + 1) * lineHeight);
    }
  }
  
  // Add to game loop by adding these lines:
  // 1. Add this to initializeGame() in game.js after initializing the player:
  //    initializeCatFace('images/cat.png');
  //
  // 2. Add this to gameLoop() in engine.js after calling updatePlayer():
  //    updateCat();