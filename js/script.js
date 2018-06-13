// programming for a tic-tac-toe game that plays against a computer

document.addEventListener("DOMContentLoaded", function(){

  // declare variables
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
  const boxesUL = document.getElementById('.boxes');
  let message = document.querySelector('.message');
  let turn = 'player1';
  let drawCounter = 0;
  let player1Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let player2Boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // sets up all the winning patterns to check the player arrays against
  const patterns = [ [0, 1, 2], [0, 3, 6], [3, 4, 5], [6, 7, 8],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];

  // the computer's choices of sqaure in order preference
  const player2Choices = [4, 0, 2, 6, 8, 1, 3, 5, 7];

  // hide board and finish page at load
  board.style.display = "none";
  finishPage.style.display = "none";

  // sets up player name
  let playerInput = document.createElement('input');
  let playerName = document.createElement('h1');
  playerInput.type = "input";
  playerInput.value = "Type your name...";
  playerInput.style.margin = "50px 25px 50px 25px";
  startHeader.insertBefore(playerInput, startButton);

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

  // player 1's turn is first when the board loads
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

  // function to handle box clicks to add squares to game
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
        turn = 'computer';
        player1.classList.remove('active');
        player2.classList.add('active');
      }
      // code that controls computer playing as player 2
      if (drawCounter >= 8) {
        loadDrawPage();
      } else {
        while (turn === 'computer') {
          for (var i = 0;  i < player2Choices.length; i++) {
            var boxChoice = `li${player2Choices[i]}`;
            var liChoice = document.getElementById(boxChoice);
            if (!liChoice.classList.contains('box-filled-1')
              && !liChoice.classList.contains('box-filled-2')) {
              liChoice.classList.add('box-filled-2');
              player2Boxes[player2Choices[i]] = 1;
              checkForWin(player2Boxes, 2);
              drawCounter += 1;
              turn = 'player1';
              player2.classList.remove('active');
              player1.classList.add('active');
              turn = 'player1';
              i = player2Choices.length;
            }
          }
        }
      }
    }
  }

  // checks winning patterns against player's array
  function checkForWin (playerArray, playerNum) {
    for (let i = 0;  i < patterns.length; i++) {
      var testArray = patterns[i];
      var index1 = testArray[0];
      var index2 = testArray[1];
      var index3 = testArray[2];
      if (playerArray[index1] === 1 && playerArray[index2] === 1 && playerArray[index3] === 1) {
        loadWinPage(playerNum);
      }
    }
  }

  // loads winner page for the right player once
  function loadWinPage (playerNum) {
    board.style.display = "none";
    finishPage.style.display = "block";
    if (playerInput.value !== "Type your name..." && playerNum === 1) {
      message.textContent = `${playerInput.value} is the Winner`;
    } else {
      message.textContent = "Winner";
    }
    if (playerNum === 1) {
      finishPage.classList.add('screen-win-one');
    } else if (playerNum === 2) {
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
    message.textContent = "";
    playerInput.value = "Type your name...";
    playerName.innerHTML = "";
    player1.classList.add('active');
    player2.classList.remove('active');
    finishPage.classList.remove('screen-win-one');
    finishPage.classList.remove('screen-win-two');
    finishPage.classList.remove('screen-win-tie');
    boxes.forEach((box) => {
      box.classList.remove('box-filled-1');
      box.classList.remove('box-filled-2');
      box.style.backgroundImage = "";
    });
  });
});
