import React from "react"
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx' 
import UserContext from "./UserContext.jsx"

function App(){
 
  const [currentUser, setCurrentUser] = React.useState(null)


  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/users/sign-in/" element={<Signin/>}></Route>
        </Routes> 
    </UserContext.Provider>
    
  )
}

export default App