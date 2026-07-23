// Sample 6x6 Sudoku Puzzle Definition (0 represents empty cells)
const initialPuzzle = [
  0, 2, 0,  6, 0, 0,
  5, 0, 0,  0, 0, 1,
  0, 0, 1,  4, 0, 0,
  0, 0, 6,  1, 0, 0,
  2, 0, 0,  0, 0, 6,
  0, 0, 5,  0, 3, 0
];

const gridContainer = document.getElementById('grid');
const messageEl = document.getElementById('status-message');

// Initialize the 6x6 Sudoku Grid
function initGame() {
  gridContainer.innerHTML = '';
  messageEl.textContent = '';
  messageEl.className = 'contact-status';

  initialPuzzle.forEach((val, index) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.classList.add('cell');
    input.dataset.index = index;

    if (val !== 0) {
      input.value = val;
      input.readOnly = true;
      input.classList.add('given');
    } else {
      // Restrict inputs to digits 1-6
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        if (!/^[1-6]$/.test(val)) {
          e.target.value = '';
        }
      });
    }

    gridContainer.appendChild(input);
  });
}

// Validate current solution across rows, columns, and 2x3 sub-grids
function checkSolution() {
  const cells = document.querySelectorAll('.cell');
  let isComplete = true;
  let isCorrect = true;

  const grid = Array.from({ length: 6 }, () => Array(6).fill(0));

  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / 6);
    const col = idx % 6;
    const val = parseInt(cell.value, 10);

    if (!val) {
      isComplete = false;
    } else {
      grid[row][col] = val;
    }
  });

  if (!isComplete) {
    messageEl.textContent = 'Please complete all 36 cells before checking.';
    messageEl.className = 'contact-status err';
    return;
  }

  // Set uniqueness validation helper
  const isValidSet = (arr) => new Set(arr).size === 6 && !arr.includes(0);

  // 1. Check Rows and Columns
  for (let i = 0; i < 6; i++) {
    const row = grid[i];
    const col = grid.map(r => r[i]);
    if (!isValidSet(row) || !isValidSet(col)) {
      isCorrect = false;
      break;
    }
  }

  // 2. Check 2x3 Sub-grids
  if (isCorrect) {
    for (let r = 0; r < 6; r += 2) {
      for (let c = 0; c < 6; c += 3) {
        const block = [];
        for (let br = 0; br < 2; br++) {
          for (let bc = 0; bc < 3; bc++) {
            block.push(grid[r + br][c + bc]);
          }
        }
        if (!isValidSet(block)) {
          isCorrect = false;
          break;
        }
      }
    }
  }

  if (isCorrect) {
    messageEl.textContent = '✓ Puzzle solved correctly!';
    messageEl.className = 'contact-status ok';
  } else {
    messageEl.textContent = '✕ Duplicate numbers found in row, column, or 2x3 block.';
    messageEl.className = 'contact-status err';
  }
}

// Mobile Navigation Drawer Toggle Handler
const hamburgerBtn = document.getElementById('hamburger-btn');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawer = document.getElementById('drawer');
const drawerCloseBtn = document.getElementById('drawer-close-btn');

function openDrawer() {
  hamburgerBtn.classList.add('open');
  drawerOverlay.removeAttribute('hidden');
  setTimeout(() => drawerOverlay.classList.add('show'), 10);
  drawer.classList.add('open');
}

function closeDrawer() {
  hamburgerBtn.classList.remove('open');
  drawerOverlay.classList.remove('show');
  drawer.classList.remove('open');
  setTimeout(() => drawerOverlay.setAttribute('hidden', ''), 300);
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

// Button Listeners
document.getElementById('check-btn').addEventListener('click', checkSolution);
document.getElementById('reset-btn').addEventListener('click', initGame);

// Load Game Board
initGame();