import SectionWrapper from './SectionWrapper.jsx';
import './About.css';

export default function About({ profile, education }) {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="about__container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p className="about__bio">{profile.bio}</p>
        <div className="about__education" style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--theme-color)' }}>Education</h3>
          <p><strong>{education.degree}</strong></p>
          <p>{education.university} • {education.currentSem} (Expected {education.graduationYear})</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
