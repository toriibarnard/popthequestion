// Main game initialization and setup

// Initialize the game when the page loads
window.onload = function() {
  console.log("Window loaded, initializing game...");
  
  // Initialize the engine first
  initializeEngine();
  
  // Then initialize the game
  initializeGame();
};

// Game initialization function
function initializeGame() {
  console.log("Initializing game...");
  
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
  
  // Initialize player face - Add the path to your face.jpg file here
  // Make sure your face.jpg file is in the same directory as the game files
  try {
    initializePlayerFace('face.png');
    console.log("Initialized player face with face.png");
  } catch (e) {
    console.error("Could not initialize player face:", e);
  }
  
  // Initialize camera
  camera.x = 0;
  
  // Initialize world with cyberpunk night city theme
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
  showDialog("Welcome to our special journey through the neon-lit night! Use LEFT and RIGHT arrow keys to move, and UP or SPACE to jump. Visit each special memory along the path!", 6000);
  
  console.log("Game initialized, starting game loop");
  
  // Start the game loop
  window.requestAnimationFrame(gameLoop);
}

// Create hearts animation for the celebration screen
function createHearts() {
  const celebration = document.getElementById('celebration');
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = '❤️';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 2 + 's';
      celebration.appendChild(heart);
      
      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, 3000);
    }, i * 100);
  }
}