import React, { createContext, useState, useEffect } from 'react';

// Create Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get the initial theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply the theme class to the body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme); // Persist theme
  }, [theme]);

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
