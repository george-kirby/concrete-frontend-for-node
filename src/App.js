import React from 'react';
import './App.css';
import Main from './containers/Main'

function App() {

  return (
    <div className="App">
      <h1>Concrete</h1>
      <Main currentUserId={1}/>
    </div>
  );
}

export default App;
