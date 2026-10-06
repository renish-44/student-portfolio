import PropTypes from 'prop-types';
import SectionWrapper from './SectionWrapper.jsx';
import './Projects.css';

function Projects({ projects }) {
  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Selected coursework and personal builds"
    >
      {projects.length === 0 ? (
        <p className="empty-state">Projects will be added soon.</p>
      ) : (
        <ul className="projects__grid">
          {projects.map(({ id, title, description, tech, link }) => (
            <li key={id} className="project-card">
              <h3 className="project-card__title">{title}</h3>
              <p className="project-card__description">{description}</p>
              <ul className="project-card__tech">
                {tech.map((item) => (
                  <li key={item} className="project-card__tag">
                    {item}
                  </li>
                ))}
              </ul>
              <a
                className="project-card__link"
                href={link}
                aria-label={`View project: ${title}`}
              >
                View project &rarr;
              </a>
            </li>
          ))}
        </ul>
      )}
    </SectionWrapper>
  );
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tech: PropTypes.arrayOf(PropTypes.string).isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Projects;
