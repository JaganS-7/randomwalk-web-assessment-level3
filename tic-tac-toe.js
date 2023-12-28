// Get references to HTML elements
const board = document.getElementById('board'); 
const scoreCard = document.getElementById('scoreCard');  
const message = document.getElementById('message');  
const resetButton = document.querySelector('.reset-button');  

// Initialize game state variables
let currentPlayer = 'X'; // Current player ('X' or 'O')
let winner = null; // Winning player ('X' or 'O') or null if no winner
let playerXScore = 0; // Player X's score
let playerOScore = 0; // Player O's score

let playerXName = ""; // Player X's name
let playerOName = ""; // Player O's name

// Create an array to store references to each game cell
const cells = Array.from({ length: 9 }, (_, index) => createCell(index));

// Function to create a cell and set up its click event listener
function createCell(index) {
    const cell = document.createElement('div'); // Create a new div element for the cell
    cell.classList.add('game-cell'); // Add the 'game-cell' class for styling
    cell.dataset.index = index; // Store the cell's index as a data attribute
    cell.addEventListener('click', handleCellClick); // Set up the click event listener for the cell
    board.appendChild(cell); // Append the cell to the game board
    return cell; // Return, reference to the created cell
}

// Function to start the game
function startGame() {
    playerXName = document.getElementById('playerXName').value;
    playerOName = document.getElementById('playerOName').value;

    document.getElementById('playerXDisplayName').textContent = playerXName;
    document.getElementById('playerODisplayName').textContent = playerOName;

    // Hide the name input section
    document.querySelector('.name-input').style.display = 'none';
}

// Event handler for cell clicks
function handleCellClick(event) {
    const clickedCell = event.target; // Get the clicked cell
    const index = clickedCell.dataset.index; // Get the index of the clicked cell

    // Check if the cell is empty and there is no winner
    if (!winner && !clickedCell.textContent) {
        clickedCell.textContent = currentPlayer; // Set the current player's symbol in the cell
        checkWinner(); // Check if the current move results in a win
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch to the other player's turn
        updateMessage(); // Update the message based on the game state
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows (in index numbers)
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination; // Destructure the winning combination
        const cellsValues = cells.map(cell => cell.textContent); // Get the values in the cells

        // Check if the values in the cells match a winning combination
        if (cellsValues[a] && cellsValues[a] === cellsValues[b] && cellsValues[a] === cellsValues[c]) {
            winner = cellsValues[a]; // Set the winner
            updateScore(); // Update the score based on the winner
            updateMessage(); // Update the message based on the game state
            showWinningAnimation(winner); // Show the winning animation
            break; // Exit the loop if there is a winner
        }
    }

    // Check for a draw if there is no winner and all cells are filled
    if (!winner && cells.every(cell => cell.textContent)) {
        //message.textContent = "It's a draw!";
        showDrawAnimation(); // Show the draw animation
    }
}

// Function to update the score
function updateScore() {
    if (winner === 'X') {
        playerXScore++;
    } else if (winner === 'O') {
        playerOScore++;
    }

    scoreCard.innerHTML = `Score for <span id="playerXDisplayName">${playerXName}</span>: ${playerXScore} | Score for <span id="playerODisplayName">${playerOName}</span>: ${playerOScore}`; // Update the score card in the HTML
}

// Function to update the message based on the game state
function updateMessage() {
    if (!winner) {
        message.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        message.textContent = `Player ${winner === 'X' ? playerXName : playerOName} wins!`;
    }
}

// Function to show a winning animation
function showWinningAnimation(winner) {
    const winningMessage = document.createElement('div'); // Create a new div element for the winning message
    winningMessage.classList.add('winning-message'); // Add the 'winning-message' class for styling
    winningMessage.textContent = `Hurray! Player ${winner === 'X' ? playerXName : playerOName} won!`; // Set the text content of the winning message

    document.body.appendChild(winningMessage); // Append the winning message to the body

    // Remove the winning message after 3 seconds
    setTimeout(() => {
        winningMessage.remove();
    }, 3000);
}

function showDrawAnimation() {
    const drawMessage = document.createElement('div'); // Create a new div element for the draw message
    drawMessage.classList.add('draw-message'); // Add the 'draw-message' class for styling
    drawMessage.textContent = "Huh! It's a draw!"; // Set the text content of the draw message

    document.body.appendChild(drawMessage); // Append the draw message to the body

    // Remove the draw message after 3 seconds
    setTimeout(() => {
        drawMessage.remove();
    }, 3000);
}

// Function to reset the game
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the content of each cell
    });

    currentPlayer = 'X'; // Reset the current player
    winner = null; // Reset the winner
    updateMessage(); // Update the message based on the game state
    // Show the name input section
    document.querySelector('.name-input').style.display = 'block';
}

// Initial setup
//updateMessage(); // Update the initial message
