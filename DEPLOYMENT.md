# Vercel Deployment Guide for Vault Bond Trader

This guide provides step-by-step instructions for deploying the Vault Bond Trader application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare the Repository

1. Ensure all code is committed and pushed to the main branch
2. Verify the following files exist:
   - `package.json` with correct dependencies
   - `vite.config.ts` for build configuration
   - `index.html` with proper meta tags
   - All source files in `src/` directory

## Step 2: Create Vercel Account and Connect GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "New Project" on the dashboard
4. Import the `aubg92/vault-bond-trader` repository

## Step 3: Configure Project Settings

### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

### Advanced Settings
- **Node.js Version**: 18.x
- **Build Command Override**: `npm run build`
- **Development Command**: `npm run dev`

## Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will automatically assign a domain like `vault-bond-trader-xxx.vercel.app`

## Step 5: Configure Custom Domain (Optional)

1. In the Vercel dashboard, go to your project
2. Click on "Settings" tab
3. Navigate to "Domains" section
4. Add your custom domain (e.g., `vaultbondtrader.com`)
5. Follow DNS configuration instructions
6. Wait for SSL certificate to be issued

## Step 6: Verify Deployment

1. Visit your deployed URL
2. Test wallet connection functionality
3. Verify all components load correctly
4. Check that the application is responsive on mobile devices

## Step 7: Configure Automatic Deployments

1. In Vercel dashboard, go to "Settings" → "Git"
2. Ensure "Automatic deployments" is enabled
3. Configure branch settings:
   - **Production Branch**: `main`
   - **Preview Branches**: `develop`, `feature/*`

## Step 8: Monitor and Maintain

### Performance Monitoring
- Check Vercel Analytics for performance metrics
- Monitor Core Web Vitals
- Set up alerts for build failures

### Updates
- Push changes to the main branch for automatic deployment
- Use preview deployments for testing new features
- Monitor build logs for any issues

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs for specific errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify no trailing spaces in values

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure network configuration matches

4. **Asset Loading Issues**
   - Check favicon and other static assets
   - Verify public folder contents
   - Review build output for missing files

### Build Optimization

1. **Bundle Size**
   - Use dynamic imports for large components
   - Optimize images and assets
   - Enable tree shaking

2. **Performance**
   - Enable Vercel's Edge Functions if needed
   - Configure caching headers
   - Use CDN for static assets

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel automatically provides SSL certificates
   - Ensure all external resources use HTTPS
   - Configure security headers

## Support

For deployment issues:
1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Contact Vercel support for platform-specific issues

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works properly
- [ ] All pages are accessible
- [ ] Mobile responsiveness verified
- [ ] Performance metrics are acceptable
- [ ] SSL certificate is active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics tracking is working
- [ ] Error monitoring is set up

## Environment-Specific Configurations

### Development
- Use local environment variables
- Enable hot reloading
- Use development RPC endpoints

### Staging
- Use testnet configurations
- Enable detailed logging
- Use staging-specific API keys

### Production
- Use mainnet configurations
- Optimize for performance
- Enable all security features
- Set up monitoring and alerts
