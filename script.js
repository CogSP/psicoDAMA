/* GAME STATE DATA: declaration of the board, with all the pieces and their
html's ids */

const board = [ /*64 item array*/
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]


//why am I using a variable?
let findPiece = function(pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
}


// references to the web html page (DOM references)
const cells = document.querySelectorAll("td"); /* list of all the "td"s in the  html file*/
let redsPieces = document.querySelectorAll(".red-piece"); /* does it work? */
let blacksPieces = document.querySelectorAll(".black-piece"); /* does it work? */
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider")


/* players properties: game state */
let turn = true;  /* true = red, false = black*/ 
let redScore = 12; // how many pieces the red player currently has
let blackScore = 12;
let playerPieces;  // if its red's turn playerPieces = redsPieces, otherwise 
//playerPieces = blacksPieces


let selectedPiece = {
    // default values when no piece is selected
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,

    /* these are all the moves and whether they are possible or not */
    /*TODO: check if it's really that*/ 
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    // +7/+9 for reds, -7/-9 for blacks
    // we didnt' create two variables because when a piece become kin	g, regardless
    // of its color, it can move in all the four positions 
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false,
}


    /* EVENT LISTENER */

// give to all the pieces an event listener. This event listener, when the 
//piece is clicked, will invoke the function "getPlayerPieces"
function givePiecesEventListeners() {

    console.log("we have " + cells.length + " cells\n");
    console.log("red has: " + redsPieces.length + " pieces, while black has: " + blacksPieces.length + " pieces\n");

    if (turn) {
        console.log("red's turn");
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        console.log("black's turn");
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }

    console.log("we gave all the pieces the click event listener\n");
}

    /* END OF EVENT LISTENER CONFIGURATION */


/* here starts the functions chain for when we click a piece: */

function getPlayerPieces() {
    //reds turn
    if (turn) {
        console.log("a red piece has been clicked");
        playerPieces = redsPieces;
    } else {
        console.log("a black piece has been clicked");
        playerPieces = blacksPieces;
    }

    removeCellonclick();
    resetBorders();
}

// we remove the "onclick" attribute from all the cells
// after, in the functions chain, we are going to re-calculate which cells should have this attribute
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// resetting the borders color to the initial value, so we can later just color the one that is selected

// TODO: WHY WOULD WE ITERATE OVER ALL THE PIECES WHEN WE CAN JUST
// RESET THE PIECES THAT WAS SELECTED BEFORE??? 
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece(); //here we start operating on the current selected piece
}

function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.indexOfBoardPiece = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}


// usint findPiece(), this will get us the board's index where the
//selected piece is located
function getSelectedPiece() {
    // the tutorial used "event.target.id" but event is now depreecated 
    // TODO: replace it
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    
    console.log("the clicked piece is " + selectedPiece.pieceId + 
        " and it is in position: " + selectedPiece.indexOfBoardPiece + "\n");
    
    isPieceKing();
}



function isPieceKing() {

    //element.classList give us the list of classes to which our element belongs
    console.log("sto per controllare se l'elemento è king. L'elemento ha id = " + selectedPiece.pieceId);
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }

    getAvailableSpaces();
}

function getAvailableSpaces() {
    //we are using the string equality operator
    if (board[selectedPiece.indexOfBoardPiece + 7] === null /*the cell is available (id == null -> no piece here)*/ 
        && cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("white") !== true) { /*never go on white cells: this is 
        important because if the piece is on the edge, +7/+9 will get us on the opposite end of the board, so we use the fact that these cells are white to prevent jumping there*/
            selectedPiece.seventhSpace = true; // moving to upper-right is available
    }

    if (board[selectedPiece.indexOfBoardPiece + 9] === null &&
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("white") !== true) {
            selectedPiece.ninthSpace = true; 
    }

    // same for -7 and -9
    if (board[selectedPiece.indexOfBoardPiece - 7] === null &&
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("white") !== true) {
            selectedPiece.minusSeventhSpace = true; 
    }

    if (board[selectedPiece.indexOfBoardPiece - 9] === null &&
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("white") !== true) {
            selectedPiece.minusNinthSpace = true; 
    }

    checkAvailableJumpSpaces();
}


