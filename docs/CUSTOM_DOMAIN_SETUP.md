# Configuring Custom Domain: seven30.com with Netlify

This guide walks through connecting your Squarespace domain (`seven30.com`) to your Netlify site.

## Overview

You own `seven30.com` through Squarespace and want it to point to your Netlify-hosted React app. You have two main options:

### Option 1: Use Netlify DNS (Recommended)
Transfer DNS management to Netlify while keeping domain registration at Squarespace.

### Option 2: Use Squarespace DNS
Keep DNS at Squarespace and point to Netlify using DNS records.

---

## Option 1: Use Netlify DNS (Recommended)

This is the easiest and most reliable option. Netlify will manage DNS and automatically handle SSL certificates.

### Step 1: Add Domain in Netlify

```bash
# Via CLI
netlify domains:add seven30.com

# Or manually in dashboard:
# 1. Go to https://app.netlify.com/sites/seven30com/settings/domain
# 2. Click "Add custom domain"
# 3. Enter "seven30.com"
# 4. Click "Verify" then "Add domain"
```

### Step 2: Get Netlify Name Servers

After adding the domain, Netlify will provide name servers. Get them with:

```bash
netlify domains:list
```

Or view in Netlify Dashboard:
- Go to **Site settings** → **Domain management** → **Netlify DNS**
- Click "Set up Netlify DNS"
- You'll see 4 name servers like:
  ```
  dns1.p05.nsone.net
  dns2.p05.nsone.net
  dns3.p05.nsone.net
  dns4.p05.nsone.net
  ```

### Step 3: Update Name Servers in Squarespace

