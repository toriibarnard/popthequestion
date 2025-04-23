// Camera/Picture Puzzle interaction - Enhanced with cyberpunk theme

// Initialize the camera interaction
function initCameraInteraction() {
    const puzzleContainer = document.getElementById('puzzleContainer');
    const checkPuzzleButton = document.getElementById('checkPuzzleButton');
    
    // Configuration
    const imagePath = 'images/couple.png'; // Path to your image
    const puzzleSize = 4; // 4x4 grid = 16 pieces
    let pieces = [];
    let selectedPiece = null;
    let imageLoaded = false;
    // Track if styling has been applied
    let isStylingApplied = false;
    
    // Override the showInteraction function for this specific interaction
    const originalShowInteraction = window.showInteraction;
    window.showInteraction = function(interactionId) {
      originalShowInteraction(interactionId);
      if (interactionId === 'cameraInteraction' && !isStylingApplied) {
        // Apply cyberpunk styling to the interaction popup
        applyCyberpunkStyling();
        isStylingApplied = true;
        
        // Reset puzzle when interaction is shown
        if (!imageLoaded) {
          preloadImage();
        } else {
          createPuzzle();
        }
      }
    };
    
    // Apply cyberpunk styling to match the city theme
    function applyCyberpunkStyling() {
      const popup = document.getElementById('cameraInteraction');
      
      // Apply neon glow and dark background
      popup.style.backgroundColor = 'rgba(10, 10, 20, 0.95)';
      popup.style.boxShadow = '0 0 20px rgba(33, 150, 243, 0.7), 0 0 40px rgba(33, 150, 243, 0.4)';
      popup.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      popup.style.maxHeight = '90vh';
      popup.style.overflowY = 'auto';
      
      // Style the header
      const header = popup.querySelector('h3');
      if (header) {
        header.style.color = '#2196F3'; // Blue for camera
        header.style.textShadow = '0 0 5px rgba(33, 150, 243, 0.7)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        header.style.paddingBottom = '10px';
        header.style.fontSize = '28px';
        header.style.fontWeight = 'bold';
        header.style.marginTop = '10px';
        
        // Add camera icon
        const cameraIcon = document.createElement('span');
        cameraIcon.innerHTML = '📸';
        cameraIcon.style.marginRight = '10px';
        header.prepend(cameraIcon);
      }
      
      // Style the puzzle container
      const puzzleSection = puzzleContainer.parentElement;
      if (puzzleSection) {
        puzzleSection.style.backgroundColor = '#1E1E24';
        puzzleSection.style.borderRadius = '10px';
        puzzleSection.style.padding = '20px';
        puzzleSection.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
        puzzleSection.style.color = '#FFF';
        puzzleSection.style.position = 'relative';
        
        // Add description if not exists
        const existingDesc = puzzleSection.querySelector('p');
        if (!existingDesc) {
          const description = document.createElement('p');
          description.innerHTML = '📸 <span class="neon-text">Our memories</span> are captured in this photo. Can you piece them back together?';
          description.style.fontSize = '18px';
          description.style.marginBottom = '20px';
          description.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.7)';
          puzzleSection.insertBefore(description, puzzleContainer);
        } else {
          existingDesc.innerHTML = '📸 <span class="neon-text">Our memories</span> are captured in this photo. Can you piece them back together?';
          existingDesc.style.fontSize = '18px';
          existingDesc.style.marginBottom = '20px';
          existingDesc.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.7)';
        }
        
        // Add cyberpunk grid background
        const gridBackground = document.createElement('div');
        gridBackground.className = 'puzzle-grid-background';
        gridBackground.style.position = 'absolute';
        gridBackground.style.top = '0';
        gridBackground.style.left = '0';
        gridBackground.style.right = '0';
        gridBackground.style.bottom = '0';
        gridBackground.style.pointerEvents = 'none';
        gridBackground.style.zIndex = '0';
        gridBackground.style.opacity = '0.1';
        gridBackground.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.657 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 11.97l7.07 7.242zm-2.827 2.83l1.414-1.416L30 15.84l-5.657 5.658 1.414 1.415L30 18.572l4.243 4.243zm-2.83 2.827l1.415-1.414L30 22.344l-2.828 2.83 1.414 1.414L30 25.172l1.414 1.415z%22 fill%3D%22%232196F3%22 fill-opacity%3D%220.4%22 fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')";
        puzzleSection.insertBefore(gridBackground, puzzleSection.firstChild);
      }
      
      // Style button
      if (checkPuzzleButton) {
        checkPuzzleButton.style.backgroundColor = '#2196F3';
        checkPuzzleButton.style.color = '#FFF';
        checkPuzzleButton.style.fontWeight = 'bold';
        checkPuzzleButton.style.padding = '12px 30px';
        checkPuzzleButton.style.borderRadius = '30px';
        checkPuzzleButton.style.border = 'none';
        checkPuzzleButton.style.boxShadow = '0 0 15px rgba(33, 150, 243, 0.5)';
        checkPuzzleButton.style.transition = 'all 0.3s ease';
        checkPuzzleButton.style.transform = 'translateY(0)';
        checkPuzzleButton.style.position = 'relative';
        checkPuzzleButton.style.zIndex = '10';
        checkPuzzleButton.style.margin = '20px auto';
        checkPuzzleButton.style.display = 'block';
        
        // Add hover effects
        checkPuzzleButton.addEventListener('mouseover', () => {
          checkPuzzleButton.style.backgroundColor = '#1E88E5';
          checkPuzzleButton.style.boxShadow = '0 0 20px rgba(33, 150, 243, 0.8)';
          checkPuzzleButton.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        checkPuzzleButton.addEventListener('mouseout', () => {
          checkPuzzleButton.style.backgroundColor = '#2196F3';
          checkPuzzleButton.style.boxShadow = '0 0 15px rgba(33, 150, 243, 0.5)';
          checkPuzzleButton.style.transform = 'translateY(0) scale(1)';
        });
      }
      
      // Add animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes flash {
          0% { opacity: 0; }
          15% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(33, 150, 243, 0.5); }
          50% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.8); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(33, 150, 243, 0.7); }
          50% { text-shadow: 0 0 15px rgba(33, 150, 243, 0.9); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
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
        
        .neon-text {
          color: #2196F3;
          animation: glow 2s infinite;
          font-weight: bold;
        }
        
        .puzzle-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 2px;
          width: 300px;
          height: 300px;
          margin: 20px auto;
          background-color: rgba(10, 10, 20, 0.7);
          padding: 5px;
          border-radius: 5px;
          box-shadow: 0 0 15px rgba(33, 150, 243, 0.5);
          position: relative;
          z-index: 5;
          animation: pulse 4s infinite;
        }
        
        .puzzle-piece {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
          overflow: hidden;
          background-size: 400% 400%;
          background-image: url('${imagePath}');
          box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.3);
        }
        
        .puzzle-piece:hover {
          transform: scale(0.98);
          box-shadow: 0 0 10px rgba(33, 150, 243, 0.7);
          z-index: 10;
          border: 1px solid rgba(33, 150, 243, 0.5);
        }
        
        .puzzle-piece.selected {
          transform: scale(0.95);
          border: 2px solid #FFC107;
          box-shadow: 0 0 15px rgba(255, 193, 7, 0.7);
          z-index: 20;
        }
        
        .camera-flash {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: white;
          opacity: 0;
          z-index: 100;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        
        .success-message {
          background-color: rgba(76, 175, 80, 0.1);
          border-left: 4px solid #4CAF50;
          padding: 15px;
          margin-top: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          animation: fadeIn 1s;
        }
        
        .success-message p {
          margin: 10px 0;
          line-height: 1.6;
          color: #FFF;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
        }
        
        .success-message strong {
          color: #4CAF50;
          font-weight: bold;
        }
        
        .completed-image {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: 5px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          margin: 15px auto;
          display: block;
          animation: fadeIn 1s;
          border: 3px solid rgba(33, 150, 243, 0.7);
          transition: all 0.3s ease;
        }
        
        .completed-image:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
          border-color: rgba(33, 150, 243, 1);
        }
        
        .photo-frame {
          position: relative;
          padding: 10px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          margin: 10px auto;
          width: fit-content;
        }
        
        .photo-frame::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          width: 40px;
          height: 10px;
          background: #2196F3;
          transform: translateX(-50%);
          border-radius: 5px;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Create styles for the puzzle
    function addStyles() {
      // Nothing needed here - styles are now added in applyCyberpunkStyling
    }
    
    // Create the puzzle pieces
    function createPuzzle() {
      // Clear puzzle container
      puzzleContainer.innerHTML = '';
      
      // Generate indices for the puzzle pieces (0-15)
      const indices = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => i);
      
      // Shuffle the indices (but ensure it's solvable)
      do {
        shuffleArray(indices);
      } while (!isSolvable(indices) || isAlreadySolved(indices));
      
      // Create the puzzle pieces
      indices.forEach((index, position) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.correctPosition = index; // Store the correct position
        piece.dataset.currentPosition = position; // Store the current position
        
        // Calculate background position for this piece
        const row = Math.floor(index / puzzleSize);
        const col = index % puzzleSize;
        
        // Set the background position to show the correct part of the image
        piece.style.backgroundPosition = `${-col * 100}% ${-row * 100}%`;
        
        // Add holographic overlay effect
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.background = 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, transparent 50%, rgba(33, 150, 243, 0.1) 100%)';
        overlay.style.pointerEvents = 'none';
        piece.appendChild(overlay);
        
        // Add click event to select/swap pieces
        piece.addEventListener('click', () => {
          if (selectedPiece === null) {
            // First piece selected
            selectedPiece = piece;
            piece.classList.add('selected');
          } else if (selectedPiece === piece) {
            // Same piece clicked, deselect it
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
          } else {
            // Second piece selected, swap them
            swapPieces(selectedPiece, piece);
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            
            // Check if puzzle is solved
            checkPuzzleSolved();
          }
        });
        
        puzzleContainer.appendChild(piece);
        pieces.push(piece);
      });
    }
    
    // Shuffle array using Fisher-Yates algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
    // Check if a puzzle configuration is solvable
    // For a puzzle to be solvable in a square grid:
    // - If grid width is odd, the number of inversions must be even
    // - If grid width is even, (inversions + blank row from bottom) must be even
    // Since we don't have a blank space, we'll just check if inversions is even
    function isSolvable(indices) {
      let inversions = 0;
      for (let i = 0; i < indices.length; i++) {
        for (let j = i + 1; j < indices.length; j++) {
          if (indices[i] > indices[j]) {
            inversions++;
          }
        }
      }
      
      // For a 4x4 grid, the puzzle is solvable if the number of inversions is even
      return inversions % 2 === 0;
    }
    
    // Check if puzzle is already solved (to avoid creating an already solved puzzle)
    function isAlreadySolved(indices) {
      return indices.every((index, position) => index === position);
    }
    
    // Swap two pieces
    function swapPieces(piece1, piece2) {
      // Get the current positions
      const pos1 = parseInt(piece1.dataset.currentPosition);
      const pos2 = parseInt(piece2.dataset.currentPosition);
      
      // Swap the positions
      piece1.dataset.currentPosition = pos2;
      piece2.dataset.currentPosition = pos1;
      
      // Update the DOM positions by re-appending in the correct order
      const parent = puzzleContainer;
      
      // Get all pieces in their current order
      const pieces = Array.from(parent.children);
      
      // Create a new array with the swapped positions
      const newOrder = [...pieces];
      newOrder[pos1] = piece2;
      newOrder[pos2] = piece1;
      
      // Clear and re-append in the new order
      parent.innerHTML = '';
      newOrder.forEach(piece => parent.appendChild(piece));
    }
    
    // Check if the puzzle is solved
    function checkPuzzleSolved() {
      const solved = pieces.every(piece => {
        return parseInt(piece.dataset.correctPosition) === parseInt(piece.dataset.currentPosition);
      });
      
      if (solved) {
        // Display camera flash effect
        const flash = document.createElement('div');
        flash.className = 'camera-flash';
        document.body.appendChild(flash);
        
        // Add flash animation
        flash.style.animation = 'flash 0.5s forwards';
        
        // Add camera shutter sound
        const shutterSound = new Audio('data:audio/mp3;base64,SUQzAwAAAAAAD1RJVDIAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/6k2AAkAAEAAAYAJgCQAABgAg6AvJ0BEJAAB4zqBAABjyPK/BwSAAAAAAA8PDw8P8e97dDw8AD/4fmf/+UEzHB6GYQEyASLPPt5ihBDHX//1zczKD4YwQYeOhwYkfvf///ND3HP/0d7kQ1HwFJVRxjJGqn7mJEEKBAYLZeGBgfpAZHhiJaO0MUX9JURi1U/+Xkpz0tMrXs1s5UQX56c9LT/5eSuWnPSfGIYg4ZXsYoKr/5AkBMj0KoBhGJxiFQU/qUvlllvFVTw4L/7VihJY///6lCQQQFhADExSiEGZgGEgUE6PnYNSKQsQX//6GqVE8MDwxofG5cXPv//+aXKUq//j/4NRMNRM0QwHAL/82IDnLvxDwKpjKRkOhwaDfDICLNY/KrU9PJe5IqLX3yx/6//3vcVsahTxwVYTD5LVc/c1IoYaAJBgAA');
        shutterSound.play();
        
        // Vibrate if available for tactile feedback
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
        
        // Remove flash after animation
        setTimeout(() => {
          flash.remove();
          showCompletedPicture();
        }, 600);
      }
    }
    
    // Show the completed picture
    function showCompletedPicture() {
      // Clear puzzle container
      puzzleContainer.innerHTML = '';
      
      // Create hearts animation
      createHearts();
      
    // Function to create floating hearts
    function createHearts() {
      const container = document.getElementById('cameraInteraction');
      
      // Create 20 hearts and position them randomly
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.className = 'heart';
          heart.innerHTML = '❤️';
          
          // Random position at the bottom
          heart.style.left = Math.random() * 100 + '%';
          heart.style.bottom = '10%';
          
          // Random animation duration
          heart.style.animationDuration = (2 + Math.random() * 3) + 's';
          
          container.appendChild(heart);
          
          // Remove heart after animation completes
          setTimeout(() => {
            heart.remove();
          }, 5000);
        }, i * 200); // Stagger heart creation
      }
    }
      
      // Create photo frame
      const photoFrame = document.createElement('div');
      photoFrame.className = 'photo-frame';
      
      // Add the completed image
      const completedImage = document.createElement('img');
      completedImage.src = imagePath;
      completedImage.alt = 'Our Favorite Picture';
      completedImage.className = 'completed-image';
      completedImage.style.width = '250px';
      completedImage.style.height = 'auto';
      
      // Add to the photo frame
      photoFrame.appendChild(completedImage);
      
      // Create success message
      const message = document.createElement('div');
      message.className = 'success-message';
      message.innerHTML = `
        <p><strong>Perfect!</strong> ❤️ This is one of my favorite memories with you.</p>
      `;
      
      // Add to the puzzle container
      puzzleContainer.appendChild(photoFrame);
      puzzleContainer.appendChild(message);
      
      // Change button text
      checkPuzzleButton.textContent = 'Continue Our Journey';
      checkPuzzleButton.style.backgroundColor = '#4CAF50';
      checkPuzzleButton.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.7)';
      checkPuzzleButton.style.animation = 'pulse 2s infinite';
      
      // Update button functionality
      checkPuzzleButton.removeEventListener('click', checkButtonHandler);
      checkPuzzleButton.addEventListener('click', () => {
        hideInteraction('cameraInteraction');
        completeStage('camera');
      });
    }
    
    // Check button handler
    function checkButtonHandler() {
      // Manual check - complete the puzzle regardless of current state
      showCompletedPicture();
    }
    
    // Preload the image to ensure it's available for the puzzle
    function preloadImage() {
      const img = new Image();
      img.onload = () => {
        imageLoaded = true;
        console.log("Image loaded successfully");
        createPuzzle();
      };
      
      img.onerror = () => {
        console.error("Failed to load image:", imagePath);
        imageLoaded = false;
        
        // Create a placeholder if image fails to load
        createPlaceholder();
      };
      
      img.src = imagePath;
    }
    
    // Create a placeholder if the image fails to load
    function createPlaceholder() {
      puzzleContainer.innerHTML = '';
      
      for (let i = 0; i < puzzleSize * puzzleSize; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = 'none';
        piece.style.backgroundColor = `hsl(${i * 20}, 70%, 50%)`;
        piece.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
        puzzleContainer.appendChild(piece);
      }
      
      // Show an error message
      const errorMsg = document.createElement('div');
      errorMsg.style.color = 'white';
      errorMsg.style.padding = '10px';
      errorMsg.style.textAlign = 'center';
      errorMsg.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
      errorMsg.style.margin = '10px 0';
      errorMsg.style.borderRadius = '5px';
      errorMsg.textContent = 'Image couldn\'t be loaded. Please try rearranging the colored tiles.';
      errorMsg.style.borderLeft = '4px solid #F44336';
      
      puzzleContainer.parentNode.insertBefore(errorMsg, puzzleContainer.nextSibling);
    }
    
    // Set up check button
    if (checkPuzzleButton) {
      checkPuzzleButton.addEventListener('click', checkButtonHandler);
    }
  }
  
  // Make sure to initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initCameraInteraction);