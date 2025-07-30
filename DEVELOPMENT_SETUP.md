# Development Setup

This document describes the development environment setup for the Spikerz Dashboard Angular application.

## Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher)
- Angular CLI (v19.x)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd spikerz-dashboard
```

2. Install dependencies:

```bash
npm install
```

## Development Tools

### ESLint

ESLint is configured with Angular-specific rules and TypeScript support.

- **Configuration**: `eslint.config.js`
- **Run linting**: `npm run lint`
- **Auto-fix issues**: `npm run lint:fix`

### Prettier

Prettier is configured for consistent code formatting.

- **Configuration**: `.prettierrc`
- **Format code**: `npm run format`
- **Check formatting**: `npm run format:check`

### Husky & lint-staged

Git hooks are configured to run linting and formatting on staged files before commits.

- **Pre-commit hook**: `.husky/pre-commit`
- **Configuration**: `package.json` (lint-staged section)

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## VS Code Setup

The project includes VS Code configuration for consistent development experience:

- **Settings**: `.vscode/settings.json`
- **Extensions**: `.vscode/extensions.json`

### Recommended Extensions

- Angular Language Service
- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag
- Path Intellisense

## Code Style

### TypeScript

- Use interfaces for object types (prefixed with 'I')
- Use types for unions/complex types (prefixed with 'T')
- Use enums for constants (prefixed with 'E')
- Strict TypeScript configuration enabled

### Angular

- Component selectors use kebab-case with 'app' prefix
- Directive selectors use camelCase with 'app' prefix
- Functional components with hooks
- SCSS with BEM methodology

### Formatting

- Tab width: 2 spaces
- Use tabs for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas
- Max line length: 100 characters

## Git Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Stage your files: `git add .`
4. Commit: `git commit -m "feat: your commit message"`
5. Push: `git push origin your-branch`
6. Create a pull request

The pre-commit hook will automatically:

- Run ESLint on staged files
- Format code with Prettier
- Prevent commit if there are linting errors

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on:

- Push to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

### Pipeline Steps

1. **Lint and Test** (Node 18.x and 20.x)
   - Install dependencies
   - Run ESLint
   - Check Prettier formatting
   - Run tests with coverage
   - Upload coverage reports

2. **Build** (Node 20.x)
   - Install dependencies
   - Build application
   - Upload build artifacts

## Troubleshooting

### ESLint Issues

If you encounter ESLint configuration issues:

1. Check that all dependencies are installed
2. Verify the `eslint.config.js` file exists
3. Run `npm run lint:fix` to auto-fix issues

### Prettier Issues

If formatting is inconsistent:

1. Run `npm run format` to format all files
2. Check `.prettierrc` configuration
3. Ensure VS Code is using Prettier as default formatter

### Build Issues

If the build fails:

1. Run `npm run lint` to check for linting errors
2. Run `npm run format:check` to check formatting
3. Fix any issues before building

## Contributing

1. Follow the code style guidelines
2. Write meaningful commit messages
3. Ensure all tests pass
4. Update documentation as needed
5. Follow the Git workflow

## Support

For issues with the development setup:

1. Check this documentation
2. Review the configuration files
3. Check the GitHub Actions logs
4. Create an issue in the repository
