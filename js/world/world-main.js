// Main world file that imports and initializes all world components

// Initialize all world components
function initializeWorld() {
    // Initialize background elements
    initializeBackground();
    
    // Initialize midground elements with parallax
    initializeMidground();
    
    // Initialize foreground elements
    initializeForeground();
  }
  
  // Call this function once at startup
  initializeWorld();