import { useState } from "react";

export const useGame = ( ) => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    // if (board[y + 1] !== undefined && board[y + 1][x] !== 0 && board[y + 1][x] !== turnColor) {
    //   console.log(turnColor);
    //   newBoard[y][x] = turnColor;
    //   console.table(newBoard);
    // }
    for (const dir of directions) {
      for (let i = 1; i < 8; i++) {
        if (newBoard[y + i * dir[1]] === undefined) {
          break;
        } else if (newBoard[y + i * dir[1]][x + i * dir[0]] === turnColor && i !== 1) {
          for (let a = 0; a < i; a++) {
            newBoard[y + a * dir[1]][x + a * dir[0]] = turnColor;
          }
          setTurnColor(-turnColor + 3);
          break;
        } else if (newBoard[y + i * dir[1]][x + i * dir[0]] === turnColor) {
          break;
        } else if (newBoard[y + i * dir[1]][x + i * dir[0]] === 0) {
          break;
        }
      }
    }

    setBoard(newBoard);
  };
  return {board, turnColor, onClick}
  }