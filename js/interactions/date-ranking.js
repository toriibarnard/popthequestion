// Date Ranking interaction

// Initialize the date ranking interaction
function initDateRankingInteraction() {
    const dateRankingContainer = document.getElementById('dateRankingContainer');
    const checkRankingButton = document.getElementById('checkRankingButton');
    
    // Our dates to be ranked - updated with your specific dates
    const dates = [
      { id: "mercantile", name: "Mercantile and Karaoke", description: "That night at Mercantile followed by karaoke fun." },
      { id: "firstdate", name: "First Date", description: "Our very first date where we got to know each other." },
      { id: "innspring", name: "Innspring Rekindle", description: "Our special time reconnecting at Innspring." },
      { id: "underground", name: "Secret Underground Board", description: "Exploring the hidden underground board game spot." },
      { id: "thaigaming", name: "Chaa Baa Thai and Playdium", description: "Thai food dinner followed by gaming at Playdium." }
    ];
    
    // Create a container for the dates if it doesn't exist
    let datesContainer = document.getElementById('datesContainer');
    
    if (!datesContainer) {
      datesContainer = document.createElement('div');
      datesContainer.id = 'datesContainer';
      datesContainer.className = 'dates-container';
      
      if (dateRankingContainer) {
        // Find where to insert the dates container
        const description = dateRankingContainer.querySelector('p');
        if (description) {
          dateRankingContainer.insertBefore(datesContainer, description.nextSibling);
        } else {
          dateRankingContainer.appendChild(datesContainer);
        }
      }
    }
    
    // Function to create the draggable date items
    function createDraggableDates() {
      // Clear container
      datesContainer.innerHTML = '';
      
      // Shuffle the dates for initial display
      const shuffledDates = [...dates].sort(() => Math.random() - 0.5);
      
      // Create each date item
      shuffledDates.forEach((date, index) => {
        const dateElem = document.createElement('div');
        dateElem.className = 'date-item';
        dateElem.dataset.id = date.id;
        dateElem.draggable = true;
        
        // Create rank indicator
        const rankIndicator = document.createElement('div');
        rankIndicator.className = 'rank-indicator';
        rankIndicator.textContent = (index + 1).toString();
        
        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'date-content';
        
        // Date title
        const title = document.createElement('h4');
        title.textContent = date.name;
        
        // Date description
        const description = document.createElement('p');
        description.textContent = date.description;
        
        // Assemble the elements
        contentContainer.appendChild(title);
        contentContainer.appendChild(description);
        
        dateElem.appendChild(rankIndicator);
        dateElem.appendChild(contentContainer);
        
        // Set up drag and drop events
        dateElem.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', date.id);
          dateElem.classList.add('dragging');
        });
        
        dateElem.addEventListener('dragend', () => {
          dateElem.classList.remove('dragging');
        });
        
        datesContainer.appendChild(dateElem);
      });
      
      // Add drop functionality to container
      datesContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(datesContainer, e.clientY);
        const draggable = document.querySelector('.dragging');
        
        if (afterElement == null) {
          datesContainer.appendChild(draggable);
        } else {
          datesContainer.insertBefore(draggable, afterElement);
        }
        
        // Update rank numbers
        updateRanks();
      });
    }
    
    // Helper function to determine where to drop the dragged element
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.date-item:not(.dragging)')];
      
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    // Update the rank indicators after drag and drop
    function updateRanks() {
      const dateItems = document.querySelectorAll('.date-item');
      
      dateItems.forEach((item, index) => {
        const rankIndicator = item.querySelector('.rank-indicator');
        if (rankIndicator) {
          rankIndicator.textContent = (index + 1).toString();
          
          // Add special styling for top ranks
          rankIndicator.className = 'rank-indicator';
          if (index === 0) {
            rankIndicator.classList.add('gold');
          } else if (index === 1) {
            rankIndicator.classList.add('silver');
          } else if (index === 2) {
            rankIndicator.classList.add('bronze');
          }
        }
      });
    }
    
    // Create CSS for the ranking component
    function addStyles() {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .dates-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0;
          padding: 10px;
          max-height: 400px;
          overflow-y: auto;
          background-color: rgba(10, 10, 20, 0.7);
          border-radius: 10px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .date-item {
          display: flex;
          background: linear-gradient(135deg, rgba(40, 40, 60, 0.9), rgba(20, 20, 30, 0.9));
          border-radius: 8px;
          padding: 10px;
          cursor: grab;
          border-left: 4px solid #2196F3;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .date-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .date-item.dragging {
          opacity: 0.8;
          cursor: grabbing;
        }
        
        .rank-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #607D8B;
          color: #FFF;
          font-weight: bold;
          margin-right: 10px;
          flex-shrink: 0;
        }
        
        .rank-indicator.gold {
          background-color: #FFD700;
          color: #000;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        .rank-indicator.silver {
          background-color: #C0C0C0;
          color: #000;
          box-shadow: 0 0 10px rgba(192, 192, 192, 0.5);
        }
        
        .rank-indicator.bronze {
          background-color: #CD7F32;
          color: #000;
          box-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
        }
        
        .date-content {
          flex: 1;
        }
        
        .date-content h4 {
          margin: 0 0 5px 0;
          color: #FFF;
        }
        
        .date-content p {
          margin: 0;
          font-size: 0.9em;
          color: #CCC;
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
        
        /* Special styling for submit button */
        #checkRankingButton {
          background-color: #2196F3;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 0 15px rgba(33, 150, 243, 0.5);
          transition: all 0.3s ease;
          display: block;
          margin: 20px auto;
        }
        
        #checkRankingButton:hover {
          background-color: #1E88E5;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(33, 150, 243, 0.7);
        }
      `;
      
      document.head.appendChild(styleElement);
    }
    
    // Initialize the styles and draggable dates
    addStyles();
    createDraggableDates();
    
    // Handle the submit button click
    if (checkRankingButton) {
      checkRankingButton.addEventListener('click', () => {
        // Get the current ranking
        const currentRanking = [...document.querySelectorAll('.date-item')].map(item => {
          return {
            id: item.dataset.id,
            name: item.querySelector('h4').textContent
          };
        });
        
        // Clear the container
        datesContainer.innerHTML = '';
        
        // Create success message
        const message = document.createElement('div');
        message.className = 'success-message';
        
        // Generate personalized message based on her choices
        let messageHTML = '';
        messageHTML += `<p>Thank you for ranking our special dates! ❤️</p>`;
        
        if (currentRanking.length > 0) {
          messageHTML += `<p>I love that you put "${currentRanking[0].name}" as our best date. That was truly a magical time!</p>`;
        }
        
        // Comment on second/third choices
        if (currentRanking.length > 1) {
          messageHTML += `<p>"${currentRanking[1].name}" was also so special to me.</p>`;
        }
        
        if (currentRanking.length > 2) {
          messageHTML += `<p>And I'll never forget "${currentRanking[2].name}" - what a wonderful memory!</p>`;
        }
        
        messageHTML += `<p>These moments with you are what I treasure most. Thank you for being the most amazing person in my life.</p>`;
        
        message.innerHTML = messageHTML;
        datesContainer.appendChild(message);
        
        // Change button
        checkRankingButton.textContent = 'Continue Our Journey';
        checkRankingButton.style.backgroundColor = '#4CAF50';
        checkRankingButton.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.7)';
        
        // Change button functionality
        checkRankingButton.addEventListener('click', () => {
          hideInteraction('dateRankingInteraction');
          completeStage('dateRanking');
        });
      });
    }
  }
  
  // Make sure to initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initDateRankingInteraction);