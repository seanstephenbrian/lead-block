import React, { createContext, useEffect, useState } from 'react';

import Site from './components/Site';

// create theme context for entire site:
const ThemeContext = createContext('light');

function App() {

    // store theme in site state:
    const [theme, setTheme] = useState('light');

    // check for saved theme preference in localStorage on app launch:
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            <div className={`site-wrapper ${theme}`}>
                <Site updateTheme={(newTheme) => {
                    setTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                }} 
                />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
export { ThemeContext };