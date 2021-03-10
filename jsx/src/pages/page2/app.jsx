import React from 'react';

function App() {
    const myDream = slogan => {
        console.log(slogan);
    };
    return (
        <div id="page2" onClick={() => myDream('Travel around the world')}>
            我是PAGE2，Hello World
        </div>
    );
}

export default App;
