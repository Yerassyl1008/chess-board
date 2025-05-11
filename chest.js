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

      piece.addEventListener("mousedown", (e) => {
        selectedPiece = piece;
        originalCell = cell;
        piece.style.opacity = "0.5";
      });

      cell.appendChild(piece);
    }

    cell.addEventListener("mouseup", () => {
      if (selectedPiece) {
        const targetPiece = cell.querySelector("img");

        if (targetPiece && isSameTeam(selectedPiece, targetPiece)) {
          selectedPiece.style.opacity = "1";
          selectedPiece = null;
          return;
        }

        if (targetPiece) {
          targetPiece.remove();
        }

        cell.appendChild(selectedPiece);
        selectedPiece.style.opacity = "1";
        selectedPiece = null;
      }
    });

    board.appendChild(cell);
  }
}

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

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    current = i;
    showSlide(current);
  });
});