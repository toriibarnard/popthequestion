// Main game initialization and setup

// Initialize the game when the page loads
window.onload = function() {
  console.log("Window loaded, initializing game...");
  
  // Initialize the engine first
  initializeEngine();
  
  // Then initialize the game
  initializeGame();
};

// Background music audio element
let backgroundMusic;

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
    initializePlayerFace('images/face.png');
    console.log("Initialized player face with face.png");
  } catch (e) {
    console.error("Could not initialize player face:", e);
  }
  
  // Initialize guide character with custom face
  try {
    initializeGuideCharacter('images/face2.png');
    console.log("Initialized guide character with face2.png");
    
    // Show initial guide message after a short delay
    setTimeout(() => {
      showInitialGuideDialog();
    }, 1500);
  } catch (e) {
    console.error("Could not initialize guide character:", e);
  }
  try {
    initializeCatFace('images/cat.png');
    console.log("Initialized cat face with cat.png")
  } catch (e) {
    console.error("Could not initialize cat face:", e)
  }
  
  // Initialize camera
  camera.x = 0;
  
  // Initialize world with cyberpunk night city theme
  initializeWorld();
  
  // Set up background music
  setupBackgroundMusic();
  
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
  document.getElementById('songPlayer').src = 'lover_you_shouldve_come_over.mp3';
  
  // Initial instructions - changed to reference guide
  showDialog("Welcome to our special journey through the neon-lit night! Use LEFT and RIGHT arrow keys to move, and UP to jump. Let me guide you to our special memories!", 6000);
  
  console.log("Game initialized, starting game loop");
  
  // Start the game loop
  window.requestAnimationFrame(gameLoop);
}

// Set up background music
function setupBackgroundMusic() {
  try {
    // Create audio element for background music
    backgroundMusic = new Audio('audio/no-one-noticed.mp3');
    backgroundMusic.id = 'backgroundMusic'; // Add an ID for easier reference
    backgroundMusic.loop = true; // Loop the music
    backgroundMusic.volume = 0.5; // Set volume to 50%
    
    // Add to document body for accessibility by other scripts
    document.body.appendChild(backgroundMusic);
    
    // Start playing when user interacts with the page
    document.addEventListener('click', function startMusic() {
      backgroundMusic.play()
        .then(() => {
          console.log("Background music started");
          // Remove the event listener once music has started
          document.removeEventListener('click', startMusic);
        })
        .catch(error => {
          console.error("Could not play background music:", error);
        });
    });
    
    // Alternative way to start music with keyboard input
    document.addEventListener('keydown', function startMusicKey() {
      backgroundMusic.play()
        .then(() => {
          console.log("Background music started");
          // Remove the event listener once music has started
          document.removeEventListener('keydown', startMusicKey);
        })
        .catch(error => {
          console.error("Could not play background music:", error);
        });
    });
    
    console.log("Background music initialized");
    
    // Create proposal music element (but don't play it yet)
    const proposalMusic = document.createElement('audio');
    proposalMusic.id = 'proposalMusic';
    proposalMusic.src = 'audio/proposal-song.mp3';
    proposalMusic.loop = true;
    proposalMusic.volume = 0; // Start at zero volume
    proposalMusic.preload = 'auto'; // Pre-load the audio
    document.body.appendChild(proposalMusic);
    
  } catch (e) {
    console.error("Could not set up background music:", e);
  }
  
  // Set up toggle button for music
  document.getElementById('toggleMusic').addEventListener('click', function() {
    if (backgroundMusic.paused) {
      backgroundMusic.play()
        .then(() => {
          console.log("Background music resumed");
        })
        .catch(error => {
          console.error("Could not play background music:", error);
        });
    } else {
      backgroundMusic.pause();
      console.log("Background music paused");
    }
  });
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