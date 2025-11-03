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

This project maintains 100% test coverage using Vitest and React Testing Library. Coverage reports are automatically generated and uploaded to Codecov.

**Running Tests Locally:**

```bash
# Run tests in watch mode
npm test

# Run tests with coverage report
npm run test:coverage

# View coverage report
open coverage/index.html
```

**Coverage Requirements:**
- 100% Statements
- 100% Branches
- 100% Functions
- 100% Lines

**Setting Up Codecov:**

1. Go to [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Add this repository
4. Copy the provided token
5. Add the token as a repository secret:
   - Go to repo Settings > Secrets and Variables > Actions
   - Add new repository secret named `CODECOV_TOKEN`
   - Paste the token value

**Coverage Reports:**
- PR comments show coverage changes
- Coverage reports are stored as CI artifacts for 14 days
- View coverage history and trends at [codecov.io](https://codecov.io/gh/bryce-seefieldt/react-ts-web-app)
- Coverage badges in README show current status

#### Code Style

- ESLint and Prettier run automatically on commit
- Tests must pass before merge
- Follow TypeScript best practices
- Use React hooks guidelines
- Use Conventional Commits for commit messages

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

## Troubleshooting

### Test and Coverage Issues

1. **Coverage Not Meeting 100%:**
   ```bash
   # Check which lines need coverage
   npm run test:coverage
   
   # Run tests in watch mode to work on specific files
   npm test -- --coverage
   ```

2. **Tests Failing in CI but Passing Locally:**
   - Ensure all dependencies are installed: `npm ci`
   - Clear test cache: `npm test -- --clearCache`
   - Check for environment-specific code

3. **Codecov Integration Issues:**
   - Verify `CODECOV_TOKEN` is set in repository secrets
   - Check CI logs for upload errors
   - Ensure `.codecov.yml` is properly configured

### Common Testing Patterns

1. **Testing Components:**
   ```tsx
   import { render, screen, fireEvent } from '@testing-library/react';
   
   test('component behavior', () => {
     render(<YourComponent />);
     const element = screen.getByRole('button');
     fireEvent.click(element);
     expect(screen.getByText(/expected text/i)).toBeInTheDocument();
   });
   ```

2. **Testing Hooks:**
   ```tsx
   import { renderHook, act } from '@testing-library/react';
   
   test('hook behavior', () => {
     const { result } = renderHook(() => useYourHook());
     act(() => {
       result.current.someFunction();
     });
     expect(result.current.value).toBe(expectedValue);
   });
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Ensure tests pass and maintain 100% coverage
4. Commit your changes (using Conventional Commits)
5. Push to the branch
6. Create a Pull Request

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
