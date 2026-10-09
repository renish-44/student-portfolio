import PropTypes from 'prop-types';
import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card" role="alert">
      <p className="error-card__message">Oops! {message}</p>
      {onRetry && (
        <button type="button" className="button button--primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
