// Favorite song interaction

// Initialize the song interaction
function initSongInteraction() {
    const lyricGame = document.getElementById('lyricGame');
    const checkLyricsButton = document.getElementById('checkLyricsButton');
    const songPlayer = document.getElementById('songPlayer');
    
    // Setup lyrics with blanks
    const lyrics = [
      { line: "It's funny how we met that night", blank: false },
      { line: "And I couldn't take my eyes off you", blank: true, answer: "eyes" },
      { line: "We talked till morning light", blank: false },
      { line: "And I knew right then what I had to do", blank: true, answer: "knew" },
      { line: "Lover, you should've come over", blank: false },
      { line: "To my heart, to my arms, to my side", blank: true, answer: "heart" }
    ];
    
    // Create lyric game
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
      let allCorrect = true;
      
      inputs.forEach(input => {
        // Any answer is fine for this personal game
        if (input.value.trim().length === 0) {
          allCorrect = false;
        }
      });
      
      if (allCorrect) {
        // Replace lyrics game with full lyrics
        lyricGame.innerHTML = '';
        
        // Add completed lyrics
        const lyricsComplete = document.createElement('div');
        lyricsComplete.innerHTML = lyrics.map(line => `<p>${line.line}</p>`).join('');
        lyricGame.appendChild(lyricsComplete);
        
        // Change button text
        checkLyricsButton.textContent = 'Play Our Song';
        
        // Set up song functionality
        checkLyricsButton.removeEventListener('click', null);
        checkLyricsButton.addEventListener('click', () => {
          // Note: In a real implementation, you would provide the actual song URL
          // For now, we'll just simulate playing the song
          
          checkLyricsButton.textContent = 'Continue Our Journey';
          
          // Add message that song is playing
          const playingMessage = document.createElement('p');
          playingMessage.textContent = '🎵 "Lover, You Should\'ve Come Over" by Joel Plaskett is playing... 🎵';
          playingMessage.style.color = '#1DB954';
          playingMessage.style.fontWeight = 'bold';
          lyricGame.appendChild(playingMessage);
          
          // Change button again
          checkLyricsButton.removeEventListener('click', null);
          checkLyricsButton.addEventListener('click', () => {
            hideInteraction('songInteraction');
            completeStage('song');
            showDialog("Third stage complete! Let's head to Buta Ramen, our favorite place to eat.", 5000);
          });
        });
      } else {
        alert('Please fill in all the blanks with your best guess!');
      }
    });
  }
  
  // Make sure to initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initSongInteraction);