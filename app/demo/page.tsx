import BlogSummarizer from '@/app/components/BlogSummarizer';

const SAMPLE_BLOG_POST = `
# The Future of AI in Web Development

Artificial Intelligence is revolutionizing how we build web applications. From automating repetitive tasks to generating code, AI tools are becoming essential in every developer's toolkit.

## Why AI Matters for Developers

The integration of AI into development workflows has shown remarkable results. Studies indicate that developers using AI assistants complete tasks 40% faster than those working without them. This isn't just about speed—it's about quality, creativity, and focus.

AI can handle boilerplate code generation, allowing developers to concentrate on architecture and business logic. Tools like GitHub Copilot, ChatGPT, and specialized frameworks like Vercel's AI SDK are changing the game.

## Real-World Applications

Companies are already leveraging AI for:

1. **Code Generation**: Automatically creating functions and components based on descriptions
2. **Bug Detection**: AI systems can identify potential issues before they reach production
3. **Documentation**: Auto-generating comprehensive docs from code comments
4. **Testing**: Creating test cases automatically based on code analysis
5. **Performance Optimization**: Analyzing code to suggest improvements

## The Vercel AI SDK Advantage

Vercel's AI SDK stands out because it's built specifically for modern web development. It provides:

- Type-safe APIs with full TypeScript support
- Streaming responses for real-time user experiences
- Support for 25+ LLM providers
- Edge runtime optimization for lightning-fast performance
- Seamless integration with Next.js and React

## Looking Ahead

As we move into 2026, AI will become even more integrated into development workflows. The question isn't whether to use AI—it's how to use it effectively.

Developers who embrace these tools early will have a significant competitive advantage. The future of web development is intelligent, and it's here now.

## Conclusion

AI isn't replacing developers; it's augmenting them. By leveraging tools like Vercel's AI SDK, you can build smarter applications faster than ever before. The time to start is now.
`;

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Summarizer Demo
          </h1>
          <p className="text-lg text-gray-600">
            Click the button below to generate an AI summary of this blog post.
          </p>
        </div>

        {/* Summarizer Component */}
        <BlogSummarizer postContent={SAMPLE_BLOG_POST} />

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none mt-12">
          <div className="text-gray-800 leading-relaxed space-y-4">
            {SAMPLE_BLOG_POST.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Built with Vercel AI SDK • Powered by GPT-4o
          </p>
        </div>
      </div>
    </main>
  );
}