# Deployment Guide

## Automated CI/CD Pipeline ✅

This project uses **GitHub Actions** with a tags-only production deployment model.

## Triggers and Behavior

- Pull Requests to `main`:
   - Run lint, tests (100% coverage), build.
   - No production deploy.

- Push to `main`:
   - Run lint, tests, build.
   - No production deploy.

- Push a tag matching `v*` (e.g., `v1.2.3`):
   - Run lint, tests, build.
   - Verify tag commit is an ancestor of `main` (safety guard).
   - Deploy `dist/` to Netlify production using Netlify CLI `--prod`.

### Visual Flow

```
PR → CI (lint/tests/build) ──┐
                                           ├─ No production deploy
main push → CI (lint/tests/build) ─┘

tag v* push → CI (lint/tests/build) → Verify tag on main → Netlify deploy --prod
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

Or revert by creating and pushing a previous tag, or revert the commit and push:

```bash
git revert HEAD
git push origin main
# Then bump a new tag and push it to trigger a production deploy
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

## Release Process (Tags)

1) Ensure `main` is green and up to date
```bash
git checkout main && git pull --ff-only
```

2) Bump version and create an annotated tag
```bash
# Example: patch
npm version patch -m "chore(release): v%s"
git push origin main --follow-tags
```

3) Verify CI run for `refs/tags/vX.Y.Z` completes, then confirm Netlify production is updated.

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
