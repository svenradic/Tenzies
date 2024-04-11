import React from 'react'
import {Link} from 'react-router-dom'

function Header(props) {

  function handleLeaderboardDisplay(){
    if(props.isDisplayed){
      return  <div className='leaderboard-container'>
      {props.getUserElements()}
    </div>
    } else {
      return <p>Loading...</p>
    }
  }

  return (
    <div className='header'>

      <div className='signin-title-stats'>
        {!props.currentUser ? 
        <Link to='/users/sign-in'>
        <button className='sign-in-button'>Sign in</button>
        </Link> :
        <button 
        onClick ={() => props.setCurrentUser(null)} className='sign-in-button'>Sign out</button>
        }
        
      <h1 className="title">Tenzies</h1>
       <div className='leaderboard'>

            <h3>Leaderboard</h3>
            {handleLeaderboardDisplay()}
            
        </div> 
      </div>
        
      <h2>Score: {props.rollCounter}</h2> 
         
          
       
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </div>
  )
}

export default Header
