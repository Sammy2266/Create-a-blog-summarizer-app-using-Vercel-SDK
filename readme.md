.env.local.example

# Copy this file to .env.local and fill in your actual API keys

# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk_your_key_here

# Optional: For advanced features
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

3. README.md

# Blog Summarizer with Vercel AI SDK

An AI-powered blog post summarizer built with Next.js, Vercel AI SDK, and OpenAI's GPT-4o.

## Features

✨ **Real-time Streaming Summaries** - Watch summaries generate in real-time
🎯 **Multiple Summary Styles** - Choose between concise and detailed summaries
⚡ **Edge Runtime** - Lightning-fast performance on Vercel's edge network
🔒 **Type-Safe** - Full TypeScript support with zero-config setup
🎨 **Beautiful UI** - Tailwind CSS styling included
📊 **Production Ready** - Rate limiting, caching, and error handling

## Quick Start

### 1. Clone the Repository
```bash

git clone https://github.com/yourusername/blog-summarizer-vercel-ai.git

cd blog-summarizer-vercel-ai

2. Install Dependencies


npm install

3. Set Up Environment Variables


cp .env.local.example .env.local
Edit .env.local and add your OpenAI API key


### 4. Run Locally
```bash

npm run dev

Visit http://localhost:3000 to see your summarizer in action.

5. Deploy to Vercel


npm install -g vercel

vercel

Follow the prompts and add your OPENAI_API_KEY in the Vercel dashboard.

Usage

Basic Implementation


import BlogSummarizer from '@/app/components/BlogSummarizer';



export default function MyBlogPost() {

  const postContent = "Your blog post content here...";

  

  return (

    <div>

      <h1>My Blog Post</h1>

      <BlogSummarizer postContent={postContent} />

    </div>

  );

}

API Endpoint

POST /api/summarize

Request:


{

  "content": "Your blog post content...",

  "style": "concise"

}

Response: Streaming text response with the generated summary

Customization

Change the LLM Model

Edit app/api/summarize/route.ts:


// Use Claude instead of GPT-4o

import { anthropic } from '@ai-sdk/anthropic';



const result = await streamText({

  model: anthropic('claude-3-5-sonnet-20241022'),

  // ... rest of config

});

Adjust Summary Length

Modify the system prompt in app/api/summarize/route.ts:


const systemPrompt = `Create a summary of exactly 100-150 words...`;

Add Custom Styling

Edit app/components/BlogSummarizer.tsx to match your brand colors and design.

Performance Tips

Enable Caching - Summaries are cached for 1 hour by default

Use Rate Limiting - Protect your API from abuse

Monitor Token Usage - Track costs in your OpenAI dashboard

Batch Processing - Use Temporal for processing multiple posts

Troubleshooting

Q: "API key not found" error
A: Ensure .env.local exists and contains your OPENAI_API_KEY

Q: Summaries are too long
A: Adjust the word count in the system prompt

Q: High latency on first request
A: This is normal for cold starts. Use Vercel's prerender feature.

Resources

Vercel AI SDK Docs

OpenAI API Reference

Next.js Documentation

Tailwind CSS

License

MIT

Support

Found a bug? Have a feature request? Open an issue on GitHub!

Built with ❤️ using Vercel AI SDK



### **Quick Clone & Deploy Instructions:**



Add this section to the article's "Next Steps":


```markdown
### Clone & Deploy in 5 Minutes

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/blog-summarizer-vercel-ai.git
   cd blog-summarizer-vercel-ai
   npm install

Set up your API key:

cp .env.local.example .env.local
# Add your OpenAI API key to .env.local

Test locally:

npm run dev
# Visit http://localhost:3000

Deploy to Vercel:

npm install -g vercel
vercel

Add environment variables in Vercel dashboard:

Go to Settings → Environment Variables

Add OPENAI_API_KEY

Redeploy

That's it! Your AI blog summarizer is now live.



---


## **Recommendation for Your Blog:**



You should create an actual GitHub repository with this structure and update the article with your real GitHub username. This will:



✅ Provide readers with a working, cloneable example

✅ Build credibility and authority

✅ Drive traffic to your GitHub profile

✅ Allow community contributions and feedback

✅ Improve SEO (GitHub repos rank well for technical queries)


