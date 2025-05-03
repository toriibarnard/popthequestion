// Cat companion functionality
// A simple cat that follows alongside the player on the left

// Cat state
const cat = {
    x: 120,                // Starting position
    y: 510,                // Ground level (ground is at 500)
    width: 35,             // Width for the image
    height: 35,            // Height for the image
    direction: 'right',    // Facing direction
    offset: 50,            // Distance to left of player
    image: null,           // Will hold the cat image
    imageLoaded: false     // Flag to check if image is loaded
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
    cat.image.src = imagePath || "images/cat.png";
  }
  
  // Initialize cat - call this from main game.js
  function initializeCatFace(imagePath) {
    console.log("Initializing cat with:", imagePath);
    loadCatImage(imagePath || "images/cat.png");
    
    // Set initial position
    cat.x = player.x - cat.offset;
  }
  
  // Update cat position and state
  function updateCat() {
    // Update cat position to stay on player's left
    cat.x = player.x - cat.offset;
    
    // Match player's direction for image flipping
    cat.direction = player.direction;
    
    // Draw the cat
    drawCat();
  }
  
  // Draw the cat
  function drawCat() {
    // Calculate position on screen with camera offset
    const screenX = cat.x - camera.x;
    
    // Only draw cat if on screen
    if (screenX > -cat.width && screenX < canvas.width) {
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
      }
    }
  }
  
  // Add to game loop by adding these lines:
  // 1. Add this to initializeGame() in game.js after initializing the player:
  //    initializeCat('images/cat.png');
  //
  // 2. Add this to gameLoop() in engine.js after calling updatePlayer():
  //    updateCat();