import { useState, lazy, Suspense } from 'react';
import SectionWrapper from './SectionWrapper.jsx';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import ToastContainer from './ToastContainer.jsx';
import { useTasks } from '../hooks/useTasks';
import './Projects.css';

// Practical 8: Lazily load the heavy charting library ONLY when requested
const LazyTaskStats = lazy(() => import('./TaskStats.jsx'));

function Projects() {
  const { tasks, loading, error, handleRetry, addTask, editTask, removeTask } = useTasks();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showStats, setShowStats] = useState(false);

  const [confirmState, setConfirmState] = useState({ isOpen: false, task: null, onConfirm: null });
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type) => setToasts(prev => [...prev, { id: Date.now(), message, type }]);
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleAddTask = async (t) => { const r = await addTask(t); if(r.success) addToast('Success', 'success'); else addToast(r.error, 'error'); return r; };
  const handleUpdateTask = async (id, u) => { const r = await editTask(id, u); if(r.success) addToast('Updated', 'success'); else addToast(r.error, 'error'); return r; };
  const handleDeleteTask = async (id) => { const r = await removeTask(id); if(r.success) addToast('Deleted', 'success'); else addToast(r.error, 'error'); setConfirmState({isOpen:false}); };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompleted = filterCompleted === 'all' ? true : filterCompleted === 'completed' ? task.completed : !task.completed;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesCompleted && matchesPriority;
  });

  return (
    <SectionWrapper id="projects" title="Task Manager" subtitle="Full Stack MongoDB Integration" titleTag="h1">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button className="button" onClick={() => setShowStats(!showStats)}>
          {showStats ? 'Hide Statistics' : 'Show Statistics'}
        </button>
      </div>

      {showStats && (
        <div style={{ marginBottom: '2rem' }}>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}><Spinner /></div>}>
            <LazyTaskStats tasks={tasks} />
          </Suspense>
        </div>
      )}

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
           {loading ? <Spinner /> : error ? <ErrorMessage message={error} onRetry={handleRetry} /> : <TaskList tasks={filteredTasks} onUpdate={handleUpdateTask} onDeleteRequest={(t, cb) => setConfirmState({isOpen: true, task: t, onConfirm: cb})} />}
        </main>
      </div>

      {confirmState.isOpen && <ConfirmDialog message={`Delete "${confirmState.task?.title}"?`} onConfirm={confirmState.onConfirm} onCancel={() => setConfirmState({ isOpen: false })} />}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </SectionWrapper>
  );
}

export default Projects;
