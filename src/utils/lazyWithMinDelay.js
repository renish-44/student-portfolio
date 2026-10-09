import { lazy } from 'react';

// Practical 8: Resolves the import only after both the chunk has loaded AND 
// at least 300ms have passed. This prevents the fallback spinner from flashing 
// for a split-second on fast connections.
// Note: This deliberately adds latency on fast connections (the trade-off).
export function lazyWithMinDelay(importFn, delayMs = 300) {
  return lazy(() => {
    return Promise.all([
      importFn(),
      new Promise(resolve => setTimeout(resolve, delayMs))
    ]).then(([moduleExports]) => moduleExports);
  });
}
