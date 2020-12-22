import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TakeTurn from "../TakeTurn";
import { useGameStarted } from "../../context/GameContext";
// import ColorList from "../../context/ColorListData";
import { useCurrentList } from "../../context/ColorListContext";
import { useCurrentListUpdate } from "../../context/ColorListContext";

import { useSelectedList } from "../../context/ColorListContext";
import { useSelectedListUpdate } from "../../context/ColorListContext";

function Dragable() {
  //Context
  const currentList = useCurrentList();
  const updateList = useCurrentListUpdate();
  const selectedList = useSelectedList();
  const updateSelected = useSelectedListUpdate();
  const gameStarted = useGameStarted();

  // Check that limit is met
  const allowed = (destination, count, limit = 4) => {
    if (count < limit) {
      return true;
    }

    if (destination.droppableId === "list2" && count >= limit) {
      return false;
    }

    return true;
  };

  // return list based on dragable id
  const getList = (listName) => {
    if (listName === "list1") {
      return currentList;
    }
    if (listName === "list2") {
      return selectedList;
    }
    return console.error("No list found");
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const start = result.source.index;
    const end = result.destination.index;

    if (source.droppableId === destination.droppableId) {
      // Reorder list
      const newOrder = reorder(getList(source.droppableId), start, end);

      // Update the correct list
      if (source.droppableId === "list2") {
        updateSelected(newOrder);
      } else {
        updateList(newOrder);
      }
    } else {
      if (allowed(destination, selectedList.length)) {
        // Move to other list
        const moveListItems = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );
        updateList(moveListItems.list1);
        updateSelected(moveListItems.list2);
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <h2>Color Options</h2>
        <Droppable droppableId="list1" direction="horizontal">
          {(provided) => {
            return (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="characters"
              >
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
                          ></div>
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
        <h2>Selected</h2>
        <Droppable droppableId="list2" direction="horizontal">
          {(provided) => {
            return (
              <div>
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="characters"
                >
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
                            ></div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
                {gameStarted && <TakeTurn />}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Dragable;
