import './Header.css';

export default function Header({ profile }) {
  return (
    <header className="header">
      <div className="header__content">
        <img 
          src={profile.photo} 
          alt={`Profile photo of ${profile.name}`} 
          className="header__photo" 
          onError={(e) => e.target.style.display = 'none'} // Hides broken image if file missing
        />
        <h1 className="header__title">
          Hi, I'm <span className="header__name">{profile.displayName}</span>
        </h1>
        <p className="header__headline">{profile.headline} | {profile.location}</p>
        <div className="header__actions" style={{ marginTop: '1.5rem' }}>
          <a href={profile.resumeLink} className="button button--primary" target="_blank" rel="noreferrer">
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
