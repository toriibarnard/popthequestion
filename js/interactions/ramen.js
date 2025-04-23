// Tantanmen Ramen interaction - Enhanced with cyberpunk theme

// Initialize the ramen interaction
function initRamenInteraction() {
  const toppingOptions = document.getElementById('toppingOptions');
  const checkRamenButton = document.getElementById('checkRamenButton');
  
  // Track if interaction has been styled
  let isStylingApplied = false;
  
  // Correct toppings for Tantanmen - the ones you normally get
  const correctToppings = ["noodles", "sauce", "pork", "sprouts", "corn"];
  
  // All Tantanmen toppings options
  const toppings = [
    { name: "Noodles", id: "noodles", description: "Fresh ramen noodles" },
    { name: "Tantanmen Sauce", id: "sauce", description: "Spicy sauce" },
    { name: "Ground Pork", id: "pork", description: "Seasoned minced pork" },
    { name: "Menma (Bamboo Shoots)", id: "menma", description: "Fermented bamboo shoots" },
    { name: "Ajitama (Soft Boiled Egg)", id: "egg", description: "Marinated soft-boiled egg" },
    { name: "Bean Sprouts", id: "sprouts", description: "Crunchy bean sprouts" },
    { name: "Corn", id: "corn", description: "Sweet yellow corn" }
  ];
  
  // Override the showInteraction function for this specific interaction
  const originalShowInteraction = window.showInteraction;
  window.showInteraction = function(interactionId) {
    originalShowInteraction(interactionId);
    if (interactionId === 'ramenInteraction' && !isStylingApplied) {
      // Apply cyberpunk styling to the interaction popup
      applyCyberpunkStyling();
      isStylingApplied = true;
    }
  };
  
  // Apply cyberpunk styling to match the city theme
  function applyCyberpunkStyling() {
    const popup = document.getElementById('ramenInteraction');
    
    // Apply neon glow and dark background
    popup.style.backgroundColor = 'rgba(10, 10, 20, 0.95)';
    popup.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.7), 0 0 40px rgba(255, 87, 34, 0.4)';
    popup.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    popup.style.maxHeight = '90vh';
    popup.style.overflowY = 'auto';
    
    // Style the header
    const header = popup.querySelector('h3');
    if (header) {
      header.style.color = '#FF5722'; // Orange for ramen
      header.style.textShadow = '0 0 5px rgba(255, 87, 34, 0.7)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      header.style.paddingBottom = '10px';
      header.style.fontSize = '28px';
      header.style.fontWeight = 'bold';
      header.style.marginTop = '10px';
      
      // Add ramen bowl icon
      const ramenIcon = document.createElement('span');
      ramenIcon.innerHTML = '🍜';
      ramenIcon.style.marginRight = '10px';
      header.prepend(ramenIcon);
    }
    
    // Style the food container
    const foodContainer = popup.querySelector('.food-container');
    if (foodContainer) {
      foodContainer.style.backgroundColor = '#1E1E24';
      foodContainer.style.borderRadius = '10px';
      foodContainer.style.padding = '20px';
      foodContainer.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
      foodContainer.style.color = '#FFF';
      foodContainer.style.position = 'relative';
      
      // Add steam animation elements
      for (let i = 0; i < 5; i++) {
        const steam = document.createElement('div');
        steam.className = 'steam-particle';
        steam.style.position = 'absolute';
        steam.style.top = '50px';
        steam.style.left = `${50 + (i * 20)}%`;
        steam.style.width = '8px';
        steam.style.height = '20px';
        steam.style.background = 'rgba(255, 255, 255, 0.3)';
        steam.style.borderRadius = '50%';
        steam.style.filter = 'blur(5px)';
        steam.style.animation = `steam ${1 + Math.random()}s ease-in-out infinite`;
        steam.style.animationDelay = `${i * 0.2}s`;
        steam.style.transform = 'translateX(-50%)';
        steam.style.zIndex = '1';
        foodContainer.appendChild(steam);
      }
      
      // Add ambiance elements
      const ambiance = document.createElement('div');
      ambiance.className = 'ramen-ambiance';
      ambiance.style.position = 'absolute';
      ambiance.style.top = '0';
      ambiance.style.left = '0';
      ambiance.style.right = '0';
      ambiance.style.bottom = '0';
      ambiance.style.pointerEvents = 'none';
      ambiance.style.zIndex = '0';
      ambiance.style.opacity = '0.1';
      ambiance.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.657 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 11.97l7.07 7.242zm-2.827 2.83l1.414-1.416L30 15.84l-5.657 5.658 1.414 1.415L30 18.572l4.243 4.243zm-2.83 2.827l1.415-1.414L30 22.344l-2.828 2.83 1.414 1.414L30 25.172l1.414 1.415z%22 fill%3D%22%23ffffff%22 fill-opacity%3D%220.4%22 fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')";
      foodContainer.insertBefore(ambiance, foodContainer.firstChild);
      
      // Enhance description
      const description = foodContainer.querySelector('p');
      if (description) {
        description.innerHTML = '🍜 <span class="neon-text">Tantanmen</span> is our favorite ramen! Select the toppings we usually get:';
        description.style.fontSize = '18px';
        description.style.marginBottom = '20px';
        description.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.7)';
      }
    }
    
    // Style topping options container
    if (toppingOptions) {
      toppingOptions.style.display = 'grid';
      toppingOptions.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
      toppingOptions.style.gap = '15px';
      toppingOptions.style.margin = '20px 0';
    }
    
    // Style button
    if (checkRamenButton) {
      checkRamenButton.style.backgroundColor = '#FF5722';
      checkRamenButton.style.color = '#FFF';
      checkRamenButton.style.fontWeight = 'bold';
      checkRamenButton.style.padding = '12px 30px';
      checkRamenButton.style.borderRadius = '30px';
      checkRamenButton.style.border = 'none';
      checkRamenButton.style.boxShadow = '0 0 15px rgba(255, 87, 34, 0.5)';
      checkRamenButton.style.transition = 'all 0.3s ease';
      checkRamenButton.style.transform = 'translateY(0)';
      checkRamenButton.style.position = 'relative';
      checkRamenButton.style.zIndex = '10';
      
      // Add hover effects
      checkRamenButton.addEventListener('mouseover', () => {
        checkRamenButton.style.backgroundColor = '#FF7043';
        checkRamenButton.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.8)';
        checkRamenButton.style.transform = 'translateY(-2px) scale(1.05)';
      });
      
      checkRamenButton.addEventListener('mouseout', () => {
        checkRamenButton.style.backgroundColor = '#FF5722';
        checkRamenButton.style.boxShadow = '0 0 15px rgba(255, 87, 34, 0.5)';
        checkRamenButton.style.transform = 'translateY(0) scale(1)';
      });
    }
    
    // Add ramen bowl animation
    const ramenBowlContainer = document.createElement('div');
    ramenBowlContainer.className = 'ramen-bowl-container';
    ramenBowlContainer.style.position = 'absolute';
    ramenBowlContainer.style.bottom = '10px';
    ramenBowlContainer.style.right = '10px';
    ramenBowlContainer.style.width = '100px';
    ramenBowlContainer.style.height = '100px';
    ramenBowlContainer.style.zIndex = '1';
    ramenBowlContainer.style.opacity = '0.3';
    ramenBowlContainer.style.pointerEvents = 'none';
    
    // Bowl
    const bowl = document.createElement('div');
    bowl.className = 'ramen-bowl';
    bowl.style.position = 'absolute';
    bowl.style.bottom = '0';
    bowl.style.left = '10px';
    bowl.style.width = '80px';
    bowl.style.height = '40px';
    bowl.style.borderRadius = '0 0 40px 40px';
    bowl.style.background = 'linear-gradient(to bottom, #FF5722, #D84315)';
    bowl.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.7)';
    ramenBowlContainer.appendChild(bowl);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes steam {
        0% { opacity: 0.7; transform: translateY(0) translateX(-50%); }
        50% { opacity: 0.3; }
        100% { opacity: 0; transform: translateY(-30px) translateX(-50%); }
      }
      
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 15px rgba(255, 87, 34, 0.5); }
        50% { box-shadow: 0 0 20px rgba(255, 87, 34, 0.8); }
      }
      
      @keyframes glow {
        0%, 100% { text-shadow: 0 0 5px rgba(255, 87, 34, 0.7); }
        50% { text-shadow: 0 0 15px rgba(255, 87, 34, 0.9); }
      }
      
      .neon-text {
        color: #FF5722;
        animation: glow 2s infinite;
        font-weight: bold;
      }
      
      .topping-option {
        position: relative;
        background: linear-gradient(135deg, rgba(40, 40, 60, 0.9), rgba(20, 20, 30, 0.9));
        border-left: 4px solid #FF5722;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: all 0.3s ease;
        color: #FFF;
        text-align: left;
        display: flex;
        align-items: center;
      }
      
      .topping-option:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        background: linear-gradient(135deg, rgba(50, 50, 70, 0.9), rgba(30, 30, 40, 0.9));
      }
      
      .topping-option.selected {
        border-left: 4px solid #4CAF50;
        background: linear-gradient(135deg, rgba(40, 60, 40, 0.9), rgba(20, 30, 20, 0.9));
        box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
      }
      
      .topping-option input {
        margin-right: 12px;
        width: 18px;
        height: 18px;
      }
      
      .topping-option label {
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
      }
      
      .topping-description {
        display: block;
        font-size: 12px;
        margin-top: 5px;
        opacity: 0.8;
        font-style: italic;
      }
      
      .success-message {
        background-color: rgba(76, 175, 80, 0.1);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
        border-left: 4px solid #4CAF50;
        text-align: left;
        animation: fadeIn 1s;
      }
      
      .success-message p {
        margin: 10px 0;
        line-height: 1.6;
      }
      
      .success-message strong {
        color: #FF5722;
        font-weight: bold;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .tantanmen-image {
        width: 100%;
        max-width: 300px;
        height: auto;
        border-radius: 10px;
        margin: 20px auto;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        display: block;
      }
    `;
    document.head.appendChild(style);
    
    // Add bowl to the container
    if (foodContainer) {
      foodContainer.appendChild(ramenBowlContainer);
    }
  }
  
  // Clear and create topping options
  function createToppingOptions() {
    // Clear existing options
    toppingOptions.innerHTML = '';
    
    // Create new topping options
    toppings.forEach(topping => {
      const option = document.createElement('div');
      option.className = 'topping-option';
      option.dataset.id = topping.id;
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = topping.id;
      
      const label = document.createElement('label');
      label.htmlFor = topping.id;
      label.textContent = topping.name;
      
      // Add description
      const description = document.createElement('span');
      description.className = 'topping-description';
      description.textContent = topping.description;
      label.appendChild(description);
      
      option.appendChild(checkbox);
      option.appendChild(label);
      
      // Make whole div clickable
      option.addEventListener('click', (e) => {
        // Don't toggle if clicking directly on checkbox (it toggles itself)
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        option.classList.toggle('selected', checkbox.checked);
      });
      
      toppingOptions.appendChild(option);
    });
  }
  
  // Check the user's selected toppings
  function checkToppings() {
    const selectedToppings = [...toppingOptions.querySelectorAll('input:checked')].map(
      input => input.id
    );
    
    // Any selection is valid, but let's check if they chose the correct ones
    if (selectedToppings.length > 0) {
      const correctSelected = correctToppings.filter(t => selectedToppings.includes(t));
      const incorrectSelected = selectedToppings.filter(t => !correctToppings.includes(t));
      const missedCorrect = correctToppings.filter(t => !selectedToppings.includes(t));
      
      // Replace options with success message
      toppingOptions.innerHTML = '';
      
      // Create ramen bowl image (ascii art for cyberpunk feel)
      const ramenArt = document.createElement('pre');
      ramenArt.className = 'tantanmen-ascii';
      ramenArt.style.fontSize = '12px';
      ramenArt.style.lineHeight = '12px';
      ramenArt.style.color = '#FF5722';
      ramenArt.style.textAlign = 'center';
      ramenArt.style.margin = '20px auto';
      ramenArt.style.fontFamily = 'monospace';
      ramenArt.style.whiteSpace = 'pre';
      ramenArt.textContent = `
      .-''''-.
     /  o o  \\
    |    v    |
     \\  ===  /
      '-...-'
      `;
      toppingOptions.appendChild(ramenArt);
      
      // Show success message
      const message = document.createElement('div');
      message.className = 'success-message';
      
      // Create the response message based on their selection
      let responseHTML = '';
      
      if (correctSelected.length === correctToppings.length && incorrectSelected.length === 0) {
        // Perfect selection
        responseHTML = `
          <p>🎯 <strong>Perfect Choices!</strong> You know exactly how we like it</p>
          <p>🍜 I love how we always order it with ${selectedToppings.map(id => 
            toppings.find(t => t.id === id).name
          ).join(', ')}.</p>
          <p>Buta Ramen is our place.. not you and lanayas. I love every bite we get there together.</p>
        `;
      } else if (correctSelected.length > 0) {
        // Got some right but not perfect
        responseHTML = `
          <p>🍜 Great choices! Our Tantanmen is always delicious.</p>
          <p>You've selected some of our favorites: <strong>${correctSelected.map(id => 
            toppings.find(t => t.id === id).name
          ).join(', ')}</strong>.</p>
        `;
        
        if (incorrectSelected.length > 0) {
          responseHTML += `<p>We usually skip: ${incorrectSelected.map(id => 
            toppings.find(t => t.id === id).name
          ).join(', ')}.</p>`;
        }
        
        if (missedCorrect.length > 0) {
          responseHTML += `<p>And we love adding: ${missedCorrect.map(id => 
            toppings.find(t => t.id === id).name
          ).join(', ')}.</p>`;
        }
        
        responseHTML += `<p>Buta Ramen is our place.. not you and lanayas. I love every bite we get there together.</p>`;
      } else {
        // Totally wrong selections
        responseHTML = `
          <p>🍜 HORRIBLE SELECTION</p>
          <p>We typically get our Tantanmen with: <strong>${correctToppings.map(id => 
            toppings.find(t => t.id === id).name
          ).join(', ')}</strong>.</p>
          <p>Buta Ramen is still our place.. not you and lanayas. I love every bite we get there together.</p>
        `;
      }
      
      message.innerHTML = responseHTML;
      toppingOptions.appendChild(message);
      
      // Change button text
      checkRamenButton.textContent = 'Continue';
      
      // Add pulsing animation to button
      checkRamenButton.style.animation = 'pulse 2s infinite';
      
      // Change button functionality
      checkRamenButton.removeEventListener('click', checkToppings);
      checkRamenButton.addEventListener('click', () => {
        hideInteraction('ramenInteraction');
        completeStage('ramen');
        // Final stage will trigger the question
      });
    } else {
      // Display a gentler validation message instead of an alert
      const existingMessage = document.querySelector('.validation-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      const validationMessage = document.createElement('div');
      validationMessage.className = 'validation-message';
      validationMessage.textContent = 'Select at least one topping!';
      validationMessage.style.color = '#ff4444';
      validationMessage.style.textAlign = 'center';
      validationMessage.style.padding = '10px';
      validationMessage.style.margin = '10px 0';
      validationMessage.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
      validationMessage.style.borderRadius = '5px';
      validationMessage.style.animation = 'fadeIn 0.5s';
      
      // Insert before the button
      checkRamenButton.parentNode.insertBefore(validationMessage, checkRamenButton);
      
      // Remove after a few seconds
      setTimeout(() => {
        validationMessage.style.opacity = '0';
        validationMessage.style.transform = 'translateY(-10px)';
        validationMessage.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          validationMessage.remove();
        }, 500);
      }, 3000);
    }
  }
  
  // Create the initial topping options
  createToppingOptions();
  
  // Set up the check button
  checkRamenButton.addEventListener('click', checkToppings);
}

// Make sure to initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initRamenInteraction);