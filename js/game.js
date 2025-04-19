// Main game initialization and setup

// Initialize the game when the page loads
window.onload = function() {
  initializeGame();
};

// Game initialization function
function initializeGame() {
  // Set up initial game state
  gameState.currentStage = 0;
  
  // Reset all stage completion states
  Object.keys(gameState.stagesCompleted).forEach(key => {
    gameState.stagesCompleted[key] = false;
  });
  
  // Place player at starting position
  player.x = 150;
  player.y = 450;
  player.direction = 'right';
  
  // Initialize camera
  camera.x = 0;
  
  // Initialize world
  initializeWorld();
  
  // Set up the "Yes" button for the final question
  document.getElementById('yesButton').addEventListener('click', () => {
    document.getElementById('finalQuestion').style.display = 'none';
    document.getElementById('celebration').style.display = 'block';
    createHearts();
    
    // Mark proposal as completed
    completeStage("proposal");
  });
  
  // Set up the "No" button that escapes
  document.getElementById('noButton').addEventListener('mouseover', () => {
    const button = document.getElementById('noButton');
    const container = document.getElementById('finalQuestion');
    
    const maxX = container.clientWidth - button.clientWidth - 20;
    const maxY = container.clientHeight - button.clientHeight - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
  });
  
  // Set up song for the music interaction
  // In a real implementation, you'd set the actual path to your mp3 file
  document.getElementById('songPlayer').src = 'path/to/lover_you_shouldve_come_over.mp3';
  
  // Initial instructions
  showDialog("Welcome to our special journey! Use LEFT and RIGHT arrow keys to move, and UP or SPACE to jump. Visit each special location along the way!", 6000);
  
  // Start the game loop
  window.requestAnimationFrame(gameLoop);
}