// programming for tic-tac-toe

document.addEventListener("DOMContentLoaded", function(){
  const startPage = document.getElementById('start');
  const startHeader = document.querySelector('.screen-start header');
  const winHeader = document.querySelector('.screen-win header');
  const board = document.getElementById('board');
  const finishPage = document.getElementById('finish');
  const startButton = document.querySelector("div.screen-start .button");
  const finishButton = document.querySelector("div.screen-win .button");
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const boxes = document.querySelectorAll('.box');
  const liBoxes = document.querySelectorAll('.boxes li');
  let message = document.querySelector('.message');
  let turn = 'player1';
  let drawCounter = 0;
  let player1Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let player2Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // sets up all the winning patterns to check the player arrays against
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

  // sets up player name
  let playerInput = document.createElement('input');
  let playerName = document.createElement('h1');
  playerInput.type = "input";
  playerInput.value = "Type your name...";
  playerInput.style.margin = "50px 25px 50px 25px";
  startHeader.insertBefore(playerInput, startButton);


  // hide board and finish page at load
  board.style.display = "none";
  finishPage.style.display = "none";

  // move to board after start button is clicked
  startButton.addEventListener('click', () => {
    startPage.style.display = "none";
    board.style.display = "block";
    // display player 1 name (if entered)
    if (playerInput.value !== "Type your name...") {
      playerName.innerHTML = `${playerInput.value}`;
      player1.appendChild(playerName);
      playerName.style.display = "inline";
      playerName.style.padding = "10px 10px 30px 20px";
    }
  });

  // player 1's turn is first when the bord loads
  player1.classList.add('active');

  // function to handle mouseovers and mouseouts
  function hoverBox(event) {
    if (!event.target.classList.contains('box-filled-1') && !event.target.classList.contains('box-filled-2')) {
      if (event.type === "mouseover" && turn === "player1") {
        event.target.style.backgroundImage = "url('img/o.svg')";
      } else if (event.type === "mouseover" && turn === "player2"){
        event.target.style.backgroundImage = "url('img/x.svg')";
      } else {
        event.target.style.backgroundImage = "";
      }
    }
  }

  // function to handle box clicks
  function clickBox (event) {
    if (drawCounter >= 8) {
      loadDrawPage();
    }
    if (turn === 'player1') {
      if (!event.target.classList.contains('box-filled-1') && !event.target.classList.contains('box-filled-2')) {
        event.target.classList.add('box-filled-1');
        let index = event.target.id;
        index = index[2];
        player1Boxes[index] = 1;
        checkForWin(player1Boxes, 1);
        drawCounter += 1;
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
        drawCounter += 1;
        turn = 'player1';
        player2.classList.remove('active');
        player1.classList.add('active');
      }
    }
  }

  // checks winning patterns against player's array
  function checkForWin (playerArray, playerNum) {
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
    if (playerInput.value !== "Type your name...") {
      message.textContent = `${playerInput.value} is the Winner`;
    } else {
      message.textContent = "Winner";
    }
    if (playerNum === 1) {
      finishPage.classList.add('screen-win-one');
    }
    if (playerNum === 2) {
      finishPage.classList.add('screen-win-two');
    }
  }

  // loads "it's a draw page"
  function loadDrawPage () {
    board.style.display = "none";
    finishPage.style.display = "block";
    message.textContent = "It's a draw";
    finishPage.classList.add('screen-win-tie');
  }

  // adds an id to each box
  for (let i = 0; i < liBoxes.length; i++) {
    liBoxes[i].id = `li${i}`;
  }

  // adds listeners to all the boxes
  boxes.forEach((box) => {
    box.addEventListener('mouseover', hoverBox);
    box.addEventListener('mouseout', hoverBox);
    box.addEventListener('click', clickBox);
  });

  // move to start after finish button is clicked
  finishButton.addEventListener('click', () => {
    startPage.style.display = "block";
    board.style.display = "none";
    finishPage.style.display = "none";
    player1Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    player2Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    drawCounter = 0;
    turn = "player1";
    player1.classList.add('active');
    player2.classList.remove('active');
    finishPage.classList.remove('screen-win-one');
    finishPage.classList.remove('screen-win-two');
    finishPage.classList.remove('screen-win-tie');
    boxes.forEach((box) => {
      box.classList.remove('box-filled-1');
      box.classList.remove('box-filled-2');
    });
  });
});
