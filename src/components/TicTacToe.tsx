import { useState, useEffect } from 'react';

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

const findBestMove = (squares: Array<string | null>, isComputerTurn: boolean): number => {
  const player = isComputerTurn ? 'X' : 'O';
  const computer = isComputerTurn ? 'O' : 'X';

  // Check if computer can win
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const testSquares = [...squares];
      testSquares[i] = computer;
      if (calculateWinner(testSquares) === computer) {
        return i;
      }
    }
  }

  // Block player's win
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const testSquares = [...squares];
      testSquares[i] = player;
      if (calculateWinner(testSquares) === player) {
        return i;
      }
    }
  }

  // Prioritize center
  if (!squares[4]) {
    return 4;
  }

  // Choose random empty corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((corner) => !squares[corner]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Choose any empty square
  const availableSquares = squares.map((square, i) => (!square ? i : null)).filter((i): i is number => i !== null);
  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
};

const TicTacToe = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [status, setStatus] = useState<string>('Your turn');

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(winner === 'X' ? 'Player wins! 🎉' : 'Computer wins!');
    } else if (squares.every((square) => square)) {
      setStatus("It's a draw!");
    } else {
      setStatus(isPlayerTurn ? 'Your turn' : "Computer's turn...");
    }
  }, [squares, isPlayerTurn]);

  useEffect(() => {
    if (!isPlayerTurn) {
      const timer = setTimeout(() => {
        const move = findBestMove(squares, false);
        const newSquares = [...squares];
        newSquares[move] = 'O';
        setSquares(newSquares);
        setIsPlayerTurn(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, squares]);

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = [...squares];
    newSquares[i] = 'X';
    setSquares(newSquares);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsPlayerTurn(true);
    setStatus('Your turn');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '10px',
          margin: '20px auto',
        }}
      >
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
              cursor: square ? 'not-allowed' : 'pointer',
            }}
          >
            {square}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '18px', margin: '10px 0' }}>{status}</p>
      <button
        onClick={resetGame}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
