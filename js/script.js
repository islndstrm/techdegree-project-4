// programming for tic-tac-toe

  const startPage = document.getElementById('start');
  const board = document.getElementById('board');
  const startButton = document.querySelector("div.screen-start .button");
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  let turn = 'player1';
  const boxes = document.querySelectorAll('.box');


  // hide board at load
  board.style.display = "none";

  startButton.addEventListener('click', () => {
    startPage.style.display = "none";
    board.style.display = "block";

  });

  // player 1's turn is first when the bord loads
  player1.classList.add('active');

  // function to handle mouseovers and mouseouts
  function hoverBox(event) {
    if (event.type === "mouseover" && turn === "player1") {
      event.target.style.backgroundImage = "url('img/o.svg')";
    } else if (event.type === "mouseover" && turn === "player2"){
      event.target.style.backgroundImage = "url(img/x.svg')";
    } else {
      event.target.style.backgroundImage = "";
    }
  }

  // function to handle box clicks
  function clickBox (event) {
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
  }

  // adds listeners to all the boxes
  boxes.forEach((box) => {
    box.addEventListener('mouseover', hoverBox);
    box.addEventListener('mouseout', hoverBox);
    box.addEventListener('click', clickBox);
  });
