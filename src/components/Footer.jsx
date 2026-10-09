import './Footer.css';

export default function Footer({ name }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} {name}. All rights reserved.</p>
    </footer>
  );
}
