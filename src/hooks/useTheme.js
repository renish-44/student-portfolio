import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const THEME_COLORS = { light: '#f4f7fc', dark: '#0a0e17' };

function readStoredTheme() {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

function systemTheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light';

  if (document.documentElement.classList.contains('dark')) return 'dark';

  const stored = readStoredTheme();
  if (stored === 'dark' || stored === 'light') return stored;

  return systemTheme();
}

/* Keeps <html> in sync with the chosen theme: `.dark` drives every palette
   token in index.css, and a short-lived `.theme-animating` class smooths the
   switch. */
function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    root.classList.toggle('dark', isDark);
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* storage unavailable — the class still applies */
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    root.classList.add('theme-animating');
    const timer = window.setTimeout(() => {
      root.classList.remove('theme-animating');
    }, 500);

    return () => window.clearTimeout(timer);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme };
}

export default useTheme;
