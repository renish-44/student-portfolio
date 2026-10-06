import PropTypes from 'prop-types';
import './SectionWrapper.css';

function SectionWrapper({
  id,
  title,
  subtitle,
  className = '',
  headerTag: HeaderTag = 'header',
  children,
}) {
  const sectionClass = className ? `section ${className}` : 'section';
  const headingId = `${id}-title`;

  return (
    <section id={id} className={sectionClass} aria-labelledby={headingId}>
      <div className="section__inner">
        <HeaderTag className="section__header">
          <h2 id={headingId} className="section__title">
            {title}
          </h2>
          {subtitle ? <p className="section__subtitle">{subtitle}</p> : null}
        </HeaderTag>
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
}

SectionWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  headerTag: PropTypes.oneOf(['header', 'div']),
  children: PropTypes.node.isRequired,
};

export default SectionWrapper;
