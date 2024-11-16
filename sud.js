// Create Sudoku Grid
const gridContainer = document.getElementById("sudoku-grid");

for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute("max", "9");
  input.classList.add("cell");
  gridContainer.appendChild(input);
}

// Helper function to get rows, columns, and subgrids
function getGridValues() {
  const cells = document.querySelectorAll(".cell");
  const grid = [];
  cells.forEach((cell, index) => {
    const row = Math.floor(index / 9);
    if (!grid[row]) grid[row] = [];
    grid[row].push(cell.value ? parseInt(cell.value, 10) : 0);
  });
  return grid;
}

function isValidSudoku(grid) {
  const isUnique = (arr) => {
    const nums = arr.filter((num) => num !== 0);
    return new Set(nums).size === nums.length;
  };

  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    const row = grid[i];
    const col = grid.map((row) => row[i]);
    if (!isUnique(row) || !isUnique(col)) return false;
  }

  // Check subgrids
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const subgrid = [];
      for (let r = row; r < row + 3; r++) {
        for (let c = col; c < col + 3; c++) {
          subgrid.push(grid[r][c]);
        }
      }
      if (!isUnique(subgrid)) return false;
    }
  }

  return true;
}

// Validate Sudoku
document.getElementById("validate-btn").addEventListener("click", () => {
  const grid = getGridValues();
  const isValid = isValidSudoku(grid);
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => cell.classList.remove("invalid", "valid"));

  if (isValid) {
    document.getElementById("result").textContent = "Sudoku is Valid!";
    document.getElementById("result").style.color = "green";
    cells.forEach((cell) => cell.classList.add("valid"));
  } else {
    document.getElementById("result").textContent = "Invalid Sudoku!";
    document.getElementById("result").style.color = "red";
    cells.forEach((cell) => cell.classList.add("invalid"));
  }
});
