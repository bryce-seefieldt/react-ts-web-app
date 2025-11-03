# React TypeScript Web App

A modern React + TypeScript web application built with Vite.

[![CI](https://github.com/bryce-seefieldt/react-ts-web-app/actions/workflows/ci.yml/badge.svg)](https://github.com/bryce-seefieldt/react-ts-web-app/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bryce-seefieldt/react-ts-web-app/branch/main/graph/badge.svg)](https://codecov.io/gh/bryce-seefieldt/react-ts-web-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/YOUR_REPO_ID/maintainability)](https://codeclimate.com/github/bryce-seefieldt/react-ts-web-app)

## Features

- ⚡️ Vite for fast development and builds
- ⚛️ React 19 with TypeScript
- 🧪 Vitest + React Testing Library
- 📝 ESLint + Prettier for code quality
- 🪝 Git hooks with Husky and lint-staged

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run preview` - Preview production build locally

## Development

### Git Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and commit using conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

3. Push changes and create a pull request

### Code Quality

#### Testing and Coverage

This project maintains 100% test coverage using Vitest and React Testing Library. Coverage reports are automatically generated and tracked in multiple locations.

**Running Tests Locally:**

```bash
# Run tests in watch mode
npm test

# Run tests with coverage report
npm run test:coverage
```

**Accessing Coverage Reports:**

1. **Local Development:**
   - Run `npm run test:coverage`
   - Reports are generated in the `coverage/` directory (gitignored)
   - Open `coverage/index.html` in your browser for detailed report

2. **Pull Requests:**
   - Codecov bot comments on PRs with coverage changes
   - Inline coverage feedback on changed files
   - Coverage diff summary automatically added

3. **CI/CD Pipeline:**
   - Coverage reports uploaded as CI artifacts
   - Available in GitHub Actions for 14 days
   - Path: Actions → CI workflow → Artifacts → code-coverage-report

4. **Codecov Dashboard:**
   - Permanent coverage history at [codecov.io](https://codecov.io/gh/bryce-seefieldt/react-ts-web-app)
   - Coverage trends and file-by-file analysis
   - Coverage badge in README shows current status

**Coverage Requirements:**
- 100% Statements
- 100% Branches
- 100% Functions
- 100% Lines

> Note: Coverage directory is intentionally ignored in git. Reports are generated during CI and available through the channels above.

#### Code Style

- ESLint and Prettier run automatically on commit
- Tests must pass before merge
- Follow TypeScript best practices
- Use React hooks guidelines

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── hooks/         # Custom React hooks
  ├── utils/         # Utility functions
  ├── types/         # TypeScript types/interfaces
  ├── tests/         # Test files
  └── main.tsx       # App entry point
```

## Contributing

Please see our [Contributing Guidelines](./CONTRIBUTING.md) for detailed information about:
- Development workflow
- Test coverage requirements
- Writing tests
- Pull request process
- Code style guidelines

We maintain strict 100% test coverage requirements and have a structured contribution process to ensure high code quality.

## License

[LICENSE](./LICENSE)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
