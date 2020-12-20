import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Dragable(props) {
  let list = [
    {
      id: "100",
      name: 1,
    },
    {
      id: "102",
      name: 2,
    },
    {
      id: "103",
      name: 3,
    },
    {
      id: "104",
      name: 4,
    },
  ];
  return (
    <DragDropContext>
      <Droppable droppableId="characters">
        {(provided) => {
          return (
            <ul ref={provided.innerRef} {...provided.droppableProps} className="characters">
              {list.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {name}
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
    </DragDropContext>
  );
}

export default Dragable;
