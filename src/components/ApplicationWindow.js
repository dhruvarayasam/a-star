import React from 'react'
import '../styles/application-window.css'
// read in data from config file
var nodeSelectionStatus = {start:undefined, end:undefined}
export default function AppWindow() {
    function Options () {
        function start() { //allows user to select coords for start node
            nodeSelectionStatus.start = true;
            nodeSelectionStatus.end = false;
        }
        function end() { //allows user to select coords for end node
            nodeSelectionStatus.end = true;
            nodeSelectionStatus.start = false; 
        }
        function reloadGrid() { //clears coords for start and end nodes
            return (
                <div></div>
            )
        }
        function renderPathSet() {

            return (
                <div></div>
            )
        }
        return (
            <div id="options">
                <button onClick={start}>Start node selection</button>
                <button onClick={end}>End node selection</button>
                <button onClick={reloadGrid}>Reload Grid</button>
                <button onClick={renderPathSet}>Render Path</button>
            </div>
        )
    }

    function CoordGrid() { //use state to either render initial coord grid for start/end nodes or PathSet visualization
        return (
            <div></div>
        )
    }
    return (
        <div id='mainWin'>
            <Options/>
            <CoordGrid/>
            <div id='space'></div>
        </div>
    )
}


