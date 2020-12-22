import React, { useState, useContext, createContext } from "react";

//////////////// Context ////////////////////
export const masterCodeContext = createContext();
export const masterCodeUpdateContext = createContext();

export const gameStartedContext = createContext();
export const gameStartedUpdateContext = createContext();

export const winContext = createContext();
export const winUpdateContext = createContext();

//////////////// Hooks /////////////////////
export const useMasterCode = () => {
  return useContext(masterCodeContext);
};

export const useMasterCodeUpdate = () => {
  return useContext(masterCodeUpdateContext);
};

export const useGameStarted = () => {
  return useContext(gameStartedContext);
};
export const useGameStartedUpdate = () => {
  return useContext(gameStartedUpdateContext);
};
export const useWin = () => {
  return useContext(winContext);
};
export const useWinUpdate = () => {
  return useContext(winUpdateContext);
};

/////////////////// Context ///////////////////
const GameContext = ({ children }) => {
  const [theCode, updateTheCode] = useState([]);
  const [gameStarted, gameStartedUpdate] = useState(false);
  const [winState, setWinState] = useState(false);

  const handleMasterCodeUpdate = (newCode) => {
    updateTheCode(newCode);
  };

  const handleGameStartedUpdate = (start) => {
    if (start) {
      gameStartedUpdate(true);
    } else {
      gameStartedUpdate(false);
    }
  };

  return (
    <masterCodeContext.Provider value={theCode}>
      <masterCodeUpdateContext.Provider value={handleMasterCodeUpdate}>
        <gameStartedContext.Provider value={gameStarted}>
          <gameStartedUpdateContext.Provider value={handleGameStartedUpdate}>
            <winContext.Provider value={winState}>
              <winUpdateContext.Provider value={setWinState}>
                {children}
              </winUpdateContext.Provider>
            </winContext.Provider>
          </gameStartedUpdateContext.Provider>
        </gameStartedContext.Provider>
      </masterCodeUpdateContext.Provider>
    </masterCodeContext.Provider>
  );
};

export default GameContext;
