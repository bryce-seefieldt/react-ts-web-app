# Branch Protection Configuration

This document contains the recommended branch protection rules for this repository.

## GitHub Branch Protection Rules

To enforce CI/CD pipeline and prevent direct pushes to main, configure the following in GitHub:

### Settings Location
Go to: **Settings → Branches → Add branch protection rule**

### Branch name pattern
`main`

### Required Settings

#### ✅ Protect matching branches

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1`
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners (optional)
  - [ ] Restrict who can dismiss pull request reviews (optional)

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Required status checks:
    - `test-and-coverage`
    - `deploy`

- [x] **Require conversation resolution before merging**

- [x] **Require signed commits** (optional but recommended)

- [x] **Require linear history** (optional - prevents merge commits)

- [x] **Include administrators**
  - Enforces rules even for repository admins

- [ ] **Allow force pushes** - Keep DISABLED
  
- [ ] **Allow deletions** - Keep DISABLED

#### 🔒 Rules applied to everyone including administrators

- [x] **Restrict who can push to matching branches**
  - No one should be able to push directly
  - Only allow merges via pull requests

### Additional Settings

#### Lock branch (optional)
- [x] Lock branch - Makes branch read-only (extreme measure)

## How to Configure

### Via GitHub Web Interface:

1. Go to repository: https://github.com/bryce-seefieldt/react-ts-web-app
2. Click **Settings** tab
3. Click **Branches** in sidebar
4. Click **Add branch protection rule**
5. Enter branch pattern: `main`
6. Enable checkboxes as listed above
7. Click **Create** or **Save changes**

### Via GitHub CLI:

```bash
# Install GitHub CLI if not already installed
# brew install gh (macOS)
# or visit: https://cli.github.com/

# Authenticate
gh auth login

# Create branch protection rule
gh api repos/bryce-seefieldt/react-ts-web-app/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test-and-coverage","deploy"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"dismiss_stale_reviews":true,"require_code_owner_reviews":false,"required_approving_review_count":1}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_conversation_resolution=true
```

## Verification

After setting up branch protection:

1. Try to push directly to main:
   ```bash
   git checkout main
   echo "test" >> README.md
   git commit -am "test: direct push"
   git push origin main
   ```
   **Expected Result:** Push should be rejected

2. Create a feature branch:
   ```bash
   git checkout -b test/branch-protection
   git push origin test/branch-protection
   ```
   **Expected Result:** Should work fine

3. Create a PR and try to merge without CI passing:
   **Expected Result:** Merge button should be disabled until CI passes

## Benefits

✅ **Prevents accidents** - No direct commits to main
✅ **Enforces testing** - All code must pass CI/CD
✅ **Code review** - At least 1 approval required
✅ **Audit trail** - All changes tracked via PRs
✅ **Quality assurance** - Tests, linting, and builds must pass
✅ **Deployment safety** - Only tested code reaches production

## Troubleshooting

### "I need to push an emergency fix"

1. Create a branch anyway: `git checkout -b hotfix/emergency-fix`
2. Push the branch: `git push origin hotfix/emergency-fix`
3. Create PR: `gh pr create --fill`
4. Wait for CI (usually 2-3 minutes)
5. Merge via PR

### "CI is failing but I need to merge"

Don't bypass CI. Fix the issue:
1. Pull the latest changes
2. Fix the failing test/lint issue
3. Push the fix
4. Wait for CI to pass
5. Then merge

### "I'm the only developer, do I need this?"

**Yes!** Branch protection helps you:
- Catch errors before production
- Maintain a clean git history
- Build good habits
- Prevent accidental force pushes

## Maintenance

Review and update these rules:
- Quarterly: Review if rules are too strict/loose
- When adding new CI checks: Update required status checks
- When team grows: Adjust approval count
