class Board {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.board = [];
    }

    /**
     * Initialize a board.
     */
    init() {
        this.board = [];
        for (let i = 0; i < this.height; i++) {
            let newRow = [];
            for (let j = 0; j < this.width; j++) {
                let randomVal = Math.floor((Math.random() * 9) + 1);
                newRow.push(randomVal);
            }
            this.board.push(newRow);
        }
    }

    /**
     * Gets the value of the board at the given position.
     * @param {number} i Row index.
     * @param {number} j Column index.
     * @returns The value of the board at row i, column j.
     */
    getValue(i, j) {
        return this.board[i][j];
    }

    /**
     * Gets a list of selected indices on the board. Excludes empty positions on the board.
     * @param {number} starti The index of the start row.
     * @param {number} startj The index of the start column.
     * @param {number} endi The index of the end row.
     * @param {number} endj The index of the end column.
     * @returns A list of tuples containing the selected indices.
     */
    getSelectedIndices(starti, startj, endi, endj) {
        let selectedIndices = [];
        for (let i = starti; i <= endi; i++) {
            for (let j = startj; j <= endj; j++) {
                let apple = this.board[i][j];
                if (apple !== 0) {
                    selectedIndices.push([i, j]);
                }
            }
        }

        return selectedIndices;
    }

    /**
     * Removes the apple at the given index from the board.
     * @param {number} i Row of the apple to remove.
     * @param {number} j Column of the apple to remove.
     */
    removeApple(i, j) {
        this.board[i][j] = 0;
    }

    /**
     * Prints the board in the console. Null values are represented with the 'X' character.
     */
    print() {
        for (let i = 0; i < this.height; i++) {
            let rowStr = "";
            for (let j = 0; j < this.width; j++) {
                rowStr += this.board[i][j].toString(); + "\t";
            }

            console.log(rowStr);
        }
    }
}