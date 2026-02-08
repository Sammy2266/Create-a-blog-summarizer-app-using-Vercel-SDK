# Deployment Guide

Deploy your AI Blog Summarizer to production in minutes.

## Deploy to Vercel (Recommended)

Vercel offers the best experience for Next.js applications with zero configuration.

### Method 1: One-Click Deploy

1. Click the Deploy button:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

2. Connect your GitHub account

3. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key

4. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# When prompted, add environment variables:
# OPENAI_API_KEY: your-api-key-here

# For production deployment
vercel --prod
```

### Post-Deployment

1. Go to your Vercel dashboard
2. Click on your project
3. Go to Settings → Environment Variables
4. Verify `OPENAI_API_KEY` is set
5. Redeploy if needed

## Deploy to Other Platforms

### Netlify

```bash
# Build the project
npm run build

# Deploy the .next folder
netlify deploy --prod --dir=.next
```

Add environment variable in Netlify dashboard:
- `OPENAI_API_KEY`: your-api-key

### Docker

```dockerfile
# Create Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t blog-summarizer .
docker run -p 3000:3000 -e OPENAI_API_KEY=your-key blog-summarizer
```

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variable: `OPENAI_API_KEY`
3. Railway auto-deploys on git push

## Environment Variables

Make sure these are set in your production environment:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

## Production Checklist

- [ ] OpenAI API key is set in environment variables
- [ ] Build succeeds without errors (`npm run build`)
- [ ] TypeScript compiles without errors (`npm run lint`)
- [ ] Test the summarizer in production
- [ ] Monitor API usage in OpenAI dashboard
- [ ] Set up error tracking (optional: Sentry)
- [ ] Configure custom domain (optional)

## Performance Optimization

### Enable Caching

Add caching headers to API route:

```typescript
// app/api/summarize/route.ts
export const runtime = 'edge'; // Use edge runtime
export const dynamic = 'force-dynamic';
```

### Monitor Costs

- Track API usage in OpenAI dashboard
- Set up usage limits
- Implement rate limiting if needed

### Analytics

Add Vercel Analytics:

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Troubleshooting

### Build Failures

Check build logs for specific errors:
```bash
vercel logs
```

### API Errors in Production

- Verify environment variables are set correctly
- Check OpenAI API key is valid
- Review error logs in Vercel dashboard

### High Response Times

- Use Vercel's edge runtime
- Implement caching for repeated summaries
- Consider using a faster model

## Security

- Never commit `.env.local` to git
- Use environment variables for all secrets
- Rotate API keys regularly
- Monitor for unusual API usage

## Scaling

For high traffic:
- Implement Redis caching
- Add rate limiting per user
- Consider batch processing
- Use OpenAI's batch API for bulk operations

---

**Need help?** Check the [Vercel deployment docs](https://vercel.com/docs) or open an issue on GitHub.
