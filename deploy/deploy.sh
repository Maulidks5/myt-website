#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/home/myt/myt-website}"
PUBLIC_HTML="${PUBLIC_HTML:-/home/myt/public_html}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

git pull origin "$BRANCH"

composer install --no-dev --optimize-autoloader

if command -v npm >/dev/null 2>&1; then
  npm ci
  npm run build
fi

php artisan migrate --force
php artisan storage:link || true
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

mkdir -p "$PUBLIC_HTML"
rsync -a --delete \
  --exclude=index.php \
  --exclude=.htaccess \
  "$APP_DIR/public/" "$PUBLIC_HTML/"

cp "$APP_DIR/deploy/cpanel-public-html-index.php" "$PUBLIC_HTML/index.php"
cp "$APP_DIR/deploy/public-html-htaccess" "$PUBLIC_HTML/.htaccess"

echo "Deployment complete."
