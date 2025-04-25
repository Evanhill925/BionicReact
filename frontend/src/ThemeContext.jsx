import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme changes to the document body
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    
    // Apply background and text colors based on theme
    if (theme === 'dark') {
      document.body.classList.add('bg-dark');
      document.body.classList.add('text-light');
      document.body.classList.remove('bg-light');
      document.body.classList.remove('text-dark');
    } else {
      document.body.classList.add('bg-light');
      document.body.classList.add('text-dark');
      document.body.classList.remove('bg-dark');
      document.body.classList.remove('text-light');
    }
  }, [theme]);

  // Context value
  const contextValue = {
    theme,
    toggleTheme,
    isDarkMode: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;