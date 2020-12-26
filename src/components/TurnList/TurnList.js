import React, { useState } from "react";
import { v4 } from "uuid";
import ToolTip from "../ToolTip";

// Context
import { useTurnList } from "../../context/TurnContext";
import { useMasterCode } from "../../context/GameContext";
import { useWinUpdate } from "../../context/GameContext";

function TurnList() {
  const listOfTurns = useTurnList();
  const masterCode = useMasterCode();
  const winStateUpdate = useWinUpdate();

  const [showTip, setShowTip] = useState(0);

  const handleClue = (turn) => {
    const clue = turn.map((color, turnIndex) => {
      for (let index = 0; index < masterCode.length; index++) {
        if (color.name === masterCode[index].name && index === turnIndex) {
          return "#333";
        } else if (color.name === masterCode[index].name) {
          return "#fff";
        }
      }
      return 0;
    });
    const totalBlack = clue.filter((el) => el === "#333").length;
    if (totalBlack === 4) {
      winStateUpdate(true);
    }
    return clue.sort();
  };

  return (
    <div className="turns">
      <div className="turns--top-labels">
        <div>Turn #</div>
        <div>Guess </div>
        <div>Clues </div>
      </div>
      {listOfTurns &&
        listOfTurns.map((turn, index) => {
          const id = v4();
          return (
            <div key={id} className="turns-list">
              <div className="turns-list-number">
                Turn {listOfTurns.length - index}
              </div>
              <ul className="turns-list-ul">
                {turn.map((color) => {
                  const id = v4();
                  return (
                    color && (
                      <li key={id} className="color-box">
                        <div
                          className="color-box-square"
                          style={{ backgroundColor: color.hex }}
                        />
                      </li>
                    )
                  );
                })}
              </ul>
              <div
                className="turns-list-clue"
                onMouseEnter={() => setShowTip(index + 1)}
                onMouseLeave={() => setShowTip(null)}
              >
                {showTip > 0 && <ToolTip id={index + 1} show={showTip} />}
                {handleClue(turn).map((clue) => {
                  return (
                    <div
                      key={v4()}
                      className="turns-list-clue-square"
                      style={{ backgroundColor: clue }}
                    >
                      {" "}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TurnList;
