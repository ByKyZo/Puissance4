// TODO Faire tomber les jetons (rebondir)
// TODO Faire des jetons SVG
// TODO Animer le coup gagnant
// TODO Faire une jolie grille svg ??
// TODO Faire le jeu en ligne avec socket io

const grid = document.querySelector('.grid');

const player1 = new Player({
    char: 'O',
    pseudo: 'Alex',
    scoreDOMSelector: '#player1-score',
    pseudoDOMSelector: '#player1-pseudo',
});
const player2 = new Player({
    char: 'X',
    pseudo: 'Toto',
    scoreDOMSelector: '#player2-score',
    pseudoDOMSelector: '#player2-pseudo',
});

const game = new Game({ gridHTML: grid, player1, player2 });

game.init();
