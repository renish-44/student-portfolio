import PropTypes from 'prop-types';
import SectionWrapper from './SectionWrapper.jsx';
import './Skills.css';

function Skills({ skillList }) {
  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      subtitle="Technologies I use and am currently improving"
    >
      {skillList.length === 0 ? (
        <p className="empty-state">No skills to show yet.</p>
      ) : (
        <ul className="skills__list">
          {skillList.map(({ id, name, level }) => (
            <li key={id} className="skill-chip">
              <span className="skill-chip__name">{name}</span>
              <span className="skill-chip__level">{level}%</span>
            </li>
          ))}
        </ul>
      )}
    </SectionWrapper>
  );
}

Skills.propTypes = {
  skillList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Skills;
