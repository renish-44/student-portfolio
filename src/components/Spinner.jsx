import './Spinner.css';

function Spinner() {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="spinner-label">Loading repositories...</p>
    </div>
  );
}

export default Spinner;
