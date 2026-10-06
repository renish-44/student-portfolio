import PropTypes from 'prop-types';
import './Header.css';

const HERO_ACTIONS = [
  { id: 'work', href: '#projects', label: 'View my work', variant: 'primary' },
  { id: 'contact', href: '#contact', label: 'Get in touch', variant: 'ghost' },
];

function Header({ name }) {
  return (
    <header
      id="home"
      className="header"
      style={{
        backgroundImage: `radial-gradient(
            85% 70% at 50% 0%,
            color-mix(in srgb, var(--theme-color) 42%, transparent),
            transparent 62%
          ),
          linear-gradient(
            180deg,
            color-mix(in srgb, var(--theme-color) 15%, transparent) 0%,
            transparent 55%
          )`,
      }}
    >
      <div className="header__inner">
        <span className="header__accent" aria-hidden="true" />
        <p className="header__eyebrow">Student Portfolio</p>
        <h1 className="header__name">Hi, I&apos;m {name}</h1>
        <p className="header__tagline">
          Computer Science undergraduate who enjoys building useful web apps and
          learning by doing.
        </p>
        <div className="header__actions">
          {HERO_ACTIONS.map(({ id, href, label, variant }) => (
            <a key={id} className={`button button--${variant}`} href={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
