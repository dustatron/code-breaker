import React from 'react';
import { useSelectedList } from '../../context/ColorListContext';
import { useSelectedListUpdate } from '../../context/ColorListContext';

import { turnListContext, useTurnList } from '../../context/TurnContext';
import { useTurnListUpdate } from '../../context/TurnContext';

import { useMasterCode } from '../../context/GameContext';
import { useCurrentListUpdate } from '../../context/ColorListContext';

import { useGameStarted } from '../../context/GameContext';
import { useGameStartedUpdate } from '../../context/GameContext';

import { useWinUpdate } from '../../context/GameContext';

import ColorListData from '../../data/ColorListData';

function TakeTurn () {
    const masterCode = useMasterCode();
    const currentListUpdate = useCurrentListUpdate();
    const turnList = useTurnList();
    const selectedList = useSelectedList();
    const updateSelectedList = useSelectedListUpdate();
    const turnListUpdate = useTurnListUpdate();

    const gameStartedUpdate = useGameStartedUpdate();
    const gameStarted = useGameStarted();

    const winUpdate = useWinUpdate();

    const handleTakeTurn = () => {
        // Must have 4 colors selected to take turn
        if (selectedList.length < 1) {
            return;
        }
        turnListUpdate(selectedList);
        updateSelectedList([]);
        currentListUpdate(ColorListData);

        if (turnList.length + 1 >= 10) {
            gameStartedUpdate(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleTakeTurn}
                disabled={selectedList.length >= 1 && gameStarted ? false : true}
                className="color-picker-btn"
            >
                {selectedList.length >= 1 ? 'Make Guess' : 'Add A Colors'}
            </button>
        </div>
    );
}

export default TakeTurn;
