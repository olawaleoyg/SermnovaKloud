# Deployment Guide for Vercel

This guide explains how to deploy the **Sermnova Kloud** application to Vercel.

## Prerequisites
- A [Vercel](https://vercel.com) account.
- GitHub repository connected to Vercel.

## 1. Automatic Deployment (Recommended)
1.  Push your code to your GitHub repository.
2.  Log in to Vercel and click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  Vercel will detect it's a Vite project. The default settings should work automatically:
    - **Framework Preset**: Vite
    - **Build Command**: `vite build` (or `npm run build`)
    - **Output Directory**: `dist`
5.  Click **Deploy**.

## 2. Configuration
The project includes a `vercel.json` file to handle Client-Side Routing (SPA):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This ensures that refreshing a page on a specific route (e.g., `/dashboard`) doesn't return a 404 error but instead loads the app so React Router can handle the URL.

## 3. Environment Variables
If your app uses environment variables (e.g., `VITE_API_URL`), make sure to add them in Vercel:
1.  Go to your Project Settings in Vercel.
2.  Click **Environment Variables**.
3.  Add keys and values as needed.
