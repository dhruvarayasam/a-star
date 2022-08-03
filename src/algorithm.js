//rules: algorithm cannot move diagonally 
//will be imported into ApplicationWindow.js, so make all functions helper functions for one main function that will be used to calculate path
//colorRecord will be one of the args, so no need to import
//this main function returns object that records color of each cell corresponding to cell ID as it calculates, making pathfinding seem realistic
//in order to line up coloring of each cell with pathfinding process directly modify DOM and update in colorRecord to 
//use for loop, using calculated array as iterator and change each cell's color using index of calculated array that corresponds w/ index of colorRecord




export default function calculatePath(colorRecord) { //takes in surrounding nodes, their FGH values and decides which node to move to, adds to open/closed list etc
    //use colorRecord to get start and end node
    //returns 2D array w/ ID's and corresponding color as it works through algo EX: [[2, 'yellow'], [3,'white'], [2, 'blue]]

    var openArray = [];
    var closedArray = [];
    var startID = getKeysByValue(colorRecord, 'green');
    var endID = getKeysByValue(colorRecord, 'red');

    //if pathCheck is true, continue w/ rest of program
    return pathCheck(startID, endID, colorRecord)
    
}



function grabSurroundingNodes (id) {
    const left = id-1;
    const right = id+1;
    const up = id-50;
    const down = id+50;
    return [left, right, up, down]
}

function pathCheck (startID, endID, colorRecord) { //checks if path is possible
    let obstacles = getKeysByValue(colorRecord, 'purple')
    let closedArray = [] //set of ID's that are not obstacles and only valid cells that algo can traverse from start node
    let openArray = []
    let counter = 0;
    var temp_arr = [];
    closedArray.push(startID)

    //option 1
    while (!closedArray.includes(endID)) { //cannot use negative integers to reverse index an array
        counter++
        openArray = grabSurroundingNodes(closedArray[closedArray.length-1]) // only grabs most recent addition to closed list, despite the possibility of other valid candidates
        openArray.forEach(element => {
            if (checkIfValidId(element, colorRecord, closedArray)) { // drawback is it wont consider all options to add to closed list, only the most recent 
                closedArray.push(element)
                document.getElementById(element).style.backgroundColor='orange'
            }
        })
        if (counter > 10000) {
            return [counter, false]
        }
    }

    //option 2 --> iterate through each cell and add each valid one to open array, then dry to draw a valid path from start to end using FGH values
    document.getElementById(endID).style.backgroundColor='red'
    return true
}

function computeFGH(startCell, endCell) { //computes F cost, g cost, h cost of any node given to it

}

function checkIfValidId(cellID, colorRecord, closedArray) { 
    if (cellID >= 0 && cellID <= 1149 && (colorRecord[cellID] === 'green' || colorRecord[cellID] === 'red' || colorRecord[cellID] === 'white') && (!closedArray.includes(cellID))) {
        return true
    } else {
        return false
    }
}


function getKeysByValue(object, value) { //gets keys with same value (color), returns array if it isnt a start/end node
    let arr = []
    if (value !== 'green' && value !== 'red') {
        for (let i=0; i<Object.keys(object).length; i++) {
            if (object[i] === value) {
                arr.push(i)
            }
        }
        return arr
    } else {
        for (let i=0; i<Object.keys(object).length; i++) {
            if (object[i] === value) {
                return i
            }
        }
    }
}

//if path is possible, add coords surrounding start coord to openArray | if not log error, ask user to choose different obstacles

