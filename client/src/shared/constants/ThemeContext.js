import { createContext } from "react";

export const ThemeContext = createContext({
    darkTheme: true,
    toggleTheme: () => {}
});