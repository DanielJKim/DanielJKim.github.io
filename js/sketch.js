// TODO: add more buttons to frame, add sound effects, add/make bg music
const CANVAS_WIDTH = 1050;
const CANVAS_HEIGHT = 650;

const APPLE_DIAMETER = 30;
const BACKGROUND_X = 60;
const BACKGROUND_Y = 80;
const BOARD_X = BACKGROUND_X + (1.5 * APPLE_DIAMETER);
const BOARD_Y = BACKGROUND_Y + ((CANVAS_HEIGHT - (2 * BACKGROUND_Y) - (APPLE_DIAMETER * 13.5)) / 2);
const TIMER_X = CANVAS_WIDTH - BACKGROUND_X - (2.5 * APPLE_DIAMETER);
const TIMER_Y = BACKGROUND_Y + (1.5 * APPLE_DIAMETER);
const SCORE_X = CANVAS_WIDTH - BACKGROUND_X - (2.5 * APPLE_DIAMETER);
const SCORE_Y = CANVAS_HEIGHT - BACKGROUND_Y - (1.5 * APPLE_DIAMETER);
const GAMEOVER_X = CANVAS_WIDTH - BACKGROUND_X - (2.5 * APPLE_DIAMETER);
const GAMEOVER_Y = (CANVAS_HEIGHT / 2) - (1.5 * APPLE_DIAMETER);
const GAMEOVER_SCORE_X = CANVAS_WIDTH - BACKGROUND_X - (2.5 * APPLE_DIAMETER);
const GAMEOVER_SCORE_Y = (CANVAS_HEIGHT / 2) + (1.5 * APPLE_DIAMETER);

const PLAY_BUTTON_RADIUS = 120;
const PLAY_BUTTON_X = BACKGROUND_X + PLAY_BUTTON_RADIUS + 30;
const PLAY_BUTTON_Y = CANVAS_HEIGHT / 2;
const PLAY_BUTTON = new CircleButton("play", PLAY_BUTTON_X, PLAY_BUTTON_Y, PLAY_BUTTON_RADIUS);

const RESET_BUTTON_WIDTH = 60;
const RESET_BUTTON_HEIGHT = 30;
const RESET_BUTTON_X = 90;
const RESET_BUTTON_Y = CANVAS_HEIGHT - (BACKGROUND_Y / 2) - (RESET_BUTTON_HEIGHT / 2);
const RESET_BUTTON = new RectButton("reset", RESET_BUTTON_X, RESET_BUTTON_Y, RESET_BUTTON_WIDTH, RESET_BUTTON_HEIGHT);

const FONT_SIZE_TITLE = 50;
const FONT_SIZE_BIG = 42;
const FONT_SIZE_MEDIUM = 24;
const FONT_SIZE_SMALL = 12;
const TEXT_FONT = "monospace";
const COLOR_PALETTE = {
    White: "#ffffff",
    Black: "#000000",
    LimeGreen: "#5ec940",
    Malachite: "#00e07f",
    Tomato: "#f66451",
    Nyanza: "#e4ffd6",
    BlackBean: "#301014",
    Jasmine: "#face75",
    AfricanViolet: "#a176a7",
};

var showMainMenuScreen = true;
var showGameScreen = false;
var showGameOverScreen = false;
var lastClickX = 0;
var lastClickY = 0;
var buttons = [ PLAY_BUTTON, RESET_BUTTON ];
var game = new Game();

// p5js setup function
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

// p5js draw function
function draw() {
    drawFrame();

    if (showMainMenuScreen) {
        drawMainMenuScreen();
    }

    if (showGameScreen) {
        drawGameScreen();
    }

    if (showGameOverScreen) {
        drawGameScreen();
        drawGameOverScreen();
    }

    hoverButtons();
}

// p5js mousePressed event
function mousePressed() {
    lastClickX = mouseX;
    lastClickY = mouseY;

    buttons.forEach(b => {
        if (b.isMouseOver(lastClickX, lastClickY)) {
            if (b.id === "play") {
                game.play();
                showMainMenuScreen = false;
                showGameScreen = true;
                showGameOverScreen = false;
            }
            else if (b.id === "reset") {
                if (showGameScreen) {
                    game.play();
                } else if (showGameOverScreen) {
                    game.play();
                    showMainMenuScreen = false;
                    showGameScreen = true;
                    showGameOverScreen = false;
                }
            }
        }
    });

    if (showGameScreen) {
        buttons = buttons.filter(b => b.id !== "play");
    }
}

