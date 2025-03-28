class Game
{
    static TOTAL_TIME = 120;
    static BOARD_ROWS = 10;
    static BOARD_COLS = 17;

    constructor() {
        this.board = null;
        this.score = 0;
        this.timer = 0;
        this.gameover = true;
        this.gameStartTimeStamp = null;
    }

    /**
     * Updates the game timer.
     */
    updateTimer() {
        if (this.timer > 0) {
            this.timer = Game.TOTAL_TIME - Math.floor((Date.now() - this.gameStartTimeStamp) / 1000);
        } else {
            this.timer = 0;
            this.gameover = true;
        }
    }

    /**
     * Starts a new game.
     */
    play() {
        this.gameover = false;
        this.score = 0;
        this.timer = Game.TOTAL_TIME;
        this.gameStartTimeStamp = Date.now();
        this.board = new Board(Game.BOARD_ROWS, Game.BOARD_COLS);
        this.board.init();
    }

    /**
     * Adds the given number to the current score.
     * @param {number} n Score to add.
     */
    addScore(n) {
        this.score += n;
    }
}
