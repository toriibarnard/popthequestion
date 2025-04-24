// Game engine core functionality

// Canvas and context - declaring but not initializing yet
let canvas;
let ctx;

// Updated game state with new dateRanking stage
let gameState = {
  activeInteraction: null,
  currentStage: 0,
  stages: [
    "instagram",
    "restaurant",
    "song",
    "camera",
    "dateRanking",
    "ramen",
    "proposal"
  ],
  stagesCompleted: {
    instagram: false,
    restaurant: false,
    song: false,
    camera: false,
    dateRanking: false,
    ramen: false,
    proposal: false
  },
  gameComplete: false
};

// Input handling
const keys = {};

// Initialize engine - call this after DOM is loaded
function initializeEngine() {
  // Get canvas and context
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  
  // Set up event listeners
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
}

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
  
  // Only advance to next stage if not on the proposal stage
  if (stage !== "proposal") {
    gameState.currentStage++;
    
    // Check if this was the second-to-last stage (ramen)
    if (stage === "ramen") {
      // Show a special dialog directing to the final spot
      showDialog("You've completed all our memories! Head to the special gazebo at the end of the path for a surprise...", 6000);
    }
    // Add special message for camera stage completion
    else if (stage === "camera") {
      showDialog("Our picture looks perfect now! Let's check out our date ranking next.", 5000);
    }
    // Add special message for dateRanking stage completion
    else if (stage === "dateRanking") {
      showDialog("Thanks for ranking our dates! Let's head to Buta Ramen for some delicious Tantanmen!", 5000);
    }
  } else {
    // If this was the proposal stage, the game is truly complete
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
  updateGuide(); // Add the guide update here
  
  // Continue loop
  window.requestAnimationFrame(gameLoop);
}