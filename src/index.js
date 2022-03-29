import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationWindow from './components/ApplicationWindow'
import '../src/styles/index.css'
//Render all components here in their respective divs

ReactDOM.render(<ApplicationWindow/>, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
