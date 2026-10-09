import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useTheme from '../hooks/useTheme.js';
import './NavBar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'projects', label: 'Projects', to: '/projects' },
  { id: 'contact', label: 'Contact', to: '/contact' },
];

function SunIcon() {
  return (
    <svg
      className="navbar__theme-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 4.1 4.1M19.9 19.9l-1.5-1.5M18.4 5.6l1.5-1.5M4.1 19.9l1.5-1.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="navbar__theme-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 14.6A8.2 8.2 0 0 1 9.4 4 8.5 8.5 0 1 0 20 14.6Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="navbar__menu-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="navbar__menu-icon navbar__menu-icon--close"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function NavBar() {
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const themeLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar__inner">
        <ul
          id="navbar-menu"
          className={open ? 'navbar__list navbar__list--open' : 'navbar__list'}
        >
          {NAV_ITEMS.map(({ id, label, to }) => (
            <li key={id} className="navbar__item">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__icon-button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="navbar-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
