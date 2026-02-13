# Contributing to Kanshi OS

Thank you for your interest in contributing to Kanshi OS! This document outlines our process and guidelines.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/kanshi.git`
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Install dependencies: `pnpm install`

## Development Workflow

### Code Style

- Use TypeScript with strict mode enabled
- Follow the included ESLint and Prettier configurations
- Run `pnpm format` before committing
- Run `pnpm lint` to catch issues early

### Testing

- Write tests for all new features
- Ensure all tests pass: `pnpm test`
- Aim for >80% code coverage in packages

### Commits

- Use clear, descriptive commit messages
- Reference issues when applicable: `fix #123`
- Keep commits focused and atomic
- Sign commits when possible: `git commit -S`

## Pull Request Process

1. Create a pull request from your feature branch
2. Ensure all CI checks pass
3. Request review from maintainers
4. Address feedback and push updates
5. Once approved, squash and merge to main

## Package-Specific Guidelines

### apps/api
- Add OpenAPI documentation for new endpoints
- Include both happy path and error tests
- Validate all input with Zod schemas

### apps/web
- Use React best practices and hooks
- Keep components small and composable
- Test user-facing changes

### packages/types
- Maintain backward compatibility
- Update version when adding new types
- Document complex types

### packages/policy
- Test edge cases thoroughly
- Document policy decision logic
- Include examples in comments

## Questions?

- Open a discussion for design questions
- Check existing issues before creating duplicates
- Ask on GitHub Discussions for help

## Code of Conduct

By contributing, you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).
