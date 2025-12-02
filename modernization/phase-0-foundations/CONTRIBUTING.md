# Contributing to Donatale

Thank you for your interest in contributing to Donatale! This document provides
guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Setup

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/your-username/donatale-app.git
   cd donatale-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your DatoCMS tokens and other secrets
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Verify the setup**
   - Open http://localhost:4321
   - Ensure the page loads without errors

## Development Workflow

### Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `modernization/*`: Modernization phase branches

### Creating a Feature Branch

```bash
# From develop branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Code Style**
   - Follow the existing code style
   - Use TypeScript for all new code
   - Add comments for complex logic

2. **Testing**
   - Add tests for new functionality
   - Ensure existing tests pass
   - Test manually in the browser

3. **Commits**
   - Use clear, descriptive commit messages
   - Follow conventional commit format:
     ```
     type(scope): description
     ```

### Pull Request Process

1. **Update Documentation**
   - Update README if needed
   - Add inline comments for complex changes

2. **Run Quality Checks**

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

3. **Create Pull Request**
   - Target `develop` branch (unless it's a hotfix)
   - Fill out the PR template completely
   - Request review from maintainers

## Code Style Guidelines

### TypeScript/Astro

- Use TypeScript for all logic
- Prefer explicit types over `any`
- Follow existing naming conventions
- Use meaningful variable and function names

### CSS/Tailwind

- Use Tailwind utility classes
- Avoid custom CSS when possible
- Follow mobile-first responsive design
- Use semantic HTML elements

### File Organization

- Keep components in their respective folders
- Use index.ts for barrel exports
- Separate concerns (logic, styles, markup)

## PR Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-review of the code
- [ ] Code passes all automated checks
- [ ] Added or updated documentation
- [ ] Tests pass and cover new functionality

### PR Template

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Getting Help

- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Maintainers**: Tag maintainers in PRs for review

## Release Process

Releases are managed by project maintainers:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Deploy to production

Thank you for contributing to Donatale! 🎉
