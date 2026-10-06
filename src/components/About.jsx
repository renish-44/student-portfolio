import SectionWrapper from './SectionWrapper.jsx';
import './About.css';

function About() {
  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="A quick introduction"
    >
      <div className="about__grid">
        <div className="about__text">
          <p>
            I am a final-year student who likes turning class ideas into working
            projects. Most of my time goes into front-end work, but I also
            enjoy solving problems with Python and SQL.
          </p>
          <p>
            Outside of coursework I contribute to open source, write short
            tutorials for my classmates, and take part in hackathons.
          </p>
        </div>
        <dl className="about__facts">
          <div className="about__fact">
            <dt>Focus</dt>
            <dd>Front-end &amp; full-stack web</dd>
          </div>
          <div className="about__fact">
            <dt>Based in</dt>
            <dd>University campus</dd>
          </div>
          <div className="about__fact">
            <dt>Goal</dt>
            <dd>Software engineering internship</dd>
          </div>
        </dl>
      </div>
    </SectionWrapper>
  );
}

export default About;
