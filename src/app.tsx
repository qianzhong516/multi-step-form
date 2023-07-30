import React from 'react';
import { useState } from 'react';

export const App = () => {
    const [counter, setCounter] = useState(0);

    const onClick = () => {
        setCounter((prev) => ++prev);
    };

    return (
        <div>
            <h1>Count: {counter}</h1>
            <button onClick={onClick}>Increase</button>
        </div>
    );
};
