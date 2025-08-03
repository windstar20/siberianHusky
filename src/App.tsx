import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const handleButtonClick = () => {
    setName('ChaCha');
  };
  const handleLogClick = () => {
    console.log('clicked');
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div> {name}</div>
      <button onClick={handleButtonClick}>Change Name </button>
      <button onClick={handleLogClick}>Log Button Name </button>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
