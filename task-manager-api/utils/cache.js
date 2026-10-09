const NodeCache = require('node-cache');

// Practical 9: ONE shared cache instance for the server.
// useClones is true by default. We leave it true! This is safer than sharing references 
// because if we returned a direct reference to a cached array, modifying it later in a 
// controller would accidentally mutate the cache directly, leaking changes across requests.
const cache = new NodeCache({ 
  stdTTL: parseInt(process.env.CACHE_TTL, 10) || 60, 
  checkperiod: 120 
});

const isEnabled = () => process.env.CACHE_ENABLED !== 'false';

// Practical 9: CACHE KEYS MUST BE PER USER! 
// A single global key like "all_tasks" would serve User A's tasks to User B!
const getTasksAllKey = (userId) => `tasks:all:${userId}`;
const getTaskOneKey = (userId, taskId) => `task:${userId}:${taskId}`;

// Invalidation helper: called ONLY after a SUCCESSFUL database write.
const invalidateUserTasks = (userId, taskId = null) => {
  if (!isEnabled()) return;
  const keysToDelete = [getTasksAllKey(userId)];
  if (taskId) keysToDelete.push(getTaskOneKey(userId, taskId));
  
  cache.del(keysToDelete);
  
  if (process.env.LOG_CACHE === 'true') {
    console.log(`CACHE INVALIDATE [keys: ${keysToDelete.join(', ')}]`);
  }
};

const getCache = (key) => {
  if (!isEnabled()) return undefined;
  try {
    const val = cache.get(key);
    if (process.env.LOG_CACHE === 'true') {
      console.log(`CACHE ${val !== undefined ? 'HIT' : 'MISS'} [key: ${key}]`);
    }
    return val;
  } catch (err) {
    console.error("Cache get error:", err);
    return undefined; // Cache failures must never break a request
  }
};

const setCache = (key, val) => {
  if (!isEnabled()) return;
  try {
    cache.set(key, val);
  } catch (err) {
    console.error("Cache set error:", err);
  }
};

const getStats = () => cache.getStats();

module.exports = {
  getTasksAllKey,
  getTaskOneKey,
  invalidateUserTasks,
  getCache,
  setCache,
  getStats
};
