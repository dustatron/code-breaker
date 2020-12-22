import React, { useState, useContext, createContext } from "react";
import ColorListData from "../data/ColorListData";

//////////////// Context ////////////////////
export const currentListContext = createContext();
export const currentListUpdateContext = createContext();

export const selectedListContext = createContext();
export const selectedListUpdateContext = createContext();

///////////////// Hooks /////////////////////
export const useCurrentList = () => {
  return useContext(currentListContext);
};
export const useCurrentListUpdate = () => {
  return useContext(currentListUpdateContext);
};

export const useSelectedList = () => {
  return useContext(selectedListContext);
};
export const useSelectedListUpdate = () => {
  return useContext(selectedListUpdateContext);
};

/////////////////// Context ///////////////////
const ColorListContext = ({ children }) => {
  /// //// //// STATE //// //// ////
  const [colorList, updateColorList] = useState(ColorListData);
  const [selectedList, updateSelected] = useState([]);

  //// //// //// Handle Updates //// //// ////

  const handleUpdateColorList = (newList) => {
    updateColorList(newList);
  };

  const handleUpdateSelectedList = (newList) => {
    updateSelected(newList);
  };

  return (
    <currentListContext.Provider value={colorList}>
      <currentListUpdateContext.Provider value={handleUpdateColorList}>
        <selectedListContext.Provider value={selectedList}>
          <selectedListUpdateContext.Provider value={handleUpdateSelectedList}>
            {children}
          </selectedListUpdateContext.Provider>
        </selectedListContext.Provider>
      </currentListUpdateContext.Provider>
    </currentListContext.Provider>
  );
};

export default ColorListContext;
