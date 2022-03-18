
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
        if (!isEmptyCell(nextCoord, pieceCoord)) break;
        res.push(nextCoord);
        
    }



    //Move rook down
    nextCoord = {i: pieceCoord.i - 1, j: pieceCoord.j}
    for (let i = nextCoord.i; i >= 0; i--) {
            nextCoord = {i: i, j: pieceCoord.j}

            if (!isEmptyCell(nextCoord, pieceCoord)) break;
            res.push(nextCoord);

        }

    

    //Move rook right
    nextCoord = {i: pieceCoord.i, j: pieceCoord.j + 1}
    for (let j = nextCoord.j; j < 8; j++) {
            nextCoord = {i: pieceCoord.i, j: j}

            if (!isEmptyCell(nextCoord, pieceCoord)) break;
            res.push(nextCoord);

        }
    

    //Move rook left
    nextCoord = {i: pieceCoord.i , j: pieceCoord.j - 1}
    for (let j = nextCoord.j; j >= 0 ; j--) {
            nextCoord = {i: pieceCoord.i, j: j}

            if (!isEmptyCell(nextCoord, pieceCoord)) break;
            res.push(nextCoord);

        
    

        }
        return res;
}


//Finished
function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var diff = 1
    var nextCoord = { i: pieceCoord.i, j: pieceCoord.j };

    // White turn right and forward
    nextCoord = { i: pieceCoord.i, j: pieceCoord.j };
    while (nextCoord.j < 8 && nextCoord.j >= 0 && nextCoord.i < 8 && nextCoord.i >= 0) {
        
        nextCoord = {i: nextCoord.i + diff, j: nextCoord.j + diff}
        console.log("🚀 ~ file: main.js ~ line 272 ~ getAllPossibleCoordsBishop ~ nextCoord", nextCoord)
        if (!isEmptyCell(nextCoord, pieceCoord)) break;
        res.push(nextCoord);
    }

    //White turn left and up
    nextCoord = { i: pieceCoord.i, j: pieceCoord.j };
    while (nextCoord.j < 8 && nextCoord.j >= 0 && nextCoord.i < 8 && nextCoord.i >= 0) {
        nextCoord = {i: nextCoord.i + -diff, j: nextCoord.j + diff}

        if (!isEmptyCell(nextCoord, pieceCoord)) break;
        res.push(nextCoord);
    }
    // Move right and down
    nextCoord = { i: pieceCoord.i, j: pieceCoord.j };
    while (nextCoord.j < 8 && nextCoord.j >= 0 && nextCoord.i < 8 && nextCoord.i >= 0) {
        nextCoord = {i: nextCoord.i + diff, j: nextCoord.j + -diff}

        if (!isEmptyCell(nextCoord, pieceCoord)) break;
        res.push(nextCoord);
    }
    
    // Move left and down
    nextCoord = { i: pieceCoord.i, j: pieceCoord.j };

    while (nextCoord.j < 8 && nextCoord.j > 0 && nextCoord.i < 8 && nextCoord.i >= 0) {
        nextCoord = {i: nextCoord.i + -diff, j: nextCoord.j + -diff}

        if (!isEmptyCell(nextCoord, pieceCoord)) break;
        res.push(nextCoord);
   
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

    if (isEmptyCell(({i: pieceCoord.i - 1, j: pieceCoord.j}), pieceCoord)) res.push({i: pieceCoord.i - 1, j: pieceCoord.j})
    
    //Move left and up
    if (isEmptyCell(({i: pieceCoord.i - 1, j: pieceCoord.j - 1}), pieceCoord)) res.push({i: pieceCoord.i - 1, j: pieceCoord.j - 1})

    //Move right and up
    if (isEmptyCell(({i: pieceCoord.i - 1, j: pieceCoord.j + 1}), pieceCoord)) res.push({i: pieceCoord.i - 1, j: pieceCoord.j + 1})

    //Move down
    if (isEmptyCell(({i: pieceCoord.i + 1, j: pieceCoord.j}), pieceCoord)) res.push({i: pieceCoord.i + 1, j: pieceCoord.j})

    //Move down and right
    if (isEmptyCell(({i: pieceCoord.i + 1, j: pieceCoord.j + 1}), pieceCoord)) res.push({i: pieceCoord.i + 1, j: pieceCoord.j + 1})

    //Move down and left
    if (isEmptyCell(({i: pieceCoord.i + 1, j: pieceCoord.j - 1}), pieceCoord)) res.push({i: pieceCoord.i + 1, j: pieceCoord.j - 1})
    if (isEmptyCell(({i: pieceCoord.i, j: pieceCoord.j + 1}), pieceCoord)) res.push({i: pieceCoord.i, j: pieceCoord.j + 1})
    if (isEmptyCell(({i: pieceCoord.i, j: pieceCoord.j - 1}), pieceCoord)) res.push({i: pieceCoord.i, j: pieceCoord.j - 1})

    return res

}

function getAllPossibleQueen(pieceCoord) {
    var res1
    var res2

    var res1 = (getAllPossibleCoordsBishop(pieceCoord))

    var res2 = (getAllPossibleCoordsRook(pieceCoord))
    

    return res1.concat(res2)
}
