import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <h1 className="not-found__title" id="not-found-title">
        <span className="not-found__code" aria-hidden="true">
          404
        </span>
        <span className="not-found__label">Page not found</span>
      </h1>

      <p className="not-found__text">
        The page you&apos;re looking for doesn&apos;t exist or has moved — the
        link may be out of date. Nothing to see here, but plenty waiting on the
        home page.
      </p>

      <Link to="/" className="not-found__cta">
        Back to Home
      </Link>

      <p className="not-found__hint">
        Or jump straight to a section from the menu above.
      </p>
    </section>
  );
}

export default NotFound;
