import PropTypes from 'prop-types';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';

function Home({ skillList, projects }) {
  return (
    <>
      <About />
      <Skills skillList={skillList} />
    </>
  );
}

Home.propTypes = {
  skillList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
