import { useState, useEffect } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants.js'
import {checkWinnerFrom} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal'
import { ResetButton } from './components/ResetButton.jsx'
import { Board } from './components/Board.jsx'
import { saveGameToStorage, resetGameStorage, getGameFromStorage } from './logic/storage/index.js'


function App() {
  const [board, setBoard] = useState(() => {         
    const boardFromStorage = getGameFromStorage()
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : TURNS.X
  });
  const [winner, setWinner] = useState(null);
  
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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }

  const checkEndGame = (boardToCheck) => {    
    return boardToCheck.every((square) => square !== null)
  }


  useEffect(() =>{
    saveGameToStorage(board, turn)   
  },[turn, board])

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
