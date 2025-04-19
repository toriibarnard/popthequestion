// Game elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialog = document.getElementById('dialog');
const finalQuestion = document.getElementById('finalQuestion');
const celebration = document.getElementById('celebration');

// Game state
const player = {
  x: 400,
  y: 450,
  width: 40,
  height: 60,
  speed: 5,
  moving: false,
  direction: 'down',
  frame: 0
};

// Game controls
const keys = {};
let specialItems = [];
let discoveredItems = 0;
let totalItems = 0;
let gameComplete = false;

// ----- CUSTOMIZE THESE SPECIAL ITEMS WITH YOUR MEANINGFUL MOMENTS -----
function setupSpecialItems() {
  // Format: {x, y, name, description, image}
  // These are examples - replace with your own special moments!
  specialItems = [
    {
      x: 100, 
      y: 100, 
      width: 50, 
      height: 50,
      name: "First Meeting", 
      description: "Remember when we first met at the coffee shop? You ordered a caramel latte and we talked for hours.",
      discovered: false,
      image: null
    },
    {
      x: 650, 
      y: 150, 
      width: 60, 
      height: 60,
      name: "Movie Night", 
      description: "That time we watched our favorite movie together and couldn't stop laughing at that one scene.",
      discovered: false,
      image: null
    },
    {
      x: 400, 
      y: 200, 
      width: 50, 
      height: 50,
      name: "Special Song", 
      description: "This song was playing the first time we danced together. It always makes me think of you.",
      discovered: false,
      image: null
    },
    {
      x: 200, 
      y: 400, 
      width: 55, 
      height: 55,
      name: "Inside Joke", 
      description: "Only we understand why 'purple elephants' makes us laugh so hard!",
      discovered: false,
      image: null
    },
    {
      x: 600, 
      y: 450, 
      width: 50, 
      height: 50,
      name: "Favorite Spot", 
      description: "The park bench where we talked until sunset that one perfect evening.",
      discovered: false,
      image: null
    }
  ];
  
  totalItems = specialItems.length;
  
  // Create visual representations for items
  specialItems.forEach(item => {
    const img = new Image();
    img.src = '/api/placeholder/50/50';
    item.image = img;
  });
}

// Game assets loading
function loadAssets() {
  // Player character - placeholder graphics
  player.image = new Image();
  player.image.src = '/api/placeholder/40/60';
  
  // Background
  background = new Image();
  background.src = '/api/placeholder/800/600';
  
  // Set up special items
  setupSpecialItems();
  
  // Start the game
  window.requestAnimationFrame(gameLoop);
}

// Game initialization
function init() {
  loadAssets();
  
  // Event listeners
  window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
    player.moving = true;
  });
  
  window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
    if (!keys.ArrowUp && !keys.ArrowDown && !keys.ArrowLeft && !keys.ArrowRight && 
        !keys.w && !keys.a && !keys.s && !keys.d) {
      player.moving = false;
    }
  });
  
  // Button event listeners
  document.getElementById('yesButton').addEventListener('click', function() {
    finalQuestion.style.display = 'none';
    celebration.style.display = 'block';
    createHearts();
  });
  
  document.getElementById('noButton').addEventListener('mouseover', function() {
    const button = document.getElementById('noButton');
    const container = document.getElementById('finalQuestion');
    
    const maxX = container.clientWidth - button.clientWidth - 20;
    const maxY = container.clientHeight - button.clientHeight - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
  });
}

// Player movement
function movePlayer() {
  // Check keyboard input
  if ((keys.ArrowUp || keys.w) && player.y > 0) {
    player.y -= player.speed;
    player.direction = 'up';
  }
  if ((keys.ArrowDown || keys.s) && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.direction = 'down';
  }
  if ((keys.ArrowLeft || keys.a) && player.x > 0) {
    player.x -= player.speed;
    player.direction = 'left';
  }
  if ((keys.ArrowRight || keys.d) && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.direction = 'right';
  }
  
  // Animation
  if (player.moving) {
    player.frame = (player.frame + 0.1) % 4;
  }
}