// p5js mouseReleased event
function mouseReleased() {
    if (showGameScreen && !game.gameover) {
        selectApples(lastClickX, lastClickY, mouseX, mouseY);
    }
}

function selectApples(startx, starty, endx, endy) {
    let sum = 0;
    for (let i = 0; i < Game.BOARD_ROWS; i++) {
        for (let j = 0; j < Game.BOARD_COLS; j++) {
            let apple = game.board.getValue(i, j);
            let space = APPLE_DIAMETER * 1.5;
            if (
                apple !== 0 &&
                BOARD_X + (j * space) > min(startx, endx) &&
                BOARD_X + (j * space) < max(startx, endx) &&
                BOARD_Y + (i * space) > min(starty, endy) &&
                BOARD_Y + (i * space) < max(starty, endy)
            ) {
                sum += apple;
                if (sum > 10) return;
            }
        }
    }

    if (sum !== 10) return;

    for (let i = 0; i < Game.BOARD_ROWS; i++) {
        for (let j = 0; j < Game.BOARD_COLS; j++) {
            let apple = game.board.getValue(i, j);
            let space = APPLE_DIAMETER * 1.5;
            if (
                apple !== 0 &&
                BOARD_X + (j * space) > min(startx, endx) &&
                BOARD_X + (j * space) < max(startx, endx) &&
                BOARD_Y + (i * space) > min(starty, endy) &&
                BOARD_Y + (i * space) < max(starty, endy)
            ) {
                game.board.removeApple(i, j);
                game.addScore(1);
            }
        }
    }
}

function drawFrame() {
    let c = color(COLOR_PALETTE.Malachite);
    fill(c);
    stroke(COLOR_PALETTE.White);
    rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 50);

    drawResetButton();
    // TODO: draw other buttons: BGM button, sound effects button, etc.
}

function drawResetButton() {
    let c = color(COLOR_PALETTE.Malachite);

    fill(c);
    stroke(COLOR_PALETTE.White);
    rect(RESET_BUTTON_X, RESET_BUTTON_Y, RESET_BUTTON_WIDTH, RESET_BUTTON_HEIGHT);

    noStroke();
    fill(COLOR_PALETTE.White);
    textSize(FONT_SIZE_SMALL);
    textAlign(CENTER, CENTER);
    text('Reset', RESET_BUTTON_X + (RESET_BUTTON_WIDTH / 2), RESET_BUTTON_Y + (RESET_BUTTON_HEIGHT / 2));
}

function drawBackground() {
    let c = color(COLOR_PALETTE.Nyanza);

    fill(c);
    noStroke();
    rect(BACKGROUND_X, BACKGROUND_Y, CANVAS_WIDTH - (2 * BACKGROUND_X), CANVAS_HEIGHT - (2 * BACKGROUND_Y));

    stroke(COLOR_PALETTE.White);
    let xinc = BACKGROUND_X;
    let yinc = BACKGROUND_Y;
    while (xinc < (CANVAS_WIDTH - BACKGROUND_X)) {
        line(xinc, BACKGROUND_Y + 1, xinc, CANVAS_HEIGHT - BACKGROUND_Y - 1);
        xinc += (APPLE_DIAMETER / 3);
    }

    while (yinc < (CANVAS_HEIGHT - BACKGROUND_Y)) {
        line(BACKGROUND_X + 1, yinc, CANVAS_WIDTH - BACKGROUND_X - 1, yinc);
        yinc += (APPLE_DIAMETER / 3);
    }
}

function drawMainMenuScreen() {
    let x = width / 2;
    let y = height / 2;
    let c = color(COLOR_PALETTE.BlackBean);

    drawBackground();

    stroke(COLOR_PALETTE.White);
    fill(c);
    textFont(TEXT_FONT);
    textSize(FONT_SIZE_TITLE);
    textAlign(CENTER, CENTER);
    text('Apple Game', x, y);

    drawSample();
    drawPlayButton();
}

function drawSample() {
    let midY = CANVAS_HEIGHT / 2;
    let leftX = CANVAS_WIDTH - BACKGROUND_X - (1.5 * APPLE_DIAMETER) - (APPLE_DIAMETER * 6);
    let positions = [
        [0, -1, '5'], [1, -1, '7'], [2, -1, '6'], [3, -1, '8'],
        [1, 0, '3'], [2, 0, '2'], [3, 0, '9'],
        [0, 1, '1'], [2, 1, '4']
    ];

    positions.forEach(p => {
        let xpos = leftX + (1.5 * APPLE_DIAMETER * p[0]);
        let ypos = midY + (1.5 * APPLE_DIAMETER * p[1]);
        drawApple(xpos, ypos, p[2]);
    });
}

