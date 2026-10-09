const Task = require('../models/Task');
const { getTasksAllKey, getTaskOneKey, invalidateUserTasks, getCache, setCache } = require('../utils/cache');

const getAllTasks = async (req, res, next) => {
  try {
    const key = getTasksAllKey(req.user.id);
    const cachedData = getCache(key);

    if (cachedData !== undefined) {
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json({ success: true, data: cachedData });
    }

    res.setHeader('X-Cache', 'MISS');
    
    // Practical 9: .lean() is an optional query optimization.
    const tasks = await Task.find({ user: req.user.id }).lean();
    
    setCache(key, tasks);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const key = getTaskOneKey(req.user.id, req.params.id);
    const cachedData = getCache(key);

    if (cachedData !== undefined) {
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json({ success: true, data: cachedData });
    }

    res.setHeader('X-Cache', 'MISS');
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id }).lean();
    
    if (!task) {
      // 404s are NOT cached
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    setCache(key, task);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const taskData = { ...req.body, user: req.user.id };
    const newTask = await Task.create(taskData);
    
    // Practical 9: Invalidate after SUCCESSFUL write only
    invalidateUserTasks(req.user.id);
    
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    ).lean();
    
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    invalidateUserTasks(req.user.id, req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id }).lean();
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    invalidateUserTasks(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: 'Task successfully deleted', data: task });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
