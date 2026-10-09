import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__bar">
        <p>
          &copy; {year} Student Portfolio &middot; Built with React 18 + Vite
        </p>
      </div>
    </footer>
  );
}

export default Footer;
