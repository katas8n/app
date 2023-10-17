import './App.css';
import { useState } from 'react';

function App() {
    const [counter, setCounter] = useState(0);
    return (
        <>
            <h1>Huck :</h1>
            <h2>{counter}</h2>

            <button>+</button>
            <button>-</button>
        </>
    );
}

export default App;
