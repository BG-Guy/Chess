"use strict";

// Pieces Types
const KING_WHITE = "♔";
const QUEEN_WHITE = "♕";
const ROOK_WHITE = "♖";
const BISHOP_WHITE = "♗";
const KNIGHT_WHITE = "♘";
const PAWN_WHITE = "♙";
const KING_BLACK = "♚";
const QUEEN_BLACK = "♛";
const ROOK_BLACK = "♜";
const BISHOP_BLACK = "♝";
const KNIGHT_BLACK = "♞";
const PAWN_BLACK = "♟";

// The Chess Board
var gBoard;
var gSelectedElCell = null;
var gWhiteTurn = true;
var gEatenPiecesBlack = []
var gEatenPiecesWhite = []

function restartGame() {
  gBoard = buildBoard();
  renderBoard(gBoard);
  setGame()
  
}

function setGame() {
    clearInterval(gIntervalBlack);
    clearInterval(gIntervalWhite);
    setTime(gMinutes);
    elGameOverModal.hidden = true
    gEatenPiecesBlack = []
    gEatenPiecesWhite = []
    renderEatenPieces()
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
      var cell = {
        isEmpty: true,
        piece: "",
        isWhite: null,
      };
      board[i][j] = cell;

      if (i === 1) {
        cell.piece = PAWN_BLACK;
        cell.isEmpty = false;
        cell.isWhite = false;
      }

      if (i === 6) {
        cell.piece = PAWN_WHITE;
        cell.isEmpty = false;
        cell.isWhite = true;
      }
    }
  }

  board[0][0] = board[0][7] = {
    isEmpty: false,
    piece: ROOK_BLACK,
    isWhite: false,
  };
  board[0][1] = board[0][6] = {
    isEmpty: false,
    piece: KNIGHT_BLACK,
    isWhite: false,
  };
  board[0][2] = board[0][5] = {
    isEmpty: false,
    piece: BISHOP_BLACK,
    isWhite: false,
  };
  board[0][3] = { isEmpty: false, piece: QUEEN_BLACK, isWhite: false };
  board[0][4] = { isEmpty: false, piece: KING_BLACK, isWhite: false };

  board[7][0] = board[7][7] = {
    isEmpty: false,
    piece: ROOK_WHITE,
    isWhite: true,
  };
  board[7][1] = board[7][6] = {
    isEmpty: false,
    piece: KNIGHT_WHITE,
    isWhite: true,
  };
  board[7][2] = board[7][5] = {
    isEmpty: false,
    piece: BISHOP_WHITE,
    isWhite: true,
  };
  board[7][3] = { isEmpty: false, piece: QUEEN_WHITE, isWhite: true };
  board[7][4] = { isEmpty: false, piece: KING_WHITE, isWhite: true };

  console.table(board);
  return board;
}

