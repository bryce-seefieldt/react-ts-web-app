# Contributing to React TypeScript Web App

Thank you for your interest in contributing! This guide will help you understand our development process and coding standards, with a particular focus on testing and code coverage requirements.

## Table of Contents

- [Development Workflow](#development-workflow)
- [Test Coverage Requirements](#test-coverage-requirements)
- [Writing Tests](#writing-tests)
- [Coverage Reports](#coverage-reports)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

## Development Workflow

🚨 **IMPORTANT:** Direct pushes to `main` are blocked. All changes must go through Pull Requests.

1. **Fork and clone the repository**

2. **Create a feature branch with proper naming:**
   ```bash
   # Use the helper script (recommended)
   ./scripts/new-branch.sh feat your-feature-name
   
   # Or manually with proper format: <type>/<description>
   git checkout -b feat/your-feature-name    # New feature
   git checkout -b fix/bug-description       # Bug fix
   git checkout -b docs/update-readme        # Documentation
   git checkout -b test/add-coverage         # Tests
   ```
   
   **Valid branch types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `hotfix`

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Make your changes**, following our [code style](#code-style) guidelines

5. **Add tests and ensure 100% coverage**
   ```bash
   npm run test:coverage
   ```

6. **Commit using conventional commits:**
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue"
   ```

7. **Push to your branch:**
   ```bash
   git push origin feat/your-feature-name
   ```

8. **Create a Pull Request:**
   - Use the PR template
   - Ensure all CI checks pass
   - Request review if needed

**See [Branch Protection Guide](.github/BRANCH_PROTECTION.md) for enforcement details.**

## Release Process (Production Deploys)

Production deploys are triggered by pushing a version tag (`v*`). Tags must point to a commit on `main`.

1) Ensure `main` is up to date and CI is green
```bash
git checkout main && git pull --ff-only
```

2) Bump the version and create a tag (choose one)
```bash
# Patch/minor/major
npm version patch -m "chore(release): v%s"
npm version minor -m "chore(release): v%s"
npm version major -m "chore(release): v%s"
```

3) Push the commit and tag
```bash
git push origin main --follow-tags
```

CI will verify the tag is based on `main`, run lint/tests/build, and deploy to Netlify production.

## Test Coverage Requirements

### Coverage Thresholds

We maintain strict 100% coverage requirements across all metrics:
- **Statements**: 100% coverage
- **Branches**: 100% coverage (including all if/else paths)
- **Functions**: 100% coverage (including edge cases)
- **Lines**: 100% coverage

### What to Test

1. **Components**:
   - Rendering (default & with different props)
   - User interactions (clicks, inputs, etc.)
   - Error states
   - Loading states
   - Edge cases

2. **Hooks**:
   - Initial state
   - All state transitions
   - Side effects
   - Cleanup functions
   - Error handling

3. **Utils/Helpers**:
   - Success cases
   - Error cases
   - Edge cases (null, undefined, empty values)
   - Type validation

## Writing Tests

### Test Structure

```typescript
describe('ComponentName', () => {
  // Setup (if needed)
  beforeEach(() => {
    // Common setup
  });

  it('renders default state correctly', () => {
    render(<Component />);
    // Assertions
  });

  it('handles user interactions', () => {
    render(<Component />);
    // Trigger events
    fireEvent.click(...);
    // Assert changes
  });

  it('handles edge cases', () => {
    // Test edge cases
  });
});
```

### Best Practices

1. **Arrange-Act-Assert** pattern:
   ```typescript
   it('updates count on click', () => {
     // Arrange
     render(<Counter />);
     const button = screen.getByRole('button');
     
     // Act
     fireEvent.click(button);
     
     // Assert
     expect(screen.getByText('Count: 1')).toBeInTheDocument();
   });
   ```

2. **Test Description Format**:
   - Use present tense
   - Describe expected behavior
   - Include context if needed
   ```typescript
   // Good
   it('displays error message when API fails')
   it('increments counter when button is clicked')
   
   // Bad
   it('test counter')
   it('should work')
   ```

3. **Mock External Dependencies**:
   ```typescript
   vi.mock('axios', () => ({
     default: {
       get: vi.fn()
     }
   }));
   ```

## Coverage Reports

### Local Development

1. Run tests with coverage:
   ```bash
   npm run test:coverage
   ```

2. View detailed report:
   ```bash
   open coverage/index.html
   ```

3. Understanding the report:
   - Red lines: Not covered
   - Yellow lines: Partially covered (branches)
   - Green lines: Fully covered

### CI/CD Pipeline

1. Coverage is checked in CI:
   - Pull requests must maintain 100% coverage
   - Coverage reports are uploaded as artifacts
   - Codecov provides detailed feedback

2. Accessing CI coverage:
   - GitHub Actions → CI workflow → Artifacts
   - Codecov PR comments
   - Codecov dashboard

### Troubleshooting Coverage

If coverage is below 100%:

1. Check uncovered lines:
   ```bash
   npm run test:coverage
   ```

2. Common issues:
   - Missing edge case tests
   - Untested error handlers
   - Forgotten async code paths
   - Unchecked conditional renders

3. Solutions:
   - Add test cases for each uncovered line
   - Use test doubles (mocks/stubs) for hard-to-test scenarios
   - Consider refactoring complex code

## Pull Request Process

1. **Before Creating PR**:
   - Run full test suite: `npm test`
   - Check coverage: `npm run test:coverage`
   - Run linter: `npm run lint`
   - Format code: `npm run format`

2. **PR Requirements**:
   - Following [conventional commits](https://www.conventionalcommits.org/)
   - Updated tests with 100% coverage
   - Updated documentation if needed
   - Passing CI checks

3. **PR Description**:
   - Clear description of changes
   - Steps to test/verify
   - Screenshots (if UI changes)
   - Related issue numbers

## Code Style

- Follow existing code style
- Use TypeScript strict mode
- Follow React hooks rules
- Use functional components
- Add JSDoc comments for complex functions
- Use meaningful variable names

## Questions?

If you have questions about:
- Testing approach: Add comments in PR
- Coverage requirements: Tag maintainers
- Development setup: Open an issue

Thank you for contributing!