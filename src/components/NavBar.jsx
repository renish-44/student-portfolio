import { useEffect, useState } from 'react';
import './NavBar.css';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function NavBar() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return undefined;
    }

    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      Boolean
    );

    if (targets.length === 0) {
      return undefined;
    }

    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });

        const nextActive = SECTIONS.map(({ id }) => id).find((id) =>
          visible.has(id)
        );

        if (nextActive) {
          setActiveId(nextActive);
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar" aria-label="Primary">
      <ul className="navbar__list">
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
                aria-current={isActive ? 'location' : undefined}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
