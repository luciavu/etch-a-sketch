
DEFAULT_SIZE = 16

grid = document.querySelector('.grid')
const gridWidth = grid.offsetWidth; // Width of the parent element
const gridHeight = grid.offsetHeight; // Height of the parent element

function populate_grid(size) {
    totalSquares = size**2;
    squareSize = 100/Math.sqrt(totalSquares);
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        square.style.width = squareSize + '%';
        square.style.height = squareSize + '%';
    }
    
}

populate_grid(DEFAULT_SIZE);
