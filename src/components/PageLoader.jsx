import Spinner from './Spinner';
import './PageLoader.css';

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <Spinner />
      <p>Loading page...</p>
    </div>
  );
}
