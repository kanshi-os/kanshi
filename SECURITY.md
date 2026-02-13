# Security Policy

## Reporting a Vulnerability

Kanshi OS takes security seriously. If you discover a security vulnerability, please email **security@kanshi-os.dev** instead of using the public issue tracker.

### Disclosure Timeline
- **Day 0**: Report received and acknowledged
- **Day 1**: Initial assessment
- **Day 7**: Expected fix availability
- **Day 14**: Public disclosure (vulnerability + fix released)

We appreciate your responsible disclosure and will acknowledge your contribution when appropriate.

## Security Practices

- All dependencies are regularly audited via `pnpm audit`
- CodeQL analysis runs on all pull requests
- Commits are encouraged to be signed with GPG
- Security headers are enforced in all deployments
- No secrets or credentials are stored in version control (use environment variables)

## Known Limitations

- This is a control plane only; it does not execute agent code
- Kanshi does not manage cryptographic keys or credentials
- Access to the API should be restricted at the network level
- Policy evaluation is deterministic but not cryptographically proven

## Audits

Security audits are conducted periodically. For audit reports and compliance information, please contact security@kanshi-os.dev.
