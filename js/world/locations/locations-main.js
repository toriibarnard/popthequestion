// Main file for loading all location modules

// This file should be included in index.html after all individual location files
// The order of script loading should be:
// 1. locations-config.js - Defines the locations array
// 2. locations-base.js - Contains core functions shared by all locations
// 3. All individual location files - Each location's drawing function
// 4. locations-main.js - This file, which ensures everything is loaded

// Check if all necessary location functions are loaded
function checkLocationsLoaded() {
    // Required location drawing functions
    const requiredFunctions = [
      'drawPhoneBox',
      'drawRestaurant',
      'drawMusicShop',
      'drawRamenShop',
      'drawGazebo',
      'drawDateRanking',
      'drawInteractionPrompt'
    ];
    
    // Check if all functions exist
    const missingFunctions = requiredFunctions.filter(
      funcName => typeof window[funcName] !== 'function'
    );
    
    if (missingFunctions.length > 0) {
      console.error('Missing location functions:', missingFunctions);
      return false;
    }
    
    // Check if locations array is defined
    if (!Array.isArray(locations) || locations.length === 0) {
      console.error('Locations array is not properly defined');
      return false;
    }
    
    return true;
  }
  
  // Initialize all locations when the document is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Verify all locations are loaded
    if (checkLocationsLoaded()) {
      console.log('All location modules loaded successfully');
    } else {
      console.error('Failed to load all location modules');
    }
  });