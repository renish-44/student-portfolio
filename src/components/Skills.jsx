import SectionWrapper from './SectionWrapper.jsx';
import './Skills.css';

export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <SectionWrapper id="skills" title="Technical Skills">
      <div className="skills__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {skills.map((group, idx) => (
          <div key={idx} className="skills__group">
            <h3 style={{ borderBottom: '2px solid var(--theme-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              {group.category}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {group.items.map((skill, i) => (
                <li key={i} style={{ background: 'var(--card-bg)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid var(--border-color)' }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
