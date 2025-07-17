#!/bin/bash

# Start development server with proper logging and PID tracking

echo "🚀 Starting Nuxt development server..."

# Check if already running
if [ -f .dev.pid ]; then
  OLD_PID=$(cat .dev.pid)
  if ps -p $OLD_PID > /dev/null 2>&1; then
    echo "⚠️  Dev server already running with PID $OLD_PID"
    echo "Run ./scripts/dev-stop.sh first"
    exit 1
  else
    rm .dev.pid
  fi
fi

# Start dev server
pnpm dev > dev.log 2>&1 &
DEV_PID=$!
echo $DEV_PID > .dev.pid

# Wait a moment to check if it started successfully
sleep 3

if ps -p $DEV_PID > /dev/null; then
  echo "✅ Dev server started with PID $DEV_PID"
  echo "📝 Logs: tail -f dev.log"
  echo "🌐 URL: http://localhost:9009"
else
  echo "❌ Failed to start dev server"
  rm .dev.pid
  exit 1
fi