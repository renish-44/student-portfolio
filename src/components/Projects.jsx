import { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper.jsx';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import RepoList from './RepoList.jsx';
import './Projects.css';

const GITHUB_USERNAME = 'renish-44';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        
        setError(err.message || 'Failed to load repositories. Please try again.');
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchRepos();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const filteredRepos = repos.filter((repo) => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Selected coursework and personal builds"
      titleTag="h1"
    >
      <div className="projects__search-container">
        <label htmlFor="repo-search" className="projects__search-label">
          Search repositories:
        </label>
        <input
          id="repo-search"
          type="search"
          className="projects__search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g. react"
          disabled={loading || error !== null}
        />
        {!loading && !error && (
          <p className="projects__search-count">
            Showing {filteredRepos.length} of {repos.length} repositories
          </p>
        )}
      </div>

      <div className="projects__content">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <RepoList repos={filteredRepos} />
        )}
      </div>
    </SectionWrapper>
  );
}

export default Projects;
