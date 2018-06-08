const startPage = document.getElementById('start');
const board = document.getElementById('board');
const startButton = document.querySelector("div.screen-start .button");
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
let turn = 'player1';
const boxes = document.querySelector('.boxes');

// hide board at load
board.style.display = "none";

startButton.addEventListener('click', () => {
  startPage.style.display = "none";
  board.style.display = "block";
});

// player 1's turn is first when the bord loads
player1.classList.add('active');

boxes.addEventListener('mouseover', (event) => {
  if (turn === 'player1') {
    event.target.style.backgroundImage = "url('img/o.svg')";
  }
});


boxes.addEventListener('click', (event) => {
  if (turn === 'player1') {
    event.target.classList.add('box-filled-1');
    turn = 'player2';
    player1.classList.remove('active');
    player2.classList.add('active');
  } else if (turn === 'player2') {
    event.target.classList.add('box-filled-2');
    turn = 'player1';
    player2.classList.remove('active');
    player1.classList.add('active');
  }

});
