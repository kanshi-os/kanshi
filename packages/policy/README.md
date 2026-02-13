# @kanshi/policy

Policy evaluation engine for Kanshi OS.

Evaluates agent events against configurable policies and returns decisions.

## Installation

```bash
pnpm add @kanshi/policy
```

## Usage

```typescript
import { evaluatePolicy, computeRiskScore } from '@kanshi/policy';
import type { AgentEvent } from '@kanshi/types';

const event: AgentEvent = {
  agentId: 'agent-001',
  eventType: 'tool_call',
  payload: { tool: 'web_search' },
};

const result = evaluatePolicy(event);
console.log(result); // { allowed: true, decision: 'allow', riskScore: 15, ... }

const score = computeRiskScore(event);
console.log(score); // 0-100 risk score
```

## Decision Types

- `allow`: Event is acceptable
- `deny`: Event is not allowed
- `review`: Event requires human review
