# Suggested Commands

## Development
```bash
cd C:\Users\Dell\.claude\The-Pivot

# Start dev server (already running on port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
eslint
```

## Notes
- Dev server currently runs on **http://localhost:3001** (PID 2024)
- Uses Turbopack (next dev default in Next.js 16)
- Windows system — use `taskkill /PID 2024 /F` to stop the server

## Graphify
```bash
graphify update .         # update code graph (no LLM)
graphify query "question" # query the graph
graphify explain "Node"   # explain a node
graphify path "A" "B"     # find path between nodes
```
