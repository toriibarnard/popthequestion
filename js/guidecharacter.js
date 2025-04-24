// Guide character functionality
// This file adds a guide character (you) that leads the player through the game

// Define physics constants (matching player.js)
const guideJumpStrength = 12;
const guideGravity = 0.5;

// Guide character state
const guide = {
  x: 200, // Starting position slightly ahead of player
  y: 450, // Same y-position as player for side-scrolling
  width: 40,
  height: 60,
  speed: 4,
  moving: false,
  direction: 'right', // Default direction is right
  frame: 0,
  jumping: false,
  verticalSpeed: 0,
  onGround: true,
  faceImage: null, // Will hold the face image
  faceLoaded: false, // Flag to check if face image is loaded
  targetX: 0, // Target x position
  waitingForPlayer: false, // Whether guide is waiting for player to catch up
  message: "", // Current guide message
  messageTimeout: 0, // Timer for current message
  lastUpdateTime: 0 // Time tracking for frame-independent movement
};

// Load guide face image
function loadGuideFace(imagePath) {
  guide.faceImage = new Image();
  guide.faceImage.onload = function() {
    console.log("Guide face image loaded successfully");
    guide.faceLoaded = true;
  };
  guide.faceImage.onerror = function() {
    console.error("Could not load guide face image:", imagePath);
    guide.faceLoaded = false;
  };
  guide.faceImage.src = imagePath || "images/face2.png"; // Use face2.png for the guide
}

// Initialize guide character - call this from main game.js
function initializeGuideCharacter(imagePath) {
  console.log("Initializing guide character with:", imagePath);
  loadGuideFace(imagePath);
  guide.lastUpdateTime = Date.now();
  
  // Set initial target as the first location
  updateGuideTarget();
}

// Update guide position and state
function updateGuide() {
  // Calculate time delta for frame-independent movement
  const currentTime = Date.now();
  const deltaTime = (currentTime - guide.lastUpdateTime) / 1000; // in seconds
  guide.lastUpdateTime = currentTime;
  
  // Only move guide if no interaction is active
  if (gameState.activeInteraction === null) {
    moveGuide(deltaTime);
    applyGuidePhysics(deltaTime);
    checkForDialogTriggers();
  }
  
  drawGuide();
}

// Check if it's time to show a dialog message
function checkForDialogTriggers() {
  const currentTime = Date.now();
  
  // Clear expired messages
  if (guide.messageTimeout > 0 && currentTime > guide.messageTimeout) {
    guide.message = "";
    guide.messageTimeout = 0;
  }
  
  // If no active message, check for triggers
  if (guide.message === "") {
    // Distance to player
    const distanceToPlayer = Math.abs(guide.x - player.x);
    
    // If player is falling too far behind
    if (distanceToPlayer > 200 && guide.waitingForPlayer) {
      showGuideMessage("Come on! Follow me this way! →", 3000);
    }
    
    // Distance to current stage location
    const currentStageId = gameState.stages[gameState.currentStage];
    const currentLocation = locations.find(loc => loc.id === currentStageId);
    
    if (currentLocation) {
      const distanceToTarget = Math.abs(guide.x - currentLocation.x);
      
      // When guide arrives at location
      if (distanceToTarget < 30 && guide.waitingForPlayer && !guide.message) {
        showGuideMessage("This is a special place! Come check it out!", 4000);
      }
    }
    
    // Guide random commentary based on current stage
    if (Math.random() < 0.002 && !guide.message && !guide.waitingForPlayer) { // Reduced chance
      const messages = {
        instagram: ["Remember our Instagram posts?", "This spot reminds me of our Instagram memories!"],
        restaurant: ["Remember our first date at that restaurant?", "The restaurant was so special!"],
        song: ["This song always reminds me of us!", "Our special song is up ahead!"],
        camera: ["We took some great pictures together!", "I love this photo of us!"],
        dateRanking: ["We've had so many amazing dates!", "Can you rank our best dates?"],
        ramen: ["Remember our favorite ramen place?", "Tantanmen ramen was always your favorite!"],
        proposal: ["I have something special to ask you...", "There's a special spot up ahead!"]
      };
      
      const currentStageId = gameState.stages[gameState.currentStage];
      const stageMessages = messages[currentStageId] || ["This way!", "Follow me!"];
      const randomMessage = stageMessages[Math.floor(Math.random() * stageMessages.length)];
      
      showGuideMessage(randomMessage, 3000);
    }
  }
}

