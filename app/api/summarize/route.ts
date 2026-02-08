import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  try {
    const { content, style = 'concise' } = await request.json();

    if (!content) {
      return new Response('Content is required', { status: 400 });
    }

    const systemPrompt = `You are an expert blog post summarizer. Create a ${style} summary that:
- Captures the main ideas and key takeaways
- Uses clear, accessible language
- Highlights actionable insights
- Maintains the original tone and intent
- Limits the summary to 150-200 words for concise style, or 300-400 words for detailed style`;

    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      prompt: `Summarize this blog post:\n\n${content}`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Summarization error:', error);
    return new Response('Error generating summary', { status: 500 });
  }
}
