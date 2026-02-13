# @kanshi/web

Kanshi OS dashboard built with Next.js.

## Features

- Agent monitoring and feed
- System status overview
- Event tracking
- Policy decision visualization
- Terminal-like minimal UI

## Getting Started

```bash
pnpm install
pnpm --filter web dev
```

Dashboard will be available at `http://localhost:3001`

## Building

```bash
pnpm --filter web build
pnpm --filter web start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Kanshi API URL (default: http://localhost:3000)
