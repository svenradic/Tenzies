import React from "react"
import Die from "./Die.jsx"
import {nanoid} from "nanoid"

function App(){
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice(){
    let numbers = []
    for(let i = 0; i < 10; i++){
      numbers.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
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
    setDice(oldDice => {
      return (
        oldDice.map(die => {
          return die.id === id ?
              {...die, isHeld: !die.isHeld}:
              die
        })
      )
    })

  }
  function rollTheDice(){
    setDice(allNewDice())
  }
  return (
    <main >
      <div className="container">
        {getDiceElements()}
      </div>
      <button className="roll-dice" onClick={rollTheDice}>Roll Dice</button>
    </main>
  )
}

export default App