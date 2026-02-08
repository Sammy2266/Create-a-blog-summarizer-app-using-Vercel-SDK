#!/bin/bash

echo "🚀 Setting up AI Blog Summarizer..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local and add your OpenAI API key!"
    echo "   Get your API key from: https://platform.openai.com/api-keys"
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Edit .env.local and add your OPENAI_API_KEY"
echo "   2. Run 'npm run dev' to start the development server"
echo "   3. Visit http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