function renderBoard(board) {
  var strHtml = "";
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    strHtml += "<tr>";
    for (var j = 0; j < row.length; j++) {
      var currCell = board[i][j];
      // figure class name
      var className = (i + j) % 2 === 0 ? "white" : "black";
      var tdId = `cell-${i}-${j}`;

      strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
                            ${currCell.piece}
                        </td>`;
    }
    strHtml += "</tr>";
  }
  var elMat = document.querySelector(".game-board");
  elMat.innerHTML = strHtml;
}

function cellClicked(elCell) {
  if (!gTimeWhite || !gTimeBlack) return;

  var currCell = getCellCoord(elCell.id);
  gBoard[currCell.i][currCell.j];

  console.log(
    "🚀 ~ file: main.js ~ line 96 ~ cellClicked ~ gBoard[currCell.i][currCell.j]",
    gBoard[currCell.i][currCell.j]
  );
  // if the target is marked - move the piece!
  if (
    elCell.classList.contains("mark") ||
    elCell.classList.contains("can-eat")
  ) {
    movePiece(gSelectedElCell, elCell);
    cleanBoard();
    return;
  }

  cleanBoard();
  if (!gWhiteTurn === gBoard[currCell.i][currCell.j].isWhite) return;
  elCell.classList.add("selected");
  gSelectedElCell = elCell;

  // console.log('elCell.id: ', elCell.id);
  var cellCoord = getCellCoord(elCell.id);
  var piece = gBoard[cellCoord.i][cellCoord.j].piece;

  var possibleCoords = [];
  switch (piece) {
    case ROOK_BLACK:
    case ROOK_WHITE:
      possibleCoords = getAllPossibleCoordsRook(
        cellCoord,
        piece === ROOK_WHITE
      );
      break;
    case BISHOP_BLACK:
    case BISHOP_WHITE:
      possibleCoords = getAllPossibleCoordsBishop(
        cellCoord,
        piece === BISHOP_WHITE
      );
      break;
    case KNIGHT_BLACK:
    case KNIGHT_WHITE:
      possibleCoords = getAllPossibleCoordsKnight(
        cellCoord,
        piece === KNIGHT_WHITE
      );
      break;
    case PAWN_BLACK:
    case PAWN_WHITE:
      possibleCoords = getAllPossibleCoordsPawn(
        cellCoord,
        piece === PAWN_WHITE
      );
      break;
    case QUEEN_BLACK:
    case QUEEN_WHITE:
      possibleCoords = getAllPossibleQueen(cellCoord, piece === QUEEN_WHITE);
      break;
    case KING_BLACK:
    case KING_WHITE:
      possibleCoords = getAllPossibleKing(cellCoord, piece === KNIGHT_WHITE);
  }
  console.log(possibleCoords);
  markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
  timeStart(gWhiteTurn);
  let fromCoord = getCellCoord(elFromCell.id);
  let toCoord = getCellCoord(elToCell.id);
  let fromCell = gBoard[fromCoord.i][fromCoord.j];
  let toCell = gBoard[toCoord.i][toCoord.j];
  if (toCell.piece !== "") addEatenPiece(toCell)

  // update the MODEL
  let piece = fromCell.piece;
  let pieceColor = fromCell.isWhite;
  toCell.piece = piece;
  gBoard[fromCoord.i][fromCoord.j] = {
    isEmpty: true,
    piece: "",
    isWhite: null,
  };
  gBoard[toCoord.i][toCoord.j] = {
    isEmpty: false,
    piece: piece,
    isWhite: pieceColor,
  };

  // update the DOM
  elFromCell.innerText = "";
  elToCell.innerText = toCell.piece;
  gWhiteTurn = !gWhiteTurn;
}

function markCells(coords) {
  for (var i = 0; i < coords.length; i++) {
    var coord = coords[i];
    var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
    elCell.classList.add("mark");
  }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
  var parts = strCellId.split("-");
  var coord = { i: +parts[1], j: +parts[2] };
  return coord;
}

function cleanBoard() {
  var elTds = document.querySelectorAll(".mark, .selected, .can-eat");
  for (var i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove("mark", "selected", "can-eat");
  }
}

function getSelector(coord) {
  return "#cell-" + coord.i + "-" + coord.j;
}

function isEmptyCell(nextCoord, pieceCoord) {
  if (nextCoord.j > 7 || nextCoord.j < 0 || nextCoord.i < 0 || nextCoord.i > 7)
    return;

  var playerPiece = gBoard[pieceCoord.i][pieceCoord.j];
  var possibleCell = gBoard[nextCoord.i][nextCoord.j];
  var elCurrCell = document.querySelector(getSelector(nextCoord));
  console.log(
    "🚀 ~ file: main.js ~ line 183 ~ isEmptyCell ~ playerPiece",
    playerPiece
  );

  console.log(
    "🚀 ~ file: main.js ~ line 184 ~ isEmptyCell ~ possibleCell",
    possibleCell
  );
  if (possibleCell.isWhite == !playerPiece.isWhite)
    elCurrCell.classList.add("can-eat");
  return possibleCell.isWhite === null;
}

function addEatenPiece(cell) {
    if (cell.piece === KING_BLACK) onGameOver('WHITE WINS!')
    if (cell.piece === KING_WHITE) onGameOver('BLACK WINS!')
    if (cell.isWhite) gEatenPiecesWhite.push(cell.piece)
    else gEatenPiecesBlack.push(cell.piece)
    renderEatenPieces()
}

function renderEatenPieces() {
    elEatenPiecesBlack.innerHTML = gEatenPiecesBlack
    elEatenPiecesWhite.innerHTML = gEatenPiecesWhite
}

function isGameOver() {
  if (gTimeWhite === 0) onGameOver("BLACK WINS!");
  if (gTimeBlack === 0) onGameOver("WHITE WINS!");
}

function onGameOver(msg) {
  elWinnerMsg.innerHTML = msg;
  elGameOverModal.hidden = false
  clearInterval(gIntervalWhite);
  clearInterval(gIntervalBlack);
}
