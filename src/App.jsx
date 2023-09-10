import { useState } from "react"
import { Square } from "./components/Square"
import confetti from "canvas-confetti"
import { TURNS, WINNER_COMBOS } from './constants';


function App() {
  const [board,setBoard] = useState(Array(9).fill(null))
  const [turn,setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
  }


  //funcion que cambia el turno
  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //miramos si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      
    }//si hay un empate
    else if (checkEndGame(newBoard)){
      setWinner(false)
    }
    


  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Try again</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square 
              key={index} 
              index ={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }

      </section>
      <section className="turn" style={{gap:'50px'}}>
        <div>
          <h2 style={{marginTop:'10px', marginBottom:'10px'}}>Player 1</h2>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
        </div>
        
        <div>
          <h2 style={{marginTop:'10px', marginBottom:'10px'}}>Player 2</h2>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </div>      
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false 
                  ? 'Empate'
                  : 'Ha ganado: ' 
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
      
    </main>
  )
    
}

export default App
