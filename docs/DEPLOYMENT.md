# Deployment Guide

## Automated CI/CD Pipeline ✅

This project uses **GitHub Actions** to automatically deploy to Netlify. All deployments should go through this pipeline to ensure consistency and quality.

## How to Deploy

### For Production Deployments

🚨 **Direct pushes to `main` are blocked!** All changes must go through Pull Requests.

1. **Create a feature branch with proper naming:**
   ```bash
   # Option 1: Use the helper script (recommended)
   ./scripts/new-branch.sh feat add-new-feature
   
   # Option 2: Manual creation
   git checkout main
   git pull origin main
   git checkout -b feat/your-feature-name
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. **Push to remote branch:**
   ```bash
   git push origin feat/your-feature-name
   ```

4. **Create a Pull Request:**
   - Go to GitHub and create a PR from your branch to `main`
   - The CI pipeline will automatically:
     - ✅ Run ESLint
     - ✅ Run all tests with coverage
     - ✅ Upload coverage to Codecov
     - ✅ Build the production bundle

3. **Merge to Main:**
   - Once PR is approved and CI passes, merge to `main`
   - The deploy job will automatically trigger:
     - ✅ Downloads the build artifact
     - ✅ Deploys to Netlify production
     - ✅ Posts deployment status to GitHub

### CI/CD Pipeline Steps

```
Push to main → Run Tests → Build → Deploy to Netlify
     ↓            ↓          ↓           ↓
  Trigger      Lint +    Create      Upload to
  Actions    Coverage   Artifact    seven30.com
```

## GitHub Secrets Required

The following secrets must be configured in GitHub repository settings:

- `NETLIFY_AUTH_TOKEN` - Your Netlify personal access token
- `NETLIFY_SITE_ID` - Your Netlify site ID (found in Site settings)
- `CODECOV_TOKEN` - Codecov upload token (optional, for coverage reporting)

### How to Get Netlify Tokens

1. **NETLIFY_AUTH_TOKEN:**
   - Go to https://app.netlify.com/user/applications
   - Click "New access token"
   - Copy the token

2. **NETLIFY_SITE_ID:**
   - Go to your site in Netlify dashboard
   - Site settings → General → Site information → API ID

3. **Add to GitHub:**
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add each secret

## Manual Deployment (Emergency Only)

⚠️ **Use only in emergencies when CI/CD is down**

```bash
# Build locally
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## Monitoring Deployments

- **GitHub Actions:** https://github.com/bryce-seefieldt/react-ts-web-app/actions
- **Netlify Dashboard:** https://app.netlify.com/projects/seven30com
- **Production Site:** https://seven30.com

## Rollback Procedure

If a deployment causes issues:

1. Go to Netlify dashboard
2. Navigate to Deploys
3. Find the last working deployment
4. Click "Publish deploy" to rollback

Or revert the commit and push:

```bash
git revert HEAD
git push origin main
# CI/CD will automatically deploy the reverted version
```

## Best Practices

✅ **DO:**
- Always create feature branches
- Run tests locally before pushing: `npm test`
- Run linter before pushing: `npm run lint`
- Let CI/CD handle all deployments
- Review deployment logs in GitHub Actions

❌ **DON'T:**
- Deploy directly to Netlify CLI (bypasses CI/CD)
- Push directly to `main` without PR review
- Skip tests or linting
- Deploy with failing tests

## Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs
2. Verify all tests pass locally
3. Ensure secrets are configured correctly
4. Check Netlify build logs

### Need to Check Secrets

```bash
# Check if netlify.toml is configured
cat netlify.toml

# Check Netlify status
netlify status
```

### Force Rebuild

```bash
# Create an empty commit and push
git commit --allow-empty -m "chore: trigger rebuild"
git push origin main
```
