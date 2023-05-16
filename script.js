// Get the elements we need to interact with
const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Set up some constants for the game
const gridSize = 6; // Change this value for different grid sizes
const numFielders = 11;
const runScore = 1;

let score = 0;
let fielderLocations = [];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate the game board
function generateBoard() {
  // Clear the existing game board
  gameBoard.innerHTML = '';

  // Generate the game blocks
  for (let i = 0; i < gridSize * gridSize; i++) {
    const block = document.createElement('div');
    block.classList.add('game-block');
    block.setAttribute('data-index', i);
    gameBoard.appendChild(block);
  }

  // Set up event listeners for each game block
  const blocks = document.querySelectorAll('.game-block');
  blocks.forEach((block) => {
    block.addEventListener('click', handleClick);
  });
}

// Function to handle clicks on game blocks
function handleClick(event) {
  const blockIndex = event.target.dataset.index;

  // Check if the clicked block contains a fielder
  if (fielderLocations.includes(parseInt(blockIndex))) {
    endGame();
  } else {
    // Update the score and display it
    score += runScore;
    scoreDisplay.textContent = score;

    // Disable the clicked block
    event.target.removeEventListener('click', handleClick);

    // Check if the game is over (all non-fielder blocks have been clicked)
    const blocks = document.querySelectorAll('.game-block');
    const remainingBlocks = Array.from(blocks).filter((block) => !fielderLocations.includes(parseInt(block.dataset.index)));
    if (remainingBlocks.length === 0) {
      endGame();
    }
  }
}

// Function to end the game
function endGame() {
  // Disable all game blocks
  const blocks = document.querySelectorAll('.game-block');
  blocks.forEach((block) => {
    block.removeEventListener('click', handleClick);
    if (fielderLocations.includes(parseInt(block.dataset.index))) {
      block.style.backgroundColor = '#f00'; // Highlight the fielder blocks in red
    }
  });

  // Show the final score and reset the game
  alert(`Game Over!\nFinal Score: ${score}`);
  score = 0;
  fielderLocations = [];
  scoreDisplay.textContent = score;
  startButton.textContent = 'Start Game';
}

// Function to start/reset the game
function startGame() {
  // Generate random locations for the fielders
  fielderLocations = [];
  while (fielderLocations.length < numFielders) {
    const randomIndex = getRandomInt(0, gridSize * gridSize - 1);
    if (!fielderLocations.includes(randomIndex)) {
      fielderLocations.push(randomIndex);
    }
  }

  // Generate the game board
  generateBoard();

  // Reset the score and display it
  score = 0;
  scoreDisplay.textContent = score;
}

// Add event listener for the start/reset button
startButton.addEventListener('click', startGame);
