import PropTypes from 'prop-types';
import NavBar from './components/NavBar.jsx';
import Header from './components/Header.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import { skillList, projectList } from './data/portfolio.js';

function App({ name, themeColor }) {
  return (
    <div className="app" style={{ '--theme-color': themeColor }}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <NavBar />
      <Header name={name} />
      <main id="main-content" tabIndex={-1}>
        <About />
        <Skills skillList={skillList} />
        <Projects projects={projectList} />
      </main>
      <Footer />
    </div>
  );
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export default App;
