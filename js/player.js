// Player character functionality for 8-bit cyberpunk theme
// Designed to match the existing night city aesthetic

// Player state
const player = {
  x: 150,                // Starting position
  y: 450,                // Fixed y-position for side-scrolling
  width: 40,             // Character width
  height: 60,            // Character height
  speed: 4,              // Movement speed
  moving: false,         // Movement state
  direction: 'right',    // Facing direction
  frame: 0,              // Animation frame
  jumping: false,        // Jump state
  verticalSpeed: 0,      // Vertical movement speed
  onGround: true,        // On ground state
  neonColor: '#00FFFF',  // Default neon accent color
  neonFlash: 0,          // Neon flash animation counter
  faceImage: null,       // Will hold the face image
  faceLoaded: false      // Flag to check if face image is loaded
};

// Physics constants
const gravity = 0.5;
const jumpStrength = 12;

// Load player face image
function loadPlayerFace(imagePath) {
  player.faceImage = new Image();
  player.faceImage.onload = function() {
    console.log("Face image loaded successfully");
    player.faceLoaded = true;
  };
  player.faceImage.onerror = function() {
    console.error("Could not load face image:", imagePath);
    player.faceLoaded = false;
  };
  player.faceImage.src = imagePath || "images/face.png"; // Default filename if none provided
}

// Initialize player face - call this from main game.js
function initializePlayerFace(imagePath) {
  console.log("Initializing player face with:", imagePath);
  loadPlayerFace(imagePath || "face.png");
}

