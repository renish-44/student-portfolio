import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import { skillList } from './data/portfolio.js';

const PAGE_TITLES = {
  '/': 'Student Portfolio — Alex Carter',
  '/projects': 'Projects — Student Portfolio',
  '/contact': 'Contact — Student Portfolio',
};

function Shell({ name, themeColor }) {
  const location = useLocation();
  const path = location.pathname;
  const isFirstRender = useRef(true);

  useEffect(() => {
    document.title =
      PAGE_TITLES[path] ?? 'Page not found — Student Portfolio';
  }, [path]);

  /* Move focus to the new page so keyboard and screen-reader users land in
     the content instead of staying on the old nav link. */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const main = document.getElementById('main-content');
    if (main) main.focus({ preventScroll: true });
  }, [path]);

  return (
    <div className="app" style={{ '--theme-color': themeColor }}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <NavBar />
      {path === '/' ? <Header name={name} /> : null}
      <main id="main-content" tabIndex={-1} className="page-transition" key={path}>
        <Routes>
          <Route path="/" element={<Home skillList={skillList} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

Shell.propTypes = {
  name: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
};

function App({ name, themeColor }) {
  return <Shell name={name} themeColor={themeColor} />;
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export default App;
