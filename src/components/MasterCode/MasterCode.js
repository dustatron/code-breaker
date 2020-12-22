import React from "react";

import { useMasterCode } from "../../context/GameContext";
import { useMasterCodeUpdate } from "../../context/GameContext";

import { useWin } from "../../context/GameContext";
import { useWinUpdate } from "../../context/GameContext";

import { useGameStarted } from "../../context/GameContext";
import { useGameStartedUpdate } from "../../context/GameContext";

import { useTurnListUpdate } from "../../context/TurnContext";

import ColorListData from "../../data/ColorListData";

function MasterCode() {
  const masterCode = useMasterCode();
  const masterCodeUpdate = useMasterCodeUpdate();

  const gameStarted = useGameStarted();
  const gameStartedUpdate = useGameStartedUpdate();

  const winState = useWin();
  const winStateUpdate = useWinUpdate();

  const turnListUpdate = useTurnListUpdate();

  const generateCode = () => {
    let result = [];
    let used = [];
    for (let index = 0; index <= 3; index++) {
      const randIndex = Math.floor(Math.random() * ColorListData.length);
      // check for doubles
      if (used.includes(randIndex)) {
        index--;
      } else {
        used.push(randIndex);
        result.push(ColorListData[randIndex]);
      }
    }
    return result;
  };

  const handleStartGame = () => {
    winStateUpdate(false);
    gameStartedUpdate(true);
    masterCodeUpdate(generateCode());
  };

  const handleEndGame = () => {
    winStateUpdate(false);
    gameStartedUpdate(false);
    turnListUpdate([], true);
  };

  return (
    <div className="top">
      {winState ? <h2>You Win</h2> : ""}

      <div className="top-code-row">
        {!gameStarted && masterCode.length > 0 && (
          <div className="top-code-row--title">Master Code:</div>
        )}
        {!gameStarted && masterCode.length === 0 && (
          <div className="top-code-row--title"> Start The Game </div>
        )}
        {gameStarted && (
          <div className="top-code-row--title"> Break The Code </div>
        )}
        <div className="top-code-row--color">
          {/* Game End & show master code  */}
          {!gameStarted &&
            masterCode.length > 0 &&
            masterCode.map((color) => (
              <div
                className="top-code-row--color-boxes"
                style={{ backgroundColor: color.hex }}
              ></div>
            ))}
        </div>
      </div>
      <div className="top-button-row">
        <button className="top-button-row--btn" onClick={handleStartGame}>
          {gameStarted ? "Restart Game" : "Start Game"}
        </button>
        {gameStarted && (
          <button className="top-button-row--btn" onClick={handleEndGame}>
            End Game
          </button>
        )}
      </div>
    </div>
  );
}

export default MasterCode;
