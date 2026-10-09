import { useState } from 'react';
import SectionWrapper from './SectionWrapper.jsx';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import ToastContainer from './ToastContainer.jsx';
import { useTasks } from '../hooks/useTasks';
import './Projects.css';

function Projects() {
  const { tasks, loading, error, handleRetry, addTask, editTask, removeTask } = useTasks();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const [confirmState, setConfirmState] = useState({ isOpen: false, task: null, onConfirm: null });
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleAddTask = async (taskData) => {
    const res = await addTask(taskData);
    if (res.success) addToast('Task created successfully!', 'success');
    else addToast(`Failed to create task: ${res.error}`, 'error');
    return res;
  };

  const handleUpdateTask = async (id, updates) => {
    const res = await editTask(id, updates);
    if (res.success) addToast('Task updated.', 'success');
    else addToast(`Failed to update task: ${res.error}`, 'error');
    return res;
  };

  const handleDeleteTask = async (id) => {
    const res = await removeTask(id);
    if (res.success) addToast('Task deleted.', 'success');
    else addToast(`Failed to delete task: ${res.error}`, 'error');
    setConfirmState({ isOpen: false, task: null, onConfirm: null });
  };

  const requestDelete = (task, confirmCallback) => {
    setConfirmState({ isOpen: true, task, onConfirm: confirmCallback });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompleted = filterCompleted === 'all' 
      ? true 
      : filterCompleted === 'completed' ? task.completed : !task.completed;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesCompleted && matchesPriority;
  });

  return (
    <SectionWrapper id="projects" title="Task Manager" subtitle="Full Stack MongoDB Integration" titleTag="h1">
      <div className="projects__layout">
        <aside className="projects__sidebar">
          <TaskForm onSubmit={handleAddTask} />
        </aside>

        <main className="projects__content">
          <div className="projects__filters">
            <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..." className="projects__filter-input" />
            <select value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)} className="projects__filter-select">
              <option value="all">All Status</option><option value="active">Active</option><option value="completed">Completed</option>
            </select>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="projects__filter-select">
              <option value="all">All Priorities</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
            </select>
          </div>
          {loading ? <Spinner /> : error ? <ErrorMessage message={error} onRetry={handleRetry} /> : <TaskList tasks={filteredTasks} onUpdate={handleUpdateTask} onDeleteRequest={requestDelete} />}
        </main>
      </div>
      {confirmState.isOpen && <ConfirmDialog message={`Are you sure you want to delete "${confirmState.task?.title}"?`} onConfirm={confirmState.onConfirm} onCancel={() => setConfirmState({ isOpen: false, task: null, onConfirm: null })} />}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </SectionWrapper>
  );
}

export default Projects;
