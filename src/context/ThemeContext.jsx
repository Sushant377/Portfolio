import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const themes = [
  {
    name: 'Ocean',
    icon: '🌊',
    accent: '#64ffda',
    vars: {
      '--bg-primary':    '#0a192f',
      '--bg-secondary':  '#112240',
      '--bg-tertiary':   '#1d3461',
      '--accent':        '#64ffda',
      '--accent-dark':   '#0d9373',
      '--accent-glow':   'rgba(100,255,218,0.1)',
      '--text-primary':  '#ccd6f6',
      '--text-secondary':'#8892b0',
      '--text-tertiary': '#a8b2d8',
      '--white':         '#e6f1ff',
      '--navbar-blur':   'rgba(10,25,47,0.93)',
      '--shadow':        'rgba(0,0,0,0.3)',
    },
  },
  {
    name: 'Midnight',
    icon: '🌙',
    accent: '#c084fc',
    vars: {
      '--bg-primary':    '#0d0d1a',
      '--bg-secondary':  '#13132a',
      '--bg-tertiary':   '#1e1e40',
      '--accent':        '#c084fc',
      '--accent-dark':   '#9333ea',
      '--accent-glow':   'rgba(192,132,252,0.1)',
      '--text-primary':  '#e2d9f3',
      '--text-secondary':'#9d8dc4',
      '--text-tertiary': '#b8a8e0',
      '--white':         '#f3e8ff',
      '--navbar-blur':   'rgba(13,13,26,0.93)',
      '--shadow':        'rgba(0,0,0,0.4)',
    },
  },
  {
    name: 'Ember',
    icon: '🔥',
    accent: '#ff8c42',
    vars: {
      '--bg-primary':    '#1a0800',
      '--bg-secondary':  '#2a1200',
      '--bg-tertiary':   '#3d1f00',
      '--accent':        '#ff8c42',
      '--accent-dark':   '#e65c00',
      '--accent-glow':   'rgba(255,140,66,0.1)',
      '--text-primary':  '#f5d0b5',
      '--text-secondary':'#c4966a',
      '--text-tertiary': '#d4a87a',
      '--white':         '#ffeedd',
      '--navbar-blur':   'rgba(26,8,0,0.93)',
      '--shadow':        'rgba(0,0,0,0.4)',
    },
  },
  {
    name: 'Forest',
    icon: '🌿',
    accent: '#80ff72',
    vars: {
      '--bg-primary':    '#071a0f',
      '--bg-secondary':  '#0e2a18',
      '--bg-tertiary':   '#1a3d26',
      '--accent':        '#80ff72',
      '--accent-dark':   '#3dba2e',
      '--accent-glow':   'rgba(128,255,114,0.1)',
      '--text-primary':  '#c8f0d0',
      '--text-secondary':'#7aab88',
      '--text-tertiary': '#90c09a',
      '--white':         '#e8ffe8',
      '--navbar-blur':   'rgba(7,26,15,0.93)',
      '--shadow':        'rgba(0,0,0,0.4)',
    },
  },
  {
    name: 'Light',
    icon: '☀️',
    accent: '#0070f3',
    vars: {
      '--bg-primary':    '#ffffff',
      '--bg-secondary':  '#f0f4f8',
      '--bg-tertiary':   '#dde4ed',
      '--accent':        '#0070f3',
      '--accent-dark':   '#0050b3',
      '--accent-glow':   'rgba(0,112,243,0.08)',
      '--text-primary':  '#2d3748',
      '--text-secondary':'#718096',
      '--text-tertiary': '#4a5568',
      '--white':         '#1a202c',
      '--navbar-blur':   'rgba(255,255,255,0.95)',
      '--shadow':        'rgba(0,0,0,0.1)',
    },
  },
];

const ThemeContext = createContext();

const applyTheme = (index) => {
  const root = document.documentElement;
  Object.entries(themes[index].vars).forEach(([k, v]) => root.style.setProperty(k, v));
};

export const ThemeProvider = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(() => {
    const saved = parseInt(localStorage.getItem('portfolio_theme') ?? '0');
    return isNaN(saved) ? 0 : saved;
  });

  useEffect(() => {
    applyTheme(themeIndex);
  }, [themeIndex]);

  const cycleTheme = useCallback(() => {
    setThemeIndex(prev => {
      const next = (prev + 1) % themes.length;
      localStorage.setItem('portfolio_theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themes[themeIndex], themeIndex, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
