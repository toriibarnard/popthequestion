// Camera/Picture Puzzle interaction

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
    
    // Create styles for the puzzle
    function addStyles() {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
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
        }
        
        .puzzle-piece.selected {
          transform: scale(0.95);
          border: 2px solid #FFC107;
          box-shadow: 0 0 15px rgba(255, 193, 7, 0.7);
          z-index: 20;
        }
        
        .piece-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255, 255, 255, 0.8);
          font-weight: bold;
          font-size: 20px;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
          z-index: 5;
          pointer-events: none;
        }
        
        .success-message {
          background-color: rgba(76, 175, 80, 0.1);
          border-left: 4px solid #4CAF50;
          padding: 15px;
          margin-top: 20px;
          border-radius: 8px;
          animation: fadeIn 1s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        @keyframes flash {
          0% { opacity: 0; }
          15% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .completed-image {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: 5px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          margin: 0 auto;
          display: block;
          animation: fadeIn 1s;
        }
      `;
      
      document.head.appendChild(styleElement);
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
        
        // Add piece number for debugging (can be removed in final version)
        const pieceNumber = document.createElement('div');
        pieceNumber.className = 'piece-number';
        pieceNumber.textContent = index + 1;
        piece.appendChild(pieceNumber);
        
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
      
      // Create success message
      const message = document.createElement('div');
      message.className = 'success-message';
      message.innerHTML = `
        <p>Perfect! The picture is complete! ❤️</p>
        <p>This is one of my favorite memories with you.</p>
      `;
      
      // Add the completed image
      const completedImage = document.createElement('img');
      completedImage.src = imagePath;
      completedImage.alt = 'Our Favorite Picture';
      completedImage.className = 'completed-image';
      
      // Add to the puzzle container
      puzzleContainer.appendChild(message);
      puzzleContainer.appendChild(completedImage);
      
      // Change button text
      checkPuzzleButton.textContent = 'Continue Our Journey';
      checkPuzzleButton.style.backgroundColor = '#4CAF50';
      checkPuzzleButton.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.7)';
      
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
        
        const pieceNumber = document.createElement('div');
        pieceNumber.className = 'piece-number';
        pieceNumber.textContent = i + 1;
        piece.appendChild(pieceNumber);
        
        puzzleContainer.appendChild(piece);
      }
      
      // Show an error message
      const errorMsg = document.createElement('div');
      errorMsg.style.color = 'white';
      errorMsg.style.padding = '10px';
      errorMsg.style.textAlign = 'center';
      errorMsg.textContent = 'Image couldn\'t be loaded. Please try rearranging the colored tiles.';
      
      puzzleContainer.parentNode.insertBefore(errorMsg, puzzleContainer.nextSibling);
    }
    
    // Override showInteraction to prepare the puzzle when opened
    const originalShowInteraction = window.showInteraction;
    window.showInteraction = function(interactionId) {
      originalShowInteraction(interactionId);
      if (interactionId === 'cameraInteraction') {
        // Reset puzzle when interaction is shown
        if (!imageLoaded) {
          preloadImage();
        } else {
          createPuzzle();
        }
      }
    };
    
    // Initialize styles and event handlers
    addStyles();
    
    // Set up check button
    if (checkPuzzleButton) {
      checkPuzzleButton.addEventListener('click', checkButtonHandler);
    }
  }
  
  // Make sure to initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initCameraInteraction);