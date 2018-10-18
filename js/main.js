let chosenGrid = spaceships;
let grid = chosenGrid;

let cols = grid.length;
let rows = grid.length;

// let cols = 50;
// let rows = 50;
// grid = makeArray(cols, rows);

let res;
let ms;
let game;
let isPlaying;
let counter = 0;

function makeArray(cols, rows) {
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}
function setup(){
	c = createCanvas(windowHeight, windowHeight);
	c.attribute("id", "canvas");
	res = windowHeight/rows;
	slider = createSlider(1, 200, 50, 1);
  	slider.position(10, 10);
  	slider.style('width', '80px');
	slider.input(start);
  
   	// clean();
}

function clean() {
	stop();
	counter = 0;
	// FILL ALL THE GRID WITH ZEROS
	for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function draw() {
	background(0);
	for(x=0;x<cols;x++){
		for(y=0;y<rows;y++){
			if
			(mouseIsPressed &&
			(mouseX > res*x) &&
			(mouseX < res*x + res) &&
			(mouseY > res*y) &&
			(mouseY < res*y + res))
			{
				if (grid[x][y] === 0) {
					grid[x][y] = 1;
					fill(0, 0,255);
					stroke(0,255,0);
					rect(x*res,y*res, res, res);
				} 	  				
				else {
					grid[x][y] = 0;
				} 
			}
			if (grid[x][y] === 1) {
		  		fill(0, 0,255);
				stroke(0,255,0);
				rect(x*res,y*res, res, res);
			}
		}
	}
	fill(0, 0,255);
	noStroke();
  	text(counter, 25, 30);
	textSize(18);  	
	text(slider.value() + ' ms', c.width-80, 30);
	textSize(18);
}

function next() {
	counter++;
	background(0);
    let next = makeArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors <2 || neighbors > 3)) {
                next[i][j] = 0;
            } 
            // IF ACTIVE: CELLS DIE ON EDGES
            // else if (i==0 || i==cols-1 || j== 0 || j==rows-1) {
            // 	next[i][j]=0;
            // } 
            else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

function countNeighbors(grid, x ,y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function start() {
	clearInterval(game);
    game = setInterval(next, slider.value());
    isPlaying = true;
}

function stop() {
    clearInterval(game);
    isPlaying = false;
}

function keyPressed() {
	if (keyCode == 32) {
		if (isPlaying === true) {
	    	stop();
		} else {
			start();
		}
	}
}

function play() {
	if (isPlaying === true) {
    	stop();
	} else {
		start();
	}
}