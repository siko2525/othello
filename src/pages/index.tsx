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
    [-1, 0], //👆
    [-1, 1], //右斜め上
    [0, 1], //右
    [1, 1], //右斜め下
    [1, 0], //下
    [-1, -1], //左斜め下
    [0, -1], //左
    [1, -1], //左斜め上
  ];

  // const onClick = (x: number, y: number) => {
  //   if (board[y][x] !== 3) return;
  //   const newBoard = structuredClone(board);
  //   flipSide(newBoard, x, y);
  //   for (let i = 1; i < 8; i++) {
  //     for (let l = 1; l < 8; l++) {
  //       judgement(newBoard, i, l);
  //     }
  //   }
  //   setBoard(newBoard);
  // };

  // const flipSide = (board: number[][], x: number, y: number) => {
  //   if (board[y][x] === 0) return;
  //   for (const dir of directions) {
  //     for (let index = 1; index < 8; index++) {
  //       if (board[y + index * dir[1]] === undefined) {
  //         break;
  //       } else if (board[y + index * dir[1]][x + index * dir[0]] === turnColor && index !== 1) {
  //         for (let a = 0; a < index; a++) {
  //           board[y + a * dir[1]][x + a * dir[0]] = turnColor;
  //         }
  //         setTurnColor(3 - turnColor);
  //         break;
  //       } else if (board[y + index * dir[1]][x + index * dir[0]] === turnColor) {
  //         break;
  //       } else if (board[y + index * dir[1]][x + index * dir[0]] === 0) {
  //         break;
  //       }
  //     }
  //   }
  // };

  // const judgement = (board: number[][], x: number, y: number) => {
  //   if (board[y][x] % 3 !== 0) return;
  //   board[y][x] %= 3;
  //   for (const dir of directions) {
  //     for (let i = 1; i < 8; i++) {
  //       if (board[y + i * dir[1]] === undefined) {
  //         break;
  //       } else if (board[y + i * dir[1]][x + i * dir[0]] % 3 === 0) {
  //         break;
  //       } else if (board[y + i * dir[1]][x + i * dir[0]] === 3 - turnColor && i !== 1) {
  //         board[y][x] = 3;
  //         break;
  //       } else if (board[y + i * dir[1]][x + i * dir[0]] === (turnColor % 2) + 1) {
  //         break;
  //       }
  //     }
  //   }

  const onClick = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    //useStateで管理されてる値は直接いじらない、よってクローンしてboardを作成
    if (board[y][x] !== 3) return;
    for (const dir of directions) {
      //directionsの中身を8個にわけてdirにしている、forが回るごとに上から取り出されるようになっている
      for (let i = 1; i < 8; i++) {
        if (board[y + i * dir[0]] === undefined) break;
        else if (board[y + i * dir[0]][x + i * dir[1]] === turnColor && i === 1) break;
        else if (board[y + i * dir[0]][x + i * dir[1]] % 3 === 0) break;
        else if (board[y + i * dir[0]][x + i * dir[1]] === 3 - turnColor) continue;
        else if (board[y + i * dir[0]][x + i * dir[1]] === turnColor && i !== 1) {
          newBoard[y][x] = turnColor;
          for (let j = 1; j < i; j++) {
            newBoard[y + j * dir[0]][x + j * dir[1]] = turnColor;
          }
          setTurnColor(3 - turnColor);
        }
      }
    }
    candidate(newBoard);
    setBoard(newBoard);
  };

  const candidate = (board: number[][]) => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        board[y][x] %= 3;
        for (const dir of directions) {
          if (board[y][x] % 3 !== 0) break;
          for (let i = 1; i < 8; i++) {
            if (board[y + i * dir[0]] === undefined) break;
            if (board[y + i * dir[0]][x + i * dir[1]] === 3 - turnColor && i === 1) break;
            if (board[y + i * dir[0]][x + i * dir[1]] === turnColor) continue;
            if (board[y + i * dir[0]][x + i * dir[1]] === 3 - turnColor && i !== 1) {
              board[y][x] = 3;
              break;
            }
            if (board[y + i * dir[0]][x + i * dir[1]] % 3 === 0) break;
          }
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
                  style={{ background: ['#000', '#fff', 'yellow'][color - 1] }}
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
