const express = require('express');
const router = express.Router();
const requireJson = require('../middleware/requireJson');
const validateTaskId = require('../middleware/validateTaskId');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', requireJson, createTask);

// Practical 5: Implement GET /tasks/:id
router.get('/:id', validateTaskId, getTaskById);
router.put('/:id', validateTaskId, requireJson, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

module.exports = router;
