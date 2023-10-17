import './App.css';
import { useState } from 'react';

function App() {
    const [counter, setCounter] = useState(0);
    return (
        <>
            <h1>Huck :</h1>
            <h2>{counter}</h2>

            <button onClick={() => setCounter(prevValue => prevValue + 1)}>
                +
            </button>
            <button onClick={() => setCounter(prevValue => prevValue - 1)}>
                -
            </button>
        </>
    );
}

export default App;
