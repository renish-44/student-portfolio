import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

/* A tiny History-API router: no dependency, real paths (/contact), and a
   404 route for anything that does not match. */

const RouterContext = createContext({
  path: '/',
  hash: '',
  navigate: () => {},
});

function normalizePath(pathname) {
  if (!pathname) return '/';
  let path = pathname.replace(/\/{2,}/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

function readLocation() {
  if (typeof window === 'undefined') {
    return { path: '/', hash: '' };
  }

  return {
    path: normalizePath(window.location.pathname),
    hash: window.location.hash.replace(/^#/, ''),
  };
}

function splitTarget(to) {
  const [rawPath, ...hashParts] = String(to).split('#');

  return {
    path: normalizePath(rawPath),
    hash: hashParts.join('#'),
  };
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function Router({ children }) {
  const [location, setLocation] = useState(readLocation);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onPopState = () => setLocation(readLocation());

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    if (location.hash) {
      const target = document.getElementById(location.hash);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
        return undefined;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return undefined;
  }, [location]);

  const navigate = useCallback((to) => {
    const { path, hash } = splitTarget(to);
    const href = hash ? `${path}#${hash}` : path;

    window.history.pushState({}, '', href);
    setLocation({ path, hash });
  }, []);

  const value = {
    path: location.path,
    hash: location.hash,
    navigate,
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

Router.propTypes = {
  children: PropTypes.node.isRequired,
};

function useRouter() {
  return useContext(RouterContext);
}

function Link({ to, className, onClick, children, ...rest }) {
  const { navigate } = useRouter();

  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (event.currentTarget.target && event.currentTarget.target !== '_self')
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
    if (onClick) onClick(event);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export { Link, Router, useRouter };
