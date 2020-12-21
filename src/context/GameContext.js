import React, { useState, useContext, createContext } from "react";

//////////////// Context ////////////////////
export const masterCodeContext = createContext();
export const masterCodeUpdateContext = createContext();

//////////////// Hooks /////////////////////
export const useMasterCode = () => {
  return useContext(masterCodeContext);
};

export const useMasterCodeUpdate = () => {
  return useContext(masterCodeUpdateContext);
};

/////////////////// Context ///////////////////
const GameContext = ({ children }) => {
  const [theCode, updateTheCode] = useState([]);

  const handleMasterCodeUpdate = (newCode) => {
    updateTheCode(newCode);
  };

  return (
    <masterCodeContext.Provider value={theCode}>
      <masterCodeUpdateContext.Provider value={handleMasterCodeUpdate}>
        {children}
      </masterCodeUpdateContext.Provider>
    </masterCodeContext.Provider>
  );
};

export default GameContext;
