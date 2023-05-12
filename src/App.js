import './App.css';
import './firebase.js';
import Header from './Components/Header'
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    }, []);
  
  return (
    <div className="App">
      <Header setUser={setUser}user={user}></Header>
    </div>
  );
}

export default App;
