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
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var cell = {
                isEmpty: true,
                piece: '',
                isWhite: null,
            }
            board[i][j] = cell

            if (i === 1) {
                cell.piece = PAWN_BLACK;
                cell.isEmpty = false
                cell.isWhite = false
            }

            if (i === 6) {
                cell.piece = PAWN_WHITE;
                cell.isEmpty = false
                cell.isWhite = true
            }
        }
    }
    
    board[0][0] = board[0][7] = {isEmpty: false, piece: ROOK_BLACK, isWhite: false}  
    board[0][1] = board[0][6] = {isEmpty: false, piece: KNIGHT_BLACK, isWhite: false}
    board[0][2] = board[0][5] = {isEmpty: false, piece: BISHOP_BLACK, isWhite: false}
    board[0][3] = {isEmpty: false, piece: QUEEN_BLACK, isWhite: false}
    board[0][4] = {isEmpty: false, piece: KING_BLACK, isWhite: false}

    board[7][0] = board[7][7] = {isEmpty: false, piece: ROOK_WHITE, isWhite: true}
    board[7][1] = board[7][6] = {isEmpty: false, piece: KNIGHT_WHITE, isWhite: true}
    board[7][2] = board[7][5] = {isEmpty: false, piece: BISHOP_WHITE, isWhite: true}
    board[7][3] = {isEmpty: false, piece: QUEEN_WHITE, isWhite: true}
    board[7][4] = {isEmpty: false, piece: KING_WHITE, isWhite: true}

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

            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
                            ${currCell.piece}
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {
    var currCell = getCellCoord(elCell.id)
    gBoard[currCell.i][currCell.j]
    console.log("🚀 ~ file: main.js ~ line 96 ~ cellClicked ~ gBoard[currCell.i][currCell.j]", gBoard[currCell.i][currCell.j])
    // if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }

    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j].piece;

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord, piece === ROOK_WHITE);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord, piece === BISHOP_WHITE);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord, piece === KNIGHT_WHITE);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;

    }
    console.log(possibleCoords);
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {

    let fromCoord = getCellCoord(elFromCell.id);
    let toCoord = getCellCoord(elToCell.id);
    let fromCell = gBoard[fromCoord.i][fromCoord.j]
    let toCell = gBoard[toCoord.i][toCoord.j]
    // update the MODEL
    let piece = fromCell.piece;
    let pieceColor = fromCell.isWhite
    toCell.piece = piece;
    gBoard[fromCoord.i][fromCoord.j] = {isEmpty: true, piece: '', isWhite: null}
    gBoard[toCoord.i][toCoord.j] = {isEmpty: false, piece: piece, isWhite: pieceColor}    
    // update the DOM
    elFromCell.innerText = ''
    elToCell.innerText = toCell.piece
    
}

function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
        elCell.classList.add('mark')
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(nextCoord, pieceCoord) {
    var playerPiece = gBoard[pieceCoord.i][pieceCoord.j]
    var possibleCell = gBoard[nextCoord.i][nextCoord.j]
    if (possibleCell.isWhite === null || possibleCell.isWhite != playerPiece.isWhite) {
        return true
    }
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = (isWhite) ? - 1 : 1;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord);
    else return res;

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        diff *= 2;
        nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord);
    }
    return res;
}


