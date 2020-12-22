import React, { useState, useContext, createContext } from "react";

//////////////// Context ////////////////////
export const turnListContext = createContext();
export const turnListUpdateContext = createContext();

//////////////// Hooks /////////////////////
export const useTurnList = () => {
  return useContext(turnListContext);
};
export const useTurnListUpdate = () => {
  return useContext(turnListUpdateContext);
};

function TurnContext({ children }) {
  const [turnList, updateTurnList] = useState([]);
  const handleUpdateTurnList = (newTurn, restart) => {
    if (restart) {
      return updateTurnList([]);
    }
    const newTurnList = [newTurn, ...turnList];
    updateTurnList(newTurnList);
  };
  return (
    <turnListContext.Provider value={turnList}>
      <turnListUpdateContext.Provider value={handleUpdateTurnList}>
        {children}
      </turnListUpdateContext.Provider>
    </turnListContext.Provider>
  );
}

export default TurnContext;
