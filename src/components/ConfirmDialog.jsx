import { useEffect, useRef } from 'react';
import './ConfirmDialog.css';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    cancelBtnRef.current?.focus();
    const handleKeyDown = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="dialog-content">
        <h3 id="dialog-title">Confirm Action</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="button button--danger" onClick={onConfirm}>Yes, Delete</button>
          <button className="button" onClick={onCancel} ref={cancelBtnRef}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
