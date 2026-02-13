# @kanshi/ui

Shared React components for Kanshi OS.

Provides common UI components used across the monorepo.

## Installation

```bash
pnpm add @kanshi/ui react react-dom
```

## Components

### Divider

Horizontal divider line.

```tsx
import { Divider } from '@kanshi/ui';

export function MyComponent() {
  return (
    <div>
      <h2>Section 1</h2>
      <Divider />
      <h2>Section 2</h2>
    </div>
  );
}
```

### Card

Container component for grouping content.

```tsx
import { Card } from '@kanshi/ui';

export function Status() {
  return (
    <Card title="System Status">
      <p>Everything is working normally.</p>
    </Card>
  );
}
```

### Badge

Status badges and labels.

```tsx
import { Badge } from '@kanshi/ui';

export function Agent() {
  return (
    <div>
      <h3>Agent Status</h3>
      <Badge variant="success">Active</Badge>
    </div>
  );
}
```
