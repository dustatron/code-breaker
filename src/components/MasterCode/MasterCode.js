import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { generateCode } from './CodeHelper';
import { v4 } from 'uuid';

// Context
import { useMasterCode } from '../../context/GameContext';
import { useMasterCodeUpdate } from '../../context/GameContext';

import { useWin } from '../../context/GameContext';
import { useWinUpdate } from '../../context/GameContext';

import { useGameStarted } from '../../context/GameContext';
import { useGameStartedUpdate } from '../../context/GameContext';

import { useTurnList } from '../../context/TurnContext';
import { useTurnListUpdate } from '../../context/TurnContext';

import ColorListData from '../../data/ColorListData';

function MasterCode () {
    // Context
    const masterCode = useMasterCode();
    const masterCodeUpdate = useMasterCodeUpdate();

    const gameStarted = useGameStarted();
    const gameStartedUpdate = useGameStartedUpdate();

    const winState = useWin();
    const winStateUpdate = useWinUpdate();

    const turnList = useTurnList();
    const turnListUpdate = useTurnListUpdate();

    useEffect(
        () => {
            if (winState) {
                toast('YOU BROKE THE CODE');
                handleEndGame();
            }
        },
        [ winState ]
    );

    const notify = () => toast('Game Is Ready');
    const endGame = () => toast('Game Ended');

    const handleStartGame = () => {
        notify();
        winStateUpdate(false);
        gameStartedUpdate(true);
        masterCodeUpdate(generateCode(ColorListData));
        turnListUpdate([], true);
        winStateUpdate(false);
    };

    const handleEndGame = () => {
        gameStartedUpdate(false);
        endGame();
    };

    return (
        <div className="top">
            <Toaster />
            <div className="top-code-row">
                {!gameStarted && masterCode.length > 0 && <div className="top-code-row--title">Master Code:</div>}
                {!gameStarted &&
                masterCode.length === 0 && <div className="top-code-row--title"> Can You Break the Code? </div>}
                {gameStarted && <div className="top-code-row--title"> {10 - turnList.length} Turns Left </div>}
                <div className="top-code-row--color">
                    {/* Game End & show master code  */}
                    {!gameStarted &&
                        masterCode.length > 0 &&
                        masterCode.map((color) => (
                            <div
                                key={v4()}
                                className="top-code-row--color-boxes"
                                style={{ backgroundColor: color.hex }}
                            />
                        ))}
                </div>
            </div>
            <div className="top-button-row">
                <button className="top-button-row--btn" onClick={handleStartGame}>
                    {gameStarted ? 'Restart Game' : 'Start Game'}
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
