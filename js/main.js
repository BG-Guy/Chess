'use strict'

// Pieces Types
const KING_WHITE = '♔';
const QUEEN_WHITE = '♕';
const ROOK_WHITE = '♖';
const BISHOP_WHITE = '♗';
const KNIGHT_WHITE = '♘';
const PAWN_WHITE = '♙';
const KING_BLACK = '♚';
const QUEEN_BLACK = '♛';
const ROOK_BLACK = '♜';
const BISHOP_BLACK = '♝';
const KNIGHT_BLACK = '♞';
const PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gCells
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard, gCells);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var cell = {
                isEmpty: true,
                piece: '',
                isMarked: false,
                i: i,
                j: j,

            }
            board[i][j] = cell

            if (i === 1) {
                cell.piece = PAWN_BLACK;
                cell.isEmpty = false
            }

            if (i === 6) {
                cell.piece = PAWN_WHITE;
                cell.isEmpty = false
            }
        }
    }

    board[0][0].piece = board[0][7].piece = ROOK_BLACK;
    board[0][1].piece = board[0][6].piece = KNIGHT_BLACK;
    board[0][2].piece = board[0][5].piece = BISHOP_BLACK;
    board[0][3].piece = QUEEN_BLACK;
    board[0][4].piece = KING_BLACK;

    board[7][0].piece = board[7][7].piece = ROOK_WHITE;
    board[7][1].piece = board[7][6].piece = KNIGHT_WHITE;
    board[7][2].piece = board[7][5].piece = BISHOP_WHITE;
    board[7][3].piece = QUEEN_WHITE;
    board[7][4].piece = KING_WHITE;
    console.table(board);
    return board;

}



function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var currCell = board[i][j]
            // figure class name
            var className = ((i + j) % 2 === 0) ? 'white' : 'black';
            var tdId = `cell-${i}-${j}`;

            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(${currCell, this})">
                            ${currCell.piece}
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(currCell, elCell) {
    markCells(currCell)
    // if the target is marked - move the piece!
    if (currCell.isMarked) {
        movePiece(currCell);
        cleanBoard();
        return;
    }

    else {
        markPossibleMoves(currCell)
    }

    cleanBoard();

    currCell.classList.add('selected');
    gSelectedElCell = currCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(currCell.id);

    markCells(possibleCoords);
}

function movePiece(currCell) {

    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);

    // update the MODEL
    var piece = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;
    // update the DOM
    elFromCell.innerText = '';
    elToCell.innerText = currCell.piece0;

}

function markCells(currCell) {
    if (currCell.piece = )
    if (currCell.piece = )
    if (currCell.piece = )
    if (currCell.piece = )
    if (currCell.piece = )
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    console.log(coord);
    return coord;
}

function cleanBoard() {
    gBoard.forEach((row) => {
        row.forEach((cell) => {
            cell.isMarked = false

        })
    })

}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}


function markPossibleMoves(currCell) {
    var possibleCoords = [];
    switch (currCell.piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(currCell);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(currCell);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(currCell);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(currCell);
            break;

    }

}

