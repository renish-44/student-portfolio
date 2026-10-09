import PropTypes from 'prop-types';
import RepoCard from './RepoCard.jsx';
import './RepoList.css';

function RepoList({ repos }) {
  if (repos.length === 0) {
    return <p className="repo-list__empty">No repositories found.</p>;
  }

  return (
    <ul className="repo-list">
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          name={repo.name}
          html_url={repo.html_url}
          description={repo.description}
          language={repo.language}
          stargazers_count={repo.stargazers_count}
        />
      ))}
    </ul>
  );
}

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default RepoList;
