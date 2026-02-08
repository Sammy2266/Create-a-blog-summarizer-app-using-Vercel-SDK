export async function POST(request: Request) {
  try {
    const { content, style = 'concise' } = await request.json();

    if (!content) {
      return new Response('Content is required', { status: 400 });
    }

    // Mock summaries based on style
    const mockSummary = style === 'concise' 
      ? "This blog post explores AI's transformative impact on web development. It highlights how AI tools enable developers to work 40% faster while maintaining quality. Key applications include code generation, bug detection, and automated documentation. The Vercel AI SDK is presented as a standout solution with TypeScript support, streaming capabilities, and seamless Next.js integration. The article emphasizes that AI augments rather than replaces developers, offering early adopters a competitive advantage in the evolving landscape of web development."
      : "This comprehensive blog post examines the revolutionary role of Artificial Intelligence in modern web development. The article presents compelling data showing that developers using AI assistants complete tasks 40% faster than their counterparts, emphasizing that this improvement extends beyond mere speed to encompass quality, creativity, and focus.\n\nThe post details five major real-world applications: automated code generation from descriptions, proactive bug detection systems, automatic documentation generation from code comments, intelligent test case creation, and AI-driven performance optimization suggestions. Special attention is given to Vercel's AI SDK, which is praised for its developer-friendly features including full TypeScript support, real-time streaming responses, compatibility with over 25 LLM providers, edge runtime optimization, and seamless integration with Next.js and React.\n\nLooking toward 2026, the article predicts deeper integration of AI into development workflows and emphasizes that the critical question is no longer whether to adopt AI tools, but how to use them effectively. The conclusion reinforces that AI serves as an augmentation tool for developers rather than a replacement, positioning early adopters for significant competitive advantages in the evolving landscape of web development.";

    // Simulate streaming with proper format
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = mockSummary.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? '' : ' ') + words[i];
          // Format matches Vercel AI SDK streaming format
          controller.enqueue(encoder.encode(`0:"${chunk}"\n`));
          // Small delay to simulate realistic streaming
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });
  } catch (error) {
    console.error('Summarization error:', error);
    return new Response(JSON.stringify({ 
      error: 'Error generating summary',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}