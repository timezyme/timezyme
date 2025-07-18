#!/bin/bash

# Stop development server cleanly

echo "🛑 Stopping Nuxt development server..."

if [ -f .dev.pid ]; then
  DEV_PID=$(cat .dev.pid)
  
  if ps -p $DEV_PID > /dev/null 2>&1; then
    kill $DEV_PID
    echo "✅ Stopped dev server (PID $DEV_PID)"
    
    # Wait for process to fully stop
    sleep 2
    
    # Force kill if still running
    if ps -p $DEV_PID > /dev/null 2>&1; then
      kill -9 $DEV_PID
      echo "⚠️  Force killed dev server"
    fi
  else
    echo "ℹ️  Dev server not running (PID $DEV_PID not found)"
  fi
  
  rm .dev.pid
else
  echo "ℹ️  No PID file found"
  
  # Try to find and kill any running pnpm dev processes
  PNPM_PIDS=$(ps aux | grep "pnpm dev" | grep -v grep | awk '{print $2}')
  if [ ! -z "$PNPM_PIDS" ]; then
    echo "Found pnpm dev processes: $PNPM_PIDS"
    echo "$PNPM_PIDS" | xargs kill
    echo "✅ Killed pnpm dev processes"
  fi
fi

# Clean up log file if exists
if [ -f dev.log ] && [ ! -s dev.log ]; then
  rm dev.log
  echo "🧹 Cleaned up empty log file"
fi

# Kill any orphaned workerd processes
WORKERD_COUNT=$(ps aux | grep workerd | grep -v grep | wc -l | tr -d ' ')
if [ "$WORKERD_COUNT" -gt 0 ]; then
  echo "🔧 Found $WORKERD_COUNT workerd process(es), cleaning up..."
  pkill -f workerd
  sleep 1
  # Force kill if any remain
  if ps aux | grep workerd | grep -v grep > /dev/null 2>&1; then
    pkill -9 -f workerd
    echo "⚠️  Force killed remaining workerd processes"
  fi
  echo "✅ Cleaned up workerd processes"
fi