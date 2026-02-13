# ADR 0001: Control Plane, Not Runtime

**Date**: 2026-02-13
**Status**: Accepted
**Author**: Kanshi Team

## Context

There are multiple architectural approaches to agent oversight:

1. **Runtime Model**: Embed oversight within the agent execution environment (containers, VMs)
2. **Control Plane Model**: External event-driven oversight with no runtime custody
3. **Hybrid Model**: Combination of both

## Decision

We implement a **Control Plane Model**.

## Rationale

### Advantages of Control Plane Model

- **Decoupling**: Agents and oversight are independent systems
  - Agents can use any language, framework, or runtime
  - Agents are not blocked waiting for oversight decisions
  - Oversight can be upgraded without redeploying agents

- **Simplicity**: No requirement to inject runtime hooks or modify agent code
  - Reduced cognitive load for agent developers
  - Easier to test agents in isolation
  - Can work with legacy or closed-source agent implementations

- **Auditability**: All decisions are recorded externally
  - Agents cannot manipulate audit logs
  - Decisions are attributed to the control plane
  - Complete record exists regardless of agent behavior

- **Scalability**: Distributed, stateless design
  - Add oversight capacity independently of agent capacity
  - Agents don't pay cost of complex oversight during execution
  - Asynchronous policy evaluation doesn't block agent progress

### Constraints of This Model

- **Event Lag**: Oversight decisions may arrive after agent action
  - Suitable for auditing, not real-time prevention
  - Requires agents to periodically poll control plane for policy changes

- **Cannot Prevent**: Control plane cannot prevent agent execution
  - Agents must choose to respect oversight
  - Agents must proactively check policies
  - Suitable for cooperative scenarios or network-enforced compliance

- **Event Integrity Depends on Agent**: Agents must honestly report events
  - Relies on secure logging and transport

## Implications

1. **Policy Evaluation**: Happens asynchronously, not inline with agent execution
2. **Agent Design**: Agents query the control plane for policies, or control plane notifies agents of policy changes
3. **Audit-First**: Primary value is in audit trail and post-hoc analysis
4. **Metrics**: Focus on anomaly detection and trend analysis, not real-time blocking

## Alternatives Considered

### Runtime Model (Rejected)
**Pros**: Can prevent bad actions before they occur
**Cons**: Agents must be instrumented; tight coupling; introduces latency; complex to deploy

### Hybrid Model (Rejected for MVP)
**Pros**: Combines benefits of both
**Cons**: Significantly increases complexity; requires buy-in from both agent and control plane teams

## Related ADRs

- ADR 0002: Event-Driven Architecture (TBD)
- ADR 0003: Policy Evaluation Patterns (TBD)
