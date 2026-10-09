import { useState } from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onUpdate, onConfirmDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [isSaving, setIsSaving] = useState(false);

  const isLocked = task.isSaving || isSaving;

  const handleToggleCompleted = async () => {
    setIsSaving(true);
    await onUpdate(task._id, { completed: !task.completed });
    setIsSaving(false);
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    const res = await onUpdate(task._id, { title: editTitle, description: editDesc, priority: editPriority });
    setIsSaving(false);
    if (res.success) setIsEditing(false);
  };

  const handleDeleteRequest = () => {
    onConfirmDelete(task, async () => {
      setIsSaving(true);
      await onUpdate(task._id, 'DELETE');
    });
  };

  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} disabled={isLocked} className="task-item__edit-input" />
        <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} disabled={isLocked} className="task-item__edit-input" />
        <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} disabled={isLocked} className="task-item__edit-input">
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
        <div className="task-item__actions">
          <button onClick={handleSaveEdit} disabled={isLocked} className="button button--primary">{isSaving ? 'Saving...' : 'Save'}</button>
          <button onClick={() => setIsEditing(false)} disabled={isLocked} className="button">Cancel</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''} ${isLocked ? 'task-item--locked' : ''}`}>
      <div className="task-item__header">
        <label className="task-item__checkbox">
          <input type="checkbox" checked={task.completed} onChange={handleToggleCompleted} disabled={isLocked} />
          <span className="task-item__title">{task.title}</span>
        </label>
        <span className={`task-item__badge task-item__badge--${task.priority}`}>{task.priority}</span>
      </div>
      {task.description && <p className="task-item__desc">{task.description}</p>}
      <div className="task-item__footer">
        <span className="task-item__date">Added: {new Date(task.createdAt).toLocaleDateString()}</span>
        <div className="task-item__actions">
          <button onClick={() => setIsEditing(true)} disabled={isLocked} className="button button--small">Edit</button>
          <button onClick={() => onConfirmDelete(task, null)} disabled={isLocked} className="button button--small button--danger">Delete</button>
        </div>
      </div>
    </li>
  );
}
