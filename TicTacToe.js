window.onload = ticTacToe;
function ticTacToe () 
{
	var player1Turn = 2;
	var turn = true; 
	var gridx = [false, false, false, false, false, false, false, false, false];  
	var grido = [false, false, false, false, false, false, false, false, false];         
	var tieDetectorGrid = [false, false, false, false, false, false, false, false, false] 

	function status (toSet) 
	{
		document.getElementById("status").innerHTML=toSet;
		document.getElementById("status2").innerHTML=toSet;
	};

	function setCellProperties (id) 
	{
		var cellId = id;
		var cell = document.getElementById(cellId);
		if(cellId<10)
			var cello = document.getElementById(cellId+11);
		else
			var cello = document.getElementById(cellId-11);
		cell.unWritten = true;   
		cello.unWritten= true;                 
		cell.onclick = function () 
		{           
			player1Turn++;                                  
			cellClick(cellId, cell, cello);           
			var gameOver = false;                     
			gameOver = checkWin(gridx, p1.value+" (Player 1)");
			if(!gameOver) gameOver = checkWin(grido, p2.value+" (Player 2)");
			if(!gameOver) checkTie();                 
		};
	};
	for (var i=0;i<9;i++) 
	{
		if(player1Turn%2==0)
			setCellProperties(i); 
	}
	for (var i=11;i<20;i++) 
	{
		if(!player1Turn%2==0)
			setCellProperties(i); 
	}
	function cellClick (cellId, cell, cello) 
	{
		if (turn) 
		{                                //Checks if X turn or not.
			if (cell.unWritten) 
			{                            //Checks if cell can be written to.
				cell.innerHTML="x";
				cello.innerHTML="x";
				turn=false;              //It is now O's turn.
				status("Turn : "+p2.value) && status2("Turn : "+p2.value);
				cell.unWritten=undefined;
				cello.unWritten=undefined;
				gridx[cellId]=true;
				grido[cellId]=false;
				tieDetectorGrid[cellId]=true;
			}

		} else if (cell.unWritten) 
		{                              //Checks if cell can be written to.
			cell.innerHTML="o";
			cello.innerHTML="o";
			turn=true;                 //It is now X's turn.
			status("Turn : "+p1.value) && status2("Turn : "+p1.value);
			cell.unWritten=undefined;
			cello.unWritten=undefined;
			grido[cellId]=true;
			gridx[cellId]=false;
			tieDetectorGrid[cellId]=true;
		}
	}

	function checkWin (gridToCheck, who) 
	{	
		var gameOver = false;

		gameOver = checkCombo(0, 1, 2, who);
		if(!gameOver) gameOver = checkCombo(3, 4, 5, who);
		if(!gameOver) gameOver = checkCombo(6, 7, 8, who);
		if(!gameOver) gameOver = checkCombo(0, 3, 6, who);
		if(!gameOver) gameOver = checkCombo(1, 4, 7, who);
		if(!gameOver) gameOver = checkCombo(2, 5, 8, who);
		if(!gameOver) gameOver = checkCombo(0, 4, 8, who);
		if(!gameOver) gameOver = checkCombo(2, 4, 6, who);

		gameOver = checkCombo(11, 12, 13, who);
		if(!gameOver) gameOver = checkCombo(14, 15, 16, who);
		if(!gameOver) gameOver = checkCombo(17, 18, 19, who);
		if(!gameOver) gameOver = checkCombo(11, 14, 17, who);
		if(!gameOver) gameOver = checkCombo(12, 15, 18, who);
		if(!gameOver) gameOver = checkCombo(13, 16, 19, who);
		if(!gameOver) gameOver = checkCombo(11, 15, 19, who);
		if(!gameOver) gameOver = checkCombo(13, 15, 17, who);

		return gameOver;

		function checkCombo (cell1, cell2, cell3, who) {
			if(gridToCheck[cell1] === true && gridToCheck[cell2] === true && gridToCheck[cell3] === true) {
				
				status(who + " won!") && status2(who + " won!");
				writeAll(undefined);
				bold([cell1, cell2, cell3]);
				return true;
			}
		};
	};

	function checkTie () 
	{
		if(tieDetectorGrid[0] === true && tieDetectorGrid[1] === true && tieDetectorGrid[2] === true && tieDetectorGrid[3] === true && tieDetectorGrid[4] === true && tieDetectorGrid[5] === true && tieDetectorGrid[6] === true && tieDetectorGrid[7] === true && tieDetectorGrid[8] === true) { //Checks if board is full

			status("Draw") && status2("Draw");
			writeAll(undefined);
		}
		if(tieDetectorGrid[11] === true && tieDetectorGrid[12] === true && tieDetectorGrid[13] === true && tieDetectorGrid[14] === true && tieDetectorGrid[15] === true && tieDetectorGrid[16] === true && tieDetectorGrid[17] === true && tieDetectorGrid[18] === true && tieDetectorGrid[19] === true) { //Checks if board is full

			status("Draw") && status2("Draw");
			writeAll(undefined);
		}
	};

	function writeAll (bool) 
	{
		for(var i = 0; i<9; i++) {

			document.getElementById(i.toString()).unWritten=bool;
		}
		for(var i = 11; i<20; i++) {

			document.getElementById(i.toString()).unWritten=bool;
		}
	};
	function bold (toBold) 
	{
		for(var i = 0; i<3; i++) {

			document.getElementById(toBold[i].toString()).classList.add("bold");
		}
		for(var i = 11; i<14; i++) {

			document.getElementById(toBold[i].toString()).classList.add("bold");
		}
	};
	document.getElementById("reset").onclick  = function () 
	{
		writeAll(true);
		status("Turn : "+p1.value);
		turn=true;
		gridx=[false, false, false, false, false, false, false, false, false];
		grido=[false, false, false, false, false, false, false, false, false];
		tieDetectorGrid=[false, false, false, false, false, false, false, false, false];
		for(var i = 0; i<9; i++) 
		{

			document.getElementById(i.toString()).classList.remove("bold");
		}
		for(var i = 11; i<20; i++) 
		{

			document.getElementById(i.toString()).classList.remove("bold");
		}
		for(var i = 0; i<9; i++) 
		{

			document.getElementById(i.toString()).innerHTML="-";
		}
		for(var i = 11; i<20; i++) 
		{

			document.getElementById(i.toString()).innerHTML="-";
		}
	};
	document.getElementById("reset2").onclick  = function () 
	{
		writeAll(true);
		status("Turn : "+p1.value);
		turn=true;
		gridx=[false, false, false, false, false, false, false, false, false];
		grido=[false, false, false, false, false, false, false, false, false];
		tieDetectorGrid=[false, false, false, false, false, false, false, false, false];
		for(var i = 0; i<9; i++) 
		{

			document.getElementById(i.toString()).classList.remove("bold");
		}
		for(var i = 11; i<20; i++) 
		{

			document.getElementById(i.toString()).classList.remove("bold");
		}
		for(var i = 0; i<9; i++) 
		{

			document.getElementById(i.toString()).innerHTML="-";
		}
		for(var i = 11; i<20; i++) 
		{

			document.getElementById(i.toString()).innerHTML="-";
		}
	};
};