function drawPlayButton() {
    let c = color(COLOR_PALETTE.Tomato);

    noStroke();
    fill(c);
    circle(PLAY_BUTTON_X, PLAY_BUTTON_Y, PLAY_BUTTON_RADIUS * 2);

    noStroke();
    fill(COLOR_PALETTE.White);
    textSize(FONT_SIZE_BIG);
    textAlign(CENTER, CENTER);
    text('Play', PLAY_BUTTON_X, PLAY_BUTTON_Y);
}

function hoverButtons() {
    let hover = buttons.reduce((acc, b) => {
        return acc || b.isMouseOver(mouseX, mouseY);
    }, false);

    if (hover) {
        cursor('pointer');
    } else {
        cursor('default');
    }
}

function drawGameScreen() {
    game.updateTimer();
    if (game.gameover) {
        showGameOverScreen = true;
        showGameScreen = false;
        showMainMenuScreen = false;
    }

    drawBackground();
    drawBoard();
    drawTimer();
    drawScore();

    if (mouseIsPressed) {
        drawSelect(lastClickX, lastClickY, mouseX, mouseY);
    }
}

function drawBoard() {
    let space = APPLE_DIAMETER * 1.5;
    for (let i = 0; i < Game.BOARD_ROWS; i++) {
        for (let j = 0; j < Game.BOARD_COLS; j++) {
            let apple = game.board.getValue(i, j);
            if (apple != 0) {
                drawApple(BOARD_X + (j * space), BOARD_Y + (i * space), apple.toString());
            }
        }
    }
}

function drawApple(x, y, val) {
    let c = color(COLOR_PALETTE.Tomato);

    fill(c);
    noStroke();
    circle(x, y, APPLE_DIAMETER);

    fill(COLOR_PALETTE.White);
    textSize(FONT_SIZE_SMALL);
    textAlign(CENTER, CENTER);
    text(val, x, y);
}

function drawTimer() {
    fill(COLOR_PALETTE.BlackBean);
    textSize(FONT_SIZE_MEDIUM);
    textAlign(CENTER, CENTER);
    text(game.timer.toString(), TIMER_X, TIMER_Y);
}

function drawScore() {
    fill(COLOR_PALETTE.BlackBean);
    textSize(FONT_SIZE_MEDIUM);
    textAlign(CENTER, CENTER);
    text(game.score.toString(), SCORE_X, SCORE_Y);
}

function drawSelect(startx, starty, endx, endy) {
    let alpha = 116;
    let c = color(COLOR_PALETTE.Jasmine);

    c.setAlpha(alpha);
    fill(c);
    rect(startx, starty, endx - startx, endy - starty);

    highlightApples(startx, starty, endx, endy);
}

function highlightApples(startx, starty, endx, endy) {
    for (let i = 0; i < Game.BOARD_ROWS; i++) {
        for (let j = 0; j < Game.BOARD_COLS; j++) {
            let apple = game.board.getValue(i, j);
            let space = APPLE_DIAMETER * 1.5;
            if (
                apple !== 0 &&
                BOARD_X + (j * space) > min(startx, endx) &&
                BOARD_X + (j * space) < max(startx, endx) &&
                BOARD_Y + (i * space) > min(starty, endy) &&
                BOARD_Y + (i * space) < max(starty, endy)
            ) {
                drawHighlightedApple(BOARD_X + (j * space), BOARD_Y + (i * space), apple);
            }
        }
    }
}

function drawHighlightedApple(x, y, val) {
    let c = color(COLOR_PALETTE.AfricanViolet);

    fill(c);
    noStroke();
    circle(x, y, APPLE_DIAMETER);

    fill(COLOR_PALETTE.White);
    textSize(FONT_SIZE_SMALL);
    textAlign(CENTER, CENTER);
    text(val, x, y);
}

function drawGameOverScreen() {
    fill(COLOR_PALETTE.BlackBean);
    textSize(FONT_SIZE_MEDIUM);
    textAlign(CENTER, CENTER);
    text('Game Over', GAMEOVER_X, GAMEOVER_Y);
    text('Score:' + game.score.toString(), GAMEOVER_SCORE_X, GAMEOVER_SCORE_Y);
}