// Show a guide message
function showGuideMessage(message, duration = 3000) {
  guide.message = message;
  guide.messageTimeout = Date.now() + duration;
}

// Update guide target based on game state
function updateGuideTarget() {
  // Get the current stage location
  const currentStageId = gameState.stages[gameState.currentStage];
  const currentLocation = locations.find(loc => loc.id === currentStageId);
  
  if (currentLocation) {
    guide.targetX = currentLocation.x - 50; // Position slightly before the location
  } else {
    // Default to ahead of player if no location found
    guide.targetX = player.x + 150;
  }
}

// Handle guide movement
function moveGuide(deltaTime) {
  // Update target periodically (less frequently)
  if (Math.random() < 0.005) { // Reduced chance
    updateGuideTarget();
  }
  
  const distanceToTarget = guide.targetX - guide.x;
  const distanceToPlayer = player.x - guide.x;
  
  // Guide behavior states
  if (Math.abs(distanceToTarget) < 30) {
    // At target location, wait for player
    guide.waitingForPlayer = true;
    guide.moving = false;
    
    // Face toward the player
    if (distanceToPlayer < 0) {
      guide.direction = 'left';
    } else {
      guide.direction = 'right';
    }
    
    // Jump occasionally while waiting to draw attention (much less frequently)
    if (guide.onGround && Math.random() < 0.02) {
      guide.verticalSpeed = -guideJumpStrength * 0.8; // Smaller jump than player
      guide.jumping = true;
      guide.onGround = false;
    }
  } 
  else if (Math.abs(distanceToPlayer) > 300) {
    // Player too far behind, slow down or wait
    guide.waitingForPlayer = true;
    guide.moving = distanceToPlayer > 0; // Only move if player is ahead
    
    // Face toward player
    guide.direction = distanceToPlayer < 0 ? 'right' : 'left';
  }
  else {
    // Moving toward target
    guide.waitingForPlayer = false;
    
    if (distanceToTarget > 10) {
      guide.x += guide.speed * deltaTime * 60; // Frame-independent movement
      guide.direction = 'right';
      guide.moving = true;
    } else if (distanceToTarget < -10) {
      guide.x -= guide.speed * deltaTime * 60; // Frame-independent movement
      guide.direction = 'left';
      guide.moving = true;
    } else {
      guide.moving = false;
    }
  }
  
  // Animation frame update
  if (guide.moving) {
    guide.frame = (guide.frame + 0.1) % 4;
  }
  
  // Random jumps while moving (much less frequently)
  if (guide.moving && guide.onGround && Math.random() < 0.0005) {
    guide.verticalSpeed = -guideJumpStrength * 0.8;
    guide.jumping = true;
    guide.onGround = false;
  }
}

// Apply physics (gravity, jumping) to guide
function applyGuidePhysics(deltaTime) {
  // Apply gravity with frame-independent movement
  guide.verticalSpeed += guideGravity * deltaTime * 60;
  guide.y += guide.verticalSpeed * deltaTime * 60;
  
  // Check floor collision
  if (guide.y >= 450) { // Fixed floor position
    guide.y = 450;
    guide.verticalSpeed = 0;
    guide.onGround = true;
    guide.jumping = false;
  }
}

// Draw the guide character
function drawGuide() {
  // Calculate position on screen with camera offset
  const screenX = guide.x - camera.x;
  
  // Only draw guide if on screen
  if (screenX > -guide.width && screenX < camera.width) {
    // Draw speech bubble if there's a message
    if (guide.message) {
      drawGuideSpeechBubble(screenX, guide.y, guide.message);
    }
    
    // Draw the guide differently based on direction
    if (guide.direction === 'left') {
      drawGuideFacingLeft(screenX, guide.y);
    } else {
      drawGuideFacingRight(screenX, guide.y);
    }
  }
}

