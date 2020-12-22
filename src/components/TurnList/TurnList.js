import React from "react";
import { useTurnList } from "../../context/TurnContext";
import { useMasterCode } from "../../context/GameContext";
import { useWinUpdate } from "../../context/GameContext";
import { v4 } from "uuid";

function TurnList() {
  const listOfTurns = useTurnList().reverse();
  const masterCode = useMasterCode();
  const winStateUpdate = useWinUpdate();

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
                        ></div>
                      </li>
                    )
                  );
                })}
              </ul>
              <div className="turns-list-clue">
                {handleClue(turn).map((clue) => {
                  const id = v4();
                  return (
                    <div
                      key={id}
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