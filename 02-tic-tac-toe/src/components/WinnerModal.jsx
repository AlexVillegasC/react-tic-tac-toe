import { ResetButton } from "./ResetButton"
import { Square } from "./Square"

export function WinnerModal ({winner, resetGame}) {  
  if (winner == null) return null
  const winnerText = winner === false ? 'Empate' : `Ganó: `



  return (
    <section className='winner'>
      <div className='text'>
          <h2>{winnerText}</h2>

          <header className="win">
          <h2>
              {
              winner && <Square>{winner}</Square>
              }
          </h2>
          </header>

          <footer>
              <ResetButton resetGame={resetGame} />
          </footer>
          
        </div>
    </section>
  )

}