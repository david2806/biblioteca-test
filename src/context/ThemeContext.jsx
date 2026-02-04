import { createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Green light theme is now the only theme
  // This context is kept for potential future theme features
  const theme = 'light';

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
