import { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [validationError, setValidationError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setIsSaving(true);
    const res = await onSubmit({ title, description, priority });
    setIsSaving(false);
    if (res.success) {
      setTitle(''); setDescription(''); setPriority('medium');
    } else {
      setValidationError(res.error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>
      <div className="task-form__group">
        <label htmlFor="task-title">Title *</label>
        <input id="task-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSaving} required />
        {validationError && validationError.toLowerCase().includes('title') && <span className="task-form__error">{validationError}</span>}
      </div>
      <div className="task-form__group">
        <label htmlFor="task-desc">Description</label>
        <textarea id="task-desc" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isSaving} rows={3} />
      </div>
      <div className="task-form__group">
        <label htmlFor="task-priority">Priority</label>
        <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)} disabled={isSaving}>
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="button button--primary" disabled={isSaving || !title.trim()}>
        {isSaving ? 'Saving...' : 'Add Task'}
      </button>
      {validationError && !validationError.toLowerCase().includes('title') && <p className="task-form__error">{validationError}</p>}
    </form>
  );
}
