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
  lastTargetX: 0, // Last target position for detecting changes
  waitingForPlayer: false, // Whether guide is waiting for player to catch up
  message: "", // Current guide message
  messageTimeout: -1, // Timer for current message (-1 means persistent)
  lastUpdateTime: 0, // Time tracking for frame-independent movement
  lastJumpTime: 0, // Time tracking for consistent jumping
  introStep: 0, // Track intro message step
  currentLocation: "", // Track current location ID for persistent messages
  locationMessageShown: false, // Flag to track if location message has been shown
  waitFrames: 0, // Frames to wait before checking for location again
  stageComplete: false // Flag to indicate a stage was just completed
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
  guide.lastJumpTime = Date.now();
  guide.introStep = 0;
  guide.locationMessageShown = false;
  guide.currentLocation = "";
  guide.stageComplete = false;
  
  // Set up click handler for message progression
  setupClickHandler();
  
  // Set initial target as the first location
  updateGuideTarget();
}

// Set up click handler for message progression
function setupClickHandler() {
  // Add a click event listener to the canvas
  canvas.addEventListener('click', function() {
    // Only proceed if we're still in the intro phase
    if (guide.introStep < 2) {
      handleIntroProgression();
    }
  });
}

// Update guide position and state
function updateGuide() {
  // Calculate time delta for frame-independent movement
  const currentTime = Date.now();
  const deltaTime = (currentTime - guide.lastUpdateTime) / 1000; // in seconds
  guide.lastUpdateTime = currentTime;
  
  // Check if we need to clear timed-out messages
  if (guide.messageTimeout > 0 && currentTime > guide.messageTimeout) {
    guide.message = "";
    guide.messageTimeout = -1;
  }
  
  // Check if a stage was just completed and we need to update targets
  if (guide.stageComplete) {
    updateGuideTarget();
    guide.stageComplete = false;
    guide.locationMessageShown = false;
    guide.waitingForPlayer = false;
    
    // Show a transition message
    showGuideMessage("Let's head to the next spot!", 3000);
  }
  
  // Only move guide if no interaction is active and intro is complete
  if (gameState.activeInteraction === null) {
    if (guide.introStep >= 2) {
      moveGuide(deltaTime);
      checkForLocationMessages();
    }
    applyGuidePhysics(deltaTime);
  }
  
  drawGuide();
}

// Handle intro message progression when player clicks
function handleIntroProgression() {
  // Progress to next intro step
  guide.introStep++;
  
  if (guide.introStep === 1) {
    // First click shows the second intro message
    showGuideMessage("Follow me and play some fun mini games that are based on our memories!", 5000);
  } else if (guide.introStep === 2) {
    // Second click clears the message and starts the guide movement
    guide.message = "";
    guide.messageTimeout = -1;
    
    // Guide will start moving now and location messages will be handled by checkForLocationMessages
  }
}

// Check for location-specific messages based on position
function checkForLocationMessages() {
  // If waiting some frames before checking again, decrement counter
  if (guide.waitFrames > 0) {
    guide.waitFrames--;
    return;
  }
  
  // Get current stage location
  const currentStageId = gameState.stages[gameState.currentStage];
  const currentLocation = locations.find(loc => loc.id === currentStageId);
  
  // If we have a location and it's different than before, reset message flag
  if (currentLocation && currentStageId !== guide.currentLocation) {
    guide.locationMessageShown = false;
    guide.currentLocation = currentStageId;
  }
  
  // If at location and waiting for player, show message
  if (currentLocation && !guide.locationMessageShown && guide.waitingForPlayer) {
    const distanceToTarget = Math.abs(guide.x - currentLocation.x);
    
    // When guide is near the location
    if (distanceToTarget < 100) {
      // Force the location-specific message to appear
      showLocationSpecificMessage(currentStageId);
      guide.locationMessageShown = true;
      
      // Wait a few frames before checking again
      guide.waitFrames = 60;
    }
  }
  
  // Additional check for "follow me" prompts when player is far behind
  if (guide.message === "") {
    const distanceToPlayer = Math.abs(guide.x - player.x);
    
    // If player is falling too far behind
    if (distanceToPlayer > 300 && guide.waitingForPlayer) {
      showGuideMessage("Come on! Follow me this way! →", 3000);
      
      // Wait a few frames before checking again
      guide.waitFrames = 90;
    }
  }
}

