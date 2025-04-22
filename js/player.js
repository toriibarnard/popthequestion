// Player character functionality for side-scrolling view
// Now supports custom face image

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
  onGround: true,
  faceImage: null, // Will hold the face image
  faceLoaded: false // Flag to check if face image is loaded
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
  loadPlayerFace(imagePath);
}

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
  
  // Jump when up arrow key is pressed and player is on ground
  // Removed space bar as jump control so it can be used for interactions
  if ((keys.ArrowUp || keys.w) && player.onGround) {
    player.verticalSpeed = -jumpStrength;
    player.jumping = true;
    player.onGround = false;
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
function drawPlayerFacingLeft(x, y) {
  // Neck
  ctx.fillStyle = '#F5D0A9'; // Light skin tone
  ctx.fillRect(x + player.width/2 - 3, y + player.height/3, 6, 5);
  
  // Head outline
  ctx.fillStyle = '#F5D0A9'; // Light skin tone for head
  ctx.beginPath();
  ctx.arc(x + player.width/2, y + player.height/6, player.width/2 - 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Face - either custom image or drawn
  if (player.faceLoaded && player.faceImage) {
    // Draw the face image but flip it horizontally for left direction
    ctx.save();
    ctx.translate(x + player.width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(
      player.faceImage, 
      0, 
      0, 
      player.width, 
      player.height/3
    );
    ctx.restore();
  } else {
    // Fallback drawn face
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(x + player.width/2 - 8, y + player.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + player.width/2 + 8, y + player.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    const mouthY = player.jumping ? y + player.height/6 + 10 : (player.moving ? y + player.height/6 + 5 + Math.sin(Date.now() / 200) * 3 : y + player.height/6 + 5);
    ctx.beginPath();
    ctx.arc(x + player.width/2, mouthY, 5, 0, Math.PI, false);
    ctx.stroke();
  }
  
  // Body - shirt
  ctx.fillStyle = '#87CEEB'; // Light blue shirt
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 - 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 - 15, y + player.height/3 + player.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Jacket/hoodie
  ctx.fillStyle = '#E0E0E0'; // Light gray hoodie
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 - 15, y + player.height/3);
  ctx.lineTo(x + player.width/2 - 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 - 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 - 18, y + player.height/3 + player.height/3);
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 + 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 18, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3 + player.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Pants
  ctx.fillStyle = '#7986CB'; // Light indigo pants
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 - 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height - 15);
  ctx.lineTo(x + player.width/2 - 15, y + player.height - 15);
  ctx.closePath();
  ctx.fill();
  
  // Neon trim on jacket - different colors based on interaction with locations
  const nearbyLocation = findNearbyLocation();
  ctx.fillStyle = nearbyLocation ? getLocationColor(nearbyLocation.id) : '#00FFFF';
  ctx.fillRect(x + player.width/2 - 18, y + player.height/3 + 5, 2, player.height/3 - 10);
  
  // Legs with walking animation
  // Left leg
  const leftLegX = player.moving ? x + player.width/2 - 12 - Math.sin(player.frame * Math.PI) * 5 : x + player.width/2 - 12;
  ctx.fillStyle = '#5C6BC0'; // Darker indigo
  ctx.fillRect(leftLegX, y + player.height - 15, 8, 15);
  
  // Right leg
  const rightLegX = player.moving ? x + player.width/2 + 4 + Math.sin(player.frame * Math.PI) * 5 : x + player.width/2 + 4;
  ctx.fillStyle = '#5C6BC0'; // Darker indigo
  ctx.fillRect(rightLegX, y + player.height - 15, 8, 15);
  
  // Arms
  ctx.fillStyle = '#E0E0E0'; // Light gray hoodie
  
  // Left arm
  const leftArmX = player.moving ? x + player.width/2 - 20 + Math.sin(player.frame * Math.PI) * 5 : x + player.width/2 - 20;
  ctx.fillRect(leftArmX, y + player.height/3 + 5, 5, player.height/3);
  
  // Jump effect
  if (player.jumping) {
    drawJumpEffect(x, y);
  }
}

// Draw player facing right
function drawPlayerFacingRight(x, y) {
  // Neck
  ctx.fillStyle = '#F5D0A9'; // Light skin tone
  ctx.fillRect(x + player.width/2 - 3, y + player.height/3, 6, 5);
  
  // Head outline
  ctx.fillStyle = '#F5D0A9'; // Light skin tone for head
  ctx.beginPath();
  ctx.arc(x + player.width/2, y + player.height/6, player.width/2 - 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Face - either custom image or drawn
  if (player.faceLoaded && player.faceImage) {
    // Draw the face image
    ctx.drawImage(
      player.faceImage, 
      x, 
      y, 
      player.width, 
      player.height/3
    );
  } else {
    // Fallback drawn face
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(x + player.width/2 - 8, y + player.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + player.width/2 + 8, y + player.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    const mouthY = player.jumping ? y + player.height/6 + 10 : (player.moving ? y + player.height/6 + 5 + Math.sin(Date.now() / 200) * 3 : y + player.height/6 + 5);
    ctx.beginPath();
    ctx.arc(x + player.width/2, mouthY, 5, 0, Math.PI, false);
    ctx.stroke();
  }
  
  // Body - shirt
  ctx.fillStyle = '#87CEEB'; // Light blue shirt
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 - 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 - 15, y + player.height/3 + player.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Jacket/hoodie
  ctx.fillStyle = '#E0E0E0'; // Light gray hoodie
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 - 15, y + player.height/3);
  ctx.lineTo(x + player.width/2 - 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 - 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 - 18, y + player.height/3 + player.height/3);
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 + 12, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3);
  ctx.lineTo(x + player.width/2 + 18, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3 + player.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Pants
  ctx.fillStyle = '#7986CB'; // Light indigo pants
  ctx.beginPath();
  ctx.moveTo(x + player.width/2 - 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height/3 + player.height/3);
  ctx.lineTo(x + player.width/2 + 15, y + player.height - 15);
  ctx.lineTo(x + player.width/2 - 15, y + player.height - 15);
  ctx.closePath();
  ctx.fill();
  
  // Neon trim on jacket - different colors based on interaction with locations
  const nearbyLocation = findNearbyLocation();
  ctx.fillStyle = nearbyLocation ? getLocationColor(nearbyLocation.id) : '#00FFFF';
  ctx.fillRect(x + player.width/2 + 16, y + player.height/3 + 5, 2, player.height/3 - 10);
  
  // Legs with walking animation
  // Left leg
  const leftLegX = player.moving ? x + player.width/2 - 12 - Math.sin(player.frame * Math.PI) * 5 : x + player.width/2 - 12;
  ctx.fillStyle = '#5C6BC0'; // Darker indigo
  ctx.fillRect(leftLegX, y + player.height - 15, 8, 15);
  
  // Right leg
  const rightLegX = player.moving ? x + player.width/2 + 4 + Math.sin(player.frame * Math.PI) * 5 : x + player.width/2 + 4;
  ctx.fillStyle = '#5C6BC0'; // Darker indigo
  ctx.fillRect(rightLegX, y + player.height - 15, 8, 15);
  
  // Arms
  ctx.fillStyle = '#E0E0E0'; // Light gray hoodie
  
  // Right arm
  const rightArmX = player.moving ? x + player.width/2 + 15 + Math.sin(player.frame * Math.PI) * 5 : x + player.width/2 + 15;
  ctx.fillRect(rightArmX, y + player.height/3 + 5, 5, player.height/3);
  
  // Jump effect
  if (player.jumping) {
    drawJumpEffect(x, y);
  }
}

// Draw jump effect (dust particles, etc)
function drawJumpEffect(x, y) {
  // Dust particles
  ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
  for (let i = 0; i < 5; i++) {
    const particleX = x + Math.random() * player.width;
    const particleY = y + player.height + Math.random() * 10;
    const particleSize = 2 + Math.random() * 3;
    
    ctx.beginPath();
    ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Find closest location to player for neon color effects
function findNearbyLocation() {
  let closestDist = 200; // Max detection radius
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