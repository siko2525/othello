import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
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
    const newBoard = structuredClone(board);
    flipSide(newBoard, x, y);
    for (let i = 1; i < 8; i++) {
      for (let l = 1; l < 8; l++) {
        judgement(newBoard, i, l);
      }
    }
    setBoard(newBoard);
  };

  const flipSide = (board: number[][], x: number, y: number) => {
    if (board[y][x] === 0) return;
    console.log('nya~n');
    for (const dir of directions) {
      for (let index = 1; index < 8; index++) {
        if (board[y + index * dir[1]] === undefined) {
          break;
        } else if (board[y + index * dir[1]][x + index * dir[0]] === turnColor && index !== 1) {
          for (let a = 0; a < index; a++) {
            board[y + a * dir[1]][x + a * dir[0]] = turnColor;
          }
          setTurnColor(3 - turnColor);
          break;
        } else if (board[y + index * dir[1]][x + index * dir[0]] === turnColor) {
          break;
        } else if (board[y + index * dir[1]][x + index * dir[0]] === 0) {
          break;
        }
      }
    }
  };

  const judgement = (board: number[][], x: number, y: number) => {
    if (board[y][x] % 3 !== 0) return;
    board[y][x] %= 3;
    for (const dir of directions) {
      for (let i = 1; i < 8; i++) {
        if (board[y + i * dir[1]] === undefined) {
          break;
        } else if (board[y + i * dir[1]][x + i * dir[0]] % 3 === 0) {
          break;
        } else if (board[y + i * dir[1]][x + i * dir[0]] === 3 - turnColor && i !== 1) {
          board[y][x] = 3;
          break;
        } else if (board[y + i * dir[1]][x + i * dir[0]] === (turnColor % 2) + 1) {
          break;
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: ['#000', '#fff', ''][color - 1] }}
                >
                  {/* <div className = {styles.empty}> {turncolor: }</div> */}{' '}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className={styles.turn}>{turnColor === 1 ? '黒のターン' : '白のターン'}</div>
    </div>
  );
};

export default Home;
