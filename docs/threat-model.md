# Threat Model

## Assets

1. **Event Ingestion System**: Accepts agent activity events
2. **Policy Store**: Contains oversight policies
3. **Audit Trail**: Immutable record of decisions
4. **Agent Registry**: List of known and approved agents
5. **API Credentials**: Authentication and authorization tokens
6. **Configuration**: System settings and policy parameters

## Trust Boundaries

```
┌─────────────────────────────────────────┐
│         Internet / Untrusted            │
└────────────┬────────────────────────────┘
             │
    ┌────────▼─────────┐
    │  Kanshi API      │  ◄── TRUST BOUNDARY
    │  (Public)        │
    └────────┬─────────┘
             │
    ┌────────▼────────────────────┐
    │  Internal Kanshi Services    │  ◄── TRUST BOUNDARY
    │ (Worker, Policy Engine)      │
    └────────┬────────────────────┘
             │
    ┌────────▼─────────────────┐
    │  Persistence Layer (DB)   │
    │  State & Audit Trail      │
    └───────────────────────────┘
```

## Threats

### T1: Malicious Event Injection
**Description**: Attacker submits false or harmful events to the API
**Likelihood**: High (public API)
**Impact**: Audit corruption, false policy decisions
**Mitigation**: 
- Zod schema validation on all endpoints
- API authentication (API keys / OAuth2)
- Rate limiting
- Event signature verification (HMAC)

### T2: Unauthorized Agent Registration
**Description**: Attacker registers rogue agents
**Likelihood**: High
**Impact**: Unauthorized oversight bypass
**Mitigation**:
- Require approval workflow for agent registration
- Signed agent manifests
- Network isolation (private API if possible)

### T3: Policy Manipulation
**Description**: Attacker modifies or disables policies
**Likelihood**: Medium (requires API access)
**Impact**: Policies become ineffective
**Mitigation**:
- Role-based access control (RBAC)
- Policy version history
- Immutable audit trail of policy changes
- Policy diff review before deployment

### T4: Audit Trail Tampering
**Description**: Attacker modifies historical audit logs
**Likelihood**: Low (database access required)
**Impact**: Complete loss of audit integrity
**Mitigation**:
- Database access controls and encryption
- Append-only audit log implementation
- Cryptographic hashing of log entries
- Regular audit log backups and verification

### T5: Denial of Service
**Description**: Attacker floods API with requests
**Likelihood**: High
**Impact**: Service unavailability
**Mitigation**:
- Rate limiting per agent/API key
- Request validation and size limits
- DDoS protection (WAF, Cloud CDN)
- Horizontal scaling

### T6: Unauthorized Access to Decision APIs
**Description**: Attacker queries policy decisions or audit logs without permission
**Likelihood**: Medium
**Impact**: Information disclosure
**Mitigation**:
- Authentication on all endpoints
- Authorization checks (RBAC)
- Audit log access controls
- Encryption in transit (HTTPS/TLS)

### T7: Man-in-the-Middle Attack
**Description**: Attacker intercepts agent-to-API communication
**Likelihood**: Medium (depends on network)
**Impact**: Event tampering, credential theft
**Mitigation**:
- Enforce HTTPS/TLS
- Certificate pinning (for agent SDK)
- Signed requests

### T8: Worker Compromise
**Description**: Attacker compromises worker service
**Likelihood**: Low (internal network)
**Impact**: Policy evaluation bypass, false decisions
**Mitigation**:
- Least privilege deployment
- Signed code deployment
- Isolated container environments
- Regular security updates

### T9: Supply Chain Attack
**Description**: Attacker compromises npm dependencies
**Likelihood**: Low
**Impact**: Arbitrary code execution in all services
**Mitigation**:
- Lock exact dependency versions
- Regular `pnpm audit` checks (CI)
- Dependency review process
- Code signing for releases

### T10: Misconfiguration
**Description**: Insecure default settings in deployment
**Likelihood**: Medium
**Impact**: Various (depends on misconfiguration)
**Mitigation**:
- Security-focused defaults in code
- Deployment checklist / runbooks
- Infrastructure-as-Code with validation
- Security scanning in CI

## Assumptions

1. Agents are network-isolated from attacker-controlled systems
2. Database is deployed in a secure, access-controlled environment
3. API is deployed behind HTTPS and proper authentication
4. Operators follow deployment security hardening guides
5. Agents honestly report their own activity

## Out of Scope

- Compromising agent execution environments (not in scope: control plane does not own runtime)
- Securing cryptographic keys on agent machines (agents responsible)
- Protecting against compromised agents themselves (detection/audit only)
