import Toast from './Toast.jsx';
import './Toast.css';

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => (
        <Toast key={toast.id} id={toast.id} message={toast.message} type={toast.type} onClose={onClose} />
      ))}
    </div>
  );
}
