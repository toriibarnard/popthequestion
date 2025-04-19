// Buta Ramen interaction

// Initialize the ramen interaction
function initRamenInteraction() {
    const toppingOptions = document.getElementById('toppingOptions');
    const checkRamenButton = document.getElementById('checkRamenButton');
    
    // Ramen toppings options
    // Note: In a real game, you would customize these with your actual favorites
    const toppings = [
      { name: "Chashu (Pork Belly)", id: "chashu" },
      { name: "Ajitama (Soft Boiled Egg)", id: "egg" },
      { name: "Menma (Bamboo Shoots)", id: "menma" },
      { name: "Green Onions", id: "onion" },
      { name: "Nori (Seaweed)", id: "nori" },
      { name: "Corn", id: "corn" },
      { name: "Kikurage Mushrooms", id: "mushroom" },
      { name: "Naruto (Fish Cake)", id: "naruto" }
    ];
    
    // Create topping selection options
    toppings.forEach(topping => {
      const option = document.createElement('div');
      option.className = 'topping-option';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = topping.id;
      
      const label = document.createElement('label');
      label.htmlFor = topping.id;
      label.textContent = topping.name;
      
      option.appendChild(checkbox);
      option.appendChild(label);
      
      // Make whole div clickable
      option.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        option.classList.toggle('selected', checkbox.checked);
      });
      
      toppingOptions.appendChild(option);
    });
    
    // Check ramen button
    checkRamenButton.addEventListener('click', () => {
      const selectedToppings = [...toppingOptions.querySelectorAll('input:checked')].map(
        input => toppings.find(t => t.id === input.id).name
      );
      
      // Any selection is valid for this personal game
      if (selectedToppings.length > 0) {
        // Hide options
        toppingOptions.innerHTML = '';
        
        // Show success message
        const message = document.createElement('div');
        message.innerHTML = `
          <p>Perfect choice! I love how we always get ${selectedToppings.join(', ')} on our ramen.</p>
          <p>Buta Ramen has been our special place, and I cherish every meal we've shared there.</p>
        `;
        toppingOptions.appendChild(message);
        
        // Change button text
        checkRamenButton.textContent = 'Final Step';
        
        // Change button functionality
        checkRamenButton.removeEventListener('click', null);
        checkRamenButton.addEventListener('click', () => {
          hideInteraction('ramenInteraction');
          completeStage('ramen');
          // Final stage will trigger the question
        });
      } else {
        alert('Please select at least one topping!');
      }
    });
  }
  
  // Make sure to initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initRamenInteraction);