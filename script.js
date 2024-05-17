DEFAULT_SIZE = 16

function populate_grid(size) {
    let grid = document.querySelector('.grid')
    grid.innerHTML = ""; // Reset grid
    let totalSquares = size**2;
    let squareSize = 100/Math.sqrt(totalSquares);
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        square.style.width = squareSize + '%';
        square.style.height = squareSize + '%';
        
        square.addEventListener('mousedown', function(event) {
            event.preventDefault(); // Prevent dragging
            square.style.backgroundColor = colorPicker.value;
        });
        
        square.addEventListener('mousedown', function(event) {
            if (event.buttons == 1 || event.buttons == 2) {
                paint();
            }
        });

        // Paint functionality for phone
        square.addEventListener('touchstart', paintOnTouchStart);
        square.addEventListener('touchmove', paintOnTouchMove);
    };
};


function paintOnTouchStart(event) {
    event.preventDefault();
    const square = event.targetTouches[0].target;
    paint(square);
};

function paintOnTouchMove(event) {
    event.preventDefault();
    const square = event.targetTouches[0].target;
    paint(square);
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
    // Remove active state from previous pen
    const prevPen = document.querySelector(".active");
    if (prevPen) {
        prevPen.classList.remove("active");
    }

    // Set new pen as active
    const newPen = document.getElementById(mainPen);
    newPen.classList.add("active");
};

function toggle_grid() {
    const button = document.getElementById('gridBtn');
    const squares = document.getElementsByClassName('square');
    
    // Toggle grid
    button.classList.toggle('gridActive');
    for (let square of squares) {
        square.classList.toggle('gridActive');
    }

    if (button.classList.contains('gridActive')) {
        button.style.color = 'white';
        button.style.backgroundColor = 'black';
    } else {
        button.style.color = 'black';
        button.style.backgroundColor = 'white';
    }
};

// Event listeners
const slider = document.getElementById('sizeSlider');
const sliderText = document.querySelector('.size-value');

sliderText.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener("input", () => {
    sliderText.textContent = `${slider.value} x ${slider.value}`;
    populate_grid(slider.value);
});

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => {
    colorPicker.style.borderColor = colorPicker.value;
});

const clearCanvas = document.getElementById('clearBtn');
clearCanvas.addEventListener('mousedown', () => {
    populate_grid(slider.value);
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

const grid = document.getElementById('gridBtn');
grid.addEventListener('click', () => {
    toggle_grid();
});

populate_grid(DEFAULT_SIZE);