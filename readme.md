# AI Blog Summarizer with Vercel AI SDK

An AI-powered blog post summarizer built with Next.js, Vercel AI SDK, and OpenAI's GPT-4o. Generate intelligent summaries of your blog posts in real-time with streaming responses.

![AI Blog Summarizer Demo](https://img.shields.io/badge/Next.js-15-black) ![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## ✨ Features

- **Real-time Streaming Summaries** - Watch summaries generate word-by-word in real-time
- **Multiple Summary Styles** - Choose between concise (150-200 words) and detailed (300-400 words) summaries
- **Type-Safe** - Full TypeScript support with zero-config setup
- **Beautiful UI** - Modern, responsive design with Tailwind CSS
- **Easy Integration** - Drop the component into any Next.js app
- **Production Ready** - Built with best practices and error handling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd blog-summarizer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your summarizer in action!

## 📁 Project Structure

```
blog-summarizer/
├── app/
│   ├── api/
│   │   └── summarize/
│   │       └── route.ts          # API endpoint for summarization
│   ├── components/
│   │   └── BlogSummarizer.tsx    # Main summarizer component
│   ├── demo/
│   │   └── page.tsx              # Demo page with sample blog
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 💡 Usage

### Basic Implementation

```tsx
import BlogSummarizer from '@/app/components/BlogSummarizer';

export default function MyBlogPost() {
  const postContent = "Your blog post content here...";
  
  return (
    <div>
      <h1>My Blog Post</h1>
      <BlogSummarizer postContent={postContent} />
      <article>{postContent}</article>
    </div>
  );
}
```

### API Endpoint

**POST** `/api/summarize`

Request:
```json
{
  "content": "Your blog post content...",
  "style": "concise"
}
```

Response: Streaming text response with the generated summary

## 🎨 Customization

### Change the AI Model

Edit `app/api/summarize/route.ts`:

```typescript
// Use Claude instead of GPT-4o
import { anthropic } from '@ai-sdk/anthropic';

const result = await streamText({
  model: anthropic('claude-3-5-sonnet-20241022'),
  // ... rest of config
});
```

### Adjust Summary Length

Modify the system prompt in `app/api/summarize/route.ts`:

```typescript
const systemPrompt = `Create a summary of exactly 100-150 words...`;
```

### Custom Styling

Edit `app/components/BlogSummarizer.tsx` to match your brand colors and design.

## 🚢 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard
# Go to Settings → Environment Variables
# Add OPENAI_API_KEY with your API key
```

## 🔧 Troubleshooting

### "API key not found" error
Ensure `.env.local` exists and contains your `OPENAI_API_KEY`

### Summaries are too long
Adjust the word count in the system prompt in `app/api/summarize/route.ts`

### High latency on first request
This is normal for cold starts. Vercel's edge runtime optimizes subsequent requests.

### Module not found errors
Run `npm install` to ensure all dependencies are installed

## 📚 How It Works

1. **User clicks "Generate AI Summary"** - The BlogSummarizer component is activated
2. **Content is sent to API** - The blog post content and style preference are sent to `/api/summarize`
3. **AI processes the request** - OpenAI's GPT-4o analyzes the content using Vercel AI SDK
4. **Streaming response** - The summary streams back word-by-word in real-time
5. **Display** - The component displays the summary as it's being generated

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **AI SDK**: Vercel AI SDK 3.1
- **AI Model**: OpenAI GPT-4o
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Runtime**: Node.js 18+

## 📖 Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Vercel AI SDK](https://sdk.vercel.ai)
- Powered by [OpenAI GPT-4o](https://openai.com)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)

---

**Need help?** Open an issue on GitHub or check out the [Vercel AI SDK documentation](https://sdk.vercel.ai/docs).

Built with ❤️ using Vercel AI SDK
