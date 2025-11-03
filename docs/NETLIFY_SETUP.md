# Netlify Deployment Setup

This guide will help you set up automatic deployment to Netlify via GitHub Actions.

## Prerequisites

- A Netlify account (sign up at https://www.netlify.com)
- Repository admin access to configure secrets

## Setup Steps

### 1. Create a New Netlify Site

1. Log in to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy manually" (we'll use GitHub Actions instead of Netlify's Git integration)
4. Drag and drop your `dist` folder or skip this step

OR create a new site via Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
netlify sites:create --name your-app-name
```

### 2. Get Your Netlify Credentials

#### Get Site ID:
1. Go to your site in Netlify dashboard
2. Navigate to "Site settings" → "General" → "Site details"
3. Copy the **Site ID** (looks like: `abc12345-6789-0def-1234-56789abcdef0`)

OR via CLI:
```bash
netlify status
```

#### Get Auth Token:
1. Go to https://app.netlify.com/user/applications
2. Click "New access token"
3. Give it a name (e.g., "GitHub Actions Deploy")
4. Copy the token (you'll only see it once!)

OR via CLI:
```bash
netlify login
# Token will be shown in the browser or stored locally
```

### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

   - **Name**: `NETLIFY_AUTH_TOKEN`
     - **Value**: Your Netlify personal access token from step 2

   - **Name**: `NETLIFY_SITE_ID`
     - **Value**: Your site ID from step 2

### 4. Deploy

Once you've added the secrets:

1. Push to the `main` branch:
   ```bash
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Run tests and coverage checks
   - Build the application
   - Deploy to Netlify (only on main branch)

3. Check the deployment:
   - View the Actions tab in GitHub for deployment status
   - Check Netlify dashboard for the live site
   - Your site will be available at: `https://your-site-name.netlify.app`

## Deployment Behavior

### Main Branch (Production)
- **Trigger**: Push to `main` branch
- **Behavior**: Full test → build → deploy to production
- **URL**: Your custom domain or `https://your-site-name.netlify.app`

### Pull Requests (Preview)
- **Trigger**: PR opened/updated
- **Behavior**: Full test → build → deploy preview (with PR comment)
- **URL**: Unique preview URL for each PR
- **Comment**: Netlify bot will comment on PR with preview link

## Configuration

The deployment is configured via:
- `netlify.toml` - Netlify-specific settings
- `.github/workflows/ci.yml` - GitHub Actions deployment workflow

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

# SPA redirect
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Custom Domain (Optional)

To use a custom domain:

1. In Netlify dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Follow the instructions to configure DNS
4. SSL certificate will be automatically provisioned

## Troubleshooting

### Build Fails
- Check the GitHub Actions logs
- Verify all tests pass locally: `npm test`
- Ensure build works locally: `npm run build`

### Deployment Fails
- Verify secrets are correctly set in GitHub
- Check Netlify dashboard for error messages
- Ensure Site ID and Auth Token are valid

### Site Not Loading
- Check if build artifacts are in `dist/` directory
- Verify `netlify.toml` publish directory matches build output
- Check browser console for errors

## Resources

- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify CLI Documentation](https://cli.netlify.com)