1. Log in to [Squarespace Domains](https://account.squarespace.com/domains)
2. Click on **seven30.com**
3. Go to **DNS Settings** or **Advanced Settings**
4. Find **Name Servers** section
5. Select **Use custom name servers**
6. Replace Squarespace name servers with Netlify's 4 name servers:
   ```
   dns1.p05.nsone.net
   dns2.p05.nsone.net
   dns3.p05.nsone.net
   dns4.p05.nsone.net
   ```
7. Click **Save**

### Step 4: Wait for DNS Propagation

- DNS changes take 24-48 hours to fully propagate (usually much faster)
- Check status: `netlify domains:list`
- Check propagation: https://www.whatsmydns.net/#NS/seven30.com

### Step 5: Configure HTTPS

Once DNS is active:

1. In Netlify Dashboard → **Domain settings** → **HTTPS**
2. Click **Verify DNS configuration**
3. Once verified, click **Provision certificate**
4. SSL certificate will be automatically issued (takes a few minutes)

### Step 6: Set up www Redirect (Optional)

To redirect `www.seven30.com` to `seven30.com`:

```bash
# In Netlify dashboard:
# 1. Go to Domain settings
# 2. Add "www.seven30.com" as domain alias
# 3. Netlify will auto-redirect www to apex domain
```

---

## Option 2: Use Squarespace DNS

Keep DNS management at Squarespace and point to Netlify using A and CNAME records.

### Step 1: Get Netlify's Load Balancer IP

Netlify's load balancer IP: **75.2.60.5**

### Step 2: Add Domain in Netlify

```bash
netlify domains:add seven30.com
```

Or in Netlify Dashboard:
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter `seven30.com` and verify

### Step 3: Configure DNS Records in Squarespace

1. Log in to [Squarespace Domains](https://account.squarespace.com/domains)
2. Click on **seven30.com**
3. Go to **DNS Settings**
4. Add/modify these records:

#### For Apex Domain (seven30.com):

**A Record:**
```
Host: @
Type: A
Value: 75.2.60.5
TTL: 3600 (or automatic)
```

#### For www Subdomain:

**CNAME Record:**
```
Host: www
Type: CNAME
Value: seven30com.netlify.app
TTL: 3600 (or automatic)
```

### Step 4: Configure Netlify for External DNS

In Netlify Dashboard:
1. Go to **Domain settings** → **Custom domains**
2. Verify that `seven30.com` shows "DNS configuration required"
3. Click **Check DNS configuration**
4. Once records are detected, proceed to enable HTTPS

### Step 5: Enable HTTPS

⚠️ **Important**: With external DNS, SSL setup is more complex.

**Option A: Use Netlify DNS (switch to Option 1)**

**Option B: Manual SSL Certificate**
1. In Netlify Dashboard → **Domain settings** → **HTTPS**
2. Click **Verify DNS configuration**
3. Once verified, **Provision certificate** will be available
4. Netlify will attempt to issue Let's Encrypt certificate

**Option C: Upload Custom Certificate**
If automatic provisioning fails, you can upload your own SSL certificate.

---

## Verification Steps

Once configured, verify your setup:

### 1. Check DNS Records

```bash
# Check A record
dig seven30.com A +short
# Should return: 75.2.60.5

# Check CNAME for www
dig www.seven30.com CNAME +short
# Should return: seven30com.netlify.app

# Check name servers (if using Netlify DNS)
dig seven30.com NS +short
# Should show Netlify name servers
```

### 2. Test Domain Access

```bash
# Test domain resolution
curl -I https://seven30.com

# Check SSL certificate
curl -vI https://seven30.com 2>&1 | grep -i "SSL\|certificate"
```

### 3. Check in Browser

- Visit https://seven30.com
- Verify SSL certificate is valid (lock icon in browser)
- Test https://www.seven30.com redirects properly

### 4. Use Netlify CLI

```bash
# Check domain status
netlify domains:list

# View site info
netlify status
```

---

## Troubleshooting

### Domain Not Resolving

1. **Check DNS propagation**: https://www.whatsmydns.net/#A/seven30.com
2. **Verify name servers** (if using Netlify DNS):
   ```bash
   dig seven30.com NS +short
   ```
3. **Clear DNS cache**:
   ```bash
   # Linux
   sudo systemd-resolve --flush-caches
   
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   ```

### SSL Certificate Issues

1. **Verify DNS is pointing correctly**
2. **Wait 24-48 hours** for DNS propagation
3. **Check Netlify DNS configuration** in dashboard
4. **Try reprovisioning certificate**:
   - Go to Domain settings → HTTPS
   - Click "Renew certificate"

### "Domain already registered" Error

If you get this error when adding the domain:
1. The domain is already claimed on another Netlify site
2. Remove it from the other site first
3. Or contact Netlify support to transfer ownership

### Squarespace-Specific Issues

1. **Ensure domain is not locked** in Squarespace
2. **Check domain status** - must be active, not expired
3. **Verify you have admin access** to modify DNS
4. **Some Squarespace plans** may restrict DNS changes

---

## Recommended Configuration

### Best Setup for seven30.com:

1. ✅ **Use Netlify DNS** (Option 1)
   - Automatic SSL certificate management
   - Better performance with Netlify CDN
   - Easier configuration and maintenance
   - Automatic www redirect handling

2. ✅ **Configure both apex and www**:
   - Primary: `seven30.com`
   - Redirect: `www.seven30.com` → `seven30.com`

3. ✅ **Enable HTTPS enforcement**:
   - Force HTTPS in Netlify settings
   - Automatic HTTP → HTTPS redirect

---

## Post-Configuration

Once your domain is configured:

### Update README Badge

Update your README.md to reflect the custom domain:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/2412b858-116b-4310-9dc3-6928a2f36f7e/deploy-status)](https://app.netlify.com/sites/seven30com/deploys)
```

### Test Deployment

```bash
# Make a change and deploy
git add .
git commit -m "test: verify custom domain deployment"
git push origin main
```

### Monitor

- **Netlify Dashboard**: https://app.netlify.com/sites/seven30com
- **Domain Status**: Check "Domain settings" regularly
- **SSL Renewal**: Netlify auto-renews Let's Encrypt certificates

---

## Timeline

- **Netlify DNS setup**: Immediate on Netlify side
- **Name server propagation**: 24-48 hours (often 1-6 hours)
- **SSL certificate provisioning**: 1-10 minutes after DNS is active
- **Full global propagation**: Up to 48 hours

---

## Support Resources

- **Netlify Docs**: https://docs.netlify.com/domains-https/custom-domains/
- **Squarespace DNS Help**: https://support.squarespace.com/hc/en-us/articles/205812378
- **DNS Checker**: https://www.whatsmydns.net/
- **SSL Checker**: https://www.ssllabs.com/ssltest/

---

## Quick Command Reference

```bash
# Add domain
netlify domains:add seven30.com

# List domains
netlify domains:list

# Check site status
netlify status

# Open Netlify dashboard
netlify open

# Open domain settings
netlify open --admin

# Check DNS
dig seven30.com A +short
dig seven30.com NS +short

# Test HTTPS
curl -I https://seven30.com
```

---

## Questions?

If you encounter issues:
1. Check DNS propagation status
2. Verify name servers are correct
3. Review Netlify domain settings dashboard
4. Check Squarespace domain settings
5. Contact Netlify support if needed
