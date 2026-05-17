# cPanel Deployment

This project is deployed with a split Laravel setup:

- Laravel app: `/home/myt/myt-website`
- Public document root: `/home/myt/public_html`

Only public assets and the front controller live in `public_html`. The Laravel app, `.env`, `vendor`, `storage`, and source code stay outside the web root.

## First Deploy

1. In cPanel, create a MySQL database and user.
2. SSH into the server.
3. Clone the repo outside `public_html`:

```bash
cd /home/myt
git clone <your-repo-url> myt-website
cd myt-website
```

4. Create production env:

```bash
cp .env.production.example .env
php artisan key:generate
```

5. Edit `.env` and set database, mail, `APP_URL`, and admin password.

6. Run deploy:

```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

If `rsync` is not available on the server, manually copy everything inside `public/` into `/home/myt/public_html`, then copy:

```bash
cp deploy/cpanel-public-html-index.php /home/myt/public_html/index.php
cp deploy/public-html-htaccess /home/myt/public_html/.htaccess
```

## Future Updates

After pushing changes to GitHub:

```bash
cd /home/myt/myt-website
./deploy/deploy.sh
```

## Important Notes

- Do not put the full Laravel app inside `public_html`.
- Do not commit `.env`, `vendor`, `node_modules`, or local database files.
- If uploaded images do not show, run:

```bash
php artisan storage:link
```

- If cPanel does not have Node.js, build locally with `npm run build`, commit `public/build`, then remove or skip the npm lines in `deploy/deploy.sh`.
