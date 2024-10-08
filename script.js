const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X'; // X starts first
const playerDisplay = document.getElementById('player');

const checkWin = () => {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //row
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //collumn
        [0, 4, 8], [2, 4, 6] //diagonal
    ];

    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentPlayer;
        });
    });
};

const checkDraw = () => {
    return [...cells].every(cell => {
        return cell.innerText === 'X' || cell.innerText === 'O';
    });
};

const handleClick = (e) => {
    const cell = e.target;

    if (cell.innerText !== '') return;

    cell.innerText = currentPlayer; 
    playerDisplay.innerText = currentPlayer; // Show current player

    if (checkWin()) {
        const winner = currentPlayer === 'X' ? 'Player 1' : 'Player 2'; // Determine winner
        setTimeout(() => alert(winner + ' wins!'), 100); // Alert winner
        resetBoard();
        return;
    }

    if (checkDraw()) {
        setTimeout(() => alert('Draw!'), 100);
        resetBoard();
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer; // Update display with new current player
};

const resetBoard = () => {
    cells.forEach(cell => {
        cell.innerText = '';
    });
    currentPlayer = 'X'; // Reset to player X
    playerDisplay.innerText = currentPlayer; // Update display
};

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

// Reset button functionality
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetBoard);
