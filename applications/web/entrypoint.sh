#!/bin/sh
set -e

# Run prisma db push to ensure schema is up to date
npx prisma db push --accept-data-loss

# Execute the main CMD
exec "$@"
