# React TypeScript Web App

A modern React + TypeScript web application built with Vite.

[![CI](https://github.com/bryce-seefieldt/react-ts-web-app/actions/workflows/ci.yml/badge.svg)](https://github.com/bryce-seefieldt/react-ts-web-app/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bryce-seefieldt/react-ts-web-app/branch/main/graph/badge.svg)](https://codecov.io/gh/bryce-seefieldt/react-ts-web-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/YOUR_REPO_ID/maintainability)](https://codeclimate.com/github/bryce-seefieldt/react-ts-web-app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

## Features

- ⚡️ Vite for fast development and builds
- ⚛️ React 19 with TypeScript
- 🧪 Vitest + React Testing Library
- 📝 ESLint + Prettier for code quality
- 🪝 Git hooks with Husky and lint-staged
- 🚀 Automated deployment to Netlify via GitHub Actions

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

🚨 **IMPORTANT:** Direct pushes to `main` branch are blocked. All changes must go through Pull Requests.

1. **Create a feature branch with proper naming:**
   ```bash
   # Branch name format: <type>/<description>
   git checkout -b feat/add-new-feature      # New feature
   git checkout -b fix/resolve-bug           # Bug fix
   git checkout -b docs/update-readme        # Documentation
   git checkout -b refactor/improve-code     # Code refactoring
   git checkout -b test/add-coverage         # Test additions
   git checkout -b chore/update-deps         # Maintenance
   git checkout -b hotfix/critical-fix       # Emergency fix
   ```

2. **Make changes and commit using conventional commits:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   git commit -m "docs: update documentation"
   ```

3. **Push to remote branch:**
   ```bash
   git push origin feat/add-new-feature
   ```

4. **Create a Pull Request:**
   - Go to GitHub and create a PR from your branch to `main`
   - Fill out the PR template with description of changes
   - CI will automatically run tests, linting, and coverage
   - Request review if needed

5. **Wait for CI to pass:**
   - ✅ PR validation (branch name, description)
   - ✅ Linting
   - ✅ Tests with coverage
   - ✅ Build
   - ✅ Approvals (if required)

6. **Merge via Pull Request:**
   - Click "Merge pull request" once all checks pass
   - Delete the feature branch after merge
   - Deployment to production happens automatically

**See [Branch Protection Guide](.github/BRANCH_PROTECTION.md) for details on enforced rules.**

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

## Deployment

🚀 This application is **automatically deployed to Netlify via GitHub Actions CI/CD pipeline**.

### CI/CD Pipeline (Recommended)

**All deployments should go through the automated pipeline:**

1. Create a feature branch and push changes
2. Create a Pull Request to `main`
3. CI runs tests, linting, and builds
4. Once merged, automatic deployment to production

**Pipeline Steps:**
- ✅ Lint code
- ✅ Run all tests with coverage
- ✅ Build production bundle
- ✅ Deploy to Netlify
- ✅ Report deployment status

### Documentation

- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Complete CI/CD workflow and best practices
- **[Netlify Setup Guide](./docs/NETLIFY_SETUP.md)** - Initial Netlify configuration
- **[Contact Form Setup](./docs/CONTACT_FORM_SETUP.md)** - Form submission configuration

### Production Site

- **Live Site:** https://seven30.com
- **Admin Dashboard:** https://app.netlify.com/projects/seven30com
- **GitHub Actions:** https://github.com/bryce-seefieldt/react-ts-web-app/actions

### Emergency Manual Deployment

⚠️ **Only use in emergencies when CI/CD is unavailable:**

```bash
npm run build
netlify deploy --prod --dir=dist
```

> **Note:** Manual deployments bypass quality checks. Always prefer the CI/CD pipeline.

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
