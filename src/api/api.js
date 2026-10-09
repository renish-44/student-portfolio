const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

let currentToken = null;
export const setAuthToken = (token) => { currentToken = token; };

export let onUnauthorized = () => {}; 
export const setUnauthorizedCallback = (cb) => { onUnauthorized = cb; };

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = { ...options.headers };

  if (options.method === 'POST' || options.method === 'PUT') {
    headers['Content-Type'] = 'application/json';
  }

  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });
    const json = await response.json();

    if (!response.ok || !json.success) {
      if (response.status === 401 && endpoint !== '/auth/login') {
        onUnauthorized();
      }
      const errorMsg = json.error || 'An unexpected error occurred';
      const details = json.details ? ` (${json.details.map(d => d.message).join(', ')})` : '';
      throw new Error(`${errorMsg}${details}`);
    }
    return json.data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Cannot reach the server. Is the backend running?');
    }
    throw error;
  }
};

export const register = (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
export const login = (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) });
export const getMe = () => request('/auth/me');

export const getTasks = (signal) => request('/tasks', { signal });
export const getTask = (id, signal) => request(`/tasks/${id}`, { signal });
export const createTask = (taskData) => request('/tasks', { method: 'POST', body: JSON.stringify(taskData) });
export const updateTask = (id, taskData) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(taskData) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
