# Deployment Guide for Namecheap / cPanel

This guide explains how to deploy the **Sermnova Kloud** application to a Namecheap Shared Hosting environment (cPanel).

## Prerequisites
- Node.js installed locally.
- Access to cPanel File Manager or FTP.

## 1. Build the Project
Run the following command in your terminal to create the optimized production build:

```bash
npm run build
```

This will create a `dist/` folder in your project root containing:
- `index.html`
- `assets/` (bundled JS and CSS)
- `.htaccess` (for routing)
- Other static assets

## 2. Verify the Build
Open `dist/index.html` in a text editor.
- ✅ It should reference files like `/assets/index-XXXX.js`.
- ❌ It should **NOT** reference `/src/main.jsx`.

## 3. Upload to cPanel
1.  Log in to your **cPanel**.
2.  Go to **File Manager**.
3.  Navigate to `public_html` (or the subdomain folder if applicable).
4.  **Delete** existing files (except `cgi-bin` or other system folders) to ensure a clean install.
5.  **Upload** the **CONTENTS** of the `dist/` folder.
    *   Do **NOT** upload the `dist` folder itself.
    *   Upload `index.html`, `.htaccess`, `assets/`, etc., directly into `public_html`.

### Structure Check
Your `public_html` should look like this:
```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
└── images/
```

## 4. Troubleshooting
- **Blank Page?** Ensure you uploaded the *contents* of `dist`, not the `src` folder.
- **404 Errors on Refresh?** Ensure the `.htaccess` file was uploaded correctly. (It might be hidden; enable "Show Hidden Files" in cPanel settings).
