# Quick Start Guide - AI Blog Summarizer

Get your AI blog summarizer up and running in 5 minutes!

## Prerequisites

- Node.js 18 or higher ([Download here](https://nodejs.org/))
- OpenAI API key ([Get yours here](https://platform.openai.com/api-keys))

## Installation Steps

### Option 1: Automated Setup (Recommended)

```bash
# Run the setup script
chmod +x setup.sh
./setup.sh

# Add your OpenAI API key to .env.local
# Then start the server
npm run dev
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local

# 3. Edit .env.local and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-actual-key-here

# 4. Start the development server
npm run dev
```

## Verify Installation

1. Open your browser to `http://localhost:3000`
2. You should see the AI Blog Summarizer home page
3. Click "Try the Demo" button
4. Click "Generate AI Summary" to test the summarizer

## Common Issues

### "Cannot find module" errors
**Solution:** Run `npm install` again

### "API key not found" error
**Solution:** Ensure `.env.local` exists and contains your `OPENAI_API_KEY`

### Port 3000 already in use
**Solution:** Run on a different port: `npm run dev -- -p 3001`

### TypeScript errors
**Solution:** Run `npm run build` to check for type errors

## What's Included

- ✅ Working blog summarizer component
- ✅ API endpoint with streaming support
- ✅ Demo page with sample content
- ✅ Type-safe TypeScript setup
- ✅ Tailwind CSS styling
- ✅ Production-ready configuration

## Next Steps

1. **Customize the UI** - Edit `app/components/BlogSummarizer.tsx`
2. **Add your own blog content** - Create new pages in `app/`
3. **Deploy to Vercel** - Run `vercel` command
4. **Try different AI models** - Switch to Claude or other models

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Visit [Vercel AI SDK docs](https://sdk.vercel.ai/docs)
- Open an issue on GitHub

Happy building! 🚀
