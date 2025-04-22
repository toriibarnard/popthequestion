// Core world functionality - handles the map dimensions, camera, and main rendering

// Map dimensions (increased to accommodate more spread out locations)
const mapWidth = 3500; // Increased from 3000 to fit all the new locations
const mapHeight = 600;

// Camera position (only moves horizontally)
const camera = {
  x: 0,
  width: 800,
  height: 600
};

// Update gameState.stages array to include the new dateRanking location
// Make sure to update this in engine.js
/*
gameState.stages = [
  "instagram",
  "restaurant",
  "song",
  "dateRanking", // new stage
  "ramen",
  "proposal"
];

// Also update the stagesCompleted object
gameState.stagesCompleted = {
  instagram: false,
  restaurant: false,
  song: false,
  dateRanking: false, // new stage
  ramen: false,
  proposal: false
};
*/

// Update camera to follow player horizontally only
function updateCamera() {
  // Center camera on player
  camera.x = player.x - (camera.width / 2);
  
  // Clamp camera to map bounds and ensure player stays visible
  if (camera.x < 0) camera.x = 0;
  if (camera.x > mapWidth - camera.width) camera.x = mapWidth - camera.width;
  
  // Debug
  console.log("Camera bounds:", camera.x, camera.x + camera.width);
}

// Check if an object is in camera view
function isInCameraView(obj) {
  return obj.x + (obj.width || 0) > camera.x && 
         obj.x < camera.x + camera.width;
}

// Main world update function - simplified without midground
function updateWorld() {
  updateCamera();
  drawBackground();
  drawForeground();
  drawLocations();
  drawProgressIndicator();
}

// Update and draw the progress indicator
function drawProgressIndicator() {
  // Calculate how many stages completed
  const completedCount = Object.values(gameState.stagesCompleted).filter(Boolean).length;
  
  // Draw progress bar
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 40, 200, 20);
  
  ctx.fillStyle = '#FF6B6B';
  const progressWidth = (completedCount / locations.length) * 190;
  ctx.fillRect(15, 45, progressWidth, 10);
  
  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Journey Progress: ${completedCount}/${locations.length}`, 20, 57);
  
  // Draw mini-map to show player position
  drawMiniMap();
}

// Draw mini-map to show overall journey progress
function drawMiniMap() {
  const miniMapWidth = 200;
  const miniMapHeight = 30;
  const miniMapX = canvas.width - miniMapWidth - 10;
  const miniMapY = 10;
  
  // Background
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(miniMapX, miniMapY, miniMapWidth, miniMapHeight);
  
  // Draw path on mini-map
  ctx.fillStyle = '#E8D8C3';
  ctx.fillRect(miniMapX + 5, miniMapY + miniMapHeight/2 - 2, miniMapWidth - 10, 4);
  
  // Draw locations on mini-map
  locations.forEach((location, index) => {
    // Skip future stages on mini-map
    if (index > gameState.currentStage && location.id !== 'proposal') {
      return;
    }
    
    // For proposal, only show when all others are complete
    if (location.id === 'proposal') {
      const allPreviousComplete = Object.entries(gameState.stagesCompleted)
        .filter(([id, _]) => id !== 'proposal')
        .every(([_, completed]) => completed);
      
      if (!allPreviousComplete && !gameState.stagesCompleted.proposal) {
        return;
      }
    }
    
    const isCompleted = gameState.stagesCompleted[location.id];
    const isActive = index === gameState.currentStage;
    
    // Calculate position on mini-map
    const mapRatio = (location.x) / mapWidth;
    const dotX = miniMapX + 5 + (miniMapWidth - 10) * mapRatio;
    
    // Draw location dot
    if (location.id === 'proposal') {
      // Heart for proposal
      ctx.fillStyle = isCompleted ? '#A0A0A0' : '#FF69B4';
      
      // Small heart
      ctx.beginPath();
      ctx.moveTo(dotX, miniMapY + miniMapHeight/2);
      ctx.bezierCurveTo(
        dotX, miniMapY + miniMapHeight/2 - 2, 
        dotX - 3, miniMapY + miniMapHeight/2 - 2, 
        dotX - 3, miniMapY + miniMapHeight/2
      );
      ctx.bezierCurveTo(
        dotX - 3, miniMapY + miniMapHeight/2 + 2, 
        dotX - 1, miniMapY + miniMapHeight/2 + 4, 
        dotX, miniMapY + miniMapHeight/2 + 5
      );
      ctx.bezierCurveTo(
        dotX + 1, miniMapY + miniMapHeight/2 + 4, 
        dotX + 3, miniMapY + miniMapHeight/2 + 2, 
        dotX + 3, miniMapY + miniMapHeight/2
      );
      ctx.bezierCurveTo(
        dotX + 3, miniMapY + miniMapHeight/2 - 2, 
        dotX, miniMapY + miniMapHeight/2 - 2, 
        dotX, miniMapY + miniMapHeight/2
      );
      ctx.fill();
    } else {
      // Regular dot for other locations
      ctx.fillStyle = isCompleted ? '#A0A0A0' : (isActive ? '#FF6B6B' : '#FFFFFF');
      ctx.beginPath();
      ctx.arc(dotX, miniMapY + miniMapHeight/2, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  
  // Draw player position on mini-map
  const playerMapRatio = player.x / mapWidth;
  const playerDotX = miniMapX + 5 + (miniMapWidth - 10) * playerMapRatio;
  
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.arc(playerDotX, miniMapY + miniMapHeight/2, 3, 0, Math.PI * 2);
  ctx.fill();
}