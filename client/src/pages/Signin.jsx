import React from 'react'
import UserContext from '../UserContext'
import API_URL from '../API'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {

  const {currentUser, setCurrentUser} = React.useContext(UserContext)
  const[name, setName] = React.useState('')
  const navigate = useNavigate()
  console.log(currentUser)

  

  function handleChange(event){
    setName(event.target.value)
  }

  async function handleSearch(){
    axios.get(API_URL+`/users/${name}`)
        .then(response => {
          setCurrentUser(response.data)
          if(!response.data){
            axios.post(API_URL+`/users/${name}`)
                .then(response => {
                  setCurrentUser(response.data)
                  navigate('/')
                })
                .catch(error => {
                  console.log('Error creating user:', error)
                })
          }else navigate('/')
        })
        .catch(error => {
          console.log('Error fetching user:', error)
        })
    
  }

  async function handleKeyDown(event){
    if(event.key === 'Enter')
      handleSearch()
  }
  
  return (
    <main>
      <div className='signin-wrapper'>
        <h1 className='title'>Tenzies Sign in</h1>
        <div className='input'>
          <input 
          type="text" 
          placeholder='Enter your name'
          onChange={(event) => handleChange(event)}
          onKeyDown={handleKeyDown}
        />
        <button className="sign-in-button"onClick={handleSearch}>Sign in</button>
        </div>
      </div>
        
        
      
    </main>
  )
}

export default Signin