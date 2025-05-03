// Cat companion functionality
// A simple cat that follows alongside the player on the left

// Cat state
const cat = {
    x: 100,                // Starting position
    y: 470,                // Fixed y-position (higher value = lower on screen, closer to ground)
    width: 30,             // Width for the image
    height: 25,            // Height for the image (smaller height to keep it low)
    direction: 'right',    // Facing direction - will match player's direction
    jumping: false,        // Jump state
    verticalSpeed: 0,      // Vertical movement speed
    onGround: true,        // On ground state
    meowTimer: 0,          // Timer for occasional meows
    meowDuration: 0,       // How long to show the current meow
    meowText: "",          // Current meow text
    image: null,           // Will hold the cat image
    imageLoaded: false,    // Flag to check if image is loaded
    offset: 50             // Distance to left of player
  };
  
  // Load cat image
  function loadCatImage(imagePath) {
    cat.image = new Image();
    cat.image.onload = function() {
      console.log("Cat image loaded successfully");
      cat.imageLoaded = true;
    };
    cat.image.onerror = function() {
      console.error("Could not load cat image:", imagePath);
      cat.imageLoaded = false;
    };
    cat.image.src = imagePath || "images/cat.png"; // Default filename if none provided
  }
  
  // Initialize cat - call this from main game.js
  function initializeCat(imagePath) {
    console.log("Initializing cat with:", imagePath);
    loadCatImage(imagePath || "images/cat.png");
    
    // Set initial position
    cat.x = player.x - cat.offset;
    
    // Initialize meow timer with random start
    cat.meowTimer = Math.random() * 10000;
  }
  
  // Update cat position and state
  function updateCat() {
    // Only update if no interaction is active
    if (gameState.activeInteraction === null) {
      moveCat();
      applyPhysics();
      updateMeows();
    }
    
    drawCat();
  }
  
  // Handle cat movement to follow player
  function moveCat() {
    // Always stay on player's left side
    cat.x = player.x - cat.offset;
    
    // Match player's direction for image flipping
    cat.direction = player.direction;
    
    // Jump when the player jumps, but with slight delay for cute effect
    if (player.jumping && cat.onGround && Math.random() > 0.2) {
      cat.verticalSpeed = -8; // Slightly weaker jump for small cat
      cat.jumping = true;
      cat.onGround = false;
    }
  }
  
  // Apply physics (gravity, jumping)
  function applyPhysics() {
    // Apply gravity
    cat.verticalSpeed += gravity * 0.8; // Slightly less gravity for floaty cat jumps
    cat.y += cat.verticalSpeed;
    
    // Check floor collision
    if (cat.y >= 470) { // Cat's ground position (higher value = lower on screen)
      cat.y = 470;
      cat.verticalSpeed = 0;
      cat.onGround = true;
      cat.jumping = false;
    }
  }
  
  // Handle occasional meows
  function updateMeows() {
    const currentTime = Date.now();
    
    // Decrease meow duration if active
    if (cat.meowDuration > 0) {
      cat.meowDuration -= 16; // Assuming ~60fps
      
      // Clear meow when duration is up
      if (cat.meowDuration <= 0) {
        cat.meowText = "";
      }
    } 
    // Otherwise, check if it's time for a new meow
    else if (currentTime > cat.meowTimer) {
      // Random meow options
      const meows = [
        "Meow!", 
        "Purr...", 
        "Mrow?", 
        "Mew!", 
        "Mrrp!"
      ];
      
      // Set a new meow
      cat.meowText = meows[Math.floor(Math.random() * meows.length)];
      cat.meowDuration = 2000 + Math.random() * 1000; // 2-3 seconds
      
      // Set timer for next meow (8-15 seconds)
      cat.meowTimer = currentTime + 8000 + Math.random() * 7000;
    }
  }
  
  // Draw the cat
  function drawCat() {
    // Calculate position on screen with camera offset
    const screenX = cat.x - camera.x;
    
    // Only draw cat if on screen
    if (screenX > -cat.width && screenX < canvas.width) {
      // Draw speech bubble first if there's a meow
      if (cat.meowText) {
        drawCatSpeechBubble(screenX, cat.y);
      }
      
      // Draw the cat image
      if (cat.imageLoaded && cat.image) {
        if (cat.direction === 'left') {
          // Flip image horizontally for left direction
          ctx.save();
          ctx.translate(screenX + cat.width, cat.y - cat.height);
          ctx.scale(-1, 1);
          ctx.drawImage(cat.image, 0, 0, cat.width, cat.height);
          ctx.restore();
        } else {
          // Normal drawing for right direction
          ctx.drawImage(cat.image, screenX, cat.y - cat.height, cat.width, cat.height);
        }
      } else {
        // Fallback - just draw a rectangle if image fails to load
        ctx.fillStyle = 'gray';
        ctx.fillRect(screenX, cat.y - cat.height, cat.width, cat.height);
      }
    }
  }
  
  // Draw cat speech bubble with meow text
  function drawCatSpeechBubble(x, y) {
    const width = cat.width;
    const bubbleWidth = cat.meowText.length * 8 + 10;
    const bubbleHeight = 20;
    const bubbleX = x + width/2 - bubbleWidth/2;
    const bubbleY = y - cat.height - 20; // Position bubble above the cat
    
    // Bubble background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.moveTo(bubbleX, bubbleY);
    ctx.lineTo(bubbleX + bubbleWidth, bubbleY);
    ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight);
    ctx.lineTo(bubbleX + bubbleWidth/2 + 5, bubbleY + bubbleHeight);
    ctx.lineTo(bubbleX + bubbleWidth/2, bubbleY + bubbleHeight + 8);
    ctx.lineTo(bubbleX + bubbleWidth/2 - 5, bubbleY + bubbleHeight);
    ctx.lineTo(bubbleX, bubbleY + bubbleHeight);
    ctx.closePath();
    ctx.fill();
    
    // Bubble border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Meow text
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(cat.meowText, bubbleX + bubbleWidth/2, bubbleY + bubbleHeight/2);
  }
  
  // Add to game loop by adding these lines:
  // 1. Add this to initializeGame() in game.js after initializing the player:
  //    initializeCat('images/cat.png');
  //
  // 2. Add this to gameLoop() in engine.js after calling updatePlayer():
  //    updateCat();