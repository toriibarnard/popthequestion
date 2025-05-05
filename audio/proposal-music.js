// Proposal Music Handler
// Manages the music transition for the proposal scene

// Music controller object
const ProposalMusicController = {
    // Reference to background music
    backgroundMusic: null,
    
    // Reference to proposal music
    proposalMusic: null,
    
    // Fade intervals
    fadeOutInterval: null,
    fadeInInterval: null,
    
    // Initialization
    init: function() {
      console.log("Initializing proposal music controller");
      
      // Find background music - try to find any existing audio element
      this.backgroundMusic = document.getElementById('backgroundMusic') || 
                            document.querySelector('audio:not(#proposalMusic)');
      
      // Create proposal music element if it doesn't exist
      if (!document.getElementById('proposalMusic')) {
        this.proposalMusic = document.createElement('audio');
        this.proposalMusic.id = 'proposalMusic';
        this.proposalMusic.src = 'audio/proposal-song.mp3'; // Path to your romantic song
        this.proposalMusic.loop = true;
        this.proposalMusic.volume = 0;
        this.proposalMusic.preload = 'auto'; // Pre-load the audio
        document.body.appendChild(this.proposalMusic);
        
        console.log("Created proposal music element");
      } else {
        this.proposalMusic = document.getElementById('proposalMusic');
        console.log("Found existing proposal music element");
      }
      
      // Add music indicator to the celebration screen
      this.addMusicIndicator();
    },
    
    // Start the music transition
    startProposalMusic: function() {
      console.log("Starting proposal music transition");
      
      // Clear any existing intervals
      this.clearIntervals();
      
      // Start proposal music (muted at first)
      this.proposalMusic.volume = 0;
      this.proposalMusic.currentTime = 0; // Start from beginning
      
      const playPromise = this.proposalMusic.play();
      
      // Handle play promise (required for modern browsers)
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Proposal music started playing");
          
          // Fade out background music if it exists and is playing
          if (this.backgroundMusic && !this.backgroundMusic.paused) {
            this.fadeOutBackgroundMusic();
          } else {
            // If no background music, just fade in proposal music
            this.fadeInProposalMusic();
          }
        }).catch(error => {
          console.error("Could not play proposal music:", error);
          
          // Try playing on user interaction as fallback
          document.addEventListener('click', () => {
            this.proposalMusic.play().catch(e => console.error("Still cannot play:", e));
          }, { once: true });
        });
      }
    },
    
    // Fade out background music
    fadeOutBackgroundMusic: function() {
      console.log("Fading out background music");
      
      // Store original volume
      const originalVolume = this.backgroundMusic.volume || 0.5;
      let volume = originalVolume;
      
      this.fadeOutInterval = setInterval(() => {
        // Reduce volume gradually
        volume = Math.max(0, volume - 0.05);
        this.backgroundMusic.volume = volume;
        
        // When sufficiently quiet, pause and reset
        if (volume <= 0.05) {
          this.backgroundMusic.pause();
          this.backgroundMusic.volume = originalVolume; // Reset for future use
          clearInterval(this.fadeOutInterval);
          
          // Begin fading in proposal music
          this.fadeInProposalMusic();
        }
      }, 100);
    },
    
    // Fade in proposal music
    fadeInProposalMusic: function() {
      console.log("Fading in proposal music");
      
      let volume = 0;
      const targetVolume = 1; // Target volume level
      
      this.fadeInInterval = setInterval(() => {
        // Increase volume gradually
        volume = Math.min(targetVolume, volume + 0.05);
        this.proposalMusic.volume = volume;
        
        // When target volume reached, clear interval
        if (volume >= targetVolume) {
          clearInterval(this.fadeInInterval);
          console.log("Proposal music fade-in complete");
          
          // Show the music indicator
          this.showMusicIndicator();
        }
      }, 100);
    },
    
    // Clear any running intervals
    clearIntervals: function() {
      if (this.fadeOutInterval) {
        clearInterval(this.fadeOutInterval);
        this.fadeOutInterval = null;
      }
      
      if (this.fadeInInterval) {
        clearInterval(this.fadeInInterval);
        this.fadeInInterval = null;
      }
    },
    
    // Add music indicator to celebration screen
    addMusicIndicator: function() {
      const celebration = document.getElementById('celebration');
      if (!celebration) return;
      
      // Check if indicator already exists
      if (document.querySelector('.music-indicator')) return;
      
      // Create music indicator
      const indicator = document.createElement('div');
      indicator.className = 'music-indicator';
      indicator.innerHTML = `
        <span>Now Playing:</span>
        📻
        <div class="visualizer-container">
          <div class="visualizer-bar"></div>
          <div class="visualizer-bar"></div>
          <div class="visualizer-bar"></div>
          <div class="visualizer-bar"></div>
        </div>
      `;
      
      // Initially hidden
      indicator.style.opacity = '0';
      indicator.style.transform = 'translateY(20px)';
      indicator.style.transition = 'all 0.5s ease';
      
      // Add to celebration screen
      celebration.appendChild(indicator);
    },
    
    // Show the music indicator
    showMusicIndicator: function() {
      const indicator = document.querySelector('.music-indicator');
      if (!indicator) return;
      
      // Show with animation
      setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
      }, 1000);
    },
    
    // Stop proposal music
    stopProposalMusic: function() {
      if (this.proposalMusic) {
        this.proposalMusic.pause();
        this.proposalMusic.currentTime = 0;
      }
      
      this.clearIntervals();
    }
  };
  
  // Initialize the controller when the document is ready
  document.addEventListener('DOMContentLoaded', () => {
    ProposalMusicController.init();
    
    // Add the ability to restart background music
    // This could be used if the user wants to go back from the celebration screen
    window.restartBackgroundMusic = function() {
      ProposalMusicController.stopProposalMusic();
      
      if (ProposalMusicController.backgroundMusic) {
        ProposalMusicController.backgroundMusic.play().catch(e => 
          console.error("Could not restart background music:", e)
        );
      }
    };
  });
  
  // Create a global access point to start the music
  window.startProposalMusic = function() {
    ProposalMusicController.startProposalMusic();
  };