# Sermnova Kloud

A modern, async mentoring and project review platform. Built with React, Vite, and Vanilla CSS.

## Features
- **Landing Page**: calm, professional aesthetic (Sage/Slate/Cream).
- **Learner Dashboard**: Track submissions and feedback.
- **Mentor Dashboard**: Review queue management.
- **Submission View**: Detailed code review and feedback thread within a glassmorphic UI.
- **Design System**: Custom CSS variables, reusable components (Card, Button, Badge), and responsive layouts.

## Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

3.  **Build for Production**

## Authentication & OTP (Development Mode)

In **Development Mode** (`npm run dev`), the Email OTP system logs the verification code directly to the **Browser Console**.
1. Navigate to `/login` or click "Login".
2. Enter any email address.
3. Open Developer Tools (Cmd+Opt+J / F12).
4. Copy the 6-digit code from the `[Mock Mail Service]` log.
5. Paste it to verify/login.

**Note**: Simulated "Secure" flow is used:
- OTPs are hashed before "storage" (in-memory).
- Codes expire in 10 minutes.
- Rate limited to 1 request per minute.

## Build and Deploy
    ```bash
    npm run build
    npm run preview
    ```

## Project Structure
- `src/components`: Reusable UI components.
- `src/pages`: Main application views.
- `src/styles`: Global CSS variables and reset.
- `src/data`: Mock data for demonstration.

## Deployment
This project is ready to deploy on Vercel, Netlify, or any static host.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
