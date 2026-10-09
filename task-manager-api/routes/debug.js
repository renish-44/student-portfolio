const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getStats } = require('../utils/cache');

// Practical 9: Debug endpoint to verify cache hit rates
// Why must this be protected? Revealing internal memory stats, hit ratios, or key 
// counts provides attackers with reconnaissance data about your server's load.
router.get('/cache-stats', protect, (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Debug endpoints disabled in production' });
  }

  const stats = getStats();
  const total = stats.hits + stats.misses;
  const hitRatio = total === 0 ? 0 : ((stats.hits / total) * 100).toFixed(2);

  // We expose counters, but NEVER the actual cached task contents
  res.status(200).json({
    success: true,
    data: {
      hits: stats.hits,
      misses: stats.misses,
      hitRatio: `${hitRatio}%`,
      keys: stats.keys
    }
  });
});

module.exports = router;
