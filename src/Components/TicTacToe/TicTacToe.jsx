import { useState, useEffect } from "react";

const CellValue = Object.freeze({
  EMPTY: "",
  CIRCLE: "O",
  CROSS: "X",
});

const Status = Object.freeze({
  PLAYING: "PLAYING",
  FINISHED: "FINISHED",
});

const emptyBoard = [0, 0, 0].fill([0, 0, 0].fill(CellValue.EMPTY));
const boxSize =
  "h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 xl:h-44 xl:w-44";

const TicTacToe = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState(Status.PLAYING);
  const [moveCount, setMoveCount] = useState(0);
  const [winner, setWinner] = useState(CellValue.EMPTY);

  function updateBoard(x, y) {
    setMoveCount((c) => c + 1);
    setBoard((prevState) =>
      prevState.map((row, i) =>
        row.map((col, j) => {
          if (i !== x || j !== y) return col;
          return moveCount % 2 === 0 ? CellValue.CROSS : CellValue.CIRCLE;
        }),
      ),
    );
  }

  function resetGame() {
    setMoveCount(0);
    setBoard(emptyBoard);
    setStatus(Status.PLAYING);
  }

  useEffect(() => {
    if (moveCount === 1) setStatus(Status.PLAYING);
    if (moveCount < 5) return;
    // check winner
    let winnerValue = CellValue.EMPTY;
    function __checkArr(arr) {
      if (new Set(arr).size === 1 && arr[0] !== CellValue.EMPTY) return true;
      return false;
    }
    // check rows
    for (let row of board) {
      if (__checkArr(row)) {
        winnerValue = row[0];
        break;
      }
    }
    // check cols
    for (let idx of [0, 1, 2]) {
      let cols = [board[0][idx], board[1][idx], board[2][idx]];
      if (__checkArr(cols)) {
        winnerValue = cols[0];
        break;
      }
    }
    // check diagonals
    let diagonals = [
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];
    for (let diag of diagonals) {
      if (__checkArr(diag)) {
        winnerValue = diag[0];
        break;
      }
    }
    if (moveCount === 9) setStatus(Status.FINISHED);
    if (winnerValue !== CellValue.EMPTY) {
      setStatus(Status.FINISHED);
      setWinner(winnerValue);
    }
  }, [moveCount, board]);

  return (
    <div className="flex items-center justify-center h-screen min-w-screen bg-gradient-to-r from-indigo-500 to-indigo-600">
      <div className="max-w-7xl p-4 md:p-8">
        <div className="flex flex-row justify-between items-center mb-4 mx-1">
          <h6 className="text-xl lg:text-3xl text-indigo-100 font-bold">
            Tic-Tac-Toe
          </h6>
          <button
            className="text-xs md:text-sm lg:text-md px-2 md:px-3 lg:px-4 py-1 border-2 border-indigo-100 rounded-md text-indigo-100 active:scale-110 transition-all duration-300"
            onClick={resetGame}
          >
            Reset Board
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full h-full">
          {board.map((row, x) => (
            <div className="flex flex-row gap-2" key={x}>
              {row.map((col, y) => (
                <button
                  key={y * 10 + x}
                  className={`${boxSize} rounded-md cursor-pointer active:scale-125 transition-all duration-300 ease-in-out disabled:pointer-events-none ${
                    moveCount === 0 ? "animate-grow" : ""
                  } ${
                    status === Status.FINISHED
                      ? "bg-indigo-200"
                      : "bg-indigo-100"
                  }`}
                  disabled={
                    col !== CellValue.EMPTY || status === Status.FINISHED
                  }
                  onClick={(e) => updateBoard(x, y)}
                >
                  <div className="text-2xl sm:text-4xl lg:text-6xl font-mono text-indigo-900 select-none">
                    {col}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center bg-indigo-100 rounded-md mt-4 py-2 text-indigo-900">
          {status === Status.FINISHED ? (
            <p>
              Game Over: {winner === CellValue.EMPTY ? "Draw" : winner + " Won"}
            </p>
          ) : (
            <p>
              {moveCount % 2 === 0 ? CellValue.CROSS : CellValue.CIRCLE}'s turn
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
