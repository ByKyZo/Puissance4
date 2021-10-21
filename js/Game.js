class Game {
    gridHTML;
    grid = [];
    params = {
        xLength: 7,
        yLength: 6,
        // xLength: 10,
        // yLength: 10,
        cellSize: 100,
        player1: 'O',
        player2: 'X',
    };

    constructor(gridHTML) {
        this.gridHTML = gridHTML;
    }

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

    drawGrid() {
        this.gridHTML.innerHTML = '';
        this.grid.forEach((row, rowIndex) => {
            const line = document.createElement('div');
            line.classList.add('col');

            row.forEach((cell, cellIndex) => {
                const cellEl = document.createElement('div');
                cellEl.dataset.col = cellIndex;
                cellEl.dataset.row = rowIndex;
                cellEl.style.width = `${this.params.cellSize}px`;
                cellEl.style.height = `${this.params.cellSize}px`;
                cellEl.classList.add('cell');
                line.appendChild(cellEl);
            });

            console.log(line);

            this.gridHTML.appendChild(line);
        });
    }

    play(col) {
        console.log(col);
        for (let i = this.params.yLength - 1; i >= 0; i--) {
            if (this.grid[i][col] === '') {
                this.grid[i][col] = 'O';
                const coin = document.createElement('div');
                coin.classList.add('player1');
                // coin.classList.add('player2');
                document.querySelector(`[data-col="${col}"][data-row="${i}"]`).appendChild(coin);
                break;
            }
        }
        console.log(this.grid);
    }

    listener() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                this.play(cell.dataset.col);
            });
        });
    }
}
