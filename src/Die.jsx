import React from "react"

function Die (props){
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  return (
    <div className="die" style={styles}>
      <h2 className="die-num" onClick={props.holdDice}>
          {props.value}
      </h2>
    </div>
  )
}

export default Die