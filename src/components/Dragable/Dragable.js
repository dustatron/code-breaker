import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TakeTurn from '../TakeTurn';
import { allowed, getList, reorder, move } from './gameBoardHelper';

// Context
import { useGameStarted } from '../../context/GameContext';
import { useCurrentList } from '../../context/ColorListContext';
import { useCurrentListUpdate } from '../../context/ColorListContext';

import { useSelectedList } from '../../context/ColorListContext';
import { useSelectedListUpdate } from '../../context/ColorListContext';

import { useWin } from '../../context/GameContext';

function Dragable () {
    //Context
    const winState = useWin();
    const currentList = useCurrentList();
    const updateList = useCurrentListUpdate();
    const selectedList = useSelectedList();
    const updateSelected = useSelectedListUpdate();
    const gameStarted = useGameStarted();

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        const start = result.source.index;
        const end = result.destination.index;

        if (source.droppableId === destination.droppableId) {
            // Reorder list
            const newOrder = reorder(getList(source.droppableId, currentList, selectedList), start, end);

            // Update the correct list
            if (source.droppableId === 'list2') {
                updateSelected(newOrder);
            } else {
                updateList(newOrder);
            }
        } else {
            if (allowed(destination, selectedList.length)) {
                // Move to other list
                const moveListItems = move(
                    getList(source.droppableId, currentList, selectedList),
                    getList(destination.droppableId, currentList, selectedList),
                    source,
                    destination
                );
                updateList(moveListItems.list1);
                updateSelected(moveListItems.list2);
            }
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="color-picker">
                {!gameStarted && (
                    <div className="color-picker--game-over">
                        <div className="color-picker--game-over-title">{winState ? 'WIN' : 'START GAME'}</div>
                    </div>
                )}
                {/* //////////////////////////////////////////////////////// */}
                {/* /////////////////// SHOW COLOR OPTIONS ///////////////// */}
                {/* //////////////////////////////////////////////////////// */}
                <h2 className="color-picker-title">Color Options</h2>
                <Droppable droppableId="list1" direction="horizontal">
                    {(provided) => {
                        return (
                            <ul ref={provided.innerRef} {...provided.droppableProps} className="color-picker-list">
                                {currentList.map(({ id, name, hex }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className="color-box"
                                                >
                                                    <div
                                                        className="color-box-square"
                                                        style={{ backgroundColor: hex }}
                                                    />
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        );
                    }}
                </Droppable>
                {/* //////////////////////////////////////////////////////////////////// */}
                {/* /////////////////// SHOW CURRENTLY SELECTED COLORS ///////////////// */}
                {/* //////////////////////////////////////////////////////////////////// */}
                <h2 className="color-picker-title">Color Guess</h2>
                <Droppable droppableId="list2" direction="horizontal">
                    {(provided) => {
                        return (
                            <div>
                                <ul ref={provided.innerRef} {...provided.droppableProps} className="color-picker-list">
                                    {selectedList.map(({ id, name, hex }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <li
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className="color-box"
                                                    >
                                                        <div
                                                            className="color-box-square"
                                                            style={{ backgroundColor: hex }}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                                <div>
                                    <TakeTurn />
                                </div>
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default Dragable;
