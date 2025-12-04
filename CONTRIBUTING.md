# Contributing to Donatale per Gaza

Thank you for your interest in contributing to Donatale per Gaza! This document provides
guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Git

### Setup

1. **Fork repository**

   ```bash
   # Fork the repository at: https://github.com/naufraghi/datocms-donatale-per-gaza
   # Then clone your fork
   git clone https://github.com/your-username/datocms-donatale-per-gaza.git
   cd datocms-donatale-per-gaza
   ```

2. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/naufraghi/datocms-donatale-per-gaza.git
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your DatoCMS tokens and other secrets
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Verify setup**
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
git pull upstream develop
git checkout -b feature/your-feature-name
```

### Syncing with Upstream

```bash
# Keep your fork up-to-date with upstream
git checkout main
git pull upstream main
git checkout develop
git pull upstream develop
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

- **Issues**: Open an issue for bugs or feature requests at [naufraghi/datocms-donatale-per-gaza/issues](https://github.com/naufraghi/datocms-donatale-per-gaza/issues)
- **Discussions**: Use GitHub Discussions for questions at [naufraghi/datocms-donatale-per-gaza/discussions](https://github.com/naufraghi/datocms-donatale-per-gaza/discussions)
- **Maintainers**: Tag @naufraghi in PRs for review

## Project-Specific Guidelines

### Donatale per Gaza Context

This is a donation platform for families in need. When contributing:

- Keep the user interface simple and accessible
- Ensure all text is in Italian as specified in requirements
- Test donation flow thoroughly
- Consider mobile-first design for accessibility
- Be mindful of the sensitive nature of donation processing

### Content Management

- All content is managed through DatoCMS
- Do not hardcode donation items or family information
- Use GraphQL queries to fetch dynamic content
- Test with both draft and published content modes

## Release Process

Releases are managed by project maintainers:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Deploy to Netlify production

Thank you for contributing to Donatale per Gaza! 🎉

---

## Project Links

- **Repository**: https://github.com/naufraghi/datocms-donatale-per-gaza
- **Live Site**: https://donatale-per-gaza.netlify.app/
- **Issues**: https://github.com/naufraghi/datocms-donatale-per-gaza/issues
- **Discussions**: https://github.com/naufraghi/datocms-donatale-per-gaza/discussions
