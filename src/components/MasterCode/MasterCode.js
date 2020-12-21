import React from "react";
import { useMasterCode } from "../../context/GameContext";
import { useMasterCodeUpdate } from "../../context/GameContext";
import ColorListData from "../../data/ColorListData";

function MasterCode() {
  const masterColors = ColorListData.map((color) => {
    return color.name;
  });

  const masterCode = useMasterCode();
  const masterCodeUpdate = useMasterCodeUpdate();

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
    masterCodeUpdate(generateCode());
  };
  return (
    <div>
      <div>
        {masterCode.map((color) => (
          <p>{color.name} </p>
        ))}
      </div>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default MasterCode;
