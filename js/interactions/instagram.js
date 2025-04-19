// Instagram DM interaction

// Initialize the Instagram interaction
function initInstagramInteraction() {
    const dmSendButton = document.getElementById('dmSendButton');
    const dmResponse = document.getElementById('dmResponse');
    
    dmSendButton.addEventListener('click', () => {
      const response = dmResponse.value.trim();
      
      if (response.length > 0) {
        // Create a response message
        const dmContainer = document.querySelector('.dm-container');
        
        const responseMsg = document.createElement('div');
        responseMsg.className = 'dm-message';
        
        const responseHeader = document.createElement('div');
        responseHeader.className = 'dm-header';
        
        const username = document.createElement('span');
        username.className = 'dm-username';
        username.textContent = 'Her';
        
        const time = document.createElement('span');
        time.className = 'dm-time';
        time.textContent = '8:38 PM';
        
        responseHeader.appendChild(username);
        responseHeader.appendChild(time);
        
        const text = document.createElement('div');
        text.className = 'dm-text';
        text.textContent = response;
        
        responseMsg.appendChild(responseHeader);
        responseMsg.appendChild(text);
        
        // Add response to the container
        dmContainer.insertBefore(responseMsg, dmContainer.querySelector('.dm-typing'));
        
        // Hide input and typing
        dmContainer.querySelector('.dm-typing').style.display = 'none';
        dmResponse.style.display = 'none';
        dmSendButton.style.display = 'none';
        
        // Add final message
        setTimeout(() => {
          const finalMsg = document.createElement('div');
          finalMsg.className = 'dm-message';
          
          const finalHeader = document.createElement('div');
          finalHeader.className = 'dm-header';
          
          const finalUsername = document.createElement('span');
          finalUsername.className = 'dm-username';
          finalUsername.textContent = 'You';
          
          const finalTime = document.createElement('span');
          finalTime.className = 'dm-time';
          finalTime.textContent = '8:40 PM';
          
          finalHeader.appendChild(finalUsername);
          finalHeader.appendChild(finalTime);
          
          const finalText = document.createElement('div');
          finalText.className = 'dm-text';
          finalText.textContent = "And that's how our story began... ❤️";
          
          finalMsg.appendChild(finalHeader);
          finalMsg.appendChild(finalText);
          
          dmContainer.appendChild(finalMsg);
          
          // Add a complete button
          const completeButton = document.createElement('button');
          completeButton.className = 'interaction-button';
          completeButton.textContent = 'Continue Our Journey';
          completeButton.addEventListener('click', () => {
            hideInteraction('instagramInteraction');
            completeStage('instagram');
            showDialog("First stage complete! Head to Restauranté Amano for our first date.", 5000);
          });
          
          dmContainer.appendChild(completeButton);
        }, 1500);
      }
    });
    
    // Allow Enter key to submit
    dmResponse.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        dmSendButton.click();
      }
    });
  }
  
  // Make sure to initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initInstagramInteraction);