// IS THERE A WAY TO ELMINATE THIS IF-ELSE BRANCH, DOING JUST ONE CODE FOR BOTH THE TEAMS?
// THE PROBLEM IS THAT WE NEED TO DIFFERENTIATE BETWEEN ID >= 12 (BLACKS) AND < 12 (REDS)
function checkAvailableJumpSpaces() {
    
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("white") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) /*black pieces have id >= 12*/ {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("white") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null 
        && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("white") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null 
        && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("white") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("white") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("white") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] < 12 
        && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] < 12
        && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }

    checkPieceConditions();
}


// restrict the movements if the piece is not a king
function checkPieceConditions() {

    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        //reds turn, the piece is not a king: it can't move -7/-9, so we set this variables to false 
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else /*blacks turn: we do the inverse*/ {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;            
        }
        givePieceBorder();
    }

}

function givePieceBorder() {

    console.log("Properties of this piece:\n id: " + selectedPiece.pieceId + " indexBoard: " + selectedPiece.indexOfBoardPiece + " isKing: " + selectedPiece.isKing + " seventhSpace: " + selectedPiece.seventhSpace +
        " ninthSpace: " + selectedPiece.ninthSpace + " fourteenth: " + selectedPiece.fourteenthSpace + " eighteenthSpace: " + selectedPiece.eighteenthSpace + " minusSeventhSpace: " + selectedPiece.minusSeventhSpace + " minusNinthSpace: " + selectedPiece.minusNinthSpace
        + " minusFourteenthSpace: " + selectedPiece.minusFourteenthSpace + " minusEighteenthSpace: " + selectedPiece.minusEighteenthSpace + "\n")

    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
        || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
            document.getElementById(selectedPiece.pieceId).style.border = "3px solid green"; //it's selected
            giveCellsClick();
    } else {
        //this piece can't move
        return;
    }
}

function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }

    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }

    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }

}

/* end of the functions chain for when you click a cell*/


function makeMove(number) {

    //remove the piece from the front end because we are moving elsewhere
   
    document.getElementById(selectedPiece.pieceId).remove();

    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";


    // to save in javascript memory the new position of the piece
    if (turn) {
        if (selectedPiece.isKing) {                                     // these are two classes: red-piece and king
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll(".red-piece"); /* why am I recalculating this? */
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll(".red-piece");
        }
    } else {   
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece king" id="${selectedPiece.pieceId}"></p>`;   //WARNING: must use the "backtick" ` symbol
            blacksPieces = document.querySelectorAll(".black-piece"); 
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece" id="${selectedPiece.pieceId}"></p>`;
            blacksPieces = document.querySelectorAll(".black-piece");
        }
    }

    // we can't pass object properties directly into the arguments of the function (why?) so I need to save it
    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number == 14 || number == 18 || number == -14 || number == -18) /* the piece is eating someone else*/ {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2 /*position of the eaten piece*/);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}


// this will change the data stored in the back end
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) { //the piece reached the end: it become a king
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn == false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) { //same but for black
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (removePiece) /*someone got eaten*/ {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackScore--;
        }
        if (turn == false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            redScore--;
        }
    }

    resetSelectedPieceProperties();
    removeCellonclick();  //these first two are necessary for the next turn
    removeEventListeners();
}


function removeEventListeners() {

    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    
    checkForWin();
}

// it also changes the player
function checkForWin() {
    if (blackScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurnText[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
    } else if (redScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < blackTurnText.length; i++) {            
            blackTurnText[i].style.color = "black";
            redTurnText[i].style.display = "none";
            blackTurnText[i].textContent = "BLACK WINS!";
        }
    }
    changePlayer();
}

function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "lightGrey";
            blackTurnText[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < blackTurnText.length; i++) {
            blackTurnText[i].style.color = "lightGrey";
            redTurnText[i].style.color = "black";
        }
    }
    givePiecesEventListeners();
}


//starting point: the cycle begins once the page has loaded
console.log("start of the program\n");
givePiecesEventListeners();
