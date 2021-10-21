// const canvas = document.querySelector('canvas');
const grid = document.querySelector('.grid');
// const ctx = canvas.getContext('2d');

// ctx.fillStyle = 0xff0000;
// ctx.fillRect(0, 0, 100, 100);

const game = new Game(grid);

game.init();

// const setSize = () => {
//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;
// };

// // setSize();

// // window.addEventListener('resize', setSize);

// console.log(canvas);
