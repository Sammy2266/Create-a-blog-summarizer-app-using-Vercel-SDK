# Usage Examples

This file shows different ways to use the AI Blog Summarizer in your projects.

## Basic Usage

### Simple Integration

```tsx
import BlogSummarizer from '@/app/components/BlogSummarizer';

export default function BlogPost() {
  const content = "Your blog post content...";
  
  return (
    <article>
      <h1>My Blog Post</h1>
      <BlogSummarizer postContent={content} />
      <div>{content}</div>
    </article>
  );
}
```

## Advanced Examples

### 1. Summarize Multiple Posts

```tsx
'use client';

import BlogSummarizer from '@/app/components/BlogSummarizer';

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-8">
      {posts.map(post => (
        <article key={post.id} className="border-b pb-8">
          <h2>{post.title}</h2>
          <BlogSummarizer postContent={post.content} />
          <div className="mt-4">{post.content}</div>
        </article>
      ))}
    </div>
  );
}
```

### 2. Custom Styling

```tsx
import BlogSummarizer from '@/app/components/BlogSummarizer';

export default function CustomStyledBlog() {
  const content = "Your content...";
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Custom wrapper with your brand colors */}
      <div className="bg-purple-50 p-8 rounded-xl">
        <BlogSummarizer postContent={content} />
      </div>
    </div>
  );
}
```

### 3. Fetch Content from API

```tsx
'use client';

import { useState, useEffect } from 'react';
import BlogSummarizer from '@/app/components/BlogSummarizer';

export default function DynamicBlogPost({ postId }: { postId: string }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <div>Loading...</div>;

  return (
    <article>
      <BlogSummarizer postContent={content} />
      <div className="mt-8">{content}</div>
    </article>
  );
}
```

### 4. Save Summaries to Database

```tsx
'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';

export default function BlogWithSavedSummary({ postContent, postId }) {
  const [savedSummary, setSavedSummary] = useState<string | null>(null);

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/summarize',
    onFinish: async (summary) => {
      // Save to database
      await fetch('/api/save-summary', {
        method: 'POST',
        body: JSON.stringify({ postId, summary }),
      });
      setSavedSummary(summary);
    },
  });

  const handleGenerate = async () => {
    await complete('', {
      body: { content: postContent, style: 'concise' }
    });
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={isLoading}>
        Generate Summary
      </button>
      {completion && <div className="summary">{completion}</div>}
      {savedSummary && <p>✓ Summary saved</p>}
    </div>
  );
}
```

### 5. Markdown Content Support

```tsx
import BlogSummarizer from '@/app/components/BlogSummarizer';
import ReactMarkdown from 'react-markdown';

export default function MarkdownBlog({ markdown }: { markdown: string }) {
  return (
    <article>
      <BlogSummarizer postContent={markdown} />
      <ReactMarkdown className="prose mt-8">
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
```

### 6. Different AI Models

Create a custom API route for Claude:

```typescript
// app/api/summarize-claude/route.ts
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  const { content, style = 'concise' } = await request.json();

  const result = await streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: `You are an expert summarizer...`,
    prompt: `Summarize: ${content}`,
  });

  return result.toDataStreamResponse();
}
```

Use it in your component:

```tsx
const { completion, complete } = useCompletion({
  api: '/api/summarize-claude', // Use Claude instead
});
```

### 7. Summary with Bullet Points

```typescript
// app/api/summarize-bullets/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { content } = await request.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `Create a bullet-point summary with:
    - Main thesis (1 line)
    - 3-5 key points
    - Action items (if applicable)`,
    prompt: `Summarize: ${content}`,
  });

  return result.toDataStreamResponse();
}
```

### 8. Translation + Summary

```typescript
// app/api/summarize-translate/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { content, targetLanguage = 'es' } = await request.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `Summarize this content and translate to ${targetLanguage}`,
    prompt: content,
  });

  return result.toDataStreamResponse();
}
```

### 9. Rate Limiting

```typescript
// app/api/summarize/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  // ... rest of summarization code
}
```

### 10. Streaming with Progress

```tsx
'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';

export default function SummaryWithProgress({ postContent }) {
  const [progress, setProgress] = useState(0);

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/summarize',
    onResponse: () => setProgress(25),
    onFinish: () => setProgress(100),
  });

  return (
    <div>
      {isLoading && (
        <div className="w-full bg-gray-200 rounded">
          <div 
            className="bg-blue-600 h-2 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {completion && <div>{completion}</div>}
    </div>
  );
}
```

## API Customization

### Custom Length Control

```typescript
const result = await streamText({
  model: openai('gpt-4o'),
  system: `Create a ${wordCount}-word summary`,
  prompt: content,
  maxTokens: Math.ceil(wordCount * 1.5), // Estimate tokens
});
```

### Custom Temperature

```typescript
const result = await streamText({
  model: openai('gpt-4o'),
  system: systemPrompt,
  prompt: content,
  temperature: 0.3, // Lower = more focused, Higher = more creative
});
```

### Multiple Summaries

```typescript
const result = await streamText({
  model: openai('gpt-4o'),
  system: 'Create 3 different summaries: one for experts, one for beginners, one in tweet format',
  prompt: content,
});
```

## Integration Examples

### WordPress Plugin

```php
// summarizer-button.php
add_action('the_content', 'add_summarizer_button');

function add_summarizer_button($content) {
  $button = '<div id="ai-summarizer" data-content="' . 
    esc_attr(strip_tags($content)) . '"></div>';
  return $button . $content;
}
```

### Ghost Theme

```handlebars
{{!-- post.hbs --}}
<article>
  <div class="summarizer" data-content="{{post.html}}"></div>
  {{content}}
</article>
```

### Astro Integration

```astro
---
import BlogSummarizer from '@/components/BlogSummarizer';
const { content } = Astro.props;
---

<article>
  <BlogSummarizer postContent={content} client:load />
  <Fragment set:html={content} />
</article>
```

## Testing

### Unit Test Example

```typescript
// __tests__/api/summarize.test.ts
import { POST } from '@/app/api/summarize/route';

describe('Summarize API', () => {
  it('returns a summary for valid content', async () => {
    const request = new Request('http://localhost:3000/api/summarize', {
      method: 'POST',
      body: JSON.stringify({ 
        content: 'Test content',
        style: 'concise'
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

---

**More examples?** Check the [Vercel AI SDK examples](https://sdk.vercel.ai/examples) or open an issue on GitHub!
