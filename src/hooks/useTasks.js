import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/api';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchTasks = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTasks(signal);
      setTasks(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchTasks(controller.signal);
    return () => controller.abort();
  }, [fetchTasks, retryCount]);

  const handleRetry = () => setRetryCount(c => c + 1);

  const addTask = async (taskData) => {
    const tempId = `temp-${Date.now()}`;
    const tempTask = { ...taskData, _id: tempId, isSaving: true, createdAt: new Date().toISOString() };
    setTasks(prev => [...prev, tempTask]);

    try {
      const savedTask = await api.createTask(taskData);
      setTasks(prev => prev.map(t => (t._id === tempId ? savedTask : t)));
      return { success: true };
    } catch (err) {
      setTasks(prev => prev.filter(t => t._id !== tempId));
      return { success: false, error: err.message };
    }
  };

  const editTask = async (id, updates) => {
    try {
      const updatedTask = await api.updateTask(id, updates);
      setTasks(prev => prev.map(t => (t._id === id ? updatedTask : t)));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { tasks, loading, error, handleRetry, addTask, editTask, removeTask };
}
