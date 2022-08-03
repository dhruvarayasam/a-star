import React, {useState} from 'react'
import '../styles/application-window.css'
import calculatePath from '../algorithm'
// read in data from config file
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};
var counterRecord = {};
var colorRecord = {};
let nums = range(1150)
var grid = nums.map((numbers) => {
    counterRecord[numbers] = 0;
    colorRecord[numbers] = 'white';
    return (<div id={numbers} className="gridCoords" key={numbers} style={{backgroundColor:'white'}}></div>)
}
)

export default function AppWindow() {
    //start/end node selection, obstacle selection 
    
    var [mode, setMode] = useState(undefined)
    grid.onClick = setStartEndObstacle()
    

    function loadGrid() { //clears coords for start and end nodes
        for (let i=0; i<grid.length; i++) {
            counterRecord[i] = 0;
            colorRecord[i] = 'white'
            document.getElementById(i).style.backgroundColor='white'
        }
    }



    function setStartEndObstacle() {

        window.onclick = e => {
            // console.log(e.target);  // to get the element
            if (e.target.className === 'gridCoords') {
                if (Number(counterRecord[e.target.id])) { //handles # of clicks for each grid element
                    counterRecord[e.target.id]++;
                } else {
                    counterRecord[e.target.id] = 1;
                }

                if (mode === 's') {
                    console.log(mode)
                    if (counterRecord[e.target.id] % 2 === 0) { //handles color of grid element based on # of clicks and state
                        document.getElementById(e.target.id).style.backgroundColor='white'
                        colorRecord[e.target.id] = 'white'

                    } else {
                        if (!(Object.values(colorRecord).includes("green"))) {
                            document.getElementById(e.target.id).style.backgroundColor='green';
                            colorRecord[e.target.id] = 'green'
    
                        }
                    }

                } else if (mode === 'e') {
                    console.log(mode)
                    if (counterRecord[e.target.id] % 2 === 0) { //handles color of grid element based on # of clicks
                        document.getElementById(e.target.id).style.backgroundColor='white'
                        colorRecord[e.target.id] = 'white';

                    } else {
                        if (!(Object.values(colorRecord).includes("red"))) {
                            document.getElementById(e.target.id).style.backgroundColor='red';
                            colorRecord[e.target.id] = 'red'
    
                        }
                    }

                } else if (mode === 'o') {
                    console.log(mode)
                    if (counterRecord[e.target.id] % 2 === 0) { //handles color of grid element based on # of clicks
                        document.getElementById(e.target.id).style.backgroundColor='white'
                        colorRecord[e.target.id] = 'white'

                    } else {
                        document.getElementById(e.target.id).style.backgroundColor='purple';
                        colorRecord[e.target.id] = 'purple'

                    }
                }
            }
        }
    }

    function renderPathSet() { 
        //iterate through returned object from algorithm.js and change color of each node according to corresponding id's
        //render these changes by directly modifying the DOM 
        //"lock" nodes so nothing can change their color or click counts until reset grid is clicked
        console.log(calculatePath(colorRecord))
        // const renderedPath= calculatePath(colorRecord)
        // for (let i=0; i<renderedPath.length; i++) {
        //     colorRecord[renderedPath[i][0]] = renderedPath[i][1]
        //     document.getElementById(i).style.backgroundColor=renderedPath[i][1]
        // }


    }

    return (
        <div id='mainWin'>
            <div id="options">
                <div></div>
                <button onClick={() => setMode('s')}>Select Start Node</button>
                <button onClick = {() => setMode('e')}>Select End Node</button>
                <button onClick = {() => setMode('o')}>Obstacle Selection</button>
                <button onClick={loadGrid}>Reload Grid</button>
                <button onClick={renderPathSet}>Render Path</button>
            </div>
            <p>Click the 'select start node' button to choose your start location.<br></br>Click the 'select end node' button to choose your end location.<br></br>If you need to clear the grid for any reason, click the 'reload grid' button.<br></br>If you are ready to render a path between your start/end points, click 'render path'.</p>

            <div id="coordGrid">
                {grid}
            </div>
        </div>
    )
}