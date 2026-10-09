# Performance Measurement & Optimization (Practical 8)

## 1. Before/After Comparison Table

*(Note: The "After" values must be filled in manually by running the measurement procedure below. Do NOT invent numbers.)*

| Metric | Before (Baseline) | After (Lazy Loading) |
| --- | --- | --- |
| **Initial JS Size (raw)** | [x kB] | `[fill in]` kB |
| **Initial JS Size (gzip)** | [x kB] | `[fill in]` kB |
| **Number of JS Chunks** | [x] | `[fill in]` |
| **Initial Requests** | [n] | `[fill in]` |
| **Total JS Transferred (First Load)** | [x kB] | `[fill in]` kB |
| **DOMContentLoaded Time** | [x ms] | `[fill in]` ms |
| **Load Time** | [x ms] | `[fill in]` ms |
| **JS downloaded on `/projects`** | `N/A` (all in initial load) | `[fill in]` kB |
| **JS downloaded on `/contact`** | `N/A` (all in initial load) | `[fill in]` kB |

## 2. Measurement Procedure

To get accurate numbers for the "After" column, follow these exact steps:

1. **Build the Production App:** 
   Run `npm run build`. Note the chunk file names, raw sizes, and gzip sizes printed in the terminal. Count the total number of `.js` chunks outputted.
2. **Start the Production Server:** 
   Run `npm run preview`.
3. **Open DevTools:** 
   Open your browser to `http://localhost:4173`. Open Developer Tools (F12) and go to the **Network** tab.
4. **Configure Throttling:** 
   Check the "Disable cache" box. Change the throttling profile to "Slow 3G".
5. **Run the Test:** 
   Perform a hard reload (`Ctrl+Shift+R` or `Cmd+Shift+R`). 
6. **Record the Data:** 
   Look at the bottom status bar of the Network tab to find:
   - "X requests" (Initial Requests)
   - "X kB transferred" (Total JS Transferred)
   - "DOMContentLoaded: X ms"
   - "Load: X ms"
7. **Test Navigation:** 
   Clear the Network tab (the "no symbol" icon). Click the "Tasks" link to go to `/projects`. Note the new `.js` file request and record its size.
8. **Average It Out:** 
   Run steps 5-6 three times and average the DOMContentLoaded and Load times to account for local CPU variance.

## 3. When NOT to use Lazy Loading
While route-based lazy loading is excellent for large apps, it should **not** be used when:
1. **The app is very small:** If the total uncompressed JS is under ~200kb, the overhead of making extra HTTP requests for chunks outweighs the parsing savings.
2. **Above-the-fold content:** The initial landing page (`Home.jsx`) or the NavBar should never be lazy-loaded, as it causes an immediate visible delay and layout shift for every new visitor.
3. **Components are tiny:** Extracting a 2kb component into its own chunk wastes bandwidth on HTTP request overhead.
