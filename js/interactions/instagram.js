// Instagram DM interaction - Updated with hint system and cyberpunk styling

// Initialize the Instagram interaction
function initInstagramInteraction() {
  const dmSendButton = document.getElementById('dmSendButton');
  const dmResponse = document.getElementById('dmResponse');
  const correctAnswer = "heyy, how are you?"; // The correct response
  let attempts = 0; // Track number of attempts
  
  // Set focus on input when interaction appears
  const instagramInteraction = document.getElementById('instagramInteraction');
  const originalDisplay = instagramInteraction.style.display;
  
  // Override the showInteraction function for this specific interaction
  const originalShowInteraction = window.showInteraction;
  window.showInteraction = function(interactionId) {
    originalShowInteraction(interactionId);
    if (interactionId === 'instagramInteraction') {
      setTimeout(() => dmResponse.focus(), 100);
      
      // Apply cyberpunk styling to the interaction popup
      applyCyberpunkStyling();
    }
  };
  
  // Prevent space key from triggering the game's jump functionality
  // This is critical to allow spaces in the input field
  dmResponse.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.code === 'Space') {
      e.stopPropagation(); // Stop event from bubbling up to document
    }
  });
  
  // Apply cyberpunk styling to match the city theme
  function applyCyberpunkStyling() {
    const popup = document.getElementById('instagramInteraction');
    
    // Apply neon glow and dark background
    popup.style.backgroundColor = 'rgba(10, 10, 20, 0.95)';
    popup.style.boxShadow = '0 0 20px rgba(225, 48, 108, 0.7), 0 0 40px rgba(225, 48, 108, 0.4)';
    popup.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    
    // Style the header
    const header = popup.querySelector('h3');
    if (header) {
      header.style.color = '#E1306C'; // Instagram pink
      header.style.textShadow = '0 0 5px rgba(225, 48, 108, 0.7)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      header.style.paddingBottom = '10px';
    }
    
    // Style the DM container
    const dmContainer = popup.querySelector('.dm-container');
    if (dmContainer) {
      dmContainer.style.backgroundColor = '#1E1E24';
      dmContainer.style.borderRadius = '10px';
      dmContainer.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
    }
    
    // Style messages
    const messages = popup.querySelectorAll('.dm-message');
    messages.forEach(msg => {
      msg.style.marginBottom = '15px';
    });
    
    // Style message text
    const messageTexts = popup.querySelectorAll('.dm-text');
    messageTexts.forEach(text => {
      text.style.backgroundColor = '#333';
      text.style.border = '1px solid #444';
      text.style.color = '#eee';
    });
    
    // Style input
    if (dmResponse) {
      dmResponse.style.backgroundColor = '#2A2A2A';
      dmResponse.style.color = '#FFF';
      dmResponse.style.border = '1px solid #555';
      dmResponse.style.boxShadow = '0 0 5px rgba(225, 48, 108, 0.3)';
    }
    
    // Style button
    if (dmSendButton) {
      dmSendButton.style.backgroundColor = '#E1306C';
      dmSendButton.style.boxShadow = '0 0 10px rgba(225, 48, 108, 0.5)';
      dmSendButton.style.transition = 'all 0.2s ease';
    }
  }
  
  // Generate a hint based on the number of attempts
  function generateHint(attemptCount) {
    const hintTexts = [
      "Think about what you said when we first met in DMs...",
      "It starts with 'h'...",
      "It starts with 'heyy'...",
      "It's a greeting followed by a question...",
      "Try: 'heyy, how are...'",
      "The answer is 'heyy, how are you?'"
    ];
    
    // Return appropriate hint based on attempt count (max out at the last hint)
    return hintTexts[Math.min(attemptCount - 1, hintTexts.length - 1)];
  }
  
  // Handle incorrect answer
  function handleIncorrectAnswer() {
    attempts++;
    
    // Create a hint message
    const dmContainer = document.querySelector('.dm-container');
    
    const hintMsg = document.createElement('div');
    hintMsg.className = 'dm-message system-message';
    
    const hintText = document.createElement('div');
    hintText.className = 'dm-text hint-text';
    hintText.textContent = generateHint(attempts);
    hintText.style.backgroundColor = '#553333';
    hintText.style.color = '#FF9999';
    hintText.style.fontStyle = 'italic';
    hintText.style.padding = '8px 12px';
    hintText.style.marginTop = '10px';
    hintText.style.marginBottom = '10px';
    hintText.style.borderRadius = '10px';
    hintText.style.textAlign = 'center';
    
    hintMsg.appendChild(hintText);
    
    // Add hint to the container
    dmContainer.insertBefore(hintMsg, dmContainer.querySelector('.dm-typing'));
    
    // Clear the input field
    dmResponse.value = '';
    
    // Refocus the input
    setTimeout(() => dmResponse.focus(), 100);
  }
  
  // Handle correct answer
  function handleCorrectAnswer(response) {
    // Create a response message
    const dmContainer = document.querySelector('.dm-container');
    
    // Success message
    const successMsg = document.createElement('div');
    successMsg.className = 'dm-message system-message';
    
    const successText = document.createElement('div');
    successText.className = 'dm-text success-text';
    successText.textContent = "That's exactly right! ✓";
    successText.style.backgroundColor = '#335533';
    successText.style.color = '#99FF99';
    successText.style.fontWeight = 'bold';
    successText.style.padding = '8px 12px';
    successText.style.marginTop = '10px';
    successText.style.marginBottom = '10px';
    successText.style.borderRadius = '10px';
    successText.style.textAlign = 'center';
    
    successMsg.appendChild(successText);
    
    // Add success message to the container
    dmContainer.insertBefore(successMsg, dmContainer.querySelector('.dm-typing'));
    
    // Create the user's response message
    const responseMsg = document.createElement('div');
    responseMsg.className = 'dm-message';
    
    const responseHeader = document.createElement('div');
    responseHeader.className = 'dm-header';
    
    const username = document.createElement('span');
    username.className = 'dm-username';
    username.textContent = 'Her';
    username.style.color = '#E1306C';
    
    const time = document.createElement('span');
    time.className = 'dm-time';
    time.textContent = '8:38 PM';
    
    responseHeader.appendChild(username);
    responseHeader.appendChild(time);
    
    const text = document.createElement('div');
    text.className = 'dm-text';
    text.textContent = response;
    text.style.backgroundColor = '#444';
    text.style.border = '1px solid #555';
    
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
      // Add a neon flicker effect
      dmContainer.style.animation = 'neonFlicker 1s';
      
      const finalMsg = document.createElement('div');
      finalMsg.className = 'dm-message';
      
      const finalHeader = document.createElement('div');
      finalHeader.className = 'dm-header';
      
      const finalUsername = document.createElement('span');
      finalUsername.className = 'dm-username';
      finalUsername.textContent = 'You';
      finalUsername.style.color = '#00BFFF';
      
      const finalTime = document.createElement('span');
      finalTime.className = 'dm-time';
      finalTime.textContent = '8:40 PM';
      
      finalHeader.appendChild(finalUsername);
      finalHeader.appendChild(finalTime);
      
      const finalText = document.createElement('div');
      finalText.className = 'dm-text';
      finalText.textContent = "being nonchalant";
      finalText.style.backgroundColor = '#444';
      finalText.style.border = '1px solid #555';
      
      finalMsg.appendChild(finalHeader);
      finalMsg.appendChild(finalText);
      
      dmContainer.appendChild(finalMsg);
      
      // Add a complete button
      const completeButton = document.createElement('button');
      completeButton.className = 'interaction-button';
      completeButton.textContent = 'Continue';
      completeButton.style.backgroundColor = '#E1306C';
      completeButton.style.boxShadow = '0 0 10px rgba(225, 48, 108, 0.7)';
      completeButton.style.marginTop = '20px';
      completeButton.style.transition = 'all 0.3s ease';
      completeButton.style.transform = 'translateY(0)';
      
      // Button hover effect
      completeButton.addEventListener('mouseover', () => {
        completeButton.style.backgroundColor = '#FF47A0';
        completeButton.style.boxShadow = '0 0 15px rgba(225, 48, 108, 0.9)';
        completeButton.style.transform = 'translateY(-2px)';
      });
      
      completeButton.addEventListener('mouseout', () => {
        completeButton.style.backgroundColor = '#E1306C';
        completeButton.style.boxShadow = '0 0 10px rgba(225, 48, 108, 0.7)';
        completeButton.style.transform = 'translateY(0)';
      });
      
      completeButton.addEventListener('click', () => {
        hideInteraction('instagramInteraction');
        completeStage('instagram');
        showDialog("First stage complete! Head to Restauranté Amano for our first date.", 5000);
      });
      
      dmContainer.appendChild(completeButton);
    }, 1500);
  }
  
  // Click handler for the send button
  dmSendButton.addEventListener('click', () => {
    const response = dmResponse.value.trim();
    
    if (response.length > 0) {
      // Check if the response is correct
      if (response.toLowerCase() === correctAnswer.toLowerCase()) {
        handleCorrectAnswer(response);
      } else {
        handleIncorrectAnswer();
      }
    }
  });
  
  // Allow Enter key to submit
  dmResponse.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      dmSendButton.click();
    }
  });
  
  // Add CSS for neon flicker animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes neonFlicker {
      0%, 100% { box-shadow: 0 0 10px rgba(225, 48, 108, 0.7), 0 0 20px rgba(225, 48, 108, 0.5); }
      25% { box-shadow: 0 0 5px rgba(225, 48, 108, 0.5), 0 0 10px rgba(225, 48, 108, 0.3); }
      50% { box-shadow: 0 0 15px rgba(225, 48, 108, 0.9), 0 0 30px rgba(225, 48, 108, 0.7); }
      75% { box-shadow: 0 0 5px rgba(225, 48, 108, 0.5), 0 0 10px rgba(225, 48, 108, 0.3); }
    }
    
    #instagramInteraction .dm-message {
      margin-bottom: 15px;
    }
    
    #instagramInteraction .dm-username {
      font-weight: bold;
    }
    
    #instagramInteraction .dm-text {
      border-radius: 15px;
      padding: 10px 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `;
  document.head.appendChild(style);
}

// Make sure to initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initInstagramInteraction);