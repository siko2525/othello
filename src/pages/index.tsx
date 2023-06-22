import { Cell } from '../components/Cell';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { board, turnColor, onClick } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} x={x} y={y} color={color} onClick={() => onClick(x, y)} />
          ))
        )}
      </div>
      <div className={styles.turn}>{turnColor === 1 ? '黒のターン' : '白のターン'}</div>
    </div>
  );
};

export default Home;
