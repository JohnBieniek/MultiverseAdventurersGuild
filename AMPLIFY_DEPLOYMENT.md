# AWS Amplify Deployment Guide

This guide will help you deploy the Multiverse Adventurers Guild website to AWS Amplify.

## Prerequisites

- AWS Account
- GitHub repository (this one)
- AWS Amplify CLI or Console access

## Deployment Options

### Option 1: AWS Amplify Console (Recommended - No Setup Required)

1. **Go to AWS Amplify Console**
   - Visit https://console.aws.amazon.com/amplify/
   - Click "Create app"
   - Choose "Deploy without Git provider" or "Host web app"

2. **Connect Your GitHub Repository**
   - Select "GitHub" as the source
   - Authorize AWS Amplify to access your GitHub account
   - Select repository: `MultiverseAdventurersGuild`
   - Select branch: `main`

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: (leave empty for now)

4. **Review and Deploy**
   - Click "Deploy"
   - AWS Amplify will automatically:
     - Build your React app
     - Upload to S3
     - Configure CloudFront CDN
     - Provide a live URL

5. **Access Your Site**
   - Your site will be live at: `https://<app-name>.amplifyapp.com`
   - Domain will appear in the Amplify console

### Option 2: Using Amplify CLI

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Configure Amplify**
   ```bash
   amplify configure
   ```
   - Follow prompts to sign in to AWS
   - Set up your region and credentials

3. **Initialize Amplify Project**
   ```bash
   amplify init
   ```
   - Project name: `multiverseadventurersguild`
   - Environment: `prod`
   - Editor: (choose your editor)
   - App type: `javascript`
   - Framework: `react`
   - Build command: `npm run build`
   - Start command: `npm run dev`
   - Source dir: `src`
   - Distribution dir: `dist`

4. **Add Hosting**
   ```bash
   amplify add hosting
   ```
   - Select `Hosting with Amplify Console`
   - Choose Git-based deployments

5. **Deploy**
   ```bash
   amplify publish
   ```
   - Your app will be built and deployed
   - Live URL will be provided

### Option 3: Manual Deployment with AWS CLI

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket** (if not using Amplify Console)
   ```bash
   aws s3 mb s3://multiverse-adventurers-guild --region us-east-1
   ```

3. **Upload Build Files**
   ```bash
   aws s3 sync dist/ s3://multiverse-adventurers-guild/
   ```

4. **Configure S3 for Website Hosting**
   - In S3 console, select bucket
   - Go to "Properties" → "Static website hosting"
   - Enable it, set index document to `index.html`

## Custom Domain Setup

1. **In Amplify Console**
   - Select your app
   - Go to "Domain management"
   - Click "Add domain"
   - Enter your domain (e.g., `multiverseadventurersguild.com`)
   - Configure DNS records as instructed

2. **For Existing Domain**
   - Point nameservers to AWS Route 53
   - Or add CNAME/A records to your current DNS provider

## Environment Variables

If you add environment variables later:

1. Go to App settings → Environment variables
2. Add key-value pairs
3. Redeploy the app

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` automatically triggers a new build
- Pull requests show preview deploys
- Rollback to previous versions anytime

## Monitoring and Logs

- View build logs in Amplify Console
- Check CloudWatch logs for runtime errors
- Use CloudFront analytics for traffic insights

## Security

- Enable HTTPS (automatic with Amplify)
- Use AWS WAF for DDoS protection
- Enable access logging in S3
- Set up CloudFront security headers

## Troubleshooting

**Build fails:**
- Check build logs in Amplify Console
- Verify `npm run build` works locally
- Ensure all dependencies are in `package.json`

**Site shows 404 on refresh:**
- The `_redirects` file handles this
- Amplify should read it automatically
- If not working, enable SPA mode in Amplify settings

**High costs:**
- Amplify free tier includes generous monthly limits
- Monitor CloudFront data transfer
- Consider caching strategies

## Support

- AWS Amplify Docs: https://docs.amplify.aws/
- AWS Support: https://console.aws.amazon.com/support/
- Community: https://github.com/aws-amplify/amplify-js
