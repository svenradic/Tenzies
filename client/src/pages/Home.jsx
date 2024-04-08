import React from 'react'
import Die from "../Components/Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Header from "../Components/Header.jsx"
import axios from "axios"
import UserContext from '../UserContext.jsx'
import API_URL from '../API.jsx'

function Home() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rollCounter, setrollCounter] = React.useState(0)
  const [users, setUsers] = React.useState([])
  const {currentUser, setCurrentUser} = React.useContext(UserContext)

  React.useEffect( () => {
    axios
      .get(API_URL+"/users/getall")
      .then(res => {
        res.data.data.sort((a, b) => a.highScore - b.highScore)
        setUsers(res.data.data)
      })
      .catch(error => {
        console.log("Error fetching users: ", error);
      })
  }, [currentUser])

  React.useEffect(() => {
    const firstValue = dice[0].value
    let areSameValue = dice.every(die => die.value === firstValue)
    let areHeld = dice.every(die => die.isHeld )
    
    if(areHeld && areSameValue)    
      setTenzies(true)
  }, [dice])

  React.useEffect(() => {
    if(currentUser && tenzies){
      if(rollCounter < currentUser.highScore){
        axios
          .put(API_URL+`/users/${currentUser.name}/${rollCounter}`)
          .then(res => {
            setCurrentUser(res.data)
          })
          .catch(error => {
            console.log("Error updating user: ", error);
          })
      }
    }
  }, [tenzies])


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

  function getUserElements(){

    return users.map((user, index) => {
      return <div
        key={user._id}
        className='user-grid-row'
        >
          <div>{index+1}.</div>
          <div>{user.name}:</div> 
          <div className="highScore">{user.highScore}</div>
        </div>
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

    setrollCounter(oldRollCounter => oldRollCounter + 1)
  }

  function newGame(){
    setDice(allNewDice())
    setTenzies(false)
    setrollCounter(0)
  }

  return (
    <main >
      
        {tenzies && <Confetti width={750} height={1200}/>}
        <Header 
          rollCounter={rollCounter} 
          getUserElements={getUserElements}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <div className="container">
          {getDiceElements()}
        </div>
        <div className='buttons'>
          <button className='roll-dice' onClick={newGame}>Restart</button>

           <button className="roll-dice" onClick={rollTheDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
          
        </div>
       
      
    </main>
  )
}

export default Home
