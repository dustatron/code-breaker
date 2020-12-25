export const generateCode = (ColorListData) => {
    let result = [];
    let used = [];
    for (let index = 0; index <= 3; index++) {
        const randIndex = Math.floor(Math.random() * ColorListData.length);
        // check for doubles
        if (used.includes(randIndex)) {
            index--;
        } else {
            used.push(randIndex);
            result.push(ColorListData[randIndex]);
        }
    }
    return result;
};