// Check collisions with special items
function checkCollisions() {
  specialItems.forEach(item => {
    if (!item.discovered && 
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y) {
      
      // Show dialog
      showDialog(`${item.name}: ${item.description}`);
      
      // Mark as discovered
      item.discovered = true;
      discoveredItems++;
      
      // Check if all items discovered
      if (discoveredItems === totalItems && !gameComplete) {
        setTimeout(() => {
          showFinalQuestion();
          gameComplete = true;
        }, 2000);
      }
    }
  });
}

// Dialog functions
function showDialog(text) {
  dialog.textContent = text;
  dialog.style.display = 'block';
  
  // Hide after a delay
  setTimeout(() => {
    dialog.style.display = 'none';
  }, 4000);
}

function showFinalQuestion() {
  finalQuestion.style.display = 'block';
}

// Create floating hearts animation
function createHearts() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = '❤️';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 2 + 's';
      celebration.appendChild(heart);
      
      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, 3000);
    }, i * 100);
  }
}

// Draw functions
function drawPlayer() {
  // Simple character representation with colors based on direction
  ctx.fillStyle = '#FF6B6B';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Add face
  ctx.fillStyle = '#FFF';
  
  // Different face based on direction
  if (player.direction === 'left') {
    ctx.fillRect(player.x + 8, player.y + 15, 8, 8);
    ctx.fillRect(player.x + 10, player.y + 35, 20, 5);
  } else if (player.direction === 'right') {
    ctx.fillRect(player.x + 24, player.y + 15, 8, 8);
    ctx.fillRect(player.x + 10, player.y + 35, 20, 5);
  } else if (player.direction === 'up') {
    ctx.fillRect(player.x + 10, player.y + 15, 8, 8);
    ctx.fillRect(player.x + 22, player.y + 15, 8, 8);
    ctx.fillRect(player.x + 15, player.y + 35, 10, 5);
  } else {
    ctx.fillRect(player.x + 10, player.y + 15, 8, 8);
    ctx.fillRect(player.x + 22, player.y + 15, 8, 8);
    ctx.fillRect(player.x + 15, player.y + 35, 10, 5);
  }
}

function drawSpecialItems() {
  specialItems.forEach(item => {
    // Draw different colors for discovered/undiscovered items
    if (item.discovered) {
      ctx.fillStyle = 'rgba(100, 255, 100, 0.7)';
    } else {
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    }
    
    // Draw item
    ctx.beginPath();
    ctx.arc(item.x + item.width/2, item.y + item.height/2, item.width/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add sparkle effect to undiscovered items
    if (!item.discovered) {
      const time = Date.now() / 500;
      const size = 5 + Math.sin(time) * 2;
      
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(item.x + item.width/2, item.y + item.height/2 - 15, size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function drawWorld() {
  // Draw ground
  ctx.fillStyle = '#7CFC00';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw path
  ctx.fillStyle = '#DEB887';
  ctx.fillRect(350, 0, 100, canvas.height);
  
  // Draw decorative elements
  for (let i = 0; i < 10; i++) {
    // Trees
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(100 + i * 150, 80 + (i % 3) * 150, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(95 + i * 150, 80 + (i % 3) * 150, 10, 50);
  }
  
  // Draw water
  ctx.fillStyle = '#1E90FF';
  ctx.fillRect(600, 300, 200, 150);
  
  // Draw progress indicator
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 10, 200, 30);
  
  ctx.fillStyle = '#FF6B6B';
  const progressWidth = (discoveredItems / totalItems) * 190;
  ctx.fillRect(15, 15, progressWidth, 20);
  
  ctx.fillStyle = 'white';
  ctx.font = '14px Arial';
  ctx.fillText(`${discoveredItems}/${totalItems} Memories Found`, 20, 30);
}

// Main game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw world
  drawWorld();
  
  // Move player
  movePlayer();
  
  // Check for item collisions
  checkCollisions();
  
  // Draw items
  drawSpecialItems();
  
  // Draw player
  drawPlayer();
  
  // Continue loop
  window.requestAnimationFrame(gameLoop);
}

// Start the game
window.onload = init;