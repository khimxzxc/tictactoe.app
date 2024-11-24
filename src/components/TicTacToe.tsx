import React, { useState, useEffect } from 'react';

const calculateWinner = (squares: Array<string | null>): string | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const checkWinningMove = (squares: Array<string | null>, player: string): number => {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const testSquares = [...squares];
      testSquares[i] = player;
      if (calculateWinner(testSquares) === player) {
        return i;
      }
    }
  }
  return -1;
};

const getBestMove = (squares: Array<string | null>): number => {
  // Проверяем, можем ли мы победить
  const winningMove = checkWinningMove(squares, 'O');
  if (winningMove !== -1) return winningMove;

  // Блокируем победный ход игрока
  const blockingMove = checkWinningMove(squares, 'X');
  if (blockingMove !== -1) return blockingMove;

  // Занимаем центр, если свободен
  if (!squares[4]) return 4;

  // Занимаем углы
  const corners = [0, 2, 6, 8];
  const emptyCorners = corners.filter(i => !squares[i]);
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  }

  // Занимаем любую свободную клетку
  const emptySquares = squares
    .map((square, i) => (square === null ? i : null))
    .filter((i): i is number => i !== null);
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

const TicTacToe = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [status, setStatus] = useState<string>('Your turn');
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(winner === 'X' ? 'Player wins! 🎉' : 'Computer wins!');
      setGameOver(true);
    } else if (squares.every((square) => square)) {
      setStatus("It's a draw!");
      setGameOver(true);
    } else {
      setStatus(isPlayerTurn ? 'Your turn' : "Computer's turn...");
    }
  }, [squares, isPlayerTurn]);

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const newSquares = [...squares];
        let moveIndex;

        if (difficulty === 'hard') {
          moveIndex = getBestMove(squares);
        } else {
          const emptySquares = squares
            .map((square, i) => (square === null ? i : null))
            .filter((i): i is number => i !== null);
          moveIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }

        if (moveIndex !== undefined && moveIndex !== -1) {
          newSquares[moveIndex] = 'O';
          setSquares(newSquares);
          setIsPlayerTurn(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, squares, difficulty, gameOver]);

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares) || gameOver) return;

    const newSquares = [...squares];
    newSquares[i] = 'X';
    setSquares(newSquares);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsPlayerTurn(true);
    setStatus('Your turn');
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>{status}</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'hard')}
          style={{
            padding: '8px',
            marginTop: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 100px)', 
        gap: '10px', 
        margin: '20px auto' 
      }}>
        {squares.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '24px',
              backgroundColor: square ? (square === 'X' ? '#add8e6' : '#f08080') : '#fff',
              border: '1px solid #ddd',
              cursor: (!square && !gameOver) ? 'pointer' : 'not-allowed',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            {square}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        style={{
          padding: '10px',
          marginTop: '10px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          minWidth: '120px'
        }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;