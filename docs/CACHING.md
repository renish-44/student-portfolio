# Server-Side Caching Measurements (Practical 9)

## 1. Measurement Procedure
To ensure accurate data:
1. Turn off caching by setting `CACHE_ENABLED=false` in `.env`.
2. Seed the database with 500 tasks: `node scripts/seed.js <YOUR_USER_ID> 500 --clear`
3. Restart the server (`npm run dev`).
4. **Warm-up**: Send a GET `/tasks` request in Postman. Discard this reading (it includes MongoDB connection overhead).
5. Record 5 readings using the Postman "Time" field.
6. Turn caching ON by setting `CACHE_ENABLED=true` in `.env` and restart the server.
7. Send GET `/tasks`. Record this as the **Cached MISS**.
8. Send GET `/tasks` 5 more times. Record these as the **Cached HITs**.

## 2. Benchmark Results

*(Note: The cells below marked `[fill in]` must be measured manually.)*

| Reading | Uncached (`CACHE_ENABLED=false`) | Cached MISS (`CACHE_ENABLED=true`) | Cached HIT (`CACHE_ENABLED=true`) |
| --- | --- | --- | --- |
| #1 | `[fill in]` ms | `[fill in]` ms | `[fill in]` ms |
| #2 | `[fill in]` ms | N/A | `[fill in]` ms |
| #3 | `[fill in]` ms | N/A | `[fill in]` ms |
| #4 | `[fill in]` ms | N/A | `[fill in]` ms |
| #5 | `[fill in]` ms | N/A | `[fill in]` ms |
| **Average** | **`[fill in]` ms** | **`[fill in]` ms** | **`[fill in]` ms** |

**Improvement % (Uncached Avg vs HIT Avg):** `[fill in]`%

## 3. TTL Experiment

**Procedure:** Edit `.env` to set `CACHE_TTL=30`, restart server. Fetch `/tasks` via Postman. Go to MongoDB Compass, change a task's title directly, and save. Rapidly fetch `/tasks` in Postman until you see the new title appear.

| CACHE_TTL | Observed Response Time | Observed Staleness (How long until change appeared) |
| --- | --- | --- |
| 5 seconds | `[fill in]` ms | `[fill in]` seconds |
| 30 seconds| `[fill in]` ms | `[fill in]` seconds |
| 60 seconds| `[fill in]` ms | `[fill in]` seconds |
| 300 seconds| `[fill in]` ms | `[fill in]` seconds |

## 4. Invalidation Proof

| Action | Request | Expected X-Cache Header | Resulting Data |
| --- | --- | --- | --- |
| 1. Read | GET `/tasks` | MISS | Array of N tasks |
| 2. Re-read| GET `/tasks` | HIT | Array of N tasks (instant) |
| 3. Write | POST `/tasks` | N/A (Status 201) | New task created |
| 4. Read | GET `/tasks` | MISS | Array of N+1 tasks (Fresh) |
| 5. Re-read| GET `/tasks` | HIT | Array of N+1 tasks |

## 5. Known Limitations
1. **Wiped on Restart:** In-memory cache lives in the Node.js process RAM. If the server crashes or restarts, all cache is lost, causing a stampede to the database.
2. **Multi-Instance Breakage:** If we deploy this API to three servers (Instances A, B, and C) behind a load balancer, `node-cache` breaks data integrity. If a user POSTs a task, Instance A invalidates its cache. But Instances B and C still have the old cache in *their* memory. The user will randomly see stale data depending on which server handles their next GET request. 
   - **The Fix:** We must transition to a distributed cache (like **Redis**), where all three instances share a single external memory store.
3. **Memory Growth & Per-User Keys:** Because we create separate keys per user (e.g., `tasks:all:USER_A`), 10,000 active users means 10,000 cache entries. Unbounded cache growth can crash the Node process with Out-Of-Memory (OOM) errors.
