import React from "react"
import Die from "./Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App(){
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const firstValue = dice[0].value
    let areSameValue = dice.every(die => die.value === firstValue)
    let areHeld = dice.every(die => die.isHeld )
    
    if(areHeld && areSameValue)    
      setTenzies(true)
  }, [dice])


  function createNewDie(){
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice(){
    let numbers = []
    for(let i = 0; i < 10; i++){
      numbers.push(createNewDie())
    }
    return numbers
  }

  function getDiceElements(){
    return dice.map(die => {
      return (
      <Die 
        key={die.id}
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
      />)
    })
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
          return die.id === id ?
              {...die, isHeld: !die.isHeld}:
              die
      })
      
    )

  }
  function rollTheDice(){
    tenzies ? newGame() :
    setDice(oldDice => oldDice.map(die => die.isHeld ? die : createNewDie())
      )
  }

  function newGame(){
    setDice(allNewDice())
    setTenzies(false)
  }
  return (
    <main >
      {tenzies && <Confetti />}
      <div className="inner-main">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {getDiceElements()}
        </div>
        <button className="roll-dice" onClick={rollTheDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
      </div>
    </main>
  )
}

export default App