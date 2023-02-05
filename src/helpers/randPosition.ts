export const randPosition = (cellSize: number, cellsQty: number): number => {
    let randInt = Math.floor(Math.random() * cellsQty);
    let randStep = cellSize * randInt;
    return randStep;
}
