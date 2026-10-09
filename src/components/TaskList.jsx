import TaskItem from './TaskItem.jsx';
import './TaskList.css';

export default function TaskList({ tasks, onUpdate, onDeleteRequest }) {
  if (tasks.length === 0) return <p className="task-list__empty">No tasks match your filters.</p>;
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} onConfirmDelete={onDeleteRequest} />
      ))}
    </ul>
  );
}