// Show a guide message
function showGuideMessage(message, duration = -1) {
  guide.message = message;
  guide.messageTimeout = duration > 0 ? Date.now() + duration : -1;
}

// Show location-specific message when arriving at a destination
function showLocationSpecificMessage(locationId) {
  // Location-specific messages with more character and detail
  const locationMessages = {
    "instagram": "This is the first time we spoke! Can you remember our messages?",
    "restaurant": "Restauranté Amano! Our first date. I can still remember how pretty you looked!",
    "song": "Our special song! Every time I hear it, I think of you and smile.",
    "camera": "My favourite picture of us! We should take more pictures together.",
    "dateRanking": "All these amazing dates we've been on... Pick your favourite!",
    "ramen": "Buta Ramen! My mouth is watering just thinking about it!",
    "proposal": "I've been thinking about this for a long time"
  };
  
  // Show the message for this location - persistent until stage completion
  const message = locationMessages[locationId] || "This is a special place for us!";
  showGuideMessage(message, -1); // -1 means persistent
}

// Update guide target based on game state
function updateGuideTarget() {
  // Get the current stage location
  const currentStageId = gameState.stages[gameState.currentStage];
  const currentLocation = locations.find(loc => loc.id === currentStageId);
  
  // Always immediately update target to current stage location
  if (currentLocation) {
    const newTargetX = currentLocation.x - 50; // Position slightly before the location
    
    // Only update if target has actually changed
    if (Math.abs(newTargetX - guide.targetX) > 10) {
      guide.targetX = newTargetX;
      guide.lastTargetX = guide.targetX;
      guide.locationMessageShown = false; // Reset message flag for new location
    }
  } else {
    // Default to ahead of player if no location found
    guide.targetX = player.x + 150;
  }
}

// Handle guide movement
function moveGuide(deltaTime) {
  // Guide movement behavior changes based on whether we've shown the location message
  const distanceToTarget = guide.targetX - guide.x;
  const distanceToPlayer = player.x - guide.x;
  
  // Guide behavior states
  if (Math.abs(distanceToTarget) < 40) {
    // At target location, wait for player
    guide.waitingForPlayer = true;
    guide.moving = false;
    
    // Face toward the player
    if (distanceToPlayer < 0) {
      guide.direction = 'left';
    } else {
      guide.direction = 'right';
    }
    
    // Jump regularly while waiting (approximately every 3 seconds)
    const currentTime = Date.now();
    if (guide.onGround && (currentTime - guide.lastJumpTime > 3000)) {
      guide.verticalSpeed = -guideJumpStrength * 0.8;
      guide.jumping = true;
      guide.onGround = false;
      guide.lastJumpTime = currentTime;
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
  
  // Random jumps while moving (occasionally)
  const currentTime = Date.now();
  if (guide.moving && guide.onGround && (currentTime - guide.lastJumpTime > 8000) && Math.random() < 0.02) {
    guide.verticalSpeed = -guideJumpStrength * 0.8;
    guide.jumping = true;
    guide.onGround = false;
    guide.lastJumpTime = currentTime;
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
  
  // Split message into multiple lines if it's too long
  const maxWidth = 200; // Maximum width of the bubble
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
  ctx.textAlign = 'left';
  
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], bubbleX + bubblePadding, bubbleY + bubblePadding + (i + 1) * lineHeight);
  }
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
  showGuideMessage("Hi Sienna! Happy for you to be here today.", 5000);
}

// Function to be called when a stage is completed
function guideStageCompleted(stage) {
  // Clear current message
  guide.message = "";
  guide.messageTimeout = -1;
  
  // Set the stage complete flag to trigger movement in the next update
  guide.stageComplete = true;
  guide.currentLocation = "";
  guide.locationMessageShown = false;
  guide.waitingForPlayer = false;
}

// IMPORTANT: Add this to your engine.js completeStage function
// After the line: gameState.stagesCompleted[stage] = true;
// Add: if (typeof guideStageCompleted === 'function') { guideStageCompleted(stage); }