DEFAULT_SIZE = 16

function populate_grid(size) {
    grid = document.querySelector('.grid')
    grid.innerHTML = ""; // Reset grid
    totalSquares = size**2;
    squareSize = 100/Math.sqrt(totalSquares);
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        square.style.width = squareSize + '%';
        square.style.height = squareSize + '%';

        square.addEventListener('mousedown', function(event) {
            if (event.buttons == 1 || event.buttons == 2) {
                paint();
            }
        });
    };
};

function paint() {
    const squares = document.getElementsByClassName('square');
    let pen = document.querySelector(".active").id;
    for (let square of squares) {
        square.addEventListener('mousedown', function(event) {
            event.preventDefault(); // Prevent dragging
            square.style.backgroundColor = colorPicker.value;
        });
        
        square.addEventListener('mouseover', function(event) {
            if (event.buttons == 1 || event.buttons == 2) {
                if (pen == 'normal') {
                    color = colorPicker.value;
                } else if (pen == 'rainbow') {
                    color = get_random_color();
                } else {
                    color = 'rgb(255, 255, 255)';
                }
                square.style.backgroundColor = color;
            }
        });
    };
}

function get_random_color() {
        const r = Math.floor(Math.random() * 256); // 0-255
        const g = Math.floor(Math.random() * 256); 
        const b = Math.floor(Math.random() * 256); 
        return `rgb(${r}, ${g}, ${b})`; 
}

function toggle_pen(mainPen) {
    // Find and remove active state on previous pen
    let prevPen = document.querySelector(".active")
    console.log(prevPen);
    prevPen.classList.remove("active");
    prevPen.style.color = 'black';
    prevPen.style.backgroundColor = 'white';
    
    // Set new pen as active
    let newPen = document.getElementById(mainPen)
    newPen.classList.add("active");
    newPen.classList.add("active")
    newPen.style.color = 'white';
    newPen.style.backgroundColor = 'black';
};

// Event listeners
const slider = document.getElementById('sizeSlider');
const sliderText = document.querySelector('.size-value');

sliderText.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener("input", () => {
    slider.TextContent = '';
    sliderText.textContent = `${slider.value} x ${slider.value}`;
    populate_grid(slider.value);
});

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => {
    colorPicker.style.borderColor = colorPicker.value;
});

const clearCanvas = document.getElementById('clearBtn');
clearCanvas.addEventListener('mousedown', () => {
    populate_grid(DEFAULT_SIZE);
});

const normal = document.getElementById('normal');
normal.addEventListener('click', () => {
    currPen = 'normal';
    toggle_pen('normal');
});

const rainbow = document.getElementById('rainbow');
rainbow.addEventListener('click', () => {
    currPen = 'rainbow';
    toggle_pen('rainbow');
});

const eraser = document.getElementById('eraser');
eraser.addEventListener('click', () => {
    currPen = 'eraser';
    toggle_pen('eraser');
});

populate_grid(DEFAULT_SIZE);