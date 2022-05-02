import React, {useLayoutEffect, useState} from 'react';
import localStorageKeys from './localStorageKeys';
import { ThemeContext } from './ThemeContext';
import light from 'bulmaswatch/flatly/bulmaswatch.min.css';
import dark from 'bulmaswatch/darkly/bulmaswatch.min.css';

function ThemeContextWrapper (props) {
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem(localStorageKeys.THEME));

    useLayoutEffect(() => {
        const lastTheme = localStorage.getItem(localStorageKeys.THEME);

        if (lastTheme === 'true') {
            setDarkTheme(true);
            document.body.classList.remove('light-theme');
            console.log('Theme switched to dark');
        }

        if (!lastTheme || lastTheme === 'false') {
            setDarkTheme(false);
            document.body.classList.add('light-theme');
            console.log('Theme switched to light');
        }
    }, [darkTheme]);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
        localStorage.setItem(localStorageKeys.THEME, !darkTheme);
      };

    return (
        <ThemeContext.Provider value={{darkTheme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextWrapper;