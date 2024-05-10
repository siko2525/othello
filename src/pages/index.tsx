import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
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
    judgement(x, y);
  };

  const judgement = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    for (const dir of directions) {
      for (let i = 1; i < 8; i++) {
        if (newBoard[y + i * dir[1]] === undefined) {
          break;
        } else if (newBoard[y + i * dir[1]][x + i * dir[0]] === turnColor && i !== 1) {
          for (let a = 0; a < i; a++) {
            newBoard[y + a * dir[1]][x + a * dir[0]] = turnColor;
          }
          setTurnColor(3 - turnColor);
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

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div className={styles.stone} style={{ background: color === 1 ? `#000` : '#fff' }}>
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
