import PropTypes from 'prop-types';
import './RepoCard.css';

function RepoCard({ name, html_url, description, language, stargazers_count }) {
  return (
    <li className="repo-card">
      <h3 className="repo-card__title">
        <a href={html_url} target="_blank" rel="noreferrer" aria-label={`View project: ${name} (opens in new tab)`}>
          {name}
        </a>
      </h3>
      <p className="repo-card__description">{description || 'No description provided.'}</p>
      <div className="repo-card__meta">
        {language && <span className="repo-card__tag">{language}</span>}
        <span className="repo-card__stars" title={`${stargazers_count} stars`}>
          ⭐ {stargazers_count}
        </span>
      </div>
    </li>
  );
}

RepoCard.propTypes = {
  name: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  description: PropTypes.string,
  language: PropTypes.string,
  stargazers_count: PropTypes.number.isRequired,
};

export default RepoCard;
