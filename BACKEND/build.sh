#!/bin/bash

# Exit immediately if a command fails
set -e

echo "Starting DRF project setup..."

# Create virtual environment (if not exists)
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files (optional for production)
python manage.py collectstatic --noinput

echo "Build completed successfully!"