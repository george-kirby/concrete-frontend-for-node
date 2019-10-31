import React, { useState, useEffect } from "react"
import './App.css';
import Main from './containers/Main'
import API from "./API"

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    API.getUser(1).then(setCurrentUser)
  }, [])

  return (
    <div className="App">
      <h1>Concrete</h1>
      {currentUser ? <Main currentUser={currentUser}/> : null}
    </div>
  );
}

export default App;
