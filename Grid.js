//Creating variables to use in JS and CSS
const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

// In this project I have been using private var inside of the classes. This is in order to make it impossible to modify these variables outside of the classes - hence to make working with code easier.

export default class Grid {
  #cells;
  constructor(gridElement) {
    //Setting JS variables to CSS variables
    gridElement.style.setProperty("--grid-size", GRID_SIZE);
    gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    this.#cells = createCellElement(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement,
        index % GRID_SIZE,
        Math.floor(index / GRID_SIZE)
      );
    });
    console.log(this.cells);
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }
  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }
}

//Creating a layout - instead of making 16 static HTML divs
function createCellElement(gridElement) {
  const cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}

export class Cell {
  #cellElement;
  #x;
  #y;
  #tile;

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (value == null) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }
}
