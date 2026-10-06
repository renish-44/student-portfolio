import SectionWrapper from './SectionWrapper.jsx';
import './Footer.css';

const CONTACT_LINKS = [
  {
    id: 'email',
    href: 'mailto:alex.carter@example.edu',
    label: 'alex.carter@example.edu',
  },
  { id: 'github', href: 'https://github.com/', label: 'GitHub', external: true },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/',
    label: 'LinkedIn',
    external: true,
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <SectionWrapper
        id="contact"
        title="Get in touch"
        subtitle="Open to internships, collaborations and feedback."
        headerTag="div"
      >
        <div className="footer__contacts">
          {CONTACT_LINKS.map(({ id, href, label, external }) => (
            <a
              key={id}
              className="footer__link"
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              aria-label={external ? `${label} (opens in new tab)` : undefined}
            >
              {label}
            </a>
          ))}
        </div>
      </SectionWrapper>
      <div className="footer__bar">
        <p>
          &copy; {year} Student Portfolio &middot; Built with React 18 + Vite
        </p>
      </div>
    </footer>
  );
}

export default Footer;
