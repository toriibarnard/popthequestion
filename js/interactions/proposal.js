// Proposal Interaction - Special "Will you go out with me?" feature
// A dedicated file for the final romantic moment with enhanced animations

// Initialize the proposal interaction
function initProposalInteraction() {
  console.log("Initializing proposal interaction");
  
  const finalQuestion = document.getElementById('finalQuestion');
  const yesButton = document.getElementById('yesButton');
  const noButton = document.getElementById('noButton');
  const celebration = document.getElementById('celebration');
  
  // Override the original showFinalQuestion function
  window.showFinalQuestion = function() {
    gameState.activeInteraction = "proposal";
    
    // Add cyberpunk styling to the final question
    applyCyberpunkStyling();
    
    // Show the question with a fade-in effect
    finalQuestion.style.display = 'block';
    finalQuestion.style.opacity = '0';
    finalQuestion.style.transform = 'translateY(20px)';
    
    // Trigger fade-in animation
    setTimeout(() => {
      finalQuestion.style.transition = 'all 1s ease';
      finalQuestion.style.opacity = '1';
      finalQuestion.style.transform = 'translateY(0)';
    }, 100);
    
    // Start heart animation in the background
    startBackgroundHearts();
  };
  
  // Set up the "Yes" button with enhanced celebration
  yesButton.addEventListener('click', () => {
    // Hide question
    finalQuestion.style.opacity = '0';
    finalQuestion.style.transform = 'translateY(-20px)';
    
    // Transition music when she says yes!
    switchToProposalMusic();
    
    // Hide question after animation completes
    setTimeout(() => {
      finalQuestion.style.display = 'none';
      
      // Show celebration screen
      celebration.style.display = 'block';
      celebration.style.opacity = '0';
      
      // Trigger fade-in animation
      setTimeout(() => {
        celebration.style.transition = 'all 1s ease';
        celebration.style.opacity = '1';
        
        // Start enhanced celebration effects
        createEnhancedCelebration();
      }, 100);
    }, 1000);
    
    // Mark proposal as completed
    completeStage("proposal");
  });
  
  // Set up the "No" button that escapes when hovered
  noButton.addEventListener('mouseover', (e) => {
    const button = noButton;
    const container = finalQuestion;
    
    // Get container dimensions for boundary calculations
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate maximum positions
    const maxX = containerRect.width - buttonRect.width - 20;
    const maxY = containerRect.height - buttonRect.height - 20;
    
    // Generate new position with some intelligence to avoid corners or getting stuck
    let newX, newY;
    
    // Get current button position relative to container
    const currentRelativeX = buttonRect.left - containerRect.left;
    const currentRelativeY = buttonRect.top - containerRect.top;
    
    // Move in the opposite direction of the mouse approach
    const mouseFromRight = e.clientX > (buttonRect.left + buttonRect.width/2);
    const mouseFromBottom = e.clientY > (buttonRect.top + buttonRect.height/2);
    
    // Add an element of randomness but generally move away from mouse
    newX = mouseFromRight ? 
      Math.max(20, currentRelativeX - 100 - Math.random() * 50) : 
      Math.min(maxX, currentRelativeX + 100 + Math.random() * 50);
    
    newY = mouseFromBottom ? 
      Math.max(20, currentRelativeY - 70 - Math.random() * 30) : 
      Math.min(maxY, currentRelativeY + 70 + Math.random() * 30);
    
    // Keep within bounds
    newX = Math.max(20, Math.min(maxX, newX));
    newY = Math.max(20, Math.min(maxY, newY));
    
    // Move the button with a smooth transition
    button.style.position = 'absolute';
    button.style.transition = 'all 0.2s ease';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    
    // Add funny, random comments when trying to click "no"
    const noComments = [
      "Nice try!",
      "Not happening!",
      "Nope!",
      "Try again!",
      "You sure about that?",
      "I don't think so!",
      "The other button is better!",
      "Are you REALLY sure?",
      "Think again!",
      "That's not the right choice!"
    ];
    
    // Create and show a comment bubble
    showNoButtonComment(noComments[Math.floor(Math.random() * noComments.length)], button);
  });
  
  // Switch to proposal music and stop background music
  function switchToProposalMusic() {
    // Find the background music element
    const backgroundMusic = document.getElementById('backgroundMusic') || document.querySelector('audio');
    
    // Find or create the proposal music element
    let proposalMusic = document.getElementById('proposalMusic');
    if (!proposalMusic) {
      proposalMusic = document.createElement('audio');
      proposalMusic.id = 'proposalMusic';
      proposalMusic.src = 'audio/proposal-song.mp3';
      proposalMusic.loop = true;
      proposalMusic.volume = 0;
      document.body.appendChild(proposalMusic);
    }
    
    // Immediately stop background music
    if (backgroundMusic) {
      // First try to pause
      backgroundMusic.pause();
      
      // If that fails for some reason, try to stop by other means
      try {
        backgroundMusic.volume = 0;
        backgroundMusic.currentTime = 0;
        
        // For good measure, remove from DOM to ensure it stops
        if (backgroundMusic.parentNode) {
          backgroundMusic.parentNode.removeChild(backgroundMusic);
        }
      } catch (e) {
        console.error("Error stopping background music:", e);
      }
    }
    
    // Start proposal music with fade in
    proposalMusic.volume = 0;
    proposalMusic.play().then(() => {
      const fadeInInterval = setInterval(() => {
        if (proposalMusic.volume < 0.5) {
          proposalMusic.volume += 0.05;
        } else {
          clearInterval(fadeInInterval);
        }
      }, 100);
    }).catch(err => console.error("Could not play proposal music:", err));
  }
  
  // Apply cyberpunk styling to the proposal UI
  function applyCyberpunkStyling() {
    // Create a style element for proposal-specific styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      #finalQuestion {
        background-color: rgba(10, 10, 20, 0.9);
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 600px;
        box-shadow: 0 0 30px rgba(255, 64, 129, 0.7);
        color: white;
        z-index: 1000;
        transition: all 0.5s ease;
      }
      
      #finalQuestion h2 {
        color: #FF4081;
        font-size: 2.5em;
        margin-bottom: 20px;
        text-shadow: 0 0 10px rgba(255, 64, 129, 0.7);
      }
      
      #finalQuestion p {
        font-size: 1.2em;
        margin-bottom: 30px;
        line-height: 1.6;
      }
      
      .heart-animation {
        position: relative;
        font-size: 3em;
        margin: 20px 0;
        animation: float 3s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.1); }
      }
      
      .button {
        background: linear-gradient(135deg, #FF4081, #C2185B);
        color: white;
        border: none;
        border-radius: 30px;
        padding: 12px 30px;
        margin: 10px;
        font-size: 1.2em;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }
      
      .button:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      }
      
      #yesButton {
        background: linear-gradient(135deg, #FF4081, #C2185B);
      }
      
      #noButton {
        background: linear-gradient(135deg, #455A64, #263238);
        opacity: 0.9;
      }
      
      #celebration {
        background-color: rgba(10, 10, 20, 0.9);
        border-radius: 15px;
        padding: 40px;
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 700px;
        height: 70%;
        max-height: 500px;
        box-shadow: 0 0 40px rgba(255, 64, 129, 0.8);
        color: white;
        z-index: 1000;
        overflow: hidden;
      }
      
      #celebration h1 {
        color: #FF4081;
        font-size: 3em;
        margin-bottom: 20px;
        text-shadow: 0 0 15px rgba(255, 64, 129, 0.8);
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { text-shadow: 0 0 15px rgba(255, 64, 129, 0.8); }
        50% { text-shadow: 0 0 30px rgba(255, 64, 129, 1); }
      }
      
      #celebration p {
        font-size: 1.4em;
        margin-bottom: 30px;
        line-height: 1.6;
      }
      
      .heart {
        position: absolute;
        color: #ff4081;
        font-size: 24px;
        z-index: 20;
        pointer-events: none;
        animation: float 3s ease-in forwards;
        text-shadow: 0 0 10px rgba(255, 64, 129, 0.7);
      }
      
      .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        z-index: 10;
        pointer-events: none;
        opacity: 0.8;
      }
      
      .comment-bubble {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 14px;
        pointer-events: none;
        z-index: 2000;
        animation: fadeOut 1.5s forwards;
        white-space: nowrap;
        box-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
      }
      
      @keyframes fadeOut {
        0%, 80% { opacity: 1; }
        100% { opacity: 0; }
      }
      
      .background-heart {
        position: absolute;
        color: rgba(255, 64, 129, 0.2);
        font-size: 40px;
        z-index: 5;
        pointer-events: none;
        animation: bgFloat 15s linear infinite;
      }
      
      @keyframes bgFloat {
        0% { transform: translateY(0) rotate(0); opacity: 0; }
        10% { opacity: 0.2; }
        90% { opacity: 0.2; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
    `;
    
    document.head.appendChild(styleElement);
  }
  
  // Show a comment when the no button is hovered
  function showNoButtonComment(comment, buttonElement) {
    // Remove any existing comment bubbles
    document.querySelectorAll('.comment-bubble').forEach(bubble => {
      bubble.remove();
    });
    
    // Create a new comment bubble
    const bubble = document.createElement('div');
    bubble.className = 'comment-bubble';
    bubble.textContent = comment;
    
    // Position the bubble above the button
    const buttonRect = buttonElement.getBoundingClientRect();
    bubble.style.left = (buttonRect.left + buttonRect.width/2) + 'px';
    bubble.style.top = (buttonRect.top - 30) + 'px';
    bubble.style.transform = 'translateX(-50%)';
    
    // Add to document
    document.body.appendChild(bubble);
    
    // Remove after animation completes
    setTimeout(() => {
      bubble.remove();
    }, 1500);
  }
  
  // Start heart animation in the background before response
  function startBackgroundHearts() {
    // Create background hearts
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'background-heart';
        heart.innerHTML = '❤️';
        heart.style.left = (Math.random() * 100) + '%';
        heart.style.bottom = '-40px';
        heart.style.opacity = '0';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.fontSize = (30 + Math.random() * 30) + 'px';
        
        finalQuestion.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
          heart.remove();
        }, 15000);
      }, i * 800);
    }
  }
  
  // Enhanced celebration effect
  function createEnhancedCelebration() {
    // Create hearts with improved animation
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        createHeart(celebration, i);
      }, i * 100);
    }
    
    // Create colorful confetti
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        createConfetti(celebration, i);
      }, i * 50);
    }
    
    // Add music indicator
    createMusicIndicator();
  }
  
  // Create a single heart element
  function createHeart(container, index) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    // Randomize position, size and animation
    const size = 24 + Math.random() * 30;
    heart.style.fontSize = size + 'px';
    heart.style.left = (Math.random() * 100) + '%';
    heart.style.top = (70 + Math.random() * 30) + '%';
    
    // Different animation for each heart
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 2;
    heart.style.animation = `float ${duration}s ease-in ${delay}s forwards`;
    
    // Add to container
    container.appendChild(heart);
    
    // Remove after animation completes
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }
  
  // Create a single confetti element
  function createConfetti(container, index) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Randomize color, size, and shape
    const colors = ['#FF4081', '#00BCD4', '#FFEB3B', '#4CAF50', '#9C27B0', '#3F51B5'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 5 + Math.random() * 15;
    
    confetti.style.backgroundColor = color;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    // Randomize shape - sometimes make rectangular
    if (Math.random() > 0.5) {
      confetti.style.width = size / 2 + 'px';
      confetti.style.height = size * 1.5 + 'px';
    }
    
    // Occasionally make circular
    if (Math.random() > 0.7) {
      confetti.style.borderRadius = '50%';
    }
    
    // Position at top of container
    confetti.style.left = (Math.random() * 100) + '%';
    confetti.style.top = '-20px';
    
    // Add physics-based animation
    const duration = 3 + Math.random() * 4;
    const horizontalMovement = -50 + Math.random() * 100; // Move left or right
    const rotationAmount = Math.random() * 720; // Up to 2 full rotations
    
    confetti.style.transition = `top ${duration}s cubic-bezier(0.4, 0, 0.2, 1), 
                                 left ${duration}s cubic-bezier(0.4, 0, 0.2, 1), 
                                 transform ${duration}s linear`;
    
    // Add to container
    container.appendChild(confetti);
    
    // Start animation after a small delay (allows for the initial rendering)
    setTimeout(() => {
      confetti.style.top = '120%';
      confetti.style.left = `calc(${confetti.style.left} + ${horizontalMovement}px)`;
      confetti.style.transform = `rotate(${rotationAmount}deg)`;
    }, 50);
    
    // Remove after animation completes
    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }
  
  // Create music indicator
  function createMusicIndicator() {
    // Create music indicator
    const indicator = document.createElement('div');
    indicator.className = 'music-indicator';
    indicator.innerHTML = `
      <span>Now Playing:</span>
      🎵
      <div class="visualizer-container">
        <div class="visualizer-bar"></div>
        <div class="visualizer-bar"></div>
        <div class="visualizer-bar"></div>
        <div class="visualizer-bar"></div>
      </div>
    `;
    
    // Style the indicator
    indicator.style.position = 'absolute';
    indicator.style.bottom = '20px';
    indicator.style.right = '20px';
    indicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    indicator.style.padding = '8px 15px';
    indicator.style.borderRadius = '30px';
    indicator.style.display = 'flex';
    indicator.style.alignItems = 'center';
    indicator.style.gap = '10px';
    indicator.style.fontSize = '14px';
    indicator.style.color = 'white';
    indicator.style.opacity = '0';
    indicator.style.transition = 'opacity 1s ease';
    
    // Style the visualizer
    const visualizer = indicator.querySelector('.visualizer-container');
    visualizer.style.display = 'flex';
    visualizer.style.alignItems = 'flex-end';
    visualizer.style.height = '15px';
    visualizer.style.gap = '2px';
    
    const bars = indicator.querySelectorAll('.visualizer-bar');
    bars.forEach((bar, i) => {
      bar.style.width = '3px';
      bar.style.backgroundColor = '#FF4081';
      bar.style.borderRadius = '1px';
      bar.style.animation = `soundBars 0.5s ease infinite alternate`;
      bar.style.animationDelay = `${i * 0.1}s`;
    });
    
    const keyframes = document.createElement('style');
    keyframes.textContent = `
      @keyframes soundBars {
        0% { height: 3px; }
        100% { height: 15px; }
      }
    `;
    document.head.appendChild(keyframes);
    
    // Add to celebration
    celebration.appendChild(indicator);
    
    // Fade in after a delay
    setTimeout(() => {
      indicator.style.opacity = '1';
    }, 2000);
  }
}

// Make sure to initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initProposalInteraction);