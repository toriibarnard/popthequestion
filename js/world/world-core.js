// Core world functionality - handles the map dimensions, camera, and main rendering

// Map dimensions (larger than viewport to allow scrolling)
const mapWidth = 3000;
const mapHeight = 600;

// Camera position (only moves horizontally)
const camera = {
  x: 0,
  width: 800,
  height: 600
};

// Define the locations of special interactions (in order)
const locations = [
  {
    id: "instagram",
    x: 300,
    y: 450,
    width: 100,
    height: 120,
    name: "First Interaction",
    description: "Our first Instagram DM 'hey gorgeous'",
    objectType: "phoneBox"
  },
  {
    id: "restaurant",
    x: 900,
    y: 450,
    width: 150,
    height: 120,
    name: "First Date",
    description: "Restauranté Amano",
    objectType: "restaurant"
  },
  {
    id: "song",
    x: 1500,
    y: 450,
    width: 100,
    height: 90,
    name: "Our Song",
    description: "Lover, You Should've Come Over by Joel Plaskett",
    objectType: "musicShop"
  },
  {
    id: "ramen",
    x: 2100,
    y: 450,
    width: 150,
    height: 120,
    name: "Favorite Food",
    description: "Buta Ramen",
    objectType: "ramenShop"
  },
  {
    id: "proposal",
    x: 2700,
    y: 450,
    width: 200,
    height: 150,
    name: "Special Moment",
    description: "Will you go out with me?",
    objectType: "gazebo"
  }
];

// Update camera to follow player horizontally only
function updateCamera() {
  // Center camera on player
  camera.x = player.x - camera.width / 2;
  
  // Clamp camera to map bounds
  if (camera.x < 0) camera.x = 0;
  if (camera.x > mapWidth - camera.width) camera.x = mapWidth - camera.width;
}

// Check if an object is in camera view
function isInCameraView(obj) {
  return obj.x + (obj.width || 0) > camera.x && 
         obj.x < camera.x + camera.width;
}

// Main world update function
function updateWorld() {
  updateCamera();
  drawBackground();
  drawMidground();
  drawForeground();
  drawLocations();
  drawProgressIndicator();
}

// Draw the world background (city skyline and sunset)
function drawBackground() {
  // Sunset gradient sky
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
  skyGradient.addColorStop(0, '#FF6B6B'); // Pinkish-red at the top
  skyGradient.addColorStop(0.4, '#FF9E80'); // Orange in the middle
  skyGradient.addColorStop(0.7, '#B39DDB'); // Purple lower down
  skyGradient.addColorStop(1, '#5E35B1'); // Deeper purple at horizon
  
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);
  
  // Sun/moon
  ctx.fillStyle = '#FFECB3';
  ctx.beginPath();
  ctx.arc(canvas.width * 0.8, canvas.height * 0.15, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Sun glow
  const sunGlow = ctx.createRadialGradient(
    canvas.width * 0.8, canvas.height * 0.15, 40,
    canvas.width * 0.8, canvas.height * 0.15, 100
  );
  sunGlow.addColorStop(0, 'rgba(255, 236, 179, 0.4)');
  sunGlow.addColorStop(1, 'rgba(255, 236, 179, 0)');
  
  ctx.fillStyle = sunGlow;
  ctx.beginPath();
  ctx.arc(canvas.width * 0.8, canvas.height * 0.15, 100, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw distant city skyline (fixed, doesn't move with camera)
  drawCitySkyline();
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