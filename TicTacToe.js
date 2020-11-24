window.onload = ticTacToe;
function ticTacToe() {
  // Connection
  var gameConn = null;

  var myturn = false
  var myvalue = null


  // Initialization Modal
  var modal = document.getElementById("myModal");
  var usernameInput = document.getElementById("username");
  var gameroomInput = document.getElementById("gameroom");
  var enteroldBtn = document.getElementById("enterold");
  var startnewBtn = document.getElementById("startnew");
  modal.style.display = "block";

  function onGetData(data) {
    console.log(data, " Log by Callback");
    // data = JSON.parse(data)
    myturn=true;
    var cell = document.getElementById(data); 
      if (cell.unWritten) 
      {
        //Checks if cell can be written to.
        if(myvalue!="x")
        {
          cell.innerHTML = "x";
          gridx[cellId]=1;
        }
        else
        {
          cell.innerHTML = "o";
          grido[cellId]=1;
        }
        tieDetectorGrid[cellId] = 1;
        gameConn.sendData(JSON.stringify(cellId)); 
      }
  }

  startnewBtn.onclick = function () {
    if (usernameInput.value != "") {
      myvalue = "x"
      myturn=true
      modal.style.display = "none";
      gameConn = new GameConnection("TTT", usernameInput.value, null);
      gameConn.onData(onGetData);
    }
  };

  enteroldBtn.onclick = function () {
    if (usernameInput.value != "" && gameroomInput.value != "") {
      myvalue = "o"
      modal.style.display = "none";
      gameConn = new GameConnection(
        "TTT",
        usernameInput.value,
        gameroomInput.value
      );
      gameConn.onData(onGetData);
    }
  };


  // Game Initialization
  var gridx = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var grido = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var tieDetectorGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  function status(toSet) {
    document.getElementById("status").innerHTML = toSet;
  }

  function setCellProperties(id) {
    var cellId = id;
    var cell = document.getElementById(cellId);
    cell.unWritten = 1;
    cell.onclick = function () {
      cellClick(cellId);
      var gameOver = 0;
      gameOver = checkWin(gridx, usernameInput.value + " (Player 1)");
      if (!gameOver) gameOver = checkWin(grido, " (Player 2)");
      if (!gameOver) checkTie();
    };
  }
  for (var i = 0; i < 9; i++) {
    setCellProperties(i);
  }
  function cellClick(cellId)
  {
    var cell = document.getElementById(cellId); 
    if(myturn)
    {
      if (cell.unWritten) {
        //Checks if cell can be written to.
        cell.innerHTML = myvalue;
        myturn = false; //It is now O's turn.
        if(myvalue=="x")
        {
          gridx[cellId]=1;
        }
        else
        {
          grido[cellId]=1;
        }
        tieDetectorGrid[cellId] = 1;
        gameConn.sendData(JSON.stringify(cellId)); 
        }
      }
    }
  // function cellClick(cellId, cell) {
  //   if (myturn) {
  //     gameConn.sendData(JSON.stringify({ cellId, cell }));
  //     //Checks if X turn or not.
  //     if (cell.unWritten) {
  //       //Checks if cell can be written to.
  //       cell.innerHTML = "x";
  //       turn = 0; //It is now O's turn.
  //       status("Turn : 2nd Player");
  //       cell.unWritten = undefined;
  //       gridx[cellId] = 1;
  //       grido[cellId] = 0;
  //       tieDetectorGrid[cellId] = 1;
  //     }
  //   } else if (cell.unWritten) {
  //     //Checks if cell can be written to.
  //     cell.innerHTML = "o";
  //     turn = 1; //It is now X's turn.
  //     // status("Turn : " + p1.value);
  //     cell.unWritten = undefined;
  //     grido[cellId] = 1;
  //     gridx[cellId] = 0;
  //     tieDetectorGrid[cellId] = 1;
  //   }
  // }

  function checkWin(gridToCheck, who) {
    var gameOver = 0;

    gameOver = checkCombo(0, 1, 2, who);
    if (!gameOver) gameOver = checkCombo(3, 4, 5, who);
    if (!gameOver) gameOver = checkCombo(6, 7, 8, who);
    if (!gameOver) gameOver = checkCombo(0, 3, 6, who);
    if (!gameOver) gameOver = checkCombo(1, 4, 7, who);
    if (!gameOver) gameOver = checkCombo(2, 5, 8, who);
    if (!gameOver) gameOver = checkCombo(0, 4, 8, who);
    if (!gameOver) gameOver = checkCombo(2, 4, 6, who);

    return gameOver;

    function checkCombo(cell1, cell2, cell3, who) {
      if (
        gridToCheck[cell1] === 1 &&
        gridToCheck[cell2] === 1 &&
        gridToCheck[cell3] === 1
      ) {
        status(who + " won!");
        writeAll(undefined);
        bold([cell1, cell2, cell3]);
        return 1;
      }
    }
  }

  function checkTie() {
    if (
      tieDetectorGrid[0] === 1 &&
      tieDetectorGrid[1] === 1 &&
      tieDetectorGrid[2] === 1 &&
      tieDetectorGrid[3] === 1 &&
      tieDetectorGrid[4] === 1 &&
      tieDetectorGrid[5] === 1 &&
      tieDetectorGrid[6] === 1 &&
      tieDetectorGrid[7] === 1 &&
      tieDetectorGrid[8] === 1
    ) {
      //Checks if board is full

      status("Draw");
      writeAll(undefined);
    }
  }

  function writeAll(bool) {
    for (var i = 0; i < 9; i++) {
      document.getElementById(i.toString()).unWritten = bool;
    }
  }
  function bold(toBold) {
    for (var i = 0; i < 3; i++) {
      document.getElementById(toBold[i].toString()).classList.add("bold");
    }
  }

  // Reset Game
  // document.getElementById("reset").onclick = function () {
  //   writeAll(1);
  //   status("Turn : " + p1.value);
  //   turn = 1;
  //   gridx = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   grido = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   tieDetectorGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   for (var i = 0; i < 9; i++) {
  //     document.getElementById(i.toString()).classList.remove("bold");
  //   }
  //   for (var i = 0; i < 9; i++) {
  //     document.getElementById(i.toString()).innerHTML = "";
  //   }
  // };
}
