import { useEffect, useState } from 'react';
import './App.css';

function App() {

    const resultPlayer1 = localStorage.getItem('results-player1');
    const resultPlayer2 = localStorage.getItem('results-player2');

    const clearWins = () => {
        localStorage.clear();
        window.location.reload();
    }

    const handleRestart = () => {
        window.location.reload();
    }

    const winningCombinations = [
        { index: [0, 1, 2], orientation: 'horizontal' },
        { index: [3, 4, 5], orientation: 'horizontal' },
        { index: [6, 7, 8], orientation: 'horizontal' },

        { index: [0, 3, 6], orientation: 'vertical' },
        { index: [1, 4, 7], orientation: 'vertical' },
        { index: [2, 5, 8], orientation: 'vertical' },

        { index: [0, 4, 8], orientation: 'diagonal-1' },
        { index: [2, 4, 6], orientation: 'diagonal-2' },
    ]


    const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [turn, setTurn] = useState(1);
    const [winnerTrue, setWinnerTrue] = useState('');
    const [alertVelha, setAlertVelha] = useState('');
    const [winningCombo, setWinningCombo] = useState(null);


    const handleClick = (clickedIndex) => {

        if (winnerTrue !== '') return;

        if (gameData[clickedIndex] !== 0) return;

        setGameData((prev) => {
            const newGameData = [...prev];
            newGameData[clickedIndex] = turn;
            return newGameData;
        });
        setTurn((prev) => (prev === 1 ? 2 : 1));
    }

    useEffect(() => {
        verifyWinner();
    }, [gameData]);



    const verifyWinner = () => {

        let winner = false;
        for (let combinations of winningCombinations) {
            const { index } = combinations;


            if (gameData[index[0]] === 1 && gameData[index[1]] === 1 && gameData[index[2]] === 1) {
                winner = true;
                setWinningCombo(combinations);
                localStorage.setItem('results-player1', resultPlayer1 ? parseInt(resultPlayer1) + 1 : 1);
                return setWinnerTrue('player 1 victorious');
            }

            if (gameData[index[0]] === 2 && gameData[index[1]] === 2 && gameData[index[2]] === 2) {
                winner = true;
                setWinningCombo(combinations);
                localStorage.setItem('results-player2', resultPlayer2 ? parseInt(resultPlayer2) + 1 : 1);
                return setWinnerTrue('player 2 victorious');
            }
        }

        if (gameData.every(item => item !== 0)) {
            if (winner === false) {
                setWinnerTrue('');
                setAlertVelha('game was velha');
            }
        }
    }

    return (
        <>
            <div className='d-wins-clear-wins'>

                <div>
                    <p className='p-players-wins'>player 1 wins: {resultPlayer1}</p>
                    <p className='p-players-wins'>player 2 wins: {resultPlayer2}</p>
                </div>

                <div>
                    <button onClick={clearWins} className='b-clear-wins'>clear wins</button>
                </div>

            </div>

            <div className="board-game">
                {gameData.map((value, index) => (
                    <span className={winningCombo?.index.includes(index) ? winningCombo.orientation : null} onClick={() => { handleClick(index) }} key={index}>
                        {value === 1 && '❌'}
                        {value === 2 && '⭕'}
                        {value === 0 && '-'}
                    </span>
                ))}

            </div>

            {winnerTrue ? (
                <p className='p-winner-true'>{winnerTrue}</p>
            ) : null}

            {alertVelha ? (
                <p className='p-alert-velha'>{alertVelha}</p>
            ) : null}

            <p className='function-restart-game' onClick={handleRestart}>restart game</p>
        </>
    )
}
export default App;