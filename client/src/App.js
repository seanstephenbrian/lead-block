import React, { createContext, useState } from 'react';

import Site from './components/Site';

// create theme context for entire site:
const ThemeContext = createContext('light');

function App() {

    // store theme in site state:
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={theme}>
            <div className='site-wrapper'>
                <Site updateTheme={(newTheme) => setTheme(newTheme)} />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
export { ThemeContext };