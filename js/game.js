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
  
  // Set up the "Yes" button for the final question
  document.getElementById('yesButton').addEventListener('click', () => {
    document.getElementById('finalQuestion').style.display = 'none';
    document.getElementById('celebration').style.display = 'block';
    createHearts();
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
  
  // Initial instructions
  showDialog("Welcome to our special journey! Use arrow keys or WASD to move. Visit each location in order.", 6000);
  
  // Start the game loop
  window.requestAnimationFrame(gameLoop);
}