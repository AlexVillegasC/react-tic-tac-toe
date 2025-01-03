import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants.js'
import {checkWinnerFrom} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal'
import { ResetButton } from './components/ResetButton.jsx'
import { Board } from './components/Board.jsx'


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));  
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);
  

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const checkEndGame = (boardToCheck) => {    
    return boardToCheck.every((square) => square !== null)
  }

  const updateBoard = (index) => {  
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    }
    else if(checkEndGame(newBoard))
    {
      setWinner(false)
    }    
  }

  return (
    
    <main className='board'>
      <h1>Gato</h1>
      <section>
        <ResetButton resetGame={resetGame} />
      </section>
    
      <Board board={board} updateBoard={updateBoard} />

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
        
     <WinnerModal winner={winner} resetGame={resetGame} />
     
    </main>
  )
}

export default App