// Draw jump effect (dust particles)
function drawJumpEffect(x, y) {
  // Dust particles
  ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
  for (let i = 0; i < 5; i++) {
    const particleX = x + Math.random() * guide.width;
    const particleY = y + guide.height + Math.random() * 10;
    const particleSize = 2 + Math.random() * 3;
    
    ctx.beginPath();
    ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw guide speech bubble
function drawGuideSpeechBubble(x, y, message) {
  const bubbleMargin = 10;
  const bubblePadding = 8;
  const bubbleArrowHeight = 10;
  
  ctx.font = '12px Arial';
  const textWidth = ctx.measureText(message).width;
  const bubbleWidth = textWidth + (bubblePadding * 2);
  const bubbleHeight = 25;
  
  // Position bubble above character
  const bubbleX = x - (bubbleWidth / 2) + (guide.width / 2);
  const bubbleY = y - 35 - bubbleHeight;
  
  // Draw bubble background with rounded corners
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
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
  ctx.strokeStyle = '#00FFFF';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw text
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(message, bubbleX + (bubbleWidth / 2), bubbleY + 16);
}

// Draw guide facing left
function drawGuideFacingLeft(x, y) {
  // Neck
  ctx.fillStyle = '#F5D0A9'; // Light skin tone
  ctx.fillRect(x + guide.width/2 - 3, y + guide.height/3, 6, 5);
  
  // Head outline
  ctx.fillStyle = '#F5D0A9'; // Light skin tone for head
  ctx.beginPath();
  ctx.arc(x + guide.width/2, y + guide.height/6, guide.width/2 - 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Face - either custom image or drawn
  if (guide.faceLoaded && guide.faceImage) {
    // Draw the face image but flip it horizontally for left direction
    ctx.save();
    ctx.translate(x + guide.width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(
      guide.faceImage, 
      0, 
      0, 
      guide.width, 
      guide.height/3
    );
    ctx.restore();
  } else {
    // Fallback drawn face
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(x + guide.width/2 - 8, y + guide.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + guide.width/2 + 8, y + guide.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    const mouthY = guide.jumping ? y + guide.height/6 + 10 : (guide.moving ? y + guide.height/6 + 5 + Math.sin(Date.now() / 200) * 3 : y + guide.height/6 + 5);
    ctx.beginPath();
    ctx.arc(x + guide.width/2, mouthY, 5, 0, Math.PI, false);
    ctx.stroke();
  }
  
  // Body - shirt (different color from player)
  ctx.fillStyle = '#4CAF50'; // Green shirt for guide
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 - 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 15, y + guide.height/3 + guide.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Jacket/hoodie
  ctx.fillStyle = '#263238'; // Dark gray hoodie for guide
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 - 15, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 18, y + guide.height/3 + guide.height/3);
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 + 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 18, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3 + guide.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Pants
  ctx.fillStyle = '#37474F'; // Dark blue-gray pants
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 - 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height - 15);
  ctx.lineTo(x + guide.width/2 - 15, y + guide.height - 15);
  ctx.closePath();
  ctx.fill();
  
  // Neon trim on jacket - blue color
  ctx.fillStyle = '#00FFFF';
  ctx.fillRect(x + guide.width/2 - 18, y + guide.height/3 + 5, 2, guide.height/3 - 10);
  
  // Legs with walking animation
  // Left leg
  const leftLegX = guide.moving ? x + guide.width/2 - 12 - Math.sin(guide.frame * Math.PI) * 5 : x + guide.width/2 - 12;
  ctx.fillStyle = '#263238'; // Darker pants
  ctx.fillRect(leftLegX, y + guide.height - 15, 8, 15);
  
  // Right leg
  const rightLegX = guide.moving ? x + guide.width/2 + 4 + Math.sin(guide.frame * Math.PI) * 5 : x + guide.width/2 + 4;
  ctx.fillStyle = '#263238'; // Darker pants
  ctx.fillRect(rightLegX, y + guide.height - 15, 8, 15);
  
  // Arms
  ctx.fillStyle = '#263238'; // Dark gray hoodie
  
  // Left arm
  const leftArmX = guide.moving ? x + guide.width/2 - 20 + Math.sin(guide.frame * Math.PI) * 5 : x + guide.width/2 - 20;
  ctx.fillRect(leftArmX, y + guide.height/3 + 5, 5, guide.height/3);
  
  // Jump effect
  if (guide.jumping) {
    drawJumpEffect(x, y);
  }
}

// Draw guide facing right
function drawGuideFacingRight(x, y) {
  // Neck
  ctx.fillStyle = '#F5D0A9'; // Light skin tone
  ctx.fillRect(x + guide.width/2 - 3, y + guide.height/3, 6, 5);
  
  // Head outline
  ctx.fillStyle = '#F5D0A9'; // Light skin tone for head
  ctx.beginPath();
  ctx.arc(x + guide.width/2, y + guide.height/6, guide.width/2 - 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Face - either custom image or drawn
  if (guide.faceLoaded && guide.faceImage) {
    // Draw the face image
    ctx.drawImage(
      guide.faceImage, 
      x, 
      y, 
      guide.width, 
      guide.height/3
    );
  } else {
    // Fallback drawn face
    // Eyes
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(x + guide.width/2 - 8, y + guide.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + guide.width/2 + 8, y + guide.height/6, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    const mouthY = guide.jumping ? y + guide.height/6 + 10 : (guide.moving ? y + guide.height/6 + 5 + Math.sin(Date.now() / 200) * 3 : y + guide.height/6 + 5);
    ctx.beginPath();
    ctx.arc(x + guide.width/2, mouthY, 5, 0, Math.PI, false);
    ctx.stroke();
  }
  
  // Body - shirt (different color from player)
  ctx.fillStyle = '#4CAF50'; // Green shirt for guide
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 - 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 15, y + guide.height/3 + guide.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Jacket/hoodie
  ctx.fillStyle = '#263238'; // Dark gray hoodie for guide
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 - 15, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 - 18, y + guide.height/3 + guide.height/3);
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 + 12, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 18, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3 + guide.height/3);
  ctx.closePath();
  ctx.fill();
  
  // Pants
  ctx.fillStyle = '#37474F'; // Dark blue-gray pants
  ctx.beginPath();
  ctx.moveTo(x + guide.width/2 - 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height/3 + guide.height/3);
  ctx.lineTo(x + guide.width/2 + 15, y + guide.height - 15);
  ctx.lineTo(x + guide.width/2 - 15, y + guide.height - 15);
  ctx.closePath();
  ctx.fill();
  
  // Neon trim on jacket - blue color
  ctx.fillStyle = '#00FFFF';
  ctx.fillRect(x + guide.width/2 + 16, y + guide.height/3 + 5, 2, guide.height/3 - 10);
  
  // Legs with walking animation
  // Left leg
  const leftLegX = guide.moving ? x + guide.width/2 - 12 - Math.sin(guide.frame * Math.PI) * 5 : x + guide.width/2 - 12;
  ctx.fillStyle = '#263238'; // Darker pants
  ctx.fillRect(leftLegX, y + guide.height - 15, 8, 15);
  
  // Right leg
  const rightLegX = guide.moving ? x + guide.width/2 + 4 + Math.sin(guide.frame * Math.PI) * 5 : x + guide.width/2 + 4;
  ctx.fillStyle = '#263238'; // Darker pants
  ctx.fillRect(rightLegX, y + guide.height - 15, 8, 15);
  
  // Arms
  ctx.fillStyle = '#263238'; // Dark gray hoodie
  
  // Right arm
  const rightArmX = guide.moving ? x + guide.width/2 + 15 + Math.sin(guide.frame * Math.PI) * 5 : x + guide.width/2 + 15;
  ctx.fillRect(rightArmX, y + guide.height/3 + 5, 5, guide.height/3);
  
  // Jump effect
  if (guide.jumping) {
    drawJumpEffect(x, y);
  }
}

// Show initial guide dialog
function showInitialGuideDialog() {
  showGuideMessage("Hi! Follow me on our special journey!", 5000);
}