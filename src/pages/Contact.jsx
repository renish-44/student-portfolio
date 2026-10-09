import SectionWrapper from '../components/SectionWrapper.jsx';

export default function Contact({ contactData }) {
  return (
    <SectionWrapper id="contact" title="Contact Me" titleTag="h1">
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Feel free to reach out for collaborations or just a friendly hello!</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        {contactData.emails.map((email, idx) => (
          <a key={idx} href={`mailto:${email}`} className="button button--primary">
            Email: {email}
          </a>
        ))}
        
        {contactData.github && (
          <a href={contactData.github} className="button" target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        )}
      </div>
    </SectionWrapper>
  );
}
