// Check that limit is met
export const allowed = (destination, count, limit = 4) => {
    if (count < limit) {
        return true;
    }

    if (destination.droppableId === 'list2' && count >= limit) {
        return false;
    }

    return true;
};

// return list based on dragable id
export const getList = (listName, currentList, selectedList) => {
    if (listName === 'list1') {
        return currentList;
    }
    if (listName === 'list2') {
        return selectedList;
    }
    return console.error('No list found');
};

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [ removed ] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [ removed ] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
