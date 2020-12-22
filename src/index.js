import React from "react";
import ReactDOM from "react-dom";
import "./vender/ridge-dark.css";
import "./vender/ridge.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Context
import ColorListContext from "./context/ColorListContext";
import GameContext from "./context/GameContext";
import TurnContext from "./context/TurnContext";

ReactDOM.render(
  <ColorListContext>
    <GameContext>
      <TurnContext>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </TurnContext>
    </GameContext>
  </ColorListContext>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
