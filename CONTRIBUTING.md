
# Contributing to Fake News Detector

Thank you for your interest in contributing to the Bullshit Detector project! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community](#community)

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git for version control
- A code editor (VSCode recommended)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bullshit-detector.git
   cd bullshit-detector
   ```

3. **Add the original repository as upstream**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/bullshit-detector.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Fix issues in existing functionality
- **Feature additions** - Add new capabilities
- **Documentation** - Improve or add documentation
- **UI/UX improvements** - Enhance user experience
- **Performance optimizations** - Make the app faster
- **Accessibility improvements** - Make the app more accessible
- **Translations** - Add support for new languages
- **Testing** - Add or improve tests

### Areas for Contribution

#### High Priority
- **Analysis Algorithm Improvements**: Enhance the bullshit detection logic
- **Language Support**: Add new languages beyond English and German
- **Performance Optimization**: Improve loading times and responsiveness
- **Accessibility**: Ensure WCAG compliance
- **Mobile Experience**: Optimize for mobile devices

#### Medium Priority
- **UI/UX Enhancements**: Improve visual design and user flow
- **Error Handling**: Better error messages and recovery
- **Content Source Expansion**: Support more types of content
- **Analytics Integration**: Add usage tracking (privacy-preserving)

#### Nice to Have
- **Browser Extension**: Create browser extension version
- **API Development**: Extract core logic into reusable APIs
- **Advance Analytics**: More sophisticated analysis methods

## Code Style

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type; use proper typing
- Use meaningful variable and function names

### React Guidelines

- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for performance optimization when needed
- Follow React best practices for state management

### CSS/Styling Guidelines

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use shadcn/ui components when possible

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── [ComponentName].tsx
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── lib/                # Third-party configurations
```

### Naming Conventions

- **Components**: PascalCase (`BullshitDetector.tsx`)
- **Hooks**: camelCase starting with "use" (`useAnalysis.ts`)
- **Utilities**: camelCase (`contentAnalyzer.ts`)
- **Types**: PascalCase (`AnalysisResult`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_CONTENT_LENGTH`)

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write unit tests for utility functions
- Test React components with React Testing Library
- Include edge cases and error scenarios
- Maintain good test coverage (aim for >80%)

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interactions', () => {
    // Test implementation
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Ensure your code follows the style guidelines**
2. **Add or update tests** for your changes
3. **Update documentation** if necessary
4. **Commit your changes** with descriptive messages:
   ```bash
   git commit -m "feat: add new analysis algorithm"
   git commit -m "fix: resolve mobile responsive issue"
   git commit -m "docs: update API documentation"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Commit Message Format

Use conventional commits format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Pull Request Template

When creating a pull request, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots (if applicable)

## Additional Notes
```

## Issue Reporting

### Bug Reports

When reporting bugs, include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details** (browser, OS, etc.)
5. **Screenshots or videos** if helpful
6. **Console errors** if any

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 120]
- OS: [e.g. macOS 14]
- Version: [e.g. 1.0.0]
```

## Feature Requests

### Proposing New Features

1. **Check existing issues** to avoid duplicates
2. **Create detailed proposal** explaining:
   - Problem it solves
   - Proposed solution
   - Alternative solutions considered
   - Implementation details (if known)

3. **Discuss before implementing** large features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Code Reviews**: Feedback on pull requests

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Follow the project's goals and vision

### Getting Help

If you need help:

1. Check the [Developer Documentation](DEVELOPER.md)
2. Search existing GitHub issues
3. Create a new issue with your question
4. Tag maintainers if urgent

## Recognition

Contributors are recognized through:

- GitHub contributor graphs
- Release notes mentions
- Contributors section in README
- Special thanks for significant contributions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to making the internet a more trustworthy place! 🚀
