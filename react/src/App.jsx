import { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

function App() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);

    function handleClick(index) {
        if (squares[index] || calculateWinner(squares)) return;

        const newSquares = [...squares];
        newSquares[index] = isX ? 'X' : 'O';
        setSquares(newSquares);
        setIsX(!isX);
    }

    const winner = calculateWinner(squares);
    const status = winner ? `Kazanan: ${winner}` : `Sıra: ${isX ? 'X' : 'O'}`;

    function restart() {
        setSquares(Array(9).fill(null));
        setIsX(true);
    }

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <div className="status">{status}</div>
            <div className="board">
                {squares.map((val, i) => (
                    <Square key={i} value={val} onClick={() => handleClick(i)} />
                ))}
            </div>
            <button onClick={restart}>Yeniden Başlat</button>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Yatay
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dikey
        [0, 4, 8], [2, 4, 6]             // Çapraz
    ];

    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

export default App;
