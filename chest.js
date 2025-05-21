const board = document.querySelector(".card__chessboard");

const initialBoard = [
  ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
  ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn"],
  ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
];

let selectedPiece = null;
let originalCell = null;

const fragment = document.createDocumentFragment();

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const isDark = (row + col) % 2 === 1;
    cell.classList.add(isDark ? "dark" : "light");

    if (initialBoard[row][col]) {
      const piece = document.createElement("img");
      piece.src = `figures/${initialBoard[row][col]}.svg`;
      piece.classList.add("piece", initialBoard[row][col]);
      piece.draggable = false;

      cell.appendChild(piece);
    }

    fragment.appendChild(cell);
  }
}

board.appendChild(fragment);

board.addEventListener("mousedown", (e) => {
  const piece = e.target.closest(".piece");
  if (!piece) return;

  if (ghost) {
    ghost.remove();
    ghost = null;
  }

  selectedPiece = piece;
  originalCell = piece.parentElement;

  ghost = piece.cloneNode(true);
  ghost.style.position = "absolute";
  ghost.style.pointerEvents = "none";
  ghost.style.opacity = "0.7";
  ghost.style.zIndex = "1000";
  ghost.style.width = piece.offsetWidth + "px";
  ghost.style.height = piece.offsetHeight + "px";
  document.body.appendChild(ghost);

  piece.style.opacity = "0.3";
});

function isSameTeam(piece1, piece2) {
  return piece1.classList[1].startsWith("white") && piece2.classList[1].startsWith("white") ||
         piece1.classList[1].startsWith("black") && piece2.classList[1].startsWith("black");
}

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

document.querySelector(".dots").addEventListener("click", (e) => {
  const clickedDot = e.target.closest(".dot");
  if (!clickedDot) return;

  const index = [...dots].indexOf(clickedDot);
  if (index === -1) return;

  current = index;
  showSlide(current);
});


let ghost = null;

document.addEventListener("mouseup", (e) => {
  if (!selectedPiece || !ghost) return;

  const target = document.elementFromPoint(e.clientX, e.clientY);
  const targetCell = target?.classList.contains("cell") ? target : target?.closest(".cell");

  if (targetCell && targetCell !== originalCell) {
    const targetPiece = targetCell.querySelector(".piece");

    if (!targetPiece || !isSameTeam(selectedPiece, targetPiece)) {
      if (targetPiece) targetPiece.remove();

      if (selectedPiece.parentElement) {
        selectedPiece.parentElement.removeChild(selectedPiece);
      }

      targetCell.appendChild(selectedPiece);
    }
  } else {
    originalCell.appendChild(selectedPiece);
  }

  selectedPiece.style.opacity = "1";
  selectedPiece = null;
  originalCell = null;

  ghost.remove();
  ghost = null;
});