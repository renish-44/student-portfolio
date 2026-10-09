const express = require('express');
const router = express.Router();
const requireJson = require('../middleware/requireJson');
const validateTaskId = require('../middleware/validateTaskId');
const { validateTask } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// Practical 7: Protect ALL task routes
router.use(protect);

router.get('/', getAllTasks);
router.post('/', requireJson, validateTask, createTask);
router.get('/:id', validateTaskId, getTaskById);
router.put('/:id', validateTaskId, requireJson, validateTask, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

module.exports = router;
