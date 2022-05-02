import React, { useContext } from 'react';
import { ThemeContext } from '../../shared/constants/ThemeContext';
import { Button } from 'react-bulma-components';

export default function ThemeSwitch () {
    const { darkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button 
        onClick={() => toggleTheme()}>
            Theme
        </Button>
    );
}