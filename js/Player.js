class Player {
    class = 'player1';
    char = 'O';
    pseudo = '';
    score = 0;
    scoreDOMSelector;
    pseudoDOMSelector;

    constructor({ char, pseudo, scoreDOMSelector, pseudoDOMSelector }) {
        this.char = char;
        this.pseudo = pseudo;
        this.scoreDOMSelector = scoreDOMSelector;
        this.pseudoDOMSelector = pseudoDOMSelector;
        this.updateScore();
        this.displayPseudo();
    }

    displayPseudo() {
        document.querySelector(this.pseudoDOMSelector).innerHTML = this.pseudo;
    }

    updateScore() {
        document.querySelector(this.scoreDOMSelector).innerHTML = this.score;
    }

    incScore() {
        this.score++;
        this.updateScore();
        console.log(this.pseudo + ' score : ' + this.score);
    }
}