// Update player position and state
function updatePlayer() {
  // Only allow movement if no interaction is active
  if (gameState.activeInteraction === null) {
    movePlayer();
    applyPhysics();
    checkLocationInteractions();
    updateNeonEffects();
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
  
  // Jump when up arrow key is pressed and player is on ground
  if ((keys.ArrowUp || keys.w) && player.onGround) {
    player.verticalSpeed = -jumpStrength;
    player.jumping = true;
    player.onGround = false;
  }
  
  // If no horizontal movement keys pressed, player is not moving horizontally
  if (!(keys.ArrowLeft || keys.a || keys.ArrowRight || keys.d)) {
    player.moving = false;
  }
  
  // Animation frame update - slower for more pixelated look
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

// Update neon effects on the character
function updateNeonEffects() {
  // Get location-based color if near a location
  const nearbyLocation = findNearbyLocation();
  if (nearbyLocation) {
    player.neonColor = getLocationColor(nearbyLocation.id);
  } else {
    player.neonColor = '#00FFFF'; // Default cyan
  }
  
  // Update neon flash counter for animation
  player.neonFlash = (player.neonFlash + 0.05) % 1;
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
          case "camera":
            showInteraction("cameraInteraction");
            break;
          case "dateRanking":
            showInteraction("dateRankingInteraction");
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
  
  // Draw the player differently based on direction
  if (player.direction === 'left') {
    drawPlayerFacingLeft(screenX, player.y);
  } else {
    drawPlayerFacingRight(screenX, player.y);
  }
}

// Draw player facing left
function drawPlayerFacingRight(x, y) {
  const pixelSize = 2; // Size of pixels for 8-bit look
  const width = player.width;
  const height = player.height;
  const moving = player.moving;
  const frame = player.frame;
  
  // Calculate leg positions based on animation frame
  let leftLegOffset = 0;
  let rightLegOffset = 0;
  
  if (moving) {
    // Sine wave movement for smooth step animation
    leftLegOffset = Math.sin(frame * Math.PI) * 6;
    rightLegOffset = -Math.sin(frame * Math.PI) * 6;
  }
  
  // Neck
  ctx.fillStyle = '#F5D0A9'; // Light skin tone
  ctx.fillRect(x + width/2 - 3, y + height/3, 6, 5);
  
  // Head outline
  ctx.fillStyle = '#F5D0A9'; // Light skin tone for head
  ctx.beginPath();
  ctx.arc(x + width/2, y + height/6, width/2 - 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Face - either custom image or drawn
  if (player.faceLoaded && player.faceImage) {
    // Draw the face image but flip it horizontally for left direction
    ctx.save();
    ctx.translate(x + width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(
      player.faceImage, 
      0, 
      -6,  // Move face up by 15 pixels
      width, 
      height/2   // Increased height for face image
    );
    ctx.restore();
  } else {
    // Fallback drawn face
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(x + width/2 - 8, y + height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + width/2 + 8, y + height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    const mouthY = player.jumping ? y + height/6 + 10 : (moving ? y + height/6 + 5 + Math.sin(Date.now() / 200) * 3 : y + height/6 + 5);
    ctx.beginPath();
    ctx.arc(x + width/2, mouthY, 5, 0, Math.PI, false);
    ctx.stroke();
  }
  
  // Hair accents - cyberpunk style but moved to not block face
  ctx.fillStyle = player.neonColor;
  // Hair highlight/streak moved to the side
  ctx.fillRect(x + width/2 - 16, y + height/6 - 15, pixelSize * 3, pixelSize * 8);
  
  // Body - cyberpunk jacket (feminine fit)
  ctx.fillStyle = '#222222';
  ctx.beginPath();
  ctx.moveTo(x + width/2 - 12, y + height/3 + 5);  // Move torso down by 5 pixels
  ctx.lineTo(x + width/2 + 12, y + height/3 + 5);  // Move torso down by 5 pixels
  ctx.lineTo(x + width/2 + 15, y + height/3 + height/3);
  ctx.lineTo(x + width/2 - 15, y + height/3 + height/3);
  ctx.closePath();
  ctx.fill();
  
  // Jacket details - lighter accent
  ctx.fillStyle = '#444444';
  ctx.fillRect(x + width/2 - 15, y + height/3 + 5, pixelSize * 1, pixelSize * 15);  // Moved down by 5 pixels
  ctx.fillRect(x + width/2 + 14, y + height/3 + 5, pixelSize * 1, pixelSize * 15);  // Moved down by 5 pixels
  
  // Neon trim on jacket
  ctx.fillStyle = player.neonColor;
  ctx.fillRect(x + width/2 - 17, y + height/3 + 10, pixelSize * 2, height/3 - 10);  // Moved down by 5 pixels
  
  // Legs with walking animation
  ctx.fillStyle = '#5C6BC0'; // Darker indigo
  
  // Left leg
  const leftLegX = x + width/2 - 12 - leftLegOffset;
  ctx.fillRect(leftLegX, y + height - 15, 8, 15);
  
  // Right leg
  const rightLegX = x + width/2 + 4 + rightLegOffset;
  ctx.fillRect(rightLegX, y + height - 15, 8, 15);
  
  // Pants
  ctx.fillStyle = '#7986CB'; // Light indigo pants
  ctx.beginPath();
  ctx.moveTo(x + width/2 - 15, y + height/3 + height/3);
  ctx.lineTo(x + width/2 + 15, y + height/3 + height/3);
  ctx.lineTo(x + width/2 + 15, y + height - 15);
  ctx.lineTo(x + width/2 - 15, y + height - 15);
  ctx.closePath();
  ctx.fill();
  
  // Arms
  ctx.fillStyle = '#222222';
  
  // Left arm with animation
  const leftArmX = x + width/2 - 20 + leftLegOffset;
  ctx.fillRect(leftArmX, y + height/3 + 5, 5, height/3);
  
  // Tech accessory on wrist (cyberpunk bracelet)
  ctx.fillStyle = player.neonColor;
  ctx.fillRect(leftArmX, y + height/3 + 5 + height/3 - 8, 5, 5);
  
  // Jump effect
  if (player.jumping) {
    drawJumpEffect(x, y + height, pixelSize);
  }
}

// Draw player facing right
function drawPlayerFacingLeft(x, y) {
  const pixelSize = 2; // Size of pixels for 8-bit look
  const width = player.width;
  const height = player.height;
  const moving = player.moving;
  const frame = player.frame;
  
  // Calculate leg positions based on animation frame
  let leftLegOffset = 0;
  let rightLegOffset = 0;
  
  if (moving) {
    // Sine wave movement for smooth step animation
    leftLegOffset = Math.sin(frame * Math.PI) * 6;
    rightLegOffset = -Math.sin(frame * Math.PI) * 6;
  }
  
  // Neck
  ctx.fillStyle = '#F5D0A9'; // Light skin tone
  ctx.fillRect(x + width/2 - 3, y + height/3, 6, 5);
  
  // Head outline
  ctx.fillStyle = '#F5D0A9'; // Light skin tone for head
  ctx.beginPath();
  ctx.arc(x + width/2, y + height/6, width/2 - 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Face - use custom image (face.png)
  if (player.faceLoaded && player.faceImage) {
    // Draw the face image
    ctx.drawImage(
      player.faceImage, 
      x, 
      y - 6,  // Move face up by 15 pixels
      width, 
      height/2   // Increased height for face image
    );
  } else {
    // Fallback drawn face
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(x + width/2 - 8, y + height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + width/2 + 8, y + height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    const mouthY = player.jumping ? y + height/6 + 10 : (moving ? y + height/6 + 5 + Math.sin(Date.now() / 200) * 3 : y + height/6 + 5);
    ctx.beginPath();
    ctx.arc(x + width/2, mouthY, 5, 0, Math.PI, false);
    ctx.stroke();
  }
  
  // Hair accents - cyberpunk style but moved to not block face
  ctx.fillStyle = player.neonColor;
  // Hair highlight/streak moved to the side
  ctx.fillRect(x + width/2 + 14, y + height/6 - 15, pixelSize * 3, pixelSize * 8);
  
  // Body - cyberpunk jacket (feminine fit)
  ctx.fillStyle = '#222222';
  ctx.beginPath();
  ctx.moveTo(x + width/2 - 12, y + height/3);
  ctx.lineTo(x + width/2 + 12, y + height/3);
  ctx.lineTo(x + width/2 + 15, y + height/3 + height/3);
  ctx.lineTo(x + width/2 - 15, y + height/3 + height/3);
  ctx.closePath();
  ctx.fill();
  
  // Jacket details - lighter accent
  ctx.fillStyle = '#444444';
  ctx.fillRect(x + width/2 - 15, y + height/3, pixelSize * 1, pixelSize * 15);
  ctx.fillRect(x + width/2 + 14, y + height/3, pixelSize * 1, pixelSize * 15);
  
  // Neon trim on jacket
  ctx.fillStyle = player.neonColor;
  ctx.fillRect(x + width/2 + 15, y + height/3 + 10, pixelSize * 2, height/3 - 10);  // Moved down by 5 pixels
  
  // Legs with walking animation
  ctx.fillStyle = '#5C6BC0'; // Darker indigo
  
  // Left leg
  const leftLegX = x + width/2 - 12 - leftLegOffset;
  ctx.fillRect(leftLegX, y + height - 15, 8, 15);
  
  // Right leg
  const rightLegX = x + width/2 + 4 + rightLegOffset;
  ctx.fillRect(rightLegX, y + height - 15, 8, 15);
  
  // Pants
  ctx.fillStyle = '#7986CB'; // Light indigo pants
  ctx.beginPath();
  ctx.moveTo(x + width/2 - 15, y + height/3 + height/3);
  ctx.lineTo(x + width/2 + 15, y + height/3 + height/3);
  ctx.lineTo(x + width/2 + 15, y + height - 15);
  ctx.lineTo(x + width/2 - 15, y + height - 15);
  ctx.closePath();
  ctx.fill();
  
  // Arms
  ctx.fillStyle = '#222222';
  
  // Right arm with animation
  const rightArmX = x + width/2 + 15 + rightLegOffset;
  ctx.fillRect(rightArmX, y + height/3 + 5, 5, height/3);
  
  // Tech accessory on wrist (cyberpunk bracelet)
  ctx.fillStyle = player.neonColor;
  ctx.fillRect(rightArmX, y + height/3 + 5 + height/3 - 8, 5, 5);
  
  // Jump effect
  if (player.jumping) {
    drawJumpEffect(x, y + height, pixelSize);
  }
}

// Draw neon effects and glow
function drawNeonEffects(x, y, pixelSize, rgbNeon, opacity) {
  const width = player.width;
  const height = player.height;
  
  // Create neon glow effect for various parts
  ctx.fillStyle = `rgba(${rgbNeon.r}, ${rgbNeon.g}, ${rgbNeon.b}, ${opacity * 0.2})`;
  
  // Hair highlight glow moved farther to not block face
  if (player.direction === 'right') {
    ctx.fillRect(
      x + width/2 + 13, 
      y + height/6 - 16, 
      pixelSize * 5, 
      pixelSize * 10
    );
  } else {
    ctx.fillRect(
      x + width/2 - 18, 
      y + height/6 - 16, 
      pixelSize * 5, 
      pixelSize * 10
    );
  }
  
  // Wrist accessory glow
  const armPos = player.direction === 'right' ? 
    x + width/2 + 14 : 
    x + width/2 - 20;
  
  ctx.fillRect(
    armPos - pixelSize, 
    y + height/3 + height/3 - 10, 
    pixelSize * 7, 
    pixelSize * 7
  );
  
  // Occasional neon pulse effect
  const time = Date.now() / 1000;
  if (Math.sin(time * 2) > 0.7) {
    // Enhanced glow during pulse
    ctx.fillStyle = `rgba(${rgbNeon.r}, ${rgbNeon.g}, ${rgbNeon.b}, ${opacity * 0.3})`;
    
    // Jacket neon trim glow
    if (player.direction === 'right') {
      ctx.fillRect(
        x + width/2 + 14, 
        y + height/3, 
        pixelSize * 4, 
        height/3
      );
    } else {
      ctx.fillRect(
        x + width/2 - 18, 
        y + height/3, 
        pixelSize * 4, 
        height/3
      );
    }
  }
}

// Draw jump effect with pixelated dust/energy
function drawJumpEffect(x, y, pixelSize) {
  const width = player.width;
  
  // Pixel dust particles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  
  // Create random pixel dust
  for (let i = 0; i < 8; i++) {
    const particleX = x + Math.floor(Math.random() * width / pixelSize) * pixelSize;
    const particleY = y + Math.floor(Math.random() * pixelSize * 3 / pixelSize) * pixelSize;
    const particleSize = Math.floor((1 + Math.random() * 2)) * pixelSize;
    
    ctx.fillRect(particleX, particleY, particleSize, particleSize);
  }
  
  // Neon particles from shoes
  const rgbNeon = hexToRgb(player.neonColor);
  
  for (let i = 0; i < 5; i++) {
    const neonX = x + width/2 - 10 + Math.floor(Math.random() * 20 / pixelSize) * pixelSize;
    const neonY = y - Math.floor(Math.random() * 5 / pixelSize) * pixelSize;
    
    // Create sparkle effect with diminishing opacity
    ctx.fillStyle = `rgba(${rgbNeon.r}, ${rgbNeon.g}, ${rgbNeon.b}, ${0.8 - i * 0.15})`;
    ctx.fillRect(neonX, neonY, pixelSize * 2, pixelSize * 2);
  }
  
  // Neon jump line beneath shoes
  ctx.fillStyle = player.neonColor;
  ctx.fillRect(x + width/2 - pixelSize * 5, y, pixelSize * 10, pixelSize);
}

// Find the closest interactive location to the player
function findNearbyLocation() {
  let closestDist = 150; // Max detection radius
  let closestLocation = null;
  
  locations.forEach(location => {
    const dx = (player.x + player.width/2) - (location.x + location.width/2);
    const dy = (player.y + player.height/2) - (location.y + location.height/2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < closestDist) {
      closestDist = distance;
      closestLocation = location;
    }
  });
  
  return closestLocation;
}

// Get color based on location type
function getLocationColor(locationType) {
  switch(locationType) {
    case 'instagram': return '#E1306C'; // Instagram pink
    case 'restaurant': return '#D4AF37'; // Gold
    case 'song': return '#1DB954'; // Spotify green
    case 'ramen': return '#FF5722'; // Orange
    case 'proposal': return '#FF4081'; // Pink
    default: return '#00FFFF'; // Default cyan
  }
}

// Helper function to convert hex color to RGB
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