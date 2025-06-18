import React, { useState } from 'react';
import './App.css';

/**
 * Colors and layout for easy reference
 * Primary:   #4CAF50 (green)
 * Secondary: #FFC107 (yellow)
 * Accent:    #2196F3 (blue)
 * Theme:     Light, minimal
 */

// PUBLIC_INTERFACE
function App() {
  // State: board is a 9-element array, 'X', 'O', or null; X always starts
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const draw = !winner && board.every(cell => cell !== null);

  // PUBLIC_INTERFACE
  function handleClick(index) {
    if (winner || board[index]) return; // Ignore if already played or finished
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  // Determine game status message
  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? '🟢 X' : '🟡 O'}`;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    status = `Next: ${isXNext ? '🟢 X' : '🟡 O'}`;
  }

  // Helper: Render a cell
  function renderCell(i) {
    let value = board[i];
    let color =
      value === 'X'
        ? '#4CAF50'
        : value === 'O'
        ? '#FFC107'
        : 'transparent';
    let textColor =
      value === 'X'
        ? '#2196F3'
        : value === 'O'
        ? '#2196F3'
        : '#888';
    return (
      <button
        className="ttt-cell"
        onClick={() => handleClick(i)}
        key={i}
        style={{
          background: value ? color : '#fff',
          color: value ? textColor : '#444',
          border: '1px solid #eee',
          fontWeight: 600,
        }}
        aria-label={'Cell ' + i}
      >
        {value}
      </button>
    );
  }

  return (
    <div className="app" style={{ background: '#f9fafb', color: '#222', minHeight: '100vh' }}>
      <nav className="navbar" style={{ background: '#2196F3', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: '#FFC107' }}>◻</span>
              WebTicTacToe
            </div>
            <button className="btn" style={{ background: '#4CAF50', color: '#fff' }} onClick={handleReset}>
              Restart Game
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ paddingTop: 112 }}>
          <h1 className="title" style={{ marginTop: 0, fontSize: '2.5rem', color: '#4CAF50'}}>Tic Tac Toe</h1>
          <div className="ttt-status" style={{
            fontWeight: 500,
            fontSize: '1.2rem',
            marginBottom: 24,
            color: status.startsWith('Winner') ? (winner === 'X' ? '#4CAF50' : '#FFC107') : '#2196F3'
          }}>
            {status}
          </div>
          <div
            className="ttt-board"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 80px)',
              gridTemplateRows: 'repeat(3, 80px)',
              gap: '8px',
              margin: '0 auto 16px',
              background: '#fff',
              boxShadow: '0 2px 10px rgba(33,150,243,0.06)',
              borderRadius: 12,
              width: 264,
              justifyContent: 'center'
            }}>
            {Array(9).fill().map((_, i) => renderCell(i))}
          </div>
          <button className="btn btn-large"
            style={{
              background: '#2196F3',
              color: '#fff',
              marginTop: 16,
              padding: '10px 40px',
              fontWeight: 600,
              borderRadius: 8,
              fontSize: '1.1rem',
              letterSpacing: 0.5,
              boxShadow: '0 1px 3px 0 rgba(60,64,67,0.08)'
            }}
            onClick={handleReset}
          >
            Reset Board
          </button>
        </div>
      </main>
      <style>
        {`
        .ttt-board button.ttt-cell:focus { outline: 2px solid #2196F3; z-index: 1;}
        .ttt-cell {
          font-size: 2.5rem;
          width: 80px;
          height: 80px;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
          box-shadow: 0 1px 2px 0 rgba(33,150,243,0.05);
        }
        .ttt-cell:disabled { opacity: 0.6; cursor: default;}
        `}
      </style>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(board) {
  /** Returns the winner ('X', 'O'), or null if no winner yet */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default App;