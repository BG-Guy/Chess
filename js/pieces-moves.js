function getAllPossibleQueen(pieceCoord) {
    var res = []

    res.push(getAllPossibleCoordsBishop(pieceCoord))

    res.push(getAllPossibleCoordsRook(pieceCoord))

    return res
}

function getAllPossibleKing(pieceCoord) {
    var res = [];
    

    //Step up
    res.push({i: pieceCoord.i - 1, j: pieceCoord.j})
    
    //Step left and up
    res.push({i: pieceCoord.i - 1, j: pieceCoord.j - 1})

    //Step right and up
    res.push({i: pieceCoord.i - 1, j: pieceCoord.j + 1})

    //Step down
    res.push({i: pieceCoord.i + 1, j: pieceCoord.j})

    //Step down and right
    res.push({i: pieceCoord.i + 1, j: pieceCoord.j + 1})

    //Step down and left
    res.push({i: pieceCoord.i + 1, j: pieceCoord.j - 1})

    return res

}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];
    var nextCoord;
// Knight moves step right two steps up 
    nextCoord = {i: pieceCoord.i - 2, j: pieceCoord.j + 1}
    res.push(nextCoord)

// Knight moves step right two steps down
    nextCoord = {i: pieceCoord.i - 2, j: pieceCoord.j - 1}
    res.push(nextCoord)

// Knight moves step left two steps up
    nextCoord = {i: pieceCoord.i + 2, j: pieceCoord.j - 1}
    res.push(nextCoord)

// Knight moves step left two steps down
    nextCoord = {i: pieceCoord.i + 2, j: pieceCoord.j + 1}
    res.push(nextCoord)

//Knight moves two step right one step up

    nextCoord = {i: pieceCoord.i - 1, j: pieceCoord.j + 2}
    res.push(nextCoord)

//Knight moves two step right one step down
    nextCoord = {i: pieceCoord.i + 1, j: pieceCoord.j + 2}
    res.push(nextCoord)

//Knight moves two step left one step down
    nextCoord = {i: pieceCoord.i - 1, j: pieceCoord.j - 2}
    res.push(nextCoord)

//Knight moves two steps left one step up
    nextCoord = {i: pieceCoord.i + 1, j: pieceCoord.j - 2}
    res.push(nextCoord)

    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    
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

function getAllPossibleCoordsRook(currCell) {
    var res = [];
    // Move rook up
    getPossibleCoords(1)

    //Move rook down
    

    //Move rook right
    
    //Move rook left
    
    return res;
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = (isWhite) ? - 1 : 1;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
    else return res;

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        diff *= 2;
        nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        if (isEmptyCell(nextCoord)) res.push(nextCoord);
    }
    return res;
}
