// Restaurant date interaction

// Initialize the restaurant interaction
function initRestaurantInteraction() {
    const dateMemoryItems = document.getElementById('dateMemoryItems');
    const checkDateOrderButton = document.getElementById('checkDateOrderButton');
    
    // Date memory game items (to be arranged in correct order)
    const dateMemories = [
      "We arrived at the restaurant and were seated by the window",
      "You told me about your favorite childhood memory",
      "We shared that amazing appetizer and couldn't stop talking",
      "You laughed so hard when I spilled my drink",
      "We walked outside under the stars after dinner"
    ];
    
    // Shuffle the memories for the game
    const shuffledMemories = [...dateMemories].sort(() => Math.random() - 0.5);
    
    // Create draggable memory items
    shuffledMemories.forEach((memory, index) => {
      const item = document.createElement('div');
      item.className = 'memory-item';
      item.textContent = memory;
      item.draggable = true;
      item.dataset.index = index;
      
      // Add drag event listeners
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index);
        item.classList.add('dragging');
      });
      
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
      
      dateMemoryItems.appendChild(item);
    });
    
    // Add drop zone functionality
    dateMemoryItems.addEventListener('dragover', (e) => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      const notDragging = [...dateMemoryItems.querySelectorAll('.memory-item:not(.dragging)')];
      
      const closest = notDragging.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + box.height / 2);
        
        if (closest.offset === null || Math.abs(offset) < Math.abs(closest.offset)) {
          return { offset, element: child };
        } else {
          return closest;
        }
      }, { offset: null, element: null });
      
      if (closest.element) {
        dateMemoryItems.insertBefore(dragging, closest.element);
      } else {
        dateMemoryItems.appendChild(dragging);
      }
    });
    
    // Check order button
    checkDateOrderButton.addEventListener('click', () => {
      const currentOrder = [...dateMemoryItems.querySelectorAll('.memory-item')].map(item => item.textContent);
      
      // Since this is a personal memory, any order they create is valid
      // Just give a positive response
      
      // Hide the game
      dateMemoryItems.innerHTML = '';
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.innerHTML = `
        <p>That's exactly how I remember it too! Our first date at Restauranté Amano was unforgettable.</p>
        <p>I loved every moment we spent together that evening.</p>
      `;
      dateMemoryItems.appendChild(successMessage);
      
      // Change button to continue
      checkDateOrderButton.textContent = 'Continue Our Journey';
      checkDateOrderButton.removeEventListener('click', null);
      checkDateOrderButton.addEventListener('click', () => {
        hideInteraction('restaurantInteraction');
        completeStage('restaurant');
        showDialog("Second stage complete! Head to the music note to discover our song.", 5000);
      });
    });
  }
  
  // Make sure to initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initRestaurantInteraction);