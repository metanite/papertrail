# Papertrail

Papertrail is a lightweight document workspace built with Laravel, SQLite, Inertia.js, and React. Users can create and format documents, import plain text files, and share documents with viewer or editor access.

## Requirements

- PHP 8.5+
- Composer
- Node.js and npm

## Run locally

From the project directory:

```bash
composer install
npm install
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan migrate --seed
composer run dev
```

Open [http://localhost:8000](http://localhost:8000).

`composer run dev` starts the Laravel server, Vite, and the local queue worker.

## Demo accounts

All seeded accounts use the password `password`:

| Email                | Role                                 |
| -------------------- | ------------------------------------ |
| `alex@example.com`   | Owner of the seeded welcome document |
| `sam@example.com`    | Editor on the welcome document       |
| `taylor@example.com` | Viewer on the welcome document       |

## Supported features

- Bold, italic, underline, headings, bulleted lists, and numbered lists
- Persistent documents stored in SQLite
- `.txt` import up to 1 MB
- Document sharing with viewer or editor access
- Owned and shared document lists
- Explicit document saving with unsaved-change protection

DOCX, PDF, Markdown conversion, real-time collaboration, and automatic saving are not included in this MVP.

## Useful commands

```bash
# Reset the database and demo data
php artisan migrate:fresh --seed

# Run backend tests
php artisan test

# Check frontend types
npm run types:check

# Build frontend assets
npm run build
```
