# Release and Production Deployment

This project uses a tags-only production deployment model via GitHub Actions and Netlify.

## Summary

- Pull Requests and pushes to `main` run checks only (lint, tests, build).
- Pushing a tag matching `v*` (e.g., `v1.2.3`) triggers checks and a production deploy.
- CI enforces that the tag commit is an ancestor of `main` to prevent accidental deploys.
- Netlify deploy is executed via Netlify CLI with `--prod`.

## Step-by-step: Creating a Release

1) Ensure `main` is green and up to date
```bash
git checkout main
git pull --ff-only
```

2) Bump version and create a tag (choose one)
```bash
# Patch
npm version patch -m "chore(release): v%s"

# Minor
npm version minor -m "chore(release): v%s"

# Major
npm version major -m "chore(release): v%s"
```

3) Push the commit and tag
```bash
git push origin main --follow-tags
# Or: git push origin vX.Y.Z
```

4) Monitor CI and Netlify
- GitHub → Actions: open the run for `refs/tags/vX.Y.Z`
- Confirm the deploy job passes
- Verify production site is updated

## Rollback

- From Netlify: Publish a previous successful deploy in the dashboard.
- From Git: Create/push a new tag from a previously known good commit on `main`.

## Notes

- Secrets required: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID` (repository → Settings → Secrets → Actions).
- Coverage thresholds are strict (100% across metrics); deploy depends on passing checks.
- Tag names must start with `v` to trigger production deploys.
