import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Blog Summarizer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Generate intelligent summaries of your blog posts in seconds using Vercel AI SDK
          </p>
          <Link
            href="/demo"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg"
          >
            Try the Demo →
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Powered by Vercel's edge network for instant summaries
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-2">Smart Summaries</h3>
            <p className="text-gray-600">
              Choose between concise and detailed summaries
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="text-xl font-bold mb-2">Easy to Integrate</h3>
            <p className="text-gray-600">
              Drop the component into any Next.js app
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
