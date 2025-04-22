// Camera/Picture Puzzle interaction

// Initialize the camera interaction
function initCameraInteraction() {
    const puzzleContainer = document.getElementById('puzzleContainer');
    const checkPuzzleButton = document.getElementById('checkPuzzleButton');
    
    // Configuration
    const imagePath = 'images/couple.png'; // Path from root directory
    const puzzleSize = 3; // 3x3 grid for easier solving
    let pieces = [];
    let selectedPiece = null;
    let puzzleSolved = false;
    
    // Create the puzzle pieces
    function createPuzzle() {
      // Clear puzzle container
      puzzleContainer.innerHTML = '';
      
      // Generate indices for the puzzle pieces (0-8 for 3x3)
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
        piece.style.backgroundPosition = `${-col * 100 / (puzzleSize-1)}% ${-row * 100 / (puzzleSize-1)}%`;
        piece.style.backgroundImage = `url('${imagePath}')`;
        piece.style.backgroundSize = `${puzzleSize * 100}%`;
        
        // Add piece number as fallback
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
    function isSolvable(indices) {
      let inversions = 0;
      for (let i = 0; i < indices.length; i++) {
        for (let j = i + 1; j < indices.length; j++) {
          if (indices[i] > indices[j]) {
            inversions++;
          }
        }
      }
      
      // For a 3x3 grid, the puzzle is solvable if the number of inversions is even
      return inversions % 2 === 0;
    }
    
    // Check if puzzle is already solved
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
      
      // Update the DOM positions
      const temp = piece1.style.order;
      piece1.style.order = piece2.style.order;
      piece2.style.order = temp;
      
      // Swap positions in the array for easier checking
      const index1 = pieces.indexOf(piece1);
      const index2 = pieces.indexOf(piece2);
      [pieces[index1], pieces[index2]] = [pieces[index2], pieces[index1]];
    }
    
    // Check if the puzzle is solved
    function checkPuzzleSolved() {
      const solved = pieces.every(piece => {
        return parseInt(piece.dataset.correctPosition) === parseInt(piece.dataset.currentPosition);
      });
      
      if (solved && !puzzleSolved) {
        puzzleSolved = true;
        showCompletionMessage();
      }
    }
    
    // Show completion message
    function showCompletionMessage() {
      // Add success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Perfect! You completed our favorite picture! ❤️';
      puzzleContainer.parentNode.insertBefore(successMessage, puzzleContainer.nextSibling);
      
      // Update button to continue
      checkPuzzleButton.textContent = 'Continue Our Journey';
      checkPuzzleButton.classList.add('success-button');
    }
    
    // Check button handler
    function checkButtonHandler() {
      if (puzzleSolved) {
        // Only proceed if the puzzle is solved
        hideInteraction('cameraInteraction');
        completeStage('camera');
      } else {
        // Show a hint if the puzzle isn't completed yet
        alert('The picture isn\'t quite right yet. Keep rearranging the pieces!');
      }
    }
    
    // Handle image loading errors
    function handleImageError() {
      console.error('Failed to load image:', imagePath);
      
      // Create a fallback colored grid
      puzzleContainer.innerHTML = '';
      
      for (let i = 0; i < puzzleSize * puzzleSize; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = 'none';
        piece.style.backgroundColor = `hsl(${i * 40}, 70%, 65%)`;
        
        const pieceNumber = document.createElement('div');
        pieceNumber.className = 'piece-number';
        pieceNumber.textContent = i + 1;
        piece.appendChild(pieceNumber);
        
        puzzleContainer.appendChild(piece);
      }
      
      // Add error message
      const errorMsg = document.createElement('p');
      errorMsg.className = 'error-message';
      errorMsg.textContent = 'Our picture couldn\'t be loaded. Try rearranging the numbered tiles instead.';
      puzzleContainer.parentNode.insertBefore(errorMsg, puzzleContainer);
    }
    
    // Initialize the camera interaction when shown
    function onInteractionShown(event) {
      if (event.detail === 'cameraInteraction') {
        puzzleSolved = false; // Reset solved state
        createPuzzle();
        
        // Check if image exists
        const testImage = new Image();
        testImage.onload = () => console.log('Image loaded successfully');
        testImage.onerror = handleImageError;
        testImage.src = imagePath;
        
        // Reset button text
        checkPuzzleButton.textContent = 'Complete Picture';
        checkPuzzleButton.classList.remove('success-button');
        
        // Remove any previous success messages
        const oldMessages = document.querySelectorAll('.success-message, .error-message');
        oldMessages.forEach(msg => msg.remove());
      }
    }
    
    // Set up event listeners
    document.addEventListener('showInteraction', onInteractionShown);
    
    // Set up check button
    if (checkPuzzleButton) {
      checkPuzzleButton.addEventListener('click', checkButtonHandler);
    }
    
    // Add CSS styles for the puzzle
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .puzzle-container {
        display: grid;
        grid-template-columns: repeat(${puzzleSize}, 1fr);
        grid-gap: 4px;
        width: 300px;
        height: 300px;
        margin: 0 auto;
        background-color: #212121;
        padding: 5px;
        border-radius: 5px;
      }
      
      .puzzle-piece {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: ${puzzleSize * 100}%;
        cursor: pointer;
        border: 2px solid #3F51B5;
        border-radius: 3px;
        transition: transform 0.2s ease;
      }
      
      .puzzle-piece:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px rgba(63, 81, 181, 0.5);
        z-index: 2;
      }
      
      .puzzle-piece.selected {
        border: 2px solid #FF4081;
        box-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
        z-index: 10;
      }
      
      .piece-number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-weight: bold;
        text-shadow: 0 0 3px black, 0 0 5px black;
        font-size: 18px;
      }
      
      .success-message {
        background-color: rgba(76, 175, 80, 0.2);
        border-left: 4px solid #4CAF50;
        color: white;
        padding: 10px;
        margin-top: 15px;
        text-align: center;
        border-radius: 4px;
      }
      
      .error-message {
        background-color: rgba(244, 67, 54, 0.2);
        border-left: 4px solid #F44336;
        color: white;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
        border-radius: 4px;
      }
      
      .success-button {
        background-color: #4CAF50 !important;
        box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  // Initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initCameraInteraction);