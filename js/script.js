// programming for tic-tac-toe

  const startPage = document.getElementById('start');
  const board = document.getElementById('board');
  const finishPage = document.getElementById('finish');
  const startButton = document.querySelector("div.screen-start .button");
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const boxes = document.querySelectorAll('.box');
  const liBoxes = document.querySelectorAll('.boxes li');
  let turn = 'player1';
  let player1Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let player2Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  // hide board and finish page at load
  board.style.display = "none";
  finishPage.style.display = "none";

  // move to board after start button is clicked
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
      event.target.style.backgroundImage = "url('img/x.svg')";
    } else {
      event.target.style.backgroundImage = "";
    }
  }

  // function to handle box clicks
  function clickBox (event) {
    if (turn === 'player1') {
      if (!event.target.classList.contains('box-filled-1') && !event.target.classList.contains('box-filled-2')) {
        event.target.classList.add('box-filled-1');
        let index = event.target.id;
        index = index[2];
        player1Boxes[index] = 1;
        checkForWin(player1Boxes, 1);
        turn = 'player2';
        player1.classList.remove('active');
        player2.classList.add('active');
      }
    } else if (turn === 'player2') {
      if (!event.target.classList.contains('box-filled-1') && !event.target.classList.contains('box-filled-2')) {
        event.target.classList.add('box-filled-2');
        let index = event.target.id;
        index = index[2];
        player2Boxes[index] = 1;
        checkForWin(player2Boxes, 2);
        turn = 'player1';
        player2.classList.remove('active');
        player1.classList.add('active');
      }
    }
  }

  function checkForWin (playerArray, playerNum) {
      // pattern 1
    for (let i = 0;  i < patterns.length; i++) {
      let testArray = patterns[i];
      let index1 = testArray[0];
      let index2 = testArray[1];
      let index3 = testArray[2];
      if (playerArray[index1] === 1 && playerArray[index2] === 1 && playerArray[index3] === 1) {
        loadWinPage(playerNum);
      }
    }
  }

  function loadWinPage (playerNum) {
    board.style.display = "none";
    finishPage.style.display = "block";
    if (playerNum === 1) {
      finishPage.classList.add('screen-win-one')
    }
    if (playerNum === 2) {
      finishPage.classList.add('screen-win-two')
    }
  }

  for (let i = 0; i < liBoxes.length; i++) {
    liBoxes[i].id = `li${i}`;
  }

  // adds listeners to all the boxes
  boxes.forEach((box) => {
    box.addEventListener('mouseover', hoverBox);
    box.addEventListener('mouseout', hoverBox);
    box.addEventListener('click', clickBox);
  });
