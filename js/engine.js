// Game engine core functionality

// Canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let gameState = {
  activeInteraction: null,
  currentStage: 0,
  stages: [
    "instagram",
    "restaurant",
    "song",
    "ramen"
  ],
  stagesCompleted: {
    instagram: false,
    restaurant: false,
    song: false,
    ramen: false
  },
  gameComplete: false
};

// Input handling
const keys = {};

// Event listeners for keyboard
window.addEventListener('keydown', function(e) {
  keys[e.key] = true;
  
  // Prevent scrolling with arrow keys
  if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].indexOf(e.key) > -1) {
    e.preventDefault();
  }
});

window.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

// Utility functions
function showDialog(text, duration = 4000) {
  const dialog = document.getElementById('dialog');
  dialog.textContent = text;
  dialog.style.display = 'block';
  
  // Hide after specified duration
  setTimeout(() => {
    dialog.style.display = 'none';
  }, duration);
}

function showInteraction(interactionId) {
  // Hide all interactions first
  document.querySelectorAll('.interaction-popup').forEach(popup => {
    popup.style.display = 'none';
  });
  
  // Show the requested interaction
  const interaction = document.getElementById(interactionId);
  if (interaction) {
    interaction.style.display = 'block';
    gameState.activeInteraction = interactionId;
  }
}

function hideInteraction(interactionId) {
  const interaction = document.getElementById(interactionId);
  if (interaction) {
    interaction.style.display = 'none';
    gameState.activeInteraction = null;
  }
}

function completeStage(stage) {
  gameState.stagesCompleted[stage] = true;
  gameState.currentStage++;
  
  // Check if this was the last stage
  if (gameState.currentStage >= gameState.stages.length) {
    showFinalQuestion();
    gameState.gameComplete = true;
  }
}

function showFinalQuestion() {
  const finalQuestion = document.getElementById('finalQuestion');
  finalQuestion.style.display = 'block';
}

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

// Main game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw game elements (implemented in other files)
  updateWorld();
  updatePlayer();
  
  // Continue loop
  window.requestAnimationFrame(gameLoop);
}