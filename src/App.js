import React, {useState, useEffect} from "react";

import Display from './components/display/Display';
import Keypad from './components/keypad/Keypad';

import moon from './pic/moon.png';
import sun from './pic/sun.png';

import './App.css';

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [isDarkMode, setDarkMode] = useState(true);
  var [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)){
      if (key === "0"){
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    }

    else if (operators.includes(key)){
      if (!expression) return;

      const prevChar = expression.slice(-1);
      if (prevChar === '.') return;

      if (operators.includes(prevChar)){
        expression = expression.slice(0,-1);
      }
      setExpression(expression + key);
    }

    else if (key === '.'){
      if (!expression) return;
      const prevChar = expression.slice(-1);
      if (!numbers.includes(prevChar)) return;
      setExpression(expression + key);
    }
    else if (keyCode === 8){ //backspace
      if(!expression) return;
      calculateResult(expression.slice(0,-1));
      setExpression(expression.slice(0,-1));
    }
    else if (keyCode === 13){ //Enter
       if (!expression) return;
       calculateResult(expression);

       let currentHistory = [...history];
       if (currentHistory.length >= 10) currentHistory.splice(0,1);

       currentHistory.push(expression);
       setHistory(currentHistory);
    }

  }

  const calculateResult = (exp) => {
    if (!exp) return;
    const prevChar = exp.slice(-1);
    if(!numbers.includes(prevChar)) exp = exp.slice(0, -1);

    try{
      const answer = eval(exp).toFixed(2) + "";
      setResult(answer);
    }

    catch{
      setResult("ERR");
    }
    
  }
  return (
    <div className="App" 
    tabIndex="0"
    onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
    data-theme = {isDarkMode ? "dark" : ""}>
      <div className="Calculator">
        <div className="Navbar">
          <div className="Navbar_toggle" 
          onClick={() => setDarkMode(!isDarkMode)}>
            <div className = {`Navbar_toggle_circle ${
              isDarkMode ? "Navbar_toggle_circle_active": ""
            }`}></div>
          </div>
          <img src = {isDarkMode ? moon : sun} alt = "mode"/>
        </div>
        <Display expression = {expression} result = {result} history = {history}/>
        <Keypad handleKeyPress = {handleKeyPress}/>
      </div>
    </div>
  );
}

export default App;
