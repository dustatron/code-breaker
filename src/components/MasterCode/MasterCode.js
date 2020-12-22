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
    gameStartedUpdate(true);
    masterCodeUpdate(generateCode());
  };

  const handleEndGame = () => {
    winStateUpdate(false);
    gameStartedUpdate(false);
    turnListUpdate([], true);
  };

  return (
    <div>
      {winState ? <h2>You Win</h2> : ""}
      {!gameStarted && masterCode.length > 0
        ? masterCode.map((color) => color.name)
        : "Set Code"}
      <button onClick={handleStartGame}>
        {gameStarted ? "Restart Game" : "Start Game"}
      </button>
      {gameStarted && <button onClick={handleEndGame}> End Game</button>}
    </div>
  );
}

export default MasterCode;
