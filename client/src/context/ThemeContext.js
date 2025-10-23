import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('acabs-theme');
    return savedTheme || 'dark';
  });

  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('acabs-font-size');
    return savedFontSize || 'normal';
  });

  const [highContrast, setHighContrast] = useState(() => {
    const savedHighContrast = localStorage.getItem('acabs-high-contrast');
    return savedHighContrast === 'true';
  });

  useEffect(() => {
    localStorage.setItem('acabs-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('acabs-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('acabs-high-contrast', highContrast.toString());
  }, [highContrast]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  // Theme variables
  const themeVariables = {
    dark: {
      primary: '#000000',
      secondary: '#1a1a1a',
      tertiary: '#2a2a2a',
      quaternary: '#3a3a3a',
      accent: '#ffffff',
      text: '#ffffff',
      textSecondary: 'rgba(255,255,255,0.7)',
      textMuted: 'rgba(255,255,255,0.5)',
      border: 'rgba(255,255,255,0.1)',
      borderLight: 'rgba(255,255,255,0.2)',
      shadow: 'rgba(0,0,0,0.4)',
      shadowLight: 'rgba(0,0,0,0.3)',
      gradient: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
      cardBg: '#2a2a2a',
      inputBg: '#3a3a3a',
      buttonPrimary: '#ffffff',
      buttonPrimaryText: '#000000',
      buttonSecondary: 'rgba(255,255,255,0.1)',
      buttonSecondaryText: '#ffffff'
    },
    light: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      tertiary: '#e9ecef',
      quaternary: '#dee2e6',
      accent: '#000000',
      text: '#000000',
      textSecondary: 'rgba(0,0,0,0.7)',
      textMuted: 'rgba(0,0,0,0.5)',
      border: 'rgba(0,0,0,0.1)',
      borderLight: 'rgba(0,0,0,0.2)',
      shadow: 'rgba(0,0,0,0.1)',
      shadowLight: 'rgba(0,0,0,0.05)',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      cardBg: '#ffffff',
      inputBg: '#f8f9fa',
      buttonPrimary: '#000000',
      buttonPrimaryText: '#ffffff',
      buttonSecondary: 'rgba(0,0,0,0.05)',
      buttonSecondaryText: '#000000'
    }
  };

  // Font size variables
  const fontSizeVariables = {
    small: {
      base: '0.875rem',
      h1: '2rem',
      h2: '1.5rem',
      h3: '1.25rem',
      large: '1.125rem'
    },
    normal: {
      base: '1rem',
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.5rem',
      large: '1.25rem'
    },
    large: {
      base: '1.125rem',
      h1: '3rem',
      h2: '2.5rem',
      h3: '2rem',
      large: '1.5rem'
    },
    xlarge: {
      base: '1.25rem',
      h1: '3.5rem',
      h2: '3rem',
      h3: '2.5rem',
      large: '1.75rem'
    }
  };

  const currentTheme = themeVariables[theme];
  const currentFontSize = fontSizeVariables[fontSize];

  // Apply CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    Object.entries(currentFontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    // Apply high contrast if enabled
    if (highContrast) {
      root.style.setProperty('--theme-border', '#000000');
      root.style.setProperty('--theme-border-light', '#000000');
      root.style.setProperty('--theme-text-secondary', theme === 'dark' ? '#ffffff' : '#000000');
      root.style.setProperty('--theme-text-muted', theme === 'dark' ? '#cccccc' : '#333333');
    }
  }, [currentTheme, currentFontSize, highContrast, theme]);

  return (
    <ThemeContext.Provider value={{
      theme,
      fontSize,
      highContrast,
      toggleTheme,
      toggleHighContrast,
      changeFontSize,
      themeVariables: currentTheme,
      fontSizeVariables: currentFontSize
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