// finished
function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    var nextCoord
    // Move rook up
    nextCoord = {i: pieceCoord.i + 1, j: pieceCoord.j}
    for (let i = nextCoord.i; i < 8; i++) {
        nextCoord = {i: i, j: pieceCoord.j}
        console.log("🚀 ~ file: main.js ~ line 212 ~ getAllPossibleCoordsRook ~ nextCoord", nextCoord)
        if (!isEmptyCell(nextCoord, pieceCoord)) break;
        res.push(nextCoord);
        
    }



    //Move rook down
    nextCoord = {i: pieceCoord.i - 1, j: pieceCoord.j}
    for (let i = nextCoord.i; i >= 0; i--) {
            nextCoord = {i: i, j: pieceCoord.j}
            console.log("🚀 ~ file: main.js ~ line 212 ~ getAllPossibleCoordsRook ~ nextCoord", nextCoord)

            if (!isEmptyCell(nextCoord, pieceCoord)) break;
            res.push(nextCoord);

        }

    

    //Move rook right
    nextCoord = {i: pieceCoord.i, j: pieceCoord.j + 1}
    for (let j = nextCoord.j; j < 8; j++) {
            nextCoord = {i: pieceCoord.i, j: j}
            console.log("🚀 ~ file: main.js ~ line 212 ~ getAllPossibleCoordsRook ~ nextCoord", nextCoord)

            if (!isEmptyCell(nextCoord, pieceCoord)) break;
            res.push(nextCoord);

        }
    

    //Move rook left
    nextCoord = {i: pieceCoord.i , j: pieceCoord.j - 1}
    for (let j = nextCoord.j; j >= 0 ; j--) {
            nextCoord = {i: pieceCoord.i, j: j}
            console.log("🚀 ~ file: main.js ~ line 212 ~ getAllPossibleCoordsRook ~ nextCoord", nextCoord)

            if (!isEmptyCell(nextCoord, pieceCoord)) break;
            res.push(nextCoord);

        
    

        }
        console.log("🚀 ~ file: main.js ~ line 262 ~ getAllPossibleCoordsRook ~ res", res)
        return res;
}


//Finished
function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var diff = 1
    // White turn right and forward
    for (var idx = pieceCoord.j + 1; idx < 8; idx++) {
        var coord = { i: pieceCoord.i - 1, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    //White turn left and up
    for (var idx = pieceCoord.j + 1; idx >= 0; idx--) {
        var coord = { i: pieceCoord.i - 1, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    // Move right and down
    for (var idx = pieceCoord.j - 1; idx >= 0 && idx < 8; idx--) {
        var coord = { i: pieceCoord.i + 1, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    
    // Move left and down
    for (var idx = pieceCoord.j - 1; idx >= 0 && idx < 8; idx--) {
        var coord = { i: pieceCoord.i + 1, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
   
    }

    return res;
}

// Finished
function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];
    var nextCoord;
// Knight moves step right two steps up 
    nextCoord = {i: pieceCoord.i - 2, j: pieceCoord.j + 1}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >= 0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

// Knight moves step right two steps down
    nextCoord = {i: pieceCoord.i - 2, j: pieceCoord.j - 1}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >= 0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

// Knight moves step left two steps up
    nextCoord = {i: pieceCoord.i + 2, j: pieceCoord.j - 1}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >=0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

// Knight moves step left two steps down
    nextCoord = {i: pieceCoord.i + 2, j: pieceCoord.j + 1}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >= 0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

//Knight moves two step right one step up

    nextCoord = {i: pieceCoord.i - 1, j: pieceCoord.j + 2}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >= 0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

//Knight moves two step right one step down
    nextCoord = {i: pieceCoord.i + 1, j: pieceCoord.j + 2}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >= 0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

//Knight moves two step left one step down
    nextCoord = {i: pieceCoord.i - 1, j: pieceCoord.j - 2}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >= 0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

//Knight moves two steps left one step up
    nextCoord = {i: pieceCoord.i + 1, j: pieceCoord.j - 2}
    if (nextCoord.i < 8 && nextCoord.i >= 0 && nextCoord.j < 8 && nextCoord.j >= 0) {
                if (isEmptyCell(nextCoord, pieceCoord)) res.push(nextCoord)

    }

    return res;
}

function getAllPossibleKing(pieceCoord) {
    var res = [];
    

    //Move up
    res.push({i: pieceCoord.i - 1, j: pieceCoord.j})
    
    //Move left and up
    res.push({i: pieceCoord.i - 1, j: pieceCoord.j - 1})

    //Move right and up
    res.push({i: pieceCoord.i - 1, j: pieceCoord.j + 1})

    //Move down
    res.push({i: pieceCoord.i + 1, j: pieceCoord.j})

    //Move down and right
    res.push({i: pieceCoord.i + 1, j: pieceCoord.j + 1})

    //Move down and left
    res.push({i: pieceCoord.i + 1, j: pieceCoord.j - 1})

    return res

}

function getAllPossibleQueen(pieceCoord) {
    var res = []

    res.push(getAllPossibleCoordsBishop(pieceCoord))

    res.push(getAllPossibleCoordsRook(pieceCoord))

    return res
}
