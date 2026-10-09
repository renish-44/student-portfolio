import { useEffect } from 'react';

export default function Toast({ id, message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`toast toast--${type}`} role="status">
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={() => onClose(id)} aria-label="Close">
        &times;
      </button>
    </div>
  );
}
