// TODO Faire la verification de victoire pour les 2 joueurs
// TODO Et verifier les conditions en diagonal (surtout vers la droite , bug ??)

class Game {
    gridHTML;
    grid = [];
    currentPlayer = 'O';
    player1;
    player2;
    params = {
        xLength: 7,
        yLength: 6,
        cellSize: 70,
    };
    /***
     *
     * Constructor
     *
     */
    constructor({ gridHTML, player1, player2 }) {
        this.gridHTML = gridHTML;
        this.player1 = player1;
        this.player2 = player2;
    }
    /***
     *
     * Initialisation du jeu et création de la grille sous forme de tableau 2D
     *
     */
    init() {
        for (let i = 0; i < this.params.yLength; i++) {
            const line = [];
            for (let j = 0; j < this.params.xLength; j++) {
                line.push('');
            }
            this.grid.push(line);
        }

        console.log(this.grid);
        this.drawGrid();
        this.listener();
    }
    /***
     *
     * Dessine la grille dans le HTML
     *
     */
    drawGrid() {
        this.gridHTML.innerHTML = '';
        this.grid.forEach((row, rowIndex) => {
            const line = document.createElement('div');
            line.classList.add('row');

            row.forEach((cell, cellIndex) => {
                const cellEl = document.createElement('div');
                cellEl.dataset.col = cellIndex;
                cellEl.dataset.row = rowIndex;
                cellEl.style.width = `${this.params.cellSize}px`;
                cellEl.style.height = `${this.params.cellSize}px`;
                cellEl.classList.add('cell');
                line.appendChild(cellEl);
            });

            this.gridHTML.appendChild(line);
        });
    }
    /***
     *
     * Mets a jour le joueur courant
     *
     */
    updatePlayer() {
        this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
    }
    /***
     *
     * Retourne la class du joueur courant
     *
     */
    updatePlayerClass() {
        return this.currentPlayer === 'O' ? 'player1' : 'player2';
    }

    getHTMLCell(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    getValidPosition(col) {
        for (let i = this.params.yLength - 1; i >= 0; i--) {
            if (this.grid[i][col] === '') {
                return { row: i, col };
            }
        }
        return null;
    }

    play(colParam) {
        const pos = this.getValidPosition(colParam);

        if (!pos) return;

        this.grid[pos.row][pos.col] = this.currentPlayer;
        const coin = document.createElement('div');

        coin.classList.add(this.updatePlayerClass(), 'token');
        this.getHTMLCell(pos.row, pos.col).appendChild(coin);

        this.updatePlayer();
        this.winConditions();
    }

    clearPlaceholder() {
        const placeholders = document.querySelectorAll('.placeholder');
        placeholders.forEach((p) => p.remove());
    }

    updatePlaceholder(colParam) {
        this.clearPlaceholder();

        const pos = this.getValidPosition(colParam);

        if (!pos) return;

        const coin = document.createElement('div');

        coin.classList.add(this.updatePlayerClass(), 'token', 'placeholder');
        this.getHTMLCell(pos.row, pos.col).appendChild(coin);
    }

    winConditions() {
        for (let i = 0; i < this.params.yLength; i++) {
            for (let j = 0; j < this.params.xLength; j++) {
                this.checkWinVertical(this.player1, i, j);
                this.checkWinHorizontal(this.player1, i, j);
                this.checkWinDiagonal(this.player1, i, j);

                this.checkWinVertical(this.player2, i, j);
                this.checkWinHorizontal(this.player2, i, j);
                this.checkWinDiagonal(this.player2, i, j);
            }
        }
    }

    checkWinVertical(player, row, col) {
        if (
            row < this.params.yLength - 3 &&
            this.grid[row][col] === player.char &&
            this.grid[row + 1][col] === player.char &&
            this.grid[row + 2][col] === player.char &&
            this.grid[row + 3][col] === player.char
        ) {
            this.reset();
            player.incScore();
            console.log('WIN VERTICAL');
        }
    }

    checkWinHorizontal(player, row, col) {
        if (
            this.grid[row][col] === player.char &&
            this.grid[row][col + 1] === player.char &&
            this.grid[row][col + 2] === player.char &&
            this.grid[row][col + 3] === player.char
        ) {
            this.reset();
            player.incScore();
            console.log('WIN HORIZONTAL');
        }
    }

    checkWinDiagonal(player, row, col) {
        if (
            // Verifie en Diagonale vers la gauche
            row < this.params.yLength - 3 &&
            col < this.params.xLength - 3 &&
            this.grid[row][col] === player.char &&
            this.grid[row + 1][col + 1] === player.char &&
            this.grid[row + 2][col + 2] === player.char &&
            this.grid[row + 3][col + 3] === player.char
        ) {
            this.reset();
            player.incScore();
            console.log('WIN DIAGONAL');
        } else if (
            // Verifie en Diagonale vers la droite
            row >= 3 &&
            col < this.params.xLength - 3 &&
            this.grid[row][col] === player.char &&
            this.grid[row - 1][col + 1] === player.char &&
            this.grid[row - 2][col + 2] === player.char &&
            this.grid[row - 3][col + 3] === player.char
        ) {
            this.reset();
            player.incScore();
            console.log('WIN DIAGONAL');
        }
    }

    listener() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                this.play(cell.dataset.col);
                this.updatePlaceholder(cell.dataset.col);
            });
            cell.addEventListener('mouseenter', () => {
                this.updatePlaceholder(cell.dataset.col);
            });
            cell.addEventListener('mouseleave', () => {
                this.clearPlaceholder();
            });
        });
    }

    reset() {
        this.grid = [];
        const tokens = document.querySelectorAll('.token');
        tokens.forEach((token) => token.remove());
        this.init();
        console.log('reset');
    }
}
