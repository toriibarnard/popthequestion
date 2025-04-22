// Restaurant date interaction - Enhanced with cyberpunk theme and improved drag functionality

// Initialize the restaurant interaction
function initRestaurantInteraction() {
  const dateMemoryItems = document.getElementById('dateMemoryItems');
  const checkDateOrderButton = document.getElementById('checkDateOrderButton');
  
  // Track number of attempts
  let attempts = 0;
  
  // Date memory items with correct order
  const correctOrder = [
    "You got shy and curled up in a ball",
    "we ordered our pitiful portions of pasta",
    "'It was my pleasure'",
    "The 'Trust' incident",
    "You asked if you could kiss me"
  ];
  
  // Shuffle the memories for the game
  const shuffledMemories = [...correctOrder].sort(() => Math.random() - 0.5);
  
  // Override the showInteraction function for this specific interaction
  const originalShowInteraction = window.showInteraction;
  window.showInteraction = function(interactionId) {
    originalShowInteraction(interactionId);
    if (interactionId === 'restaurantInteraction') {
      // Apply cyberpunk styling to the interaction popup
      applyCyberpunkStyling();
    }
  };
  
  // Apply cyberpunk styling to match the city theme
  function applyCyberpunkStyling() {
    const popup = document.getElementById('restaurantInteraction');
    
    // Apply neon glow and dark background
    popup.style.backgroundColor = 'rgba(10, 10, 20, 0.95)';
    popup.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.7), 0 0 40px rgba(212, 175, 55, 0.4)';
    popup.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    
    // Style the header
    const header = popup.querySelector('h3');
    if (header) {
      header.style.color = '#D4AF37'; // Gold color
      header.style.textShadow = '0 0 5px rgba(212, 175, 55, 0.7)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      header.style.paddingBottom = '10px';
    }
    
    // Style memory container
    const memoryContainer = popup.querySelector('.memory-container');
    if (memoryContainer) {
      memoryContainer.style.backgroundColor = '#1E1E24';
      memoryContainer.style.borderRadius = '10px';
      memoryContainer.style.padding = '20px';
      memoryContainer.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
    }
    
    // Style memory items container
    if (dateMemoryItems) {
      dateMemoryItems.style.margin = '20px 0';
      dateMemoryItems.style.padding = '10px';
      dateMemoryItems.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      dateMemoryItems.style.borderRadius = '10px';
      dateMemoryItems.style.minHeight = '250px';
    }
    
    // Style button
    if (checkDateOrderButton) {
      checkDateOrderButton.style.backgroundColor = '#D4AF37';
      checkDateOrderButton.style.color = '#000';
      checkDateOrderButton.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
      checkDateOrderButton.style.fontWeight = 'bold';
      checkDateOrderButton.style.transition = 'all 0.3s ease';
      checkDateOrderButton.style.transform = 'translateY(0)';
      
      // Add hover effects
      checkDateOrderButton.addEventListener('mouseover', () => {
        checkDateOrderButton.style.backgroundColor = '#FFD700';
        checkDateOrderButton.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.8)';
        checkDateOrderButton.style.transform = 'translateY(-2px)';
      });
      
      checkDateOrderButton.addEventListener('mouseout', () => {
        checkDateOrderButton.style.backgroundColor = '#D4AF37';
        checkDateOrderButton.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
        checkDateOrderButton.style.transform = 'translateY(0)';
      });
    }
    
    // Add instructions
    const paragraph = popup.querySelector('.memory-container p');
    if (paragraph) {
      paragraph.style.color = '#FFF';
      paragraph.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
    }
    
    // Add restaurant ambiance elements
    const memoryGameSection = popup.querySelector('.memory-game-simple');
    if (memoryGameSection) {
      // Add candlelight effect
      const candleLight = document.createElement('div');
      candleLight.className = 'candle-light';
      candleLight.style.position = 'absolute';
      candleLight.style.top = '20px';
      candleLight.style.right = '20px';
      candleLight.style.width = '10px';
      candleLight.style.height = '10px';
      candleLight.style.borderRadius = '50%';
      candleLight.style.boxShadow = '0 0 20px 10px rgba(255, 200, 100, 0.5)';
      candleLight.style.animation = 'flicker 3s infinite alternate';
      memoryGameSection.insertBefore(candleLight, memoryGameSection.firstChild);
      
      // Add restaurant logo
      const logo = document.createElement('div');
      logo.className = 'restaurant-logo';
      logo.innerHTML = 'Restauranté<br>Amano';
      logo.style.position = 'absolute';
      logo.style.top = '20px';
      logo.style.left = '20px';
      logo.style.fontFamily = 'cursive, serif';
      logo.style.fontSize = '14px';
      logo.style.color = '#D4AF37';
      logo.style.textShadow = '0 0 5px rgba(212, 175, 55, 0.7)';
      logo.style.padding = '5px 10px';
      logo.style.border = '1px solid rgba(212, 175, 55, 0.5)';
      logo.style.borderRadius = '5px';
      memoryGameSection.insertBefore(logo, memoryGameSection.firstChild);
    }
    
    // Add flicker animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flicker {
        0%, 100% { opacity: 1; }
        25% { opacity: 0.8; }
        50% { opacity: 0.9; }
        75% { opacity: 0.7; }
      }
      
      @keyframes successGlow {
        0% { box-shadow: 0 0 10px rgba(76, 175, 80, 0.7); }
        50% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.9); }
        100% { box-shadow: 0 0 10px rgba(76, 175, 80, 0.7); }
      }
      
      @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
      }
      
      .memory-item {
        cursor: grab;
        margin-bottom: 10px;
        padding: 15px;
        border-radius: 8px;
        transition: all 0.3s ease;
        position: relative;
        color: #FFF;
        font-weight: 500;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        background: linear-gradient(135deg, rgba(40, 40, 60, 0.9), rgba(20, 20, 30, 0.9));
        border-left: 4px solid #D4AF37;
      }
      
      .memory-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      }
      
      .memory-item.dragging {
        opacity: 0.8;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.7);
        cursor: grabbing;
      }
      
      .memory-item::before {
        content: '❖';
        position: absolute;
        left: 10px;
        color: #D4AF37;
        font-weight: bold;
      }
      
      .memory-item {
        padding-left: 30px;
      }
      
      .memory-item.correct {
        animation: successGlow 2s infinite;
        border-left: 4px solid #4CAF50;
      }
      
      .memory-item.incorrect {
        animation: errorShake 0.5s;
        border-left: 4px solid #F44336;
      }
      
      .drag-over {
        border-top: 2px dashed rgba(212, 175, 55, 0.7);
      }
      
      .success-message {
        color: #FFD700;
        text-shadow: 0 0 5px rgba(212, 175, 55, 0.7);
        font-size: 1.1em;
        line-height: 1.6;
        text-align: center;
        margin: 20px 0;
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        animation: successGlow 2s infinite;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create draggable memory items with enhanced UI
  function createMemoryItems() {
    // Clear existing items
    dateMemoryItems.innerHTML = '';
    
    // Create new items
    shuffledMemories.forEach((memory, index) => {
      const item = document.createElement('div');
      item.className = 'memory-item';
      item.textContent = memory;
      item.draggable = true;
      item.dataset.memory = memory;
      
      // Enhanced drag start
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', memory);
        item.classList.add('dragging');
        
        // Add semi-transparency to the drag image
        setTimeout(() => {
          item.style.opacity = '0.6';
        }, 0);
      });
      
      // Enhanced drag end
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        item.style.opacity = '1';
        
        // Remove any lingering drag-over styling
        document.querySelectorAll('.drag-over').forEach(el => {
          el.classList.remove('drag-over');
        });
      });
      
      // Add drag enter/leave for visual feedback
      item.addEventListener('dragenter', (e) => {
        e.preventDefault();
        if (!item.classList.contains('dragging')) {
          item.classList.add('drag-over');
        }
      });
      
      item.addEventListener('dragleave', () => {
        item.classList.remove('drag-over');
      });
      
      // Add drop handler to each item 
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedMemory = e.dataTransfer.getData('text/plain');
        const draggedItem = Array.from(dateMemoryItems.children).find(
          child => child.dataset.memory === draggedMemory
        );
        
        if (draggedItem && draggedItem !== item) {
          // Get positions of items
          const items = Array.from(dateMemoryItems.children);
          const draggedIndex = items.indexOf(draggedItem);
          const targetIndex = items.indexOf(item);
          
          // Position determines insertion: before or after
          if (draggedIndex > targetIndex) {
            dateMemoryItems.insertBefore(draggedItem, item);
          } else {
            dateMemoryItems.insertBefore(draggedItem, item.nextSibling);
          }
        }
        
        item.classList.remove('drag-over');
      });
      
      dateMemoryItems.appendChild(item);
    });
  }
  
  // Check if the order is correct 
  function checkOrder() {
    const currentOrder = Array.from(dateMemoryItems.children).map(
      item => item.dataset.memory
    );
    
    // Check if the order matches the correct order
    const isOrderCorrect = currentOrder.every(
      (memory, index) => memory === correctOrder[index]
    );
    
    if (isOrderCorrect) {
      handleCorrectOrder();
    } else {
      handleIncorrectOrder(currentOrder);
    }
  }
  
  // Handle correct order
  function handleCorrectOrder() {
    // Highlight all items as correct
    Array.from(dateMemoryItems.children).forEach(item => {
      item.classList.add('correct');
      item.style.cursor = 'default';
      item.draggable = false;
    });
    
    // Show success message with animation
    setTimeout(() => {
      // Hide the game items with a fade effect
      Array.from(dateMemoryItems.children).forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          item.style.opacity = '0';
          item.style.transform = 'translateY(-20px)';
        }, index * 200);
      });
      
      // Show success message after items fade
      setTimeout(() => {
        dateMemoryItems.innerHTML = '';
        
        // Add restaurant background elements
        const restaurantBg = document.createElement('div');
        restaurantBg.style.position = 'absolute';
        restaurantBg.style.top = '0';
        restaurantBg.style.left = '0';
        restaurantBg.style.right = '0';
        restaurantBg.style.bottom = '0';
        restaurantBg.style.opacity = '0.2';
        restaurantBg.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
        dateMemoryItems.appendChild(restaurantBg);
        
        // Success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <p>Yes! Our first date at Restauranté Amano was unforgettable sie.</p>
          <p>I loved every second we spent together that evening</p>
        `;
        
        // Add with animation
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(20px)';
        dateMemoryItems.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.style.transition = 'opacity 1s ease, transform 1s ease';
          successMessage.style.opacity = '1';
          successMessage.style.transform = 'translateY(0)';
        }, 100);
        
        // Change button to continue
        checkDateOrderButton.textContent = 'Continue Our Journey';
        checkDateOrderButton.style.backgroundColor = '#4CAF50';
        checkDateOrderButton.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.7)';
        
        checkDateOrderButton.removeEventListener('click', checkOrder);
        checkDateOrderButton.addEventListener('click', () => {
          hideInteraction('restaurantInteraction');
          completeStage('restaurant');
          showDialog("Second stage complete! Head to the music note to discover our song.", 5000);
        });
      }, 1200);
    }, 1000);
  }
  
  // Handle incorrect order with feedback
  function handleIncorrectOrder(currentOrder) {
    attempts++;
    
    // Shake the container to indicate error
    dateMemoryItems.style.animation = 'errorShake 0.5s';
    setTimeout(() => {
      dateMemoryItems.style.animation = '';
    }, 500);
    
    // Mark incorrect positions
    Array.from(dateMemoryItems.children).forEach((item, index) => {
      if (item.dataset.memory !== correctOrder[index]) {
        item.classList.add('incorrect');
        setTimeout(() => {
          item.classList.remove('incorrect');
        }, 1000);
      }
    });
    
    // After 3 attempts, provide a hint
    if (attempts >= 3) {
      const hintMessage = document.createElement('div');
      hintMessage.className = 'memory-item';
      hintMessage.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
      hintMessage.style.color = '#FFD700';
      hintMessage.style.borderLeft = '4px solid #FFD700';
      hintMessage.style.margin = '10px 0 20px 0';
      hintMessage.style.padding = '10px';
      hintMessage.style.textAlign = 'center';
      
      if (attempts === 3) {
        hintMessage.textContent = 'Hint: The evening started with one of us being shy...';
      } else if (attempts === 4) {
        hintMessage.textContent = 'Hint: First you got shy, then we ordered food...';
      } else if (attempts >= 5) {
        hintMessage.textContent = 'Hint: The correct order is: shy → ordered → "my pleasure" → trust → kiss';
      }
      
      // Remove any existing hint
      const existingHint = document.querySelector('.memory-item[data-hint="true"]');
      if (existingHint) {
        existingHint.remove();
      }
      
      hintMessage.dataset.hint = "true";
      dateMemoryItems.parentNode.insertBefore(hintMessage, dateMemoryItems);
    }
  }
  
  // Create the memory items
  createMemoryItems();
  
  // Set up the check order button
  checkDateOrderButton.addEventListener('click', checkOrder);
}

// Make sure to initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initRestaurantInteraction);