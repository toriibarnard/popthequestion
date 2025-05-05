// Favorite song interaction - Enhanced with cyberpunk music theme
// Fixed to maintain background visibility

// Initialize the song interaction
function initSongInteraction() {
  const lyricGame = document.getElementById('lyricGame');
  const checkLyricsButton = document.getElementById('checkLyricsButton');
  
  // Setup lyrics with blanks (using the same structure as original)
  const lyrics = [
    { line: "It's never over", blank: false },
    { line: "My kingdom for a kiss upon her shoulder", blank: true, answer: "kiss" },
    { line: "It's never over", blank: false },
    { line: "All my riches for a smile when i've slept so soft against her", blank: true, answer: "smile" },
    { line: "It's never over", blank: false },
    { line: "All my blood for the sweetness of her laughter", blank: true, answer: "laughter" },
    { line: "It's never over", blank: false },
    { line: "She is the tear that hangs inside my soul forever", blank: true, answer: "tear" }
  ];
  
  // Override the showInteraction function for this specific interaction
  const originalShowInteraction = window.showInteraction;
  window.showInteraction = function(interactionId) {
    originalShowInteraction(interactionId);
    if (interactionId === 'songInteraction') {
      // First make the popup itself transparent to show the background
      const popup = document.getElementById('songInteraction');
      if (popup) {
        // Critical fix: Set background to highly transparent
        popup.style.backgroundColor = 'rgba(10, 10, 20, 0.7)'; // Much more transparent
      }
      
      // Then apply the rest of the styling
      applyCyberpunkStyling();
      
      // Set focus on the first input
      setTimeout(() => {
        const firstInput = lyricGame.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  };
  
  // Apply cyberpunk styling to match the city theme
  function applyCyberpunkStyling() {
    const popup = document.getElementById('songInteraction');
    
    // Make sure the popup is scrollable and keeps the background visible
    popup.style.maxHeight = '90vh';
    popup.style.overflowY = 'auto';
    
    // Apply neon glow but keep background transparent
    popup.style.boxShadow = '0 0 20px rgba(29, 185, 84, 0.7), 0 0 40px rgba(29, 185, 84, 0.4)';
    popup.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    
    // Add musical notes background
    const backgroundNotes = document.createElement('div');
    backgroundNotes.className = 'bg-music-notes';
    backgroundNotes.style.position = 'absolute';
    backgroundNotes.style.top = '0';
    backgroundNotes.style.left = '0';
    backgroundNotes.style.right = '0';
    backgroundNotes.style.bottom = '0';
    backgroundNotes.style.pointerEvents = 'none';
    backgroundNotes.style.opacity = '0.1';
    backgroundNotes.style.zIndex = '0';
    
    // Style the header
    const header = popup.querySelector('h3');
    if (header) {
      header.style.color = '#1DB954'; // Spotify green
      header.style.textShadow = '0 0 5px rgba(29, 185, 84, 0.7)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      header.style.paddingBottom = '10px';
      header.style.position = 'relative';
      header.style.zIndex = '1';
      header.style.marginTop = '10px';
      header.style.backgroundColor = 'rgba(10, 10, 20, 0.5)'; // Semi-transparent background
      header.style.padding = '10px';
      header.style.borderRadius = '10px';
    }
    
    // Add "Our Song" text with special styling
    if (header) {
      header.innerHTML = '<span class="neon-text">Our Song</span>';
      
      // Create song title element
      const songTitle = document.createElement('div');
      songTitle.className = 'song-title';
      songTitle.innerHTML = '"Lover, You Should\'ve Come Over" by Jeff Buckley';
      songTitle.style.fontSize = '0.8em';
      songTitle.style.marginTop = '5px';
      songTitle.style.color = '#1DB954';
      songTitle.style.opacity = '0.8';
      header.appendChild(songTitle);
    }
    
    // Style the song container
    const songContainer = popup.querySelector('.song-container');
    if (songContainer) {
      songContainer.style.backgroundColor = 'rgba(30, 30, 36, 0.6)'; // Very transparent
      songContainer.style.borderRadius = '10px';
      songContainer.style.padding = '20px';
      songContainer.style.margin = '15px';
      songContainer.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
      songContainer.style.backdropFilter = 'blur(3px)'; // Add slight blur effect for better readability
      songContainer.style.webkitBackdropFilter = 'blur(3px)'; // Safari support
    }
    
    // Style lyric container
    const lyricContainer = popup.querySelector('.lyric-container');
    if (lyricContainer) {
      lyricContainer.style.margin = '20px 0';
      lyricContainer.style.padding = '20px';
      lyricContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      lyricContainer.style.borderRadius = '10px';
      lyricContainer.style.boxShadow = '0 0 15px rgba(29, 185, 84, 0.2)';
      lyricContainer.style.position = 'relative';
    }
    
    // Style the paragraph that introduces the lyrics
    const introP = lyricContainer.querySelector('p');
    if (introP) {
      introP.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      introP.style.padding = '8px';
      introP.style.borderRadius = '5px';
      introP.style.color = '#fff';
    }
    
    // Style the lyric lines
    const lyricLines = lyricGame.querySelectorAll('.lyric-line');
    lyricLines.forEach((line, index) => {
      // Add animation delay based on index
      line.style.opacity = '0';
      line.style.transform = 'translateY(20px)';
      line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      line.style.transitionDelay = `${index * 0.1}s`;
      line.style.color = '#FFF';
      line.style.textShadow = '0 0 2px rgba(255, 255, 255, 0.5)';
      line.style.margin = '15px 0';
      line.style.fontSize = '1.1em';
      line.style.letterSpacing = '0.5px';
      line.style.textAlign = 'center';
      line.style.position = 'relative';
      line.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // Semi-transparent background
      line.style.padding = '8px';
      line.style.borderRadius = '5px';
      
      // Add musical note decorations
      if (index % 2 === 0) {
        const noteLeft = document.createElement('span');
        noteLeft.textContent = '♪';
        noteLeft.style.position = 'absolute';
        noteLeft.style.left = '-20px';
        noteLeft.style.color = '#1DB954';
        noteLeft.style.opacity = '0.7';
        line.appendChild(noteLeft);
      } else {
        const noteRight = document.createElement('span');
        noteRight.textContent = '♫';
        noteRight.style.position = 'absolute';
        noteRight.style.right = '-20px';
        noteRight.style.color = '#1DB954';
        noteRight.style.opacity = '0.7';
        line.appendChild(noteRight);
      }
      
      // Fade in after a slight delay
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 300);
    });
    
    // Style the input fields
    const inputs = lyricGame.querySelectorAll('input');
    inputs.forEach(input => {
      input.style.backgroundColor = 'rgba(29, 185, 84, 0.2)'; // More visible
      input.style.border = 'none';
      input.style.borderBottom = '2px solid #1DB954';
      input.style.color = '#1DB954';
      input.style.padding = '5px 10px';
      input.style.margin = '0 5px';
      input.style.borderRadius = '4px';
      input.style.width = '120px';
      input.style.textAlign = 'center';
      input.style.fontWeight = 'bold';
      input.style.transition = 'all 0.3s ease';
      input.style.boxShadow = '0 0 5px rgba(29, 185, 84, 0.2)';
      
      // Add focus effects
      input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 10px rgba(29, 185, 84, 0.5)';
        input.style.backgroundColor = 'rgba(29, 185, 84, 0.3)';
      });
      
      input.addEventListener('blur', () => {
        input.style.boxShadow = '0 0 5px rgba(29, 185, 84, 0.2)';
        input.style.backgroundColor = 'rgba(29, 185, 84, 0.2)';
      });
      
      // Prevent space from triggering game jump
      input.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.code === 'Space') {
          e.stopPropagation();
        }
      });
    });
    
    // Style button - make it more visible against transparent background
    if (checkLyricsButton) {
      checkLyricsButton.style.backgroundColor = '#1DB954';
      checkLyricsButton.style.color = '#000';
      checkLyricsButton.style.fontWeight = 'bold';
      checkLyricsButton.style.padding = '12px 25px';
      checkLyricsButton.style.borderRadius = '30px';
      checkLyricsButton.style.border = 'none';
      checkLyricsButton.style.boxShadow = '0 0 15px rgba(29, 185, 84, 0.5)';
      checkLyricsButton.style.transition = 'all 0.3s ease';
      checkLyricsButton.style.transform = 'translateY(0)';
      checkLyricsButton.style.cursor = 'pointer';
      checkLyricsButton.style.position = 'relative';
      checkLyricsButton.style.zIndex = '2';
      checkLyricsButton.style.margin = '20px auto';
      checkLyricsButton.style.display = 'block';
      
      // Pulsing animation
      checkLyricsButton.style.animation = 'pulse 2s infinite';
      
      // Add hover effects
      checkLyricsButton.addEventListener('mouseover', () => {
        checkLyricsButton.style.backgroundColor = '#22dd65';
        checkLyricsButton.style.boxShadow = '0 0 20px rgba(29, 185, 84, 0.8)';
        checkLyricsButton.style.transform = 'translateY(-2px) scale(1.05)';
      });
      
      checkLyricsButton.addEventListener('mouseout', () => {
        checkLyricsButton.style.backgroundColor = '#1DB954';
        checkLyricsButton.style.boxShadow = '0 0 15px rgba(29, 185, 84, 0.5)';
        checkLyricsButton.style.transform = 'translateY(0) scale(1)';
      });
    }
    
    // Add equalizer animation
    const equalizerContainer = document.createElement('div');
    equalizerContainer.className = 'equalizer';
    equalizerContainer.style.display = 'flex';
    equalizerContainer.style.justifyContent = 'center';
    equalizerContainer.style.gap = '3px';
    equalizerContainer.style.height = '30px';
    equalizerContainer.style.margin = '20px auto 0 auto';
    equalizerContainer.style.width = '80px';
    
    // Create equalizer bars
    for (let i = 0; i < 5; i++) {
      const bar = document.createElement('div');
      bar.className = 'equalizer-bar';
      bar.style.width = '3px';
      bar.style.backgroundColor = '#1DB954';
      bar.style.borderRadius = '3px';
      bar.style.animation = `equalizerBar ${1 + Math.random() * 0.5}s ease-in-out infinite alternate`;
      bar.style.opacity = '0.8';
      equalizerContainer.appendChild(bar);
    }
    
    // Add decorative vinyl record
    const vinylRecord = document.createElement('div');
    vinylRecord.className = 'vinyl-record';
    vinylRecord.style.position = 'absolute';
    vinylRecord.style.top = '20px';
    vinylRecord.style.right = '20px';
    vinylRecord.style.width = '60px';
    vinylRecord.style.height = '60px';
    vinylRecord.style.borderRadius = '50%';
    vinylRecord.style.background = 'radial-gradient(circle, #333 0%, #111 40%, #333 45%, #111 60%, #333 65%, #111 90%)';
    vinylRecord.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    vinylRecord.style.animation = 'spin 4s linear infinite';
    vinylRecord.style.zIndex = '1';
    
    // Add all new elements to the DOM
    if (songContainer) {
      songContainer.appendChild(equalizerContainer);
      songContainer.appendChild(vinylRecord);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 15px rgba(29, 185, 84, 0.5); }
        50% { box-shadow: 0 0 20px rgba(29, 185, 84, 0.8); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes equalizerBar {
        0% { height: 5px; }
        100% { height: 30px; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes glow {
        0%, 100% { text-shadow: 0 0 5px rgba(29, 185, 84, 0.7); }
        50% { text-shadow: 0 0 20px rgba(29, 185, 84, 0.9), 0 0 30px rgba(29, 185, 84, 0.6); }
      }
      
      .neon-text {
        color: #1DB954;
        animation: glow 2s infinite;
        font-weight: bold;
        letter-spacing: 2px;
      }
      
      .equalizer-bar:nth-child(1) { animation-delay: 0.2s; }
      .equalizer-bar:nth-child(2) { animation-delay: 0.5s; }
      .equalizer-bar:nth-child(3) { animation-delay: 0.1s; }
      .equalizer-bar:nth-child(4) { animation-delay: 0.7s; }
      .equalizer-bar:nth-child(5) { animation-delay: 0.3s; }
      
      .success-lyrics {
        text-align: center;
        color: #fff;
        line-height: 1.8;
        margin-top: 20px;
      }
      
      .success-lyrics p {
        margin: 15px 0;
        position: relative;
        transition: all 0.5s ease;
        background-color: rgba(0, 0, 0, 0.4);
        padding: 10px;
        border-radius: 5px;
      }
      
      .success-lyrics p:nth-child(odd)::before {
        content: '♪';
        position: absolute;
        left: -20px;
        color: #1DB954;
      }
      
      .success-lyrics p:nth-child(even)::after {
        content: '♫';
        position: absolute;
        right: -20px;
        color: #1DB954;
      }
    `;
    document.head.appendChild(style);
    
    // Generate music note background
    for (let i = 0; i < 20; i++) {
      const note = document.createElement('div');
      note.textContent = i % 2 === 0 ? '♪' : '♫';
      note.style.position = 'absolute';
      note.style.color = '#1DB954';
      note.style.opacity = '0.1';
      note.style.fontSize = `${Math.random() * 20 + 10}px`;
      note.style.left = `${Math.random() * 100}%`;
      note.style.top = `${Math.random() * 100}%`;
      note.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
      note.style.animationDelay = `${Math.random() * 5}s`;
      backgroundNotes.appendChild(note);
    }
    
    popup.insertBefore(backgroundNotes, popup.firstChild);
  }
  
  // Create lyric game content
  lyrics.forEach((lyricLine, index) => {
    const lineElement = document.createElement('div');
    lineElement.className = 'lyric-line';
    
    if (lyricLine.blank) {
      // Create a line with an input field
      const beforeText = lyricLine.line.split(' ').slice(0, lyricLine.line.split(' ').indexOf(lyricLine.answer)).join(' ');
      const afterText = lyricLine.line.split(' ').slice(lyricLine.line.split(' ').indexOf(lyricLine.answer) + 1).join(' ');
      
      lineElement.textContent = beforeText + ' ';
      
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'lyric-input';
      input.dataset.answer = lyricLine.answer;
      input.placeholder = '________';
      
      // Move to next input on Enter key
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const inputs = lyricGame.querySelectorAll('input');
          const currentIndex = Array.from(inputs).indexOf(e.target);
          
          if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
          } else {
            checkLyricsButton.click();
          }
        }
      });
      
      lineElement.appendChild(input);
      lineElement.appendChild(document.createTextNode(' ' + afterText));
    } else {
      // Just display the line
      lineElement.textContent = lyricLine.line;
    }
    
    lyricGame.appendChild(lineElement);
  });
  
  // Check lyrics button
  checkLyricsButton.addEventListener('click', () => {
    const inputs = lyricGame.querySelectorAll('input');
    let allFilled = true;
    
    inputs.forEach(input => {
      // Just check that something is entered, no need to be correct
      if (input.value.trim().length === 0) {
        allFilled = false;
        // Highlight empty inputs
        input.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
        input.style.borderBottom = '2px solid #ff4444';
        
        // Restore after a brief time
        setTimeout(() => {
          input.style.boxShadow = '0 0 5px rgba(29, 185, 84, 0.2)';
          input.style.borderBottom = '2px solid #1DB954';
        }, 2000);
      }
    });
    
    if (allFilled) {
      // Create beautiful transition to completed state
      
      // First transition: make all lines glow and fade
      const lyricLines = lyricGame.querySelectorAll('.lyric-line');
      lyricLines.forEach((line, index) => {
        setTimeout(() => {
          line.style.transition = 'all 0.8s ease';
          line.style.color = '#1DB954';
          line.style.textShadow = '0 0 10px rgba(29, 185, 84, 0.7)';
          line.style.opacity = '0';
          line.style.transform = 'translateY(-20px)';
        }, index * 100);
      });
      
      // Then show the completed lyrics
      setTimeout(() => {
        // Clear the game
        lyricGame.innerHTML = '';
        
        // Create vinyl record effect background
        const vinylBackground = document.createElement('div');
        vinylBackground.className = 'vinyl-background';
        vinylBackground.style.position = 'absolute';
        vinylBackground.style.top = '50%';
        vinylBackground.style.left = '50%';
        vinylBackground.style.transform = 'translate(-50%, -50%)';
        vinylBackground.style.width = '250px';
        vinylBackground.style.height = '250px';
        vinylBackground.style.borderRadius = '50%';
        vinylBackground.style.background = 'radial-gradient(circle, #333 0%, #222 30%, #333 32%, #222 36%, #333 38%, #222 42%, #333 45%, #222 50%)';
        vinylBackground.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.7)';
        vinylBackground.style.opacity = '0.2';
        vinylBackground.style.zIndex = '0';
        lyricGame.appendChild(vinylBackground);
        
        // Add completed lyrics with animation
        const lyricsComplete = document.createElement('div');
        lyricsComplete.className = 'success-lyrics';
        
        // Use the lyrics data to rebuild the display
        lyrics.forEach((line, index) => {
          const p = document.createElement('p');
          p.textContent = line.line;
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          lyricsComplete.appendChild(p);
          
          // Staggered animation for each line
          setTimeout(() => {
            p.style.transition = 'all 0.5s ease';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 500 + index * 200);
        });
        
        lyricGame.appendChild(lyricsComplete);
        
        // Add a celebration message
        const celebrationMessage = document.createElement('div');
        celebrationMessage.className = 'celebration-message';
        celebrationMessage.textContent = 'The song that makes me think of you';
        celebrationMessage.style.textAlign = 'center';
        celebrationMessage.style.color = '#1DB954';
        celebrationMessage.style.fontWeight = 'bold';
        celebrationMessage.style.fontSize = '1.2em';
        celebrationMessage.style.marginTop = '30px';
        celebrationMessage.style.opacity = '0';
        celebrationMessage.style.textShadow = '0 0 10px rgba(29, 185, 84, 0.7)';
        celebrationMessage.style.animation = 'glow 2s infinite';
        celebrationMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        celebrationMessage.style.padding = '10px';
        celebrationMessage.style.borderRadius = '10px';
        lyricGame.appendChild(celebrationMessage);
        
        // Fade in the celebration message
        setTimeout(() => {
          celebrationMessage.style.transition = 'opacity 1s ease';
          celebrationMessage.style.opacity = '1';
        }, 2000);
        
        // Change button style and text
        checkLyricsButton.textContent = 'Continue';
        checkLyricsButton.style.backgroundColor = '#4CAF50';
        checkLyricsButton.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.7)';
        
        // Setup button for continuation
        checkLyricsButton.removeEventListener('click', null);
        checkLyricsButton.addEventListener('click', () => {
          hideInteraction('songInteraction');
          completeStage('song');
          showDialog("Third stage complete! Let's head to Buta Ramen, our favorite place to eat.", 5000);
        });
      }, lyricLines.length * 100 + 500); // Wait for all lines to fade out
    } else {
      // Display a gentler validation message instead of an alert
      const existingMessage = document.querySelector('.validation-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      const validationMessage = document.createElement('div');
      validationMessage.className = 'validation-message';
      validationMessage.textContent = 'Please fill in all the blanks with your best guess!';
      validationMessage.style.color = '#ff4444';
      validationMessage.style.textAlign = 'center';
      validationMessage.style.padding = '10px';
      validationMessage.style.marginTop = '10px';
      validationMessage.style.backgroundColor = 'rgba(255, 68, 68, 0.3)'; // More visible
      validationMessage.style.borderRadius = '5px';
      validationMessage.style.animation = 'fadeIn 0.5s';
      
      // Add fade-in animation
      const styleElem = document.createElement('style');
      styleElem.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(styleElem);
      
      // Insert before the button
      checkLyricsButton.parentNode.insertBefore(validationMessage, checkLyricsButton);
      
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
  });
}

// Make sure to initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initSongInteraction);